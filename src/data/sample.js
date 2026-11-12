/**
 * Placeholder content used until the client fills the content studio.
 * Every string, price and image here is editable in the studio at /studio.
 * Testimonials and statistics are deliberately marked as placeholders.
 */

import heroWedding from "@/assets/images/hero-wedding.webp";
import heroReception from "@/assets/images/hero-reception.webp";
import mandap from "@/assets/images/mandap.webp";
import engagement from "@/assets/images/engagement.webp";
import birthday from "@/assets/images/birthday.webp";
import corporate from "@/assets/images/corporate.webp";
import floral from "@/assets/images/floral.webp";
import story from "@/assets/images/story.webp";
import couple from "@/assets/images/couple.webp";
import sadya from "@/assets/images/sadya.webp";

export const IMG = { heroWedding, heroReception, mandap, engagement, birthday, corporate, floral, story, couple, sadya };

export const sampleSettings = {
  brand_name: "Aaha Events",
  tagline: "Weddings, celebrations and moments worth remembering — planned in Kerala, with heart.",
  phone: "+91 90000 00000",
  whatsapp_number: "+919000000000",
  email: "hello@aahaevents.example",
  address: "Mundakayam, Kottayam district, Kerala 686513",
  maps_url: "https://www.google.com/maps/search/?api=1&query=Mundakayam,Kerala",
  hours: "Monday – Saturday · 9:00 am – 7:00 pm",
  instagram_url: "https://www.instagram.com/",
  facebook_url: "https://www.facebook.com/",
  youtube_url: "https://www.youtube.com/",
  instagram_handle: "@aahaevents",
  announcement_enabled: true,
  announcement_text: "Now booking 2027 weddings across Kerala — a limited number of dates each month.",
  hero_eyebrow: "Event studio · Mundakayam, Kerala",
  hero_headline: "Events that echo forever",
  hero_subheadline:
    "From the first garland to the last goodbye, we design and run celebrations that feel effortless for you and unforgettable for everyone else.",
  hero_image_1: IMG.heroWedding,
  hero_image_2: IMG.heroReception,
  about_story:
    "Aaha Events began in a small hall in Mundakayam with one borrowed van, three friends and a family who trusted us with their daughter's wedding. Word travelled the way it does in Kerala — through relatives, neighbours and the priest who kept our number. Today we plan weddings, engagements, birthdays and celebrations across Kottayam, Idukki and Kochi, with the same promise we started with: you should be a guest at your own event.",
  about_mission:
    "To plan celebrations with the warmth of home and the precision of a studio — so families can be fully present in the moments they will remember for decades.",
};

export const sampleStats = [
  { value: 240, suffix: "+", label: "Celebrations planned", sort_order: 1 },
  { value: 9, suffix: "", label: "Years of experience", sort_order: 2 },
  { value: 180, suffix: "+", label: "Families served", sort_order: 3 },
  { value: 40, suffix: "+", label: "Trusted vendor partners", sort_order: 4 },
];

