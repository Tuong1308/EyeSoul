import type { HomepageSamplePhoto } from '@eyesoul/shared';
import { motion, useReducedMotion, type Variants } from 'motion/react';
import { useRef } from 'react';
import { Link } from 'react-router';
import { LoadError } from '../components/LoadError';
import { Reveal } from '../components/Reveal';
import { SectionTitle } from '../components/SectionTitle';
import { productPath } from '../lib/routes';
import { useHomepage } from './use-homepage';

/** Small alternating tilts, in degrees, that the polaroids settle into. */
const TILTS = [-3, 2, -1.5, 3, 1, -2.5, 2.5, -1];
const SKELETON_POLAROIDS = 6;
/** How much of the row's width "Previous photos" and "Next photos" scroll by. */
const SCROLL_FRACTION = 0.8;

/** A polaroid drops in and settles at its tilt (passed as `custom`), on a spring, at its turn in the row. */
const DROP_IN: Variants = {
  hidden: { opacity: 0, y: 40, rotate: 0 },
  shown: (tilt: number) => ({ opacity: 1, y: 0, rotate: tilt, transition: { type: 'spring', stiffness: 180, damping: 20 } }),
};

/**
 * The Sample Photos as a row of polaroids on an ink band. The band is always on the page (it is the hero's
 * "See sample photos" target), and only it waits on the homepage data: it shows blank polaroids while loading
 * and an error with "Try again" if the load fails. With no Sample Photos at all it leaves the page.
 */
export function SamplePhotos() {
  const { data, isPending, isError, isFetching, refetch } = useHomepage();
  // Only a load with nothing to show is an error; a failed background refetch keeps the data on screen.
  const failed = isError && !data;
  if (data?.samplePhotos.length === 0) return null;
  return (
    <section
      id="sample-photos"
      aria-labelledby="sample-photos-title"
      className="scroll-mt-24 overflow-hidden bg-ink py-20 text-paper md:py-28"
    >
      <div className="frame">
        <SectionTitle id="sample-photos-title" kicker="Real photos · Shot on film" lead="Shot on" emphasis="our film" onDark />
        {failed && <LoadError subject="photos" retrying={isFetching} onRetry={() => void refetch()} onDark />}
      </div>
      {isPending && <PolaroidRowSkeleton />}
      {data && <PolaroidRow photos={data.samplePhotos} />}
    </section>
  );
}

function PolaroidRow({ photos }: { photos: HomepageSamplePhoto[] }) {
  const rowRef = useRef<HTMLUListElement>(null);
  const reduceMotion = useReducedMotion();
  const scroll = (direction: 1 | -1) => {
    const row = rowRef.current;
    if (!row) return;
    row.scrollBy({ left: direction * row.clientWidth * SCROLL_FRACTION, behavior: reduceMotion ? 'auto' : 'smooth' });
  };
  return (
    <div className="relative">
      {/* Beside the heading, on screens wide enough to have no swipe. */}
      <div className="frame absolute -top-20 right-0 hidden justify-end gap-2 md:flex">
        <ScrollButton label="Previous photos" onClick={() => scroll(-1)}>
          ‹
        </ScrollButton>
        <ScrollButton label="Next photos" onClick={() => scroll(1)}>
          ›
        </ScrollButton>
      </div>
      <Reveal stagger={0.08}>
        {/* The scroll padding matches the frame's, so snapping keeps the first polaroid in line with the heading. */}
        <ul
          ref={rowRef}
          aria-label="Sample photos"
          className="frame flex snap-x snap-mandatory scroll-px-[clamp(16px,4vw,64px)] gap-8 overflow-x-auto py-10 [scrollbar-width:none]"
        >
          {photos.map((photo, index) => (
            <li key={photo.id} className="w-60 shrink-0 snap-start md:w-72">
              <Polaroid photo={photo} tilt={TILTS[index % TILTS.length]} />
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}

/** A white frame with the square photo and the Film Roll's name written in the bottom margin; links to that Film Roll. */
function Polaroid({ photo, tilt }: { photo: HomepageSamplePhoto; tilt: number }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      variants={DROP_IN}
      custom={tilt}
      // Straightens, lifts and grows a little under the pointer.
      whileHover={reduceMotion ? undefined : { rotate: 0, y: -10, scale: 1.06, zIndex: 20 }}
    >
      <Link
        to={productPath(photo.filmRoll.slug)}
        className="block bg-polaroid p-2.5 pb-3 shadow-print focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber md:p-3"
      >
        <div className="grain aspect-square bg-line">
          <img src={photo.url} alt={photo.alt} loading="lazy" className="h-full w-full object-cover" />
        </div>
        <p className="mt-3 truncate px-1 text-center font-serif text-sm italic text-ink md:text-base">{photo.filmRoll.name}</p>
      </Link>
    </motion.div>
  );
}

function ScrollButton({ label, onClick, children }: { label: string; onClick: () => void; children: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex h-12 w-12 items-center justify-center rounded-full border border-paper/40 text-2xl transition hover:bg-paper hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber"
    >
      <span aria-hidden>{children}</span>
    </button>
  );
}

/** Blank polaroids in the row's place while the photos load, so the band doesn't jump when they arrive. */
function PolaroidRowSkeleton() {
  return (
    <div role="status" aria-label="Loading photos">
      <p className="sr-only">Loading photos…</p>
      <div aria-hidden className="frame flex gap-8 overflow-hidden py-10">
        {Array.from({ length: SKELETON_POLAROIDS }, (_, index) => (
          <div
            key={index}
            className="w-60 shrink-0 bg-paper/10 p-2.5 pb-3 md:w-72 md:p-3"
            style={{ rotate: `${TILTS[index % TILTS.length]}deg` }}
          >
            <div className="aspect-square animate-pulse bg-paper/15" />
            <div className="mx-auto mt-3 h-5 w-2/3 animate-pulse rounded bg-paper/15" />
          </div>
        ))}
      </div>
    </div>
  );
}
