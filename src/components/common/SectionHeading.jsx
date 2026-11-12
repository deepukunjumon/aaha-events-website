import { cn } from "@/lib/utils";
import Reveal from "@/components/common/Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "dark",
  className,
  children,
}) {
  const light = tone === "light";
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {eyebrow ? (
        <span className="flex items-center gap-3">
          <span className="h-px w-8 bg-gold/70" aria-hidden="true" />
          <span className="eyebrow">{eyebrow}</span>
        </span>
      ) : null}
      {title ? (
        <h2 className={cn("display-lg text-balance", light ? "text-bone" : "text-foreground")}>
          {title}
        </h2>
      ) : null}
      {description ? (
        <p
          className={cn(
            "max-w-2xl text-[1.02rem] leading-relaxed",
            align === "center" && "mx-auto",
            light ? "text-bone/70" : "text-muted-foreground"
          )}
        >
          {description}
        </p>
      ) : null}
      {children}
    </Reveal>
  );
}