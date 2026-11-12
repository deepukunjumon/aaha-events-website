import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Reveal from "@/components/common/Reveal";
import { whatsappLink } from "@/lib/format";

export default function FinalCta({ settings = {} }) {
  return (
    <section className="relative isolate overflow-hidden bg-ink">
      <div
        className="absolute inset-0 -z-10 opacity-70"
        style={{
          background:
            "radial-gradient(70% 120% at 15% 10%, rgba(197,160,89,0.22) 0%, rgba(27,48,34,0) 60%), radial-gradient(60% 100% at 85% 100%, rgba(197,160,89,0.14) 0%, rgba(27,48,34,0) 60%)",
        }}
        aria-hidden="true"
      />
      <div className="container-x py-20 sm:py-24">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">Your date awaits</span>
          <h2 className="display-lg mt-6 text-balance text-bone">
            Let&apos;s plan something worth remembering
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[1rem] leading-relaxed text-bone/70">
            Tell us the date and the feeling you are after. We&apos;ll come back within one working day
            with honest advice and a clear next step.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              asChild
              className="h-12 rounded-sm bg-gold px-8 text-[0.66rem] font-semibold  tracking-[0.24em] text-ink hover:bg-gold/85"
            >
              <Link to="/book">
                Book an event
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-12 rounded-sm border-bone/35 bg-transparent px-8 text-[0.66rem] font-semibold  tracking-[0.24em] text-bone hover:border-bone hover:bg-bone/10 hover:text-bone"
            >
              <a
                href={whatsappLink(
                  settings.whatsapp_number,
                  "Hi Aaha Events, I'd like to know more about planning my event."
                )}
                target="_blank"
                rel="noreferrer"
              >
                Chat on WhatsApp
              </a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}