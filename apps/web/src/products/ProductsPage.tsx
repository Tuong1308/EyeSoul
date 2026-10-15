import { Link, useSearchParams } from 'react-router';
import { LoadError } from '../components/LoadError';
import { useHomepage } from '../homepage/use-homepage';
import { PRODUCT_TYPE_ENTRIES, PRODUCTS_PATH, productTypeFromParam } from '../lib/routes';
import { FeaturedRow } from './FeaturedRow';
import { FeaturedRowsSkeleton } from './FeaturedRowsSkeleton';

const TABS = [
  { label: 'All', path: PRODUCTS_PATH, type: null },
  ...PRODUCT_TYPE_ENTRIES.map(([type, { label, path }]) => ({ label, path, type })),
];

/**
 * Stands in for the Products page until it is built: the homepage response's Featured Product rows, narrowed to
 * one Product Type by `?type=`. An unknown `?type=` shows them all.
 */
export function ProductsPage() {
  const [params] = useSearchParams();
  const selected = productTypeFromParam(params.get('type'));
  const { data, isPending, isError, isFetching, refetch } = useHomepage();
  // Only a load with nothing to show is an error; a failed background refetch keeps the data on screen.
  const failed = isError && !data;
  const rows = data?.rows.filter((row) => !selected || row.productType === selected);

  return (
    <main className="pb-24">
      <div className="frame pt-12 md:pt-16">
        <h1 className="font-serif text-5xl leading-[.95] md:text-7xl">
          Our <em className="font-medium">products</em>
        </h1>
        <nav aria-label="Product types" className="-mx-4 mt-8 overflow-x-auto px-4 md:mx-0 md:px-0">
          <ul className="flex gap-2">
            {TABS.map(({ label, path, type }) => {
              const current = type === selected;
              return (
                <li key={path} className="shrink-0">
                  <Link
                    to={path}
                    aria-current={current ? 'page' : undefined}
                    className={`press block rounded-full border px-4 py-2 text-sm font-medium transition ${current ? 'border-ink bg-ink text-paper' : 'border-line hover:border-ink'}`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        {isPending && <FeaturedRowsSkeleton rows={selected ? 1 : PRODUCT_TYPE_ENTRIES.length} />}
        {failed && <LoadError subject="products" retrying={isFetching} onRetry={() => void refetch()} />}
        {rows?.length === 0 && <p className="mt-16 text-sm text-ink/70">Nothing to show here yet. Check back soon.</p>}
      </div>
      {rows?.map((row) => <FeaturedRow key={row.productType} row={row} />)}
    </main>
  );
}
