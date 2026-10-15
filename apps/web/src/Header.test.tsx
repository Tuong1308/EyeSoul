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

describe('Header navigation', () => {
  beforeEach(serveHomepage);

  it.each([
    ['Digital cameras', '/products?type=digital-camera'],
    ['Film cameras', '/products?type=film-camera'],
    ['Film rolls', '/products?type=film-roll'],
  ])('links to the Products page filtered to %s', async (label, path) => {
    renderApp('/');

    const nav = within(header()).getByRole('navigation', { name: 'Product types' });
    const link = within(nav).getByRole('link', { name: label });
    expect(link).toHaveAttribute('href', path);
    fireEvent.click(link);

    expect(await screen.findByRole('heading', { level: 1, name: 'Products' })).toBeInTheDocument();
  });

  it('folds the Product Type links behind a compact menu button, which closes once a link is followed', async () => {
    renderApp('/');

    const menuButton = within(header()).getByRole('button', { name: 'Menu' });
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(menuButton);
    expect(menuButton).toHaveAttribute('aria-expanded', 'true');
    const nav = screen.getByRole('navigation', { name: 'Product types' });
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
