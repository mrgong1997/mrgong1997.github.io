import { Box } from '@mui/material';

export default function BackgroundAurora() {
  return (
    <Box
      aria-hidden
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        background:
          'linear-gradient(180deg, #0A0A0F 0%, #141424 45%, #1C1B2E 100%)',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '-15%',
          left: '-10%',
          width: '60vmax',
          height: '60vmax',
          background:
            'radial-gradient(circle, rgba(232,185,107,0.22) 0%, rgba(232,185,107,0.05) 45%, transparent 70%)',
          filter: 'blur(40px)',
          animation: 'auroraDrift 18s ease-in-out infinite',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '-20%',
          right: '-15%',
          width: '55vmax',
          height: '55vmax',
          background:
            'radial-gradient(circle, rgba(142,164,201,0.22) 0%, rgba(142,164,201,0.05) 45%, transparent 70%)',
          filter: 'blur(40px)',
          animation: 'auroraDrift 22s ease-in-out infinite reverse',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.04) 0%, transparent 50%)',
        }}
      />
    </Box>
  );
}
