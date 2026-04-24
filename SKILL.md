---
name: photography-portfolio-toolkit
description: >-
  Manage photography portfolio workflows: compress images with sharp, extract
  EXIF metadata (camera, lens, aperture, shutter, ISO, date), auto-sync photo
  directories to TypeScript config, generate thumbnails, and build gallery UIs
  (masonry, timeline). Use when working with photography websites, image
  compression scripts, EXIF extraction, photo gallery components, or managing
  photo asset pipelines.
---

# Photography Portfolio Toolkit

A complete workflow for managing a photography portfolio site: image compression, EXIF extraction, config auto-sync, and gallery UI components.

## Directory Structure

```
public/photos/              # Original full-size photos
public/photos/thumbnails/   # Auto-generated compressed previews
src/config/photos.ts        # Auto-generated photo config (editable)
scripts/compress-photos.js  # Image compression script
scripts/sync-photos.js      # Incremental config sync script
```

## Photo Config Schema

```typescript
export interface ExifData {
  make?: string;        // e.g. "SONY"
  model?: string;       // e.g. "ILCE-7CM2"
  lens?: string;        // e.g. "E 28-200mm F2.8-5.6 A071"
  focalLength?: string; // e.g. "61mm"
  aperture?: string;    // e.g. "f/4"
  shutterSpeed?: string;// e.g. "1/30"
  iso?: number;         // e.g. 80
  date?: string;        // e.g. "2025-07-03"
}

export interface PhotoConfig {
  id: string;
  src: string;           // Path to original: /photos/name.jpg
  alt: string;           // Display title
  tags?: string[];       // User-defined tags for filtering
  thumbnail?: string;    // Path to compressed: /photos/thumbnails/name.jpg
  exif?: ExifData;       // Auto-extracted EXIF metadata
  width?: number;
  height?: number;
}
```

Categories are dynamically derived from tags:

```typescript
export const categories = ['全部', ...Array.from(new Set(photos.flatMap(p => p.tags ?? [])))];
```

## Image Compression Script

**Dependencies**: `sharp` (devDependency)

Key parameters:
- Long edge scaled to **1200px** (maintains aspect ratio)
- JPEG quality **82** (visually near-lossless, ~95%+ size reduction)
- PNG uses compression level 9, WebP uses quality 82
- **Incremental**: skips thumbnails newer than their source
- Output to `public/photos/thumbnails/` mirroring source structure

```bash
node scripts/compress-photos.js
```

## Config Sync Script

**Dependencies**: `exifr` (devDependency)

**Incremental merge** behavior — never overwrites manual edits:
- Matches existing photos by `src` path
- **Preserves**: manually edited `alt` and `tags`
- **Auto-updates**: `thumbnail` (based on file existence) and `exif` (re-read each run)
- **Adds**: new photos found in directory with auto-guessed alt/tags
- **Removes**: photos whose files no longer exist

EXIF fields extracted via `exifr`:
```javascript
exifr.parse(filePath, {
  pick: ['Make', 'Model', 'LensModel', 'FocalLength',
         'FocalLengthIn35mmFormat', 'FNumber',
         'ExposureTime', 'ISO', 'DateTimeOriginal']
})
```

Shutter speed formatting: values < 1s displayed as fraction (e.g. `1/30`).

```bash
node scripts/sync-photos.js
```

## Combined Command

```bash
npm run photos  # compress → sync (one command)
```

Separate commands also available:
```bash
npm run photos:compress  # Only compress
npm run photos:sync      # Only sync config
```

## Gallery UI Components

### MasonryGallery
- Responsive masonry grid (`react-masonry-css`): 4 → 3 → 2 → 1 columns
- Uses `thumbnail` for preview, original `src` for lightbox
- `AutoImage` sub-component: detects aspect ratio via `Image.naturalWidth/naturalHeight`
- Skeleton loading with fade-in transition

### TimelineGallery
- Groups photos by `exif.date`, sorted newest-first
- Left-side timeline line with date node dots
- Horizontal scroll row per date group
- Each card shows title + EXIF params on hover

### PhotoLightbox (shared)
- Full-size image display with `max-height: 85vh` + `object-fit: contain`
- "查看原图" button opens original in new tab
- ExifBar: camera, lens, focal/aperture/shutter, ISO, date with icons
- Supports both portrait and landscape images without scrollbars

### View Mode Toggle
- ToggleButtonGroup in gallery header: masonry / timeline
- Category filter chips shown only in masonry mode
- Glassmorphism styling consistent with design system

## Workflow: Adding New Photos

1. Drop photos into `public/photos/` (supports subdirectories)
2. Run `npm run photos`
3. Edit `src/config/photos.ts` to customize `alt` and `tags`
4. Run `npm run photos` again — edits are preserved

## Tag-Based Categorization

The sync script auto-guesses tags from:
- **Subdirectory names**: `photos/风景/001.jpg` → `tags: ['风景']`
- **Filename keywords**: `城市_001.jpg` → `tags: ['城市']`

Configurable keyword list in sync script:
```javascript
const TAG_KEYWORDS = ['城市', '风景', '人像', '建筑', '街头', '自然', '抽象', '黑白'];
```
