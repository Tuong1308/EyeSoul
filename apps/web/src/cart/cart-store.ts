import type { ProductCard, ProductType } from '@eyesoul/shared';

/** One product in the Cart, with a snapshot of its card data taken when it was added. */
export interface CartLine extends Pick<ProductCard, 'slug' | 'productType' | 'name' | 'priceVnd' | 'photo'> {
  productId: string;
  quantity: number;
}

/** A Film Camera is a unique unit: its quantity in a Cart is always exactly 1. */
export const isUniqueUnit = (productType: ProductType) => productType === 'FILM_CAMERA';

export const lineTotalVnd = (line: CartLine) => line.priceVnd * line.quantity;

/** Whether the product can go into a Cart holding these lines. */
export function canAdd(lines: CartLine[], product: ProductCard): boolean {
  if (product.availability === 'out_of_stock') return false;
  return !(isUniqueUnit(product.productType) && lines.some((line) => line.productId === product.id));
}

export const STORAGE_KEY = 'eyesoul.cart';

const PRODUCT_TYPE_VALUES: readonly unknown[] = ['DIGITAL_CAMERA', 'FILM_CAMERA', 'FILM_ROLL'] satisfies ProductType[];

function isCartLine(value: unknown): value is CartLine {
  if (typeof value !== 'object' || value === null) return false;
  const line = value as Record<string, unknown>;
  return (
    typeof line.productId === 'string' &&
    typeof line.slug === 'string' &&
    PRODUCT_TYPE_VALUES.includes(line.productType) &&
    typeof line.name === 'string' &&
    typeof line.priceVnd === 'number' &&
    typeof line.photo === 'object' && // a photo object, or null
    typeof line.quantity === 'number' &&
    line.quantity >= 1
  );
}

/** Reads the saved Cart, dropping anything that isn't a well-formed line and re-applying the Film Camera cap. */
function load(storage: Storage | undefined): CartLine[] {
  try {
    const saved: unknown = JSON.parse(storage?.getItem(STORAGE_KEY) ?? '[]');
    if (!Array.isArray(saved)) return [];
    return saved.filter(isCartLine).map((line) => (isUniqueUnit(line.productType) ? { ...line, quantity: 1 } : line));
  } catch {
    return [];
  }
}

function save(storage: Storage | undefined, lines: CartLine[]) {
  try {
    storage?.setItem(STORAGE_KEY, JSON.stringify(lines));
  } catch {
    // Storage full or blocked: the Cart still works for this visit.
  }
}

export type CartStore = ReturnType<typeof createCartStore>;

/** The guest Cart, persisted to `storage`. The header badge and the mini-cart read only from here. */
export function createCartStore(storage: Storage | undefined) {
  let lines = load(storage);
  const listeners = new Set<() => void>();

  function publish(next: CartLine[]) {
    lines = next;
    listeners.forEach((listener) => listener());
  }

  function commit(next: CartLine[]) {
    save(storage, next);
    publish(next);
  }

  return {
    getLines: () => lines,
    subscribe(listener: () => void) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    /** Picks up a Cart saved by another tab, so this tab doesn't overwrite it with stale lines. */
    reload() {
      publish(load(storage));
    },
    add(product: ProductCard) {
      if (!canAdd(lines, product)) return;
      const existing = lines.find((line) => line.productId === product.id);
      commit(
        existing
          ? lines.map((line) => (line === existing ? { ...line, quantity: line.quantity + 1 } : line))
          : [
              ...lines,
              {
                productId: product.id,
                slug: product.slug,
                productType: product.productType,
                name: product.name,
                priceVnd: product.priceVnd,
                photo: product.photo,
                quantity: 1,
              },
            ],
      );
    },
    /** Quantities stay at 1 or more; a Film Camera's stays at exactly 1. */
    setQuantity(productId: string, quantity: number) {
      commit(
        lines.map((line) =>
          line.productId === productId && !isUniqueUnit(line.productType)
            ? { ...line, quantity: Math.max(1, Math.floor(quantity)) }
            : line,
        ),
      );
    },
    remove(productId: string) {
      commit(lines.filter((line) => line.productId !== productId));
    },
  };
}
