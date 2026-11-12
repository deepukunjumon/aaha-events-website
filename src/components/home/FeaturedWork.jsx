import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import SectionHeading from "@/components/common/SectionHeading";
import Reveal from "@/components/common/Reveal";
import { formatDate } from "@/lib/format";

export default function FeaturedWork({ albums = [] }) {
  if (!albums.length) return null;

  return (
    <section className="overflow-hidden py-20 sm:py-28">
      <div className="container-x">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Selected work"
            title="A look inside recent celebrations"
            description="Real dates, real families, real venues across Kottayam, Idukki and Kochi."
            className="max-w-2xl"
          />
          <Reveal delay={0.1}>
            <Link
              to="/gallery"
              className="gold-underline inline-flex items-center gap-2 text-[0.68rem] font-semibold  tracking-[0.24em] text-foreground"
            >
              View gallery
              <ArrowUpRight className="h-4 w-4 text-gold" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </div>

      <div className="no-scrollbar mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:px-8 lg:px-12">
        {albums.slice(0, 5).map((album, i) => (
          <Reveal
            key={album.slug}
            delay={(i % 3) * 0.06}
            className="w-[80%] shrink-0 snap-start sm:w-[46%] lg:w-[31%]"
          >
            <Link to="/gallery/$slug" params={{ slug: album.slug }} className="group block">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted">
                <Image
                  src={album.cover_url}
                  alt={album.title}
                  className="absolute inset-0 block h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.07]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="text-[0.55rem] font-semibold  tracking-[0.26em] text-gold">
                    {album.event_type}
                  </p>
                  <h3 className="mt-2 font-display text-[1.5rem] leading-tight text-bone">{album.title}</h3>
                  <p className="mt-1 text-[0.72rem]  tracking-[0.16em] text-bone/60">
                    {[album.location, formatDate(album.event_date, { day: undefined })].filter(Boolean).join(" · ")}
                  </p>
                </div>
                <span className="absolute right-5 top-5 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-bone/90 text-forest opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}