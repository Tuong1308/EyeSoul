import { LoadError } from '../components/LoadError';
import { Hero } from './Hero';
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
        {failed && <LoadError subject="photos" retrying={isFetching} onRetry={() => void refetch()} />}
      </div>
      {data && <SamplePhotoGrid photos={data.samplePhotos} />}
    </main>
  );
}
