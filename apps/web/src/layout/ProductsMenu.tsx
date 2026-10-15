import type { ProductType } from '@eyesoul/shared';
import { useEffect, useId, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { PRODUCT_TYPES, PRODUCTS_PATH } from '../lib/routes';

const WIKIMEDIA = 'https://thumb.wikimedia.org/wikipedia/commons/thumb';
// One representative Product Photo per Product Type, taken from the seed photo map (licences recorded there).
const TILE_PHOTOS: Record<ProductType, string> = {
  DIGITAL_CAMERA: `${WIKIMEDIA}/d/db/Fujifilm_X100VI_25_may_2024b.jpg/960px-Fujifilm_X100VI_25_may_2024b.jpg`,
  FILM_CAMERA: `${WIKIMEDIA}/c/c0/Canon_AE-1_Program_2.jpg/960px-Canon_AE-1_Program_2.jpg`,
  FILM_ROLL: `${WIKIMEDIA}/c/c0/Kodak_analog_film_reel_Portra_400_%2827940330389%29.jpg/960px-Kodak_analog_film_reel_Portra_400_%2827940330389%29.jpg`,
};

/**
 * The header's "Products" entry. From lg up, hovering it or moving keyboard focus into it drops down a tile per
 * Product Type; Escape closes it. In the phone menu the Product Types simply sit indented underneath.
 */
export function ProductsMenu({ onNavigate }: { onNavigate: () => void }) {
  const [open, setOpen] = useState(false);
  // Below lg the Product Types are always listed, so there is nothing to expand or collapse.
  const dropsDown = useIsLargeScreen();
  const panelId = useId();
  const productsRef = useRef<HTMLAnchorElement>(null);
  // Product Type links differ only by `?type=`, which NavLink ignores when deciding which one is active.
  const { pathname, search } = useLocation();
  const currentPath = pathname + search;
  const onProducts = pathname === PRODUCTS_PATH;
  // The page itself when unfiltered; on a Product Type's tab that tile is the page and Products its section.
  const productsCurrent = onProducts ? (currentPath === PRODUCTS_PATH ? 'page' : 'true') : undefined;

  const follow = () => {
    setOpen(false);
    onNavigate();
  };

  return (
    <li
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={(event) => {
        if (!event.currentTarget.contains(document.activeElement)) setOpen(false);
      }}
      onFocus={() => setOpen(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key !== 'Escape' || !open) return;
        // Focusing the link reopens the panel through onFocus, so close it afterwards.
        productsRef.current?.focus();
        setOpen(false);
      }}
    >
      <Link
        ref={productsRef}
        to={PRODUCTS_PATH}
        aria-current={productsCurrent}
        aria-expanded={dropsDown ? open : undefined}
        aria-controls={dropsDown ? panelId : undefined}
        onClick={follow}
        className={`flex items-center gap-1 py-3 text-sm font-medium underline-offset-8 hover:underline lg:py-1 ${onProducts ? 'underline decoration-amber decoration-2' : ''}`}
      >
        Products
        <span aria-hidden className={`hidden text-xs transition lg:inline ${open ? 'rotate-180' : ''}`}>
          ▾
        </span>
      </Link>
      <ul
        id={panelId}
        className={`pb-2 pl-4 lg:absolute lg:left-1/2 lg:top-full lg:z-40 lg:grid lg:w-[34rem] lg:-translate-x-1/2 lg:grid-cols-3 lg:gap-3 lg:rounded-xl2 lg:bg-paper lg:p-4 lg:shadow-soft lg:ring-1 lg:ring-line lg:transition lg:duration-200 ${open ? 'lg:visible lg:translate-y-0 lg:opacity-100' : 'lg:invisible lg:translate-y-2 lg:opacity-0'}`}
      >
        {(Object.entries(PRODUCT_TYPES) as [ProductType, (typeof PRODUCT_TYPES)[ProductType]][]).map(
          ([type, { label, path }]) => {
            const current = path === currentPath;
            return (
              <li key={path}>
                <Link
                  to={path}
                  aria-current={current ? 'page' : undefined}
                  onClick={follow}
                  className="group/tile block py-2 text-sm text-ink/80 hover:text-ink lg:rounded-xl lg:p-2 lg:hover:bg-card"
                >
                  <span className="hidden aspect-[4/3] overflow-hidden rounded-lg bg-line lg:block">
                    <img
                      src={TILE_PHOTOS[type]}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover/tile:scale-105"
                    />
                  </span>
                  <span className={`lg:mt-2 lg:block lg:font-medium ${current ? 'text-ink underline decoration-amber decoration-2 underline-offset-4' : ''}`}>
                    {label}
                  </span>
                </Link>
              </li>
            );
          },
        )}
      </ul>
    </li>
  );
}

const LARGE_SCREEN = '(min-width: 64rem)';

/** Whether the screen is at Tailwind's lg breakpoint or wider; assumes so where media queries are unavailable. */
function useIsLargeScreen() {
  const [large, setLarge] = useState(() => window.matchMedia?.(LARGE_SCREEN).matches ?? true);
  useEffect(() => {
    const query = window.matchMedia?.(LARGE_SCREEN);
    if (!query) return;
    const update = () => setLarge(query.matches);
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  return large;
}
