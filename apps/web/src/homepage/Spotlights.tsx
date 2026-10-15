import { AnimatePresence, motion, useReducedMotion, type Variants } from 'motion/react';
import { useEffect, useState, type ReactNode } from 'react';
import { Link } from 'react-router';
import { bandTone } from '../components/band-tone';
import { Reveal, REVEAL_EASE, rise } from '../components/Reveal';
import { ASSISTANT_PATH, PORTFOLIO_PATH, PRODUCTS_PATH } from '../lib/routes';
import { PRODUCT_TYPE_PHOTOS } from '../lib/product-type-photos';
import { HERO_STRIP_PHOTOS } from './hero-photos';

const QUOTES = [
  { text: 'You don’t take a photograph, you make it.', by: 'Ansel Adams' },
  { text: 'The camera is an instrument that teaches people how to see without a camera.', by: 'Dorothea Lange' },
  { text: 'Your first 10,000 photographs are your worst.', by: 'Henri Cartier-Bresson' },
];
const QUOTE_INTERVAL_MS = 5000;

// Reveal timings: copy lines rise 48px over 1.2s, 0.3s apart from 0.15s. The visual and the shop's camera and roll
// set their own delays, so they count from the start of the reveal (0.6s, 1.0s, 1.4s) rather than after the copy.
const LINE = rise(48, 1.2);
const VISUAL: Variants = {
  hidden: { opacity: 0, scale: 0.85, y: 60 },
  shown: { opacity: 1, scale: 1, y: 0, transition: { duration: 1.6, delay: 0.6, ease: REVEAL_EASE } },
};

interface Spotlight {
  /** The region's accessible name. */
  name: string;
  kicker: string;
  title: ReactNode;
  body: string;
  cta: { label: string; to: string };
  /** Background and text colours of the band. */
  tone: string;
  /** Whether the band is dark, so its copy and button turn light. */
  onDark: boolean;
  /** Extra copy under the body, e.g. the rotating quotes. */
  extra?: ReactNode;
  visual: ReactNode;
}

const SPOTLIGHTS: Spotlight[] = [
  {
    name: 'The shop',
    kicker: '01 · The shop',
    title: (
      <>
        Cameras with a <em className="font-medium">past</em>, film for your <em className="font-medium">next</em> frame.
      </>
    ),
    body: 'New digital bodies, used film cameras graded A+ to C with every flaw written down, and fresh film rolls in 35mm and 120.',
    cta: { label: 'Browse products', to: PRODUCTS_PATH },
    tone: 'bg-paper text-ink',
    onDark: false,
    extra: <RotatingQuote />,
    visual: <ShopVisual />,
  },
  {
    name: 'Your portfolio',
    kicker: '02 · Your portfolio',
    title: (
      <>
        Share what you <em className="font-medium">shot</em>, build a portfolio.
      </>
    ),
    body: 'Upload your scans, tag the camera and film you used, and turn your frames into a portfolio others can follow.',
    cta: { label: 'Start your portfolio', to: PORTFOLIO_PATH },
    tone: 'bg-beige text-ink',
    onDark: false,
    visual: <PortfolioVisual />,
  },
  {
    name: 'AI assistant',
    kicker: '03 · AI assistant',
    title: (
      <>
        Not sure what to <em className="font-medium">load</em>? Ask.
      </>
    ),
    body: 'Our AI assistant helps you pick the camera and film for how you shoot, and walks you through metering, exposure and the rest.',
    cta: { label: 'Ask the assistant', to: ASSISTANT_PATH },
    tone: 'bg-espresso text-paper',
    onDark: true,
    visual: <AssistantVisual />,
  },
];

/**
 * Eye Soul's three capabilities as full-bleed bands, zigzagging copy and visual. Each band reveals once, line by
 * line, when about 30% of it is in view. Static content: no API data.
 */
export function Spotlights() {
  return SPOTLIGHTS.map((spotlight, index) => (
    <section key={spotlight.name} aria-label={spotlight.name} className={`${spotlight.tone} py-20 md:py-28`}>
      <Reveal className="frame grid items-center gap-12 md:grid-cols-2 md:gap-20" stagger={0.3} delayChildren={0.15}>
        <div className={index % 2 ? 'md:order-2' : ''}>
          <SpotlightCopy spotlight={spotlight} />
        </div>
        <motion.div variants={VISUAL}>{spotlight.visual}</motion.div>
      </Reveal>
    </section>
  ));
}

