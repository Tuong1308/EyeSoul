import type { ProductCard } from '@eyesoul/shared';
import { fireEvent, screen, waitFor, within } from '@testing-library/react';
import { delay, http, HttpResponse } from 'msw';
import { card, serveHomepage } from './test/homepage-fixture';
import { renderApp } from './test/render-app';
import { server } from './test/server';

const catalog: ProductCard[] = [
  card({ productType: 'DIGITAL_CAMERA', name: 'Fujifilm X100VI', priceVnd: 45_990_000 }),
  card({ productType: 'FILM_CAMERA', name: 'Fujica ST801', priceVnd: 3_200_000, conditionGrade: 'B' }),
  card({ productType: 'FILM_ROLL', name: 'Fujifilm C200', priceVnd: 165_000 }),
  card({ productType: 'FILM_ROLL', name: 'Kodak Portra 400', priceVnd: 420_000 }),
];

/** Stands in for the API: case-insensitive name match, from 2 characters. `slowAnswers` delays chosen queries (ms). */
function serveSuggestions(slowAnswers: Record<string, number> = {}) {
  server.use(
    http.get('http://api.test/search/suggestions', async ({ request }) => {
      const q = new URL(request.url).searchParams.get('q') ?? '';
      if (slowAnswers[q]) await delay(slowAnswers[q]);
      const term = q.trim().toLowerCase();
      const products = term.length < 2 ? [] : catalog.filter((p) => p.name.toLowerCase().includes(term));
      return HttpResponse.json({ products });
    }),
  );
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function searchBox() {
  return screen.getByRole('combobox', { name: 'Tìm sản phẩm' });
}

function type(text: string) {
  fireEvent.change(searchBox(), { target: { value: text } });
}

describe('Header search', () => {
  beforeEach(serveHomepage);

  it('shows suggestions from 2 characters, each with its Product Photo, name, Product Type and price', async () => {
    serveSuggestions();
    renderApp('/');

    type('f');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    expect(searchBox()).toHaveAttribute('aria-expanded', 'false');

    type('fu');
    const listbox = await screen.findByRole('listbox', { name: 'Gợi ý tìm kiếm' });
    expect(searchBox()).toHaveAttribute('aria-expanded', 'true');

    const options = within(listbox).getAllByRole('option');
    expect(options.map((o) => within(o).getByText(/^Fuji/).textContent)).toEqual([
      'Fujifilm X100VI',
      'Fujica ST801',
      'Fujifilm C200',
    ]);
    const fujica = within(listbox).getByRole('option', { name: /Fujica ST801/ });
    expect(within(fujica).getByRole('img', { name: 'Fujica ST801' })).toHaveAttribute(
      'src',
      'https://img.test/Fujica%20ST801.jpg',
    );
    expect(within(fujica).getByText('Máy ảnh film')).toBeInTheDocument();
    expect(within(fujica).getByText('3.200.000 ₫')).toBeInTheDocument();
  });

  it('never shows results for an older query, even when they arrive last', async () => {
    // "fu" answers well after "fujica", which the shopper types while "fu" is still on its way.
    serveSuggestions({ fu: 400 });
    renderApp('/');

    type('fu');
    await wait(250);
    expect(screen.getByText('Đang tìm…')).toBeInTheDocument();
    type('fujica');
    const listbox = await screen.findByRole('listbox', { name: 'Gợi ý tìm kiếm' });

    await wait(400);

    expect(within(listbox).getAllByRole('option')).toHaveLength(1);
    expect(within(listbox).getByRole('option', { name: /Fujica ST801/ })).toBeInTheDocument();
  });

  it('says so when nothing matches', async () => {
    serveSuggestions();
    renderApp('/');

    type('leica');

    expect(await screen.findByText('Không tìm thấy sản phẩm nào cho “leica”.')).toBeInTheDocument();
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  function press(key: string) {
    fireEvent.keyDown(searchBox(), { key });
  }

  function highlighted() {
    const id = searchBox().getAttribute('aria-activedescendant');
    return id ? document.getElementById(id) : null;
  }

  it('moves through suggestions with the arrow keys and opens the highlighted one with Enter', async () => {
    serveSuggestions();
    renderApp('/');

    type('fuji');
    const listbox = await screen.findByRole('listbox', { name: 'Gợi ý tìm kiếm' });
    const [x100vi, fujica, c200] = within(listbox).getAllByRole('option');
    expect(highlighted()).toBeNull();

    press('ArrowDown');
    expect(highlighted()).toBe(x100vi);
    expect(x100vi).toHaveAttribute('aria-selected', 'true');
    press('ArrowDown');
    press('ArrowDown');
    expect(highlighted()).toBe(c200);
    press('ArrowUp');
    expect(highlighted()).toBe(fujica);
    expect(x100vi).toHaveAttribute('aria-selected', 'false');

    press('Enter');

    expect(await screen.findByRole('heading', { level: 1, name: 'Sản phẩm' })).toBeInTheDocument();
    expect(screen.getByText('fujica-st801')).toBeInTheDocument();
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('starts each new set of suggestions with nothing highlighted, even one seen before', async () => {
    serveSuggestions();
    renderApp('/');

    type('fuji');
    await screen.findByRole('option', { name: /Fujica ST801/ });
    press('ArrowDown');
    press('ArrowDown');
    type('fujic');
    await screen.findByRole('listbox', { name: 'Gợi ý tìm kiếm' });
    await waitFor(() => expect(screen.getAllByRole('option')).toHaveLength(1));
    type('fuji');
    await waitFor(() => expect(screen.getAllByRole('option')).toHaveLength(3));

    expect(highlighted()).toBeNull();
    press('Enter');
    expect(await screen.findByRole('heading', { level: 1, name: 'Kết quả tìm kiếm' })).toBeInTheDocument();
  });

  it('ignores the Enter that confirms an IME composition', async () => {
    serveSuggestions();
    renderApp('/');

    type('fuji');
    await screen.findByRole('listbox', { name: 'Gợi ý tìm kiếm' });
    fireEvent.keyDown(searchBox(), { key: 'Enter', isComposing: true });

    expect(screen.queryByRole('heading', { level: 1, name: 'Kết quả tìm kiếm' })).not.toBeInTheDocument();
    expect(screen.getByRole('listbox', { name: 'Gợi ý tìm kiếm' })).toBeInTheDocument();
  });

  it('announces how many suggestions there are', async () => {
    serveSuggestions();
    renderApp('/');

    type('fuji');

    expect(await screen.findByText('3 gợi ý')).toBeInTheDocument();
    type('leica');
    expect(await screen.findByText('Không có gợi ý')).toBeInTheDocument();
  });

  it('closes the suggestions with Escape', async () => {
    serveSuggestions();
    renderApp('/');

    type('fuji');
    await screen.findByRole('listbox', { name: 'Gợi ý tìm kiếm' });
    press('Escape');

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    expect(searchBox()).toHaveAttribute('aria-expanded', 'false');
    expect(searchBox()).toHaveValue('fuji');
  });

  it('opens a suggestion when it is clicked', async () => {
    serveSuggestions();
    renderApp('/');

    type('portra');
    const listbox = await screen.findByRole('listbox', { name: 'Gợi ý tìm kiếm' });
    fireEvent.click(within(listbox).getByRole('option', { name: /Kodak Portra 400/ }));

    expect(await screen.findByText('kodak-portra-400')).toBeInTheDocument();
  });

  it('goes to the search results page for the query on Enter with no suggestion highlighted', async () => {
    serveSuggestions();
    renderApp('/');

    type('  fuji 400 ');
    press('Enter');

    expect(await screen.findByRole('heading', { level: 1, name: 'Kết quả tìm kiếm' })).toBeInTheDocument();
    expect(screen.getByText('“fuji 400”')).toBeInTheDocument();
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });
});
