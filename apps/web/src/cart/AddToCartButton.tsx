import type { ProductCard } from '@eyesoul/shared';
import { useEffect, useState } from 'react';
import { useCart } from './cart-context';
import { canAdd } from './cart-store';

const CONFIRMATION_MS = 2000;

/** `describedBy` names the element holding the product's name, so the button says which product it adds. */
export function AddToCartButton({ product, describedBy }: { product: ProductCard; describedBy: string }) {
  const { lines, add } = useCart();
  // Bumped on every add, so adding again restarts the confirmation's timer.
  const [addedCount, setAddedCount] = useState(0);
  const [confirming, setConfirming] = useState(false);
  // Out of Stock cards don't render this button, so only a Film Camera already in the Cart can't be added.
  const alreadyInCart = !canAdd(lines, product);

  useEffect(() => {
    if (addedCount === 0) return;
    setConfirming(true);
    const timer = setTimeout(() => setConfirming(false), CONFIRMATION_MS);
    return () => clearTimeout(timer);
  }, [addedCount]);

  return (
    <div className="mt-3 flex items-center gap-3">
      {/* z-10 lifts the button above the card's stretched product link. */}
      <button
        type="button"
        disabled={alreadyInCart}
        aria-describedby={describedBy}
        onClick={() => {
          add(product);
          setAddedCount((count) => count + 1);
        }}
        className="relative z-10 rounded-full bg-ink px-4 py-2 text-xs font-semibold text-paper transition hover:bg-ink/85 disabled:bg-line disabled:text-ink/60"
      >
        {alreadyInCart ? 'Đã có trong giỏ' : 'Thêm vào giỏ'}
      </button>
      <p role="status" className="text-xs font-medium text-ink/70">
        {confirming && '✓ Đã thêm vào giỏ'}
      </p>
    </div>
  );
}