export const sampleServices = [
  {
    title: "Wedding Planning",
    slug: "wedding-planning",
    category: "Weddings",
    short_description:
      "Full wedding design and coordination — from the engagement to the sadya — handled by one calm team.",
    description:
      "A Kerala wedding is a hundred small decisions held together by family, faith and hospitality. We take the logistics off your hands so the joy stays with you: venue scouting, mandap and décor design, vendor contracts, guest hospitality, and a minute-by-minute run sheet for every ceremony.",
    image_url: IMG.heroWedding,
    starting_price: 85000,
    price_visible: true,
    bookable: true,
    featured: true,
    included: [
      "Venue scouting and contract review",
      "Mandap, stage and décor design",
      "Vendor coordination and payments tracking",
      "Guest hospitality and accommodation desk",
      "On-the-day run sheet with a 6-member crew",
    ],
    addons: ["Photo and video team", "Sadya catering coordination", "Bridal room styling", "Guest transport"],
    gallery: [IMG.mandap, IMG.couple, IMG.sadya],
    sort_order: 1,
  },
  {
    title: "Engagement Ceremonies",
    slug: "engagement-ceremonies",
    category: "Engagements",
    short_description: "Intimate ring ceremonies with refined décor, warm lighting and effortless hosting.",
    description:
      "Engagements are where two families meet properly for the first time. We keep the room beautiful, the food warm and the introductions easy — with a design language that carries through to your wedding.",
    image_url: IMG.engagement,
    starting_price: 35000,
    price_visible: true,
    bookable: true,
    featured: true,
    included: [
      "Theme and colour consultation",
      "Ring-stage and backdrop design",
      "Floral styling and lighting",
      "Vendor and menu coordination",
      "Day-of hosting support",
    ],
    addons: ["Live music or string duo", "Custom signage and stationery", "Dessert table"],
    gallery: [IMG.engagement, IMG.floral],
    sort_order: 2,
  },
  {
    title: "Birthdays & Milestones",
    slug: "birthdays-milestones",
    category: "Birthdays",
    short_description: "First birthdays, sixtieths and every milestone in between — styled with care.",
    description:
      "From a baby's first birthday to a parent's 60th, we build celebrations that suit the person, not a template. Balloon and floral installations, custom cakes, activities for children and a flow that keeps grandparents comfortable too.",
    image_url: IMG.birthday,
    starting_price: 18000,
    price_visible: true,
    bookable: true,
    featured: true,
    included: [
      "Concept and mood board",
      "Balloon or floral installation",
      "Cake and dessert coordination",
      "Entertainment or activity planning",
      "Setup and takedown crew",
    ],
    addons: ["Photo booth", "Kids' activity corner", "Personalised favours"],
    gallery: [IMG.birthday, IMG.floral],
    sort_order: 3,
  },
  {
    title: "Corporate & Business Events",
    slug: "corporate-events",
    category: "Corporate",
    short_description: "Conferences, launches and annual days executed to the minute.",
    description:
      "Business events live and die on timing. We handle stage design, AV, registration desks, speaker coordination and hospitality so your guests only notice how smooth it all felt.",
    image_url: IMG.corporate,
    starting_price: 60000,
    price_visible: true,
    bookable: false,
    featured: true,
    included: [
      "Stage and conference design",
      "AV, sound and lighting",
      "Registration and guest desk",
      "Speaker and VIP coordination",
      "Post-event reporting",
    ],
    addons: ["Live streaming", "Delegate kits", "Awards segment production"],
    gallery: [IMG.corporate],
    sort_order: 4,
  },
  {
    title: "Stage Shows & Concerts",
    slug: "stage-shows",
    category: "Stage Shows",
    short_description: "Live performances, cultural nights and stage production with proper technical heft.",
    description:
      "Cultural nights and concerts need serious production behind the applause. We bring stage construction, sound, lighting, artist coordination and audience management together under one plan.",
    image_url: IMG.corporate,
    starting_price: 75000,
    price_visible: true,
    bookable: false,
    featured: false,
    included: [
      "Stage and truss construction",
      "Professional sound and lighting",
      "Artist liaison and green room",
      "Audience seating and entry flow",
      "Safety and crowd management",
    ],
    addons: ["LED wall", "Fireworks or cold pyro", "Backstage catering"],
    gallery: [IMG.corporate],
    sort_order: 5,
  },
  {
    title: "Décor & Styling",
    slug: "decor-styling",
    category: "Decor",
    short_description: "Standalone floral, mandap and table design for families with their own venue plans.",
    description:
      "Already have a venue and a caterer? We can step in purely as designers — building the mandap, the entrance, the table settings and the lighting that make a space feel like an occasion.",
    image_url: IMG.floral,
    starting_price: 25000,
    price_visible: true,
    bookable: true,
    featured: false,
    included: [
      "Design consultation and sketches",
      "Fresh floral and fabric styling",
      "Entrance and pathway décor",
      "Furniture and prop rental",
      "Setup and teardown",
    ],
    addons: ["Fresh flower wall", "Fairy-light canopy", "Custom name installation"],
    gallery: [IMG.floral, IMG.mandap],
    sort_order: 6,
  },
];

