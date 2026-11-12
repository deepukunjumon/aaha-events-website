import { whatsappLink } from "@/lib/format";

export default function WhatsAppButton({ settings = {} }) {
  const href = whatsappLink(
    settings.whatsapp_number,
    "Hi Aaha Events, I'd like to know more about planning my event."
  );

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Aaha Events on WhatsApp"
      className="animate-pulse-ring fixed bottom-5 right-5 z-40 flex h-13 w-13 items-center justify-center rounded-full bg-[#1B3022] text-bone shadow-[0_16px_40px_-16px_rgba(27,48,34,0.8)] transition-transform duration-500 hover:scale-105"
      style={{ height: "3.25rem", width: "3.25rem" }}
    >
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
        <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.95 1.16-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.49-.9-.8-1.5-1.79-1.67-2.09-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.6-.92-2.19-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.02 1-1.02 2.42 0 1.42 1.04 2.8 1.19 2.99.15.2 2.05 3.13 4.96 4.39.69.3 1.24.48 1.66.61.7.22 1.34.19 1.84.12.56-.08 1.72-.7 1.96-1.38.24-.68.24-1.26.17-1.38-.07-.12-.27-.2-.57-.35zM12 22a9.94 9.94 0 0 1-5.06-1.38L2 22l1.42-4.84A9.94 9.94 0 0 1 2 12C2 6.48 6.48 2 12 2s10 4.48 10 10-4.48 10-10 10z" />
      </svg>
    </a>
  );
}