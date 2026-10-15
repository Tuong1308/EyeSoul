import { useId, useState } from 'react';
import { useSession } from './session-context';

/** Development-only switch for the stub session, until real Auth replaces it (ADR-0002). */
export function StubSessionPanel() {
  const { session, signIn, signOut } = useSession();
  const [displayName, setDisplayName] = useState('');
  const titleId = useId();

  return (
    <form
      aria-labelledby={titleId}
      onSubmit={(event) => {
        event.preventDefault();
        signIn(displayName);
      }}
      className="mt-8 max-w-sm rounded-xl2 border border-dashed border-ink/40 bg-card p-5"
    >
      <h2 id={titleId} className="text-xs font-semibold uppercase tracking-widest text-ink/60">
        Stub session (development only)
      </h2>
      {session.status === 'signed-in' ? (
        <div className="mt-3 flex items-center justify-between gap-4 text-sm">
          <p>
            Signed in as <strong>{session.displayName}</strong>
          </p>
          <button type="button" onClick={signOut} className="font-medium underline underline-offset-4">
            Log out
          </button>
        </div>
      ) : (
        <div className="mt-3 flex gap-2">
          <label className="flex-1">
            <span className="sr-only">Display name</span>
            <input
              required
              value={displayName}
              onChange={(event) => setDisplayName(event.target.value)}
              placeholder="Display name"
              className="w-full rounded-full border border-line bg-paper px-4 py-2 text-sm"
            />
          </label>
          <button type="submit" className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-paper hover:bg-ink/85">
            Log in (stub)
          </button>
        </div>
      )}
    </form>
  );
}
