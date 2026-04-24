import { Box, Button, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';
import type { PhotoConfig } from '@/types/photo';
import { tokens } from '@/theme/theme';

interface HeroProps {
  hero?: PhotoConfig;
}

export default function Hero({ hero }: HeroProps) {
  const bg = hero?.src ?? hero?.thumbnail;

  return (
    <Box
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
        <Box
          component={motion.div}
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${bg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'saturate(1.05)',
          }}
        />
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

      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: 1100,
          px: { xs: 3, md: 6 },
          textAlign: 'center',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
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

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.35 }}
        >
          <Typography
            component="h1"
            sx={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: { xs: 68, sm: 108, md: 148, lg: 168 },
              lineHeight: 1,
              fontWeight: 400,
              fontStyle: 'italic',
              letterSpacing: '-0.01em',
              color: 'text.primary',
              mb: 1.5,
            }}
          >
            Chasing Light
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <Typography
            sx={{
              fontSize: { xs: 13, md: 15 },
              letterSpacing: '0.35em',
              color: 'rgba(245,245,247,0.72)',
              mb: 4,
            }}
          >
            光 之 所 至
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.65 }}
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
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.85 }}
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

      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { duration: 1, delay: 1.2 },
          y: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
        }}
        sx={{
          position: 'absolute',
          bottom: 24,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: 'text.secondary',
          fontSize: 11,
          letterSpacing: '0.3em',
          zIndex: 1,
        }}
      >
        SCROLL
        <ChevronDown size={16} style={{ marginTop: 4 }} />
      </Box>
    </Box>
  );
}
