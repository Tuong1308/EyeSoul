import type { ProductType } from '@eyesoul/shared';

/** Display name and listing route of each Product Type. */
export const PRODUCT_TYPES: Record<ProductType, { label: string; path: string }> = {
  DIGITAL_CAMERA: { label: 'Máy ảnh digital', path: '/may-anh-digital' },
  FILM_CAMERA: { label: 'Máy ảnh film', path: '/may-anh-film' },
  FILM_ROLL: { label: 'Cuộn film', path: '/cuon-film' },
};

export const productPath = (slug: string) => `/san-pham/${slug}`;
