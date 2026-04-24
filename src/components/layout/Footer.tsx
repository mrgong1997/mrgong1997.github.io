import { Box, Container, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Github, Instagram, Mail } from 'lucide-react';
import { glassTokens, tokens } from '@/theme/theme';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        position: 'relative',
        zIndex: 1,
        mt: { xs: 8, md: 12 },
        borderTop: `1px solid ${glassTokens.border}`,
        background: 'rgba(10,10,15,0.4)',
        backdropFilter: glassTokens.blur,
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          py: { xs: 5, md: 6 },
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'flex-start', md: 'center' },
          justifyContent: 'space-between',
          gap: 3,
        }}
      >
        <Box>
          <Box
            component={RouterLink}
            to="/"
            sx={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: 22,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'text.primary',
              display: 'inline-block',
            }}
          >
            Chasing Light
          </Box>
          <Box
            sx={{
              mt: 1,
              color: 'text.secondary',
              fontSize: 13,
              letterSpacing: '0.04em',
            }}
          >
            追逐光的人 · 一份私人摄影笔记
          </Box>
        </Box>

        <Stack direction="row" spacing={1.5}>
          {[
            { icon: <Instagram size={18} />, href: 'https://instagram.com', label: 'Instagram' },
            { icon: <Github size={18} />, href: 'https://github.com', label: 'GitHub' },
            { icon: <Mail size={18} />, href: 'mailto:hi@example.com', label: 'Email' },
          ].map((item) => (
            <Box
              key={item.label}
              component="a"
              href={item.href}
              target="_blank"
              rel="noreferrer"
              aria-label={item.label}
              sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: `1px solid ${glassTokens.border}`,
                background: glassTokens.bg,
                backdropFilter: glassTokens.blur,
                color: 'text.secondary',
                transition: 'all 300ms ease',
                '&:hover': {
                  color: tokens.primary,
                  borderColor: tokens.primary,
                  transform: 'translateY(-2px)',
                },
              }}
            >
              {item.icon}
            </Box>
          ))}
        </Stack>
      </Container>

      <Box
        sx={{
          borderTop: `1px solid ${glassTokens.border}`,
          py: 2.5,
          textAlign: 'center',
          color: 'text.secondary',
          fontSize: 12,
          letterSpacing: '0.08em',
        }}
      >
        © {new Date().getFullYear()} Chasing Light · Made with light
      </Box>
    </Box>
  );
}
