import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import PageHero from "@/components/site/PageHero";
import Reveal from "@/components/common/Reveal";
import FinalCta from "@/components/home/FinalCta";
import { loadSiteContent } from "@/lib/server-fns";
import { formatDate } from "@/lib/format";

export const Route = createFileRoute("/_site/blog/")({
  loader: () => loadSiteContent(),
  head: () => ({
    meta: [
      { title: "Journal — Kerala wedding & event planning notes | Aaha Events" },
      {
        name: "description",
        content:
          "Honest planning notes from the Aaha Events studio: wedding budgets, décor ideas that suit Kerala venues, and last-minute celebration timelines.",
      },
      { property: "og:title", content: "Journal | Aaha Events" },
    ],
  }),
  component: BlogIndexPage,
});

function BlogIndexPage() {
  const { posts, settings } = Route.useLoaderData();
  const [featured, ...rest] = posts;

  return (
    <>
      <PageHero
        eyebrow="Journal"
        title="Planning notes from the studio"
        description="Practical, honest writing about budgets, venues and the decisions that actually matter."
        image={settings.hero_image_2}
      />

      <section className="container-x py-16 sm:py-20">
        {featured ? (
          <Reveal>
            <Link to="/blog/$slug" params={{ slug: featured.slug }} className="group grid gap-8 lg:grid-cols-2 lg:items-center">
              <div className="relative aspect-[16/11] w-full overflow-hidden bg-muted arch-sm">
                <Image
                  src={featured.cover_url}
                  alt={featured.title}
                  className="absolute inset-0 block h-full w-full object-cover transition-transform duration-[1300ms] group-hover:scale-[1.04]"
                />
              </div>
              <div>
                <p className="text-[0.58rem] font-semibold  tracking-[0.26em] text-gold">
                  {featured.category}
                </p>
                <h2 className="mt-4 font-display text-[2rem] leading-tight text-foreground sm:text-[2.5rem]">
                  {featured.title}
                </h2>
                <p className="mt-4 max-w-xl text-[0.98rem] leading-relaxed text-muted-foreground">
                  {featured.excerpt}
                </p>
                <p className="mt-6 text-[0.7rem]  tracking-[0.18em] text-muted-foreground">
                  {formatDate(featured.published_date)} · {featured.read_minutes || 5} min read
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-[0.64rem] font-semibold  tracking-[0.22em] text-forest">
                  Read the article
                  <ArrowUpRight className="h-4 w-4 text-gold" aria-hidden="true" />
                </span>
              </div>
            </Link>
          </Reveal>
        ) : null}

        <div className="mt-16 grid gap-10 border-t border-border/70 pt-14 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post, i) => (
            <Reveal key={post.slug} delay={(i % 3) * 0.06}>
              <Link to="/blog/$slug" params={{ slug: post.slug }} className="group block">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                  <Image
                    src={post.cover_url}
                    alt={post.title}
                    className="absolute inset-0 block h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                  />
                </div>
                <p className="mt-5 text-[0.55rem] font-semibold  tracking-[0.24em] text-gold">
                  {post.category}
                </p>
                <h3 className="mt-2 font-display text-[1.35rem] leading-snug text-foreground">{post.title}</h3>
                <p className="mt-2 text-[0.9rem] leading-relaxed text-muted-foreground">{post.excerpt}</p>
                <p className="mt-4 text-[0.68rem]  tracking-[0.16em] text-muted-foreground/80">
                  {formatDate(post.published_date)} · {post.read_minutes || 5} min read
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <FinalCta settings={settings} />
    </>
  );
}