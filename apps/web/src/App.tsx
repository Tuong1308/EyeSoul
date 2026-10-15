import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { Route, Routes } from 'react-router';
import { CartProvider } from './cart/cart-context';
import { HomePage } from './homepage/HomePage';
import { SiteLayout } from './layout/SiteLayout';
import { CHECKOUT_PATH, LOGIN_PATH, PRODUCT_TYPES, productPath, SEARCH_PATH } from './lib/routes';
import {
  LoginPlaceholderPage,
  PlaceholderPage,
  ProductPlaceholderPage,
  SearchResultsPlaceholderPage,
} from './placeholders/PlaceholderPage';
import { SessionProvider } from './session/session-context';

export function AppProviders({ queryClient, children }: { queryClient: QueryClient; children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <CartProvider>{children}</CartProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<HomePage />} />
        {Object.values(PRODUCT_TYPES).map(({ label, path }) => (
          <Route key={path} path={path} element={<PlaceholderPage title={label} />} />
        ))}
        <Route path={productPath(':slug')} element={<ProductPlaceholderPage />} />
        <Route path={SEARCH_PATH} element={<SearchResultsPlaceholderPage />} />
        <Route path={LOGIN_PATH} element={<LoginPlaceholderPage />} />
        <Route path={CHECKOUT_PATH} element={<PlaceholderPage title="Thanh toán" />} />
      </Route>
    </Routes>
  );
}
