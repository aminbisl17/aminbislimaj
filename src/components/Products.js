
// Change the folder to wherever your screenshots live
const shots = import.meta.glob(
  "../assets/project/*.{png,jpg,jpeg,webp}",
  { eager: true, query: "?url", import: "default" }
);
console.log("gallery files found:", Object.keys(shots));

const beautySalonGallery = Object.entries(shots)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([path, src]) => ({
    src,
    name: path.split("/").pop().replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
  }));
// One object per product. The page at /product/:slug renders whichever one matches the slug.
const products = [
  {
    id: "beautysalon",
    slug: "beautysalon",
    name: "BeautySalon",
    brandIcon: "B.",
    title: "Run your salon without the phone calls.",
    description:
      "Online booking, team schedules and day-to-day administration in one system, on web, mobile and desktop.",
    heroImage: null, // e.g. import shot from "./assets/hero.png"
    rating: 5,
    tech: ["Java", "Spring Boot", "React", "React Native", "JavaFX", "SQL Server"],
    platformsTitle: "One product, three apps",
    platforms: [
      ["Web", "Clients book online. Admins manage the salon from any browser."],
      ["Mobile", "Employees and admins check the day's schedule on the go."],
      ["Desktop", "Company-level operations for owners and managers."],
    ],
    heroImage: beautySalonGallery[0]?.src || null,
gallery: beautySalonGallery,
    featuresTitle: "Built around real salon workflows",
    features: [
      ["Appointment booking", "Clients pick a service, a stylist and a time that is actually free."],
      ["Team and schedules", "Set each employee's services, working hours and access level."],
      ["Salon administration", "Manage clients, services and daily operations from one place."],
      ["Real-time updates", "A booking made on the web shows up instantly on every device."],
    ],
    plans: [
      {
        id: "starter",
        name: "Starter",
        price: 29,
        blurb: "For a single-chair studio getting started.",
        features: ["1 location", "Up to 3 employees", "Online booking page", "Email reminders"],
      },
      {
        id: "pro",
        name: "Professional",
        price: 59,
        featured: true,
        blurb: "For growing salons with a full team.",
        features: ["1 location", "Up to 15 employees", "Web, mobile and desktop apps", "Role-based access", "Reports"],
      },
      {
        id: "business",
        name: "Business",
        price: 119,
        blurb: "For salon groups with several branches.",
        features: ["Unlimited locations", "Unlimited employees", "Company-level desktop app", "Priority support"],
      },
    ],
    // Placeholder reviews, used until /api/products/:id/reviews responds
    reviews: [
      { id: 1, name: "Sample reviewer", rating: 5, date: "2026-09-12", text: "Replace with real reviews from your backend." },
    ],
    cta: {
      title: "Ready to try it in your salon?",
      text: "Get a key today, or tell me what your salon needs and I will build around it.",
    },
  },
];

export default products;