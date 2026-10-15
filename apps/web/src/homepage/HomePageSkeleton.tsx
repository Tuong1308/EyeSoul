import { SectionTitleSkeleton } from '../components/SectionTitle';
import { SAMPLE_PHOTO_LIMIT, TILE_SIZES } from './SamplePhotoGrid';

/**
 * Stands in for the Sample Photo grid while the homepage data loads.
 * It takes the size of the grid, so the page doesn't jump when the photos arrive.
 */
export function HomePageSkeleton() {
  return (
    <div role="status" aria-label="Loading photos" className="mt-16">
      <p className="sr-only">Loading photos…</p>
      <div aria-hidden>
        <SectionTitleSkeleton />
        <div className="mt-8 grid grid-flow-dense auto-rows-[140px] grid-cols-2 gap-3 md:auto-rows-[180px] md:grid-cols-4 md:gap-4">
          {Array.from({ length: SAMPLE_PHOTO_LIMIT }, (_, index) => (
            <div key={index} className={`animate-pulse rounded-xl2 bg-line ${TILE_SIZES[index % TILE_SIZES.length]}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
