import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { submitEnquiry } from "@/lib/server-fns";
import { cn } from "@/lib/utils";

const BUDGETS = [
  "Under ₹50,000",
  "₹50,000 – ₹1,00,000",
  "₹1,00,000 – ₹3,00,000",
  "₹3,00,000 – ₹7,00,000",
  "Above ₹7,00,000",
  "Not sure yet",
];

const EMPTY = {
  name: "",
  phone: "",
  email: "",
  event_type: "",
  event_date: "",
  location: "",
  guests: "",
  budget: "",
  message: "",
  website: "",
};

export default function EnquiryForm({ eventTypes = [], source = "contact" }) {
  const reduce = useReducedMotion();
  const send = useServerFn(submitEnquiry);
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [failure, setFailure] = useState("");

  const update = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const next = {};
    if (form.name.trim().length < 2) next.name = "Please share your name";
    if (form.phone.replace(/\D/g, "").length < 7) next.phone = "Please share a reachable phone number";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = "Check the email address";
    }
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("saving");
    setFailure("");
    try {
      await send({ data: { ...form, source } });
      setStatus("done");
      setForm(EMPTY);
    } catch (error) {
      setStatus("error");
      setFailure(
        "We couldn't send that just now. Please call or WhatsApp us and we'll pick it up straight away."
      );
    }
  }

  if (status === "done") {
    return (
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-start gap-5 border border-border bg-card p-8 sm:p-10"
        role="status"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-forest text-gold">
          <Check className="h-6 w-6" aria-hidden="true" />
        </span>
        <div>
          <h3 className="font-display text-[1.6rem] text-foreground">Your enquiry is with us</h3>
          <p className="mt-2 max-w-md text-[0.95rem] leading-relaxed text-muted-foreground">
            Thank you — a planner will reply within one working day. If your date is close, call us and
            we will answer immediately.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="text-[0.64rem] font-semibold  tracking-[0.22em] text-forest underline decoration-gold underline-offset-4"
        >
          Send another enquiry
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="border border-border bg-card p-6 sm:p-9" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" htmlFor="name" error={errors.name} required>
          <input id="name" className="field" value={form.name} onChange={update("name")} autoComplete="name" />
        </Field>
        <Field label="Phone / WhatsApp" htmlFor="phone" error={errors.phone} required>
          <input id="phone" className="field" value={form.phone} onChange={update("phone")} inputMode="tel" autoComplete="tel" />
        </Field>
        <Field label="Email" htmlFor="email" error={errors.email}>
          <input id="email" className="field" type="email" value={form.email} onChange={update("email")} autoComplete="email" />
        </Field>
        <Field label="Event type" htmlFor="event_type">
          <select id="event_type" className="field" value={form.event_type} onChange={update("event_type")}>
            <option value="">Select an event</option>
            {eventTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
            <option value="Something else">Something else</option>
          </select>
        </Field>
        <Field label="Event date" htmlFor="event_date">
          <input id="event_date" className="field" type="date" value={form.event_date} onChange={update("event_date")} />
        </Field>
        <Field label="Location" htmlFor="location">
          <input id="location" className="field" value={form.location} onChange={update("location")} placeholder="Venue or town" />
        </Field>
        <Field label="Guests" htmlFor="guests">
          <input id="guests" className="field" value={form.guests} onChange={update("guests")} inputMode="numeric" placeholder="Approximate" />
        </Field>
        <Field label="Budget range" htmlFor="budget">
          <select id="budget" className="field" value={form.budget} onChange={update("budget")}>
            <option value="">Select a range</option>
            {BUDGETS.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Tell us about the celebration" htmlFor="message">
          <textarea
            id="message"
            className="field min-h-[120px] resize-y"
            value={form.message}
            onChange={update("message")}
            placeholder="What matters most to you? Anything we should know?"
          />
        </Field>
      </div>

      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={update("website")} />
      </div>

      {status === "error" ? (
        <p role="alert" className="mt-5 border-l-2 border-destructive pl-3 text-[0.88rem] text-destructive">
          {failure}
        </p>
      ) : null}

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xs text-[0.72rem] leading-relaxed text-muted-foreground">
          We use your details only to answer this enquiry. No newsletters, no sharing.
        </p>
        <Button
          type="submit"
          disabled={status === "saving"}
          className={cn(
            "h-12 rounded-sm bg-forest px-8 text-[0.64rem] font-semibold  tracking-[0.24em] text-bone hover:bg-forest/90",
            status === "saving" && "opacity-70"
          )}
        >
          {status === "saving" ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
              Sending
            </>
          ) : (
            <>
              Send enquiry
              <Send className="ml-2 h-4 w-4" aria-hidden="true" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

function Field({ label, htmlFor, error, required, children }) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2 block text-[0.6rem] font-semibold  tracking-[0.2em] text-muted-foreground"
      >
        {label}
        {required ? <span className="ml-1 text-gold">*</span> : null}
      </label>
      {children}
      {error ? (
        <p className="mt-1.5 text-[0.75rem] text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}