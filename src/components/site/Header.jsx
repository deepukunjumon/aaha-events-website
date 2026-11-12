import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Facebook, Instagram, Menu, Phone, X, Youtube } from "lucide-react";
import Logo from "@/components/common/Logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { telLink, whatsappLink } from "@/lib/format";

const NAV = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact", to: "/contact" },
];

const EASE = [0.22, 1, 0.36, 1];

export default function Header({ settings = {} }) {
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-50">
        <div className={cn("transition-all duration-500", scrolled ? "pt-2" : "pt-3 sm:pt-5")}>
          <div className="container-x">
            <div
              className={cn(
                "flex items-center justify-between gap-4 rounded-full border px-4 transition-all duration-500 sm:px-6",
                scrolled
                  ? "border-border/80 bg-bone/90 py-2.5 shadow-[0_14px_50px_-30px_rgba(27,48,34,0.65)] backdrop-blur-md"
                  : "border-border/50 bg-bone/70 py-3 backdrop-blur-sm"
              )}
            >
              <Logo />

              <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
                {NAV.map((item) => {
                  const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      data-active={active}
                      className={cn(
                        "gold-underline text-[0.68rem] font-semibold  tracking-[0.2em] transition-colors",
                        active ? "text-forest" : "text-muted-foreground hover:text-forest"
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="flex items-center gap-2 sm:gap-3">
                <a
                  href={telLink(settings.phone)}
                  className="hidden items-center gap-2 text-[0.7rem] font-semibold  tracking-[0.18em] text-forest xl:flex"
                >
                  <Phone className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
                  {settings.phone}
                </a>
                <Button
                  asChild
                  className="hidden h-10 rounded-full bg-forest px-6 text-[0.62rem] font-semibold  tracking-[0.24em] text-bone hover:bg-forest/90 sm:inline-flex"
                >
                  <Link to="/book">Book now</Link>
                </Button>
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  aria-label="Open menu"
                  aria-expanded={open}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-forest transition-colors hover:border-gold hover:text-gold lg:hidden"
                >
                  <Menu className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[70] flex flex-col bg-forest text-bone lg:hidden"
            initial={reduce ? { opacity: 1 } : { opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <div className="flex items-center justify-between px-5 py-5">
              <Logo tone="light" />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-bone/25 text-bone"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center gap-1 px-6">
              {NAV.map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={reduce ? false : { opacity: 0, x: 28 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.55, ease: EASE, delay: 0.12 + i * 0.06 }}
                >
                  <Link
                    to={item.to}
                    className="group flex items-baseline justify-between border-b border-bone/12 py-4"
                  >
                    <span className="font-display text-[2rem] leading-none text-bone/90 transition-colors group-hover:text-gold">
                      {item.label}
                    </span>
                    <span className="text-[0.6rem]  tracking-[0.3em] text-bone/35">
                      0{i + 1}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="space-y-5 px-6 pb-10">
              <Button asChild className="h-12 w-full rounded-sm bg-gold text-[0.66rem] font-semibold  tracking-[0.24em] text-ink hover:bg-gold/85">
                <Link to="/book">
                  Book an event
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <div className="flex items-center justify-between text-[0.72rem] tracking-wide text-bone/60">
                <a href={telLink(settings.phone)} className="hover:text-bone">
                  {settings.phone}
                </a>
                <a
                  href={whatsappLink(settings.whatsapp_number, "Hi Aaha Events, I'd like to know more.")}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-bone"
                >
                  WhatsApp
                </a>
              </div>
              <div className="flex gap-4 text-bone/50">
                <a href={settings.instagram_url || "#"} target="_blank" rel="noreferrer" aria-label="Instagram">
                  <Instagram className="h-4 w-4" aria-hidden="true" />
                </a>
                <a href={settings.facebook_url || "#"} target="_blank" rel="noreferrer" aria-label="Facebook">
                  <Facebook className="h-4 w-4" aria-hidden="true" />
                </a>
                <a href={settings.youtube_url || "#"} target="_blank" rel="noreferrer" aria-label="YouTube">
                  <Youtube className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}