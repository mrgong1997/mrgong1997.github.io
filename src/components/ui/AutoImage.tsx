import { Box } from '@mui/material';
import { useState, type ImgHTMLAttributes } from 'react';

interface AutoImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  aspectRatio?: number;
  rounded?: boolean;
}

export default function AutoImage({
  src,
  alt,
  aspectRatio,
  rounded = false,
  style,
  onLoad,
  ...rest
}: AutoImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [ratio, setRatio] = useState<number | undefined>(aspectRatio);

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        aspectRatio: ratio ? `${ratio}` : undefined,
        minHeight: ratio ? undefined : 120,
        background:
          'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.015))',
        overflow: 'hidden',
        borderRadius: rounded ? 2 : 0,
      }}
    >
      {!loaded && (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(90deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.02) 100%)',
            backgroundSize: '200% 100%',
            animation: 'auroraDrift 2s ease-in-out infinite',
          }}
        />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={(e) => {
          const img = e.currentTarget;
          if (!ratio && img.naturalWidth && img.naturalHeight) {
            setRatio(img.naturalWidth / img.naturalHeight);
          }
          setLoaded(true);
          onLoad?.(e);
        }}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 700ms ease',
          ...style,
        }}
        {...rest}
      />
    </Box>
  );
}
