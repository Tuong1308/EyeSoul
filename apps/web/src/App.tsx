import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { Route, Routes } from 'react-router';
import { CartProvider } from './cart/cart-context';
import { HomePage } from './homepage/HomePage';
import { SiteLayout } from './layout/SiteLayout';
import { CHECKOUT_PATH, PRODUCT_TYPES, productPath } from './lib/routes';
import { PlaceholderPage, ProductPlaceholderPage } from './placeholders/PlaceholderPage';

export function AppProviders({ queryClient, children }: { queryClient: QueryClient; children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>{children}</CartProvider>
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
        <Route path={CHECKOUT_PATH} element={<PlaceholderPage title="Thanh toán" />} />
      </Route>
    </Routes>
  );
}
