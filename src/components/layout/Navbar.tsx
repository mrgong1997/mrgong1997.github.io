import { useEffect, useState } from 'react';
import { Link as RouterLink, NavLink, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { glassTokens, tokens } from '@/theme/theme';
import { duration, ease, stagger } from '@/theme/motion';

const NAV_ITEMS = [
  { label: '首页', path: '/' },
  { label: '作品集', path: '/gallery' },
  { label: '关于', path: '/about' },
  { label: '联系', path: '/contact' },
];

const prefetchRoute = (path: string) => {
  if (path === '/gallery') void import('../../pages/Gallery');
  else if (path === '/about') void import('../../pages/About');
  else if (path === '/contact') void import('../../pages/Contact');
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: scrolled ? 'rgba(10,10,15,0.72)' : 'rgba(10,10,15,0.3)',
          backdropFilter: glassTokens.blur,
          WebkitBackdropFilter: glassTokens.blur,
          borderBottom: `1px solid ${
            scrolled ? glassTokens.border : 'transparent'
          }`,
          transition:
            'background 400ms ease, border-color 400ms ease, min-height 400ms cubic-bezier(0.22,1,0.36,1)',
          zIndex: (t) => t.zIndex.appBar,
        }}
      >
        <Toolbar
          sx={{
            maxWidth: 1400,
            width: '100%',
            mx: 'auto',
            px: { xs: 2, md: 4 },
            minHeight: {
              xs: scrolled ? 56 : 64,
              md: scrolled ? 64 : 76,
            },
            transition: 'min-height 400ms cubic-bezier(0.22,1,0.36,1)',
            justifyContent: 'space-between',
          }}
        >
          <Box
            component={RouterLink}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.25,
              color: 'text.primary',
              transition: 'opacity 200ms ease',
              '&:hover .logo-dot': {
                transform: 'scale(1.15)',
                filter: 'brightness(1.25)',
              },
              '&:hover .logo-text': { letterSpacing: '0.17em' },
            }}
          >
            <Box
              className="logo-dot"
              sx={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: `radial-gradient(circle, ${tokens.primary} 0%, rgba(232,185,107,0.25) 55%, transparent 72%)`,
                animation: 'softPulse 3.6s ease-in-out infinite',
                transition:
                  'transform 300ms cubic-bezier(0.22,1,0.36,1), filter 300ms ease',
                willChange: 'transform',
              }}
            />
            <Box
              className="logo-text"
              sx={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: { xs: 20, md: 22 },
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                transition: 'letter-spacing 300ms ease',
              }}
            >
              Chasing Light
            </Box>
          </Box>

          <Box
            component="nav"
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 1,
            }}
          >
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                style={{ textDecoration: 'none' }}
                onMouseEnter={() => prefetchRoute(item.path)}
                onFocus={() => prefetchRoute(item.path)}
              >
                {({ isActive }) => (
                  <Box
                    sx={{
                      px: 2,
                      py: 1,
                      fontSize: 14,
                      letterSpacing: '0.08em',
                      color: isActive ? tokens.primary : 'text.secondary',
                      position: 'relative',
                      transition: 'color 300ms ease, transform 200ms ease',
                      '&:hover': {
                        color: isActive ? tokens.primary : 'text.primary',
                      },
                      '&:active': { transform: 'scale(0.96)' },
                    }}
                  >
                    {item.label}
                    {/* layoutId 让下划线在不同菜单项之间平滑滑动 */}
                    {isActive && (
                      <Box
                        component={motion.span}
                        layoutId="nav-underline"
                        transition={{
                          type: 'spring',
                          stiffness: 380,
                          damping: 30,
                        }}
                        sx={{
                          position: 'absolute',
                          left: '50%',
                          bottom: 4,
                          transform: 'translateX(-50%)',
                          width: '18px',
                          height: '1.5px',
                          background: tokens.primary,
                          borderRadius: 1,
                          boxShadow: `0 0 8px ${tokens.primary}aa`,
                        }}
                      />
                    )}
                  </Box>
                )}
              </NavLink>
            ))}
          </Box>

          <IconButton
            onClick={() => setDrawerOpen(true)}
            sx={{ display: { xs: 'inline-flex', md: 'none' }, color: 'text.primary' }}
            aria-label="打开菜单"
          >
            <Menu size={22} />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: 260,
            background: 'rgba(10,10,15,0.9)',
            backdropFilter: glassTokens.blur,
            borderLeft: `1px solid ${glassTokens.border}`,
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1.5 }}>
          <IconButton onClick={() => setDrawerOpen(false)} aria-label="关闭菜单">
            <X size={20} />
          </IconButton>
        </Box>
        <AnimatePresence>
          {drawerOpen && (
            <Box
              component={motion.div}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: stagger.base,
                    delayChildren: 0.08,
                  },
                },
              }}
            >
              <List>
                {NAV_ITEMS.map((item) => (
                  <motion.div
                    key={item.path}
                    variants={{
                      hidden: { opacity: 0, x: 20 },
                      visible: {
                        opacity: 1,
                        x: 0,
                        transition: {
                          duration: duration.base,
                          ease: ease.entrance,
                        },
                      },
                    }}
                  >
                    <ListItem disablePadding>
                      <ListItemButton
                        component={NavLink}
                        to={item.path}
                        end={item.path === '/'}
                        sx={{
                          py: 1.5,
                          '&.active': { color: tokens.primary },
                        }}
                      >
                        <ListItemText
                          primary={item.label}
                          primaryTypographyProps={{
                            sx: { fontSize: 18, letterSpacing: '0.08em' },
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                  </motion.div>
                ))}
              </List>
            </Box>
          )}
        </AnimatePresence>
      </Drawer>
    </>
  );
}