export const samplePackages = [
  {
    name: "The Essential",
    tagline: "For intimate ceremonies and single-day celebrations",
    price: 45000,
    price_visible: true,
    featured: false,
    service_slug: "wedding-planning",
    inclusions: [
      "Planning consultation and budget sheet",
      "Vendor shortlist and coordination",
      "Décor styling for one space",
      "Day-of coordination with 3 crew",
      "Guest list and seating support",
    ],
    sort_order: 1,
  },
  {
    name: "The Elevated",
    tagline: "Our most-booked plan for weddings and receptions",
    price: 125000,
    price_visible: true,
    featured: true,
    service_slug: "wedding-planning",
    inclusions: [
      "Everything in The Essential",
      "Full décor design across two spaces",
      "Mandap and stage production",
      "Guest hospitality desk",
      "Photo and video coordination",
      "Run sheet with 6-member crew",
    ],
    sort_order: 2,
  },
  {
    name: "The Sovereign",
    tagline: "A multi-day celebration, handled end to end",
    price: 285000,
    price_visible: true,
    featured: false,
    service_slug: "wedding-planning",
    inclusions: [
      "Everything in The Elevated",
      "Multi-day schedule across all ceremonies",
      "Accommodation and transport desk",
      "Entertainment and stage programming",
      "Dedicated client manager",
      "On-call support for the full week",
    ],
    sort_order: 3,
  },
];

export const sampleTestimonials = [
  {
    client_name: "Placeholder client",
    event_type: "Wedding · Kottayam",
    quote:
      "They held every detail so we could actually enjoy our daughter's wedding. The mandap was exactly what we had described — but better.",
    rating: 5,
    photo_url: IMG.couple,
    video_url: "",
    sort_order: 1,
  },
  {
    client_name: "Placeholder client",
    event_type: "60th birthday · Mundakayam",
    quote:
      "Forty guests in our own courtyard, and it felt like a banquet. They thought of the grandparents before we did.",
    rating: 5,
    photo_url: IMG.birthday,
    video_url: "",
    sort_order: 2,
  },
  {
    client_name: "Placeholder client",
    event_type: "Annual day · Kochi",
    quote:
      "Timing was perfect from registration to the last award. Our leadership team has already asked us to book them again.",
    rating: 5,
    photo_url: IMG.corporate,
    video_url: "",
    sort_order: 3,
  },
];

export const sampleFaqs = [
  {
    question: "How early should we book Aaha Events?",
    answer:
      "For weddings, four to eight months ahead gives us room to secure the venue and the vendors you want. Birthdays and smaller celebrations can often be arranged in three to four weeks.",
    category: "Booking",
    sort_order: 1,
  },
  {
    question: "Do you work outside Mundakayam?",
    answer:
      "Yes. We regularly plan events across Kottayam, Idukki, Pathanamthitta, Alappuzha and Kochi. Travel and stay for the crew are quoted separately and shown upfront.",
    category: "Booking",
    sort_order: 2,
  },
  {
    question: "What does the advance payment look like?",
    answer:
      "A 25% advance confirms your date. A further 50% is due two weeks before the event, and the balance on the day. Every rupee is listed in your quotation before you commit.",
    category: "Payments",
    sort_order: 3,
  },
  {
    question: "Can we use our own decorator or caterer?",
    answer:
      "Of course. We can coordinate vendors you already trust, or work purely as your design and management team. We'll always tell you honestly where a partner will save you money and where they won't.",
    category: "Planning",
    sort_order: 4,
  },
  {
    question: "How many people are on the event crew?",
    answer:
      "Most single-day weddings run with a six-person crew plus a lead coordinator. Larger multi-day celebrations scale to twelve or more, with a dedicated client manager.",
    category: "Planning",
    sort_order: 5,
  },
  {
    question: "What happens if it rains?",
    answer:
      "Kerala weather is part of the plan, not a surprise. Every outdoor design includes a covered fallback and a weather decision deadline agreed with you in advance.",
    category: "Planning",
    sort_order: 6,
  },
];

export const samplePartners = [
  { name: "Vasantham Florals", sort_order: 1 },
  { name: "Kottayam Caterers", sort_order: 2 },
  { name: "Frame & Light Studio", sort_order: 3 },
  { name: "Backwater Banquets", sort_order: 4 },
  { name: "Rubber Estate Events", sort_order: 5 },
  { name: "Nila Sound & Lights", sort_order: 6 },
  { name: "The Sadya Company", sort_order: 7 },
  { name: "Mundakayam Convention Centre", sort_order: 8 },
];

