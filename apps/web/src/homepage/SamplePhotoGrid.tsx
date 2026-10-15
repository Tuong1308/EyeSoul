import type { HomepageSamplePhoto } from '@eyesoul/shared';
import { Link } from 'react-router';
import { SectionTitle } from '../components/SectionTitle';
import { productPath } from '../lib/routes';

// Repeating tile sizes for the magazine grid (the loading skeleton draws the same pattern); `grid-flow-dense` back-fills the gaps the large tiles leave.
/** The API sends at most this many Sample Photos. */
export const SAMPLE_PHOTO_LIMIT = 12;

export const TILE_SIZES = [
  'col-span-2 row-span-2',
  '',
  'row-span-2',
  '',
  'col-span-2',
  '',
  'row-span-2',
  '',
];

export function SamplePhotoGrid({ photos }: { photos: HomepageSamplePhoto[] }) {
  if (photos.length === 0) return null;
  return (
    <section aria-labelledby="sample-photos" className="mt-16">
      <SectionTitle id="sample-photos" kicker="Real photos · Shot on film" lead="Shot on" emphasis="our film" />
      <ul className="mt-8 grid grid-flow-dense auto-rows-[140px] grid-cols-2 gap-3 md:auto-rows-[180px] md:grid-cols-4 md:gap-4">
        {photos.map((photo, index) => (
          <li key={photo.id} className={TILE_SIZES[index % TILE_SIZES.length]}>
            <Link
              to={productPath(photo.filmRoll.slug)}
              className="group grain relative block h-full overflow-hidden rounded-xl2 bg-line shadow-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber"
            >
              <img
                src={photo.url}
                alt={photo.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Always visible on touch screens; revealed on hover or keyboard focus where hover exists. */}
              <span className="absolute inset-x-0 bottom-0 bg-linear-to-t from-ink/80 to-transparent px-3 pb-2 pt-8 text-xs font-medium text-paper transition-opacity duration-300 [@media(hover:hover)]:opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100">
                {photo.filmRoll.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
