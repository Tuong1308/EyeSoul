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
  fireEvent.click(within(card).getByRole('button', { name: 'Add to cart' }));
}

function openMiniCart() {
  fireEvent.click(screen.getByRole('button', { name: /^Cart/ }));
  return screen.getByRole('dialog', { name: 'Your cart' });
}

describe('Guest Cart', () => {
  beforeEach(serveHomepage);

  it('adds a product from its card and shows the count in the header', async () => {
    renderApp('/');
    expect(screen.getByRole('button', { name: 'Cart, 0 items' })).toBeInTheDocument();

    const portra = await findCard('Kodak Portra 400');
    addToCart(portra);

    expect(within(portra).getByRole('status')).toHaveTextContent('Added to cart');
    expect(screen.getByRole('button', { name: 'Cart, 1 item' })).toBeInTheDocument();
    addToCart(await findCard('Sony A7 IV'));
    expect(screen.getByRole('button', { name: 'Cart, 2 items' })).toBeInTheDocument();
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
    expect(within(portraLine).getByText('Unit price ₫420,000')).toBeInTheDocument();
    expect(within(portraLine).getByRole('group', { name: 'Quantity' })).toHaveTextContent('2');
    expect(within(portraLine).getByText('₫840,000')).toBeInTheDocument();
    expect(within(drawer).getByText('Subtotal')).toBeInTheDocument();
    expect(within(drawer).getByText('₫8,340,000')).toBeInTheDocument();
  });

  it('holds a Film Camera at quantity 1, with no quantity stepper', async () => {
    renderApp('/');

    const canon = await findCard('Canon AE-1 Program');
    addToCart(canon);

    expect(within(canon).queryByRole('button', { name: 'Add to cart' })).not.toBeInTheDocument();
    expect(within(canon).getByRole('button', { name: 'In your cart' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Cart, 1 item' })).toBeInTheDocument();

    const line = within(openMiniCart()).getByRole('listitem', { name: 'Canon AE-1 Program' });
    expect(within(line).queryByRole('group', { name: 'Quantity' })).not.toBeInTheDocument();
    expect(within(line).queryByRole('button', { name: /quantity/ })).not.toBeInTheDocument();
    expect(within(line).getByText('Quantity: 1')).toBeInTheDocument();
  });

  it('changes quantities and removes lines in the mini-cart, down to an empty Cart', async () => {
    renderApp('/');

    addToCart(await findCard('Kodak Portra 400'));
    const drawer = openMiniCart();
    const line = within(drawer).getByRole('listitem', { name: 'Kodak Portra 400' });
    const quantity = within(line).getByRole('group', { name: 'Quantity' });

    fireEvent.click(within(quantity).getByRole('button', { name: 'Increase quantity' }));
    fireEvent.click(within(quantity).getByRole('button', { name: 'Increase quantity' }));
    expect(quantity).toHaveTextContent('3');
    // The only line, so its line total and the subtotal agree.
    expect(within(drawer).getAllByText('₫1,260,000')).toHaveLength(2);

    fireEvent.click(within(quantity).getByRole('button', { name: 'Decrease quantity' }));
    expect(quantity).toHaveTextContent('2');
    expect(screen.getByRole('button', { name: 'Cart, 2 items' })).toBeInTheDocument();

    fireEvent.click(within(line).getByRole('button', { name: 'Remove Kodak Portra 400 from cart' }));
    expect(within(drawer).queryByRole('listitem')).not.toBeInTheDocument();
    expect(within(drawer).getByText('Your cart is empty.')).toBeInTheDocument();
    expect(within(drawer).queryByRole('link', { name: 'Checkout' })).not.toBeInTheDocument();

    fireEvent.click(within(drawer).getByRole('link', { name: 'Continue shopping' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('stops the quantity at 1 instead of going lower', async () => {
    renderApp('/');

    addToCart(await findCard('Kodak Portra 400'));
    const quantity = within(openMiniCart()).getByRole('group', { name: 'Quantity' });

    expect(within(quantity).getByRole('button', { name: 'Decrease quantity' })).toBeDisabled();
  });

  it('closes the mini-cart from its close button', async () => {
    renderApp('/');

    openMiniCart();
    fireEvent.click(screen.getByRole('button', { name: 'Close cart' }));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('goes to the checkout placeholder from "Checkout"', async () => {
    renderApp('/');

    addToCart(await findCard('Kodak Portra 400'));
    const checkout = within(openMiniCart()).getByRole('link', { name: 'Checkout' });
    expect(checkout).toHaveAttribute('href', '/checkout');
    fireEvent.click(checkout);

    expect(await screen.findByRole('heading', { name: 'Checkout' })).toBeInTheDocument();
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

    expect(screen.getByRole('button', { name: 'Cart, 3 items' })).toBeInTheDocument();
    const drawer = openMiniCart();
    const portraLine = within(drawer).getByRole('listitem', { name: 'Kodak Portra 400' });
    expect(within(portraLine).getByRole('img', { name: 'Kodak Portra 400' })).toBeInTheDocument();
    expect(within(portraLine).getByText('Unit price ₫420,000')).toBeInTheDocument();
    expect(within(portraLine).getByRole('group', { name: 'Quantity' })).toHaveTextContent('2');
    const canonLine = within(drawer).getByRole('listitem', { name: 'Canon AE-1 Program' });
    expect(within(canonLine).getByText('Quantity: 1')).toBeInTheDocument();
    expect(within(drawer).getByText('₫8,340,000')).toBeInTheDocument();
  });

  it('starts empty when the saved Cart is unreadable', async () => {
    localStorage.setItem(STORAGE_KEY, '{not json');
    renderApp('/');

    expect(screen.getByRole('button', { name: 'Cart, 0 items' })).toBeInTheDocument();
    expect(within(openMiniCart()).getByText('Your cart is empty.')).toBeInTheDocument();
  });

  it('offers no add button on Out of Stock cards', async () => {
    renderApp('/');

    const c200 = await findCard('Fujifilm C200');
    expect(within(c200).queryByRole('button', { name: 'Add to cart' })).not.toBeInTheDocument();
    expect(within(await findCard('Kodak Portra 400')).getByRole('button', { name: 'Add to cart' })).toBeInTheDocument();
  });

  it('tells screen reader users which product each add button is for', async () => {
    renderApp('/');

    const portra = await findCard('Kodak Portra 400');
    expect(within(portra).getByRole('button', { name: 'Add to cart' })).toHaveAccessibleDescription('Kodak Portra 400');
  });
});
