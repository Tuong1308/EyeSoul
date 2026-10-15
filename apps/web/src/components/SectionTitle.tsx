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
  /** Set on a dark band, e.g. the Sample Photos: the top rule turns light. */
  onDark?: boolean;
}

export function SectionTitle({ id, kicker, lead, emphasis, action, onDark = false }: SectionTitleProps) {
  return (
    // A div rather than <header>: inside a section it would add nothing, and outside one it would be a second banner.
    <div className={`flex items-end justify-between gap-4 border-t pt-6 ${onDark ? 'border-paper/30' : 'border-ink'}`}>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[.2em] text-amber">{kicker}</p>
        <h2 id={id} className="mt-2 font-serif text-4xl leading-[.95] md:text-6xl">
          {lead} <em className="font-medium">{emphasis}</em>
        </h2>
      </div>
      {action}
    </div>
  );
}

/** The shape of a SectionTitle while its section loads: the black top rule, the kicker and the large serif title. */
export function SectionTitleSkeleton() {
  return (
    <div className="border-t border-ink pt-6">
      <div className="h-3 w-40 animate-pulse rounded bg-line" />
      <div className="mt-3 h-9 w-72 max-w-full animate-pulse rounded bg-line md:h-14 md:w-[28rem]" />
    </div>
  );
}
