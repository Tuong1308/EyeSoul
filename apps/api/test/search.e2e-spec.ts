import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import type { SearchSuggestionsResponse } from '@eyesoul/shared';
import { createProduct, createTestApp, db, resetDatabase } from './fixtures';

describe('GET /search/suggestions', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await createTestApp();
  });

  afterAll(async () => {
    await app.close();
    await db.$disconnect();
  });

  beforeEach(resetDatabase);

  async function suggest(q: string): Promise<string[]> {
    const res = await request(app.getHttpServer()).get('/search/suggestions').query({ q }).expect(200);
    return (res.body as SearchSuggestionsResponse).products.map((p) => p.name);
  }

  it('returns nothing for a query under 2 characters once trimmed', async () => {
    await createProduct({ productType: 'FILM_ROLL', name: 'K' });
    await createProduct({ productType: 'FILM_ROLL', name: 'Kodak Gold 200' });

    expect(await suggest('k')).toEqual([]);
    expect(await suggest('  k  ')).toEqual([]);
    expect(await suggest('')).toEqual([]);
    expect(await suggest('ko')).toEqual(['Kodak Gold 200']);
  });

  it('matches names case-insensitively across all three Product Types', async () => {
    await createProduct({ productType: 'DIGITAL_CAMERA', name: 'Fujifilm X100VI' });
    await createProduct({ productType: 'FILM_CAMERA', name: 'Fujica ST801' });
    await createProduct({ productType: 'FILM_ROLL', name: 'FUJIFILM C200' });
    await createProduct({ productType: 'FILM_ROLL', name: 'Kodak Portra 400' });

    // Compared as a set: how names that differ only in case sort depends on the database collation.
    expect((await suggest('FUJI')).sort()).toEqual(['FUJIFILM C200', 'Fujica ST801', 'Fujifilm X100VI']);
    expect(await suggest('film c2')).toEqual(['FUJIFILM C200']);
  });

  it('returns each match as a ProductCard', async () => {
    const product = await createProduct({
      productType: 'FILM_CAMERA',
      slug: 'canon-ae-1',
      name: 'Canon AE-1',
      priceVnd: 7_500_000,
      conditionGrade: 'B',
      photos: [{ url: 'https://img.test/canon.jpg', alt: 'Canon AE-1 mặt trước', position: 1 }],
    });

    const res = await request(app.getHttpServer()).get('/search/suggestions').query({ q: 'canon' }).expect(200);

    expect(res.body).toEqual({
      products: [
        {
          id: product.id,
          slug: 'canon-ae-1',
          productType: 'FILM_CAMERA',
          name: 'Canon AE-1',
          priceVnd: 7_500_000,
          photo: { url: 'https://img.test/canon.jpg', alt: 'Canon AE-1 mặt trước' },
          conditionGrade: 'B',
          availability: 'available',
        },
      ],
    });
  });

  it('never suggests a Sold Film Camera', async () => {
    await createProduct({ productType: 'FILM_CAMERA', name: 'Leica M6 sold', soldAt: new Date('2026-02-01T00:00:00Z') });
    await createProduct({ productType: 'FILM_CAMERA', name: 'Leica M3' });

    expect(await suggest('leica')).toEqual(['Leica M3']);
  });

  it('suggests at most 8 products', async () => {
    for (let i = 1; i <= 10; i++) await createProduct({ productType: 'FILM_ROLL', name: `Ilford HP5 #${String(i).padStart(2, '0')}` });

    expect(await suggest('ilford')).toEqual([
      'Ilford HP5 #01',
      'Ilford HP5 #02',
      'Ilford HP5 #03',
      'Ilford HP5 #04',
      'Ilford HP5 #05',
      'Ilford HP5 #06',
      'Ilford HP5 #07',
      'Ilford HP5 #08',
    ]);
  });

  it('treats query characters literally, not as wildcards', async () => {
    await createProduct({ productType: 'FILM_ROLL', name: 'Kodak Gold 200' });
    await createProduct({ productType: 'FILM_ROLL', name: 'Ilford Delta 100% B&W' });
    await createProduct({ productType: 'FILM_ROLL', name: 'Fomapan_100 \\ Classic' });

    expect(await suggest('%%')).toEqual([]);
    expect(await suggest('k_dak')).toEqual([]);
    expect(await suggest('0%')).toEqual(['Ilford Delta 100% B&W']);
    expect(await suggest('n_1')).toEqual(['Fomapan_100 \\ Classic']);
    expect(await suggest('\\ c')).toEqual(['Fomapan_100 \\ Classic']);
  });
});
