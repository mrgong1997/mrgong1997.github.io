import { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Box,
  Container,
  Stack,
  Typography,
  Divider,
} from '@mui/material';
import { motion } from 'framer-motion';

import PageTransition from '@/components/layout/PageTransition';
import MasonryGallery from '@/components/gallery/MasonryGallery';
import TimelineGallery from '@/components/gallery/TimelineGallery';
import PhotoLightbox from '@/components/gallery/PhotoLightbox';
import CategoryFilter from '@/components/gallery/CategoryFilter';
import ViewModeToggle, { type ViewMode } from '@/components/gallery/ViewModeToggle';

import { photos, categories } from '@/config/photos';
import { tokens } from '@/theme/theme';

export default function Gallery() {
  const [view, setView] = useState<ViewMode>('masonry');
  const [category, setCategory] = useState<string>('全部');
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const filtered = useMemo(() => {
    if (category === '全部') return photos;
    return photos.filter((p) => p.tags?.includes(category));
  }, [category]);

  return (
    <PageTransition>
      <Helmet>
        <title>作品集 · Chasing Light</title>
        <meta name="description" content="全部作品 — 瀑布流与时间线两种视图浏览。" />
      </Helmet>

      <Box sx={{ pt: { xs: 14, md: 18 }, pb: 4 }}>
        <Container maxWidth="xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
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
              Gallery · 作品集
            </Typography>
            <Typography
              component="h1"
              sx={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: { xs: 40, md: 64 },
                lineHeight: 1.1,
                mb: 2,
              }}
            >
              散落在日子里的光
            </Typography>
            <Typography
              sx={{
                color: 'text.secondary',
                maxWidth: 620,
                lineHeight: 1.8,
                mb: { xs: 4, md: 6 },
              }}
            >
              你可以用瀑布流按视觉节奏浏览，或切换到时间线回顾它们发生的时刻。
            </Typography>
          </motion.div>

          <Stack
            direction={{ xs: 'column', md: 'row' }}
            alignItems={{ xs: 'flex-start', md: 'center' }}
            justifyContent="space-between"
            spacing={2}
            sx={{ mb: 3 }}
          >
            <ViewModeToggle value={view} onChange={setView} />
            <Typography sx={{ color: 'text.secondary', fontSize: 13 }}>
              共 {filtered.length} 张 · 从 {photos.length} 张中筛选
            </Typography>
          </Stack>

          {view === 'masonry' && (
            <Box sx={{ mb: 4 }}>
              <CategoryFilter
                categories={categories}
                active={category}
                onChange={setCategory}
              />
            </Box>
          )}

          <Divider
            sx={{
              borderColor: 'rgba(255,255,255,0.06)',
              mb: { xs: 4, md: 6 },
            }}
          />

          {view === 'masonry' ? (
            <MasonryGallery
              photos={filtered}
              onSelect={(i) => {
                setIndex(i);
                setOpen(true);
              }}
            />
          ) : (
            <TimelineGallery
              photos={photos}
              onSelect={(photo) => {
                const i = photos.findIndex((p) => p.id === photo.id);
                setIndex(i >= 0 ? i : 0);
                setOpen(true);
              }}
            />
          )}
        </Container>
      </Box>

      <PhotoLightbox
        open={open}
        photos={view === 'masonry' ? filtered : photos}
        index={index}
        onClose={() => setOpen(false)}
        onIndexChange={setIndex}
      />
    </PageTransition>
  );
}
