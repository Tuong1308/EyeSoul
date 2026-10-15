import type { HomepageRow, ProductType } from '@eyesoul/shared';
import { SectionTitle } from '../components/SectionTitle';
import { ProductCardView } from './ProductCardView';

const ROW_TITLES: Record<ProductType, { kicker: string; lead: string; emphasis: string }> = {
  DIGITAL_CAMERA: { kicker: 'Nổi bật · Hàng mới', lead: 'Máy ảnh', emphasis: 'digital' },
  FILM_CAMERA: { kicker: 'Nổi bật · Mỗi chiếc là duy nhất', lead: 'Máy ảnh', emphasis: 'film' },
  FILM_ROLL: { kicker: 'Nổi bật · Phim mới', lead: 'Cuộn', emphasis: 'film' },
};

export function FeaturedRow({ row }: { row: HomepageRow }) {
  const headingId = `featured-${row.productType.toLowerCase()}`;
  return (
    <section aria-labelledby={headingId} className="mt-16">
      <SectionTitle id={headingId} {...ROW_TITLES[row.productType]} />
      <ul className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-4">
        {row.products.map((product) => (
          <li key={product.id}>
            <ProductCardView product={product} />
          </li>
        ))}
      </ul>
    </section>
  );
}
