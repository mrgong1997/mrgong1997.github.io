import { Helmet } from 'react-helmet-async';
import { Box, Container, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { Mail, Instagram, Github, MapPin, ArrowUpRight } from 'lucide-react';

import PageTransition from '@/components/layout/PageTransition';
import GlassCard from '@/components/ui/GlassCard';
import { tokens } from '@/theme/theme';
import { duration, ease, stagger } from '@/theme/motion';

const CONTACTS = [
  {
    icon: <Mail size={18} />,
    label: 'Email',
    value: 'hi@example.com',
    href: 'mailto:hi@example.com',
  },
  {
    icon: <Instagram size={18} />,
    label: 'Instagram',
    value: '@chasing.light',
    href: 'https://instagram.com',
  },
  {
    icon: <Github size={18} />,
    label: 'GitHub',
    value: 'github.com/chasing-light',
    href: 'https://github.com',
  },
  {
    icon: <MapPin size={18} />,
    label: 'Location',
    value: '中国 · 北京',
    href: undefined,
  },
];

export default function Contact() {
  return (
    <PageTransition>
      <Helmet>
        <title>联系 · Chasing Light</title>
        <meta name="description" content="通过邮箱或社交账号联系摄影者。" />
      </Helmet>

      <Box sx={{ pt: { xs: 14, md: 18 }, pb: { xs: 10, md: 16 } }}>
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
              Contact
            </Typography>
            <Typography
              component="h1"
              sx={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: { xs: 40, md: 56 },
                lineHeight: 1.15,
                mb: 3,
              }}
            >
              来打个招呼
            </Typography>
            <Typography
              sx={{
                color: 'rgba(245,245,247,0.75)',
                fontSize: { xs: 15, md: 17 },
                lineHeight: 1.9,
                maxWidth: 560,
                mb: { xs: 5, md: 7 },
              }}
            >
              如果你喜欢某张照片、想交换拍摄心得，或只是想随便聊聊，
              随时发邮件或者在下面任意一个平台找到我。
            </Typography>
          </motion.div>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
              gap: 2.5,
            }}
          >
            {CONTACTS.map((item, i) => (
              <motion.div
                key={item.label}
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
                  interactive={Boolean(item.href)}
                  component={item.href ? 'a' : 'div'}
                  {...(item.href
                    ? {
                        href: item.href,
                        target: item.href.startsWith('http') ? '_blank' : undefined,
                        rel: 'noreferrer',
                      }
                    : {})}
                  sx={{
                    p: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    color: 'inherit',
                    textDecoration: 'none',
                    '&:hover .contact-icon': {
                      transform: 'rotate(-6deg) scale(1.08)',
                      background: 'rgba(232,185,107,0.18)',
                    },
                    '&:hover .contact-arrow': {
                      transform: 'translate(3px, -3px)',
                      color: tokens.primary,
                    },
                  }}
                >
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Box
                      className="contact-icon"
                      sx={{
                        width: 44,
                        height: 44,
                        borderRadius: '50%',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(232,185,107,0.1)',
                        color: tokens.primary,
                        transition:
                          'transform 400ms cubic-bezier(0.34,1.4,0.64,1), background 400ms ease',
                        willChange: 'transform',
                      }}
                    >
                      {item.icon}
                    </Box>
                    <Box>
                      <Typography
                        sx={{
                          fontSize: 11,
                          letterSpacing: '0.3em',
                          color: 'text.secondary',
                          textTransform: 'uppercase',
                          mb: 0.25,
                        }}
                      >
                        {item.label}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 15.5,
                          letterSpacing: '0.02em',
                        }}
                      >
                        {item.value}
                      </Typography>
                    </Box>
                  </Stack>
                  {item.href && (
                    <Box
                      className="contact-arrow"
                      sx={{
                        color: 'text.secondary',
                        transition:
                          'transform 300ms cubic-bezier(0.22,1,0.36,1), color 300ms ease',
                        willChange: 'transform',
                      }}
                    >
                      <ArrowUpRight size={18} />
                    </Box>
                  )}
                </GlassCard>
              </motion.div>
            ))}
          </Box>

          <Typography
            sx={{
              mt: { xs: 6, md: 10 },
              textAlign: 'center',
              color: 'text.secondary',
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: { xs: 20, md: 26 },
              letterSpacing: '0.04em',
            }}
          >
            愿你也拥有很多追光的日子。
          </Typography>
        </Container>
      </Box>
    </PageTransition>
  );
}
