import type { ProductCard } from '@eyesoul/shared';
import { useId } from 'react';
import { Link } from 'react-router';
import { AddToCartButton } from '../cart/AddToCartButton';
import { ConditionGradeBadge } from '../components/ConditionGradeBadge';
import { formatVnd } from '../lib/format-vnd';
import { productPath } from '../lib/routes';

/** A chrome-free card: the product's first Product Photo, with name and price on one line beneath. */
export function ProductCardView({ product }: { product: ProductCard }) {
  const nameId = useId();
  return (
    <article
      aria-labelledby={nameId}
      className="group relative transition duration-300 ease-out motion-safe:can-hover:hover:-translate-y-1"
    >
      <div className="grain aspect-[4/5] rounded-xl2 bg-line">
        {product.photo && (
          <img
            src={product.photo.url}
            alt={product.photo.alt}
            loading="lazy"
            className="h-full w-full object-cover transition duration-700 ease-out motion-safe:can-hover:group-hover:scale-105"
          />
        )}
        {product.conditionGrade && <ConditionGradeBadge grade={product.conditionGrade} className="absolute left-3 top-3" />}
        {product.availability === 'out_of_stock' ? (
          <p className="absolute bottom-3 left-3 rounded-full bg-paper px-3 py-1 text-[11px] font-semibold uppercase tracking-[.2em]">
            Out of stock
          </p>
        ) : (
          <AddToCartButton product={product} describedBy={nameId} className="absolute bottom-3 right-3" />
        )}
      </div>
      <div className="mt-3 flex items-baseline justify-between gap-3">
        <h3 id={nameId} className="text-sm font-medium leading-snug">
          {/* Stretched over the whole card, so clicking anywhere on it opens the product. */}
          <Link to={productPath(product.slug)} className="after:absolute after:inset-0 after:content-['']">
            {product.name}
          </Link>
        </h3>
        <p className="shrink-0 font-serif text-lg font-bold">{formatVnd(product.priceVnd)}</p>
      </div>
    </article>
  );
}
