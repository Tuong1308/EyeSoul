import { fireEvent, screen, within } from '@testing-library/react';
import { serveHomepage } from './test/homepage-fixture';
import { renderApp } from './test/render-app';

function header() {
  return screen.getByRole('banner');
}

/** The development-only switch on the login placeholder page. */
function signInFromDevPanel(displayName: string) {
  const devPanel = screen.getByRole('form', { name: 'Stub session (development only)' });
  fireEvent.change(within(devPanel).getByLabelText('Display name'), { target: { value: displayName } });
  fireEvent.click(within(devPanel).getByRole('button', { name: 'Log in (stub)' }));
}

function mainNav() {
  return within(header()).getByRole('navigation', { name: 'Main' });
}

describe('Header navigation', () => {
  beforeEach(serveHomepage);

  it('offers one "Products" link to the Products page, marked current once there', async () => {
    renderApp('/');

    const products = within(mainNav()).getByRole('link', { name: 'Products' });
    expect(products).toHaveAttribute('href', '/products');
    expect(products).not.toHaveAttribute('aria-current');
    fireEvent.click(products);

    expect(await screen.findByRole('heading', { level: 1, name: 'Products' })).toBeInTheDocument();
    expect(within(mainNav()).getByRole('link', { name: 'Products' })).toHaveAttribute('aria-current', 'page');
  });

  it.each([
    ['Digital cameras', '/products?type=digital-camera'],
    ['Film cameras', '/products?type=film-camera'],
    ['Film rolls', '/products?type=film-roll'],
  ])('drops down a link to the Products page filtered to %s', async (label, path) => {
    renderApp('/');

    const link = within(mainNav()).getByRole('link', { name: label });
    expect(link).toHaveAttribute('href', path);
    fireEvent.click(link);

    expect(await screen.findByRole('heading', { level: 1, name: 'Products' })).toBeInTheDocument();
  });

  it('marks the chosen Product Type as the current page, and Products as its current section', async () => {
    renderApp('/products?type=film-camera');

    expect(await screen.findByRole('heading', { level: 1, name: 'Products' })).toBeInTheDocument();
    expect(within(mainNav()).getByRole('link', { name: 'Film cameras' })).toHaveAttribute('aria-current', 'page');
    expect(within(mainNav()).getByRole('link', { name: 'Products' })).toHaveAttribute('aria-current', 'true');
  });

  it('keeps the drop-down open while keyboard focus moves from "Products" into it', () => {
    renderApp('/');

    const products = within(mainNav()).getByRole('link', { name: 'Products' });
    expect(products).toHaveAttribute('aria-expanded', 'false');

    fireEvent.focus(products);
    expect(products).toHaveAttribute('aria-expanded', 'true');
    const filmRolls = within(mainNav()).getByRole('link', { name: 'Film rolls' });
    fireEvent.blur(products, { relatedTarget: filmRolls });
    filmRolls.focus();
    expect(products).toHaveAttribute('aria-expanded', 'true');

    // The pointer wandering off doesn't snatch the drop-down away from keyboard focus.
    fireEvent.mouseLeave(products.closest('li')!);
    expect(products).toHaveAttribute('aria-expanded', 'true');

    fireEvent.keyDown(filmRolls, { key: 'Escape' });
    expect(products).toHaveAttribute('aria-expanded', 'false');
    expect(products).toHaveFocus();
  });

  it('folds Products and its Product Types behind a compact menu button, which closes once a link is followed', async () => {
    renderApp('/');

    const menuButton = within(header()).getByRole('button', { name: 'Menu' });
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(menuButton);
    expect(menuButton).toHaveAttribute('aria-expanded', 'true');
    const nav = mainNav();
    expect(within(nav).getByRole('link', { name: 'Products' })).toBeInTheDocument();
    expect(menuButton).toHaveAttribute('aria-controls', nav.id);

    fireEvent.click(within(nav).getByRole('link', { name: 'Film cameras' }));
    expect(await screen.findByRole('heading', { level: 1, name: 'Products' })).toBeInTheDocument();
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('takes the shopper home from the Eye Soul logo', async () => {
    renderApp('/products?type=film-roll');

    fireEvent.click(within(header()).getByRole('link', { name: 'Eye Soul, home' }));

    expect(await screen.findByRole('region', { name: 'Digital cameras' })).toBeInTheDocument();
  });
});

describe('Header account control (stub session)', () => {
  beforeEach(serveHomepage);

  it('is signed out by default and leads to the login page from "Log in"', async () => {
    renderApp('/');

    const login = within(header()).getByRole('link', { name: 'Log in' });
    expect(login).toHaveAttribute('href', '/login');
    fireEvent.click(login);

    expect(await screen.findByRole('heading', { level: 1, name: 'Log in' })).toBeInTheDocument();
  });

  it('switches to signed in from the development panel, showing the name with a menu that signs out', async () => {
    renderApp('/login');

    signInFromDevPanel('Minh Anh');

    expect(within(header()).queryByRole('link', { name: 'Log in' })).not.toBeInTheDocument();
    const account = within(header()).getByRole('button', { name: 'Account: Minh Anh' });
    expect(account).toHaveTextContent('Minh Anh');
    expect(account).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(account);
    expect(account).toHaveAttribute('aria-expanded', 'true');
    const menu = screen.getByRole('menu', { name: 'Account: Minh Anh' });
    fireEvent.click(within(menu).getByRole('menuitem', { name: 'Log out' }));

    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    expect(within(header()).queryByRole('button', { name: /^Account/ })).not.toBeInTheDocument();
    expect(within(header()).getByRole('link', { name: 'Log in' })).toHaveFocus();
  });

  it('keeps the development session after a reload', async () => {
    const firstVisit = renderApp('/login');
    signInFromDevPanel('Minh Anh');
    firstVisit.unmount();

    renderApp('/');

    expect(within(header()).getByRole('button', { name: 'Account: Minh Anh' })).toBeInTheDocument();
  });

  it('closes the account menu with Escape, returning focus to the account button', async () => {
    const firstVisit = renderApp('/login');
    signInFromDevPanel('Minh Anh');
    firstVisit.unmount();
    renderApp('/');

    const account = within(header()).getByRole('button', { name: 'Account: Minh Anh' });
    fireEvent.click(account);
    expect(within(screen.getByRole('menu')).getByRole('menuitem', { name: 'Log out' })).toHaveFocus();

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    expect(account).toHaveFocus();
  });
});
