import { Box, Button, Stack, Typography } from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';
import type { PhotoConfig } from '@/types/photo';
import { displaySrc } from '@/utils/photo';
import { tokens } from '@/theme/theme';
import { duration, ease, stagger, variants } from '@/theme/motion';

interface HeroProps {
  hero?: PhotoConfig;
}

const TITLE = 'Chasing Light';

// 大标题的容器 + 字符子项 variants
// 用 stagger 让每个字母先后浮起，打造"字从光里显形"的感觉
const titleContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger.base, delayChildren: 0.35 },
  },
};

const titleLetter = {
  hidden: { opacity: 0, y: 38, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: duration.slower, ease: ease.entrance },
  },
};

export default function Hero({ hero }: HeroProps) {
  const bg = hero ? displaySrc(hero) : undefined;

  const sectionRef = useRef<HTMLDivElement>(null);
  // 滚动视差：背景图下沉慢、文字上移快，形成景深
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-6%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.6, 0]);

  return (
    <Box
      ref={sectionRef}
      component="section"
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: { xs: '90vh', md: '100vh' },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {bg && (
        <motion.div
          initial={{ scale: 1.12, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: duration.epic, ease: ease.gentle }}
          style={{
            position: 'absolute',
            inset: '-8% 0',
            y: bgY,
            willChange: 'transform',
          }}
        >
          <img
            src={bg}
            alt=""
            fetchPriority="high"
            decoding="async"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              filter: 'saturate(1.05)',
            }}
          />
        </motion.div>
      )}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(10,10,15,0.35) 0%, rgba(10,10,15,0.55) 55%, rgba(10,10,15,0.95) 100%)',
        }}
      />

      <motion.div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: 1100,
          textAlign: 'center',
          y: contentY,
          opacity: contentOpacity,
        }}
      >
        <Box sx={{ px: { xs: 3, md: 6 } }}>
          <motion.div
            variants={variants.fadeUpSm}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            <Typography
              sx={{
                fontSize: 12,
                letterSpacing: '0.5em',
                color: tokens.primary,
                textTransform: 'uppercase',
                mb: 3,
              }}
            >
              A personal photo journal · 2025
            </Typography>
          </motion.div>

          <Typography
            component={motion.h1}
            variants={titleContainer}
            initial="hidden"
            animate="visible"
            aria-label={TITLE}
            sx={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: { xs: 68, sm: 108, md: 148, lg: 168 },
              lineHeight: 1,
              fontWeight: 400,
              fontStyle: 'italic',
              letterSpacing: '-0.01em',
              color: 'text.primary',
              mb: 1.5,
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {TITLE.split('').map((ch, i) => (
              <motion.span
                key={`${ch}-${i}`}
                variants={titleLetter}
                style={{
                  display: 'inline-block',
                  whiteSpace: ch === ' ' ? 'pre' : 'normal',
                }}
                aria-hidden
              >
                {ch}
              </motion.span>
            ))}
          </Typography>

          <motion.div
            initial={{ opacity: 0, y: 16, letterSpacing: '0.5em' }}
            animate={{ opacity: 1, y: 0, letterSpacing: '0.35em' }}
            transition={{ duration: duration.slower, delay: 1.1, ease: ease.entrance }}
          >
            <Typography
              sx={{
                fontSize: { xs: 13, md: 15 },
                color: 'rgba(245,245,247,0.72)',
                mb: 4,
              }}
            >
              光 之 所 至
            </Typography>
          </motion.div>

          <motion.div
            variants={variants.fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.3 }}
          >
            <Typography
              sx={{
                maxWidth: 560,
                mx: 'auto',
                color: 'rgba(245,245,247,0.7)',
                fontSize: { xs: 14.5, md: 16 },
                lineHeight: 1.85,
                mb: 5,
              }}
            >
              收在这里的不是风景，是我某个清晨、某次转角、某段等车时的看见。
            </Typography>
          </motion.div>

          <motion.div
            variants={variants.fadeUpSm}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.5 }}
          >
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              justifyContent="center"
            >
              <Button
                component={RouterLink}
                to="/gallery"
                variant="contained"
                endIcon={<ArrowRight size={16} />}
                sx={{ px: 3.5, py: 1.25, fontSize: 15 }}
              >
                查看作品集
              </Button>
              <Button
                component={RouterLink}
                to="/about"
                variant="outlined"
                sx={{ px: 3.5, py: 1.25, fontSize: 15, color: 'text.primary' }}
              >
                关于我
              </Button>
            </Stack>
          </motion.div>
        </Box>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { duration: duration.slower, delay: 1.8 },
          y: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
        }}
        style={{
          position: 'absolute',
          bottom: 24,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: 'rgba(245,245,247,0.55)',
          fontSize: 11,
          letterSpacing: '0.3em',
          zIndex: 1,
        }}
      >
        SCROLL
        <ChevronDown size={16} style={{ marginTop: 4 }} />
      </motion.div>
    </Box>
  );
}
