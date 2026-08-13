import { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Button, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';

import PageTransition from '@/components/layout/PageTransition';
import Hero from '@/components/home/Hero';
import Intro from '@/components/home/Intro';
import FeaturedWorks from '@/components/home/FeaturedWorks';
import { photos } from '@/config/photos';
import { displaySrc } from '@/utils/photo';
import { tokens } from '@/theme/theme';

export default function Home() {
  const featured = useMemo(
    () => photos.filter((p) => p.tags?.includes('featured')).slice(0, 6),
    [],
  );
  const heroPhoto = featured[0] ?? photos[0];
  const featuredForGrid = featured.length ? featured : photos.slice(0, 6);

  return (
    <PageTransition>
      <Helmet>
        <title>Chasing Light · 追逐光的人</title>
        <meta
          name="description"
          content="Chasing Light 是一份私人摄影作品集，收录城市、风景、街头与人像的光影瞬间。"
        />
        {heroPhoto && (
          <link rel="preload" as="image" href={displaySrc(heroPhoto)} />
        )}
      </Helmet>

      <Hero hero={heroPhoto} />
      <Intro />
      <FeaturedWorks photos={featuredForGrid} />

      <Container maxWidth="md" sx={{ pb: { xs: 10, md: 16 }, textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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
            Keep exploring
          </Typography>
          <Typography
            sx={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: { xs: 28, md: 38 },
              mb: 3,
            }}
          >
            翻阅更多日常里的光
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              component={RouterLink}
              to="/gallery"
              variant="contained"
              endIcon={<ArrowRight size={16} />}
              sx={{ px: 3.5, py: 1.25 }}
            >
              进入作品集
            </Button>
            <Button
              component={RouterLink}
              to="/contact"
              variant="outlined"
              sx={{ px: 3.5, py: 1.25, color: 'text.primary' }}
            >
              说点什么
            </Button>
          </Box>
        </motion.div>
      </Container>
    </PageTransition>
  );
}
