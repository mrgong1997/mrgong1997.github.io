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
            'transform 400ms ease, border-color 400ms ease, background 400ms ease',
        },
        interactive && {
          cursor: 'pointer',
          '&:hover': {
            borderColor: glassTokens.borderStrong,
            background: glassTokens.bgHover,
            transform: 'translateY(-2px)',
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
