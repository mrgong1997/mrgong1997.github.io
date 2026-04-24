/* eslint-disable no-console */
/**
 * 增量同步 public/photos 到 src/config/photos.ts。
 * - 按 src 路径匹配已有条目，保留手动编辑的 alt / tags
 * - 自动更新 thumbnail / exif / width / height
 * - 新增未出现的照片，根据子目录/文件名关键字自动打标签
 * - 移除源文件已不存在的条目
 */
import path from 'node:path';
import fs from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import exifr from 'exifr';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = path.resolve(__dirname, '..');
const PHOTOS_DIR = path.join(ROOT, 'public', 'photos');
const THUMB_DIR = path.join(PHOTOS_DIR, 'thumbnails');
const CONFIG_FILE = path.join(ROOT, 'src', 'config', 'photos.ts');
const EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp']);

const TAG_KEYWORDS = ['城市', '风景', '人像', '建筑', '街头', '自然', '抽象', '黑白'];

function toPosix(p) {
  return p.split(path.sep).join('/');
}

async function walk(dir) {
  const result = [];
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return result;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (full === THUMB_DIR) continue;
      result.push(...(await walk(full)));
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (EXTENSIONS.has(ext)) result.push(full);
    }
  }
  return result;
}

function formatShutter(value) {
  if (value === undefined || value === null) return undefined;
  const num = Number(value);
  if (!Number.isFinite(num) || num <= 0) return undefined;
  if (num >= 1) return `${num.toFixed(num < 10 ? 1 : 0)}s`;
  return `1/${Math.round(1 / num)}`;
}

function formatAperture(fNumber) {
  if (fNumber === undefined || fNumber === null) return undefined;
  const num = Number(fNumber);
  if (!Number.isFinite(num)) return undefined;
  return `f/${Number(num.toFixed(1))}`;
}

function formatFocal(mm) {
  if (mm === undefined || mm === null) return undefined;
  const num = Number(mm);
  if (!Number.isFinite(num)) return undefined;
  return `${Math.round(num)}mm`;
}

function formatDate(value) {
  if (!value) return undefined;
  const d = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(d.getTime())) return undefined;
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

async function readExif(filePath) {
  try {
    const data = await exifr.parse(filePath, {
      pick: [
        'Make',
        'Model',
        'LensModel',
        'FocalLength',
        'FocalLengthIn35mmFormat',
        'FNumber',
        'ExposureTime',
        'ISO',
        'DateTimeOriginal',
      ],
    });
    if (!data) return undefined;
    const exif = {
      make: data.Make,
      model: data.Model,
      lens: data.LensModel,
      focalLength: formatFocal(data.FocalLength || data.FocalLengthIn35mmFormat),
      aperture: formatAperture(data.FNumber),
      shutterSpeed: formatShutter(data.ExposureTime),
      iso: data.ISO,
      date: formatDate(data.DateTimeOriginal),
    };
    Object.keys(exif).forEach((k) => exif[k] === undefined && delete exif[k]);
    return Object.keys(exif).length ? exif : undefined;
  } catch {
    return undefined;
  }
}

async function getDimensions(filePath) {
  try {
    const { width, height } = (await exifr.parse(filePath, { tiff: true, ifd0: true })) || {};
    if (width && height) return { width, height };
  } catch {}
  return {};
}

function guessTagsFromPath(relPath, filename) {
  const tags = new Set();
  const parts = relPath.split('/').slice(0, -1);
  for (const part of parts) if (part) tags.add(part);
  const name = filename.toLowerCase();
  for (const kw of TAG_KEYWORDS) {
    if (filename.includes(kw) || name.includes(kw.toLowerCase())) tags.add(kw);
  }
  return Array.from(tags);
}

function sanitizeId(src) {
  return src
    .replace(/^\/photos\//, '')
    .replace(/\.[^.]+$/, '')
    .replace(/[^a-zA-Z0-9\-_\u4e00-\u9fa5]+/g, '-');
}

async function readExistingConfig() {
  try {
    const url = pathToFileURL(CONFIG_FILE).href + `?t=${Date.now()}`;
    const mod = await import(url);
    if (Array.isArray(mod.photos)) return mod.photos;
  } catch {}
  return [];
}

function serializeConfig(photos) {
  const header = `// 由 scripts/sync-photos.js 自动生成。
// 可以安全地手动编辑每个条目的 alt 与 tags，其他字段会被脚本更新。
import type { PhotoConfig } from '@/types/photo';

export const photos: PhotoConfig[] = ${JSON.stringify(photos, null, 2)};

export const categories: string[] = [
  '全部',
  ...Array.from(new Set(photos.flatMap((p) => p.tags ?? []).filter((t) => t !== 'featured'))),
];
`;
  return header;
}

async function thumbnailExists(relPath) {
  try {
    await fs.access(path.join(THUMB_DIR, relPath));
    return true;
  } catch {
    return false;
  }
}

async function main() {
  await fs.mkdir(path.dirname(CONFIG_FILE), { recursive: true });
  const existing = await readExistingConfig();
  const existingMap = new Map(existing.map((p) => [p.src, p]));

  const files = await walk(PHOTOS_DIR);
  const nextPhotos = [];

  for (const file of files) {
    const rel = toPosix(path.relative(PHOTOS_DIR, file));
    const src = `/photos/${rel}`;
    const filename = path.basename(rel, path.extname(rel));
    const exif = await readExif(file);
    const dims = await getDimensions(file);
    const thumbRelExists = await thumbnailExists(rel);
    const prev = existingMap.get(src);

    const entry = {
      id: prev?.id ?? sanitizeId(src),
      src,
      alt: prev?.alt ?? filename,
      tags: prev?.tags ?? guessTagsFromPath(rel, filename),
      ...(thumbRelExists ? { thumbnail: `/photos/thumbnails/${rel}` } : {}),
      ...(exif ? { exif } : {}),
      ...(dims.width ? { width: dims.width } : {}),
      ...(dims.height ? { height: dims.height } : {}),
    };

    nextPhotos.push(entry);
  }

  nextPhotos.sort((a, b) => {
    const da = a.exif?.date ?? '';
    const db = b.exif?.date ?? '';
    if (da && db) return db.localeCompare(da);
    if (da) return -1;
    if (db) return 1;
    return a.src.localeCompare(b.src);
  });

  await fs.writeFile(CONFIG_FILE, serializeConfig(nextPhotos), 'utf8');
  const added = nextPhotos.filter((p) => !existingMap.has(p.src)).length;
  const removed = existing.filter((p) => !nextPhotos.find((n) => n.src === p.src)).length;
  console.log(
    `[sync] ok. total=${nextPhotos.length}, added=${added}, removed=${removed}, file=${path.relative(ROOT, CONFIG_FILE)}`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
