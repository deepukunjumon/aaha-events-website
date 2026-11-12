import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import ReactMarkdown from "react-markdown";
import { ArrowLeft } from "lucide-react";
import { Image } from "@/components/ui/image";
import PageHero from "@/components/site/PageHero";
import Reveal from "@/components/common/Reveal";
import FinalCta from "@/components/home/FinalCta";
import { loadSiteContent } from "@/lib/server-fns";
import { formatDate } from "@/lib/format";

export const Route = createFileRoute("/_site/blog/$slug")({
  loader: async ({ params }) => {
    const data = await loadSiteContent();
    const post = data.posts.find((item) => item.slug === params.slug);
    if (!post) throw notFound();
    return {
      ...data,
      post,
      related: data.posts.filter((item) => item.slug !== post.slug).slice(0, 2),
    };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.post?.title || "Article"} — Aaha Events journal` },
      { name: "description", content: loaderData?.post?.excerpt || "" },
      { property: "og:title", content: loaderData?.post?.title || "Aaha Events journal" },
      { property: "og:description", content: loaderData?.post?.excerpt || "" },
      { property: "og:image", content: loaderData?.post?.cover_url || "" },
    ],
  }),
  component: BlogPostPage,
});

function BlogPostPage() {
  const { post, related, settings } = Route.useLoaderData();

  return (
    <>
      <PageHero eyebrow={post.category} title={post.title} description={post.excerpt} image={post.cover_url}>
        <p className="mt-6 text-[0.7rem]  tracking-[0.18em] text-bone/60">
          {formatDate(post.published_date)} · {post.read_minutes || 5} min read · {post.author || "Aaha Events"}
        </p>
      </PageHero>

      <section className="container-x max-w-3xl py-16 sm:py-20">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-[0.62rem] font-semibold  tracking-[0.2em] text-muted-foreground transition-colors hover:text-forest"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          All articles
        </Link>

        <Reveal className="mt-9">
          <div className="article-body">
            <ReactMarkdown>{post.content || ""}</ReactMarkdown>
          </div>
        </Reveal>

        {related.length ? (
          <div className="mt-16 border-t border-border/70 pt-10">
            <h2 className="text-[0.58rem] font-semibold  tracking-[0.26em] text-gold">Keep reading</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {related.map((item) => (
                <Link key={item.slug} to="/blog/$slug" params={{ slug: item.slug }} className="group block">
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                    <Image
                      src={item.cover_url}
                      alt={item.title}
                      className="absolute inset-0 block h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                    />
                  </div>
                  <h3 className="mt-4 font-display text-[1.15rem] leading-snug text-foreground">{item.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </section>

      <FinalCta settings={settings} />
    </>
  );
}