export const sampleHighlights = [
  {
    kind: "why",
    icon: "compass",
    title: "End-to-end planning",
    description: "One team from the first enquiry to the final invoice — no chasing different vendors.",
    sort_order: 1,
  },
  {
    kind: "why",
    icon: "handshake",
    title: "Vendors we trust",
    description: "Forty-plus partners we have worked with for years, priced fairly and held to our standard.",
    sort_order: 2,
  },
  {
    kind: "why",
    icon: "clock",
    title: "On-time execution",
    description: "Minute-by-minute run sheets and a rehearsal before the day, so nothing runs late.",
    sort_order: 3,
  },
  {
    kind: "why",
    icon: "sparkles",
    title: "Custom themes",
    description: "Design built around your family, your venue and your budget — never a template.",
    sort_order: 4,
  },
  {
    kind: "why",
    icon: "receipt",
    title: "Transparent pricing",
    description: "Itemised quotations, no hidden line items, and changes agreed in writing.",
    sort_order: 5,
  },
  {
    kind: "why",
    icon: "heart",
    title: "Kerala hospitality",
    description: "Guest care that treats your relatives the way your family would treat them.",
    sort_order: 6,
  },
  {
    kind: "process",
    step_number: 1,
    icon: "message",
    title: "Enquire",
    description: "Tell us the date, the place and the feeling you want. We reply within one working day.",
    sort_order: 1,
  },
  {
    kind: "process",
    step_number: 2,
    icon: "map",
    title: "Plan",
    description: "We shortlist venues and vendors, build a budget you can see, and agree the design direction.",
    sort_order: 2,
  },
  {
    kind: "process",
    step_number: 3,
    icon: "wand",
    title: "Customise",
    description: "Décor, menu, music and flow are refined over two review rounds until it feels like yours.",
    sort_order: 3,
  },
  {
    kind: "process",
    step_number: 4,
    icon: "party",
    title: "Celebrate",
    description: "Our crew runs the day while you are present for every moment of it.",
    sort_order: 4,
  },
];

export const sampleAlbums = [
  {
    title: "Kottayam Wedding 2026",
    slug: "kottayam-wedding-2026",
    event_type: "Weddings",
    event_date: "2026-01-18",
    location: "Kottayam",
    description: "A three-ceremony wedding in a rubber estate: jasmine mandap, brass lamps and a sadya for 400.",
    cover_url: IMG.heroWedding,
    sort_order: 1,
  },
  {
    title: "An Ivory Engagement",
    slug: "ivory-engagement",
    event_type: "Engagements",
    event_date: "2026-02-09",
    location: "Mundakayam",
    description: "Ring ceremony for 80 guests with cream florals, warm candlelight and a string duo.",
    cover_url: IMG.engagement,
    sort_order: 2,
  },
  {
    title: "First Birthday in Gold",
    slug: "first-birthday-in-gold",
    event_type: "Birthdays",
    event_date: "2026-03-02",
    location: "Kottayam",
    description: "A cream-and-gold first birthday with a garden picnic setup for the little ones.",
    cover_url: IMG.birthday,
    sort_order: 3,
  },
  {
    title: "Annual Day, Kochi",
    slug: "annual-day-kochi",
    event_type: "Corporate",
    event_date: "2026-04-11",
    location: "Kochi",
    description: "A 900-guest annual day with an awards segment, live band and full stage production.",
    cover_url: IMG.corporate,
    sort_order: 4,
  },
];

