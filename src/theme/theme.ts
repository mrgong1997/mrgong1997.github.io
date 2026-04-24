import { createTheme, alpha } from '@mui/material/styles';

const PRIMARY = '#E8B96B';
const SECONDARY = '#8EA4C9';
const BG_DARK = '#0A0A0F';
const TEXT_PRIMARY = '#F5F5F7';
const TEXT_SECONDARY = '#9CA3AF';

export const glassTokens = {
  bg: 'rgba(255, 255, 255, 0.06)',
  bgHover: 'rgba(255, 255, 255, 0.1)',
  border: 'rgba(255, 255, 255, 0.08)',
  borderStrong: 'rgba(255, 255, 255, 0.14)',
  blur: 'blur(20px)',
  shadow: '0 8px 32px rgba(0, 0, 0, 0.35)',
};

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: PRIMARY,
      contrastText: '#1A1A1A',
    },
    secondary: {
      main: SECONDARY,
    },
    background: {
      default: BG_DARK,
      paper: 'rgba(255,255,255,0.04)',
    },
    text: {
      primary: TEXT_PRIMARY,
      secondary: TEXT_SECONDARY,
    },
    divider: alpha('#ffffff', 0.08),
  },
  typography: {
    fontFamily:
      '"Inter", "Noto Sans SC", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: {
      fontFamily: '"Cormorant Garamond", "Noto Sans SC", serif',
      fontWeight: 500,
      letterSpacing: '0.02em',
    },
    h2: {
      fontFamily: '"Cormorant Garamond", "Noto Sans SC", serif',
      fontWeight: 500,
      letterSpacing: '0.01em',
    },
    h3: {
      fontFamily: '"Cormorant Garamond", "Noto Sans SC", serif',
      fontWeight: 500,
    },
    h4: {
      fontFamily: '"Cormorant Garamond", "Noto Sans SC", serif',
      fontWeight: 500,
    },
    body1: {
      lineHeight: 1.75,
    },
    button: {
      textTransform: 'none',
      letterSpacing: '0.04em',
    },
  },
  shape: {
    borderRadius: 14,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: BG_DARK,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          paddingInline: 22,
          paddingBlock: 10,
          transition:
            'transform 200ms cubic-bezier(0.4,0,0.2,1), background 300ms ease, border-color 300ms ease, box-shadow 300ms ease',
          willChange: 'transform',
          '&:active': {
            transform: 'scale(0.96)',
          },
          '&:focus-visible': {
            outline: `2px solid ${alpha(PRIMARY, 0.7)}`,
            outlineOffset: 3,
          },
        },
        contained: {
          boxShadow: `0 8px 24px ${alpha(PRIMARY, 0.25)}`,
          '&:hover': {
            boxShadow: `0 12px 32px ${alpha(PRIMARY, 0.38)}`,
          },
        },
        outlined: {
          borderColor: glassTokens.borderStrong,
          backdropFilter: glassTokens.blur,
          background: glassTokens.bg,
          '&:hover': {
            borderColor: PRIMARY,
            background: glassTokens.bgHover,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition:
            'transform 180ms cubic-bezier(0.4,0,0.2,1), background 300ms ease, color 300ms ease',
          willChange: 'transform',
          '&:hover': {
            transform: 'scale(1.06)',
          },
          '&:active': {
            transform: 'scale(0.92)',
          },
          '&:focus-visible': {
            outline: `2px solid ${alpha(PRIMARY, 0.7)}`,
            outlineOffset: 2,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backdropFilter: glassTokens.blur,
          background: 'transparent',
          border: `1px solid ${glassTokens.border}`,
          transition:
            'background 300ms ease, color 300ms ease, border-color 300ms ease, box-shadow 300ms ease',
          '&:active': {
            transform: 'scale(0.96)',
          },
          '&:focus-visible': {
            outline: 'none',
            boxShadow: `0 0 0 3px ${alpha(PRIMARY, 0.28)}`,
          },
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          color: TEXT_SECONDARY,
          border: `1px solid ${glassTokens.border}`,
          textTransform: 'none',
          transition:
            'transform 200ms cubic-bezier(0.4,0,0.2,1), background 300ms ease, color 300ms ease, border-color 300ms ease',
          '&:active': {
            transform: 'scale(0.96)',
          },
          '&.Mui-selected': {
            color: PRIMARY,
            background: alpha(PRIMARY, 0.08),
            borderColor: alpha(PRIMARY, 0.4),
            '&:hover': {
              background: alpha(PRIMARY, 0.14),
            },
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          transition:
            'background 240ms ease, color 240ms ease, padding-left 240ms ease',
          '&:hover': {
            background: alpha('#ffffff', 0.04),
            paddingLeft: 24,
          },
        },
      },
    },
  },
});

export const tokens = {
  primary: PRIMARY,
  secondary: SECONDARY,
  bg: BG_DARK,
  textPrimary: TEXT_PRIMARY,
  textSecondary: TEXT_SECONDARY,
};
