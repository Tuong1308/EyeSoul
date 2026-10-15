import { FeaturedRow } from './FeaturedRow';
import { Hero } from './Hero';
import { HomePageError } from './HomePageError';
import { HomePageSkeleton } from './HomePageSkeleton';
import { SamplePhotoGrid } from './SamplePhotoGrid';
import { useHomepage } from './use-homepage';

export function HomePage() {
  const { data, isPending, isError, isFetching, refetch } = useHomepage();
  // Only a load with nothing to show is an error; a failed background refetch keeps the data on screen.
  const failed = isError && !data;
  return (
    <main className="mx-auto max-w-6xl px-4 pb-24 md:px-8">
      <Hero />
      {isPending && <HomePageSkeleton />}
      {failed && <HomePageError retrying={isFetching} onRetry={() => void refetch()} />}
      {data?.rows.map((row) => <FeaturedRow key={row.productType} row={row} />)}
      {data && <SamplePhotoGrid photos={data.samplePhotos} />}
    </main>
  );
}
