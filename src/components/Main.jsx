import { useCallback, useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Bell,
  Building2,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Database,
  Download,
  GraduationCap,
  Layers,
  Mail,
  MapPin,
  Menu,
  Phone,
  Radio,
  Server,
  ShieldCheck,
  ThumbsUp,
  Wrench,
  X,
} from "lucide-react";
import "./Portfolio.css";
import products from "./Products";

const projectImages = import.meta.glob(
  "../assets/project/*.{png,jpg,jpeg,webp}",
  { eager: true, query: "?url", import: "default" }
);

const gallery = Object.entries(projectImages)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([path, src]) => ({
    src,
    kind: /Screenshot/i.test(path) ? "desktop" : "mobile",
  }));

const desktopShots = gallery.filter((g) => g.kind === "desktop");
const mobileShots = gallery.filter((g) => g.kind === "mobile");
const orderedShots = [...desktopShots, ...mobileShots];

const profile = {
  name: "Amin Bislimaj",
  email: "amin.b05@icloud.com",
  phone: "+383 45 380 871",
  whatsapp: "https://wa.me/38345380871",
  github: "https://github.com/aminbisl17",
  linkedin: "https://www.linkedin.com/in/aminbislimaj",
  demoClient: "https://beautysalonclient.aminbislimaj.com",
  demoAdmin: "https://beautysalonadmin.aminbislimaj.com",
  cv: "/Amin_Bislimaj_CV.pdf",
};

const skills = [
  {
    key: "backend",
    icon: Server,
    items: [
      "Java", "Spring Boot", "REST API design", "OOP",
      "Layered architecture", "JWT & refresh tokens", "RBAC",
      "Type-based access control",
    ],
  },
  {
    key: "database",
    icon: Database,
    items: [
      "Microsoft SQL Server", "MySQL", "Relational modelling",
      "Multi-tenant architecture", "Stored procedures",
      "Query optimization", "DB-level validation",
    ],
  },
  {
    key: "applications",
    icon: Layers,
    items: [
      "React", "React Native (Expo)", "JavaFX",
      "API integration", "Web, mobile & desktop UI",
    ],
  },
  {
    key: "infrastructure",
    icon: Wrench,
    items: [
      "Git & GitHub", "Azure", "Render", "Cloudflare", "Postman",
      "Swagger / OpenAPI", "WebSockets", "Twilio SMS", "Firebase Push",
      "Thymeleaf email", "Azure Blob Storage", "QR authentication",
    ],
  },
];

const highlightIcons = [ShieldCheck, Building2, Radio, Bell];

