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

/** A photo shot on a Film Roll, linking to that Film Roll. */
export interface HomepageSamplePhoto {
  id: string;
  url: string;
  alt: string;
  filmRoll: { slug: string; name: string };
}

export interface HomepageResponse {
  rows: HomepageRow[];
  samplePhotos: HomepageSamplePhoto[];
}

export interface SearchSuggestionsResponse {
  /** At most 8 products whose name matches the query; never a Sold Film Camera. */
  products: ProductCard[];
}
