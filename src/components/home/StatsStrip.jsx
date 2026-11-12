import Counter from "@/components/common/Counter";
import Reveal from "@/components/common/Reveal";

export default function StatsStrip({ stats = [], note = "[Placeholder – client to provide]" }) {
  if (!stats.length) return null;

  return (
    <section className="border-b border-border/70 bg-bone">
      <div className="container-x py-14 sm:py-16">
        <div className="grid grid-cols-2 gap-y-10 sm:grid-cols-4 sm:divide-x sm:divide-border">
          {stats.map((stat, i) => (
            <Reveal key={stat.label || i} delay={i * 0.08} className="px-2 text-center sm:px-6">
              <p className="font-display text-[2.6rem] leading-none text-foreground sm:text-[3.2rem]">
                <Counter value={Number(stat.value) || 0} suffix={stat.suffix || ""} />
              </p>
              <p className="mt-3 text-[0.62rem] font-semibold  tracking-[0.24em] text-muted-foreground">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>
        <p className="mt-10 text-center text-[0.6rem]  tracking-[0.22em] text-muted-foreground/50">
          {note}
        </p>
      </div>
    </section>
  );
}