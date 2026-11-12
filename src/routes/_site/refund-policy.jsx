import { createFileRoute } from "@tanstack/react-router";
import LegalPage from "@/components/site/LegalPage";

export const Route = createFileRoute("/_site/refund-policy")({
  head: () => ({
    meta: [
      { title: "Cancellation & refund policy | Aaha Events" },
      { name: "description", content: "How cancellations, date changes and refunds are handled for Aaha Events bookings." },
    ],
  }),
  component: RefundPage,
});

function RefundPage() {
  return (
    <LegalPage
      title="Cancellation & refund policy"
      intro="What happens to your advance if plans change — ours, yours, or the weather's."
      updated="November 2026"
      sections={[
        {
          heading: "If you cancel",
          paragraphs: [
            "More than thirty days before the event: the advance is refunded in full, less any payments already committed to vendors on your written instruction.",
            "Between thirty and fourteen days before the event: 50% of the advance is refundable.",
            "Within fourteen days of the event: the advance is non-refundable, as vendor commitments are already in place.",
          ],
        },
        {
          heading: "Changing your date",
          paragraphs: [
            "One date change is accommodated at no extra charge if requested more than thirty days before the event, subject to vendor availability. Any difference in vendor pricing is quoted before the change is confirmed.",
          ],
        },
        {
          heading: "If we cancel",
          paragraphs: [
            "If we are unable to deliver the service for reasons within our control, we refund every amount paid to us in full within fourteen working days, and help you find an alternative team at no charge.",
          ],
        },
        {
          heading: "Refund method",
          paragraphs: [
            "Refunds are returned to the original payment method, or by bank transfer where that is not possible. We confirm every refund in writing.",
          ],
        },
      ]}
      note="[Placeholder – client to review and complete with their legal advisor. Final terms should match the payment gateway's own refund requirements.]"
    />
  );
}