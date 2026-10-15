import { fireEvent, screen, within } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { STORAGE_KEY } from './cart/cart-store';
import { serveHomepage } from './test/homepage-fixture';
import { renderApp } from './test/render-app';
import { server } from './test/server';

async function findCard(name: string) {
  return screen.findByRole('article', { name });
}

function addToCart(card: HTMLElement) {
  fireEvent.click(within(card).getByRole('button', { name: 'Thêm vào giỏ' }));
}

function openMiniCart() {
  fireEvent.click(screen.getByRole('button', { name: /^Giỏ hàng/ }));
  return screen.getByRole('dialog', { name: 'Giỏ hàng' });
}

describe('Guest Cart', () => {
  beforeEach(serveHomepage);

  it('adds a product from its card and shows the count in the header', async () => {
    renderApp('/');
    expect(screen.getByRole('button', { name: 'Giỏ hàng, 0 sản phẩm' })).toBeInTheDocument();

    const portra = await findCard('Kodak Portra 400');
    addToCart(portra);

    expect(within(portra).getByRole('status')).toHaveTextContent('Đã thêm vào giỏ');
    addToCart(await findCard('Sony A7 IV'));
    expect(screen.getByRole('button', { name: 'Giỏ hàng, 2 sản phẩm' })).toBeInTheDocument();
  });

  it('lists each line with photo, unit price, quantity and line total, plus the subtotal, in the mini-cart', async () => {
    renderApp('/');

    const portra = await findCard('Kodak Portra 400');
    addToCart(portra);
    addToCart(portra);
    addToCart(await findCard('Canon AE-1 Program'));
    const drawer = openMiniCart();

    const lines = within(drawer).getAllByRole('listitem');
    expect(lines).toHaveLength(2);
    const portraLine = within(drawer).getByRole('listitem', { name: 'Kodak Portra 400' });
    expect(within(portraLine).getByRole('img', { name: 'Kodak Portra 400' })).toHaveAttribute(
      'src',
      'https://img.test/Kodak%20Portra%20400.jpg',
    );
    expect(within(portraLine).getByText('Đơn giá 420.000 ₫')).toBeInTheDocument();
    expect(within(portraLine).getByRole('group', { name: 'Số lượng' })).toHaveTextContent('2');
    expect(within(portraLine).getByText('840.000 ₫')).toBeInTheDocument();
    expect(within(drawer).getByText('Tạm tính')).toBeInTheDocument();
    expect(within(drawer).getByText('8.340.000 ₫')).toBeInTheDocument();
  });

  it('holds a Film Camera at quantity 1, with no quantity stepper', async () => {
    renderApp('/');

    const canon = await findCard('Canon AE-1 Program');
    addToCart(canon);

    expect(within(canon).queryByRole('button', { name: 'Thêm vào giỏ' })).not.toBeInTheDocument();
    expect(within(canon).getByRole('button', { name: 'Đã có trong giỏ' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Giỏ hàng, 1 sản phẩm' })).toBeInTheDocument();

    const line = within(openMiniCart()).getByRole('listitem', { name: 'Canon AE-1 Program' });
    expect(within(line).queryByRole('group', { name: 'Số lượng' })).not.toBeInTheDocument();
    expect(within(line).queryByRole('button', { name: /số lượng/ })).not.toBeInTheDocument();
    expect(within(line).getByText('Số lượng: 1')).toBeInTheDocument();
  });

  it('changes quantities and removes lines in the mini-cart, down to an empty Cart', async () => {
    renderApp('/');

    addToCart(await findCard('Kodak Portra 400'));
    const drawer = openMiniCart();
    const line = within(drawer).getByRole('listitem', { name: 'Kodak Portra 400' });
    const quantity = within(line).getByRole('group', { name: 'Số lượng' });

    fireEvent.click(within(quantity).getByRole('button', { name: 'Tăng số lượng' }));
    fireEvent.click(within(quantity).getByRole('button', { name: 'Tăng số lượng' }));
    expect(quantity).toHaveTextContent('3');
    // The only line, so its line total and the subtotal agree.
    expect(within(drawer).getAllByText('1.260.000 ₫')).toHaveLength(2);

    fireEvent.click(within(quantity).getByRole('button', { name: 'Giảm số lượng' }));
    expect(quantity).toHaveTextContent('2');
    expect(screen.getByRole('button', { name: 'Giỏ hàng, 2 sản phẩm' })).toBeInTheDocument();

    fireEvent.click(within(line).getByRole('button', { name: 'Xóa Kodak Portra 400 khỏi giỏ' }));
    expect(within(drawer).queryByRole('listitem')).not.toBeInTheDocument();
    expect(within(drawer).getByText('Giỏ hàng của bạn đang trống.')).toBeInTheDocument();
    expect(within(drawer).queryByRole('link', { name: 'Thanh toán' })).not.toBeInTheDocument();

    fireEvent.click(within(drawer).getByRole('link', { name: 'Tiếp tục mua sắm' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('stops the quantity at 1 instead of going lower', async () => {
    renderApp('/');

    addToCart(await findCard('Kodak Portra 400'));
    const quantity = within(openMiniCart()).getByRole('group', { name: 'Số lượng' });

    expect(within(quantity).getByRole('button', { name: 'Giảm số lượng' })).toBeDisabled();
  });

  it('goes to the checkout placeholder from "Thanh toán"', async () => {
    renderApp('/');

    addToCart(await findCard('Kodak Portra 400'));
    fireEvent.click(within(openMiniCart()).getByRole('link', { name: 'Thanh toán' }));

    expect(await screen.findByRole('heading', { name: 'Thanh toán' })).toBeInTheDocument();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('keeps the Cart, with each line as it was added, after a reload', async () => {
    const firstVisit = renderApp('/');
    const portra = await findCard('Kodak Portra 400');
    addToCart(portra);
    addToCart(portra);
    addToCart(await findCard('Canon AE-1 Program'));
    firstVisit.unmount();

    // The shop's data has moved on since: the snapshot in the Cart is what the shopper added.
    server.use(http.get('http://api.test/homepage', () => HttpResponse.json({ rows: [] })));
    renderApp('/');

    expect(screen.getByRole('button', { name: 'Giỏ hàng, 3 sản phẩm' })).toBeInTheDocument();
    const drawer = openMiniCart();
    const portraLine = within(drawer).getByRole('listitem', { name: 'Kodak Portra 400' });
    expect(within(portraLine).getByRole('img', { name: 'Kodak Portra 400' })).toBeInTheDocument();
    expect(within(portraLine).getByText('Đơn giá 420.000 ₫')).toBeInTheDocument();
    expect(within(portraLine).getByRole('group', { name: 'Số lượng' })).toHaveTextContent('2');
    const canonLine = within(drawer).getByRole('listitem', { name: 'Canon AE-1 Program' });
    expect(within(canonLine).getByText('Số lượng: 1')).toBeInTheDocument();
    expect(within(drawer).getByText('8.340.000 ₫')).toBeInTheDocument();
  });

  it('starts empty when the saved Cart is unreadable', async () => {
    localStorage.setItem(STORAGE_KEY, '{not json');
    renderApp('/');

    expect(screen.getByRole('button', { name: 'Giỏ hàng, 0 sản phẩm' })).toBeInTheDocument();
    expect(within(openMiniCart()).getByText('Giỏ hàng của bạn đang trống.')).toBeInTheDocument();
  });

  it('offers no add button on Out of Stock cards', async () => {
    renderApp('/');

    const c200 = await findCard('Fujifilm C200');
    expect(within(c200).queryByRole('button', { name: 'Thêm vào giỏ' })).not.toBeInTheDocument();
    expect(within(await findCard('Kodak Portra 400')).getByRole('button', { name: 'Thêm vào giỏ' })).toBeInTheDocument();
  });

  it('tells screen reader users which product each add button is for', async () => {
    renderApp('/');

    const portra = await findCard('Kodak Portra 400');
    expect(within(portra).getByRole('button', { name: 'Thêm vào giỏ' })).toHaveAccessibleDescription('Kodak Portra 400');
  });
});
