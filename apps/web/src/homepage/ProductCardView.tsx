import type { ProductCard } from '@eyesoul/shared';
import { useId } from 'react';
import { Link } from 'react-router';
import { AddToCartButton } from '../cart/AddToCartButton';
import { ConditionGradeBadge } from '../components/ConditionGradeBadge';
import { formatVnd } from '../lib/format-vnd';
import { productPath } from '../lib/routes';

export function ProductCardView({ product }: { product: ProductCard }) {
  const nameId = useId();
  return (
    <article aria-labelledby={nameId} className="relative flex h-full flex-col rounded-xl2 bg-card p-3 shadow-soft">
      <div className="grain relative aspect-square overflow-hidden rounded-xl bg-line">
        {product.photo && (
          <img src={product.photo.url} alt={product.photo.alt} loading="lazy" className="h-full w-full object-cover" />
        )}
        {product.conditionGrade && <ConditionGradeBadge grade={product.conditionGrade} className="absolute right-2 top-2" />}
      </div>
      <h3 id={nameId} className="mt-3 text-sm font-medium leading-snug">
        {/* Stretched over the whole card, so clicking anywhere on it opens the product. */}
        <Link to={productPath(product.slug)} className="after:absolute after:inset-0 after:rounded-xl2 after:content-['']">
          {product.name}
        </Link>
      </h3>
      <p className="mt-1 font-serif text-lg font-bold">{formatVnd(product.priceVnd)}</p>
      {product.availability === 'out_of_stock' ? (
        <p className="mt-1 text-[11px] font-semibold uppercase tracking-[.2em] text-ink/60">Out of stock</p>
      ) : (
        <div className="mt-auto">
          <AddToCartButton product={product} describedBy={nameId} />
        </div>
      )}
    </article>
  );
}
