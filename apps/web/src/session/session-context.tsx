import { createContext, useContext, useState, useSyncExternalStore, type ReactNode } from 'react';
import { browserStorage } from '../lib/browser-storage';
import { createStubSessionStore, type SessionStore } from './session-store';

const SessionContext = createContext<SessionStore | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  // Only development keeps a stub session across reloads, so a production build always starts signed out.
  const [store] = useState(() => createStubSessionStore(import.meta.env.DEV ? browserStorage() : undefined));
  return <SessionContext.Provider value={store}>{children}</SessionContext.Provider>;
}

export function useSession() {
  const store = useContext(SessionContext);
  if (!store) throw new Error('useSession must be used inside SessionProvider');
  const session = useSyncExternalStore(store.subscribe, store.getSession);
  return { session, signIn: store.signIn, signOut: store.signOut };
}