const translations = {
  en: {
    nav: {
      about: "About", experience: "Experience", work: "Work",
      skills: "Skills", contact: "Contact", resume: "Résumé",
      login: "Sign in", menu: "Open menu", close: "Close menu",
    },
    hero: {
      status: "Open to software engineering roles",
      role: "Software Engineer",
      headline: "I design and build secure, scalable backend systems.",
      description:
        "Java and Spring Boot engineer focused on API design, authentication, relational data modelling and multi-tenant architecture. I took a SaaS platform from first idea to production across web, mobile and desktop.",
      primary: "View case study",
      secondary: "Download résumé",
      location: "Prizren, Kosovo",
    },
    panel: {
      file: "engineer.json",
      role: "Software Engineer",
      focus: "Backend systems",
      stack: "Java, Spring Boot, SQL",
      shipped: "Multi-tenant SaaS",
      status: "available",
    },
    metrics: [
      { value: "4", label: "client apps served by one REST API" },
      { value: "100s", label: "bookings and operations handled daily" },
      { value: "60–70%", label: "less time spent managing appointments" },
      { value: "3", label: "platforms: web, mobile and desktop" },
    ],
    sections: {
      about: "About",
      experience: "Experience",
      work: "Selected work",
      skills: "Skills",
      education: "Education",
      contact: "Contact",
    },
    about: {
      lead:
        "I like turning real business requirements into software that is reliable, secure and easy to evolve.",
      p1: "My core stack is Java and Spring Boot. Most of my work sits behind the interface: API contracts, authentication and authorization, database schemas, and the business rules that tie them together.",
      p2: "Rather than isolated demos, I built and shipped a complete product: a multi-tenant SaaS platform with a Spring Boot backend, a relational database, React web apps, React Native mobile apps and a JavaFX desktop client, all kept in sync in real time.",
      p3: "I care about clear architecture, predictable performance and code that the next engineer can read.",
      facts: [
        ["Focus", "Backend engineering"],
        ["Languages", "Java, SQL, JavaScript"],
        ["Based in", "Prizren, Kosovo"],
        ["Education", "UBT"],
      ],
    },
    experience: {
      period: "Current",
      title: "Software Engineer",
      org: "Independent · Beauty Salon SaaS",
      summary:
        "Designed, built and operate a multi-tenant SaaS platform end to end, from requirements and data model to deployment.",
      items: [
        "Built a Spring Boot REST API that serves four separate client applications.",
        "Designed a relational multi-tenant schema with tenant isolation at database and application level.",
        "Implemented JWT with refresh tokens, OTP verification and role- and type-based access control.",
        "Added WebSocket synchronization and conflict detection to prevent double bookings.",
        "Diagnosed and resolved performance and synchronization issues across clients.",
        "Documented the API with Swagger and tested it with Postman; versioned with Git and GitHub.",
      ],
    },
    work: {
      eyebrow: "Case study",
      title: "Beauty Salon SaaS",
      summary:
        "A multi-tenant platform for running beauty salons: appointments, staff, services, clients and availability, kept in sync across web, mobile and desktop.",
      meta: [
        ["Role", "Sole engineer"],
        ["Scope", "Backend, database, 4 clients"],
        ["Backend", "Java · Spring Boot"],
        ["Data", "SQL Server · MySQL"],
      ],
      links: {
        product: "Product page",
        client: "Live client app",
        admin: "Live admin app",
      },
      architecture: "Architecture",
      arch: {
        clients: "Clients",
        api: "Spring Boot REST API",
        apiNote: "JWT · RBAC · Swagger",
        realtime: "WebSocket",
        data: "Multi-tenant SQL database",
        services: "Integrations",
        clientList: ["Client web · React", "Admin web · React", "Mobile · React Native", "Desktop · JavaFX"],
        serviceList: ["Twilio SMS", "Firebase Push", "Email · Thymeleaf", "Azure Blob Storage"],
      },
      highlightsTitle: "Engineering highlights",
      highlights: [
        { title: "Authentication & access", text: "JWT with refresh tokens, OTP login verification, and role- and type-based access for admins, staff and clients." },
        { title: "Tenant isolation", text: "Tenant-aware data separation at database and application level so each salon's data stays private." },
        { title: "Real-time bookings", text: "WebSocket sync, automatic availability updates and conflict detection that prevents double bookings." },
        { title: "Notifications", text: "Twilio SMS, Firebase push and Thymeleaf email templates for confirmations and one-time codes." },
      ],
      builtTitle: "What I built",
      built: [
        "Spring Boot backend and documented REST API",
        "Relational multi-tenant schema and business logic",
        "Client and admin web apps in React",
        "Mobile apps with React Native (Expo)",
        "Desktop client with JavaFX",
        "QR-code sessions with automatic expiry",
      ],
      featuresTitle: "Business capabilities",
      features: [
        "Appointment and reservation management",
        "Staff, roles and skills",
        "Services with custom pricing",
        "Dynamic availability and breaks",
        "Complete client history",
        "Admin statistics and KPIs",
      ],
      screens: "Screens",
      desktop: "Desktop client",
      mobile: "Mobile & web",
      open: "Open screenshot",
      prev: "Previous screenshot",
      next: "Next screenshot",
      close: "Close",
    },
    skillGroups: {
      backend: "Backend", database: "Data",
      applications: "Client applications", infrastructure: "Cloud, tooling & integrations",
    },
    education: {
      school: "UBT — University for Business and Technology",
      place: "Prizren, Kosovo",
      label: "University",
    },
    contact: {
      title: "Let's work together.",
      text: "I'm open to software engineering roles and selected freelance projects. The fastest way to reach me is email.",
      copy: "Copy email",
      copied: "Copied",
      cv: "Download résumé",
    },
    feedback: {
      ask: "Like this portfolio?",
      approve: "Endorse",
      thanks: "Thanks for the endorsement",
      error: "Couldn't save that. Please try again.",
    },
    footer: "Software Engineer",
  },

  sq: {
    nav: {
      about: "Rreth meje", experience: "Përvoja", work: "Projektet",
      skills: "Aftësitë", contact: "Kontakt", resume: "CV",
      login: "Hyr", menu: "Hap menunë", close: "Mbyll menunë",
    },
    hero: {
      status: "I hapur për pozita në inxhinieri softuerike",
      role: "Inxhinier Softueri",
      headline: "Dizajnoj dhe ndërtoj sisteme backend të sigurta dhe të shkallëzueshme.",
      description:
        "Inxhinier me Java dhe Spring Boot, i fokusuar në dizajnin e API-ve, autentikimin, modelimin e të dhënave relacionale dhe arkitekturën multi-tenant. Kam çuar një platformë SaaS nga ideja deri në prodhim për web, mobile dhe desktop.",
      primary: "Shiko projektin",
      secondary: "Shkarko CV-në",
      location: "Prizren, Kosovë",
    },
    panel: {
      file: "engineer.json",
      role: "Inxhinier Softueri",
      focus: "Sisteme backend",
      stack: "Java, Spring Boot, SQL",
      shipped: "SaaS multi-tenant",
      status: "i disponueshëm",
    },
    metrics: [
      { value: "4", label: "aplikacione klient mbi një REST API" },
      { value: "100+", label: "rezervime dhe operacione në ditë" },
      { value: "60–70%", label: "më pak kohë për menaxhimin e termineve" },
      { value: "3", label: "platforma: web, mobile dhe desktop" },
    ],
    sections: {
      about: "Rreth meje",
      experience: "Përvoja",
      work: "Projektet",
      skills: "Aftësitë",
      education: "Edukimi",
      contact: "Kontakt",
    },
    about: {
      lead:
        "Më pëlqen t'i shndërroj kërkesat reale të biznesit në softuer të besueshëm, të sigurt dhe të lehtë për t'u zhvilluar më tej.",
      p1: "Stack-u im kryesor është Java dhe Spring Boot. Pjesa më e madhe e punës sime është pas ndërfaqes: kontratat e API-ve, autentikimi dhe autorizimi, skemat e databazës dhe rregullat e biznesit që i lidhin ato.",
      p2: "Në vend të demove të izoluara, ndërtova dhe publikova një produkt të plotë: platformë SaaS multi-tenant me backend Spring Boot, databazë relacionale, aplikacione web në React, mobile në React Native dhe klient desktop në JavaFX, të sinkronizuara në kohë reale.",
      p3: "Më intereson arkitektura e qartë, performanca e parashikueshme dhe kodi që inxhinieri tjetër e lexon lehtë.",
      facts: [
        ["Fokusi", "Inxhinieri backend"],
        ["Gjuhët", "Java, SQL, JavaScript"],
        ["Vendndodhja", "Prizren, Kosovë"],
        ["Edukimi", "UBT"],
      ],
    },
    experience: {
      period: "Aktualisht",
      title: "Inxhinier Softueri",
      org: "I pavarur · Beauty Salon SaaS",
      summary:
        "Dizajnova, ndërtova dhe mirëmbaj një platformë SaaS multi-tenant nga fillimi në fund, nga kërkesat dhe modeli i të dhënave deri te vendosja në prodhim.",
      items: [
        "Ndërtova REST API me Spring Boot që shërben katër aplikacione klient.",
        "Dizajnova skemë relacionale multi-tenant me izolim në nivel databaze dhe aplikacioni.",
        "Implementova JWT me refresh tokens, verifikim OTP dhe kontroll aksesi sipas roleve dhe llojit.",
        "Shtova sinkronizim me WebSocket dhe zbulim konfliktesh kundër rezervimeve të dyfishta.",
        "Diagnostikova dhe zgjidha probleme performance dhe sinkronizimi mes klientëve.",
        "Dokumentova API-n me Swagger dhe e testova me Postman; versionim me Git dhe GitHub.",
      ],
    },
    work: {
      eyebrow: "Studim rasti",
      title: "Beauty Salon SaaS",
      summary:
        "Platformë multi-tenant për menaxhimin e salloneve të bukurisë: terminet, stafi, shërbimet, klientët dhe disponueshmëria, të sinkronizuara mes web, mobile dhe desktop.",
      meta: [
        ["Roli", "Inxhinier i vetëm"],
        ["Shtrirja", "Backend, databazë, 4 klientë"],
        ["Backend", "Java · Spring Boot"],
        ["Të dhënat", "SQL Server · MySQL"],
      ],
      links: {
        product: "Faqja e produktit",
        client: "Aplikacioni për klientë",
        admin: "Aplikacioni admin",
      },
      architecture: "Arkitektura",
      arch: {
        clients: "Klientët",
        api: "Spring Boot REST API",
        apiNote: "JWT · RBAC · Swagger",
        realtime: "WebSocket",
        data: "Databazë SQL multi-tenant",
        services: "Integrime",
        clientList: ["Web klient · React", "Web admin · React", "Mobile · React Native", "Desktop · JavaFX"],
        serviceList: ["Twilio SMS", "Firebase Push", "Email · Thymeleaf", "Azure Blob Storage"],
      },
      highlightsTitle: "Pikat kryesore teknike",
      highlights: [
        { title: "Autentikim dhe akses", text: "JWT me refresh tokens, verifikim OTP dhe akses sipas roleve dhe llojit për administratorë, staf dhe klientë." },
        { title: "Izolim i tenant-ëve", text: "Ndarje e të dhënave në nivel databaze dhe aplikacioni, që të dhënat e çdo salloni të mbeten private." },
        { title: "Rezervime në kohë reale", text: "Sinkronizim me WebSocket, përditësim automatik i disponueshmërisë dhe zbulim konfliktesh." },
        { title: "Njoftime", text: "Twilio SMS, Firebase push dhe email me Thymeleaf për konfirmime dhe kode njëpërdorimshe." },
      ],
      builtTitle: "Çfarë ndërtova",
      built: [
        "Backend me Spring Boot dhe REST API i dokumentuar",
        "Skemë relacionale multi-tenant dhe logjikë biznesi",
        "Aplikacione web për klientë dhe administratë në React",
        "Aplikacione mobile me React Native (Expo)",
        "Klient desktop me JavaFX",
        "Sesione me QR code me skadim automatik",
      ],
      featuresTitle: "Funksionalitetet e biznesit",
      features: [
        "Menaxhimi i termineve dhe rezervimeve",
        "Stafi, rolet dhe aftësitë",
        "Shërbime me çmime të personalizuara",
        "Disponueshmëri dinamike dhe pauza",
        "Historiku i plotë i klientit",
        "Statistika dhe KPI për administratorin",
      ],
      screens: "Pamje",
      desktop: "Klienti desktop",
      mobile: "Mobile dhe web",
      open: "Hap pamjen",
      prev: "Pamja e mëparshme",
      next: "Pamja tjetër",
      close: "Mbyll",
    },
    skillGroups: {
      backend: "Backend", database: "Të dhënat",
      applications: "Aplikacionet klient", infrastructure: "Cloud, vegla dhe integrime",
    },
    education: {
      school: "UBT — University for Business and Technology",
      place: "Prizren, Kosovë",
      label: "Universiteti",
    },
    contact: {
      title: "Le të punojmë bashkë.",
      text: "Jam i hapur për pozita në inxhinieri softuerike dhe projekte të zgjedhura freelance. Mënyra më e shpejtë për të më kontaktuar është email-i.",
      copy: "Kopjo email-in",
      copied: "U kopjua",
      cv: "Shkarko CV-në",
    },
    feedback: {
      ask: "Ju pëlqen ky portfolio?",
      approve: "Rekomando",
      thanks: "Faleminderit për rekomandimin",
      error: "Nuk u ruajt. Provo përsëri.",
    },
    footer: "Inxhinier Softueri",
  },
};

