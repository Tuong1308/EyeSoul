import { useEffect, useId, useRef, type ReactNode } from 'react';
import { Link } from 'react-router';
import { formatVnd } from '../lib/format-vnd';
import { CHECKOUT_PATH, productPath } from '../lib/routes';
import { useCart } from './cart-context';
import { isUniqueUnit, lineTotalVnd, type CartLine } from './cart-store';

/**
 * The slide-out Cart drawer opened from the header. Render it outside the header: a `fixed`
 * element inside an ancestor with a filter or transform is sized to that ancestor, not the viewport.
 */
export function MiniCart({ onClose }: { onClose: () => void }) {
  const { lines, subtotalVnd } = useCart();
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = overflow;
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50">
      <div aria-hidden className="absolute inset-0 bg-ink/40" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-paper shadow-soft"
      >
        <div className="flex items-center justify-between border-b border-ink px-6 py-5">
          <h2 id={titleId} className="font-serif text-3xl">
            Giỏ hàng
          </h2>
          <button
            ref={closeRef}
            type="button"
            aria-label="Đóng giỏ hàng"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full text-2xl leading-none hover:bg-line/60"
          >
            ×
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="font-serif text-xl italic">Giỏ hàng của bạn đang trống.</p>
            <Link
              to="/"
              onClick={onClose}
              className="text-sm font-medium underline decoration-amber decoration-2 underline-offset-4"
            >
              Tiếp tục mua sắm
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-line overflow-y-auto px-6">
              {lines.map((line) => (
                <CartLineItem key={line.productId} line={line} onNavigate={onClose} />
              ))}
            </ul>

            <div className="border-t border-line px-6 py-5">
              <dl className="flex items-baseline justify-between">
                <dt className="text-sm font-medium">Tạm tính</dt>
                <dd className="font-serif text-2xl font-bold">{formatVnd(subtotalVnd)}</dd>
              </dl>
              <Link
                to={CHECKOUT_PATH}
                onClick={onClose}
                className="mt-4 block rounded-full bg-ink py-3 text-center text-sm font-semibold text-paper transition hover:bg-ink/85"
              >
                Thanh toán
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function CartLineItem({ line, onNavigate }: { line: CartLine; onNavigate: () => void }) {
  const { setQuantity, remove } = useCart();
  return (
    <li aria-label={line.name} className="flex gap-4 py-4">
      <div className="grain h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-line">
        {line.photo && <img src={line.photo.url} alt={line.photo.alt} className="h-full w-full object-cover" />}
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <Link to={productPath(line.slug)} onClick={onNavigate} className="text-sm font-medium leading-snug hover:underline">
          {line.name}
        </Link>
        <p className="text-xs text-ink/60">Đơn giá {formatVnd(line.priceVnd)}</p>
        {isUniqueUnit(line.productType) ? (
          <p className="mt-auto text-sm">Số lượng: 1</p>
        ) : (
          <div role="group" aria-label="Số lượng" className="mt-auto flex items-center gap-2 text-sm">
            <StepButton label="Giảm số lượng" disabled={line.quantity <= 1} onClick={() => setQuantity(line.productId, line.quantity - 1)}>
              −
            </StepButton>
            <span className="min-w-6 text-center font-medium">{line.quantity}</span>
            <StepButton label="Tăng số lượng" onClick={() => setQuantity(line.productId, line.quantity + 1)}>
              +
            </StepButton>
          </div>
        )}
      </div>
      <div className="flex shrink-0 flex-col items-end justify-between">
        <p className="font-serif text-base font-bold">{formatVnd(lineTotalVnd(line))}</p>
        <button
          type="button"
          aria-label={`Xóa ${line.name} khỏi giỏ`}
          onClick={() => remove(line.productId)}
          className="text-xs text-ink/60 underline underline-offset-4 hover:text-ink"
        >
          Xóa
        </button>
      </div>
    </li>
  );
}

function StepButton({ label, disabled, onClick, children }: { label: string; disabled?: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="flex h-7 w-7 items-center justify-center rounded-full border border-line text-base leading-none hover:border-ink disabled:opacity-40 disabled:hover:border-line"
    >
      {children}
    </button>
  );
}
