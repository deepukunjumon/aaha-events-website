import { createFileRoute } from "@tanstack/react-router";
import { Clock, Facebook, Instagram, Mail, MapPin, MessageCircle, Phone, Youtube } from "lucide-react";
import PageHero from "@/components/site/PageHero";
import EnquiryForm from "@/components/forms/EnquiryForm";
import FinalCta from "@/components/home/FinalCta";
import { loadSiteContent } from "@/lib/server-fns";
import { telLink, whatsappLink } from "@/lib/format";

export const Route = createFileRoute("/_site/contact")({
  loader: () => loadSiteContent(),
  head: () => ({
    meta: [
      { title: "Contact Aaha Events — event planners in Mundakayam, Kerala" },
      {
        name: "description",
        content:
          "Call, WhatsApp or send an enquiry to Aaha Events in Mundakayam, Kottayam. We reply within one working day with honest advice and a clear next step.",
      },
      { property: "og:title", content: "Contact | Aaha Events" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { settings, services } = Route.useLoaderData();
  const eventTypes = Array.from(new Set(services.map((service) => service.title).filter(Boolean)));
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
    settings.address || "Mundakayam, Kerala"
  )}&z=13&output=embed`;

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us about your celebration"
        description="Share the date and the feeling you are after. A planner — not a call centre — will write back within one working day."
        image={settings.hero_image_2}
      />

      <section className="container-x py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:gap-14">
          <div>
            <h2 className="font-display text-[1.7rem] text-foreground">Send an enquiry</h2>
            <p className="mt-2 max-w-xl text-[0.95rem] leading-relaxed text-muted-foreground">
              Fields marked with an asterisk are required. Everything else helps us quote more accurately.
            </p>
            <div className="mt-7">
              <EnquiryForm eventTypes={eventTypes} source="contact" />
            </div>
          </div>

          <aside className="space-y-6">
            <div className="border border-border bg-card p-7">
              <h2 className="text-[0.6rem] font-semibold  tracking-[0.26em] text-gold">
                Talk to us directly
              </h2>
              <ul className="mt-6 space-y-5 text-[0.92rem]">
                <li>
                  <a href={telLink(settings.phone)} className="flex items-start gap-3 text-foreground hover:text-forest">
                    <Phone className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                    <span>
                      <span className="block text-[0.6rem]  tracking-[0.18em] text-muted-foreground">Call</span>
                      {settings.phone}
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={whatsappLink(settings.whatsapp_number, "Hi Aaha Events, I'd like to know more about my event.")}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-start gap-3 text-foreground hover:text-forest"
                  >
                    <MessageCircle className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                    <span>
                      <span className="block text-[0.6rem]  tracking-[0.18em] text-muted-foreground">WhatsApp</span>
                      Chat with a planner
                    </span>
                  </a>
                </li>
                <li>
                  <a href={`mailto:${settings.email}`} className="flex items-start gap-3 text-foreground hover:text-forest">
                    <Mail className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                    <span className="break-all">
                      <span className="block text-[0.6rem]  tracking-[0.18em] text-muted-foreground">Email</span>
                      {settings.email}
                    </span>
                  </a>
                </li>
                <li className="flex items-start gap-3 text-foreground">
                  <MapPin className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                  <span>
                    <span className="block text-[0.6rem]  tracking-[0.18em] text-muted-foreground">Studio</span>
                    {settings.address}
                  </span>
                </li>
                <li className="flex items-start gap-3 text-foreground">
                  <Clock className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                  <span>
                    <span className="block text-[0.6rem]  tracking-[0.18em] text-muted-foreground">Hours</span>
                    {settings.hours}
                  </span>
                </li>
              </ul>
              <div className="mt-7 flex gap-3 border-t border-border pt-6">
                {[
                  { href: settings.instagram_url, label: "Instagram", Icon: Instagram },
                  { href: settings.facebook_url, label: "Facebook", Icon: Facebook },
                  { href: settings.youtube_url, label: "YouTube", Icon: Youtube },
                ].map(({ href, label, Icon }) =>
                  href ? (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={label}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-gold hover:text-gold"
                    >
                      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  ) : null
                )}
              </div>
            </div>

            <div className="border border-border bg-card p-7">
              <h2 className="text-[0.6rem] font-semibold  tracking-[0.26em] text-gold">Planning ahead?</h2>
              <p className="mt-3 text-[0.9rem] leading-relaxed text-muted-foreground">
                For weddings, four to eight months gives us room to secure the venue and vendors you want.
                You can also request a date online and we will confirm availability within a day.
              </p>
              <a
                href="/book"
                className="mt-5 inline-flex text-[0.64rem] font-semibold  tracking-[0.22em] text-forest underline decoration-gold underline-offset-4"
              >
                Start a booking request
              </a>
            </div>
          </aside>
        </div>

        <div className="mt-14 overflow-hidden border border-border">
          <iframe
            title="Aaha Events studio location map"
            src={mapSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[340px] w-full sm:h-[420px]"
          />
        </div>
        <a
          href={settings.maps_url}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center gap-2 text-[0.64rem] font-semibold  tracking-[0.2em] text-muted-foreground hover:text-forest"
        >
          <MapPin className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
          Open in Google Maps
        </a>
      </section>

      <FinalCta settings={settings} />
    </>
  );
}