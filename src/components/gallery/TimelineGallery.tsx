import { useMemo } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import AutoImage from '@/components/ui/AutoImage';
import ExifBar from './ExifBar';
import type { PhotoConfig } from '@/types/photo';
import { glassTokens, tokens } from '@/theme/theme';
import { duration, ease, stagger } from '@/theme/motion';

interface TimelineGalleryProps {
  photos: PhotoConfig[];
  onSelect: (photo: PhotoConfig) => void;
}

interface Group {
  key: string;
  label: string;
  photos: PhotoConfig[];
}

function groupByDate(photos: PhotoConfig[]): Group[] {
  const map = new Map<string, PhotoConfig[]>();
  const undated: PhotoConfig[] = [];
  for (const photo of photos) {
    const date = photo.exif?.date;
    if (!date) {
      undated.push(photo);
      continue;
    }
    const key = date.slice(0, 7);
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(photo);
  }
  const sortedKeys = Array.from(map.keys()).sort((a, b) => b.localeCompare(a));
  const groups: Group[] = sortedKeys.map((k) => ({
    key: k,
    label: formatMonth(k),
    photos: map.get(k)!,
  }));
  if (undated.length) {
    groups.push({ key: 'undated', label: '未标注日期', photos: undated });
  }
  return groups;
}

function formatMonth(key: string) {
  const [y, m] = key.split('-');
  if (!y || !m) return key;
  return `${y} 年 ${Number(m)} 月`;
}

// 用 variants + staggerChildren 控制入场节奏，不依赖 IntersectionObserver
// 避免 AnimatePresence 切换视图时 whileInView 不触发的边缘 case
const groupContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger.tight, delayChildren: 0.08 },
  },
};

const itemFadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: ease.entrance },
  },
};

const dotPop = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: duration.base, ease: ease.overshoot },
  },
};

export default function TimelineGallery({ photos, onSelect }: TimelineGalleryProps) {
  const groups = useMemo(() => groupByDate(photos), [photos]);

  return (
    <Box sx={{ position: 'relative', pl: { xs: 3, md: 5 } }}>
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          top: 8,
          bottom: 8,
          left: { xs: 8, md: 14 },
          width: '1px',
          background: `linear-gradient(180deg, ${tokens.primary}aa, transparent)`,
        }}
      />

      <Stack spacing={{ xs: 5, md: 7 }}>
        {groups.map((group) => (
          <motion.div
            key={group.key}
            variants={groupContainer}
            initial="hidden"
            animate="visible"
            style={{ position: 'relative' }}
          >
            <Box
              component={motion.span}
              aria-hidden
              variants={dotPop}
              sx={{
                position: 'absolute',
                left: { xs: -20, md: -28 },
                top: 6,
                width: 14,
                height: 14,
                borderRadius: '50%',
                background: tokens.primary,
                boxShadow: `0 0 18px ${tokens.primary}, 0 0 2px rgba(0,0,0,0.4) inset`,
                display: 'block',
              }}
            />
            <motion.div variants={itemFadeUp}>
              <Typography
                sx={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: { xs: 22, md: 26 },
                  letterSpacing: '0.08em',
                  color: 'text.primary',
                  mb: 2,
                }}
              >
                {group.label}
                <Box
                  component="span"
                  sx={{
                    ml: 1.5,
                    color: 'text.secondary',
                    fontSize: 13,
                    letterSpacing: '0.04em',
                    fontFamily: '"Inter", sans-serif',
                  }}
                >
                  {group.photos.length} 张
                </Box>
              </Typography>
            </motion.div>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(3, 1fr)',
                  lg: 'repeat(3, 1fr)',
                },
                gap: 2.5,
              }}
            >
              {group.photos.map((photo) => {
                const ratio =
                  photo.width && photo.height
                    ? photo.width / photo.height
                    : 3 / 2;
                return (
                  <motion.div
                    key={photo.id}
                    variants={itemFadeUp}
                    whileTap={{ scale: 0.985, transition: { duration: 0.12 } }}
                  >
                    <Box
                      role="button"
                      tabIndex={0}
                      onClick={() => onSelect(photo)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          onSelect(photo);
                        }
                      }}
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1.25,
                        cursor: 'pointer',
                        '&:hover .t-frame': {
                          borderColor: glassTokens.borderStrong,
                          transform: 'translateY(-3px)',
                          boxShadow: '0 14px 32px rgba(0,0,0,0.42)',
                        },
                        '&:hover img': { transform: 'scale(1.045)' },
                        '&:focus-visible .t-frame': {
                          outline: '2px solid',
                          outlineColor: 'primary.main',
                          outlineOffset: 2,
                        },
                      }}
                    >
                      <Box
                        className="t-frame"
                        sx={{
                          position: 'relative',
                          overflow: 'hidden',
                          borderRadius: 3,
                          border: `1px solid ${glassTokens.border}`,
                          transition:
                            'border-color 400ms ease, transform 500ms cubic-bezier(0.22,1,0.36,1), box-shadow 500ms ease',
                          willChange: 'transform',
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
                      </Box>
                      <Box>
                        <Typography
                          sx={{
                            fontSize: 15,
                            letterSpacing: '0.02em',
                            color: 'text.primary',
                            mb: 0.5,
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
          </motion.div>
        ))}
      </Stack>
    </Box>
  );
}
