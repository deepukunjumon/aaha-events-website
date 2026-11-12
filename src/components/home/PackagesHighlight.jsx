import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/common/SectionHeading";
import Reveal from "@/components/common/Reveal";
import { inr } from "@/lib/format";
import { cn } from "@/lib/utils";

export default function PackagesHighlight({ packages = [] }) {
  if (!packages.length) return null;

  return (
    <section className="container-x py-20 sm:py-28">
      <SectionHeading
        align="center"
        eyebrow="Collections"
        title="Three ways to work with us"
        description="Every package is a starting point — inclusions and pricing are tailored to your date, venue and guest count."
        className="mx-auto max-w-2xl"
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {packages.slice(0, 3).map((pkg, i) => {
          const dark = pkg.featured;
          return (
            <Reveal key={pkg.name} delay={i * 0.08}>
              <div
                className={cn(
                  "flex h-full flex-col p-8 transition-transform duration-500 hover:-translate-y-1 sm:p-10",
                  dark
                    ? "bg-forest text-bone shadow-[0_30px_70px_-40px_rgba(27,48,34,0.9)]"
                    : "border border-border bg-card text-foreground"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className={cn("eyebrow", dark && "text-gold")}>
                    {dark ? "Most booked" : "Collection"}
                  </span>
                  {dark ? <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" /> : null}
                </div>
                <h3 className="mt-5 font-display text-[1.9rem] leading-tight">{pkg.name}</h3>
                <p className={cn("mt-2 text-[0.92rem] leading-relaxed", dark ? "text-bone/65" : "text-muted-foreground")}>
                  {pkg.tagline}
                </p>

                <div className="mt-7 flex items-baseline gap-2">
                  {pkg.price_visible && pkg.price ? (
                    <>
                      <span className={cn("text-[0.6rem]  tracking-[0.22em]", dark ? "text-bone/50" : "text-muted-foreground")}>
                        From
                      </span>
                      <span className="font-display text-[2rem] leading-none">{inr(pkg.price)}</span>
                    </>
                  ) : (
                    <span className={cn("text-[0.78rem]  tracking-[0.2em]", dark ? "text-bone/60" : "text-muted-foreground")}>
                      Pricing on request
                    </span>
                  )}
                </div>

                <ul className={cn("mt-8 flex-1 space-y-3 text-[0.9rem] leading-relaxed", dark ? "text-bone/75" : "text-muted-foreground")}>
                  {(pkg.inclusions || []).map((item) => (
                    <li key={item} className="flex gap-3">
                      <Check className={cn("mt-1 h-3.5 w-3.5 shrink-0", dark ? "text-gold" : "text-gold")} aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  className={cn(
                    "mt-9 h-12 rounded-sm text-[0.66rem] font-semibold  tracking-[0.24em]",
                    dark
                      ? "bg-gold text-ink hover:bg-gold/85"
                      : "bg-forest text-bone hover:bg-forest/90"
                  )}
                >
                  <Link to="/book" search={{ package: pkg.name }}>
                    Book this collection
                  </Link>
                </Button>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}