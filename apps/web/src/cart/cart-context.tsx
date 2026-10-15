import { createContext, useContext, useEffect, useState, useSyncExternalStore, type ReactNode } from 'react';
import { browserStorage } from '../lib/browser-storage';
import { createCartStore, lineTotalVnd, STORAGE_KEY, type CartStore } from './cart-store';

const CartContext = createContext<CartStore | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [store] = useState(() => createCartStore(browserStorage()));

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY || event.key === null) store.reload();
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [store]);

  return <CartContext.Provider value={store}>{children}</CartContext.Provider>;
}

export function useCart() {
  const store = useContext(CartContext);
  if (!store) throw new Error('useCart must be used inside CartProvider');
  const lines = useSyncExternalStore(store.subscribe, store.getLines);
  return {
    lines,
    count: lines.reduce((sum, line) => sum + line.quantity, 0),
    subtotalVnd: lines.reduce((sum, line) => sum + lineTotalVnd(line), 0),
    add: store.add,
    setQuantity: store.setQuantity,
    remove: store.remove,
  };
}
