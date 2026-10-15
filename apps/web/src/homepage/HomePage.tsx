import { FeaturedRow } from './FeaturedRow';
import { SamplePhotoGrid } from './SamplePhotoGrid';
import { useHomepage } from './use-homepage';

export function HomePage() {
  const { data } = useHomepage();
  return (
    <main className="mx-auto max-w-6xl px-4 pb-24 md:px-8">
      {data?.rows.map((row) => <FeaturedRow key={row.productType} row={row} />)}
      {data && <SamplePhotoGrid photos={data.samplePhotos} />}
    </main>
  );
}
