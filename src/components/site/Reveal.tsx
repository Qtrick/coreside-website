import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { motionTokens } from '@/lib/motion-tokens';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: 'fade-up' | 'scale-in' | 'fade';
  yOffset?: number;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  className = '',
  delay = 0,
  variant = 'fade-up',
  yOffset = 20,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px -10% 0px' });
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const initial =
    variant === 'scale-in'
      ? { opacity: 0, scale: 0.975 }
      : variant === 'fade'
      ? { opacity: 0 }
      : { opacity: 0, y: yOffset };

  const animate = isInView
    ? variant === 'scale-in'
      ? { opacity: 1, scale: 1 }
      : { opacity: 1, y: 0 }
    : initial;

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      transition={{
        duration: motionTokens.duration.moderate,
        ease: motionTokens.easing.smooth,
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
