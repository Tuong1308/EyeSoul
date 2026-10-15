import { Link } from 'react-router';
import { RETURN_POLICY_PATH, SHIPPING_POLICY_PATH } from '../lib/routes';

// Contact details and social accounts are placeholders until the shop supplies real ones.
const SOCIAL_LINKS = [
  { network: 'Facebook', href: 'https://www.facebook.com/eyesoul.vn' },
  { network: 'Instagram', href: 'https://www.instagram.com/eyesoul.vn' },
  { network: 'TikTok', href: 'https://www.tiktok.com/@eyesoul.vn' },
];

export function Footer() {
  return (
    <footer className="mx-auto max-w-6xl px-4 pb-12 md:px-8">
      <div className="grid gap-10 border-t border-ink pt-8 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <Link to="/" aria-label="Eye Soul, về trang chủ" className="font-serif text-3xl font-bold">
            Eye <em className="font-medium">Soul</em>
          </Link>
          <p className="mt-3 max-w-xs text-sm text-ink/70">Máy ảnh digital, máy ảnh film đã qua tay và cuộn film.</p>
          <address className="mt-4 space-y-1 text-sm not-italic">
            <p>123 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh</p>
            <p>
              <a href="tel:+84909123456" className="hover:underline">
                0909 123 456
              </a>
            </p>
            <p>
              <a href="mailto:hello@eyesoul.vn" className="hover:underline">
                hello@eyesoul.vn
              </a>
            </p>
          </address>
        </div>
        <nav aria-label="Chính sách">
          <FooterHeading>Chính sách</FooterHeading>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link to={SHIPPING_POLICY_PATH} className="hover:underline">
                Chính sách vận chuyển
              </Link>
            </li>
            <li>
              <Link to={RETURN_POLICY_PATH} className="hover:underline">
                Chính sách đổi trả
              </Link>
            </li>
          </ul>
        </nav>
        <div>
          <FooterHeading>Theo dõi</FooterHeading>
          <ul className="mt-3 space-y-2 text-sm">
            {SOCIAL_LINKS.map(({ network, href }) => (
              <li key={network}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Eye Soul trên ${network}`}
                  className="hover:underline"
                >
                  {network}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="mt-10 text-xs text-ink/60">© {new Date().getFullYear()} Eye Soul</p>
    </footer>
  );
}

function FooterHeading({ children }: { children: string }) {
  return <h2 className="text-[11px] font-semibold uppercase tracking-[.2em] text-amber">{children}</h2>;
}
