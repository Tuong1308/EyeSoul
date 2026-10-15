import { animate, useReducedMotion } from 'motion/react';
import { useEffect, useRef } from 'react';

/**
 * After each add to the Cart (the count going up, not down), the Cart icon bounces and its count pulses.
 * Nothing moves for shoppers who prefer reduced motion.
 */
export function useCartAddFeedback(count: number) {
  const iconRef = useRef<HTMLSpanElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();
  const previousCount = useRef(count);
  useEffect(() => {
    const added = count > previousCount.current;
    previousCount.current = count;
    if (!added || reduceMotion) return;
    const animations = [
      iconRef.current && animate(iconRef.current, { y: [0, -6, 0, -2, 0] }, { duration: 0.5, ease: 'easeOut' }),
      countRef.current && animate(countRef.current, { scale: [1, 1.35, 1] }, { duration: 0.4, ease: 'easeOut' }),
    ];
    return () => animations.forEach((animation) => animation?.stop());
  }, [count, reduceMotion]);
  return { iconRef, countRef };
}
