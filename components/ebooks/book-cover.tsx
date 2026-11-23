const ACCENTS = ["#13294B", "#8C2F39", "#5B4B8A", "#1E6B5B", "#8E6318", "#2A5A86"];

export function coverAccent(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  return ACCENTS[hash % ACCENTS.length];
}

/**
 * Parametric SVG cover, built from brand tokens, so every eBook in the shelf
 * reads as one series without needing bespoke art per title.
 */
export function BookCoverArt({
  title,
  seriesLabel,
  accent,
  className = "",
}: {
  title: string;
  seriesLabel?: string | null;
  accent: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 300 450"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={title}
    >
      <rect width="300" height="450" fill={accent} />
      <rect
        width="300"
        height="450"
        fill="none"
        stroke="#C9A14A"
        strokeOpacity="0.55"
        strokeWidth="2"
      />
      <rect x="14" y="14" width="272" height="422" fill="none" stroke="#C9A14A" strokeOpacity="0.35" strokeWidth="1" />

      {/* top ornament */}
      <path d="M150 38 L150 58 M140 48 L160 48" stroke="#C9A14A" strokeWidth="2" strokeLinecap="round" />

      {seriesLabel && (
        <text
          x="150"
          y="90"
          textAnchor="middle"
          fontFamily="var(--font-sans, sans-serif)"
          fontSize="10"
          letterSpacing="2.5"
          fill="#E3C480"
          fontWeight="700"
        >
          {seriesLabel.toUpperCase()}
        </text>
      )}

      <foreignObject x="24" y="160" width="252" height="180">
        <div
          style={{
            fontFamily: "var(--font-display, serif)",
            fontWeight: 600,
            fontSize: 26,
            lineHeight: 1.18,
            color: "#F7F4ED",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          {title}
        </div>
      </foreignObject>

      {/* bottom ornament + imprint */}
      <path d="M150 392 L150 412 M140 402 L160 402" stroke="#C9A14A" strokeWidth="2" strokeLinecap="round" />
      <text
        x="150"
        y="432"
        textAnchor="middle"
        fontFamily="var(--font-sans, sans-serif)"
        fontSize="9"
        letterSpacing="2"
        fill="#C9A14A"
        opacity="0.85"
      >
        TEACHING MINISTRY
      </text>
    </svg>
  );
}

export function BookCover3D({
  title,
  seriesLabel,
  accent,
}: {
  title: string;
  seriesLabel?: string | null;
  accent: string;
}) {
  return (
    <div className="group [perspective:900px]">
      <div
        className="relative aspect-[2/3] rounded-r-md rounded-l-[3px] shadow-[0_10px_24px_rgba(16,22,36,0.28)] transition-transform duration-300 ease-out group-hover:[transform:rotateY(-14deg)_translateX(-3px)] [transform-style:preserve-3d]"
      >
        {/* spine */}
        <div
          className="absolute left-0 top-0 bottom-0 w-[10px] rounded-l-[3px]"
          style={{
            background: `linear-gradient(90deg, rgba(0,0,0,0.45), rgba(0,0,0,0.05))`,
          }}
        />
        <BookCoverArt
          title={title}
          seriesLabel={seriesLabel}
          accent={accent}
          className="w-full h-full rounded-r-md rounded-l-[3px]"
        />
        {/* page edges */}
        <div className="absolute -right-[3px] top-[2px] bottom-[2px] w-[3px] bg-[#EDE7D8] rounded-r-sm" />
      </div>
    </div>
  );
}
