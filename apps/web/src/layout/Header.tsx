import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { useCart } from '../cart/cart-context';
import { MiniCart } from '../cart/MiniCart';
import { PRODUCT_TYPES } from '../lib/routes';
import { SearchBox } from '../search/SearchBox';
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
  // Product Type links differ only by `?type=`, which NavLink ignores when deciding which one is active.
  const { pathname, search } = useLocation();
  const currentPath = pathname + search;

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
        <div className="relative mx-auto flex max-w-6xl flex-wrap items-center gap-2 px-4 py-3 md:flex-nowrap md:gap-6 md:px-8">
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={menuOpen}
            aria-controls={navId}
            onClick={() => setMenuOpen((open) => !open)}
            className="-ml-2 flex h-11 w-11 items-center justify-center rounded-full hover:bg-line/60 lg:hidden"
          >
            <MenuIcon open={menuOpen} />
          </button>
          <Link to="/" aria-label="Eye Soul, home" className="font-serif text-2xl font-bold">
            Eye <em className="font-medium">Soul</em>
          </Link>
          {/* One nav for both layouts: inline from lg up, a drop-down panel below the bar on phones and tablets. */}
          <nav
            id={navId}
            aria-label="Product types"
            className={`${menuOpen ? 'block' : 'hidden'} absolute inset-x-0 top-full border-b border-line bg-paper shadow-soft lg:static lg:block lg:border-0 lg:bg-transparent lg:shadow-none`}
          >
            <ul className="flex flex-col px-4 py-2 lg:flex-row lg:gap-8 lg:p-0">
              {Object.values(PRODUCT_TYPES).map(({ label, path }) => (
                <li key={path}>
                  <Link
                    to={path}
                    aria-current={path === currentPath ? 'page' : undefined}
                    onClick={() => setMenuOpen(false)}
                    className={`block py-3 text-sm font-medium underline-offset-8 hover:underline lg:py-1 ${path === currentPath ? 'underline decoration-amber decoration-2' : ''}`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          {/* A full-width second row on phones; inline from md up. Starting a search closes the menu. */}
          <div onFocus={() => setMenuOpen(false)} className="order-last basis-full md:order-none md:min-w-0 md:flex-1 md:basis-auto lg:max-w-xs">
            <SearchBox />
          </div>
          <div className="ml-auto flex items-center gap-1">
            <AccountControl />
            <button
              ref={cartButtonRef}
              type="button"
              aria-label={`Cart, ${count} ${count === 1 ? 'item' : 'items'}`}
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
