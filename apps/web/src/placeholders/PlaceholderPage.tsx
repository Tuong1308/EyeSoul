import type { ReactNode } from 'react';
import { Link, useParams } from 'react-router';
import { StubSessionPanel } from '../session/StubSessionPanel';

/** Stands in for a page that a later feature will build. */
export function PlaceholderPage({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <main className="mx-auto max-w-6xl px-4 py-24 md:px-8">
      <h1 className="font-serif text-4xl md:text-6xl">{title}</h1>
      {children}
      <p className="mt-6 text-sm text-ink/70">Trang này đang được xây dựng.</p>
      <Link to="/" className="mt-4 inline-block text-sm font-medium underline underline-offset-4">
        Về trang chủ
      </Link>
    </main>
  );
}

export function ProductPlaceholderPage() {
  const { slug } = useParams();
  return (
    <PlaceholderPage title="Sản phẩm">
      <p className="mt-4 font-mono text-sm">{slug}</p>
    </PlaceholderPage>
  );
}

export function LoginPlaceholderPage() {
  return <PlaceholderPage title="Đăng nhập">{import.meta.env.DEV && <StubSessionPanel />}</PlaceholderPage>;
}
