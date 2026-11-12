import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import { Button } from "@/components/ui/button";

const EASE = [0.22, 1, 0.36, 1];
const IMAGE_INTERVAL_MS = 8000;

const fadeVariants = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
};

export default function Hero({ settings }) {
  const reduce = useReducedMotion();
  const images = [settings.hero_image_1, settings.hero_image_2].filter(Boolean);
  const [index, setIndex] = useState(0);

  // Every image is preloaded up front so the crossfade never waits on a fetch mid-transition.
  useEffect(() => {
    images.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, [images]);

  useEffect(() => {
    if (reduce || images.length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % images.length), IMAGE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [reduce, images.length]);

  const headline = settings.hero_headline || "Events that echo forever";
  const words = headline.split(" ");

  return (
    <section className="relative isolate flex min-h-[88svh] items-end overflow-hidden bg-ink pb-16 pt-28 sm:min-h-[92svh] lg:min-h-[94svh] lg:items-center lg:pb-24">
      <div className="absolute inset-0 -z-10">
        <AnimatePresence initial={false}>
          <motion.div
            key={index}
            className="absolute inset-0"
            variants={fadeVariants}
            initial={reduce ? false : "enter"}
            animate="center"
            exit={reduce ? undefined : "exit"}
            transition={{ duration: 1.4, ease: EASE }}
          >
            <Image
              src={images[index]}
              alt="Aaha Events celebration in Kerala"
              fittingType="fill"
              loading="eager"
              className="absolute inset-0 block h-full w-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-ink/92 via-ink/55 to-ink/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-ink/40" />
      </div>

      <div className="container-x relative">
        <div className="max-w-3xl">
          <motion.p
            className="eyebrow"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          >
            {settings.hero_eyebrow}
          </motion.p>

          <h1 className="display-xl mt-6 text-bone" aria-label={headline}>
            {words.map((word, i) => (
              <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.08em] pr-[0.24em] align-bottom">
                <motion.span
                  className="inline-block"
                  initial={reduce ? false : { y: "115%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ duration: 1.05, ease: EASE, delay: 0.22 + i * 0.085 }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className="mt-7 max-w-xl text-[1.05rem] leading-relaxed text-bone/75"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.6 }}
          >
            {settings.hero_subheadline}
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.72 }}
          >
            <Button
              asChild
              className="h-12 rounded-sm bg-gold px-8 text-[0.68rem] font-semibold  tracking-[0.24em] text-ink hover:bg-gold/85"
            >
              <Link to="/book">
                Book an event
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-12 rounded-sm border-bone/35 bg-transparent px-8 text-[0.68rem] font-semibold  tracking-[0.24em] text-bone hover:border-bone hover:bg-bone/10 hover:text-bone"
            >
              <Link to="/contact">Get a free quote</Link>
            </Button>
          </motion.div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden justify-center pb-6 lg:flex">
        <motion.div
          className="flex flex-col items-center gap-2 text-bone/50"
          animate={reduce ? undefined : { y: [0, 7, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-[0.55rem]  tracking-[0.34em]">Scroll</span>
          <ArrowDown className="h-4 w-4" aria-hidden="true" />
        </motion.div>
      </div>
    </section>
  );
}