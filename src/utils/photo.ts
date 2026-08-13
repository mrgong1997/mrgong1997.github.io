import type { PhotoConfig } from '@/types/photo';

/** 页面展示用图：优先 1200px 缩略图，避免拉 5MB+ 原图。 */
export function displaySrc(photo: Pick<PhotoConfig, 'src' | 'thumbnail'>): string {
  return photo.thumbnail ?? photo.src;
}

export function preloadImage(src: string) {
  if (!src) return;
  const img = new Image();
  img.decoding = 'async';
  img.src = src;
}