function getInitialLanguage() {
  if (typeof window === "undefined") return "en";
  const fromQuery = new URLSearchParams(window.location.search).get("lang");
  if (fromQuery === "sq" || fromQuery === "en") return fromQuery;
  const stored = window.localStorage?.getItem("lang");
  if (stored === "sq" || stored === "en") return stored;
  return navigator.language?.toLowerCase().startsWith("sq") ? "sq" : "en";
}

export default function Main() {
  const [language, setLanguage] = useState(getInitialLanguage);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lightbox, setLightbox] = useState(null);
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState({ approve: 0 });
  const [hasVoted, setHasVoted] = useState(false);
  const [feedbackLoading, setFeedbackLoading] = useState(true);
  const [feedbackError, setFeedbackError] = useState(false);

  const t = translations[language];
  const product = products[0];

  useEffect(() => {
    document.documentElement.lang = language;
    try {
      localStorage.setItem("lang", language);
    } catch {
      /* storage unavailable */
    }
  }, [language]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const step = useCallback(
    (dir) =>
      setLightbox((i) =>
        i === null ? i : (i + dir + orderedShots.length) % orderedShots.length
      ),
    []
  );

  useEffect(() => {
    if (lightbox === null && !menuOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setLightbox(null);
        setMenuOpen(false);
      }
      if (lightbox !== null && e.key === "ArrowRight") step(1);
      if (lightbox !== null && e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [lightbox, menuOpen, step]);

  useEffect(() => {
    fetch("/api/feedback")
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data) => {
        setFeedback({ approve: data.approve || 0 });
        setHasVoted(Boolean(data.hasVoted));
      })
      .catch(() => {})
      .finally(() => setFeedbackLoading(false));
  }, []);

  const submitFeedback = async () => {
    if (hasVoted || feedbackLoading) return;
    setFeedbackLoading(true);
    setFeedbackError(false);
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "approve" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setFeedback({ approve: data.approve || 0 });
      setHasVoted(true);
    } catch {
      setFeedbackError(true);
    } finally {
      setFeedbackLoading(false);
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const navItems = [
    ["about", t.nav.about],
    ["experience", t.nav.experience],
    ["work", t.nav.work],
    ["skills", t.nav.skills],
    ["contact", t.nav.contact],
  ];

  const LangSwitch = (
    <div className="pf-lang" role="group" aria-label="Language">
      {["en", "sq"].map((code) => (
        <button
          key={code}
          type="button"
          className={language === code ? "is-active" : ""}
          aria-pressed={language === code}
          onClick={() => setLanguage(code)}
        >
          {code === "en" ? "EN" : "SQ"}
        </button>
      ))}
    </div>
  );

  return (
    <div className="pf">
      <a className="pf-skip" href="#main">Skip to content</a>

      {/* HEADER */}
      <header className={`pf-header ${scrolled ? "is-scrolled" : ""}`}>
        <nav className="pf-container pf-nav" aria-label="Primary">
          <a href="#top" className="pf-brand" aria-label="Amin Bislimaj — home">
            <span className="pf-monogram" aria-hidden="true">AB</span>
            <span className="pf-brand-text">
              <strong>Amin Bislimaj</strong>
              <span>{t.hero.role}</span>
            </span>
          </a>

          <ul className="pf-nav-links">
            {navItems.map(([id, label]) => (
              <li key={id}>
                <a href={`#${id}`}>{label}</a>
              </li>
            ))}
          </ul>

          <div className="pf-nav-actions">
            {LangSwitch}
            <a href="/company" className="pf-nav-login">{t.nav.login}</a>
            <a href={profile.cv} target="_blank" rel="noopener" className="pf-btn pf-btn-sm pf-btn-dark">
              {t.nav.resume}
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>

          <button
            type="button"
            className="pf-menu-toggle"
            aria-label={menuOpen ? t.nav.close : t.nav.menu}
            aria-expanded={menuOpen}
            aria-controls="pf-mobile-menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>

        {menuOpen && (
          <div className="pf-mobile-menu" id="pf-mobile-menu">
            <ul>
              {navItems.map(([id, label]) => (
                <li key={id}>
                  <a href={`#${id}`} onClick={() => setMenuOpen(false)}>
                    {label}
                    <ArrowRight size={16} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
            <div className="pf-mobile-menu-foot">
              {LangSwitch}
              <a href="/company" className="pf-nav-login">{t.nav.login}</a>
              <a href={profile.cv} target="_blank" rel="noopener" className="pf-btn pf-btn-sm pf-btn-dark">
                {t.nav.resume}
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </div>
          </div>
        )}
      </header>

      <main id="main">
        {/* HERO */}
        <section className="pf-hero" id="top">
          <div className="pf-container pf-hero-grid">
            <div className="pf-hero-copy">
              <p className="pf-status">
                <span className="pf-status-dot" aria-hidden="true" />
                {t.hero.status}
              </p>

              <h1>
                <span className="pf-hero-name">Amin Bislimaj — {t.hero.role}</span>
                {t.hero.headline}
              </h1>

              <p className="pf-hero-lede">{t.hero.description}</p>

              <div className="pf-hero-actions">
                <a href="#work" className="pf-btn pf-btn-dark">
                  {t.hero.primary}
                  <ArrowRight size={16} aria-hidden="true" />
                </a>
                <a href={profile.cv} download className="pf-btn pf-btn-outline">
                  <Download size={16} aria-hidden="true" />
                  {t.hero.secondary}
                </a>
              </div>

              <ul className="pf-hero-meta">
                <li>
                  <MapPin size={15} aria-hidden="true" />
                  {t.hero.location}
                </li>
                <li>
                  <a href={profile.github} target="_blank" rel="noopener me">
                    <GithubIcon /> GitHub
                  </a>
                </li>
                <li>
                  <a href={profile.linkedin} target="_blank" rel="noopener me">
                    <LinkedinIcon /> LinkedIn
                  </a>
                </li>
              </ul>
            </div>

            <aside className="pf-panel" aria-label="Profile summary">
              <div className="pf-panel-bar">
                <span className="pf-dots" aria-hidden="true"><i /><i /><i /></span>
                <span className="pf-panel-file">{t.panel.file}</span>
              </div>
              <pre className="pf-code" aria-hidden="true">
<span className="c-p">{"{"}</span>{"\n"}
{"  "}<span className="c-k">"name"</span>: <span className="c-s">"Amin Bislimaj"</span>,{"\n"}
{"  "}<span className="c-k">"role"</span>: <span className="c-s">"{t.panel.role}"</span>,{"\n"}
{"  "}<span className="c-k">"focus"</span>: <span className="c-s">"{t.panel.focus}"</span>,{"\n"}
{"  "}<span className="c-k">"stack"</span>: <span className="c-s">"{t.panel.stack}"</span>,{"\n"}
{"  "}<span className="c-k">"shipped"</span>: <span className="c-s">"{t.panel.shipped}"</span>,{"\n"}
{"  "}<span className="c-k">"status"</span>: <span className="c-ok">"{t.panel.status}"</span>{"\n"}
<span className="c-p">{"}"}</span>
              </pre>
              <dl className="pf-panel-sr">
                <dt>Role</dt><dd>{t.panel.role}</dd>
                <dt>Focus</dt><dd>{t.panel.focus}</dd>
                <dt>Stack</dt><dd>{t.panel.stack}</dd>
              </dl>
            </aside>
          </div>

          <div className="pf-container">
            <dl className="pf-metrics">
              {t.metrics.map((m) => (
                <div key={m.label}>
                  <dt>{m.value}</dt>
                  <dd>{m.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ABOUT */}
        <section className="pf-section" id="about" aria-labelledby="about-title">
          <div className="pf-container pf-split">
            <SectionLabel index="01" id="about-title">{t.sections.about}</SectionLabel>
            <div>
              <p className="pf-lead">{t.about.lead}</p>
              <div className="pf-about-body">
                <div className="pf-prose">
                  <p>{t.about.p1}</p>
                  <p>{t.about.p2}</p>
                  <p>{t.about.p3}</p>
                </div>
                <dl className="pf-facts">
                  {t.about.facts.map(([k, v]) => (
                    <div key={k}>
                      <dt>{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section className="pf-section" id="experience" aria-labelledby="exp-title">
          <div className="pf-container pf-split">
            <SectionLabel index="02" id="exp-title">{t.sections.experience}</SectionLabel>
            <ol className="pf-timeline">
              <li>
                <div className="pf-timeline-period">{t.experience.period}</div>
                <div className="pf-timeline-body">
                  <h3>{t.experience.title}</h3>
                  <p className="pf-timeline-org">{t.experience.org}</p>
                  <p>{t.experience.summary}</p>
                  <ul className="pf-checklist">
                    {t.experience.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <ul className="pf-tags">
                    {["Java", "Spring Boot", "SQL Server", "React", "React Native", "JavaFX", "WebSockets", "Azure"].map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </div>
              </li>
            </ol>
          </div>
        </section>

        {/* WORK */}
        <section className="pf-section" id="work" aria-labelledby="work-title">
          <div className="pf-container">
            <div className="pf-split pf-split-tight">
              <SectionLabel index="03" id="work-title">{t.sections.work}</SectionLabel>
              <div />
            </div>

            <article className="pf-case">
              <header className="pf-case-head">
                <div>
                  <p className="pf-eyebrow">{t.work.eyebrow} · 01</p>
                  <h3 className="pf-case-title">{t.work.title}</h3>
                  <p className="pf-case-summary">{t.work.summary}</p>
                  <div className="pf-case-links">
                    <a href={`/product/${product.slug}`} className="pf-btn pf-btn-dark pf-btn-sm">
                      {t.work.links.product}
                      <ArrowRight size={15} aria-hidden="true" />
                    </a>
                    <a href={profile.demoClient} target="_blank" rel="noopener" className="pf-btn pf-btn-outline pf-btn-sm">
                      {t.work.links.client}
                      <ArrowUpRight size={15} aria-hidden="true" />
                    </a>
                    <a href={profile.demoAdmin} target="_blank" rel="noopener" className="pf-btn pf-btn-outline pf-btn-sm">
                      {t.work.links.admin}
                      <ArrowUpRight size={15} aria-hidden="true" />
                    </a>
                  </div>
                </div>
                <dl className="pf-case-meta">
                  {t.work.meta.map(([k, v]) => (
                    <div key={k}>
                      <dt>{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                </dl>
              </header>

              {/* Architecture */}
              <div className="pf-case-block">
                <h4 className="pf-block-title">{t.work.architecture}</h4>
                <div className="pf-arch" role="img" aria-label={`${t.work.arch.clients} → ${t.work.arch.api} → ${t.work.arch.data}`}>
                  <div className="pf-arch-col">
                    <span className="pf-arch-label">{t.work.arch.clients}</span>
                    {t.work.arch.clientList.map((c) => (
                      <div className="pf-arch-node" key={c}>{c}</div>
                    ))}
                  </div>
                  <div className="pf-arch-link" aria-hidden="true">
                    <span>HTTPS / JSON</span>
                    <span>{t.work.arch.realtime}</span>
                  </div>
                  <div className="pf-arch-col pf-arch-core">
                    <span className="pf-arch-label">API</span>
                    <div className="pf-arch-node pf-arch-api">
                      <strong>{t.work.arch.api}</strong>
                      <small>{t.work.arch.apiNote}</small>
                    </div>
                    <div className="pf-arch-node pf-arch-db">
                      <Database size={16} aria-hidden="true" />
                      {t.work.arch.data}
                    </div>
                  </div>
                  <div className="pf-arch-link" aria-hidden="true">
                    <span>REST / SDK</span>
                  </div>
                  <div className="pf-arch-col">
                    <span className="pf-arch-label">{t.work.arch.services}</span>
                    {t.work.arch.serviceList.map((s) => (
                      <div className="pf-arch-node pf-arch-svc" key={s}>{s}</div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Highlights */}
              <div className="pf-case-block">
                <h4 className="pf-block-title">{t.work.highlightsTitle}</h4>
                <div className="pf-highlights">
                  {t.work.highlights.map((h, i) => {
                    const Icon = highlightIcons[i];
                    return (
                      <div className="pf-highlight" key={h.title}>
                        <span className="pf-highlight-icon" aria-hidden="true"><Icon size={18} /></span>
                        <h5>{h.title}</h5>
                        <p>{h.text}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pf-case-block pf-case-lists">
                <div>
                  <h4 className="pf-block-title">{t.work.builtTitle}</h4>
                  <ul className="pf-checklist">
                    {t.work.built.map((x) => <li key={x}>{x}</li>)}
                  </ul>
                </div>
                <div>
                  <h4 className="pf-block-title">{t.work.featuresTitle}</h4>
                  <ul className="pf-checklist">
                    {t.work.features.map((x) => <li key={x}>{x}</li>)}
                  </ul>
                </div>
              </div>

              {/* Screens */}
              {orderedShots.length > 0 && (
                <div className="pf-case-block">
                  <h4 className="pf-block-title">{t.work.screens}</h4>

                  {desktopShots.length > 0 && (
                    <>
                      <p className="pf-shots-label">{t.work.desktop}</p>
                      <div className="pf-shots-desktop">
                        {desktopShots.map((shot, i) => (
                          <button
                            type="button"
                            key={shot.src}
                            className="pf-shot pf-shot-wide"
                            onClick={() => setLightbox(i)}
                            aria-label={`${t.work.open} ${i + 1}`}
                          >
                            <img src={shot.src} alt={`${t.work.title} — ${t.work.desktop} ${i + 1}`} loading="lazy" decoding="async" />
                          </button>
                        ))}
                      </div>
                    </>
                  )}

                  {mobileShots.length > 0 && (
                    <>
                      <p className="pf-shots-label">{t.work.mobile}</p>
                      <div className="pf-shots-mobile">
                        {mobileShots.map((shot, i) => (
                          <button
                            type="button"
                            key={shot.src}
                            className="pf-shot pf-shot-phone"
                            onClick={() => setLightbox(desktopShots.length + i)}
                            aria-label={`${t.work.open} ${desktopShots.length + i + 1}`}
                          >
                            <img src={shot.src} alt={`${t.work.title} — ${t.work.mobile} ${i + 1}`} loading="lazy" decoding="async" />
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}
            </article>
          </div>
        </section>

        {/* SKILLS */}
        <section className="pf-section" id="skills" aria-labelledby="skills-title">
          <div className="pf-container pf-split">
            <SectionLabel index="04" id="skills-title">{t.sections.skills}</SectionLabel>
            <div className="pf-skills">
              {skills.map(({ key, icon: Icon, items }) => (
                <div className="pf-skill" key={key}>
                  <h3>
                    <Icon size={17} aria-hidden="true" />
                    {t.skillGroups[key]}
                  </h3>
                  <ul className="pf-tags">
                    {items.map((x) => <li key={x}>{x}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EDUCATION */}
        <section className="pf-section pf-section-compact" id="education" aria-labelledby="edu-title">
          <div className="pf-container pf-split">
            <SectionLabel index="05" id="edu-title">{t.sections.education}</SectionLabel>
            <div className="pf-edu">
              <span className="pf-edu-icon" aria-hidden="true"><GraduationCap size={20} /></span>
              <div>
                <p className="pf-edu-label">{t.education.label}</p>
                <h3>{t.education.school}</h3>
              </div>
              <span className="pf-edu-place">{t.education.place}</span>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section className="pf-contact" id="contact" aria-labelledby="contact-title">
          <div className="pf-container pf-contact-grid">
            <div>
              <p className="pf-eyebrow pf-eyebrow-invert">06 — {t.sections.contact}</p>
              <h2 id="contact-title">{t.contact.title}</h2>
              <p className="pf-contact-text">{t.contact.text}</p>

              <div className="pf-contact-actions">
                <a href={`mailto:${profile.email}`} className="pf-btn pf-btn-light">
                  <Mail size={16} aria-hidden="true" />
                  {profile.email}
                </a>
                <button type="button" className="pf-btn pf-btn-ghost" onClick={copyEmail}>
                  {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
                  <span aria-live="polite">{copied ? t.contact.copied : t.contact.copy}</span>
                </button>
              </div>
            </div>

            <ul className="pf-contact-list">
              <li>
                <a href={profile.linkedin} target="_blank" rel="noopener me">
                  <LinkedinIcon /> <span>LinkedIn</span> <em>/in/aminbislimaj</em>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </li>
              <li>
                <a href={profile.github} target="_blank" rel="noopener me">
                  <GithubIcon /> <span>GitHub</span> <em>@aminbisl17</em>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </li>
              <li>
                <a href={profile.whatsapp} target="_blank" rel="noopener">
                  <Phone size={16} aria-hidden="true" /> <span>WhatsApp</span> <em>{profile.phone}</em>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </li>
              <li>
                <a href={profile.cv} download>
                  <Download size={16} aria-hidden="true" /> <span>{t.contact.cv}</span> <em>PDF</em>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="pf-footer">
        <div className="pf-container pf-footer-inner">
          <p>© {new Date().getFullYear()} Amin Bislimaj · {t.footer}</p>

          <div className="pf-endorse">
            <span>{t.feedback.ask}</span>
            <button
              type="button"
              onClick={submitFeedback}
              disabled={hasVoted || feedbackLoading}
              aria-pressed={hasVoted}
              className={hasVoted ? "is-done" : ""}
            >
              <ThumbsUp size={14} aria-hidden="true" />
              {hasVoted ? t.feedback.thanks : t.feedback.approve}
              <strong>{feedback.approve}</strong>
            </button>
            {feedbackError && <span className="pf-endorse-error" role="alert">{t.feedback.error}</span>}
          </div>
        </div>
      </footer>

      {/* LIGHTBOX */}
      {lightbox !== null && (
        <div
          className="pf-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={t.work.screens}
          onClick={() => setLightbox(null)}
        >
          <button type="button" className="pf-lb-btn pf-lb-close" onClick={() => setLightbox(null)} aria-label={t.work.close}>
            <X size={20} />
          </button>
          <button
            type="button"
            className="pf-lb-btn pf-lb-prev"
            onClick={(e) => { e.stopPropagation(); step(-1); }}
            aria-label={t.work.prev}
          >
            <ChevronLeft size={22} />
          </button>
          <figure onClick={(e) => e.stopPropagation()}>
            <img
              src={orderedShots[lightbox].src}
              alt={`${t.work.title} — ${lightbox + 1}`}
              className={orderedShots[lightbox].kind === "mobile" ? "is-phone" : ""}
            />
            <figcaption>{lightbox + 1} / {orderedShots.length}</figcaption>
          </figure>
          <button
            type="button"
            className="pf-lb-btn pf-lb-next"
            onClick={(e) => { e.stopPropagation(); step(1); }}
            aria-label={t.work.next}
          >
            <ChevronRight size={22} />
          </button>
        </div>
      )}
    </div>
  );
}

function SectionLabel({ index, id, children }) {
  return (
    <div className="pf-section-label">
      <span className="pf-section-index">{index}</span>
      <h2 id={id}>{children}</h2>
    </div>
  );
}

function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}
