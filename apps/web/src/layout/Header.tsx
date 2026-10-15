import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router';
import { useCart } from '../cart/cart-context';
import { MiniCart } from '../cart/MiniCart';
import { PRODUCT_TYPES } from '../lib/routes';
import { AccountControl } from './AccountControl';

export function Header() {
  const { count } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const cartButtonRef = useRef<HTMLButtonElement>(null);
  const closeCart = useCallback(() => {
    setCartOpen(false);
    cartButtonRef.current?.focus();
  }, []);

  const [menuOpen, setMenuOpen] = useState(false);
  const navId = useId();

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-line bg-paper">
        <div className="relative mx-auto flex max-w-6xl items-center gap-2 px-4 py-3 md:gap-10 md:px-8">
          <button
            type="button"
            aria-label="Danh mục"
            aria-expanded={menuOpen}
            aria-controls={navId}
            onClick={() => setMenuOpen((open) => !open)}
            className="-ml-2 flex h-11 w-11 items-center justify-center rounded-full hover:bg-line/60 md:hidden"
          >
            <MenuIcon open={menuOpen} />
          </button>
          <Link to="/" aria-label="Eye Soul, về trang chủ" className="font-serif text-2xl font-bold">
            Eye <em className="font-medium">Soul</em>
          </Link>
          {/* One nav for both layouts: inline from md up, a drop-down panel below the bar on phones. */}
          <nav
            id={navId}
            aria-label="Danh mục sản phẩm"
            className={`${menuOpen ? 'block' : 'hidden'} absolute inset-x-0 top-full border-b border-line bg-paper shadow-soft md:static md:block md:border-0 md:bg-transparent md:shadow-none`}
          >
            <ul className="flex flex-col px-4 py-2 md:flex-row md:gap-8 md:p-0">
              {Object.values(PRODUCT_TYPES).map(({ label, path }) => (
                <li key={path}>
                  <NavLink
                    to={path}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `block py-3 text-sm font-medium underline-offset-8 hover:underline md:py-1 ${isActive ? 'underline decoration-amber decoration-2' : ''}`
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="ml-auto flex items-center gap-1">
            <AccountControl />
            <button
              ref={cartButtonRef}
              type="button"
              aria-label={`Giỏ hàng, ${count} sản phẩm`}
              aria-haspopup="dialog"
              aria-expanded={cartOpen}
              onClick={() => {
                setMenuOpen(false);
                setCartOpen(true);
              }}
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
        </div>
      </header>
      {cartOpen && <MiniCart onClose={closeCart} />}
    </>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
    </svg>
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
