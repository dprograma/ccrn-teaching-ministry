export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[11.5px] font-bold tracking-[0.14em] uppercase text-muted font-sans mt-6 mb-2.5 pb-1.5 border-b border-line">
      {children}
    </h3>
  );
}
