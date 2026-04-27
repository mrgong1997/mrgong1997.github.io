import { Box, CircularProgress } from '@mui/material';

/** 路由懒加载时的占位，避免首包解析整站页面组件 */
export default function PageFallback() {
  return (
    <Box
      role="progressbar"
      aria-busy="true"
      aria-label="页面加载中"
      sx={{
        flex: 1,
        minHeight: '50vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircularProgress size={36} thickness={4} sx={{ color: 'primary.main', opacity: 0.45 }} />
    </Box>
  );
}
