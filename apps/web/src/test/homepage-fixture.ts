import type { HomepageResponse, ProductCard } from '@eyesoul/shared';
import { http, HttpResponse } from 'msw';
import { server } from './server';

export function card(overrides: Partial<ProductCard> & Pick<ProductCard, 'name' | 'productType'>): ProductCard {
  return {
    id: overrides.name,
    slug: overrides.name.toLowerCase().replace(/\W+/g, '-'),
    priceVnd: 1_000_000,
    photo: { url: `https://img.test/${encodeURIComponent(overrides.name)}.jpg`, alt: overrides.name },
    conditionGrade: null,
    availability: 'available',
    ...overrides,
  };
}

export const homepage: HomepageResponse = {
  rows: [
    {
      productType: 'DIGITAL_CAMERA',
      products: [
        card({ productType: 'DIGITAL_CAMERA', name: 'Fujifilm X100VI', priceVnd: 45_990_000 }),
        card({ productType: 'DIGITAL_CAMERA', name: 'Sony A7 IV', priceVnd: 52_990_000 }),
      ],
    },
    {
      productType: 'FILM_CAMERA',
      products: [
        card({ productType: 'FILM_CAMERA', name: 'Canon AE-1 Program', priceVnd: 7_500_000, conditionGrade: 'A+' }),
        card({ productType: 'FILM_CAMERA', name: 'Pentax K1000', priceVnd: 4_500_000, conditionGrade: 'C' }),
      ],
    },
    {
      productType: 'FILM_ROLL',
      products: [
        card({ productType: 'FILM_ROLL', name: 'Kodak Portra 400', priceVnd: 420_000 }),
        card({ productType: 'FILM_ROLL', name: 'Fujifilm C200', priceVnd: 165_000, availability: 'out_of_stock' }),
      ],
    },
  ],
  samplePhotos: [
    {
      id: 'sample-1',
      url: 'https://img.test/sample-portra.jpg',
      alt: 'Phố cổ Hội An lúc hoàng hôn',
      filmRoll: { slug: 'kodak-portra-400-35mm-36', name: 'Kodak Portra 400' },
    },
    {
      id: 'sample-2',
      url: 'https://img.test/sample-hp5.jpg',
      alt: 'Người bán hàng rong ở Sài Gòn',
      filmRoll: { slug: 'ilford-hp5-plus-35mm-36', name: 'Ilford HP5 Plus 400' },
    },
  ],
};

export function serveHomepage() {
  server.use(http.get('http://api.test/homepage', () => HttpResponse.json(homepage)));
}
