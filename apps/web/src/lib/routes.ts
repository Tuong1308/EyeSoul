import type { ProductType } from '@eyesoul/shared';

export const PRODUCTS_PATH = '/products';

/** Display name, `?type=` value and filtered Products page path of each Product Type. */
export const PRODUCT_TYPES: Record<ProductType, { label: string; param: string; path: string }> = {
  DIGITAL_CAMERA: { label: 'Digital cameras', param: 'digital-camera', path: `${PRODUCTS_PATH}?type=digital-camera` },
  FILM_CAMERA: { label: 'Film cameras', param: 'film-camera', path: `${PRODUCTS_PATH}?type=film-camera` },
  FILM_ROLL: { label: 'Film rolls', param: 'film-roll', path: `${PRODUCTS_PATH}?type=film-roll` },
};

/** `PRODUCT_TYPES` as typed `[productType, details]` pairs, in display order. */
export const PRODUCT_TYPE_ENTRIES = Object.entries(PRODUCT_TYPES) as [ProductType, (typeof PRODUCT_TYPES)[ProductType]][];

/** The Product Type a `?type=` value names, or null for a missing or unknown value. */
export function productTypeFromParam(param: string | null): ProductType | null {
  return PRODUCT_TYPE_ENTRIES.find(([, { param: value }]) => value === param)?.[0] ?? null;
}

export const productPath = (slug: string) => `${PRODUCTS_PATH}/${slug}`;

export const CHECKOUT_PATH = '/checkout';

export const LOGIN_PATH = '/login';

export const SEARCH_PATH = '/search';

export const searchPath = (query: string) => `${SEARCH_PATH}?q=${encodeURIComponent(query)}`;

export const SHIPPING_POLICY_PATH = '/shipping-policy';

export const RETURN_POLICY_PATH = '/returns-policy';

export const PORTFOLIO_PATH = '/portfolio';

export const ASSISTANT_PATH = '/assistant';
