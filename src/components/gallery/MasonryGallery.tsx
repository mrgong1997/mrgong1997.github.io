import Masonry from 'react-masonry-css';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import AutoImage from '@/components/ui/AutoImage';
import ExifBar from './ExifBar';
import type { PhotoConfig } from '@/types/photo';
import { glassTokens } from '@/theme/theme';

interface MasonryGalleryProps {
  photos: PhotoConfig[];
  onSelect: (index: number) => void;
}

const breakpointColumns = {
  default: 4,
  1536: 4,
  1200: 3,
  900: 2,
  600: 1,
};

export default function MasonryGallery({ photos, onSelect }: MasonryGalleryProps) {
  return (
    <Box
      sx={{
        '.masonry-grid': {
          display: 'flex',
          marginLeft: '-20px',
          width: 'auto',
        },
        '.masonry-column': {
          paddingLeft: '20px',
          backgroundClip: 'padding-box',
        },
        '.masonry-column > *': {
          marginBottom: '20px',
        },
      }}
    >
      <Masonry
        breakpointCols={breakpointColumns}
        className="masonry-grid"
        columnClassName="masonry-column"
      >
        {photos.map((photo, index) => {
          const ratio =
            photo.width && photo.height ? photo.width / photo.height : undefined;
          return (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.6, delay: Math.min(index * 0.04, 0.3) }}
            >
              <Box
                onClick={() => onSelect(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelect(index);
                  }
                }}
                sx={{
                  position: 'relative',
                  borderRadius: 3,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: `1px solid ${glassTokens.border}`,
                  background: glassTokens.bg,
                  transition: 'transform 500ms ease, border-color 500ms ease',
                  '&:hover': {
                    borderColor: glassTokens.borderStrong,
                    transform: 'translateY(-3px)',
                  },
                  '&:hover .overlay': { opacity: 1 },
                  '&:hover img': { transform: 'scale(1.03)' },
                  '&:focus-visible': {
                    outline: '2px solid',
                    outlineColor: 'primary.main',
                    outlineOffset: 2,
                  },
                }}
              >
                <AutoImage
                  src={photo.thumbnail ?? photo.src}
                  alt={photo.alt}
                  aspectRatio={ratio}
                  style={{ transition: 'transform 700ms ease' }}
                />
                <Box
                  className="overlay"
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    p: 2,
                    gap: 1,
                    background:
                      'linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.78) 100%)',
                    opacity: 0,
                    transition: 'opacity 400ms ease',
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontFamily: '"Cormorant Garamond", serif',
                      fontSize: 20,
                      lineHeight: 1.2,
                    }}
                  >
                    {photo.alt}
                  </Typography>
                  <ExifBar exif={photo.exif} compact />
                </Box>
              </Box>
            </motion.div>
          );
        })}
      </Masonry>
    </Box>
  );
}
