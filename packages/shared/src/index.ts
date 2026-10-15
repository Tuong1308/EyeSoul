// Types only: both apps import these with `import type`, so the package has no runtime code.

export type ProductType = 'DIGITAL_CAMERA' | 'FILM_CAMERA' | 'FILM_ROLL';

/** Sold Film Cameras never reach a ProductCard, so there is no `sold` value. */
export type Availability = 'available' | 'out_of_stock';

export type ConditionGrade = 'A+' | 'A' | 'B' | 'C';

export interface ProductCard {
  id: string;
  slug: string;
  productType: ProductType;
  name: string;
  priceVnd: number;
  photo: { url: string; alt: string } | null;
  /** Film Cameras only; null for every other Product Type. */
  conditionGrade: ConditionGrade | null;
  availability: Availability;
}

export interface HomepageRow {
  productType: ProductType;
  products: ProductCard[];
}

export interface HomepageResponse {
  rows: HomepageRow[];
}

export interface SearchSuggestionsResponse {
  /** At most 8 products whose name matches the query; never a Sold Film Camera. */
  products: ProductCard[];
}
