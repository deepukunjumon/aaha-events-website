import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  ChevronUp,
  Loader2,
  MessageCircle,
  PartyPopper,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import BookingSummary from "@/components/booking/BookingSummary";
import { createBooking } from "@/lib/server-fns";
import { formatDate, inr, whatsappLink } from "@/lib/format";
import { cn } from "@/lib/utils";

const STEPS = ["Service", "Date", "Add-ons", "Details", "Review"];
const SLOTS = [
  { label: "Morning", time: "9:00 am – 1:00 pm" },
  { label: "Afternoon", time: "1:00 pm – 6:00 pm" },
  { label: "Evening", time: "6:00 pm – 11:00 pm" },
];

const EASE = [0.22, 1, 0.36, 1];

export default function BookingWizard({ services = [], packages = [], settings = {}, initialService, initialPackage }) {
  const reduce = useReducedMotion();
  const send = useServerFn(createBooking);

  const [step, setStep] = useState(0);
  const [serviceSlug, setServiceSlug] = useState(initialService || services[0]?.slug || "");
  const [packageName, setPackageName] = useState(initialPackage || "");
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");
  const [addons, setAddons] = useState([]);
  const [details, setDetails] = useState({ name: "", phone: "", email: "", guests: "", location: "", notes: "" });
  const [agreed, setAgreed] = useState(false);
  const [minDate, setMinDate] = useState("");
  const [saving, setSaving] = useState(false);
  const [failure, setFailure] = useState("");
  const [result, setResult] = useState(null);
  const [summaryOpen, setSummaryOpen] = useState(false);

  useEffect(() => {
    setMinDate(new Date().toISOString().slice(0, 10));
  }, []);

  const bookableServices = services.filter((service) => service.bookable !== false);
  const service = bookableServices.find((item) => item.slug === serviceSlug) || bookableServices[0];
  const servicePackages = useMemo(
    () => packages.filter((pkg) => !pkg.service_slug || pkg.service_slug === service?.slug),
    [packages, service?.slug]
  );
  const pkg = servicePackages.find((item) => item.name === packageName);
  const estimate = Number(pkg?.price || service?.starting_price || 0);
  const advancePercent = Number(settings.advance_percent) > 0 ? Number(settings.advance_percent) : 25;
  const advance = Math.round((estimate * advancePercent) / 100);

  const dateReady = Boolean(date && slot);
  const detailsReady =
    details.name.trim().length > 1 &&
    details.phone.replace(/\D/g, "").length >= 7 &&
    (!details.email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email.trim()));

  const canContinue =
    step === 0 ? Boolean(service) : step === 1 ? dateReady : step === 2 ? true : step === 3 ? detailsReady : agreed;

  const toggleAddon = (addon) => {
    setAddons((current) =>
      current.includes(addon) ? current.filter((item) => item !== addon) : [...current, addon]
    );
  };

  async function submit() {
    setSaving(true);
    setFailure("");
    try {
      const response = await send({
        data: {
          service_slug: service.slug,
          package_name: pkg?.name || "",
          event_date: date,
          time_slot: slot,
          addons,
          guest_count: details.guests,
          location: details.location,
          customer_name: details.name,
          phone: details.phone,
          email: details.email,
          notes: details.notes,
        },
      });
      setResult(response.booking);
    } catch (error) {
      setFailure("We couldn't save that request just now. Please try again, or message us on WhatsApp.");
    } finally {
      setSaving(false);
    }
  }

  if (result) {
    return (
      <div className="container-x py-16 sm:py-20">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto max-w-2xl border border-border bg-card p-8 text-center sm:p-12"
        >
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-forest text-gold">
            <PartyPopper className="h-7 w-7" aria-hidden="true" />
          </span>
          <h1 className="mt-7 font-display text-[2rem] leading-tight text-foreground sm:text-[2.4rem]">
            Your date request is in
          </h1>
          <p className="mt-3 text-[0.95rem] leading-relaxed text-muted-foreground">
            A planner will confirm availability within one working day. Keep this booking ID — you can
            check the status any time.
          </p>

          <div className="mt-8 border border-border bg-secondary/50 px-6 py-5">
            <p className="text-[0.58rem] font-semibold  tracking-[0.26em] text-muted-foreground">
              Booking ID
            </p>
            <p className="mt-2 font-display text-[1.9rem] tracking-wide text-forest">{result.booking_id}</p>
          </div>

          <dl className="mt-8 space-y-3 text-left text-[0.9rem]">
            {[
              ["Service", result.package_name || result.service_name],
              ["Date", formatDate(result.event_date)],
              ["Time", result.time_slot],
              ["Advance due", inr(result.advance)],
            ].map(([label, value]) => (
              <div key={label} className="flex items-baseline justify-between border-b border-border/70 pb-3 last:border-b-0">
                <dt className="text-muted-foreground">{label}</dt>
                <dd className="text-foreground">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 space-y-2 text-left">
            <p className="text-[0.58rem] font-semibold  tracking-[0.26em] text-gold">Next steps</p>
            <ol className="mt-3 space-y-2 text-[0.88rem] leading-relaxed text-muted-foreground">
              <li>1. We check the date with our vendors and confirm within one working day.</li>
              <li>2. You receive an itemised quotation and a secure payment link on WhatsApp.</li>
              <li>3. The date is locked once the advance is paid.</li>
            </ol>
          </div>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button asChild className="h-12 rounded-sm bg-forest px-7 text-[0.62rem] font-semibold  tracking-[0.22em] text-bone hover:bg-forest/90">
              <Link to="/booking-lookup">View my booking</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-12 rounded-sm border-border px-7 text-[0.62rem] font-semibold  tracking-[0.22em] text-forest hover:border-gold"
            >
              <a
                href={whatsappLink(
                  settings.whatsapp_number,
                  `Hi Aaha Events, I've just submitted booking ${result.booking_id}.`
                )}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle className="mr-2 h-4 w-4" aria-hidden="true" />
                Send us the details
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container-x grid gap-10 pb-32 pt-12 lg:grid-cols-[1fr_360px] lg:pb-20">
      <div>
        <ol className="flex items-center gap-1.5 overflow-x-auto pb-2" aria-label="Booking progress">
          {STEPS.map((label, i) => (
            <li key={label} className="flex flex-1 items-center gap-1.5">
              <button
                type="button"
                onClick={() => i < step && setStep(i)}
                className={cn(
                  "flex items-center gap-2 whitespace-nowrap text-[0.58rem] font-semibold  tracking-[0.16em] transition-colors",
                  i === step ? "text-forest" : i < step ? "text-gold" : "text-muted-foreground/50"
                )}
                aria-current={i === step ? "step" : undefined}
              >
                <span
                  className={cn(
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[0.6rem]",
                    i === step
                      ? "border-forest bg-forest text-bone"
                      : i < step
                        ? "border-gold bg-gold text-ink"
                        : "border-border text-muted-foreground"
                  )}
                >
                  {i < step ? <Check className="h-3 w-3" aria-hidden="true" /> : i + 1}
                </span>
                <span className="hidden sm:inline">{label}</span>
              </button>
              {i < STEPS.length - 1 ? <span className="h-px flex-1 bg-border" aria-hidden="true" /> : null}
            </li>
          ))}
        </ol>

        <div className="mt-9 min-h-[380px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={step}
              initial={reduce ? false : { opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, x: -18 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              {step === 0 ? (
                <section aria-label="Choose a service">
                  <h2 className="font-display text-[1.7rem] text-foreground">What are we celebrating?</h2>
                  <p className="mt-2 text-[0.95rem] text-muted-foreground">
                    Choose a service, then pick a collection if one suits you.
                  </p>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {bookableServices.map((item) => (
                      <button
                        key={item.slug}
                        type="button"
                        onClick={() => {
                          setServiceSlug(item.slug);
                          setPackageName("");
                          setAddons([]);
                        }}
                        className={cn(
                          "border p-5 text-left transition-colors",
                          service?.slug === item.slug
                            ? "border-forest bg-forest text-bone"
                            : "border-border bg-card text-foreground hover:border-gold"
                        )}
                      >
                        <span className="text-[0.55rem] font-semibold  tracking-[0.22em] text-gold">
                          {item.category}
                        </span>
                        <span className="mt-2 block font-display text-[1.2rem]">{item.title}</span>
                        <span
                          className={cn(
                            "mt-1 block text-[0.8rem]",
                            service?.slug === item.slug ? "text-bone/65" : "text-muted-foreground"
                          )}
                        >
                          {item.price_visible && item.starting_price ? `From ${inr(item.starting_price)}` : "Pricing on request"}
                        </span>
                      </button>
                    ))}
                  </div>

                  {servicePackages.length ? (
                    <div className="mt-8">
                      <p className="text-[0.58rem] font-semibold  tracking-[0.24em] text-muted-foreground">
                        Collection (optional)
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => setPackageName("")}
                          className={cn(
                            "rounded-full border px-4 py-2 text-[0.72rem] transition-colors",
                            !packageName ? "border-forest bg-forest text-bone" : "border-border text-muted-foreground hover:border-gold"
                          )}
                        >
                          Just the service
                        </button>
                        {servicePackages.map((item) => (
                          <button
                            key={item.name}
                            type="button"
                            onClick={() => setPackageName(item.name)}
                            className={cn(
                              "rounded-full border px-4 py-2 text-[0.72rem] transition-colors",
                              packageName === item.name
                                ? "border-forest bg-forest text-bone"
                                : "border-border text-muted-foreground hover:border-gold"
                            )}
                          >
                            {item.name}
                            {item.price_visible && item.price ? ` · ${inr(item.price)}` : ""}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </section>
              ) : null}

              {step === 1 ? (
                <section aria-label="Choose a date and time">
                  <h2 className="font-display text-[1.7rem] text-foreground">When is it happening?</h2>
                  <p className="mt-2 text-[0.95rem] text-muted-foreground">
                    Choose your preferred date and a time window. We confirm availability within a day.
                  </p>
                  <div className="mt-6 max-w-sm">
                    <label htmlFor="booking-date" className="mb-2 block text-[0.58rem] font-semibold  tracking-[0.2em] text-muted-foreground">
                      Event date
                    </label>
                    <input
                      id="booking-date"
                      type="date"
                      min={minDate}
                      value={date}
                      onChange={(event) => setDate(event.target.value)}
                      className="field"
                    />
                    <p className="mt-2 text-[0.72rem] text-muted-foreground">
                      Past dates are unavailable. Tell us if your date is flexible.
                    </p>
                  </div>

                  <p className="mt-8 text-[0.58rem] font-semibold  tracking-[0.24em] text-muted-foreground">
                    Time window
                  </p>
                  <div className="mt-3 grid gap-3 sm:grid-cols-3">
                    {SLOTS.map((item) => (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => setSlot(`${item.label} · ${item.time}`)}
                        className={cn(
                          "border p-4 text-left transition-colors",
                          slot.startsWith(item.label)
                            ? "border-forest bg-forest text-bone"
                            : "border-border bg-card text-foreground hover:border-gold"
                        )}
                      >
                        <span className="block text-[0.9rem]">{item.label}</span>
                        <span className={cn("mt-1 block text-[0.72rem]", slot.startsWith(item.label) ? "text-bone/65" : "text-muted-foreground")}>
                          {item.time}
                        </span>
                      </button>
                    ))}
                  </div>
                </section>
              ) : null}

              {step === 2 ? (
                <section aria-label="Choose add-ons">
                  <h2 className="font-display text-[1.7rem] text-foreground">Anything to add?</h2>
                  <p className="mt-2 text-[0.95rem] text-muted-foreground">
                    Optional extras for {service?.title}. You can change these later.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {(service?.addons || []).map((addon) => {
                      const active = addons.includes(addon);
                      return (
                        <button
                          key={addon}
                          type="button"
                          onClick={() => toggleAddon(addon)}
                          aria-pressed={active}
                          className={cn(
                            "inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-[0.8rem] transition-colors",
                            active ? "border-forest bg-forest text-bone" : "border-border text-muted-foreground hover:border-gold"
                          )}
                        >
                          {active ? <Check className="h-3.5 w-3.5 text-gold" aria-hidden="true" /> : null}
                          {addon}
                        </button>
                      );
                    })}
                    {!service?.addons?.length ? (
                      <p className="text-[0.9rem] text-muted-foreground">No add-ons for this service — everything is included.</p>
                    ) : null}
                  </div>
                </section>
              ) : null}

              {step === 3 ? (
                <section aria-label="Your details">
                  <h2 className="font-display text-[1.7rem] text-foreground">How do we reach you?</h2>
                  <p className="mt-2 text-[0.95rem] text-muted-foreground">
                    Only the first two fields are required. Everything else helps us prepare.
                  </p>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block text-[0.58rem] font-semibold  tracking-[0.2em] text-muted-foreground">
                        Full name *
                      </span>
                      <input
                        className="field"
                        value={details.name}
                        onChange={(event) => setDetails({ ...details, name: event.target.value })}
                        autoComplete="name"
                      />
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-[0.58rem] font-semibold  tracking-[0.2em] text-muted-foreground">
                        Phone / WhatsApp *
                      </span>
                      <input
                        className="field"
                        value={details.phone}
                        onChange={(event) => setDetails({ ...details, phone: event.target.value })}
                        inputMode="tel"
                        autoComplete="tel"
                      />
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-[0.58rem] font-semibold  tracking-[0.2em] text-muted-foreground">
                        Email
                      </span>
                      <input
                        className="field"
                        type="email"
                        value={details.email}
                        onChange={(event) => setDetails({ ...details, email: event.target.value })}
                        autoComplete="email"
                      />
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-[0.58rem] font-semibold  tracking-[0.2em] text-muted-foreground">
                        Guest count
                      </span>
                      <input
                        className="field"
                        value={details.guests}
                        onChange={(event) => setDetails({ ...details, guests: event.target.value })}
                        inputMode="numeric"
                      />
                    </label>
                    <label className="block sm:col-span-2">
                      <span className="mb-2 block text-[0.58rem] font-semibold  tracking-[0.2em] text-muted-foreground">
                        Venue or location
                      </span>
                      <input
                        className="field"
                        value={details.location}
                        onChange={(event) => setDetails({ ...details, location: event.target.value })}
                        placeholder="Town, venue or parish hall"
                      />
                    </label>
                    <label className="block sm:col-span-2">
                      <span className="mb-2 block text-[0.58rem] font-semibold  tracking-[0.2em] text-muted-foreground">
                        Anything we should know
                      </span>
                      <textarea
                        className="field min-h-[110px] resize-y"
                        value={details.notes}
                        onChange={(event) => setDetails({ ...details, notes: event.target.value })}
                      />
                    </label>
                  </div>
                </section>
              ) : null}

              {step === 4 ? (
                <section aria-label="Review">
                  <h2 className="font-display text-[1.7rem] text-foreground">Review your request</h2>
                  <p className="mt-2 text-[0.95rem] text-muted-foreground">
                    No payment is taken now. We confirm availability and send an itemised quotation first.
                  </p>

                  <div className="mt-6 lg:hidden">
                    <BookingSummary
                      service={service}
                      pkg={pkg}
                      date={date}
                      slot={slot}
                      addons={addons}
                      guests={details.guests}
                      estimate={estimate}
                      advance={advance}
                      advancePercent={advancePercent}
                    />
                  </div>

                  <dl className="mt-6 divide-y divide-border border border-border bg-card">
                    {[
                      ["Name", details.name],
                      ["Phone", details.phone],
                      ["Email", details.email || "—"],
                      ["Guests", details.guests || "—"],
                      ["Location", details.location || "—"],
                      ["Notes", details.notes || "—"],
                    ].map(([label, value]) => (
                      <div key={label} className="flex gap-4 px-5 py-3.5 text-[0.88rem]">
                        <dt className="w-24 shrink-0 text-[0.58rem]  tracking-[0.16em] text-muted-foreground">{label}</dt>
                        <dd className="text-foreground">{value}</dd>
                      </div>
                    ))}
                  </dl>

                  <label className="mt-6 flex items-start gap-3 text-[0.85rem] leading-relaxed text-muted-foreground">
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={(event) => setAgreed(event.target.checked)}
                      className="mt-1 h-4 w-4 accent-forest"
                    />
                    <span>
                      I understand this is a date request, and that the booking is confirmed once the
                      advance is paid and we have replied.
                    </span>
                  </label>

                  {failure ? (
                    <p role="alert" className="mt-5 border-l-2 border-destructive pl-3 text-[0.88rem] text-destructive">
                      {failure}
                    </p>
                  ) : null}
                </section>
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex items-center justify-between gap-4 border-t border-border pt-6">
          <button
            type="button"
            onClick={() => setStep((current) => Math.max(0, current - 1))}
            disabled={step === 0}
            className={cn(
              "inline-flex items-center gap-2 text-[0.62rem] font-semibold  tracking-[0.22em]",
              step === 0 ? "text-muted-foreground/40" : "text-muted-foreground hover:text-forest"
            )}
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back
          </button>

          {step < 4 ? (
            <Button
              type="button"
              disabled={!canContinue}
              onClick={() => setStep((current) => Math.min(4, current + 1))}
              className={cn(
                "h-12 rounded-sm bg-forest px-8 text-[0.62rem] font-semibold  tracking-[0.22em] text-bone hover:bg-forest/90",
                !canContinue && "opacity-40"
              )}
            >
              Continue
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Button>
          ) : (
            <Button
              type="button"
              disabled={!canContinue || saving}
              onClick={submit}
              className={cn(
                "h-12 rounded-sm bg-gold px-8 text-[0.62rem] font-semibold  tracking-[0.22em] text-ink hover:bg-gold/85",
                (!canContinue || saving) && "opacity-50"
              )}
            >
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                  Sending
                </>
              ) : (
                "Request this date"
              )}
            </Button>
          )}
        </div>
      </div>

      <aside className="hidden lg:block">
        <div className="sticky top-28">
          <BookingSummary
            service={service}
            pkg={pkg}
            date={date}
            slot={slot}
            addons={addons}
            guests={details.guests}
            estimate={estimate}
            advance={advance}
            advancePercent={advancePercent}
          />
        </div>
      </aside>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-bone/95 backdrop-blur-md lg:hidden">
        <AnimatePresence initial={false}>
          {summaryOpen ? (
            <motion.div
              initial={reduce ? false : { height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="overflow-hidden border-b border-border"
            >
              <div className="max-h-[50vh] overflow-y-auto px-4 py-4">
                <BookingSummary
                  service={service}
                  pkg={pkg}
                  date={date}
                  slot={slot}
                  addons={addons}
                  guests={details.guests}
                  estimate={estimate}
                  advance={advance}
                  advancePercent={advancePercent}
                />
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
        <button
          type="button"
          onClick={() => setSummaryOpen((current) => !current)}
          className="flex w-full items-center justify-between gap-3 px-4 py-3 pr-20 text-left"
          aria-expanded={summaryOpen}
        >
          <span>
            <span className="block text-[0.52rem] font-semibold  tracking-[0.22em] text-muted-foreground">
              Step {step + 1} of 5 · {STEPS[step]}
            </span>
            <span className="mt-0.5 block font-display text-[1.2rem] text-forest">
              {estimate ? `${inr(advance)} advance` : "Select to see total"}
            </span>
          </span>
          <ChevronUp
            className={cn("h-4 w-4 text-muted-foreground transition-transform", summaryOpen && "rotate-180")}
            aria-hidden="true"
          />
        </button>
      </div>
    </div>
  );
}