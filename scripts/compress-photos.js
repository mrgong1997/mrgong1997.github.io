/* eslint-disable no-console */
/**
 * 压缩 public/photos 下的原图到 public/photos/thumbnails。
 * - 长边缩放至 1200px，保持宽高比
 * - JPEG 质量 82、PNG 压缩级别 9、WebP 质量 82
 * - 增量：跳过缩略图已存在且新于源文件的条目
 */
import path from 'node:path';
import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = path.resolve(__dirname, '..');
const SRC_DIR = path.join(ROOT, 'public', 'photos');
const DEST_DIR = path.join(SRC_DIR, 'thumbnails');
const LONG_EDGE = 1200;
const JPEG_QUALITY = 82;
const WEBP_QUALITY = 82;
const EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp']);

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
      if (full === DEST_DIR) continue;
      result.push(...(await walk(full)));
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (EXTENSIONS.has(ext)) result.push(full);
    }
  }
  return result;
}

async function needsRebuild(src, dest) {
  try {
    const [s, d] = await Promise.all([fs.stat(src), fs.stat(dest)]);
    return s.mtimeMs > d.mtimeMs;
  } catch {
    return true;
  }
}

async function compressOne(src) {
  const rel = path.relative(SRC_DIR, src);
  const dest = path.join(DEST_DIR, rel);
  await fs.mkdir(path.dirname(dest), { recursive: true });

  if (!(await needsRebuild(src, dest))) {
    return { src: rel, status: 'skipped' };
  }

  const ext = path.extname(src).toLowerCase();
  let pipeline = sharp(src, { failOn: 'none' }).rotate().resize({
    width: LONG_EDGE,
    height: LONG_EDGE,
    fit: 'inside',
    withoutEnlargement: true,
  });

  if (ext === '.png') {
    pipeline = pipeline.png({ compressionLevel: 9, palette: true });
  } else if (ext === '.webp') {
    pipeline = pipeline.webp({ quality: WEBP_QUALITY });
  } else {
    pipeline = pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true });
  }

  await pipeline.toFile(dest);
  return { src: rel, status: 'built' };
}

async function main() {
  await fs.mkdir(SRC_DIR, { recursive: true });
  await fs.mkdir(DEST_DIR, { recursive: true });
  const files = await walk(SRC_DIR);
  if (files.length === 0) {
    console.log('[compress] 没有发现源图。请将照片放入 public/photos/');
    return;
  }
  let built = 0;
  let skipped = 0;
  for (const file of files) {
    try {
      const res = await compressOne(file);
      if (res.status === 'built') {
        built += 1;
        console.log(`[compress] built  ${res.src}`);
      } else {
        skipped += 1;
      }
    } catch (err) {
      console.error(`[compress] fail   ${path.relative(SRC_DIR, file)}`, err.message);
    }
  }
  console.log(`[compress] done. built=${built}, skipped=${skipped}, total=${files.length}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
