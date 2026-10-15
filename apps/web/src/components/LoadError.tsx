interface LoadErrorProps {
  /** What couldn't load, e.g. "products" or "photos". */
  subject: string;
  retrying: boolean;
  onRetry: () => void;
}

/**
 * Takes the place of a section whose data can't load.
 * It stays up while a retry runs, so the focused "Try again" button isn't pulled out from under the shopper.
 */
export function LoadError({ subject, retrying, onRetry }: LoadErrorProps) {
  return (
    <div role="alert" className="mt-16 border-t border-ink pt-6">
      <p className="text-[11px] font-semibold uppercase tracking-[.2em] text-amber">Something went wrong</p>
      <h2 className="mt-2 font-serif text-4xl leading-[.95] md:text-6xl">
        Couldn’t load the <em className="font-medium">{subject}</em>
      </h2>
      <p className="mt-4 max-w-md text-sm text-ink/70">
        Your connection may be patchy, or the shop is busy. Give it a moment and try again.
      </p>
      <button
        type="button"
        aria-disabled={retrying}
        onClick={() => {
          if (!retrying) onRetry();
        }}
        className="mt-6 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper transition hover:bg-ink/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber aria-disabled:cursor-wait aria-disabled:opacity-60"
      >
        {retrying ? 'Retrying…' : 'Try again'}
      </button>
    </div>
  );
}
