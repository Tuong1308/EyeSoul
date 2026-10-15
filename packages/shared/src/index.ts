// Types only: both apps import these with `import type`, so the package has no runtime code.

export type ProductType = 'DIGITAL_CAMERA' | 'FILM_CAMERA' | 'FILM_ROLL';

export interface ProductCard {
  id: string;
  slug: string;
  productType: ProductType;
  name: string;
  priceVnd: number;
  photo: { url: string; alt: string } | null;
}

export interface HomepageRow {
  productType: ProductType;
  products: ProductCard[];
}

export interface HomepageResponse {
  rows: HomepageRow[];
}
