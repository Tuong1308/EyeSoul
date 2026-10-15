import type { ProductType } from '@eyesoul/shared';

const WIKIMEDIA = 'https://thumb.wikimedia.org/wikipedia/commons/thumb';

/**
 * One representative Product Photo per Product Type, for the header drop-down and the shop Spotlight.
 * Copied from the seed photo map (apps/api/prisma/seed-photos.ts), where their licences and sources are recorded.
 */
export const PRODUCT_TYPE_PHOTOS: Record<ProductType, string> = {
  DIGITAL_CAMERA: `${WIKIMEDIA}/d/db/Fujifilm_X100VI_25_may_2024b.jpg/960px-Fujifilm_X100VI_25_may_2024b.jpg`,
  FILM_CAMERA: `${WIKIMEDIA}/c/c0/Canon_AE-1_Program_2.jpg/960px-Canon_AE-1_Program_2.jpg`,
  FILM_ROLL: `${WIKIMEDIA}/c/c0/Kodak_analog_film_reel_Portra_400_%2827940330389%29.jpg/960px-Kodak_analog_film_reel_Portra_400_%2827940330389%29.jpg`,
};
