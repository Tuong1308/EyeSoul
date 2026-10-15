import type { ReactNode } from 'react';
import { Link, useParams, useSearchParams } from 'react-router';
import { StubSessionPanel } from '../session/StubSessionPanel';

/** Stands in for a page that a later feature will build. */
export function PlaceholderPage({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <main className="frame py-24">
      <h1 className="font-serif text-4xl md:text-6xl">{title}</h1>
      {children}
      <p className="mt-6 text-sm text-ink/70">This page is under construction.</p>
      <Link to="/" className="link-slide mt-4 inline-block text-sm font-medium">
        Back to home
      </Link>
    </main>
  );
}

export function ProductPlaceholderPage() {
  const { slug } = useParams();
  return (
    <PlaceholderPage title="Product">
      <p className="mt-4 font-mono text-sm">{slug}</p>
    </PlaceholderPage>
  );
}

export function LoginPlaceholderPage() {
  return <PlaceholderPage title="Log in">{import.meta.env.DEV && <StubSessionPanel />}</PlaceholderPage>;
}

export function SearchResultsPlaceholderPage() {
  const [params] = useSearchParams();
  return (
    <PlaceholderPage title="Search results">
      <p className="mt-4 font-serif text-xl italic">“{params.get('q') ?? ''}”</p>
    </PlaceholderPage>
  );
}
