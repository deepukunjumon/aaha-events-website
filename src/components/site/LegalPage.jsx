import PageHero from "@/components/site/PageHero";
import Reveal from "@/components/common/Reveal";

export default function LegalPage({ eyebrow = "Legal", title, updated, intro, sections = [], note }) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} description={intro} />

      <section className="container-x max-w-3xl py-16 sm:py-20">
        {updated ? (
          <p className="text-[0.6rem] font-semibold  tracking-[0.22em] text-muted-foreground">
            Last updated {updated}
          </p>
        ) : null}

        <div className="mt-10 space-y-10">
          {sections.map((section, i) => (
            <Reveal key={section.heading} delay={i * 0.03}>
              <h2 className="font-display text-[1.4rem] leading-snug text-foreground">{section.heading}</h2>
              <div className="mt-3 space-y-3">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 20)} className="text-[0.96rem] leading-[1.8] text-muted-foreground">
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>
          ))}
        </div>

        {note ? (
          <p className="mt-12 border-l-2 border-gold pl-4 text-[0.82rem] leading-relaxed text-muted-foreground">
            {note}
          </p>
        ) : null}
      </section>
    </>
  );
}