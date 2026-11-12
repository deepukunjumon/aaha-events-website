import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const SHOW_AFTER_PX = 480;

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER_PX);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="fixed bottom-5 left-5 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-forest text-bone shadow-[0_16px_40px_-16px_rgba(27,48,34,0.8)] transition-transform duration-300 hover:scale-105"
    >
      <ArrowUp className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}
