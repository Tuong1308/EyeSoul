import type { ProductCard } from '@eyesoul/shared';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { api } from '../api/client';

/** Shorter queries get no suggestions; the API applies the same rule. */
export const MIN_QUERY_LENGTH = 2;

const DEBOUNCE_MS = 200;

function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(timer);
  }, [value, delayMs]);
  return debounced;
}

export type SuggestionsState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'success'; products: ProductCard[] };

/**
 * Suggestions for exactly `term` (already trimmed). Typing is debounced, and results are only ever
 * reported for the term currently typed: an answer for an older query never shows, even if it arrives last.
 */
export function useSearchSuggestions(term: string): SuggestionsState {
  const debounced = useDebouncedValue(term, DEBOUNCE_MS);
  const query = useQuery({
    queryKey: ['search-suggestions', debounced],
    queryFn: () => api.searchSuggestions(debounced),
    enabled: debounced.length >= MIN_QUERY_LENGTH,
    staleTime: 60_000,
  });

  if (term.length < MIN_QUERY_LENGTH) return { status: 'idle' };
  if (debounced !== term || query.isPending) return { status: 'loading' };
  if (query.isError) return { status: 'error' };
  return { status: 'success', products: query.data.products };
}
