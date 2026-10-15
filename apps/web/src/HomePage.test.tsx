import type { HomepageResponse, ProductCard } from '@eyesoul/shared';
import { screen, within } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { renderApp } from './test/render-app';
import { server } from './test/server';

function card(overrides: Partial<ProductCard> & Pick<ProductCard, 'name' | 'productType'>): ProductCard {
  return {
    id: overrides.name,
    slug: overrides.name.toLowerCase().replace(/\W+/g, '-'),
    priceVnd: 1_000_000,
    photo: { url: `https://img.test/${encodeURIComponent(overrides.name)}.jpg`, alt: overrides.name },
    ...overrides,
  };
}

const homepage: HomepageResponse = {
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
      products: [card({ productType: 'FILM_CAMERA', name: 'Canon AE-1 Program', priceVnd: 7_500_000 })],
    },
    {
      productType: 'FILM_ROLL',
      products: [card({ productType: 'FILM_ROLL', name: 'Kodak Portra 400', priceVnd: 420_000 })],
    },
  ],
};

describe('Homepage', () => {
  beforeEach(() => {
    server.use(http.get('http://api.test/homepage', () => HttpResponse.json(homepage)));
  });

  it('shows a Featured Products row per Product Type with photos, names and VND prices', async () => {
    renderApp('/');

    const digital = await screen.findByRole('region', { name: 'Máy ảnh digital' });
    const film = screen.getByRole('region', { name: 'Máy ảnh film' });
    const rolls = screen.getByRole('region', { name: 'Cuộn film' });

    const regions = screen.getAllByRole('region');
    expect(regions).toEqual([digital, film, rolls]);

    expect(within(digital).getByText('Fujifilm X100VI')).toBeInTheDocument();
    expect(within(digital).getByText('45.990.000 ₫')).toBeInTheDocument();
    expect(within(digital).getByRole('img', { name: 'Sony A7 IV' })).toHaveAttribute(
      'src',
      'https://img.test/Sony%20A7%20IV.jpg',
    );
    expect(within(digital).getByText('52.990.000 ₫')).toBeInTheDocument();
    expect(within(film).getByText('Canon AE-1 Program')).toBeInTheDocument();
    expect(within(film).getByText('7.500.000 ₫')).toBeInTheDocument();
    expect(within(rolls).getByText('Kodak Portra 400')).toBeInTheDocument();
    expect(within(rolls).getByText('420.000 ₫')).toBeInTheDocument();
  });
});
