import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import PageHero from "@/components/site/PageHero";
import FaqAccordion from "@/components/common/FaqAccordion";
import Reveal from "@/components/common/Reveal";
import FinalCta from "@/components/home/FinalCta";
import { loadSiteContent } from "@/lib/server-fns";

export const Route = createFileRoute("/_site/faq")({
  loader: () => loadSiteContent(),
  head: () => ({
    meta: [
      { title: "Frequently asked questions | Aaha Events, Kerala" },
      {
        name: "description",
        content:
          "How far ahead to book, what the advance looks like, whether you can use your own vendors, and how we handle Kerala weather.",
      },
      { property: "og:title", content: "FAQ | Aaha Events" },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  const { faqs, settings } = Route.useLoaderData();
  const groups = faqs.reduce((acc, item) => {
    const key = item.category || "General";
    acc[key] = acc[key] ? [...acc[key], item] : [item];
    return acc;
  }, {});

  return (
    <>
      <PageHero
        eyebrow="Questions"
        title="Everything families ask us"
        description="If your question isn't here, message us — we answer honestly, usually the same day."
        image={settings.hero_image_1}
      />

      <section className="container-x py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[0.35fr_0.65fr] lg:gap-16">
          <nav aria-label="Question categories" className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-[0.58rem] font-semibold  tracking-[0.26em] text-gold">Categories</p>
            <ul className="mt-4 space-y-2">
              {Object.keys(groups).map((category) => (
                <li key={category}>
                  <a
                    href={`#${category.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-[0.9rem] text-muted-foreground transition-colors hover:text-forest"
                  >
                    {category}
                  </a>
                </li>
              ))}
            </ul>
            <Link
              to="/contact"
              className="mt-7 inline-flex items-center gap-2 text-[0.62rem] font-semibold  tracking-[0.2em] text-forest"
            >
              <MessageCircle className="h-4 w-4 text-gold" aria-hidden="true" />
              Ask us directly
            </Link>
          </nav>

          <div className="space-y-14">
            {Object.entries(groups).map(([category, items], groupIndex) => (
              <Reveal key={category} delay={groupIndex * 0.04}>
                <section id={category.toLowerCase().replace(/\s+/g, "-")} aria-label={category}>
                  <h2 className="font-display text-[1.6rem] text-foreground">{category}</h2>
                  <FaqAccordion items={items} className="mt-4" />
                </section>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCta settings={settings} />
    </>
  );
}