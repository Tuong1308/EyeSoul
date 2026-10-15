import type { SVGProps } from 'react';

/*
 * The Eye Soul logo, redrawn from docs/reference/eye-soul-logo-original.jpeg: eight petals, each split
 * down its middle, around an eye with a highlight. Everything is `currentColor` and the gaps are real holes
 * (never paper-coloured fills), so the same logo works on light and dark bands.
 * The mark is drawn in a 100-unit box centred on the origin.
 */

const GAP = 0.6;
/** The petals stop at this circle, leaving a round ring around the eye. */
const RING = 20;
/**
 * One half of the petal pointing right, as [distance along the petal, distance from its middle] pairs:
 * from the ring out to the tip, back along the outer edge, then down to the ring again.
 */
const HALF_PETAL = [
  [Math.sqrt(RING ** 2 - GAP ** 2), GAP],
  [49.5, GAP],
  [31.8, 12.4],
  [Math.sqrt(RING ** 2 - 7 ** 2), 7],
] as const;

/** Each half is closed by an arc of the ring, so the eye sits in a circle rather than an octagon. */
const PETAL_HALVES = Array.from({ length: 8 }, (_, petal) => {
  const angle = ((petal * 45 - 90) * Math.PI) / 180;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return [1, -1].map((side) => {
    const [start, ...rest] = HALF_PETAL.map(([along, across]) => {
      const y = across * side;
      return `${(along * cos - y * sin).toFixed(2)},${(along * sin + y * cos).toFixed(2)}`;
    });
    return `M${start}L${rest.join('L')}A${RING},${RING} 0 0,${side === 1 ? 0 : 1} ${start}Z`;
  });
}).flat();

/** Pupil, with the highlight cut out of it and a dot inside the highlight, leaving a crescent of light. */
const EYE =
  'M0,-7.6a7.6,7.6 0 1,0 0.01,0Z' + // pupil
  'M4.3,-6.5a2.4,2.4 0 1,0 0.01,0Z' + // highlight (a hole, by the even-odd rule)
  'M4.9,-5.2a1.3,1.3 0 1,0 0.01,0Z'; // the dark dot inside it

function MarkShapes() {
  return (
    <>
      {PETAL_HALVES.map((d, index) => (
        <path key={index} d={d} />
      ))}
      <path d={EYE} fillRule="evenodd" />
    </>
  );
}

function Wordmark(props: SVGProps<SVGTextElement>) {
  return (
    <text className="font-serif" fontWeight={700} lengthAdjust="spacingAndGlyphs" {...props}>
      EYE SOUL
    </text>
  );
}

type LogoProps = { className?: string };

/** The mark alone (the hero). */
export function LogoMark({ className = '' }: LogoProps) {
  return (
    <svg aria-hidden viewBox="-50 -50 100 100" fill="currentColor" className={className}>
      <MarkShapes />
    </svg>
  );
}

/** Mark and wordmark side by side (the header). */
export function LogoHorizontal({ className = '' }: LogoProps) {
  return (
    <svg aria-hidden viewBox="0 0 268 60" fill="currentColor" className={className}>
      <g transform="translate(30 30) scale(.6)">
        <MarkShapes />
      </g>
      <Wordmark x={72} y={44} fontSize={36} textLength={194} />
    </svg>
  );
}

/** Mark above wordmark (the footer). */
export function LogoStacked({ className = '' }: LogoProps) {
  return (
    <svg aria-hidden viewBox="0 0 200 150" fill="currentColor" className={className}>
      <g transform="translate(100 50)">
        <MarkShapes />
      </g>
      <Wordmark x={2} y={144} fontSize={38} textLength={196} />
    </svg>
  );
}
