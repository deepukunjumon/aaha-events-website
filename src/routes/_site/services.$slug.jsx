import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Check, MessageCircle } from "lucide-react";
import { Image } from "@/components/ui/image";
import { Button } from "@/components/ui/button";
import PageHero from "@/components/site/PageHero";
import SectionHeading from "@/components/common/SectionHeading";
import Reveal from "@/components/common/Reveal";
import FaqAccordion from "@/components/common/FaqAccordion";
import Testimonials from "@/components/home/Testimonials";
import FinalCta from "@/components/home/FinalCta";
import { loadSiteContent } from "@/lib/server-fns";
import { inr, whatsappLink } from "@/lib/format";

export const Route = createFileRoute("/_site/services/$slug")({
  loader: async ({ params }) => {
    const data = await loadSiteContent();
    const service = data.services.find((item) => item.slug === params.slug);
    if (!service) throw notFound();
    return { ...data, service };
  },
  head: ({ loaderData }) => {
    const service = loaderData?.service;
    return {
      meta: [
        { title: `${service?.title || "Service"} — Aaha Events, Kerala` },
        { name: "description", content: service?.short_description || "" },
        { property: "og:title", content: `${service?.title || "Service"} | Aaha Events` },
        { property: "og:description", content: service?.short_description || "" },
        { property: "og:image", content: service?.image_url || "" },
      ],
    };
  },
  component: ServiceDetailPage,
});

function ServiceDetailPage() {
  const { service, packages, testimonials, faqs, settings } = Route.useLoaderData();
  const relatedPackages = packages.filter(
    (pkg) => !pkg.service_slug || pkg.service_slug === service.slug
  );
  const bookHref = service.bookable ? "/book" : "/contact";

  return (
    <>
      <PageHero
        eyebrow={service.category}
        title={service.title}
        description={service.short_description}
        image={service.image_url}
      >
        <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
          {service.price_visible && service.starting_price ? (
            <p className="text-[0.72rem]  tracking-[0.2em] text-bone/60">
              Starting from{" "}
              <span className="ml-2 font-display text-[1.4rem] normal-case tracking-normal text-bone">
                {inr(service.starting_price)}
              </span>
            </p>
          ) : null}
          <div className="flex flex-col gap-3 sm:flex-row">
            {service.bookable ? (
              <Button asChild className="h-12 rounded-sm bg-gold px-8 text-[0.64rem] font-semibold  tracking-[0.24em] text-ink hover:bg-gold/85">
                <Link to="/book" search={{ service: service.slug }}>
                  Book this service
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            ) : null}
            <Button
              asChild
              variant="outline"
              className="h-12 rounded-sm border-bone/35 bg-transparent px-8 text-[0.64rem] font-semibold  tracking-[0.24em] text-bone hover:border-bone hover:bg-bone/10 hover:text-bone"
            >
              <a
                href={whatsappLink(
                  settings.whatsapp_number,
                  `Hi Aaha Events, I'd like to know more about ${service.title}.`
                )}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle className="mr-2 h-4 w-4" aria-hidden="true" />
                {service.bookable ? "Ask a question" : "Enquire"}
              </a>
            </Button>
          </div>
        </div>
      </PageHero>

      <section className="container-x py-20 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div>
            <SectionHeading eyebrow="Overview" title="What this looks like on the day" />
            <Reveal delay={0.08}>
              <div className="mt-6 space-y-5 text-[1rem] leading-[1.75] text-muted-foreground">
                {(service.description || "").split("\n\n").map((paragraph) => (
                  <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                ))}
              </div>
            </Reveal>

            {service.addons?.length ? (
              <Reveal delay={0.14}>
                <h3 className="mt-10 text-[0.6rem] font-semibold  tracking-[0.26em] text-gold">
                  Optional add-ons
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {service.addons.map((addon) => (
                    <span
                      key={addon}
                      className="rounded-full border border-border px-4 py-2 text-[0.78rem] text-muted-foreground"
                    >
                      {addon}
                    </span>
                  ))}
                </div>
              </Reveal>
            ) : null}
          </div>

          <Reveal delay={0.1}>
            <div className="border border-border bg-card p-8 sm:p-10">
              <h2 className="text-[0.6rem] font-semibold  tracking-[0.26em] text-gold">
                What&apos;s included
              </h2>
              <ul className="mt-6 space-y-4">
                {(service.included || []).map((item) => (
                  <li key={item} className="flex gap-3 text-[0.95rem] leading-relaxed text-foreground">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 border-t border-border pt-6">
                <p className="text-[0.85rem] leading-relaxed text-muted-foreground">
                  Every quotation is itemised before you commit. Travel outside Kottayam district is
                  quoted separately.
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {service.gallery?.length ? (
          <div className="mt-16 grid gap-4 sm:grid-cols-3">
            {service.gallery.slice(0, 3).map((src, i) => (
              <Reveal key={src + i} delay={i * 0.06}>
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted arch-sm">
                  <Image
                    src={src}
                    alt={`${service.title} — moment ${i + 1}`}
                    className="absolute inset-0 block h-full w-full object-cover"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        ) : null}
      </section>

      {relatedPackages.length ? (
        <section className="bg-secondary/60 py-20 sm:py-24">
          <div className="container-x">
            <SectionHeading
              eyebrow="Collections"
              title="Ways to book this service"
              description="Prices are starting points. We shape the final quote around your date, guest count and venue."
              className="max-w-2xl"
            />
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {relatedPackages.slice(0, 3).map((pkg, i) => (
                <Reveal key={pkg.name} delay={i * 0.07}>
                  <div className="flex h-full flex-col border border-border bg-card p-7">
                    <h3 className="font-display text-[1.5rem] text-foreground">{pkg.name}</h3>
                    <p className="mt-2 text-[0.88rem] leading-relaxed text-muted-foreground">{pkg.tagline}</p>
                    <p className="mt-5 font-display text-[1.5rem] text-forest">
                      {pkg.price_visible && pkg.price ? inr(pkg.price) : "On request"}
                    </p>
                    <ul className="mt-5 flex-1 space-y-2.5 text-[0.87rem] text-muted-foreground">
                      {(pkg.inclusions || []).slice(0, 4).map((item) => (
                        <li key={item} className="flex gap-2.5">
                          <Check className="mt-1 h-3.5 w-3.5 shrink-0 text-gold" aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      asChild
                      className="mt-7 h-11 rounded-sm bg-forest text-[0.62rem] font-semibold  tracking-[0.22em] text-bone hover:bg-forest/90"
                    >
                      <Link to={bookHref} search={service.bookable ? { service: service.slug, package: pkg.name } : undefined}>
                        {service.bookable ? "Book" : "Enquire"}
                      </Link>
                    </Button>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <Testimonials testimonials={testimonials} />

      <section className="container-x py-20 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeading eyebrow="Good to know" title="Questions about this service" />
          <FaqAccordion items={faqs.slice(0, 4)} />
        </div>
      </section>

      <FinalCta settings={settings} />
    </>
  );
}