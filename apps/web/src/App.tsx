import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { Route, Routes } from 'react-router';
import { CartProvider } from './cart/cart-context';
import { HomePage } from './homepage/HomePage';
import { SiteLayout } from './layout/SiteLayout';
import {
  ASSISTANT_PATH,
  CHECKOUT_PATH,
  LOGIN_PATH,
  PORTFOLIO_PATH,
  productPath,
  PRODUCTS_PATH,
  RETURN_POLICY_PATH,
  SEARCH_PATH,
  SHIPPING_POLICY_PATH,
} from './lib/routes';
import {
  LoginPlaceholderPage,
  PlaceholderPage,
  ProductPlaceholderPage,
  SearchResultsPlaceholderPage,
} from './placeholders/PlaceholderPage';
import { ProductsPage } from './products/ProductsPage';
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
        <Route path={PRODUCTS_PATH} element={<ProductsPage />} />
        <Route path={productPath(':slug')} element={<ProductPlaceholderPage />} />
        <Route path={SEARCH_PATH} element={<SearchResultsPlaceholderPage />} />
        <Route path={LOGIN_PATH} element={<LoginPlaceholderPage />} />
        <Route path={CHECKOUT_PATH} element={<PlaceholderPage title="Checkout" />} />
        <Route path={SHIPPING_POLICY_PATH} element={<PlaceholderPage title="Shipping policy" />} />
        <Route path={RETURN_POLICY_PATH} element={<PlaceholderPage title="Returns policy" />} />
        <Route path={PORTFOLIO_PATH} element={<PlaceholderPage title="Portfolio" />} />
        <Route path={ASSISTANT_PATH} element={<PlaceholderPage title="AI assistant" />} />
      </Route>
    </Routes>
  );
}
