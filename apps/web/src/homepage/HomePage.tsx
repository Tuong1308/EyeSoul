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
    <main className="pb-24">
      <div className="frame">
        <Hero />
        {isPending && <HomePageSkeleton />}
        {failed && <HomePageError retrying={isFetching} onRetry={() => void refetch()} />}
      </div>
      {data?.rows.map((row) => <FeaturedRow key={row.productType} row={row} />)}
      {data && <SamplePhotoGrid photos={data.samplePhotos} />}
    </main>
  );
}
