import type { Transition, Variants } from 'framer-motion';

// 统一的动效时序系统，灵感来自 Material Expressive 与 iOS 动效准则
// 所有组件引用这里的参数，保证全站"同一种呼吸"。

export const duration = {
  /** 微交互（按压回弹、hover 颜色过渡） */
  fast: 0.2,
  /** 基础过渡（淡入、filter 状态） */
  base: 0.4,
  /** 主内容入场（标题、卡片揭示） */
  slow: 0.6,
  /** 强调入场（Hero、Page transition） */
  slower: 0.9,
  /** 电影感入场（首屏大图的 ken-burns） */
  epic: 1.4,
} as const;

/**
 * cubic-bezier 曲线预设。
 * - standard：通用入/出，Material 推荐
 * - entrance：结尾平缓，适合"浮现"
 * - exit：开头快，适合"退出"
 * - emphasized：进入感强，Material 3 Expressive
 * - gentle：温柔，Hero 背景图缓慢
 * - overshoot：带一点弹性，用于交互反馈（不要用于主要内容入场）
 */
export const ease = {
  standard: [0.4, 0, 0.2, 1] as [number, number, number, number],
  entrance: [0.22, 1, 0.36, 1] as [number, number, number, number],
  exit: [0.4, 0, 1, 1] as [number, number, number, number],
  emphasized: [0.2, 0, 0, 1] as [number, number, number, number],
  gentle: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
  overshoot: [0.34, 1.4, 0.64, 1] as [number, number, number, number],
};

/** 常用 spring 预设 */
export const spring = {
  soft: { type: 'spring', stiffness: 140, damping: 22, mass: 1 } as const,
  snappy: { type: 'spring', stiffness: 320, damping: 28 } as const,
  gentle: { type: 'spring', stiffness: 80, damping: 22 } as const,
};

/** Stagger 节奏 */
export const stagger = {
  tight: 0.04,
  base: 0.08,
  loose: 0.12,
} as const;

/** 入场/出场 variants —— 搭配 framer-motion 的 `variants` prop 使用 */
export const variants = {
  fadeUp: {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: duration.slow, ease: ease.entrance },
    },
  },
  fadeUpSm: {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: duration.base, ease: ease.entrance },
    },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: duration.base, ease: ease.standard },
    },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.96 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: duration.base, ease: ease.entrance },
    },
  },
  /** 容器：配合 children 使用 stagger */
  staggerContainer: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger.base,
        delayChildren: 0.1,
      },
    },
  },
  staggerTight: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger.tight,
        delayChildren: 0.05,
      },
    },
  },
} satisfies Record<string, Variants>;

/**
 * 常用 hover/press 状态 prop 组，直接展开到 motion 元素上：
 * `<motion.button {...hover.lift}>`
 */
export const hover = {
  /** 抬升：常用于卡片、图片缩略 */
  lift: {
    whileHover: { y: -3, transition: { duration: duration.fast, ease: ease.standard } },
    whileTap: { y: -1, scale: 0.99, transition: { duration: 0.12 } },
  },
  /** 按压：按钮、链接 */
  press: {
    whileTap: { scale: 0.96, transition: { duration: 0.1, ease: ease.exit } },
  },
  /** 微妙缩放：图标按钮 */
  iconPress: {
    whileHover: { scale: 1.08, transition: { duration: duration.fast } },
    whileTap: { scale: 0.92, transition: { duration: 0.1 } },
  },
} as const;

/** 页面切换专用 transition */
export const pageTransition: Transition = {
  duration: duration.slow,
  ease: ease.entrance,
};

/**
 * Viewport 观察参数：
 * once = true 避免滚动反复触发；margin 让触发稍微提前
 */
export const viewport = {
  once: true,
  margin: '-10% 0px -10% 0px',
} as const;
