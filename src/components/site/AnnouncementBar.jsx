import { useState } from "react";
import { X } from "lucide-react";

export default function AnnouncementBar({ settings = {} }) {
  const [dismissed, setDismissed] = useState(false);
  if (!settings.announcement_enabled || !settings.announcement_text || dismissed) return null;

  return (
    <div className="relative bg-forest text-bone">
      <div className="container-x flex items-center justify-center gap-4 py-2.5">
        <p className="text-center text-[0.62rem] font-medium  tracking-[0.22em] text-bone/85">
          <span className="mr-2 hidden text-gold sm:inline">✦</span>
          {settings.announcement_text}
        </p>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Dismiss announcement"
          className="absolute right-4 text-bone/50 transition-colors hover:text-bone"
        >
          <X className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}