import { Hero } from './Hero';
import { SamplePhotos } from './SamplePhotos';
import { Spotlights } from './Spotlights';

/** The hero and Spotlights need no data and show at once; only the Sample Photo band waits on the API. */
export function HomePage() {
  return (
    <main>
      <Hero />
      <Spotlights />
      <SamplePhotos />
    </main>
  );
}
