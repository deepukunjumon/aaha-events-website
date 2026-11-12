import { createFileRoute } from "@tanstack/react-router";
import PageHero from "@/components/site/PageHero";
import BookingWizard from "@/components/booking/BookingWizard";
import { loadSiteContent } from "@/lib/server-fns";

export const Route = createFileRoute("/_site/book")({
  loader: () => loadSiteContent(),
  validateSearch: (search) => ({
    service: typeof search.service === "string" ? search.service : undefined,
    package: typeof search.package === "string" ? search.package : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Book an event — request your date | Aaha Events" },
      {
        name: "description",
        content:
          "Request your event date with Aaha Events in five steps: service, date, add-ons, details and review. No payment is taken until you approve the quotation.",
      },
      { property: "og:title", content: "Book an event | Aaha Events" },
    ],
  }),
  component: BookPage,
});

function BookPage() {
  const { services, packages, settings } = Route.useLoaderData();
  const search = Route.useSearch();

  return (
    <>
      <PageHero
        eyebrow="Booking"
        title="Request your date"
        description="Five short steps. We confirm availability within one working day, then send an itemised quotation before anything is paid."
        image={settings.hero_image_1}
      />
      <BookingWizard
        services={services}
        packages={packages}
        settings={settings}
        initialService={search.service}
        initialPackage={search.package}
      />
    </>
  );
}