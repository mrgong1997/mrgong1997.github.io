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
    MuiChip: {
      styleOverrides: {
        root: {
          backdropFilter: glassTokens.blur,
          background: glassTokens.bg,
          border: `1px solid ${glassTokens.border}`,
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          color: TEXT_SECONDARY,
          border: `1px solid ${glassTokens.border}`,
          textTransform: 'none',
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
  },
});

export const tokens = {
  primary: PRIMARY,
  secondary: SECONDARY,
  bg: BG_DARK,
  textPrimary: TEXT_PRIMARY,
  textSecondary: TEXT_SECONDARY,
};
