import { Helmet } from 'react-helmet-async';
import { Box, Button, Container, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import PageTransition from '@/components/layout/PageTransition';
import { tokens } from '@/theme/theme';

export default function NotFound() {
  return (
    <PageTransition>
      <Helmet>
        <title>页面走丢了 · Chasing Light</title>
      </Helmet>
      <Box
        sx={{
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pt: { xs: 12, md: 16 },
        }}
      >
        <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
          <Typography
            sx={{
              fontSize: 12,
              letterSpacing: '0.4em',
              color: tokens.primary,
              textTransform: 'uppercase',
              mb: 2,
            }}
          >
            404
          </Typography>
          <Typography
            sx={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: { xs: 40, md: 56 },
              mb: 2,
            }}
          >
            这里没有光了
          </Typography>
          <Typography sx={{ color: 'text.secondary', mb: 4 }}>
            页面可能已被移走，让我们换一个方向。
          </Typography>
          <Button component={RouterLink} to="/" variant="contained">
            回到首页
          </Button>
        </Container>
      </Box>
    </PageTransition>
  );
}
