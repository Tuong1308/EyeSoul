import { useEffect, useId, useRef, useState } from 'react';
import { Link } from 'react-router';
import { LOGIN_PATH } from '../lib/routes';
import { useSession } from '../session/session-context';

/** "Đăng nhập" when signed out; the shopper's name with an account menu when signed in. */
export function AccountControl() {
  const { session, signOut } = useSession();
  // Signing out removes the account button; focus moves on to "Đăng nhập" instead of falling to the page.
  const focusLoginLink = useRef(false);

  if (session.status === 'signed-out') {
    return (
      <Link
        to={LOGIN_PATH}
        ref={(link) => {
          if (link && focusLoginLink.current) {
            focusLoginLink.current = false;
            link.focus();
          }
        }}
        className="flex h-11 items-center rounded-full px-3 text-sm font-medium hover:bg-line/60"
      >
        Đăng nhập
      </Link>
    );
  }
  return (
    <AccountMenu
      displayName={session.displayName}
      onSignOut={() => {
        focusLoginLink.current = true;
        signOut();
      }}
    />
  );
}

function AccountMenu({ displayName, onSignOut }: { displayName: string; onSignOut: () => void }) {
  const [open, setOpen] = useState(false);
  const buttonId = useId();
  const menuId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const firstItemRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    firstItemRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [open]);

  return (
    <div
      ref={containerRef}
      onBlur={(event) => {
        if (!containerRef.current?.contains(event.relatedTarget)) setOpen(false);
      }}
      className="relative"
    >
      <button
        ref={buttonRef}
        id={buttonId}
        type="button"
        aria-label={`Tài khoản: ${displayName}`}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        onClick={() => setOpen((isOpen) => !isOpen)}
        className="flex h-11 items-center gap-2 rounded-full pl-1 pr-3 hover:bg-line/60"
      >
        <span aria-hidden className="flex h-8 w-8 items-center justify-center rounded-full bg-ink font-serif text-sm text-paper">
          {displayName.charAt(0).toUpperCase()}
        </span>
        <span className="hidden max-w-32 truncate text-sm font-medium sm:inline">{displayName}</span>
      </button>
      {open && (
        <div
          id={menuId}
          role="menu"
          aria-labelledby={buttonId}
          className="absolute right-0 top-full mt-2 min-w-44 rounded-xl2 border border-line bg-card p-2 shadow-soft"
        >
          <button
            ref={firstItemRef}
            type="button"
            role="menuitem"
            onClick={() => {
              setOpen(false);
              onSignOut();
            }}
            className="block w-full rounded-xl px-4 py-2 text-left text-sm hover:bg-line/60"
          >
            Đăng xuất
          </button>
        </div>
      )}
    </div>
  );
}
