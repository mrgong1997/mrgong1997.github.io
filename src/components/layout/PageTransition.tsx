import { motion } from 'framer-motion';
import { type ReactNode } from 'react';
import { duration, ease } from '@/theme/motion';

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
      transition={{
        duration: duration.slow,
        ease: ease.entrance,
        filter: { duration: duration.base, ease: ease.standard },
      }}
      style={{ minHeight: '100%' }}
    >
      {children}
    </motion.div>
  );
}
