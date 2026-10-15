import { fireEvent, screen, within } from '@testing-library/react';
import { serveHomepage } from './test/homepage-fixture';
import { renderApp } from './test/render-app';

function header() {
  return screen.getByRole('banner');
}

/** The development-only switch on the login placeholder page. */
function signInFromDevPanel(displayName: string) {
  const devPanel = screen.getByRole('form', { name: 'Phiên đăng nhập thử (chỉ khi phát triển)' });
  fireEvent.change(within(devPanel).getByLabelText('Tên hiển thị'), { target: { value: displayName } });
  fireEvent.click(within(devPanel).getByRole('button', { name: 'Đăng nhập thử' }));
}

describe('Header navigation', () => {
  beforeEach(serveHomepage);

  it.each([
    ['Máy ảnh digital'],
    ['Máy ảnh film'],
    ['Cuộn film'],
  ])('links to the %s listing', async (label) => {
    renderApp('/');

    const nav = within(header()).getByRole('navigation', { name: 'Danh mục sản phẩm' });
    fireEvent.click(within(nav).getByRole('link', { name: label }));

    expect(await screen.findByRole('heading', { level: 1, name: label })).toBeInTheDocument();
  });

  it('folds the Product Type links behind a compact menu button, which closes once a link is followed', async () => {
    renderApp('/');

    const menuButton = within(header()).getByRole('button', { name: 'Danh mục' });
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(menuButton);
    expect(menuButton).toHaveAttribute('aria-expanded', 'true');
    const nav = screen.getByRole('navigation', { name: 'Danh mục sản phẩm' });
    expect(menuButton).toHaveAttribute('aria-controls', nav.id);

    fireEvent.click(within(nav).getByRole('link', { name: 'Máy ảnh film' }));
    expect(await screen.findByRole('heading', { level: 1, name: 'Máy ảnh film' })).toBeInTheDocument();
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('takes the shopper home from the Eye Soul logo', async () => {
    renderApp('/cuon-film');

    fireEvent.click(within(header()).getByRole('link', { name: 'Eye Soul, về trang chủ' }));

    expect(await screen.findByRole('region', { name: 'Máy ảnh digital' })).toBeInTheDocument();
  });
});

describe('Header account control (stub session)', () => {
  beforeEach(serveHomepage);

  it('is signed out by default and leads to the login page from "Đăng nhập"', async () => {
    renderApp('/');

    fireEvent.click(within(header()).getByRole('link', { name: 'Đăng nhập' }));

    expect(await screen.findByRole('heading', { level: 1, name: 'Đăng nhập' })).toBeInTheDocument();
  });

  it('switches to signed in from the development panel, showing the name with a menu that signs out', async () => {
    renderApp('/dang-nhap');

    signInFromDevPanel('Minh Anh');

    expect(within(header()).queryByRole('link', { name: 'Đăng nhập' })).not.toBeInTheDocument();
    const account = within(header()).getByRole('button', { name: 'Tài khoản: Minh Anh' });
    expect(account).toHaveTextContent('Minh Anh');
    expect(account).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(account);
    expect(account).toHaveAttribute('aria-expanded', 'true');
    const menu = screen.getByRole('menu', { name: 'Tài khoản: Minh Anh' });
    fireEvent.click(within(menu).getByRole('menuitem', { name: 'Đăng xuất' }));

    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    expect(within(header()).queryByRole('button', { name: /^Tài khoản/ })).not.toBeInTheDocument();
    expect(within(header()).getByRole('link', { name: 'Đăng nhập' })).toHaveFocus();
  });

  it('keeps the development session after a reload', async () => {
    const firstVisit = renderApp('/dang-nhap');
    signInFromDevPanel('Minh Anh');
    firstVisit.unmount();

    renderApp('/');

    expect(within(header()).getByRole('button', { name: 'Tài khoản: Minh Anh' })).toBeInTheDocument();
  });

  it('closes the account menu with Escape, returning focus to the account button', async () => {
    const firstVisit = renderApp('/dang-nhap');
    signInFromDevPanel('Minh Anh');
    firstVisit.unmount();
    renderApp('/');

    const account = within(header()).getByRole('button', { name: 'Tài khoản: Minh Anh' });
    fireEvent.click(account);
    expect(within(screen.getByRole('menu')).getByRole('menuitem', { name: 'Đăng xuất' })).toHaveFocus();

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    expect(account).toHaveFocus();
  });
});
