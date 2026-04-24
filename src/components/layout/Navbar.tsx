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
import { Menu, X } from 'lucide-react';
import { glassTokens, tokens } from '@/theme/theme';

const NAV_ITEMS = [
  { label: '首页', path: '/' },
  { label: '作品集', path: '/gallery' },
  { label: '关于', path: '/about' },
  { label: '联系', path: '/contact' },
];

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
          transition: 'all 400ms ease',
          zIndex: (t) => t.zIndex.appBar,
        }}
      >
        <Toolbar
          sx={{
            maxWidth: 1400,
            width: '100%',
            mx: 'auto',
            px: { xs: 2, md: 4 },
            minHeight: { xs: 64, md: 76 },
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
            }}
          >
            <Box
              sx={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: `radial-gradient(circle, ${tokens.primary} 0%, rgba(232,185,107,0.25) 55%, transparent 72%)`,
                boxShadow: `0 0 22px ${tokens.primary}55`,
              }}
            />
            <Box
              sx={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: { xs: 20, md: 22 },
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
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
                      transition: 'color 300ms ease',
                      '&:hover': { color: 'text.primary' },
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        left: '50%',
                        bottom: 4,
                        transform: 'translateX(-50%)',
                        width: isActive ? '18px' : '0px',
                        height: '1px',
                        background: tokens.primary,
                        transition: 'width 300ms ease',
                      },
                    }}
                  >
                    {item.label}
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
        <List>
          {NAV_ITEMS.map((item) => (
            <ListItem key={item.path} disablePadding>
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
          ))}
        </List>
      </Drawer>
    </>
  );
}
