import { fireEvent, screen, within } from '@testing-library/react';
import { serveHomepage } from './test/homepage-fixture';
import { renderApp } from './test/render-app';

describe('Homepage', () => {
  beforeEach(serveHomepage);

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

  it('shows a Condition Grade badge on Film Camera cards only', async () => {
    renderApp('/');

    const film = await screen.findByRole('region', { name: 'Máy ảnh film' });
    const canon = within(film).getByRole('article', { name: 'Canon AE-1 Program' });
    const pentax = within(film).getByRole('article', { name: 'Pentax K1000' });

    expect(within(canon).getByRole('img', { name: 'Tình trạng A+' })).toBeInTheDocument();
    expect(within(pentax).getByRole('img', { name: 'Tình trạng C' })).toBeInTheDocument();
    const digital = screen.getByRole('region', { name: 'Máy ảnh digital' });
    expect(within(digital).queryByRole('img', { name: /Tình trạng/ })).not.toBeInTheDocument();
  });

  it('labels Out of Stock cards "Hết hàng" and still shows them', async () => {
    renderApp('/');

    const rolls = await screen.findByRole('region', { name: 'Cuộn film' });
    const c200 = within(rolls).getByRole('article', { name: 'Fujifilm C200' });
    const portra = within(rolls).getByRole('article', { name: 'Kodak Portra 400' });

    expect(within(c200).getByText('Hết hàng')).toBeInTheDocument();
    expect(within(c200).getByText('165.000 ₫')).toBeInTheDocument();
    expect(within(portra).queryByText('Hết hàng')).not.toBeInTheDocument();
  });

  it('goes to the product page when a card is clicked', async () => {
    renderApp('/');

    const film = await screen.findByRole('region', { name: 'Máy ảnh film' });
    fireEvent.click(within(film).getByRole('link', { name: 'Canon AE-1 Program' }));

    expect(await screen.findByRole('heading', { name: 'Sản phẩm' })).toBeInTheDocument();
    expect(screen.getByText('canon-ae-1-program')).toBeInTheDocument();
  });

  it(`goes to the Product Type listing from a row's "Xem tất cả" link`,async () => {
    renderApp('/');

    const rolls = await screen.findByRole('region', { name: 'Cuộn film' });
    fireEvent.click(within(rolls).getByRole('link', { name: 'Xem tất cả' }));

    expect(await screen.findByRole('heading', { name: 'Cuộn film' })).toBeInTheDocument();
    expect(screen.queryByRole('region')).not.toBeInTheDocument();
  });
});
