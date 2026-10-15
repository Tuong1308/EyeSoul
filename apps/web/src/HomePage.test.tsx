import { fireEvent, screen, within } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { homepage, serveHomepage } from './test/homepage-fixture';
import { renderApp } from './test/render-app';
import { server } from './test/server';

describe('Homepage', () => {
  beforeEach(serveHomepage);

  it.each([
    ['Máy ảnh digital', '/may-anh-digital'],
    ['Máy ảnh film', '/may-anh-film'],
    ['Cuộn film', '/cuon-film'],
  ])('leads from the hero\'s "%s" button to its Product Type listing', async (label, path) => {
    renderApp('/');

    const hero = screen.getByRole('region', { name: 'Giới thiệu Eye Soul' });
    const cta = within(hero).getByRole('link', { name: label });
    expect(cta).toHaveAttribute('href', path);
    fireEvent.click(cta);

    expect(await screen.findByRole('heading', { name: label })).toBeInTheDocument();
    expect(screen.queryByRole('region')).not.toBeInTheDocument();
  });

  it('shows a Featured Products row per Product Type with photos, names and VND prices', async () => {
    renderApp('/');

    const digital = await screen.findByRole('region', { name: 'Máy ảnh digital' });
    const film = screen.getByRole('region', { name: 'Máy ảnh film' });
    const rolls = screen.getByRole('region', { name: 'Cuộn film' });
    const samples = screen.getByRole('region', { name: 'Ảnh mẫu từ film' });
    const hero = screen.getByRole('region', { name: 'Giới thiệu Eye Soul' });

    const regions = screen.getAllByRole('region');
    expect(regions).toEqual([hero, digital, film, rolls, samples]);

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

  it('shows each Sample Photo labelled with the Film Roll it was shot on', async () => {
    renderApp('/');

    const samples = await screen.findByRole('region', { name: 'Ảnh mẫu từ film' });
    const portra = within(samples).getByRole('link', { name: /Kodak Portra 400/ });

    expect(within(portra).getByRole('img', { name: 'Phố cổ Hội An lúc hoàng hôn' })).toHaveAttribute(
      'src',
      'https://img.test/sample-portra.jpg',
    );
    expect(within(portra).getByText('Kodak Portra 400')).toBeInTheDocument();
    const hp5 = within(samples).getByRole('link', { name: /Ilford HP5 Plus 400/ });
    expect(within(hp5).getByText('Ilford HP5 Plus 400')).toBeInTheDocument();
  });

  it(`goes to the Film Roll's page when a Sample Photo is clicked`, async () => {
    renderApp('/');

    const samples = await screen.findByRole('region', { name: 'Ảnh mẫu từ film' });
    fireEvent.click(within(samples).getByRole('link', { name: /Ilford HP5 Plus 400/ }));

    expect(await screen.findByRole('heading', { name: 'Sản phẩm' })).toBeInTheDocument();
    expect(screen.getByText('ilford-hp5-plus-35mm-36')).toBeInTheDocument();
  });
});

describe('Homepage loading and errors', () => {
  it('holds the layout with placeholders while the homepage data loads', async () => {
    let respond!: () => void;
    const answered = new Promise<void>((resolve) => (respond = resolve));
    server.use(
      http.get('http://api.test/homepage', async () => {
        await answered;
        return HttpResponse.json(homepage);
      }),
    );
    renderApp('/');

    const loading = screen.getByRole('status', { name: 'Đang tải sản phẩm' });
    expect(loading).toHaveTextContent('Đang tải sản phẩm…');
    expect(screen.queryByRole('region', { name: 'Máy ảnh digital' })).not.toBeInTheDocument();

    respond();

    expect(await screen.findByRole('region', { name: 'Máy ảnh digital' })).toBeInTheDocument();
    expect(screen.queryByRole('status', { name: 'Đang tải sản phẩm' })).not.toBeInTheDocument();
  });

  it('shows a friendly error when the homepage data fails to load, and "Thử lại" loads it again', async () => {
    let failing = true;
    server.use(
      http.get('http://api.test/homepage', () =>
        failing ? new HttpResponse(null, { status: 500 }) : HttpResponse.json(homepage),
      ),
    );
    renderApp('/');

    const error = await screen.findByRole('alert');
    expect(error).toHaveTextContent('Không tải được sản phẩm');
    expect(screen.queryByRole('region', { name: 'Máy ảnh digital' })).not.toBeInTheDocument();

    failing = false;
    fireEvent.click(within(error).getByRole('button', { name: 'Thử lại' }));

    expect(await screen.findByRole('region', { name: 'Máy ảnh digital' })).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
