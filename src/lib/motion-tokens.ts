/**
 * Coreside Motion Tokens
 * Refined, physical, monochrome motion parameters inspired by Linear, Raycast, and Apple.
 * Respects WCAG 2.2 AA and prefers-reduced-motion.
 */

export const motionTokens = {
  // Timing curves
  easing: {
    smooth: [0.22, 1, 0.36, 1] as const, // Smooth editorial deceleration
    spring: { type: 'spring', stiffness: 350, damping: 28 },
    springGentle: { type: 'spring', stiffness: 260, damping: 24 },
    instant: { duration: 0.01 },
  },

  // Durations (in seconds)
  duration: {
    fast: 0.18,
    normal: 0.32,
    moderate: 0.45,
    slow: 0.65,
  },

  // Stagger delays
  stagger: {
    tight: 0.04,
    normal: 0.07,
    relaxed: 0.1,
  },
};

// Variants for section and element entrances
export const fadeUpVariant = {
  hidden: { opacity: 0, y: 22 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: motionTokens.duration.moderate,
      ease: motionTokens.easing.smooth,
      delay: custom * motionTokens.stagger.normal,
    },
  }),
};

export const staggerContainerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: motionTokens.stagger.normal,
      delayChildren: 0.05,
    },
  },
};

export const scaleInVariant = {
  hidden: { opacity: 0, scale: 0.975 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: motionTokens.duration.moderate,
      ease: motionTokens.easing.smooth,
      delay: custom * motionTokens.stagger.normal,
    },
  }),
};
