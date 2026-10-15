import { fireEvent, screen, within } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { homepage, serveHomepage } from './test/homepage-fixture';
import { renderApp } from './test/render-app';
import { server } from './test/server';

function tabs() {
  return screen.getByRole('navigation', { name: 'Product types' });
}

describe('Products page', () => {
  beforeEach(serveHomepage);

  it('shows a Featured Products row per Product Type with photos, names and VND prices', async () => {
    renderApp('/products');

    expect(screen.getByRole('heading', { level: 1, name: 'Our products' })).toBeInTheDocument();
    const digital = await screen.findByRole('region', { name: 'Digital cameras' });
    const film = screen.getByRole('region', { name: 'Film cameras' });
    const rolls = screen.getByRole('region', { name: 'Film rolls' });
    expect(screen.getAllByRole('region')).toEqual([digital, film, rolls]);

    expect(within(film).getByText('Featured · Each one is unique')).toBeInTheDocument();
    expect(within(digital).getByText('Fujifilm X100VI')).toBeInTheDocument();
    expect(within(digital).getByText('₫45,990,000')).toBeInTheDocument();
    expect(within(digital).getByRole('img', { name: 'Sony A7 IV' })).toHaveAttribute(
      'src',
      'https://img.test/Sony%20A7%20IV.jpg',
    );
    expect(within(digital).getByText('₫52,990,000')).toBeInTheDocument();
    expect(within(film).getByText('Canon AE-1 Program')).toBeInTheDocument();
    expect(within(film).getByText('₫7,500,000')).toBeInTheDocument();
    expect(within(rolls).getByText('Kodak Portra 400')).toBeInTheDocument();
    expect(within(rolls).getByText('₫420,000')).toBeInTheDocument();
  });

  it('marks the "All" tab as the current page when unfiltered', async () => {
    renderApp('/products');

    expect(within(tabs()).getByRole('link', { name: 'All' })).toHaveAttribute('aria-current', 'page');
    expect(within(tabs()).getByRole('link', { name: 'Film cameras' })).not.toHaveAttribute('aria-current');
    expect(await screen.findAllByRole('region')).toHaveLength(3);
  });

  it.each([
    ['digital-camera', 'Digital cameras'],
    ['film-camera', 'Film cameras'],
    ['film-roll', 'Film rolls'],
  ])('shows only the %s row, with its tab marked current', async (type, label) => {
    renderApp(`/products?type=${type}`);

    const row = await screen.findByRole('region', { name: label });
    expect(screen.getAllByRole('region')).toEqual([row]);
    expect(within(tabs()).getByRole('link', { name: label })).toHaveAttribute('aria-current', 'page');
    expect(within(tabs()).getByRole('link', { name: 'All' })).not.toHaveAttribute('aria-current');
  });

  it('switches rows from the tabs, and back to all of them from "All"', async () => {
    renderApp('/products');
    await screen.findByRole('region', { name: 'Film rolls' });

    const filmRolls = within(tabs()).getByRole('link', { name: 'Film rolls' });
    expect(filmRolls).toHaveAttribute('href', '/products?type=film-roll');
    fireEvent.click(filmRolls);
    expect(screen.getAllByRole('region')).toEqual([screen.getByRole('region', { name: 'Film rolls' })]);

    const all = within(tabs()).getByRole('link', { name: 'All' });
    expect(all).toHaveAttribute('href', '/products');
    fireEvent.click(all);
    expect(screen.getAllByRole('region')).toHaveLength(3);
  });

  it('shows every row for a Product Type it does not know', async () => {
    renderApp('/products?type=lenses');

    expect(await screen.findAllByRole('region')).toHaveLength(3);
    expect(within(tabs()).getByRole('link', { name: 'All' })).toHaveAttribute('aria-current', 'page');
  });

  it(`goes to the row's tab from its "View all" link`, async () => {
    renderApp('/products');

    const rolls = await screen.findByRole('region', { name: 'Film rolls' });
    const viewAll = within(rolls).getByRole('link', { name: 'View all' });
    expect(viewAll).toHaveAttribute('href', '/products?type=film-roll');
    fireEvent.click(viewAll);

    expect(screen.getAllByRole('region')).toEqual([screen.getByRole('region', { name: 'Film rolls' })]);
    expect(within(tabs()).getByRole('link', { name: 'Film rolls' })).toHaveAttribute('aria-current', 'page');
  });

  it('shows a Condition Grade badge on Film Camera cards only', async () => {
    renderApp('/products');

    const film = await screen.findByRole('region', { name: 'Film cameras' });
    const canon = within(film).getByRole('article', { name: 'Canon AE-1 Program' });
    const pentax = within(film).getByRole('article', { name: 'Pentax K1000' });

    expect(within(canon).getByRole('img', { name: 'Condition A+' })).toBeInTheDocument();
    expect(within(pentax).getByRole('img', { name: 'Condition C' })).toBeInTheDocument();
    const digital = screen.getByRole('region', { name: 'Digital cameras' });
    expect(within(digital).queryByRole('img', { name: /Condition/ })).not.toBeInTheDocument();
  });

  it('labels Out of Stock cards "Out of stock" and still shows them', async () => {
    renderApp('/products');

    const rolls = await screen.findByRole('region', { name: 'Film rolls' });
    const c200 = within(rolls).getByRole('article', { name: 'Fujifilm C200' });
    const portra = within(rolls).getByRole('article', { name: 'Kodak Portra 400' });

    expect(within(c200).getByText('Out of stock')).toBeInTheDocument();
    expect(within(c200).getByText('₫165,000')).toBeInTheDocument();
    expect(within(portra).queryByText('Out of stock')).not.toBeInTheDocument();
  });

  it('goes to the product page when a card is clicked', async () => {
    renderApp('/products');

    const film = await screen.findByRole('region', { name: 'Film cameras' });
    const canon = within(film).getByRole('link', { name: 'Canon AE-1 Program' });
    expect(canon).toHaveAttribute('href', '/products/canon-ae-1-program');
    fireEvent.click(canon);

    expect(await screen.findByRole('heading', { name: 'Product' })).toBeInTheDocument();
    expect(screen.getByText('canon-ae-1-program')).toBeInTheDocument();
  });
});

describe('Products page loading and errors', () => {
  it('holds the layout with placeholders while the rows load', async () => {
    let respond!: () => void;
    const answered = new Promise<void>((resolve) => (respond = resolve));
    server.use(
      http.get('http://api.test/homepage', async () => {
        await answered;
        return HttpResponse.json(homepage);
      }),
    );
    renderApp('/products');

    const loading = screen.getByRole('status', { name: 'Loading products' });
    expect(loading).toHaveTextContent('Loading products…');
    expect(screen.queryByRole('region')).not.toBeInTheDocument();

    respond();

    expect(await screen.findByRole('region', { name: 'Digital cameras' })).toBeInTheDocument();
    expect(screen.queryByRole('status', { name: 'Loading products' })).not.toBeInTheDocument();
  });

  it('shows a friendly error when the rows fail to load, and "Try again" loads them again', async () => {
    let failing = true;
    server.use(
      http.get('http://api.test/homepage', () =>
        failing ? new HttpResponse(null, { status: 500 }) : HttpResponse.json(homepage),
      ),
    );
    renderApp('/products');

    const error = await screen.findByRole('alert');
    expect(error).toHaveTextContent('Couldn’t load the products');
    expect(screen.queryByRole('region')).not.toBeInTheDocument();

    failing = false;
    fireEvent.click(within(error).getByRole('button', { name: 'Try again' }));

    expect(await screen.findByRole('region', { name: 'Digital cameras' })).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
