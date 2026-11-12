export default function PartnersMarquee({ partners = [] }) {
  if (!partners.length) return null;
  const row = [...partners, ...partners];

  return (
    <section className="border-y border-border/70 bg-bone py-12">
      <p className="text-center text-[0.58rem] font-semibold  tracking-[0.3em] text-muted-foreground">
        Trusted partners &amp; venues
      </p>
      <div className="relative mt-7 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="flex w-max animate-marquee items-center gap-12 pr-12">
          {row.map((partner, i) => (
            <span key={`${partner.name}-${i}`} className="flex items-center gap-12 whitespace-nowrap">
              <span className="font-display text-[1.35rem] text-foreground/70">{partner.name}</span>
              <span className="h-1 w-1 rounded-full bg-gold/60" aria-hidden="true" />
            </span>
          ))}
        </div>
      </div>
      <p className="mt-6 text-center text-[0.58rem]  tracking-[0.22em] text-muted-foreground/50">
        [Placeholder – client to provide logos]
      </p>
    </section>
  );
}