import type { ProductCard } from '@eyesoul/shared';
import { useEffect, useState } from 'react';
import { useCart } from './cart-context';
import { canAdd } from './cart-store';

const CONFIRMATION_MS = 2000;

/** Hides the button on screens with hover until the surrounding `group` is hovered or holds focus. */
const REVEAL_ON_HOVER =
  'can-hover:opacity-0 can-hover:group-hover:opacity-100 can-hover:group-focus-within:opacity-100 can-hover:motion-safe:translate-y-2 can-hover:motion-safe:group-hover:translate-y-0 can-hover:motion-safe:group-focus-within:translate-y-0';

interface AddToCartButtonProps {
  product: ProductCard;
  /** The id of the element holding the product's name, so the button says which product it adds. */
  describedBy: string;
  /** Positions the button and its "Added to cart" confirmation, e.g. on a product card's photo. */
  className?: string;
}

/**
 * A round "+" that adds the product to the Cart, turning into a check once a Film Camera is in it.
 * On screens with hover it shows when the surrounding `group` is hovered or focused; on touch screens it always shows.
 */
export function AddToCartButton({ product, describedBy, className = '' }: AddToCartButtonProps) {
  const { lines, add } = useCart();
  // Bumped on every add, so adding again restarts the confirmation's timer.
  const [addedCount, setAddedCount] = useState(0);
  const [confirming, setConfirming] = useState(false);
  // Out of Stock cards don't render this button, so only a Film Camera already in the Cart can't be added.
  const alreadyInCart = !canAdd(lines, product);
  // The check and the confirmation stay in view; only the bare "+" waits for hover.
  const revealOnHover = !alreadyInCart && !confirming;

  useEffect(() => {
    if (addedCount === 0) return;
    setConfirming(true);
    const timer = setTimeout(() => setConfirming(false), CONFIRMATION_MS);
    return () => clearTimeout(timer);
  }, [addedCount]);

  return (
    // z-10 lifts the whole group above the card's stretched product link: the reveal's transform makes this wrapper
    // its own stacking context, so a z-index on the button alone wouldn't reach past it.
    <div className={`z-10 flex items-center gap-2 transition duration-300 ${revealOnHover ? REVEAL_ON_HOVER : ''} ${className}`}>
      <p
        role="status"
        className={confirming ? 'rounded-full bg-paper px-3 py-1.5 text-[11px] font-semibold text-ink shadow-soft' : 'sr-only'}
      >
        {confirming && 'Added to cart'}
      </p>
      <button
        type="button"
        disabled={alreadyInCart}
        aria-label={alreadyInCart ? 'In your cart' : 'Add to cart'}
        aria-describedby={describedBy}
        onClick={() => {
          add(product);
          setAddedCount((count) => count + 1);
        }}
        // Its own press scale: the hover grow is a utility, which outranks the base rule that presses every button.
        className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-paper shadow-soft transition enabled:hover:bg-ink/85 motion-safe:enabled:hover:scale-110 motion-safe:enabled:active:scale-[.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber disabled:bg-paper disabled:text-ink"
      >
        {alreadyInCart ? <CheckIcon /> : <PlusIcon />}
      </button>
    </div>
  );
}

function PlusIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}
