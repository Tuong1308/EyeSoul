import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { LogoMark } from '../components/Logo';
import { REVEAL_EASE } from '../components/Reveal';
import { PRODUCT_TYPES } from '../lib/routes';
import { HERO_PILL_PHOTOS, HERO_STRIP_PHOTOS } from './hero-photos';

const COMMITMENTS = ['Film cameras graded A+ to C', 'Nationwide delivery', 'Inspected before shipping'];
/** Copies of the commitments in the ticker, enough to run past the widest screen before it loops. */
const TICKER_COPIES = 6;
const PILL_INTERVAL_MS = 3000;

/** Fade and rise after `delay` seconds; with reduced motion, a quick fade in place. */
function useEntrance() {
  const reduceMotion = useReducedMotion();
  return (delay: number, rise = 24) => ({
    initial: { opacity: 0, y: reduceMotion ? 0 : rise },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduceMotion ? 0.2 : 0.6, delay: reduceMotion ? 0 : delay, ease: REVEAL_EASE },
  });
}

/**
 * The homepage hero. It needs no API data, so it renders and plays its entrance straight away:
 * logo 0s, headline words from 0.3s, the photo pill at 0.7s, the line at 1.0s, the buttons at 1.1s and the
 * film strip at 1.25s; then the logo's star turns once.
 * `data-hero` lets the header tighten once the hero has scrolled past.
 */
export function Hero() {
  const enter = useEntrance();
  const reduceMotion = useReducedMotion();
  return (
    <section aria-label="About Eye Soul" data-hero className="overflow-hidden bg-paper pt-12 md:pt-20">
      <div className="frame text-center">
        <motion.div {...enter(0)}>
          <motion.div
            className="mx-auto h-16 w-16 text-ink md:h-20 md:w-20"
            animate={reduceMotion ? undefined : { rotate: 360 }}
            transition={{ duration: 1.4, delay: 1.7, ease: [0.65, 0, 0.35, 1] }}
          >
            <LogoMark className="h-full w-full" />
          </motion.div>
        </motion.div>
        <h1 className="mt-6 font-serif text-[12vw] font-bold leading-[.95] md:text-8xl lg:text-[8.5rem]">
          <Words text="Slow down," start={0.3} /> <PhotoPill delay={0.7} />
          <br />
          <em className="font-medium">
            <Words text="look closer." start={0.55} />
          </em>
        </h1>
        <motion.p className="mx-auto mt-6 max-w-xl text-lg text-ink/80" {...enter(1.0)}>
          New digital cameras, hand-graded used film cameras, and the film rolls for your next frame.
        </motion.p>
        <motion.div className="mt-8 flex flex-wrap justify-center gap-3" {...enter(1.1)}>
          <Link
            to={PRODUCT_TYPES.FILM_CAMERA.path}
            className="press rounded-full bg-amber px-6 py-3 text-sm font-semibold text-ink transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            Shop film cameras
          </Link>
          {/* A plain in-page link: the browser scrolls to the Sample Photo section (smoothly, see index.css). */}
          <a
            href="#sample-photos"
            className="press rounded-full border border-ink px-6 py-3 text-sm font-semibold transition hover:bg-ink hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber"
          >
            See sample photos
          </a>
        </motion.div>
      </div>
      <motion.div {...enter(1.25, 60)}>
        <FilmStrip />
      </motion.div>
      <div className="overflow-hidden bg-amber py-3 text-sm font-semibold text-ink">
        <ul aria-label="Our commitments" className="marquee marquee-reverse flex w-max whitespace-nowrap [--marquee-duration:30s]">
          {Array.from({ length: TICKER_COPIES }, (_, copy) =>
            COMMITMENTS.map((commitment) => (
              // Only the first copy is read out; the rest just keep the ticker looping.
              <li key={`${copy}-${commitment}`} aria-hidden={copy > 0 || undefined} className="pr-12">
                <span aria-hidden>✦ </span>
                {commitment}
              </li>
            )),
          )}
        </ul>
      </div>
    </section>
  );
}

/** Words that rise in one by one, ~0.08s apart, from `start` seconds. */
function Words({ text, start }: { text: string; start: number }) {
  const enter = useEntrance();
  return text.split(' ').map((word, index) => (
    <span key={index}>
      {index > 0 && ' '}
      <motion.span className="inline-block" {...enter(start + index * 0.08, 40)}>
        {word}
      </motion.span>
    </span>
  ));
}

/** The rounded photo set into the headline: it opens out sideways, then crossfades between photos every ~3s. */
function PhotoPill({ delay }: { delay: number }) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (reduceMotion) return;
    const timer = setInterval(() => setIndex((current) => (current + 1) % HERO_PILL_PHOTOS.length), PILL_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [reduceMotion]);
  return (
    <motion.span
      aria-hidden
      className="relative mx-2 inline-block h-[.78em] w-[1.7em] overflow-hidden rounded-full bg-line align-[-.06em]"
      initial={{ scaleX: reduceMotion ? 1 : 0, opacity: 0 }}
      animate={{ scaleX: 1, opacity: 1 }}
      transition={{ duration: reduceMotion ? 0.2 : 0.7, delay: reduceMotion ? 0 : delay, ease: REVEAL_EASE }}
    >
      <AnimatePresence initial={false}>
        <motion.img
          key={index}
          src={HERO_PILL_PHOTOS[index]}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9 }}
        />
      </AnimatePresence>
    </motion.span>
  );
}

const SPROCKETS =
  'repeating-linear-gradient(90deg, transparent 0 14px, var(--color-paper) 14px 26px, transparent 26px 40px)';

/** A decorative full-bleed strip of film frames, scrolling endlessly to the left and pausing under the pointer. */
function FilmStrip() {
  return (
    <div aria-hidden className="mt-14 overflow-hidden bg-ink py-3 text-paper">
      <div className="h-3 opacity-90" style={{ backgroundImage: SPROCKETS }} />
      {/* Two copies back to back, so sliding by half the width loops seamlessly. */}
      <ul className="marquee flex w-max py-3 [--marquee-duration:45s]">
        {[...HERO_STRIP_PHOTOS, ...HERO_STRIP_PHOTOS].map((src, index) => (
          <li key={index} className="relative h-36 shrink-0 pr-3 md:h-52">
            <img src={src} alt="" className="h-full w-auto rounded-sm object-cover" />
            <span className="absolute left-2 top-1 font-mono text-[10px] tracking-widest text-amber">
              ▸ {String((index % HERO_STRIP_PHOTOS.length) + 1).padStart(2, '0')}A
            </span>
          </li>
        ))}
      </ul>
      <div className="h-3 opacity-90" style={{ backgroundImage: SPROCKETS }} />
    </div>
  );
}
