import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { Route, Routes } from 'react-router';
import { HomePage } from './homepage/HomePage';
import { PRODUCT_TYPES, productPath } from './lib/routes';
import { PlaceholderPage, ProductPlaceholderPage } from './placeholders/PlaceholderPage';

export function AppProviders({ queryClient, children }: { queryClient: QueryClient; children: ReactNode }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {Object.values(PRODUCT_TYPES).map(({ label, path }) => (
        <Route key={path} path={path} element={<PlaceholderPage title={label} />} />
      ))}
      <Route path={productPath(':slug')} element={<ProductPlaceholderPage />} />
    </Routes>
  );
}
