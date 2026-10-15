interface LoadErrorProps {
  /** What couldn't load, e.g. "products" or "photos". */
  subject: string;
  retrying: boolean;
  onRetry: () => void;
  /** Set on a dark band, e.g. the Sample Photos. */
  onDark?: boolean;
}

/**
 * Takes the place of a section whose data can't load.
 * It stays up while a retry runs, so the focused "Try again" button isn't pulled out from under the shopper.
 */
export function LoadError({ subject, retrying, onRetry, onDark = false }: LoadErrorProps) {
  return (
    <div role="alert" className={`mt-16 border-t pt-6 ${onDark ? 'border-paper/30' : 'border-ink'}`}>
      <p className="text-[11px] font-semibold uppercase tracking-[.2em] text-amber">Something went wrong</p>
      <h2 className="mt-2 font-serif text-4xl leading-[.95] md:text-6xl">
        Couldn’t load the <em className="font-medium">{subject}</em>
      </h2>
      <p className={`mt-4 max-w-md text-sm ${onDark ? 'text-paper/70' : 'text-ink/70'}`}>
        Your connection may be patchy, or the shop is busy. Give it a moment and try again.
      </p>
      <button
        type="button"
        aria-disabled={retrying}
        onClick={() => {
          if (!retrying) onRetry();
        }}
        className={`mt-6 rounded-full px-6 py-3 text-sm font-semibold transition ${onDark ? 'bg-paper text-ink hover:bg-amber' : 'bg-ink text-paper hover:bg-ink/85'} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber aria-disabled:cursor-wait aria-disabled:opacity-60`}
      >
        {retrying ? 'Retrying…' : 'Try again'}
      </button>
    </div>
  );
}
