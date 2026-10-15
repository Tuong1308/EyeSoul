import { motion, useReducedMotion, type Variants } from 'motion/react';
import type { ReactNode } from 'react';

/** The soft ease-out every reveal uses. */
export const REVEAL_EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Variants for a revealed item that fades in while rising `distance` px over `duration` seconds, at its turn in
 * the `Reveal`'s stagger.
 */
export function rise(distance: number, duration: number): Variants {
  return {
    hidden: { opacity: 0, y: distance },
    // No `delay` here: Motion lets a child's own delay replace the stagger's, rather than add to it.
    shown: { opacity: 1, y: 0, transition: { duration, ease: REVEAL_EASE } },
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
 * `hidden` and `shown` variants (see `rise`), played in turn `stagger` seconds apart. A child whose variant sets
 * its own `delay` leaves the stagger: its delay counts from the start of the reveal.
 * With reduced motion the children start in their `shown` state and the whole block just fades in, quickly.
 */
export function Reveal({ children, className, stagger = 0, delayChildren = 0, amount = 0.3 }: RevealProps) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) {
    return (
      <motion.div
        className={className}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount }}
        transition={{ duration: 0.2 }}
      >
        {/* `contents` keeps the children laid out by the outer block (a grid, a row). */}
        <motion.div className="contents" initial="shown" animate="shown">
          {children}
        </motion.div>
      </motion.div>
    );
  }
  return (
    <motion.div
      className={className}
      variants={{ hidden: {}, shown: { transition: { staggerChildren: stagger, delayChildren } } }}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount }}
    >
      {children}
    </motion.div>
  );
}
