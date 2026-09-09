// The A and K share a baseline and a stem. Use this exact geometry for the
// identity mark and its enlarged background treatment.
const mark = "M8 76 31 20 54 76 M18 52H44 M54 20V76 M86 20 58 48 90 76";
const strokes = [
  { path: "M8 76 31 20 54 76", start: 0, length: 0.42 },
  { path: "M18 52H44", start: 0.42, length: 0.1 },
  { path: "M54 20V76", start: 0.52, length: 0.16 },
  { path: "M86 20 58 48 90 76", start: 0.68, length: 0.32 },
];

export default function BrandMark({ className, glow = false, engrave = false }) {
  return (
    <svg className={className} viewBox="0 0 100 96" fill="none" aria-hidden="true" focusable="false" data-brand-mark="ak">
      {(engrave ? strokes : [{ path: mark }]).map(({ path, start, length }) => (
        <g key={path} style={engrave ? { "--stroke-start": start, "--stroke-length": length } : undefined}>
          {glow && <path d={path} pathLength="1" stroke="currentColor" strokeWidth="16" strokeLinejoin="miter" data-brand-glow />}
          <path d={path} pathLength="1" stroke="currentColor" strokeWidth="5.5" strokeLinecap="square" strokeLinejoin="miter" data-brand-core />
        </g>
      ))}
    </svg>
  );
}
