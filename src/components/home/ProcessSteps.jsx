import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { getIcon } from "@/components/common/iconMap";
import SectionHeading from "@/components/common/SectionHeading";
import Reveal from "@/components/common/Reveal";

export default function ProcessSteps({ steps = [] }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.55"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });

  if (!steps.length) return null;

  return (
    <section className="container-x py-20 sm:py-28">
      <SectionHeading
        align="center"
        eyebrow="How it works"
        title="From first message to last dance"
        description="Four calm steps. No surprises, no chasing, no guesswork."
        className="mx-auto max-w-2xl"
      />

      <div ref={ref} className="relative mt-16 lg:mt-20">
        <div className="absolute left-[19px] top-2 hidden h-[calc(100%-2rem)] w-px bg-border sm:block lg:left-1/2 lg:-translate-x-1/2" aria-hidden="true" />
        <motion.div
          className="absolute left-[19px] top-2 hidden w-px origin-top bg-gold sm:block lg:left-1/2 lg:-translate-x-1/2"
          style={{ height: "calc(100% - 2rem)", scaleY: reduce ? 1 : scaleY }}
          aria-hidden="true"
        />

        <ol className="space-y-12 lg:space-y-0">
          {steps.map((step, i) => {
            const Icon = getIcon(step.icon);
            const right = i % 2 === 1;
            return (
              <li key={step.title} className="relative lg:grid lg:grid-cols-2 lg:gap-16">
                <Reveal
                  delay={0.05}
                  className={
                    right
                      ? "lg:col-start-2 lg:pl-16 lg:py-10"
                      : "lg:col-start-1 lg:pr-16 lg:py-10 lg:text-right"
                  }
                >
                  <div className="flex items-start gap-5 sm:pl-14 lg:pl-0 lg:block">
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-bone text-gold lg:hidden`}
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-[0.58rem] font-semibold  tracking-[0.28em] text-gold">
                        Step {String(step.step_number || i + 1).padStart(2, "0")}
                      </p>
                      <h3 className="mt-3 font-display text-[1.7rem] leading-tight text-foreground">
                        {step.title}
                      </h3>
                      <p className="mt-2 max-w-sm text-[0.95rem] leading-relaxed text-muted-foreground lg:max-w-none">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
                <span
                  className="absolute left-0 top-2 hidden h-10 w-10 items-center justify-center rounded-full border border-gold/40 bg-bone text-gold sm:flex lg:left-1/2 lg:-translate-x-1/2"
                  aria-hidden="true"
                >
                  <Icon className="h-4 w-4" />
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}