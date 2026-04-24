export interface ExifData {
  make?: string;
  model?: string;
  lens?: string;
  focalLength?: string;
  aperture?: string;
  shutterSpeed?: string;
  iso?: number;
  date?: string;
}

export interface PhotoConfig {
  id: string;
  src: string;
  alt: string;
  tags?: string[];
  thumbnail?: string;
  exif?: ExifData;
  width?: number;
  height?: number;
}
