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
    ['Chính sách vận chuyển'],
    ['Chính sách đổi trả'],
  ])('leads to the "%s" page', async (label) => {
    renderApp('/');

    fireEvent.click(within(footer()).getByRole('link', { name: label }));

    expect(await screen.findByRole('heading', { level: 1, name: label })).toBeInTheDocument();
  });

  it('links to the shop on social networks, opening in a new tab', () => {
    renderApp('/');

    for (const network of ['Facebook', 'Instagram', 'TikTok']) {
      const link = within(footer()).getByRole('link', { name: `Eye Soul trên ${network}` });
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    }
  });

  it('appears on every page, not only the homepage', () => {
    renderApp('/cuon-film');

    expect(footer()).toBeInTheDocument();
  });
});
