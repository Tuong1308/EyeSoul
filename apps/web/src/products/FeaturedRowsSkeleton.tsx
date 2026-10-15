import { SectionTitleSkeleton } from '../components/SectionTitle';

/**
 * Stands in for the Featured Product rows while they load.
 * Each block takes the size of the row that replaces it, so the page doesn't jump when the data arrives.
 */
export function FeaturedRowsSkeleton({ rows }: { rows: number }) {
  return (
    <div role="status" aria-label="Loading products">
      <p className="sr-only">Loading products…</p>
      {Array.from({ length: rows }, (_, row) => (
        <div key={row} aria-hidden className="mt-16">
          <SectionTitleSkeleton />
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
    </div>
  );
}
