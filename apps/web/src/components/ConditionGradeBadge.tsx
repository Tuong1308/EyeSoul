import type { ConditionGrade } from '@eyesoul/shared';

/** A Film Camera's Condition Grade as a circled serif letter. Shared with the Product Detail page. */
export function ConditionGradeBadge({ grade, className = '' }: { grade: ConditionGrade; className?: string }) {
  return (
    <span
      role="img"
      aria-label={`Tình trạng ${grade}`}
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink bg-card font-serif text-base font-bold italic leading-none ${className}`}
    >
      {grade}
    </span>
  );
}
