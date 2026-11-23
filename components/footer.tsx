export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="text-center px-4 pt-7 pb-6 mt-4 border-t border-line text-muted text-[13px]">
      <svg
        className="w-[30px] h-[30px] mx-auto mb-2 text-gold opacity-75"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      >
        <path d="M12 2v20M6 8h12" />
      </svg>
      <div className="font-display font-semibold text-[15.5px] text-ink tracking-wide leading-relaxed">
        TEACHING MINISTRY
        <br />
        Catholic Charismatic Renewal
      </div>
      <div className="font-serif italic">Otito dịrị Jesu</div>
      <div className="text-[11.5px] leading-relaxed mt-2">
        Catholic Church of Epiphany, Ologolo · Lekki, Lagos, Nigeria
        <br />
        Property of the Teaching Ministry. &copy; {year} All rights reserved.
        <br />
        Free to use and share within the Church. Not for sale.
      </div>
    </footer>
  );
}
