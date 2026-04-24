import type { ExifData } from '@/types/photo';

export function formatShutter(value: number | string | undefined): string | undefined {
  if (value === undefined || value === null || value === '') return undefined;
  const num = typeof value === 'string' ? Number(value) : value;
  if (!Number.isFinite(num) || num <= 0) return undefined;
  if (num >= 1) return `${num.toFixed(num < 10 ? 1 : 0)}s`;
  return `1/${Math.round(1 / num)}`;
}

export function formatAperture(fNumber: number | string | undefined): string | undefined {
  if (fNumber === undefined || fNumber === null || fNumber === '') return undefined;
  const num = typeof fNumber === 'string' ? Number(fNumber) : fNumber;
  if (!Number.isFinite(num)) return undefined;
  return `f/${Number(num.toFixed(1))}`;
}

export function formatFocalLength(mm: number | string | undefined): string | undefined {
  if (mm === undefined || mm === null || mm === '') return undefined;
  const num = typeof mm === 'string' ? Number(mm) : mm;
  if (!Number.isFinite(num)) return undefined;
  return `${Math.round(num)}mm`;
}

export function formatDate(value: string | Date | undefined): string | undefined {
  if (!value) return undefined;
  const d = typeof value === 'string' ? new Date(value) : value;
  if (Number.isNaN(d.getTime())) return undefined;
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

export function summarizeExif(exif?: ExifData): string {
  if (!exif) return '';
  const parts: string[] = [];
  if (exif.focalLength) parts.push(exif.focalLength);
  if (exif.aperture) parts.push(exif.aperture);
  if (exif.shutterSpeed) parts.push(exif.shutterSpeed);
  if (exif.iso) parts.push(`ISO${exif.iso}`);
  return parts.join(' · ');
}