function SpotlightCopy({ spotlight }: { spotlight: Spotlight }) {
  const { kicker, title, body, cta, onDark, extra } = spotlight;
  const tone = bandTone(onDark);
  return (
    <>
      <motion.p variants={LINE} className="text-[11px] font-semibold uppercase tracking-[.25em] text-amber">
        {kicker}
      </motion.p>
      <motion.h2 variants={LINE} className="mt-4 font-serif text-4xl leading-none md:text-6xl">
        {title}
      </motion.h2>
      <motion.p variants={LINE} className={`mt-5 max-w-md text-base md:text-lg ${tone.muted}`}>
        {body}
      </motion.p>
      {extra && (
        <motion.div variants={LINE} className="mt-8">
          {extra}
        </motion.div>
      )}
      <motion.div variants={LINE} className="mt-8">
        <Link
          to={cta.to}
          className={`inline-block rounded-full px-6 py-3 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber ${tone.button}`}
        >
          {cta.label}
        </Link>
      </motion.div>
    </>
  );
}

/** A photographer's quote, changing every ~5s; with reduced motion the first one stays. */
function RotatingQuote() {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (reduceMotion) return;
    const timer = setInterval(() => setIndex((current) => (current + 1) % QUOTES.length), QUOTE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [reduceMotion]);
  const quote = QUOTES[index];
  return (
    <div className="relative min-h-28">
      <AnimatePresence mode="wait">
        <motion.figure
          key={index}
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
        >
          <blockquote className="font-serif text-2xl italic leading-snug md:text-3xl">“{quote.text}”</blockquote>
          <figcaption className="mt-2 text-sm text-ink/60">— {quote.by}</figcaption>
        </motion.figure>
      </AnimatePresence>
    </div>
  );
}

/** Variants for a photo that slides in from `side`, settling at `tilt` degrees, `delay` seconds into the reveal. */
function slideIn(side: 'left' | 'right', tilt: number, delay: number): Variants {
  const direction = side === 'left' ? -1 : 1;
  return {
    hidden: { opacity: 0, x: 40 * direction, rotate: tilt * 2.5 },
    shown: { opacity: 1, x: 0, rotate: tilt, transition: { duration: 1.4, delay, ease: REVEAL_EASE } },
  };
}

/** A film camera and a film roll, overlapping and tilted; they slide in from either side at ~1.0s and ~1.4s. */
function ShopVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-lg">
      <div className="absolute inset-[8%] rounded-full bg-amber/30" />
      <motion.img
        variants={slideIn('left', -6, 1.0)}
        src={PRODUCT_TYPE_PHOTOS.FILM_CAMERA}
        alt=""
        className="absolute left-0 top-[10%] w-[68%] rounded-2xl object-cover shadow-soft"
      />
      <motion.img
        variants={slideIn('right', 6, 1.4)}
        src={PRODUCT_TYPE_PHOTOS.FILM_ROLL}
        alt=""
        className="absolute bottom-[4%] right-0 w-[52%] rounded-2xl object-cover shadow-soft"
      />
    </div>
  );
}

/** A mock portfolio card: avatar, handle, camera and film, and a 3×2 grid of frames. */
function PortfolioVisual() {
  return (
    <div aria-hidden className="mx-auto w-full max-w-lg rounded-3xl bg-paper p-4 text-ink shadow-soft">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-amber font-serif text-lg font-bold italic">
          L
        </span>
        <div>
          <p className="text-sm font-semibold">@linh.shoots</p>
          <p className="text-xs text-ink/60">36 frames · Portra 400 · Canon AE-1</p>
        </div>
        <span className="ml-auto rounded-full bg-ink px-3 py-1 text-xs font-semibold text-paper">Follow</span>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-1.5">
        {HERO_STRIP_PHOTOS.slice(0, 6).map((src) => (
          <img key={src} src={src} alt="" className="aspect-square w-full rounded-md object-cover" />
        ))}
      </div>
    </div>
  );
}

const CHAT = [
  { mine: true, text: 'I shoot street at night in Saigon. Which film?' },
  { mine: false, text: 'CineStill 800T. It glows under neon, and at f/2 you can handhold 1/60s.' },
  { mine: true, text: 'And how do I meter for neon signs?' },
  { mine: false, text: 'Spot-meter the sign, then open up 1 stop so the shadows keep detail.' },
];
const EXPOSURE = ['ISO 800', 'f/2', '1/60', '+1 EV'];

/** A mock chat about night film and metering neon, with the exposure it lands on. Decorative, like the portfolio. */
function AssistantVisual() {
  return (
    <div aria-hidden className="mx-auto w-full max-w-lg space-y-3">
      {CHAT.map(({ mine, text }) => (
        <p
          key={text}
          className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm text-ink shadow-soft ${mine ? 'ml-auto rounded-br-sm bg-amber' : 'rounded-bl-sm bg-paper'}`}
        >
          {text}
        </p>
      ))}
      <ul className="flex flex-wrap items-center gap-2 pt-2 font-mono text-[11px] text-paper/70">
        {EXPOSURE.map((setting) => (
          <li key={setting} className="rounded-full border border-paper/30 px-2 py-0.5">
            {setting}
          </li>
        ))}
      </ul>
    </div>
  );
}
