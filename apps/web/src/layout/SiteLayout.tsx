import { useCallback, useRef, useState } from 'react';
import { Link, Outlet } from 'react-router';
import { useCart } from '../cart/cart-context';
import { MiniCart } from '../cart/MiniCart';

export function SiteLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

function Header() {
  const { count } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const cartButtonRef = useRef<HTMLButtonElement>(null);
  const closeCart = useCallback(() => {
    setCartOpen(false);
    cartButtonRef.current?.focus();
  }, []);

  // Ticket 04 builds out the rest of the header (navigation, sticky, mobile menu, account).
  return (
    <>
      <header className="border-b border-line bg-paper">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-8">
          <Link to="/" className="font-serif text-2xl font-bold">
            Eye <em className="font-medium">Soul</em>
          </Link>
          <button
            ref={cartButtonRef}
            type="button"
            aria-label={`Giỏ hàng, ${count} sản phẩm`}
            aria-haspopup="dialog"
            aria-expanded={cartOpen}
            onClick={() => setCartOpen(true)}
            className="relative flex h-11 w-11 items-center justify-center rounded-full hover:bg-line/60"
          >
            <CartIcon />
            {count > 0 && (
              <span
                aria-hidden
                className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-amber px-1 text-[11px] font-bold text-ink"
              >
                {count}
              </span>
            )}
          </button>
        </div>
      </header>
      {cartOpen && <MiniCart onClose={closeCart} />}
    </>
  );
}

function CartIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M5 7h14l-1.2 12.1a1 1 0 0 1-1 .9H7.2a1 1 0 0 1-1-.9L5 7Z" />
      <path d="M9 10V6a3 3 0 0 1 6 0v4" strokeLinecap="round" />
    </svg>
  );
}
