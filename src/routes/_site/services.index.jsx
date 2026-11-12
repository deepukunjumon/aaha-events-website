import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import PageHero from "@/components/site/PageHero";
import ServiceCard from "@/components/services/ServiceCard";
import FinalCta from "@/components/home/FinalCta";
import { loadSiteContent } from "@/lib/server-fns";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_site/services/")({
  loader: () => loadSiteContent(),
  head: () => ({
    meta: [
      { title: "Services — Weddings, engagements, birthdays & corporate events | Aaha Events" },
      {
        name: "description",
        content:
          "Wedding planning, engagement ceremonies, birthdays, corporate events, stage shows and décor styling across Kottayam, Idukki and Kochi.",
      },
      { property: "og:title", content: "Services | Aaha Events" },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const { services, settings } = Route.useLoaderData();
  const reduce = useReducedMotion();
  const categories = ["All", ...Array.from(new Set(services.map((service) => service.category).filter(Boolean)))];
  const [active, setActive] = useState("All");
  const visible = active === "All" ? services : services.filter((service) => service.category === active);

  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Every kind of celebration, one steady team"
        description="Pick the celebration closest to yours. Each service page lists what is included, what can be added, and where the pricing starts."
        image={settings.hero_image_1}
      />

      <section className="container-x py-14 sm:py-20">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter services by category">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={active === category}
              onClick={() => setActive(category)}
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

        <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((service, i) => (
            <motion.div
              key={service.slug}
              initial={reduce ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: (i % 3) * 0.06 }}
            >
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </div>

        {!visible.length ? (
          <p className="mt-16 text-center text-muted-foreground">
            No services in this category yet — tell us what you are planning and we will advise.
          </p>
        ) : null}
      </section>

      <FinalCta settings={settings} />
    </>
  );
}