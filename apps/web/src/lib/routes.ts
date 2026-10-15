import type { ProductType } from '@eyesoul/shared';

/** Display name and listing route of each Product Type. */
export const PRODUCT_TYPES: Record<ProductType, { label: string; path: string }> = {
  DIGITAL_CAMERA: { label: 'Máy ảnh digital', path: '/may-anh-digital' },
  FILM_CAMERA: { label: 'Máy ảnh film', path: '/may-anh-film' },
  FILM_ROLL: { label: 'Cuộn film', path: '/cuon-film' },
};

export const productPath = (slug: string) => `/san-pham/${slug}`;

export const CHECKOUT_PATH = '/thanh-toan';

export const LOGIN_PATH = '/dang-nhap';

export const SEARCH_PATH = '/tim-kiem';

export const searchPath = (query: string) => `${SEARCH_PATH}?q=${encodeURIComponent(query)}`;
