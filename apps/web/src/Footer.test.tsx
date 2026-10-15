import { fireEvent, screen, within } from '@testing-library/react';
import { serveHomepage } from './test/homepage-fixture';
import { renderApp } from './test/render-app';

function footer() {
  return screen.getByRole('contentinfo');
}

describe('Footer', () => {
  beforeEach(serveHomepage);

  it('shows how to contact the shop', () => {
    renderApp('/');

    expect(within(footer()).getByRole('link', { name: /0909 123 456/ })).toHaveAttribute('href', 'tel:+84909123456');
    expect(within(footer()).getByRole('link', { name: 'hello@eyesoul.vn' })).toHaveAttribute(
      'href',
      'mailto:hello@eyesoul.vn',
    );
  });

  it.each([
    ['Shipping policy', '/shipping-policy'],
    ['Returns policy', '/returns-policy'],
  ])('leads to the "%s" page', async (label, path) => {
    renderApp('/');

    const link = within(within(footer()).getByRole('navigation', { name: 'Policies' })).getByRole('link', { name: label });
    expect(link).toHaveAttribute('href', path);
    fireEvent.click(link);

    expect(await screen.findByRole('heading', { level: 1, name: label })).toBeInTheDocument();
  });

  it('links to the shop on social networks, opening in a new tab', () => {
    renderApp('/');

    for (const network of ['Facebook', 'Instagram', 'TikTok']) {
      const link = within(footer()).getByRole('link', { name: `Eye Soul on ${network}` });
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    }
  });

  it('appears on every page, not only the homepage', () => {
    renderApp('/products?type=film-roll');

    expect(footer()).toBeInTheDocument();
  });

  it('takes the shopper home from its Eye Soul logo', async () => {
    renderApp('/checkout');

    fireEvent.click(within(footer()).getByRole('link', { name: 'Eye Soul, home' }));

    expect(await screen.findByRole('region', { name: 'About Eye Soul' })).toBeInTheDocument();
  });
});

describe('Placeholder pages', () => {
  beforeEach(serveHomepage);

  it.each([
    ['/checkout', 'Checkout'],
    ['/portfolio', 'Portfolio'],
    ['/assistant', 'AI assistant'],
  ])('shows %s as an English page under construction, with a way home', async (path, title) => {
    renderApp(path);

    expect(screen.getByRole('heading', { level: 1, name: title })).toBeInTheDocument();
    expect(screen.getByText('This page is under construction.')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('link', { name: 'Back to home' }));
    expect(await screen.findByRole('region', { name: 'About Eye Soul' })).toBeInTheDocument();
  });

  it.each([['/may-anh-film'], ['/san-pham/canon-ae-1-program'], ['/thanh-toan'], ['/dang-nhap']])(
    'no longer serves the old Vietnamese route %s',
    (path) => {
      renderApp(path);

      expect(screen.queryByRole('heading', { level: 1 })).not.toBeInTheDocument();
    },
  );
});
