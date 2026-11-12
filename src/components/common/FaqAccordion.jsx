import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function FaqAccordion({ items = [], className }) {
  if (!items.length) return null;

  return (
    <Accordion type="single" collapsible className={className}>
      {items.map((item, i) => (
        <AccordionItem
          key={item.question || i}
          value={`item-${i}`}
          className="border-b border-border/80 last:border-b-0"
        >
          <AccordionTrigger className="py-6 text-left font-display text-[1.15rem] font-normal leading-snug text-foreground hover:no-underline sm:text-[1.25rem] [&>svg]:text-gold">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="pb-6 pr-8 text-[0.95rem] leading-relaxed text-muted-foreground">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}