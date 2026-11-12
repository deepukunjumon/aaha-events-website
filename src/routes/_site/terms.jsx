import { createFileRoute } from "@tanstack/react-router";
import LegalPage from "@/components/site/LegalPage";

export const Route = createFileRoute("/_site/terms")({
  head: () => ({
    meta: [
      { title: "Terms & conditions | Aaha Events" },
      { name: "description", content: "The terms that apply when you book an event with Aaha Events in Kerala." },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <LegalPage
      title="Terms & conditions"
      intro="The short version of how a booking works, so there are no surprises later."
      updated="November 2026"
      sections={[
        {
          heading: "Enquiries and quotations",
          paragraphs: [
            "A booking request submitted through this website is a request, not a confirmed booking. Dates are confirmed only after we have replied in writing and the advance has been received.",
            "Quotations are itemised and valid for fourteen days. Prices are based on the guest count, venue and scope agreed at the time of quoting; changes to any of these may change the price.",
          ],
        },
        {
          heading: "Payments",
          paragraphs: [
            "A 25% advance confirms your date. A further 50% is due two weeks before the event, and the balance on the day of the event unless agreed otherwise in writing.",
            "Advance payments are made through the secure link our team sends you. We never ask for card details over the phone or by message.",
          ],
        },
        {
          heading: "Changes",
          paragraphs: [
            "Changes requested more than fourteen days before the event are accommodated where vendors allow, and any difference is quoted before work continues.",
            "Changes within seven days of the event may not be possible and may attract additional charges from vendors already committed.",
          ],
        },
        {
          heading: "Responsibilities",
          paragraphs: [
            "We coordinate vendors on your behalf but remain responsible for the planning and management service we provide. Third-party vendors remain responsible for their own services.",
            "You are responsible for confirming guest counts, venue permissions and any statutory licences required for your event.",
          ],
        },
        {
          heading: "Weather and force majeure",
          paragraphs: [
            "Outdoor plans include a covered fallback where the venue allows. Where an event cannot proceed because of circumstances outside our control, we will help rearrange the date and carry forward payments already made to us.",
          ],
        },
      ]}
      note="[Placeholder – client to review and complete with their legal advisor, including the registered business name and jurisdiction.]"
    />
  );
}