export const sampleGalleryItems = [
  { album_slug: "kottayam-wedding-2026", type: "image", url: IMG.heroWedding, caption: "Garland exchange at golden hour", sort_order: 1 },
  { album_slug: "kottayam-wedding-2026", type: "image", url: IMG.mandap, caption: "Jasmine mandap with brass lamps", sort_order: 2 },
  { album_slug: "kottayam-wedding-2026", type: "image", url: IMG.sadya, caption: "Sadya served on banana leaf", sort_order: 3 },
  { album_slug: "kottayam-wedding-2026", type: "image", url: IMG.couple, caption: "The couple, between ceremonies", sort_order: 4 },
  { album_slug: "ivory-engagement", type: "image", url: IMG.engagement, caption: "Rings and cream silk", sort_order: 1 },
  { album_slug: "ivory-engagement", type: "image", url: IMG.floral, caption: "Jasmine and rose centrepieces", sort_order: 2 },
  { album_slug: "first-birthday-in-gold", type: "image", url: IMG.birthday, caption: "Cream and gold cake table", sort_order: 1 },
  { album_slug: "annual-day-kochi", type: "image", url: IMG.corporate, caption: "Main stage before doors", sort_order: 1 },
  { album_slug: "annual-day-kochi", type: "video", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", caption: "Annual day highlights film", sort_order: 2 },
];

export const samplePosts = [
  {
    title: "A real wedding budget for Kerala, broken down honestly",
    slug: "kerala-wedding-budget-breakdown",
    excerpt:
      "What a 200-guest wedding in Kottayam actually costs — venue, sadya, décor, photography — with the percentages we see most often.",
    category: "Planning",
    cover_url: IMG.sadya,
    author: "Aaha Events",
    read_minutes: 7,
    published_date: "2026-10-02",
    published: true,
    content:
      "## Start with the guest count\n\nAlmost every line in a wedding budget moves with the number of guests. Fix the count before you fall in love with a venue.\n\n## The five big lines\n\nVenue, catering, décor, photography and clothing usually account for 80% of the spend. Everything else — invitations, transport, gifts — sits in the remaining 20%.\n\n## Where we save clients money\n\nMid-week dates, one strong décor installation instead of five small ones, and hiring a team that already knows your vendors.\n\n## Where not to save\n\nSound, lighting and the crew that runs the day. Guests forget the centrepieces; they remember waiting forty minutes for dinner.",
  },
  {
    title: "Five décor ideas that suit Kerala venues",
    slug: "decor-ideas-kerala-venues",
    excerpt:
      "Jasmine, brass, banana leaf and warm light — design notes that work with our architecture instead of fighting it.",
    category: "Design",
    cover_url: IMG.mandap,
    author: "Aaha Events",
    read_minutes: 5,
    published_date: "2026-09-18",
    published: true,
    content:
      "## Work with the light\n\nKerala's late-afternoon light is warm and low. Design for 4pm and your photographs will thank you.\n\n## Brass over chrome\n\nBrass lamps and vessels photograph beautifully and suit both traditional and modern settings.\n\n## One strong focal point\n\nA single jasmine installation behind the stage reads better in photographs than ten small arrangements.\n\n## Let the greenery in\n\nPalms, areca and rubber estate backdrops need very little added to feel grand.\n\n## Keep seating generous\n\nComfort is the most underrated part of décor.",
  },
  {
    title: "How to plan a celebration in six weeks",
    slug: "plan-celebration-in-six-weeks",
    excerpt:
      "A realistic week-by-week timeline for a last-minute birthday, engagement or anniversary that still feels considered.",
    category: "Planning",
    cover_url: IMG.birthday,
    author: "Aaha Events",
    read_minutes: 6,
    published_date: "2026-08-30",
    published: true,
    content:
      "## Week one: date, guest count, budget\n\nLock these three and the rest becomes a series of choices rather than guesswork.\n\n## Week two: venue and caterer\n\nBook both before anything decorative. Menus and floor plans depend on them.\n\n## Week three: design direction\n\nChoose a palette and one hero element. Everything else supports it.\n\n## Week four: invitations and logistics\n\nSend digital invites, confirm transport and accommodation for out-of-town family.\n\n## Week five: rehearsal\n\nWalk the flow once, with the people who will actually be there.\n\n## Week six: breathe\n\nConfirm timings, hand over the run sheet, and let the crew carry it.",
  },
];

export const sampleWhyUs = sampleHighlights.filter((h) => h.kind === "why");
export const sampleProcess = sampleHighlights.filter((h) => h.kind === "process");

export const sampleTeam = [
  {
    name: "Name to be added",
    role: "Founder & lead planner",
    bio: "Runs every wedding plan personally, from the first site visit to the final invoice.",
    photo_url: "",
    sort_order: 1,
  },
  {
    name: "Name to be added",
    role: "Décor & design lead",
    bio: "Draws every mandap and table setting before a single flower is ordered.",
    photo_url: "",
    sort_order: 2,
  },
  {
    name: "Name to be added",
    role: "Guest hospitality lead",
    bio: "Looks after accommodation, transport and the relatives nobody remembered to seat.",
    photo_url: "",
    sort_order: 3,
  },
];