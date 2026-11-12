import { createFileRoute } from "@tanstack/react-router";
import { UserRound } from "lucide-react";
import { Image } from "@/components/ui/image";
import PageHero from "@/components/site/PageHero";
import SectionHeading from "@/components/common/SectionHeading";
import Reveal from "@/components/common/Reveal";
import StatsStrip from "@/components/home/StatsStrip";
import FinalCta from "@/components/home/FinalCta";
import { getIcon } from "@/components/common/iconMap";
import { loadSiteContent } from "@/lib/server-fns";

export const Route = createFileRoute("/_site/about")({
  loader: () => loadSiteContent(),
  head: () => ({
    meta: [
      { title: "About Aaha Events — Kerala event planners in Mundakayam" },
      {
        name: "description",
        content:
          "Aaha Events is an event studio in Mundakayam, Kerala, planning weddings, engagements, birthdays and celebrations with warmth and precision.",
      },
      { property: "og:title", content: "About Aaha Events" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const data = Route.useLoaderData();
  const { settings, highlights, stats, team } = data;
  const values = highlights.filter((item) => item.kind === "why");
  const people = team || [];

  return (
    <>
      <PageHero
        eyebrow="Our story"
        title="A studio built around Kerala families"
        description="We started with one wedding in Mundakayam and a promise that the family would actually enjoy it. That promise still runs the studio."
        image={settings.hero_image_2}
      />

      <section className="container-x py-20 sm:py-28">
        <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div>
            <SectionHeading eyebrow="Who we are" title="Planning that feels like family" />
            <Reveal delay={0.08}>
              <div className="mt-7 space-y-5 text-[1rem] leading-[1.75] text-muted-foreground">
                {(settings.about_story || "").split("\n\n").map((paragraph) => (
                  <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                ))}
              </div>
            </Reveal>
            {settings.about_mission ? (
              <Reveal delay={0.14}>
                <blockquote className="mt-9 border-l border-gold pl-6 font-display text-[1.35rem] leading-snug text-foreground">
                  {settings.about_mission}
                </blockquote>
              </Reveal>
            ) : null}
          </div>

          <Reveal delay={0.1} className="relative">
            <div className="arch relative aspect-[4/5] w-full overflow-hidden bg-muted">
              <Image
                src={settings.hero_image_1}
                alt="Aaha Events team at a celebration in Kerala"
                className="absolute inset-0 block h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-4 border border-border bg-bone px-6 py-5 shadow-[0_24px_60px_-40px_rgba(27,48,34,0.8)] sm:-left-8">
              <p className="font-display text-[1.6rem] leading-none text-foreground">
                {stats?.[1]?.value ?? 9}
                {stats?.[1]?.suffix ?? ""}
              </p>
              <p className="mt-2 text-[0.58rem] font-semibold  tracking-[0.24em] text-muted-foreground">
                {stats?.[1]?.label ?? "Years of experience"}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-forest py-20 text-bone sm:py-24">
        <div className="container-x">
          <SectionHeading
            tone="light"
            eyebrow="What makes us different"
            title="Six things we refuse to compromise"
            className="max-w-2xl"
          />
          <div className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value, i) => {
              const Icon = getIcon(value.icon);
              return (
                <Reveal key={value.title} delay={(i % 3) * 0.06}>
                  <div className="border-t border-bone/15 pt-6">
                    <Icon className="h-5 w-5 text-gold" aria-hidden="true" />
                    <h3 className="mt-4 font-display text-[1.25rem] text-bone">{value.title}</h3>
                    <p className="mt-2 text-[0.92rem] leading-relaxed text-bone/65">{value.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <StatsStrip stats={stats} />

      <section className="container-x py-20 sm:py-28">
        <SectionHeading
          eyebrow="The people"
          title="A small team, on purpose"
          description="You will know everyone who works on your event by name — starting with these three."
          className="max-w-2xl"
        />
        <div className="mt-14 grid gap-8 sm:grid-cols-3">
          {people.map((person, i) => (
            <Reveal key={person.id || `${person.role}-${i}`} delay={i * 0.08}>
              <article>
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-secondary">
                  {person.photo_url ? (
                    <Image
                      src={person.photo_url}
                      alt={person.name}
                      className="absolute inset-0 block h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-secondary">
                      <UserRound className="h-10 w-10 text-forest/20" aria-hidden="true" />
                    </div>
                  )}
                </div>
                <h3 className="mt-5 font-display text-[1.35rem] text-foreground">{person.name}</h3>
                <p className="mt-1 text-[0.62rem] font-semibold  tracking-[0.22em] text-gold">
                  {person.role}
                </p>
                {person.bio ? (
                  <p className="mt-3 text-[0.9rem] leading-relaxed text-muted-foreground">{person.bio}</p>
                ) : null}
              </article>
            </Reveal>
          ))}
        </div>
        <p className="mt-10 text-[0.6rem]  tracking-[0.22em] text-muted-foreground/60">
          [Placeholder – client to provide names, roles and photos]
        </p>
      </section>

      <FinalCta settings={settings} />
    </>
  );
}