import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import logoDark from "@/assets/images/logo-dark.png";
import logoLight from "@/assets/images/logo-light.png";

export default function Logo({ tone = "dark", className }) {
  const light = tone === "light";
  return (
    <Link to="/" aria-label="Aaha Events — home" className={cn("inline-flex items-center", className)}>
      <img src={light ? logoLight : logoDark} alt="Aaha Events" className="h-9 w-auto sm:h-10" />
    </Link>
  );
}