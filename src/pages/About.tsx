import { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Container, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { Camera, Aperture, MapPin, Sparkles } from 'lucide-react';

import PageTransition from '@/components/layout/PageTransition';
import GlassCard from '@/components/ui/GlassCard';
import { photos } from '@/config/photos';
import { tokens } from '@/theme/theme';
import { duration, ease, stagger } from '@/theme/motion';

interface GearItem {
  label: string;
  count: number;
}

function aggregateGear(key: 'model' | 'lens'): GearItem[] {
  const map = new Map<string, number>();
  for (const p of photos) {
    const value = p.exif?.[key];
    if (!value) continue;
    map.set(value, (map.get(value) ?? 0) + 1);
  }
  return Array.from(map.entries())
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count);
}

export default function About() {
  const cameras = useMemo(() => aggregateGear('model'), []);
  const lenses = useMemo(() => aggregateGear('lens'), []);

  const principles = [
    {
      icon: <Sparkles size={18} />,
      title: '为光停留',
      text: '如果一束光让我停下脚步，它就值得被记录。',
    },
    {
      icon: <Camera size={18} />,
      title: '最少的装备',
      text: '一台相机、一只定焦，大多数时候已经足够。',
    },
    {
      icon: <Aperture size={18} />,
      title: '克制的后期',
      text: '让画面接近当时眼睛看到的样子，不夸张颜色。',
    },
    {
      icon: <MapPin size={18} />,
      title: '走在本地',
      text: '大部分照片都来自每天上下班的路，以及偶尔的短途旅行。',
    },
  ];

  return (
    <PageTransition>
      <Helmet>
        <title>关于 · Chasing Light</title>
        <meta name="description" content="关于摄影者、拍摄理念与常用器材。" />
      </Helmet>

      <Box sx={{ pt: { xs: 14, md: 18 }, pb: { xs: 8, md: 14 } }}>
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: duration.slower, ease: ease.entrance }}
          >
            <Typography
              sx={{
                fontSize: 12,
                letterSpacing: '0.4em',
                color: tokens.primary,
                textTransform: 'uppercase',
                mb: 2,
              }}
            >
              About
            </Typography>
            <Typography
              component="h1"
              sx={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: { xs: 40, md: 56 },
                lineHeight: 1.15,
                mb: 4,
              }}
            >
              关于这份作品集
            </Typography>
            <Typography
              sx={{
                color: 'rgba(245,245,247,0.75)',
                fontSize: { xs: 15, md: 17 },
                lineHeight: 1.9,
                mb: 2,
              }}
            >
              我是一个业余摄影者，没有宏大的项目，也没有完整的系列。
              更像是用相机写日记：把每天走过的路、窗外忽然亮起的云、
              夜里便利店门口冷冷的白光，一张一张地放在这里。
            </Typography>
            <Typography
              sx={{
                color: 'rgba(245,245,247,0.75)',
                fontSize: { xs: 15, md: 17 },
                lineHeight: 1.9,
              }}
            >
              如果你翻到其中某一张有一点点被打动，那就是我拍照的理由。
            </Typography>
          </motion.div>

          <Box sx={{ mt: { xs: 6, md: 10 } }}>
            <Typography
              sx={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: { xs: 26, md: 34 },
                mb: 3,
              }}
            >
              拍摄理念
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                gap: 2.5,
              }}
            >
              {principles.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: duration.slow,
                    delay: i * stagger.base,
                    ease: ease.entrance,
                  }}
                >
                  <GlassCard
                    interactive
                    sx={{
                      p: 3,
                      '&:hover .principle-icon': {
                        transform: 'rotate(-8deg) scale(1.1)',
                        background: 'rgba(232,185,107,0.22)',
                      },
                    }}
                  >
                    <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.25 }}>
                      <Box
                        className="principle-icon"
                        sx={{
                          width: 32,
                          height: 32,
                          borderRadius: '50%',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: 'rgba(232,185,107,0.12)',
                          color: tokens.primary,
                          transition:
                            'transform 400ms cubic-bezier(0.34,1.4,0.64,1), background 400ms ease',
                          willChange: 'transform',
                        }}
                      >
                        {p.icon}
                      </Box>
                      <Typography sx={{ fontSize: 17, letterSpacing: '0.02em' }}>
                        {p.title}
                      </Typography>
                    </Stack>
                    <Typography
                      sx={{
                        color: 'text.secondary',
                        fontSize: 14.5,
                        lineHeight: 1.8,
                      }}
                    >
                      {p.text}
                    </Typography>
                  </GlassCard>
                </motion.div>
              ))}
            </Box>
          </Box>

          {(cameras.length > 0 || lenses.length > 0) && (
            <Box sx={{ mt: { xs: 6, md: 10 } }}>
              <Typography
                sx={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: { xs: 26, md: 34 },
                  mb: 3,
                }}
              >
                常用器材
              </Typography>
              <Stack spacing={3}>
                {cameras.length > 0 && (
                  <GearGroup title="机身" items={cameras} />
                )}
                {lenses.length > 0 && <GearGroup title="镜头" items={lenses} />}
              </Stack>
            </Box>
          )}
        </Container>
      </Box>
    </PageTransition>
  );
}

function GearGroup({ title, items }: { title: string; items: GearItem[] }) {
  return (
    <Box>
      <Typography
        sx={{
          fontSize: 12,
          letterSpacing: '0.3em',
          color: 'text.secondary',
          textTransform: 'uppercase',
          mb: 1.5,
        }}
      >
        {title}
      </Typography>
      <Stack direction="row" flexWrap="wrap" useFlexGap spacing={1} sx={{ rowGap: 1 }}>
        {items.map((item) => (
          <Box
            key={item.label}
            sx={{
              px: 1.75,
              py: 0.75,
              borderRadius: 999,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
              fontSize: 13,
              color: 'text.primary',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <span>{item.label}</span>
            <Box
              component="span"
              sx={{
                fontSize: 11,
                color: 'text.secondary',
                letterSpacing: '0.08em',
              }}
            >
              ×{item.count}
            </Box>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
