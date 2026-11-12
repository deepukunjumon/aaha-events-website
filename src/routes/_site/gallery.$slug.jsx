import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Play } from "lucide-react";
import { Image } from "@/components/ui/image";
import PageHero from "@/components/site/PageHero";
import Lightbox from "@/components/gallery/Lightbox";
import FinalCta from "@/components/home/FinalCta";
import { loadSiteContent } from "@/lib/server-fns";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_site/gallery/$slug")({
  loader: async ({ params }) => {
    const data = await loadSiteContent();
    const album = data.albums.find((item) => item.slug === params.slug);
    if (!album) throw notFound();
    return {
      ...data,
      album,
      items: data.galleryItems.filter((item) => item.album_slug === album.slug),
    };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.album?.title || "Album"} — Aaha Events gallery` },
      { name: "description", content: loaderData?.album?.description || "" },
      { property: "og:title", content: `${loaderData?.album?.title || "Album"} | Aaha Events` },
      { property: "og:image", content: loaderData?.album?.cover_url || "" },
    ],
  }),
  component: AlbumPage,
});

function AlbumPage() {
  const { album, items, settings } = Route.useLoaderData();
  const [lightboxIndex, setLightboxIndex] = useState(null);

  return (
    <>
      <PageHero
        eyebrow={album.event_type}
        title={album.title}
        description={album.description}
        image={album.cover_url}
      >
        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.7rem]  tracking-[0.18em] text-bone/60">
          {album.location ? <span>{album.location}</span> : null}
          {album.event_date ? <span>{formatDate(album.event_date)}</span> : null}
          <span>{items.length} frames</span>
        </div>
      </PageHero>

      <section className="container-x py-16 sm:py-20">
        <Link
          to="/gallery"
          className="inline-flex items-center gap-2 text-[0.64rem] font-semibold  tracking-[0.22em] text-muted-foreground transition-colors hover:text-forest"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          All albums
        </Link>

        <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
          {items.map((item, i) => (
            <button
              key={`${item.url}-${i}`}
              type="button"
              onClick={() => setLightboxIndex(i)}
              className="group relative block w-full break-inside-avoid overflow-hidden bg-muted"
              aria-label={item.caption || "Open image"}
            >
              <div
                className={cn(
                  "relative w-full",
                  i % 3 === 0 ? "aspect-[4/5]" : i % 3 === 1 ? "aspect-[3/4]" : "aspect-square"
                )}
              >
                {item.type === "video" ? (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-forest">
                    <Play className="h-7 w-7 text-gold" aria-hidden="true" />
                    <span className="px-4 text-center text-[0.6rem]  tracking-[0.18em] text-bone/70">
                      Play video
                    </span>
                  </div>
                ) : (
                  <Image
                    src={item.url}
                    alt={item.caption || album.title}
                    className="absolute inset-0 block h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.05]"
                  />
                )}
                {item.caption ? (
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-4 text-left text-[0.72rem] text-bone opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    {item.caption}
                  </span>
                ) : null}
              </div>
            </button>
          ))}
        </div>

        {!items.length ? (
          <p className="mt-12 text-muted-foreground">Photos for this album are being uploaded.</p>
        ) : null}
      </section>

      <Lightbox
        items={items}
        index={lightboxIndex}
        onChange={setLightboxIndex}
        onClose={() => setLightboxIndex(null)}
      />

      <FinalCta settings={settings} />
    </>
  );
}