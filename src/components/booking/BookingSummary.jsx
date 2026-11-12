import { CalendarDays, Clock3, MapPin, Sparkles, Users } from "lucide-react";
import { formatDate, inr } from "@/lib/format";

export default function BookingSummary({ service, pkg, date, slot, addons = [], guests, estimate, advance, advancePercent = 25 }) {
  return (
    <div className="border border-border bg-card p-6">
      <h2 className="text-[0.58rem] font-semibold  tracking-[0.26em] text-gold">Your selection</h2>
      <dl className="mt-5 space-y-4 text-[0.88rem]">
        <div className="flex gap-3">
          <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-gold/70" aria-hidden="true" />
          <div>
            <dt className="text-[0.58rem]  tracking-[0.18em] text-muted-foreground">Service</dt>
            <dd className="text-foreground">{service?.title || "Not chosen yet"}</dd>
            {pkg ? <dd className="text-[0.8rem] text-muted-foreground">{pkg.name}</dd> : null}
          </div>
        </div>
        <div className="flex gap-3">
          <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-gold/70" aria-hidden="true" />
          <div>
            <dt className="text-[0.58rem]  tracking-[0.18em] text-muted-foreground">Date</dt>
            <dd className="text-foreground">{date ? formatDate(date) : "Not chosen yet"}</dd>
          </div>
        </div>
        <div className="flex gap-3">
          <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-gold/70" aria-hidden="true" />
          <div>
            <dt className="text-[0.58rem]  tracking-[0.18em] text-muted-foreground">Time</dt>
            <dd className="text-foreground">{slot || "Not chosen yet"}</dd>
          </div>
        </div>
        {(addons.length || guests) ? (
          <div className="flex gap-3">
            <Users className="mt-0.5 h-4 w-4 shrink-0 text-gold/70" aria-hidden="true" />
            <div>
              <dt className="text-[0.58rem]  tracking-[0.18em] text-muted-foreground">Add-ons &amp; guests</dt>
              <dd className="text-foreground">
                {addons.length ? addons.join(", ") : "No add-ons"}
                {guests ? ` · ${guests} guests` : ""}
              </dd>
            </div>
          </div>
        ) : null}
      </dl>

      <div className="mt-6 space-y-2 border-t border-border pt-5 text-[0.9rem]">
        <div className="flex items-baseline justify-between">
          <dt className="text-muted-foreground">Starting estimate</dt>
          <dd className="font-display text-[1.15rem] text-foreground">{estimate ? inr(estimate) : "On request"}</dd>
        </div>
        <div className="flex items-baseline justify-between">
          <dt className="text-muted-foreground">Advance to confirm ({advancePercent}%)</dt>
          <dd className="font-semibold text-forest">{advance ? inr(advance) : "—"}</dd>
        </div>
      </div>
      <p className="mt-4 flex gap-2 text-[0.72rem] leading-relaxed text-muted-foreground">
        <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold/70" aria-hidden="true" />
        Final pricing is confirmed after we review your date, venue and guest count. Nothing is charged
        until you approve the quotation.
      </p>
    </div>
  );
}