export function inr(value) {
  const amount = Number(value);
  if (!Number.isFinite(amount) || amount <= 0) return "";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(value, options) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
    ...options,
  });
}

export function whatsappLink(number, message) {
  const digits = String(number || "").replace(/[^\d]/g, "");
  const text = encodeURIComponent(message || "Hi Aaha Events, I'd like to know more about my event.");
  return `https://wa.me/${digits}?text=${text}`;
}

export function telLink(phone) {
  return `tel:${String(phone || "").replace(/[^\d+]/g, "")}`;
}