/**
 * Takes the place of the Featured Product rows and Sample Photos when the homepage data can't load.
 * It stays up while a retry runs, so the focused "Thử lại" button isn't pulled out from under the shopper.
 */
export function HomePageError({ retrying, onRetry }: { retrying: boolean; onRetry: () => void }) {
  return (
    <div role="alert" className="mt-16 border-t border-ink pt-6">
      <p className="text-[11px] font-semibold uppercase tracking-[.2em] text-amber">Có lỗi xảy ra</p>
      <h2 className="mt-2 font-serif text-4xl leading-[.95] md:text-6xl">
        Không tải được <em className="font-medium">sản phẩm</em>
      </h2>
      <p className="mt-4 max-w-md text-sm text-ink/70">
        Có thể kết nối mạng đang chập chờn hoặc cửa hàng đang bận. Bạn chờ một chút rồi thử lại nhé.
      </p>
      <button
        type="button"
        aria-disabled={retrying}
        onClick={() => {
          if (!retrying) onRetry();
        }}
        className="mt-6 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper transition hover:bg-ink/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber aria-disabled:cursor-wait aria-disabled:opacity-60"
      >
        {retrying ? 'Đang thử lại…' : 'Thử lại'}
      </button>
    </div>
  );
}
