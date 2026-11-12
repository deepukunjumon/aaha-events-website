import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import Hero from "@/components/home/Hero";
import StatsStrip from "@/components/home/StatsStrip";
import ServicesGrid from "@/components/home/ServicesGrid";
import WhyUs from "@/components/home/WhyUs";
import FeaturedWork from "@/components/home/FeaturedWork";
import ProcessSteps from "@/components/home/ProcessSteps";
import PackagesHighlight from "@/components/home/PackagesHighlight";
import Testimonials from "@/components/home/Testimonials";
import PartnersMarquee from "@/components/home/PartnersMarquee";
import InstagramGrid from "@/components/home/InstagramGrid";
import FinalCta from "@/components/home/FinalCta";
import FaqAccordion from "@/components/common/FaqAccordion";
import SectionHeading from "@/components/common/SectionHeading";
import Reveal from "@/components/common/Reveal";
import { loadSiteContent } from "@/lib/server-fns";

export const Route = createFileRoute("/_site/")({
  loader: () => loadSiteContent(),
  head: ({ loaderData }) => {
    const settings = loaderData?.settings;
    return {
      meta: [
        { title: `${settings?.brand_name || "Aaha Events"} — Weddings & Celebrations in Mundakayam, Kerala` },
        {
          name: "description",
          content:
            settings?.hero_subheadline ||
            "Aaha Events plans and runs weddings, engagements, birthdays and corporate celebrations across Kerala.",
        },
        { property: "og:title", content: settings?.hero_headline || "Aaha Events" },
        { property: "og:description", content: settings?.hero_subheadline || "" },
        { property: "og:image", content: settings?.hero_image_1 || "" },
      ],
    };
  },
  component: HomePage,
});

function HomePage() {
  const data = Route.useLoaderData();
  const { settings, stats, services, highlights, albums, packages, testimonials, partners, galleryItems, faqs } = data;
  const why = highlights.filter((item) => item.kind === "why");
  const process = highlights.filter((item) => item.kind === "process");
  const instagramImages = galleryItems
    .filter((item) => item.type === "image")
    .map((item) => item.url)
    .slice(0, 6);

  return (
    <>
      <Hero settings={settings} />
      <StatsStrip stats={stats} />
      <ServicesGrid services={services} />
      <WhyUs points={why} />
      <FeaturedWork albums={albums} />
      <ProcessSteps steps={process} />
      {/* <PackagesHighlight packages={packages} /> */}
      <Testimonials testimonials={testimonials} />
      <PartnersMarquee partners={partners} />
      <InstagramGrid
        images={instagramImages}
        url={settings.instagram_url}
        handle={settings.instagram_handle}
      />

      <section className="container-x border-t border-border/70 py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Questions"
              title="The things families ask first"
              description="Still unsure about something? Message us — we answer honestly, even when the answer is that you don't need us for this."
            />
            <Reveal delay={0.1}>
              <Link
                to="/faq"
                className="gold-underline mt-8 inline-flex items-center gap-2 text-[0.68rem] font-semibold  tracking-[0.24em] text-foreground"
              >
                All questions
                <ArrowUpRight className="h-4 w-4 text-gold" aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
          <FaqAccordion items={faqs.slice(0, 5)} />
        </div>
      </section>

      <FinalCta settings={settings} />
    </>
  );
}