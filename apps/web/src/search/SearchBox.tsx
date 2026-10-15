import type { ProductCard } from '@eyesoul/shared';
import { useId, useLayoutEffect, useRef, useState, type KeyboardEvent } from 'react';
import { useNavigate } from 'react-router';
import { formatVnd } from '../lib/format-vnd';
import { PRODUCT_TYPES, productPath, searchPath } from '../lib/routes';
import { MIN_QUERY_LENGTH, useSearchSuggestions, type SuggestionsState } from './use-search-suggestions';

/** The header search box: a combobox with instant suggestions, following the ARIA combobox pattern. */
export function SearchBox() {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [open, setOpen] = useState(false);
  // Reset on every edit, so a fresh set of suggestions always starts with nothing highlighted.
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const term = input.trim();
  const suggestions = useSearchSuggestions(term);
  const products = suggestions.status === 'success' ? suggestions.products : [];
  const listboxId = useId();
  const optionId = (index: number) => `${listboxId}-${index}`;

  const expanded = open && term.length >= MIN_QUERY_LENGTH;
  const showsListbox = expanded && products.length > 0;
  const highlighted = showsListbox ? products[highlightedIndex] : undefined;

  // While the next suggestions load, the panel keeps the height it last had, so it doesn't jump on every keystroke.
  const panelRef = useRef<HTMLDivElement>(null);
  const lastPanelHeight = useRef(0);
  useLayoutEffect(() => {
    if (suggestions.status !== 'loading' && panelRef.current) lastPanelHeight.current = panelRef.current.offsetHeight;
  });

  function openProduct(product: ProductCard) {
    setOpen(false);
    setInput('');
    navigate(productPath(product.slug));
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowUp': {
        event.preventDefault();
        setOpen(true);
        if (!showsListbox) return;
        // Cycles through the options and back round to the box itself (-1).
        const positions = products.length + 1;
        const step = event.key === 'ArrowDown' ? 1 : -1;
        setHighlightedIndex(((highlightedIndex + 1 + step + positions) % positions) - 1);
        return;
      }
      case 'Enter': {
        // Enter that confirms an IME composition (e.g. Vietnamese Telex) is not a search.
        if (event.nativeEvent.isComposing) return;
        event.preventDefault();
        if (highlighted) openProduct(highlighted);
        else if (term) {
          setOpen(false);
          navigate(searchPath(term));
        }
        return;
      }
      case 'Escape':
        if (expanded) {
          // This Escape belongs to the search box, not to other header menus listening on the document.
          event.stopPropagation();
          setOpen(false);
        }
        return;
    }
  }

  return (
    <div role="search" className="relative">
      <SearchIcon />
      <input
        type="text"
        role="combobox"
        aria-label="Tìm sản phẩm"
        aria-autocomplete="list"
        aria-expanded={expanded}
        aria-controls={showsListbox ? listboxId : undefined}
        aria-activedescendant={highlighted ? optionId(highlightedIndex) : undefined}
        autoComplete="off"
        enterKeyHint="search"
        placeholder="Tìm máy ảnh, cuộn film…"
        value={input}
        onChange={(event) => {
          setInput(event.target.value);
          setHighlightedIndex(-1);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onKeyDown={onKeyDown}
        className="h-11 w-full min-w-0 rounded-full border border-line bg-card pl-10 pr-4 text-sm placeholder:text-ink/50 focus:border-ink focus:outline-none"
      />
      {/* Always mounted, so screen readers announce each change. */}
      <p role="status" className="sr-only">
        {expanded ? announcement(suggestions) : ''}
      </p>
      {expanded && (
        <div
          ref={panelRef}
          // Keeps focus in the box while an option is clicked.
          onMouseDown={(event) => event.preventDefault()}
          style={suggestions.status === 'loading' ? { minHeight: lastPanelHeight.current } : undefined}
          className="absolute inset-x-0 top-full z-10 mt-2 overflow-hidden rounded-xl2 border border-line bg-card shadow-soft"
        >
          {showsListbox ? (
            <ul id={listboxId} role="listbox" aria-label="Gợi ý tìm kiếm" className="max-h-[70vh] overflow-y-auto py-2">
              {products.map((product, index) => (
                <li
                  key={product.id}
                  id={optionId(index)}
                  role="option"
                  aria-selected={index === highlightedIndex}
                  onClick={() => openProduct(product)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  className={`flex cursor-pointer items-center gap-3 px-4 py-2 ${index === highlightedIndex ? 'bg-line/60' : ''}`}
                >
                  <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-line">
                    {product.photo && <img src={product.photo.url} alt={product.photo.alt} className="h-full w-full object-cover" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{product.name}</p>
                    <p className="text-xs text-ink/60">{PRODUCT_TYPES[product.productType].label}</p>
                  </div>
                  <p className="shrink-0 font-serif text-sm font-bold">{formatVnd(product.priceVnd)}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-4 py-3 text-sm text-ink/70">{panelMessage(suggestions, term)}</p>
          )}
        </div>
      )}
    </div>
  );
}

function panelMessage(suggestions: SuggestionsState, term: string) {
  switch (suggestions.status) {
    case 'success':
      return `Không tìm thấy sản phẩm nào cho “${term}”.`;
    case 'error':
      return 'Không tải được gợi ý. Nhấn Enter để xem kết quả tìm kiếm.';
    default:
      return 'Đang tìm…';
  }
}

function announcement(suggestions: SuggestionsState) {
  switch (suggestions.status) {
    case 'success':
      return suggestions.products.length ? `${suggestions.products.length} gợi ý` : 'Không có gợi ý';
    case 'error':
      return 'Không tải được gợi ý';
    default:
      return '';
  }
}

function SearchIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-ink/60"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    >
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </svg>
  );
}
