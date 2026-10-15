import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import type { HomepageResponse, ProductType } from '@eyesoul/shared';
import { createProduct, createTestApp, db, resetDatabase } from './fixtures';

describe('GET /homepage', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await createTestApp();
  });

  afterAll(async () => {
    await app.close();
    await db.$disconnect();
  });

  beforeEach(resetDatabase);

  async function getHomepage(): Promise<HomepageResponse> {
    const res = await request(app.getHttpServer()).get('/homepage').expect(200);
    return res.body;
  }

  it('returns rows in the order Digital Camera, Film Camera, Film Roll, each holding only its own Product Type', async () => {
    await createProduct({ productType: 'FILM_ROLL', name: 'Kodak Portra 400' });
    await createProduct({ productType: 'FILM_CAMERA', name: 'Canon AE-1' });
    await createProduct({ productType: 'DIGITAL_CAMERA', name: 'Fujifilm X100VI' });

    const { rows } = await getHomepage();

    expect(rows.map((r) => r.productType)).toEqual(['DIGITAL_CAMERA', 'FILM_CAMERA', 'FILM_ROLL']);
    expect(rows.map((r) => r.products.map((p) => p.name))).toEqual([
      ['Fujifilm X100VI'],
      ['Canon AE-1'],
      ['Kodak Portra 400'],
    ]);
  });

  function rowNames(rows: HomepageResponse['rows'], productType: ProductType) {
    return rows.find((r) => r.productType === productType)?.products.map((p) => p.name);
  }

  it('puts featured products first, in featured-rank order, and caps the row at 4', async () => {
    await createProduct({ productType: 'DIGITAL_CAMERA', name: 'Rank 3', featured: true, featuredRank: 3 });
    await createProduct({ productType: 'DIGITAL_CAMERA', name: 'Rank 1', featured: true, featuredRank: 1 });
    await createProduct({ productType: 'DIGITAL_CAMERA', name: 'Not featured, newest' });
    await createProduct({ productType: 'DIGITAL_CAMERA', name: 'Rank 2', featured: true, featuredRank: 2 });
    await createProduct({ productType: 'DIGITAL_CAMERA', name: 'Rank 4', featured: true, featuredRank: 4 });
    await createProduct({ productType: 'DIGITAL_CAMERA', name: 'Rank 5', featured: true, featuredRank: 5 });

    const { rows } = await getHomepage();

    expect(rowNames(rows, 'DIGITAL_CAMERA')).toEqual(['Rank 1', 'Rank 2', 'Rank 3', 'Rank 4']);
  });

  it('falls back to the newest products when a Product Type has no featured products', async () => {
    for (const name of ['Oldest', 'Older', 'Middle', 'Newer', 'Newest']) {
      await createProduct({ productType: 'FILM_ROLL', name });
    }

    const { rows } = await getHomepage();

    expect(rowNames(rows, 'FILM_ROLL')).toEqual(['Newest', 'Newer', 'Middle', 'Older']);
  });

  it('fills the slots after the featured products with the newest non-featured ones', async () => {
    await createProduct({ productType: 'FILM_CAMERA', name: 'Old plain' });
    await createProduct({ productType: 'FILM_CAMERA', name: 'Featured', featured: true, featuredRank: 1 });
    await createProduct({ productType: 'FILM_CAMERA', name: 'Mid plain' });
    await createProduct({ productType: 'FILM_CAMERA', name: 'New plain' });
    await createProduct({ productType: 'FILM_CAMERA', name: 'Newest plain' });

    const { rows } = await getHomepage();

    expect(rowNames(rows, 'FILM_CAMERA')).toEqual(['Featured', 'Newest plain', 'New plain', 'Mid plain']);
  });

  it('never shows Sold Film Cameras, even featured ones', async () => {
    const soldAt = new Date('2026-02-01T00:00:00Z');
    await createProduct({ productType: 'FILM_CAMERA', name: 'Sold featured', featured: true, featuredRank: 1, soldAt });
    await createProduct({ productType: 'FILM_CAMERA', name: 'Available featured', featured: true, featuredRank: 2 });
    await createProduct({ productType: 'FILM_CAMERA', name: 'Available plain' });
    await createProduct({ productType: 'FILM_CAMERA', name: 'Sold plain', soldAt });

    const { rows } = await getHomepage();

    expect(rowNames(rows, 'FILM_CAMERA')).toEqual(['Available featured', 'Available plain']);
  });

  it('shows each product as a card with its first Product Photo and integer VND price', async () => {
    const product = await createProduct({
      productType: 'DIGITAL_CAMERA',
      slug: 'sony-a7-iv',
      name: 'Sony A7 IV',
      priceVnd: 52_990_000,
      photos: [
        { url: 'https://img.test/back.jpg', alt: 'Mặt sau', position: 2 },
        { url: 'https://img.test/front.jpg', alt: 'Mặt trước', position: 1 },
      ],
    });
    await createProduct({ productType: 'DIGITAL_CAMERA', name: 'No photo yet' });

    const { rows } = await getHomepage();

    expect(rows[0].products).toEqual([
      {
        id: expect.any(String),
        slug: expect.any(String),
        productType: 'DIGITAL_CAMERA',
        name: 'No photo yet',
        priceVnd: 1_000_000,
        photo: null,
      },
      {
        id: product.id,
        slug: 'sony-a7-iv',
        productType: 'DIGITAL_CAMERA',
        name: 'Sony A7 IV',
        priceVnd: 52_990_000,
        photo: { url: 'https://img.test/front.jpg', alt: 'Mặt trước' },
      },
    ]);
  });

  it('allows the configured web origin through CORS', async () => {
    const res = await request(app.getHttpServer()).get('/homepage').set('Origin', 'http://localhost:5173');

    expect(res.headers['access-control-allow-origin']).toBe('http://localhost:5173');
  });
});
