import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { getIcon } from "@/components/common/iconMap";
import SectionHeading from "@/components/common/SectionHeading";
import Reveal from "@/components/common/Reveal";

export default function WhyUs({ points = [] }) {
  if (!points.length) return null;

  return (
    <section className="bg-forest text-bone">
      <div className="container-x grid gap-14 py-20 sm:py-28 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            tone="light"
            eyebrow="Why families choose us"
            title="The quiet confidence of a well-run celebration"
            description="You should be a guest at your own event. Everything below exists so that you can be."
          />
          <Reveal delay={0.15}>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 text-[0.68rem] font-semibold  tracking-[0.24em] text-gold"
            >
              Talk to a planner
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>

        <div>
          {points.map((point, i) => {
            const Icon = getIcon(point.icon);
            return (
              <Reveal key={point.title} delay={i * 0.06}>
                <div className="flex items-start gap-5 border-t border-bone/15 py-7 first:border-t-0 first:pt-0">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold">
                    <Icon className="h-[1.15rem] w-[1.15rem]" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-display text-[1.3rem] leading-snug text-bone">{point.title}</h3>
                    <p className="mt-2 text-[0.95rem] leading-relaxed text-bone/65">{point.description}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}