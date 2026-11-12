import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import { inr } from "@/lib/format";

export default function ServiceCard({ service }) {
  return (
    <Link to="/services/$slug" params={{ slug: service.slug }} className="group block h-full">
      <article className="flex h-full flex-col border border-border bg-card transition-transform duration-500 hover:-translate-y-1">
        <div className="relative aspect-[16/11] w-full overflow-hidden bg-muted">
          <Image
            src={service.image_url}
            alt={service.title}
            className="absolute inset-0 block h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.06]"
          />
          <span className="absolute left-4 top-4 rounded-full bg-bone/90 px-3 py-1 text-[0.55rem] font-semibold  tracking-[0.2em] text-forest">
            {service.category}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-display text-[1.4rem] leading-tight text-foreground">{service.title}</h3>
          <p className="mt-2 flex-1 text-[0.9rem] leading-relaxed text-muted-foreground">
            {service.short_description}
          </p>
          <div className="mt-5 flex items-center justify-between border-t border-border/70 pt-4">
            <span className="text-[0.72rem]  tracking-[0.16em] text-muted-foreground">
              {service.price_visible && service.starting_price ? `From ${inr(service.starting_price)}` : "Pricing on request"}
            </span>
            <ArrowUpRight
              className="h-4 w-4 text-gold transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </div>
        </div>
      </article>
    </Link>
  );
}