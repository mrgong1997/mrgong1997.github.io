import { Box, type BoxProps } from '@mui/material';
import { forwardRef } from 'react';
import { glassTokens } from '@/theme/theme';

interface GlassCardProps extends BoxProps {
  interactive?: boolean;
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(function GlassCard(
  { interactive, sx, children, ...rest },
  ref,
) {
  return (
    <Box
      ref={ref}
      {...rest}
      sx={[
        {
          position: 'relative',
          background: glassTokens.bg,
          backdropFilter: glassTokens.blur,
          WebkitBackdropFilter: glassTokens.blur,
          border: `1px solid ${glassTokens.border}`,
          borderRadius: 3,
          boxShadow: glassTokens.shadow,
          transition:
            'transform 400ms cubic-bezier(0.22,1,0.36,1), border-color 400ms ease, background 400ms ease, box-shadow 400ms ease',
          willChange: 'transform',
        },
        interactive && {
          cursor: 'pointer',
          '&:hover': {
            borderColor: glassTokens.borderStrong,
            background: glassTokens.bgHover,
            transform: 'translateY(-3px)',
            boxShadow: '0 14px 38px rgba(0, 0, 0, 0.42)',
          },
          '&:active': {
            transform: 'translateY(-1px) scale(0.99)',
            transition:
              'transform 120ms cubic-bezier(0.4,0,1,1), border-color 240ms ease, background 240ms ease',
          },
          '&:focus-visible': {
            outline: '2px solid',
            outlineColor: 'primary.main',
            outlineOffset: 3,
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </Box>
  );
});

export default GlassCard;
