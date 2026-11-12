const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
  sampleAlbums,
  sampleFaqs,
  sampleGalleryItems,
  sampleHighlights,
  samplePackages,
  samplePartners,
  samplePosts,
  sampleServices,
  sampleSettings,
  sampleStats,
  sampleTeam,
  sampleTestimonials,
} from "@/data/sample";

const isVisible = (record) => Boolean(record) && record.published !== false;
const byOrder = (a, b) => (Number(a.sort_order) || 0) - (Number(b.sort_order) || 0);

async function fetchAll(name, sort = "sort_order") {
  const page = await db.entities[name].filter({}, { sort, limit: 200 });
  const items = page?.items ?? page ?? [];
  return Array.isArray(items) ? items : [];
}

function mergeSettings(record) {
  if (!record) return sampleSettings;
  const filled = Object.fromEntries(
    Object.entries(record).filter(([, value]) => value !== null && value !== undefined && value !== "")
  );
  return { ...sampleSettings, ...filled };
}

function usable(records, sample) {
  const cleaned = records.filter(isVisible).sort(byOrder);
  return cleaned.length ? cleaned : sample;
}

export const getSiteData = createServerFn({ method: "GET" }).handler(async () => {
  const [settingsPage, stats, services, packages, testimonials, faqs, partners, albums, galleryItems, posts, highlights, teamMembers] =
    await Promise.all([
      db.entities.SiteSettings.filter({ key: "main" }, { limit: 1 }),
      fetchAll("Stat"),
      fetchAll("Service"),
      fetchAll("Package"),
      fetchAll("Testimonial"),
      fetchAll("Faq"),
      fetchAll("Partner"),
      fetchAll("Album"),
      fetchAll("GalleryItem"),
      fetchAll("BlogPost", "-published_date"),
      fetchAll("Highlight"),
      fetchAll("TeamMember"),
    ]);

  const settingsRecord = (settingsPage?.items ?? [])[0];
  const highlightList = highlights.filter(isVisible).sort(byOrder);
  const postList = posts.filter(isVisible);

  return {
    settings: mergeSettings(settingsRecord),
    stats: usable(stats, sampleStats),
    services: usable(services, sampleServices),
    packages: usable(packages, samplePackages),
    testimonials: usable(testimonials, sampleTestimonials),
    faqs: usable(faqs, sampleFaqs),
    partners: usable(partners, samplePartners),
    albums: usable(albums, sampleAlbums),
    galleryItems: galleryItems.length ? galleryItems.sort(byOrder) : sampleGalleryItems,
    posts: postList.length ? postList : samplePosts,
    highlights: highlightList.length ? highlightList : sampleHighlights,
    team: usable(teamMembers, sampleTeam),
  };
});

const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please share your name").max(80),
  phone: z.string().trim().min(7, "Please share a reachable phone number").max(20),
  email: z.string().trim().max(120).optional().default(""),
  event_type: z.string().trim().max(60).optional().default(""),
  event_date: z.string().trim().max(20).optional().default(""),
  location: z.string().trim().max(120).optional().default(""),
  guests: z.string().trim().max(10).optional().default(""),
  budget: z.string().trim().max(40).optional().default(""),
  message: z.string().trim().max(2000).optional().default(""),
  source: z.string().trim().max(60).optional().default("contact"),
  website: z.string().max(200).optional().default(""),
});

export const submitEnquiry = createServerFn({ method: "POST" })
  .validator(enquirySchema)
  .handler(async ({ data }) => {
    if (data.website) return { ok: true };
    const guests = Number(String(data.guests).replace(/[^\d]/g, ""));
    await db.entities.Enquiry.create({
      name: data.name,
      phone: data.phone,
      email: data.email,
      event_type: data.event_type,
      event_date: data.event_date,
      location: data.location,
      guests: Number.isFinite(guests) && guests > 0 ? guests : null,
      budget: data.budget,
      message: data.message,
      source: data.source,
      status: "new",
    });
    return { ok: true };
  });

const bookingSchema = z.object({
  service_slug: z.string().trim().max(80),
  package_name: z.string().trim().max(80).optional().default(""),
  event_date: z.string().trim().regex(/^\d{4}-\d{2}-\d{2}$/, "Choose an event date"),
  time_slot: z.string().trim().min(1, "Choose a time slot").max(40),
  addons: z.array(z.string().trim().max(80)).max(12).optional().default([]),
  guest_count: z.string().trim().max(10).optional().default(""),
  location: z.string().trim().max(140).optional().default(""),
  customer_name: z.string().trim().min(2, "Please share your name").max(80),
  phone: z.string().trim().min(7, "Please share a reachable phone number").max(20),
  email: z.string().trim().max(120).optional().default(""),
  notes: z.string().trim().max(1200).optional().default(""),
  website: z.string().max(200).optional().default(""),
});

