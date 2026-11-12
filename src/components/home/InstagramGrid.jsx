import { Instagram } from "lucide-react";
import { Image } from "@/components/ui/image";
import SectionHeading from "@/components/common/SectionHeading";
import Reveal from "@/components/common/Reveal";

export default function InstagramGrid({ images = [], url, handle }) {
  if (!images.length) return null;

  return (
    <section className="container-x py-20 sm:py-28">
      <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading eyebrow="Follow along" title="Behind the scenes on Instagram" className="max-w-2xl" />
        {url ? (
          <Reveal delay={0.1}>
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="gold-underline inline-flex items-center gap-2 text-[0.68rem] font-semibold  tracking-[0.24em] text-foreground"
            >
              <Instagram className="h-4 w-4 text-gold" aria-hidden="true" />
              {handle || "Follow us"}
            </a>
          </Reveal>
        ) : null}
      </div>

      <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        {images.map((src, i) => (
          <Reveal key={`${src}-${i}`} delay={(i % 3) * 0.06}>
            <a
              href={url || "#"}
              target={url ? "_blank" : undefined}
              rel={url ? "noreferrer" : undefined}
              className="group block aspect-square overflow-hidden bg-muted"
            >
              <Image
                src={src}
                alt="Aaha Events on Instagram"
                className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.07]"
              />
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
