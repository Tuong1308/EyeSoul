import type { HomepageRow, ProductType } from '@eyesoul/shared';
import { Link } from 'react-router';
import { SectionTitle } from '../components/SectionTitle';
import { PRODUCT_TYPES } from '../lib/routes';
import { ProductCardView } from './ProductCardView';

const ROW_TITLES: Record<ProductType, { kicker: string; lead: string; emphasis: string }> = {
  DIGITAL_CAMERA: { kicker: 'Featured · Brand new', lead: 'Digital', emphasis: 'cameras' },
  FILM_CAMERA: { kicker: 'Featured · Each one is unique', lead: 'Film', emphasis: 'cameras' },
  FILM_ROLL: { kicker: 'Featured · Fresh stock', lead: 'Film', emphasis: 'rolls' },
};

export function FeaturedRow({ row }: { row: HomepageRow }) {
  const headingId = `featured-${row.productType.toLowerCase()}`;
  return (
    <section aria-labelledby={headingId} className="frame mt-16">
      <SectionTitle
        id={headingId}
        {...ROW_TITLES[row.productType]}
        action={
          <Link
            to={PRODUCT_TYPES[row.productType].path}
            className="shrink-0 pb-1 text-sm font-medium underline decoration-amber decoration-2 underline-offset-4"
          >
            View all
          </Link>
        }
      />
      {/* A swipeable strip on mobile, a 4-column grid from md up. */}
      <ul className="-mx-4 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 md:mx-0 md:grid md:grid-cols-4 md:gap-5 md:overflow-visible md:px-0 md:pb-0">
        {row.products.map((product) => (
          <li key={product.id} className="w-[70%] shrink-0 snap-start sm:w-[45%] md:w-auto">
            <ProductCardView product={product} />
          </li>
        ))}
      </ul>
    </section>
  );
}
