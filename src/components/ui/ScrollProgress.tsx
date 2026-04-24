import { motion, useScroll, useSpring } from 'framer-motion';
import { tokens } from '@/theme/theme';

/**
 * 页面顶部的滚动进度细线
 * 用 spring 平滑滚动值，避免跟随滚轮一抽一抽的
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 22,
    mass: 0.4,
  });

  return (
    <motion.div
      aria-hidden
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        background: `linear-gradient(90deg, ${tokens.primary} 0%, ${tokens.secondary} 100%)`,
        transformOrigin: '0% 50%',
        scaleX,
        zIndex: 1400,
        pointerEvents: 'none',
        boxShadow: `0 0 10px ${tokens.primary}55`,
      }}
    />
  );
}
