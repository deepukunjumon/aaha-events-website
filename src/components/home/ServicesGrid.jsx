import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import SectionHeading from "@/components/common/SectionHeading";
import Reveal from "@/components/common/Reveal";

export default function ServicesGrid({ services = [] }) {
  if (!services.length) return null;

  return (
    <section id="services" className="container-x py-20 sm:py-28">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow="What we plan"
          title="Celebrations, composed with care"
          description="Each event type has its own rhythm. We build the plan, the design and the crew around yours."
          className="max-w-2xl"
        />
        <Reveal delay={0.1}>
          <Link
            to="/services"
            className="gold-underline inline-flex items-center gap-2 text-[0.68rem] font-semibold  tracking-[0.24em] text-foreground"
          >
            All services
            <ArrowUpRight className="h-4 w-4 text-gold" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {services.slice(0, 6).map((service, i) => (
          <Reveal key={service.slug} delay={(i % 3) * 0.08}>
            <Link to="/services/$slug" params={{ slug: service.slug }} className="group block">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted arch-sm">
                <Image
                  src={service.image_url}
                  alt={service.title}
                  className="absolute inset-0 block h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />
                <span className="absolute bottom-4 left-4 rounded-full bg-bone/90 px-3 py-1 text-[0.55rem] font-semibold  tracking-[0.22em] text-forest">
                  {service.category}
                </span>
              </div>
              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-[1.5rem] leading-tight text-foreground transition-colors group-hover:text-forest">
                    {service.title}
                  </h3>
                  <p className="mt-2 max-w-sm text-[0.92rem] leading-relaxed text-muted-foreground">
                    {service.short_description}
                  </p>
                </div>
                <ArrowUpRight
                  className="mt-2 h-5 w-5 shrink-0 text-muted-foreground/50 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold"
                  aria-hidden="true"
                />
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}