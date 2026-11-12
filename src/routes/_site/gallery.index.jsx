import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";
import { Image } from "@/components/ui/image";
import PageHero from "@/components/site/PageHero";
import Lightbox from "@/components/gallery/Lightbox";
import FinalCta from "@/components/home/FinalCta";
import { loadSiteContent } from "@/lib/server-fns";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/format";

export const Route = createFileRoute("/_site/gallery/")({
  loader: () => loadSiteContent(),
  head: () => ({
    meta: [
      { title: "Gallery — Weddings & celebrations across Kerala | Aaha Events" },
      {
        name: "description",
        content:
          "Browse recent Aaha Events celebrations: Kerala weddings, engagements, birthdays and corporate events, with full albums and video.",
      },
      { property: "og:title", content: "Gallery | Aaha Events" },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const { albums, galleryItems, settings } = Route.useLoaderData();
  const reduce = useReducedMotion();
  const [active, setActive] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(albums.map((album) => album.event_type).filter(Boolean)))],
    [albums]
  );

  const visibleAlbums = active === "All" ? albums : albums.filter((album) => album.event_type === active);
  const albumTypes = Object.fromEntries(albums.map((album) => [album.slug, album.event_type]));
  const frames = galleryItems.filter(
    (item) => active === "All" || albumTypes[item.album_slug] === active
  );

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="The work, in its own light"
        description="Full albums from real celebrations — the mandap at 6pm, the sadya at noon, and the quiet moments in between."
        image={settings.hero_image_2}
      />

      <section className="container-x py-14 sm:py-20">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter gallery by event type">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={active === category}
              onClick={() => {
                setActive(category);
                setLightboxIndex(null);
              }}
              className={cn(
                "rounded-full border px-5 py-2.5 text-[0.62rem] font-semibold  tracking-[0.2em] transition-colors",
                active === category
                  ? "border-forest bg-forest text-bone"
                  : "border-border text-muted-foreground hover:border-gold hover:text-forest"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <motion.div
          key={active}
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {visibleAlbums.map((album) => (
            <Link
              key={album.slug}
              to="/gallery/$slug"
              params={{ slug: album.slug }}
              className="group block"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                <Image
                  src={album.cover_url}
                  alt={album.title}
                  className="absolute inset-0 block h-full w-full object-cover transition-transform duration-[1300ms] group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                  <div>
                    <p className="text-[0.55rem] font-semibold  tracking-[0.24em] text-gold">
                      {album.event_type}
                    </p>
                    <h2 className="mt-2 font-display text-[1.35rem] text-bone">{album.title}</h2>
                    <p className="mt-1 text-[0.7rem]  tracking-[0.14em] text-bone/60">
                      {[album.location, formatDate(album.event_date, { day: undefined })].filter(Boolean).join(" · ")}
                    </p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-bone/70" aria-hidden="true" />
                </div>
              </div>
            </Link>
          ))}
        </motion.div>
      </section>

      <section className="border-t border-border/70 bg-secondary/40 py-16 sm:py-20">
        <div className="container-x">
          <h2 className="font-display text-[1.8rem] text-foreground sm:text-[2.2rem]">Every frame</h2>
          <p className="mt-2 max-w-xl text-[0.95rem] leading-relaxed text-muted-foreground">
            Tap any image to open it full screen. Videos are marked with a play icon.
          </p>

          <div className="mt-10 columns-2 gap-4 sm:columns-3 lg:columns-4 [&>*]:mb-4">
            {frames.map((item, i) => (
              <button
                key={`${item.url}-${i}`}
                type="button"
                onClick={() => setLightboxIndex(i)}
                className="group relative block w-full break-inside-avoid overflow-hidden bg-muted text-left"
                aria-label={item.caption || "Open image"}
              >
                <div
                  className={cn(
                    "relative w-full",
                    i % 3 === 0 ? "aspect-[4/5]" : i % 3 === 1 ? "aspect-square" : "aspect-[3/4]"
                  )}
                >
                  {item.type === "video" ? (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-forest">
                      <Play className="h-6 w-6 text-gold" aria-hidden="true" />
                      <span className="px-3 text-center text-[0.6rem]  tracking-[0.18em] text-bone/70">
                        Video
                      </span>
                    </div>
                  ) : (
                    <Image
                      src={item.url}
                      alt={item.caption || "Aaha Events celebration"}
                      className="absolute inset-0 block h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                    />
                  )}
                  <span className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/25" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <Lightbox
        items={frames}
        index={lightboxIndex}
        onChange={setLightboxIndex}
        onClose={() => setLightboxIndex(null)}
      />

      <FinalCta settings={settings} />
    </>
  );
}