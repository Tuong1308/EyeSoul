import { motion, useReducedMotion, type Variants } from 'motion/react';
import type { ReactNode } from 'react';

/** The soft ease-out every reveal uses. */
export const REVEAL_EASE = [0.22, 1, 0.36, 1] as const;

/** Variants for a revealed item that fades in while rising `distance` px over `duration` seconds. */
export function rise(distance: number, duration: number, delay = 0): Variants {
  return {
    hidden: { opacity: 0, y: distance },
    shown: { opacity: 1, y: 0, transition: { duration, delay, ease: REVEAL_EASE } },
  };
}

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Seconds between one child's reveal and the next. */
  stagger?: number;
  /** Seconds before the first child starts. */
  delayChildren?: number;
  /** How much of the block must be in view before it reveals, from 0 to 1. */
  amount?: number;
}

/**
 * Reveals its children once, the first time enough of it scrolls into view. Children are `motion` elements with
 * `hidden` and `shown` variants (see `rise`), played in turn `stagger` seconds apart.
 * With reduced motion everything is shown from the start, without movement.
 */
export function Reveal({ children, className, stagger = 0, delayChildren = 0, amount = 0.3 }: RevealProps) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={{ hidden: {}, shown: { transition: { staggerChildren: stagger, delayChildren } } }}
      initial={reduceMotion ? 'shown' : 'hidden'}
      whileInView="shown"
      viewport={{ once: true, amount }}
    >
      {children}
    </motion.div>
  );
}
