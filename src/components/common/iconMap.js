import { Compass, Handshake, Clock, Sparkles, ReceiptText, Heart, MessageCircle, MapPin, Wand2, PartyPopper, Star, Camera } from "lucide-react";

export const iconMap = {
  compass: Compass,
  handshake: Handshake,
  clock: Clock,
  sparkles: Sparkles,
  receipt: ReceiptText,
  heart: Heart,
  message: MessageCircle,
  map: MapPin,
  wand: Wand2,
  party: PartyPopper,
  star: Star,
  camera: Camera,
};

export function getIcon(name) {
  return iconMap[String(name || "").toLowerCase()] || Sparkles;
}