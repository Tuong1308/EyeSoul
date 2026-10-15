import type { ProductType } from '@eyesoul/shared';
import { motion, useReducedMotion } from 'motion/react';
import { Link } from 'react-router';
import { PRODUCT_TYPES } from '../lib/routes';

// The single hard-coded homepage banner; no admin or API involvement.
const HERO_IMAGE = 'https://picsum.photos/seed/eyesoul-hero/1920/1200';
const CTA_ORDER: ProductType[] = ['DIGITAL_CAMERA', 'FILM_CAMERA', 'FILM_ROLL'];

export function Hero() {
  // Reduced motion: the photo stays still and the tagline appears without moving.
  const reduceMotion = useReducedMotion();
  return (
    <section
      aria-label="About Eye Soul"
      className="grain relative mt-6 flex min-h-[70vh] items-end overflow-hidden rounded-xl2 bg-ink shadow-soft md:min-h-[78vh]"
    >
      <motion.img
        src={HERO_IMAGE}
        alt=""
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover"
        initial={{ scale: 1 }}
        animate={reduceMotion ? undefined : { scale: 1.12 }}
        transition={{ duration: 20, ease: 'linear', repeat: Infinity, repeatType: 'mirror' }}
      />
      <div className="absolute inset-0 bg-linear-to-t from-ink/85 via-ink/30 to-transparent" />
      <motion.div
        className="relative z-10 max-w-2xl p-6 text-paper md:p-12"
        initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0.2 : 1.2, delay: reduceMotion ? 0 : 0.3, ease: 'easeOut' }}
      >
        <p className="text-[11px] font-semibold uppercase tracking-[.2em] text-amber">
          Eye Soul · Cameras &amp; film
        </p>
        <h1 className="mt-3 font-serif text-5xl leading-[.95] md:text-7xl">
          Slow down, <em className="font-medium">look closer</em>
        </h1>
        <p className="mt-4 max-w-md text-sm text-paper/80 md:text-base">
          New digital cameras, hand-graded used film cameras, and the film rolls for your next frame.
        </p>
        <ul className="mt-8 flex flex-wrap gap-3">
          {CTA_ORDER.map((type) => (
            <li key={type}>
              <Link
                to={PRODUCT_TYPES[type].path}
                className="inline-block rounded-full bg-paper px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-amber focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber"
              >
                {PRODUCT_TYPES[type].label}
              </Link>
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
