import { fireEvent, screen, within } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { homepage, serveHomepage } from './test/homepage-fixture';
import { renderApp } from './test/render-app';
import { server } from './test/server';

describe('Homepage', () => {
  beforeEach(serveHomepage);

  it('leads from the hero\'s "Shop film cameras" button to the Products page filtered to Film cameras', async () => {
    renderApp('/');

    const hero = screen.getByRole('region', { name: 'About Eye Soul' });
    expect(within(hero).getByRole('heading', { level: 1, name: 'Slow down, look closer.' })).toBeInTheDocument();
    const shop = within(hero).getByRole('link', { name: 'Shop film cameras' });
    expect(shop).toHaveAttribute('href', '/products?type=film-camera');
    fireEvent.click(shop);

    expect(await screen.findByRole('heading', { level: 1, name: 'Our products' })).toBeInTheDocument();
    expect(await screen.findAllByRole('region')).toEqual([screen.getByRole('region', { name: 'Film cameras' })]);
  });

  it('points the hero\'s "See sample photos" button at the Sample Photo section', async () => {
    renderApp('/');

    const hero = screen.getByRole('region', { name: 'About Eye Soul' });
    const see = within(hero).getByRole('link', { name: 'See sample photos' });
    expect(see).toHaveAttribute('href', '#sample-photos');

    const samples = await screen.findByRole('region', { name: 'Shot on our film' });
    expect(within(samples).getByRole('heading', { name: 'Shot on our film' })).toHaveAttribute('id', 'sample-photos');
  });

  it('keeps the hero film strip and photos out of the way of assistive tech: the two buttons are all it offers', () => {
    renderApp('/');

    const hero = screen.getByRole('region', { name: 'About Eye Soul' });
    expect(within(hero).getAllByRole('link').map((link) => link.textContent)).toEqual([
      'Shop film cameras',
      'See sample photos',
    ]);
    expect(within(hero).queryAllByRole('img')).toEqual([]);
    expect(within(hero).getByRole('list', { name: 'Our commitments' })).toHaveTextContent('Film cameras graded A+ to C');
  });

  it('leaves the Featured Product rows to the Products page', async () => {
    renderApp('/');

    const samples = await screen.findByRole('region', { name: 'Shot on our film' });
    const hero = screen.getByRole('region', { name: 'About Eye Soul' });

    expect(screen.getAllByRole('region')).toEqual([hero, samples]);
    expect(screen.queryByText('Fujifilm X100VI')).not.toBeInTheDocument();
  });

  it('shows each Sample Photo labelled with the Film Roll it was shot on', async () => {
    renderApp('/');

    const samples = await screen.findByRole('region', { name: 'Shot on our film' });
    const portra = within(samples).getByRole('link', { name: /Kodak Portra 400/ });

    expect(within(portra).getByRole('img', { name: 'Hoi An old town at sunset' })).toHaveAttribute(
      'src',
      'https://img.test/sample-portra.jpg',
    );
    expect(within(portra).getByText('Kodak Portra 400')).toBeInTheDocument();
    const hp5 = within(samples).getByRole('link', { name: /Ilford HP5 Plus 400/ });
    expect(within(hp5).getByText('Ilford HP5 Plus 400')).toBeInTheDocument();
  });

  it(`goes to the Film Roll's page when a Sample Photo is clicked`, async () => {
    renderApp('/');

    const samples = await screen.findByRole('region', { name: 'Shot on our film' });
    fireEvent.click(within(samples).getByRole('link', { name: /Ilford HP5 Plus 400/ }));

    expect(await screen.findByRole('heading', { name: 'Product' })).toBeInTheDocument();
    expect(screen.getByText('ilford-hp5-plus-35mm-36')).toBeInTheDocument();
  });
});

describe('Homepage loading and errors', () => {
  it('holds the layout with placeholders while the Sample Photos load', async () => {
    let respond!: () => void;
    const answered = new Promise<void>((resolve) => (respond = resolve));
    server.use(
      http.get('http://api.test/homepage', async () => {
        await answered;
        return HttpResponse.json(homepage);
      }),
    );
    renderApp('/');

    const loading = screen.getByRole('status', { name: 'Loading photos' });
    expect(loading).toHaveTextContent('Loading photos…');
    expect(screen.getByRole('region', { name: 'About Eye Soul' })).toBeInTheDocument();
    expect(screen.queryByRole('region', { name: 'Shot on our film' })).not.toBeInTheDocument();

    respond();

    expect(await screen.findByRole('region', { name: 'Shot on our film' })).toBeInTheDocument();
    expect(screen.queryByRole('status', { name: 'Loading photos' })).not.toBeInTheDocument();
  });

  it('shows a friendly error when the Sample Photos fail to load, and "Try again" loads them again', async () => {
    let failing = true;
    server.use(
      http.get('http://api.test/homepage', () =>
        failing ? new HttpResponse(null, { status: 500 }) : HttpResponse.json(homepage),
      ),
    );
    renderApp('/');

    const error = await screen.findByRole('alert');
    expect(error).toHaveTextContent('Couldn’t load the photos');
    expect(screen.queryByRole('region', { name: 'Shot on our film' })).not.toBeInTheDocument();

    failing = false;
    fireEvent.click(within(error).getByRole('button', { name: 'Try again' }));

    expect(await screen.findByRole('region', { name: 'Shot on our film' })).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
