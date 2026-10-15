/** Who the shopper is, as far as the web app knows. */
export type Session = { status: 'signed-out' } | { status: 'signed-in'; displayName: string };

const SIGNED_OUT: Session = { status: 'signed-out' };

const STORAGE_KEY = 'eyesoul.stubSession';

function load(storage: Storage | undefined): Session {
  try {
    const saved: unknown = JSON.parse(storage?.getItem(STORAGE_KEY) ?? 'null');
    if (typeof saved === 'object' && saved !== null) {
      const { displayName } = saved as Record<string, unknown>;
      if (typeof displayName === 'string' && displayName.trim()) return { status: 'signed-in', displayName };
    }
  } catch {
    // Unreadable: fall through to signed out.
  }
  return SIGNED_OUT;
}

function save(storage: Storage | undefined, session: Session) {
  try {
    if (session.status === 'signed-in') storage?.setItem(STORAGE_KEY, JSON.stringify({ displayName: session.displayName }));
    else storage?.removeItem(STORAGE_KEY);
  } catch {
    // Storage full or blocked: the session still holds for this visit.
  }
}

export type SessionStore = ReturnType<typeof createStubSessionStore>;

/**
 * A stand-in session source until real Auth exists (ADR-0002). It starts signed out and is switched
 * by hand in development; `storage` keeps that choice across reloads. The header reads only from a
 * session source, so real Auth replaces this store without touching the header.
 */
export function createStubSessionStore(storage: Storage | undefined) {
  let session = load(storage);
  const listeners = new Set<() => void>();

  function commit(next: Session) {
    session = next;
    save(storage, next);
    listeners.forEach((listener) => listener());
  }

  return {
    getSession: () => session,
    subscribe(listener: () => void) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    signIn(displayName: string) {
      const name = displayName.trim();
      if (name) commit({ status: 'signed-in', displayName: name });
    },
    signOut() {
      commit(SIGNED_OUT);
    },
  };
}
