import { SAMPLE_PHOTO_LIMIT, TILE_SIZES } from './SamplePhotoGrid';

/**
 * Stands in for the Featured Product rows and the Sample Photo grid while the homepage data loads.
 * Each block takes the size of what replaces it, so the page doesn't jump when the data arrives.
 */
export function HomePageSkeleton() {
  return (
    <div role="status" aria-label="Loading products">
      <p className="sr-only">Loading products…</p>
      {[0, 1, 2].map((row) => (
        <div key={row} aria-hidden className="mt-16">
          <TitleSkeleton />
          <div className="-mx-4 mt-8 flex gap-4 overflow-hidden px-4 pb-4 md:mx-0 md:grid md:grid-cols-4 md:gap-5 md:px-0 md:pb-0">
            {[0, 1, 2, 3].map((card) => (
              <div key={card} className="w-[70%] shrink-0 rounded-xl2 bg-card p-3 shadow-soft sm:w-[45%] md:w-auto">
                <div className="aspect-square animate-pulse rounded-xl bg-line" />
                <div className="mt-3 h-5 w-3/4 animate-pulse rounded bg-line" />
                <div className="mt-1 h-7 w-1/2 animate-pulse rounded bg-line" />
                <div className="mt-3 h-8 w-28 animate-pulse rounded-full bg-line" />
              </div>
            ))}
          </div>
        </div>
      ))}
      <div aria-hidden className="mt-16">
        <TitleSkeleton />
        <div className="mt-8 grid grid-flow-dense auto-rows-[140px] grid-cols-2 gap-3 md:auto-rows-[180px] md:grid-cols-4 md:gap-4">
          {Array.from({ length: SAMPLE_PHOTO_LIMIT }, (_, index) => (
            <div key={index} className={`animate-pulse rounded-xl2 bg-line ${TILE_SIZES[index % TILE_SIZES.length]}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

/** The shape of a SectionTitle: the black top rule, the kicker and the large serif title. */
function TitleSkeleton() {
  return (
    <div className="border-t border-ink pt-6">
      <div className="h-3 w-40 animate-pulse rounded bg-line" />
      <div className="mt-3 h-9 w-72 max-w-full animate-pulse rounded bg-line md:h-14 md:w-[28rem]" />
    </div>
  );
}
