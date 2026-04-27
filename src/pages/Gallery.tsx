import {
  useMemo,
  useState,
  useCallback,
  startTransition,
  useDeferredValue,
} from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Box,
  Container,
  Stack,
  Typography,
  Divider,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

import PageTransition from '@/components/layout/PageTransition';
import MasonryGallery from '@/components/gallery/MasonryGallery';
import TimelineGallery from '@/components/gallery/TimelineGallery';
import PhotoLightbox from '@/components/gallery/PhotoLightbox';
import CategoryFilter from '@/components/gallery/CategoryFilter';
import ViewModeToggle, { type ViewMode } from '@/components/gallery/ViewModeToggle';

import { photos, categories } from '@/config/photos';
import { tokens } from '@/theme/theme';
import { duration, ease } from '@/theme/motion';

export default function Gallery() {
  const [view, setView] = useState<ViewMode>('masonry');
  const [category, setCategory] = useState<string>('全部');
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const deferredCategory = useDeferredValue(category);
  const filtered = useMemo(() => {
    if (deferredCategory === '全部') return photos;
    return photos.filter((p) => p.tags?.includes(deferredCategory));
  }, [deferredCategory]);

  const handleViewChange = useCallback((next: ViewMode) => {
    startTransition(() => setView(next));
  }, []);

  const handleCategoryChange = useCallback((next: string) => {
    startTransition(() => setCategory(next));
  }, []);

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
            <ViewModeToggle value={view} onChange={handleViewChange} />
            <Typography
              sx={{
                color: 'text.secondary',
                fontSize: 13,
                opacity: category !== deferredCategory ? 0.65 : 1,
                transition: 'opacity 200ms ease',
              }}
            >
              共 {filtered.length} 张 · 从 {photos.length} 张中筛选
            </Typography>
          </Stack>

          <AnimatePresence initial={false}>
            {view === 'masonry' && (
              <motion.div
                key="filter"
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: 'auto', marginBottom: 32 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                transition={{ duration: duration.base, ease: ease.standard }}
                style={{ overflow: 'hidden' }}
              >
                <CategoryFilter
                  categories={categories}
                  active={category}
                  onChange={handleCategoryChange}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <Divider
            sx={{
              borderColor: 'rgba(255,255,255,0.06)',
              mb: { xs: 4, md: 6 },
            }}
          />

          <motion.div
            key={view}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: duration.base, ease: ease.entrance }}
          >
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
          </motion.div>
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
