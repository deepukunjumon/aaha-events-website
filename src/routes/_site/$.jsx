import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_site/$")({
  head: () => ({
    meta: [{ title: "Page not found | Aaha Events" }, { name: "robots", content: "noindex" }],
  }),
  component: NotFoundPage,
});

function NotFoundPage() {
  return (
    <section className="container-x flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/50 text-gold">
        <Compass className="h-6 w-6" aria-hidden="true" />
      </span>
      <p className="mt-8 text-[0.62rem] font-semibold  tracking-[0.32em] text-gold">Error 404</p>
      <h1 className="display-lg mt-5 max-w-2xl text-balance text-foreground">
        This page has left the celebration
      </h1>
      <p className="mt-4 max-w-md text-[0.98rem] leading-relaxed text-muted-foreground">
        The link may be old, or the page may have moved. Everything worth seeing is still a click away.
      </p>
      <div className="mt-9 flex flex-col gap-3 sm:flex-row">
        <Button asChild className="h-12 rounded-sm bg-forest px-8 text-[0.62rem] font-semibold  tracking-[0.22em] text-bone hover:bg-forest/90">
          <Link to="/">
            Back to home
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          className="h-12 rounded-sm border-border px-8 text-[0.62rem] font-semibold  tracking-[0.22em] text-forest hover:border-gold"
        >
          <Link to="/gallery">See the gallery</Link>
        </Button>
      </div>
      <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-3 text-[0.66rem] font-semibold  tracking-[0.2em] text-muted-foreground">
        <Link to="/services" className="hover:text-forest">Services</Link>
        <Link to="/gallery" className="hover:text-forest">Gallery</Link>
        <Link to="/book" className="hover:text-forest">Book an event</Link>
        <Link to="/contact" className="hover:text-forest">Contact</Link>
        <Link to="/faq" className="inline-flex items-center gap-1 hover:text-forest">
          FAQ
          <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}