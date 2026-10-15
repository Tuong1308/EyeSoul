import type { ReactNode } from 'react';

interface SectionTitleProps {
  id: string;
  kicker: string;
  /** Rendered upright. */
  lead: string;
  /** Rendered in italics after the lead, magazine style. */
  emphasis: string;
  /** Sits at the right end of the title, e.g. a "View all" link. */
  action?: ReactNode;
}

export function SectionTitle({ id, kicker, lead, emphasis, action }: SectionTitleProps) {
  return (
    <header className="flex items-end justify-between gap-4 border-t border-ink pt-6">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[.2em] text-amber">{kicker}</p>
        <h2 id={id} className="mt-2 font-serif text-4xl leading-[.95] md:text-6xl">
          {lead} <em className="font-medium">{emphasis}</em>
        </h2>
      </div>
      {action}
    </header>
  );
}
