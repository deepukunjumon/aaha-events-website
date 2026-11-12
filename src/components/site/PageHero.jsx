import { Image } from "@/components/ui/image";
import { cn } from "@/lib/utils";

export default function PageHero({ eyebrow, title, description, image, imageAlt, children, align = "left" }) {
  return (
    <section className="relative isolate overflow-hidden bg-ink">
      {image ? (
        <>
          <Image
            src={image}
            alt={imageAlt || ""}
            loading="eager"
            className="absolute inset-0 block h-full w-full object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/40" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-ink/40" aria-hidden="true" />
        </>
      ) : null}

      <div
        className={cn(
          "container-x relative pb-14 pt-20 sm:pb-20 sm:pt-24",
          align === "center" && "text-center"
        )}
      >
        {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
        <h1 className={cn("display-lg mt-5 max-w-3xl text-bone", align === "center" && "mx-auto")}>
          {title}
        </h1>
        {description ? (
          <p
            className={cn(
              "mt-5 max-w-2xl text-[1rem] leading-relaxed text-bone/70",
              align === "center" && "mx-auto"
            )}
          >
            {description}
          </p>
        ) : null}
        {children}
      </div>
    </section>
  );
}