import { useState } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';
import AutoImage from '@/components/ui/AutoImage';
import PhotoLightbox from '@/components/gallery/PhotoLightbox';
import ExifBar from '@/components/gallery/ExifBar';
import type { PhotoConfig } from '@/types/photo';
import { glassTokens, tokens } from '@/theme/theme';
import { duration, ease, stagger } from '@/theme/motion';

interface FeaturedWorksProps {
  photos: PhotoConfig[];
}

export default function FeaturedWorks({ photos }: FeaturedWorksProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  if (!photos.length) return null;

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 14 },
        position: 'relative',
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'flex-start', md: 'flex-end' },
            justifyContent: 'space-between',
            gap: 2,
            mb: { xs: 4, md: 6 },
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: 12,
                letterSpacing: '0.4em',
                color: tokens.primary,
                textTransform: 'uppercase',
                mb: 1.5,
              }}
            >
              Featured works
            </Typography>
            <Typography
              component="h2"
              sx={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: { xs: 32, md: 44 },
              }}
            >
              精选作品
            </Typography>
          </Box>
          <Button
            component={RouterLink}
            to="/gallery"
            variant="outlined"
            endIcon={<ArrowRight size={15} />}
            sx={{ color: 'text.primary' }}
          >
            全部作品
          </Button>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
            gap: 3,
          }}
        >
          {photos.map((photo, i) => {
            const ratio =
              photo.width && photo.height ? photo.width / photo.height : 3 / 2;
            const featured = i === 0;
            return (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{
                  duration: duration.slow,
                  delay: Math.min(i * stagger.base, 0.4),
                  ease: ease.entrance,
                }}
                whileTap={{ scale: 0.985, transition: { duration: 0.12 } }}
                style={{
                  gridColumn: featured ? 'span 1' : undefined,
                }}
              >
                <Box
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    setIndex(i);
                    setOpen(true);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setIndex(i);
                      setOpen(true);
                    }
                  }}
                  sx={{
                    position: 'relative',
                    borderRadius: 3,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    border: `1px solid ${glassTokens.border}`,
                    background: glassTokens.bg,
                    transition:
                      'transform 500ms cubic-bezier(0.22,1,0.36,1), border-color 500ms ease, box-shadow 500ms ease',
                    willChange: 'transform',
                    '&:hover': {
                      borderColor: glassTokens.borderStrong,
                      transform: 'translateY(-4px)',
                      boxShadow: '0 18px 40px rgba(0,0,0,0.45)',
                    },
                    '&:hover img': { transform: 'scale(1.045)' },
                    '&:hover .fw-overlay': { opacity: 1 },
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
                    style={{
                      transition:
                        'transform 700ms cubic-bezier(0.22,1,0.36,1)',
                    }}
                  />
                  <Box
                    className="fw-overlay"
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      p: 2.5,
                      gap: 1,
                      background:
                        'linear-gradient(180deg, rgba(0,0,0,0) 45%, rgba(0,0,0,0.82) 100%)',
                      opacity: 0,
                      transition: 'opacity 400ms ease',
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: '"Cormorant Garamond", serif',
                        fontSize: 22,
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
        </Box>
      </Container>

      <PhotoLightbox
        open={open}
        photos={photos}
        index={index}
        onClose={() => setOpen(false)}
        onIndexChange={setIndex}
      />
    </Box>
  );
}
