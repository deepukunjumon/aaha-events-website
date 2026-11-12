import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { motion, useReducedMotion } from "framer-motion";
import { Loader2, Printer, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHero from "@/components/site/PageHero";
import { lookupBooking } from "@/lib/server-fns";
import { formatDate, inr, whatsappLink } from "@/lib/format";
import { cn } from "@/lib/utils";
import { loadSiteContent } from "@/lib/server-fns";

export const Route = createFileRoute("/_site/booking-lookup")({
  loader: () => loadSiteContent(),
  head: () => ({
    meta: [
      { title: "Check your booking — Aaha Events" },
      {
        name: "description",
        content:
          "Enter your booking ID and phone number to check the status of your Aaha Events booking, see what is due and print your receipt.",
      },
      { property: "og:title", content: "Check your booking | Aaha Events" },
    ],
  }),
  component: LookupPage,
});

const STATUS_LABEL = {
  new: "Date requested",
  confirmed: "Confirmed",
  completed: "Completed",
  cancelled: "Cancelled",
};

function LookupPage() {
  const { settings } = Route.useLoaderData();
  const reduce = useReducedMotion();
  const search = useServerFn(lookupBooking);
  const [form, setForm] = useState({ booking_id: "", phone: "" });
  const [status, setStatus] = useState("idle");
  const [booking, setBooking] = useState(null);
  const [message, setMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const response = await search({ data: form });
      if (response.found) {
        setBooking(response.booking);
        setStatus("found");
      } else {
        setBooking(null);
        setStatus("missing");
        setMessage("We couldn't find a booking with that ID and phone number. Check both, or message us.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Something went wrong on our side. Please try again in a moment.");
    }
  }

  const advancePaid = booking?.payment_status === "advance_paid" || booking?.payment_status === "paid";
  const paidInFull = booking?.payment_status === "paid";
  const balance = paidInFull ? 0 : advancePaid ? Number(booking?.estimate || 0) - Number(booking?.advance || 0) : Number(booking?.estimate || 0);

  return (
    <>
      <PageHero
        eyebrow="Booking lookup"
        title="Check your booking"
        description="Enter the booking ID we gave you, and the phone number you booked with."
        image={settings.hero_image_2}
      />

      <section className="container-x py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <form onSubmit={handleSubmit} className="border border-border bg-card p-7 sm:p-9">
            <div className="space-y-4">
              <label className="block">
                <span className="mb-2 block text-[0.58rem] font-semibold  tracking-[0.2em] text-muted-foreground">
                  Booking ID
                </span>
                <input
                  className="field "
                  value={form.booking_id}
                  onChange={(event) => setForm({ ...form, booking_id: event.target.value.to() })}
                  placeholder="AE-XXXXXXX"
                  required
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-[0.58rem] font-semibold  tracking-[0.2em] text-muted-foreground">
                  Phone number
                </span>
                <input
                  className="field"
                  value={form.phone}
                  onChange={(event) => setForm({ ...form, phone: event.target.value })}
                  inputMode="tel"
                  placeholder="The number you booked with"
                  required
                />
              </label>
            </div>

            <Button
              type="submit"
              disabled={status === "loading"}
              className="mt-6 h-12 w-full rounded-sm bg-forest text-[0.62rem] font-semibold  tracking-[0.22em] text-bone hover:bg-forest/90"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                  Checking
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" aria-hidden="true" />
                  Find my booking
                </>
              )}
            </Button>

            {status !== "found" && message ? (
              <p role="alert" className="mt-4 border-l-2 border-destructive pl-3 text-[0.85rem] text-destructive">
                {message}
              </p>
            ) : null}

            <p className="mt-6 text-[0.74rem] leading-relaxed text-muted-foreground">
              Lost your booking ID? Message us on WhatsApp with your event date and we will find it.
            </p>
          </form>

          <div>
            {status === "found" && booking ? (
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="border border-border bg-card p-7 sm:p-9"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-[0.58rem] font-semibold  tracking-[0.26em] text-gold">
                      Booking {booking.booking_id}
                    </p>
                    <h2 className="mt-2 font-display text-[1.7rem] leading-tight text-foreground">
                      {booking.package_name || booking.service_name}
                    </h2>
                  </div>
                  <span
                    className={cn(
                      "rounded-full px-3 py-1.5 text-[0.58rem] font-semibold  tracking-[0.18em]",
                      booking.status === "confirmed" || booking.status === "completed"
                        ? "bg-forest text-bone"
                        : booking.status === "cancelled"
                          ? "bg-destructive/10 text-destructive"
                          : "bg-gold/20 text-forest"
                    )}
                  >
                    {STATUS_LABEL[booking.status] || booking.status}
                  </span>
                </div>

                <dl className="mt-7 space-y-3 text-[0.9rem]">
                  {[
                    ["Service", booking.service_name],
                    ["Date", formatDate(booking.event_date)],
                    ["Time", booking.time_slot],
                    ["Guests", booking.guest_count ? `${booking.guest_count}` : "—"],
                    ["Location", booking.location || "—"],
                    ["Add-ons", booking.addons?.length ? booking.addons.join(", ") : "None"],
                  ].map(([label, value]) => (
                    <div key={label} className="flex items-baseline justify-between gap-6 border-b border-border/70 pb-3 last:border-b-0">
                      <dt className="text-[0.58rem]  tracking-[0.16em] text-muted-foreground">{label}</dt>
                      <dd className="text-right text-foreground">{value}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-7 border border-border bg-secondary/50 p-5">
                  <div className="flex items-baseline justify-between text-[0.9rem]">
                    <span className="text-muted-foreground">Estimate</span>
                    <span className="font-display text-[1.2rem] text-foreground">{inr(booking.estimate) || "On request"}</span>
                  </div>
                  <div className="mt-2 flex items-baseline justify-between text-[0.9rem]">
                    <span className="text-muted-foreground">Advance</span>
                    <span className="text-foreground">
                      {inr(booking.advance)} · {advancePaid ? "paid" : "due"}
                    </span>
                  </div>
                  <div className="mt-3 flex items-baseline justify-between border-t border-border pt-3 text-[0.9rem]">
                    <span className="text-muted-foreground">Balance</span>
                    <span className="font-semibold text-forest">{inr(balance)}</span>
                  </div>
                </div>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Button
                    type="button"
                    onClick={() => window.print()}
                    className="h-11 rounded-sm bg-forest px-6 text-[0.6rem] font-semibold  tracking-[0.22em] text-bone hover:bg-forest/90"
                  >
                    <Printer className="mr-2 h-4 w-4" aria-hidden="true" />
                    Print receipt
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="h-11 rounded-sm border-border px-6 text-[0.6rem] font-semibold  tracking-[0.22em] text-forest hover:border-gold"
                  >
                    <a
                      href={whatsappLink(
                        settings.whatsapp_number,
                        `Hi Aaha Events, I'd like to pay the balance for booking ${booking.booking_id}.`
                      )}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Pay or discuss balance
                    </a>
                  </Button>
                </div>
              </motion.div>
            ) : (
              <div className="border border-dashed border-border p-8 text-center">
                <p className="font-display text-[1.35rem] text-foreground">Your booking will appear here</p>
                <p className="mx-auto mt-2 max-w-sm text-[0.9rem] leading-relaxed text-muted-foreground">
                  Status, what is due and a printable receipt — all in one place once you enter your
                  booking ID.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}