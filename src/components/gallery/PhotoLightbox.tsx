import { useEffect, useCallback, useState, useRef } from 'react';
import { Box, IconButton, Modal, Stack, Typography, Button } from '@mui/material';
import { motion, AnimatePresence, type PanInfo } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import ExifBar from './ExifBar';
import type { PhotoConfig } from '@/types/photo';
import { glassTokens } from '@/theme/theme';
import { duration, ease } from '@/theme/motion';

interface PhotoLightboxProps {
  open: boolean;
  photos: PhotoConfig[];
  index: number;
  onClose: () => void;
  onIndexChange: (next: number) => void;
}

export default function PhotoLightbox({
  open,
  photos,
  index,
  onClose,
  onIndexChange,
}: PhotoLightboxProps) {
  const current = photos[index];
  // 方向感：+1 = 往下一张（新图从右边进入），-1 = 上一张（新图从左边进入）
  const [direction, setDirection] = useState(1);
  const prevIndexRef = useRef(index);

  useEffect(() => {
    if (prevIndexRef.current !== index) {
      // 处理循环边界，让 0 ↔ last 的过渡方向符合预期
      const delta = index - prevIndexRef.current;
      const len = photos.length;
      if (delta === 1 || delta === -(len - 1)) setDirection(1);
      else if (delta === -1 || delta === len - 1) setDirection(-1);
      prevIndexRef.current = index;
    }
  }, [index, photos.length]);

  const goPrev = useCallback(() => {
    if (!photos.length) return;
    setDirection(-1);
    onIndexChange((index - 1 + photos.length) % photos.length);
  }, [index, photos.length, onIndexChange]);

  const goNext = useCallback(() => {
    if (!photos.length) return;
    setDirection(1);
    onIndexChange((index + 1) % photos.length);
  }, [index, photos.length, onIndexChange]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const threshold = 80;
    if (info.offset.x > threshold || info.velocity.x > 500) goPrev();
    else if (info.offset.x < -threshold || info.velocity.x < -500) goNext();
  };

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') goPrev();
      else if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose, goPrev, goNext]);

  if (!current) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      keepMounted={false}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: 'rgba(0, 0, 0, 0.88)',
            backdropFilter: 'blur(10px)',
          },
        },
      }}
    >
      <Box
        sx={{
          position: 'fixed',
          inset: 0,
          outline: 'none',
          display: 'flex',
          flexDirection: 'column',
        }}
        onClick={onClose}
      >
        <IconButton
          onClick={onClose}
          aria-label="关闭"
          sx={{
            position: 'absolute',
            top: { xs: 12, md: 20 },
            right: { xs: 12, md: 20 },
            color: 'text.primary',
            background: glassTokens.bg,
            backdropFilter: glassTokens.blur,
            border: `1px solid ${glassTokens.border}`,
            '&:hover': { background: glassTokens.bgHover },
            zIndex: 2,
          }}
        >
          <X size={18} />
        </IconButton>

        {photos.length > 1 && (
          <>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              aria-label="上一张"
              sx={{
                position: 'absolute',
                top: '50%',
                left: { xs: 8, md: 24 },
                transform: 'translateY(-50%)',
                color: 'text.primary',
                background: glassTokens.bg,
                backdropFilter: glassTokens.blur,
                border: `1px solid ${glassTokens.border}`,
                '&:hover': { background: glassTokens.bgHover },
                zIndex: 2,
              }}
            >
              <ChevronLeft size={20} />
            </IconButton>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              aria-label="下一张"
              sx={{
                position: 'absolute',
                top: '50%',
                right: { xs: 8, md: 24 },
                transform: 'translateY(-50%)',
                color: 'text.primary',
                background: glassTokens.bg,
                backdropFilter: glassTokens.blur,
                border: `1px solid ${glassTokens.border}`,
                '&:hover': { background: glassTokens.bgHover },
                zIndex: 2,
              }}
            >
              <ChevronRight size={20} />
            </IconButton>
          </>
        )}

        <Box
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            px: { xs: 2, md: 8 },
            pt: { xs: 8, md: 6 },
            pb: 2,
            minHeight: 0,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.img
              key={current.id}
              src={current.src}
              alt={current.alt}
              custom={direction}
              drag={photos.length > 1 ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              variants={{
                enter: (dir: number) => ({
                  opacity: 0,
                  x: dir * 80,
                  scale: 0.96,
                }),
                center: { opacity: 1, x: 0, scale: 1 },
                exit: (dir: number) => ({
                  opacity: 0,
                  x: dir * -60,
                  scale: 0.96,
                }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: duration.base,
                ease: ease.entrance,
              }}
              style={{
                maxWidth: '100%',
                maxHeight: '85vh',
                objectFit: 'contain',
                display: 'block',
                borderRadius: 6,
                boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
                cursor: photos.length > 1 ? 'grab' : 'default',
                willChange: 'transform',
              }}
              whileDrag={{ cursor: 'grabbing', scale: 0.98 }}
            />
          </AnimatePresence>
        </Box>

        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: duration.slow, delay: 0.15, ease: ease.entrance }}
          onClick={(e) => e.stopPropagation()}
          sx={{
            width: '100%',
            px: { xs: 2, md: 4 },
            pb: { xs: 2.5, md: 3.5 },
          }}
        >
          <Box
            sx={{
              mx: 'auto',
              maxWidth: 1200,
              p: { xs: 2, md: 2.5 },
              borderRadius: 3,
              background: glassTokens.bg,
              backdropFilter: glassTokens.blur,
              border: `1px solid ${glassTokens.border}`,
            }}
          >
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              alignItems={{ xs: 'flex-start', md: 'center' }}
              justifyContent="space-between"
              gap={2}
            >
              <Box sx={{ minWidth: 0, flex: 1 }}>
                <Typography
                  sx={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontSize: { xs: 20, md: 24 },
                    lineHeight: 1.2,
                    mb: 0.75,
                  }}
                >
                  {current.alt}
                </Typography>
                <ExifBar exif={current.exif} />
              </Box>
              <Button
                component="a"
                href={current.src}
                target="_blank"
                rel="noreferrer"
                variant="outlined"
                startIcon={<ExternalLink size={15} />}
                sx={{ alignSelf: { xs: 'stretch', md: 'auto' } }}
              >
                查看原图
              </Button>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
