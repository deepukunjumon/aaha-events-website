import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";
import Logo from "@/components/common/Logo";
import { telLink } from "@/lib/format";

const QUICK = [
  { label: "About us", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Gallery", to: "/gallery" },
  { label: "Book an event", to: "/book" },
  { label: "Contact", to: "/contact" },
  { label: "Journal", to: "/blog" },
  { label: "FAQ", to: "/faq" },
];

export default function Footer({ settings = {}, services = [] }) {
  return (
    <footer className="bg-forest text-bone">
      <div className="container-x py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.7fr_0.8fr_1fr]">
          <div>
            <Logo tone="light" />
            <p className="mt-6 max-w-xs text-[0.92rem] leading-relaxed text-bone/65">
              {settings.tagline}
            </p>
            <div className="mt-7 flex gap-3">
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
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-bone/20 text-bone/70 transition-colors hover:border-gold hover:text-gold"
                  >
                    <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                ) : null
              )}
            </div>
          </div>

          <nav aria-label="Quick links">
            <h2 className="text-[0.58rem] font-semibold  tracking-[0.3em] text-gold">Explore</h2>
            <ul className="mt-5 space-y-2.5 text-[0.88rem] text-bone/65">
              {QUICK.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="transition-colors hover:text-bone">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Services">
            <h2 className="text-[0.58rem] font-semibold  tracking-[0.3em] text-gold">Services</h2>
            <ul className="mt-5 space-y-2.5 text-[0.88rem] text-bone/65">
              {services.slice(0, 6).map((service) => (
                <li key={service.slug}>
                  <Link
                    to="/services/$slug"
                    params={{ slug: service.slug }}
                    className="transition-colors hover:text-bone"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-[0.58rem] font-semibold  tracking-[0.3em] text-gold">Visit us</h2>
            <ul className="mt-5 space-y-4 text-[0.88rem] text-bone/65">
              <li className="flex gap-3">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-gold/70" aria-hidden="true" />
                <a href={settings.maps_url} target="_blank" rel="noreferrer" className="hover:text-bone">
                  {settings.address}
                </a>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-1 h-4 w-4 shrink-0 text-gold/70" aria-hidden="true" />
                <a href={telLink(settings.phone)} className="hover:text-bone">
                  {settings.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-1 h-4 w-4 shrink-0 text-gold/70" aria-hidden="true" />
                <a href={`mailto:${settings.email}`} className="hover:text-bone">
                  {settings.email}
                </a>
              </li>
            </ul>
            <p className="mt-5 text-[0.78rem] leading-relaxed text-bone/45">{settings.hours}</p>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-bone/15 pt-7 text-[0.72rem] text-bone/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {settings.brand_name || "Aaha Events"}. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link to="/privacy" className="hover:text-bone">Privacy</Link>
            <Link to="/terms" className="hover:text-bone">Terms</Link>
            <Link to="/refund-policy" className="hover:text-bone">Cancellation &amp; refund</Link>
            <Link to="/studio" className="inline-flex items-center gap-1 hover:text-bone">
              Content studio
              <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}