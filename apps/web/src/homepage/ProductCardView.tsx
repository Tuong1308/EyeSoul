import type { ProductCard } from '@eyesoul/shared';
import { formatVnd } from '../lib/format-vnd';

export function ProductCardView({ product }: { product: ProductCard }) {
  return (
    <article className="rounded-xl2 bg-card p-3 shadow-soft">
      <div className="grain aspect-square overflow-hidden rounded-xl bg-line">
        {product.photo && (
          <img src={product.photo.url} alt={product.photo.alt} loading="lazy" className="h-full w-full object-cover" />
        )}
      </div>
      <h3 className="mt-3 text-sm font-medium leading-snug">{product.name}</h3>
      <p className="mt-1 font-serif text-lg font-bold">{formatVnd(product.priceVnd)}</p>
    </article>
  );
}
