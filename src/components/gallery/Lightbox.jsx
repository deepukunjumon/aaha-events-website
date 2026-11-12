import { useCallback, useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { Image } from "@/components/ui/image";

function youtubeId(url = "") {
  const match = String(url).match(/(?:youtu\.be\/|v=|embed\/)([A-Za-z0-9_-]{6,})/);
  return match ? match[1] : "";
}

export default function Lightbox({ items = [], index = null, onChange, onClose }) {
  const reduce = useReducedMotion();
  const item = index === null ? null : items[index];
  const open = Boolean(item);

  const step = useCallback(
    (direction) => {
      if (!open) return;
      onChange((index + direction + items.length) % items.length);
    },
    [open, index, items.length, onChange]
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open, onClose, step]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[90] flex flex-col bg-ink/95 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Gallery viewer"
          initial={reduce ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
        >
          <div className="flex items-center justify-between px-4 py-4 sm:px-8">
            <p className="text-[0.62rem]  tracking-[0.24em] text-bone/60">
              {index + 1} / {items.length}
            </p>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close gallery"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-bone/25 text-bone transition-colors hover:border-gold hover:text-gold"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <div
            className="relative flex flex-1 items-center justify-center px-3 pb-3 sm:px-10"
            onTouchStart={(event) => {
              event.currentTarget.dataset.startX = event.touches[0].clientX;
            }}
            onTouchEnd={(event) => {
              const startX = Number(event.currentTarget.dataset.startX || 0);
              const delta = event.changedTouches[0].clientX - startX;
              if (Math.abs(delta) > 55) step(delta < 0 ? 1 : -1);
            }}
          >
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous"
              className="absolute left-1 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-bone/20 bg-ink/50 text-bone transition-colors hover:border-gold hover:text-gold sm:left-4"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>

            <motion.div
              key={item.url}
              initial={reduce ? false : { opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex h-full w-full max-w-5xl flex-col items-center justify-center"
            >
              {item.type === "video" && youtubeId(item.url) ? (
                <div className="aspect-video w-full overflow-hidden bg-black">
                  <iframe
                    src={`https://www.youtube.com/embed/${youtubeId(item.url)}?autoplay=1&rel=0`}
                    title={item.caption || "Video"}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full"
                  />
                </div>
              ) : item.type === "video" ? (
                <div className="flex aspect-video w-full flex-col items-center justify-center gap-3 border border-bone/20 bg-forest/60">
                  <Play className="h-8 w-8 text-gold" aria-hidden="true" />
                  <a href={item.url} target="_blank" rel="noreferrer" className="text-[0.7rem]  tracking-[0.2em] text-bone/70">
                    Watch on the original site
                  </a>
                </div>
              ) : (
                <div className="relative h-full max-h-[76vh] w-full">
                  <Image
                    src={item.url}
                    alt={item.caption || "Aaha Events gallery"}
                    fittingType="fit"
                    className="block h-full max-h-[76vh] w-full object-contain"
                  />
                </div>
              )}
              {item.caption ? (
                <p className="mt-4 max-w-2xl text-center text-[0.85rem] text-bone/70">{item.caption}</p>
              ) : null}
            </motion.div>

            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next"
              className="absolute right-1 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-bone/20 bg-ink/50 text-bone transition-colors hover:border-gold hover:text-gold sm:right-4"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export { youtubeId };