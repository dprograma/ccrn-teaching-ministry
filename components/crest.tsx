export function Crest({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <g opacity=".5" stroke="#C9A14A" strokeWidth="1.3" strokeLinecap="round">
        <path d="M32 4v8M14 11l4 7M50 11l-4 7M6 24l7 4M58 24l-7 4" />
      </g>
      <path
        d="M32 9v17M25.5 15h13"
        stroke="#C9A14A"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      <path
        d="M8 48c7-4.4 14-4.4 24 0 10-4.4 17-4.4 24 0"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d="M8 48V33c7-4.4 14-4.4 24 0 10-4.4 17-4.4 24 0v15"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path d="M32 33v15" stroke="#C9A14A" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M14 38h12M38 38h12M16 43h10M40 43h10"
        stroke="#C9A14A"
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity=".65"
      />
    </svg>
  );
}