function makeBookingId() {
  const stamp = Date.now().toString(36).to().slice(-5);
  const salt = Math.random().toString(36).to().slice(2, 5);
  return `AE-${stamp}${salt}`;
}

export const createBooking = createServerFn({ method: "POST" })
  .validator(bookingSchema)
  .handler(async ({ data }) => {
    if (data.website) throw new Error("Could not create booking");

    const [servicePage, packagePage, settingsPage] = await Promise.all([
      db.entities.Service.filter({ slug: data.service_slug }, { limit: 1 }),
      data.package_name ? db.entities.Package.filter({ name: data.package_name }, { limit: 1 }) : Promise.resolve({ items: [] }),
      db.entities.SiteSettings.filter({ key: "main" }, { limit: 1 }),
    ]);

    const service = (servicePage?.items ?? [])[0];
    if (!service) throw new Error("That service is not available right now");
    const pkg = (packagePage?.items ?? [])[0];
    const settings = (settingsPage?.items ?? [])[0];

    const baseAmount = Number(pkg?.price || service.starting_price || 0);
    const advancePercent = Number(settings?.advance_percent) > 0 ? Number(settings.advance_percent) : 25;
    const advance = Math.round((baseAmount * advancePercent) / 100);
    const guests = Number(String(data.guest_count).replace(/[^\d]/g, ""));
    const bookingId = makeBookingId();

    const record = await db.entities.Booking.create({
      booking_id: bookingId,
      service_slug: service.slug,
      service_name: service.title,
      package_name: pkg?.name || "",
      event_date: data.event_date,
      time_slot: data.time_slot,
      addons: data.addons,
      guest_count: Number.isFinite(guests) && guests > 0 ? guests : null,
      location: data.location,
      customer_name: data.customer_name,
      phone: data.phone,
      email: data.email,
      notes: data.notes,
      estimate: baseAmount,
      advance,
      status: "new",
      payment_status: "advance_due",
    });

    return {
      ok: true,
      booking: {
        id: record.id,
        booking_id: bookingId,
        service_name: service.title,
        package_name: pkg?.name || "",
        event_date: data.event_date,
        time_slot: data.time_slot,
        addons: data.addons,
        guest_count: Number.isFinite(guests) && guests > 0 ? guests : null,
        estimate: baseAmount,
        advance,
        status: "new",
      },
    };
  });

export const lookupBooking = createServerFn({ method: "POST" })
  .validator(
    z.object({
      booking_id: z.string().trim().min(3).max(40),
      phone: z.string().trim().min(6).max(20),
    })
  )
  .handler(async ({ data }) => {
    const digits = (value) => String(value || "").replace(/\D/g, "").slice(-10);
    const wanted = data.booking_id.trim().to();

    const page = await db.entities.Booking.filter({ booking_id: wanted }, { limit: 5 });
    const records = page?.items ?? [];
    const match = records.find((record) => digits(record.phone) === digits(data.phone));

    if (!match) return { found: false };

    return {
      found: true,
      booking: {
        booking_id: match.booking_id,
        service_name: match.service_name,
        package_name: match.package_name,
        event_date: match.event_date,
        time_slot: match.time_slot,
        addons: match.addons ?? [],
        guest_count: match.guest_count,
        location: match.location,
        customer_name: match.customer_name,
        estimate: match.estimate,
        advance: match.advance,
        status: match.status,
        payment_status: match.payment_status,
      },
    };
  });

/**
 * Content is fetched once and reused for a short while, so moving between pages
 * doesn't re-read the whole content library on every navigation.
 */
const SITE_CACHE_TTL = 60 * 1000;
let siteCache = null;
let siteCacheAt = 0;

export async function loadSiteContent() {
  if (siteCache && Date.now() - siteCacheAt < SITE_CACHE_TTL) return siteCache;
  siteCache = await getSiteData();
  siteCacheAt = Date.now();
  return siteCache;
}

export function invalidateSiteContent() {
  siteCache = null;
  siteCacheAt = 0;
}