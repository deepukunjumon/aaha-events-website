import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Quote, Star } from "lucide-react";
import { Image } from "@/components/ui/image";
import SectionHeading from "@/components/common/SectionHeading";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1];

export default function Testimonials({ testimonials = [] }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  if (!testimonials.length) return null;
  const current = testimonials[index];

  const go = (next) => {
    setDirection(next > index ? 1 : -1);
    setIndex((next + testimonials.length) % testimonials.length);
  };

  return (
    <section className="bg-secondary/60">
      <div className="container-x py-20 sm:py-28">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Kind words"
            title="Families who trusted us with the day"
            description="[Placeholder – client to provide] Real reviews will replace these examples."
            className="max-w-xl"
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Previous testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-gold hover:text-gold"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Next testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-gold hover:text-gold"
            >
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.42fr_0.58fr] lg:items-center">
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted arch-sm lg:aspect-[4/5]">
            <AnimatePresence initial={false} mode="popLayout">
              <motion.div
                key={current.photo_url || index}
                className="absolute inset-0"
                initial={reduce ? false : { opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: EASE }}
              >
                <Image
                  src={current.photo_url}
                  alt={current.client_name || "Client"}
                  className="absolute inset-0 block h-full w-full object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div
            className="relative"
            role="group"
            aria-label="Testimonial carousel"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight") go(index + 1);
              if (event.key === "ArrowLeft") go(index - 1);
            }}
          >
            <Quote className="h-8 w-8 text-gold/60" aria-hidden="true" />
            <AnimatePresence initial={false} mode="wait">
              <motion.figure
                key={current.quote}
                initial={reduce ? false : { opacity: 0, x: direction * 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, x: direction * -24 }}
                transition={{ duration: 0.55, ease: EASE }}
                drag={reduce ? false : "x"}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.14}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -55) go(index + 1);
                  if (info.offset.x > 55) go(index - 1);
                }}
                className="cursor-grab active:cursor-grabbing"
              >
                <blockquote className="mt-6 font-display text-[1.55rem] leading-[1.35] text-foreground sm:text-[1.9rem]">
                  “{current.quote}”
                </blockquote>
                <figcaption className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
                  <span className="text-[0.7rem] font-semibold  tracking-[0.24em] text-foreground">
                    {current.client_name}
                  </span>
                  <span className="h-3 w-px bg-border" aria-hidden="true" />
                  <span className="text-[0.8rem] text-muted-foreground">{current.event_type}</span>
                  <span className="flex gap-1" aria-label={`${current.rating || 5} out of 5 stars`}>
                    {Array.from({ length: current.rating || 5 }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" aria-hidden="true" />
                    ))}
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>

            <div className="mt-9 flex items-center justify-between">
              <div className="flex gap-2">
                {testimonials.map((item, i) => (
                  <button
                    key={item.quote}
                    type="button"
                    onClick={() => go(i)}
                    aria-label={`Testimonial ${i + 1}`}
                    aria-current={i === index}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-500",
                      i === index ? "w-7 bg-gold" : "w-3 bg-foreground/20 hover:bg-foreground/40"
                    )}
                  />
                ))}
              </div>
              {current.video_url ? (
                <a
                  href={current.video_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-[0.65rem] font-semibold  tracking-[0.22em] text-foreground"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/50 text-gold">
                    <Play className="h-3 w-3" aria-hidden="true" />
                  </span>
                  Watch story
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}