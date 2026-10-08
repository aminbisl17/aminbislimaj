import React, { useEffect, useState } from "react";
import "./Portfolio.css";

const projectImages = import.meta.glob(
  "../assets/project/*.{png,jpg,jpeg,webp}",
  { eager: true, query: "?url", import: "default" }
);

const profile = {
  name: "Amin Bislimaj",
  location: "Prizren, Kosovo",
  education: "UBT – University for Business and Technology",
  email: "amin.b05@icloud.com",
  phone: "+383 45 380 871",
  whatsapp: "https://wa.me/38345380871",
  github: "https://github.com/aminbisl17",
  linkedin: "https://www.linkedin.com/in/aminbislimaj",
  demoClient: "https://beautysalonclient.aminbislimaj.com",
  demoAdmin: "https://beautysalonadmin.aminbislimaj.com",
  cv: "/Amin_Bislimaj_CV_EN_SQ.pdf",
};

const skills = {
  backend: [
    "Java", "Spring Boot", "REST APIs", "OOP",
    "Layered Architecture", "JWT & Refresh Tokens", "RBAC",
    "Type-Based Access Control",
  ],
  database: [
    "Microsoft SQL Server", "MySQL", "Relational Design",
    "Multi-Tenant Architecture", "SQL & Stored Procedures",
    "Data Optimization", "Business-Rule Validation",
  ],
  applications: [
    "React", "React Native (Expo)", "JavaFX",
    "REST API Integration", "Web, Mobile & Desktop UI",
  ],
  infrastructure: [
    "Git & GitHub", "Azure", "Render", "Cloudflare", "Postman",
    "Swagger UI", "WebSockets", "Twilio SMS", "Firebase Push",
    "Thymeleaf Email", "Azure Blob Storage", "QR Authentication",
  ],
};

const translations = {
  en: {
    nav: {
      about: "About", skills: "Skills", project: "Project",
      experience: "Experience", contact: "Contact", cv: "View CV",
    },
    hero: {
      available: "Open to backend developer roles",
      titleFirst: "I build",
      titleHighlight: "secure, scalable backends",
      titleSecond: "and the apps that use them.",
      description:
        "I'm Amin Bislimaj, a self-taught backend developer working with Java and Spring Boot. I design REST APIs, authentication, relational databases and multi-tenant systems, and I've shipped a complete SaaS product across web, mobile and desktop.",
      explore: "See the project",
      viewCv: "View CV",
      focus: "Java · Spring Boot · Backend Systems",
      currentFocus: "Current focus",
      backend: "Backend engineering",
      backendDescription:
        "APIs, authentication, databases and business logic with Java and Spring Boot.",
      stats: [
        { value: "4", label: "synchronized apps on one API" },
        { value: "100s", label: "daily bookings and operations" },
        { value: "Multi-tenant", label: "with isolated salon data" },
      ],
    },
    sections: {
      about: "About me", skills: "Technical skills", project: "Featured project",
      experience: "Experience", education: "Education", contact: "Contact",
    },
    about: {
      large:
        "I'm a self-taught developer focused on backend development and software architecture.",
      p1: "My main stack is Java and Spring Boot, with a strong interest in database design, API design, authentication and business logic.",
      p2: "Instead of isolated demos, I built a complete SaaS product that combines backend services, databases, web applications, mobile apps and a desktop client.",
      p3: "I enjoy understanding how the parts of a system communicate, and turning real business requirements into reliable software.",
    },
    project: {
      label: "Main project",
      title: "Beauty Salon SaaS",
      screenshots: "Platform preview",
      screenshotsTitle: "Beauty Salon Platform",
      screenshotsDescription:
        "Interface images from the web, mobile and desktop applications. Select an image to enlarge it.",
      description:
        "A multi-tenant platform for running beauty salons: appointments, staff, services, clients and availability, kept in sync across web, mobile and desktop.",
      client: "Client web ↗",
      admin: "Admin web ↗",
      highlightsTitle: "Engineering highlights",
      highlights: [
        {
          title: "Authentication & access",
          text: "JWT with refresh tokens, OTP login verification and role- and type-based access for admins, staff and clients.",
        },
        {
          title: "Multi-tenant data",
          text: "Tenant-aware isolation at database and application level, so each salon's data stays separate.",
        },
        {
          title: "Real-time bookings",
          text: "WebSocket sync, automatic availability updates and conflict detection that prevents double bookings.",
        },
        {
          title: "Notifications",
          text: "Twilio SMS, Firebase push and Thymeleaf email templates for confirmations and OTP codes.",
        },
      ],
      built: "What I built",
      business: "Business functionality",
      builtItems: [
        "Spring Boot backend and REST API with Swagger documentation",
        "Relational multi-tenant database and business logic",
        "Client and administration web apps in React",
        "Mobile apps with React Native (Expo)",
        "Desktop application with JavaFX",
        "QR code sessions with automatic expiry",
      ],
      businessItems: [
        "Appointment and reservation management",
        "Staff, roles and skills",
        "Services with custom pricing",
        "Dynamic staff availability and breaks",
        "Full client history",
        "Admin statistics and KPIs",
      ],
      platform: "Platform", platformValue: "Web · Mobile · Desktop",
      backend: "Backend", backendValue: "Java · Spring Boot",
      database: "Database", databaseValue: "SQL Server · MySQL",
    },
    experience: {
      type: "Software development",
      title: "Independent Software Developer",
      date: "Independent",
      description:
        "Designed and developed a complete SaaS platform, from the first idea to production deployment.",
      items: [
        "Built a Spring Boot REST API that serves four different applications.",
        "Designed a relational multi-tenant database for performance and data isolation.",
        "Implemented JWT authentication, refresh tokens and role-based access control.",
        "Resolved performance and synchronization issues between applications.",
        "Used Git, GitHub and Postman for versioning and API testing.",
      ],
    },
    education: {
      location: "Prizren, Kosovo",
      universityLabel: "University",
    },
    contact: {
      titleFirst: "Let's build something",
      titleHighlight: "useful.",
      description:
        "I'm looking for backend developer roles where I can contribute to secure, reliable systems and keep growing as an engineer.",
      email: "Email", linkedin: "LinkedIn", github: "GitHub",
      whatsapp: "WhatsApp", download: "Download CV ↓",
    },
    footer: { role: "Software Developer" },
    feedback: {
      approve: "Approve this portfolio",
      thanks: "Thanks for your feedback",
      error: "Couldn't save your vote. Please try again.",
      group: "Portfolio feedback",
    },
    skills: {
      backend: "Backend", database: "Databases",
      applications: "Applications", infrastructure: "Infrastructure & integrations",
    },
  },

  sq: {
    nav: {
      about: "Rreth meje", skills: "Aftësitë", project: "Projekti",
      experience: "Përvoja", contact: "Kontakt", cv: "Shiko CV-në",
    },
    hero: {
      available: "I hapur për pozita Backend Developer",
      titleFirst: "Ndërtoj",
      titleHighlight: "backend të sigurt dhe të shkallëzueshëm",
      titleSecond: "dhe aplikacionet që e përdorin.",
      description:
        "Jam Amin Bislimaj, zhvillues backend i vetë-mësuar me Java dhe Spring Boot. Dizajnoj REST API, autentikim, databaza relacionale dhe sisteme multi-tenant, dhe kam ndërtuar një produkt të plotë SaaS për web, mobile dhe desktop.",
      explore: "Shiko projektin",
      viewCv: "Shiko CV-në",
      focus: "Java · Spring Boot · Backend Systems",
      currentFocus: "Fokusi aktual",
      backend: "Zhvillim backend",
      backendDescription:
        "API, autentikim, databaza dhe logjikë biznesi me Java dhe Spring Boot.",
      stats: [
        { value: "4", label: "aplikacione të sinkronizuara në një API" },
        { value: "100+", label: "rezervime dhe operacione në ditë" },
        { value: "Multi-tenant", label: "me izolim të të dhënave" },
      ],
    },
    sections: {
      about: "Rreth meje", skills: "Aftësitë teknike", project: "Projekti kryesor",
      experience: "Përvoja", education: "Edukimi", contact: "Kontakt",
    },
    about: {
      large:
        "Jam zhvillues i vetë-mësuar me fokus në zhvillimin backend dhe arkitekturën softuerike.",
      p1: "Stack-u im kryesor është Java dhe Spring Boot, me interes të veçantë në dizajnin e databazave, API-ve, autentikimin dhe logjikën e biznesit.",
      p2: "Në vend të demove të izoluara, ndërtova një produkt të plotë SaaS që kombinon backend, databaza, aplikacione web, mobile dhe një klient desktop.",
      p3: "Më pëlqen të kuptoj si komunikojnë pjesët e një sistemi dhe t'i shndërroj kërkesat reale të biznesit në softuer të besueshëm.",
    },
    project: {
      label: "Projekti kryesor",
      title: "Beauty Salon SaaS",
      screenshots: "Pamje e platformës",
      screenshotsTitle: "Platforma Beauty Salon",
      screenshotsDescription:
        "Imazhe nga aplikacionet web, mobile dhe desktop. Kliko një imazh për ta zmadhuar.",
      description:
        "Platformë multi-tenant për menaxhimin e salloneve të bukurisë: terminet, punonjësit, shërbimet, klientët dhe disponueshmëria, të sinkronizuara mes web, mobile dhe desktop.",
      client: "Client web ↗",
      admin: "Admin web ↗",
      highlightsTitle: "Pikat kryesore teknike",
      highlights: [
        {
          title: "Autentikim dhe akses",
          text: "JWT me refresh tokens, verifikim OTP dhe akses sipas roleve dhe llojit për administratorë, punonjës dhe klientë.",
        },
        {
          title: "Të dhëna multi-tenant",
          text: "Izolim sipas tenant-ëve në nivel databaze dhe aplikacioni, që të dhënat e çdo salloni të mbeten të ndara.",
        },
        {
          title: "Rezervime në kohë reale",
          text: "Sinkronizim me WebSocket, përditësim automatik i disponueshmërisë dhe zbulim konfliktesh kundër rezervimeve të dyfishta.",
        },
        {
          title: "Njoftime",
          text: "Twilio SMS, Firebase push dhe email me Thymeleaf për konfirmime dhe kode OTP.",
        },
      ],
      built: "Çfarë kam ndërtuar",
      business: "Funksionalitetet e biznesit",
      builtItems: [
        "Backend me Spring Boot dhe REST API me dokumentim Swagger",
        "Databazë relacionale multi-tenant dhe logjikë biznesi",
        "Aplikacione web për klientë dhe administratë në React",
        "Aplikacione mobile me React Native (Expo)",
        "Aplikacion desktop me JavaFX",
        "Sesione me QR code me skadim automatik",
      ],
      businessItems: [
        "Menaxhimi i termineve dhe rezervimeve",
        "Punonjësit, rolet dhe aftësitë",
        "Shërbime me çmime të personalizueshme",
        "Disponueshmëri dinamike dhe pauza",
        "Historiku i plotë i klientit",
        "Statistika dhe KPI për administratorin",
      ],
      platform: "Platforma", platformValue: "Web · Mobile · Desktop",
      backend: "Backend", backendValue: "Java · Spring Boot",
      database: "Databaza", databaseValue: "SQL Server · MySQL",
    },
    experience: {
      type: "Zhvillim softueri",
      title: "Zhvillues Softuerësh i Pavarur",
      date: "I pavarur",
      description:
        "Dizajnova dhe zhvillova një platformë të plotë SaaS, nga ideja e parë deri te vendosja në prodhim.",
      items: [
        "Ndërtova REST API me Spring Boot që shërben katër aplikacione të ndryshme.",
        "Dizajnova databazë relacionale multi-tenant për performancë dhe izolim të të dhënave.",
        "Implementova autentikim JWT, refresh tokens dhe kontroll aksesi sipas roleve.",
        "Zgjidha probleme performance dhe sinkronizimi mes aplikacioneve.",
        "Përdora Git, GitHub dhe Postman për versionim dhe testim të API-ve.",
      ],
    },
    education: {
      location: "Prizren, Kosovë",
      universityLabel: "Universiteti",
    },
    contact: {
      titleFirst: "Le të ndërtojmë diçka",
      titleHighlight: "të dobishme.",
      description:
        "Kërkoj pozita Backend Developer ku mund të kontribuoj në sisteme të sigurta dhe të besueshme dhe të vazhdoj të rritem si inxhinier.",
      email: "Email", linkedin: "LinkedIn", github: "GitHub",
      whatsapp: "WhatsApp", download: "Shkarko CV-në ↓",
    },
    footer: { role: "Zhvillues Softuerësh" },
    feedback: {
      approve: "Aprovo portfolion",
      thanks: "Faleminderit për feedback-un",
      error: "Vota nuk u ruajt. Provo përsëri.",
      group: "Feedback për portfolion",
    },
    skills: {
      backend: "Backend", database: "Databaza",
      applications: "Aplikacionet", infrastructure: "Infrastrukturë dhe integrime",
    },
  },
};

export default function Main() {
  const [language, setLanguage] = useState("en");
  const [selectedImage, setSelectedImage] = useState(null);
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [feedback, setFeedback] = useState({ approve: 0, disapprove: 0 });
  const [hasVoted, setHasVoted] = useState(false);
  const [feedbackLoading, setFeedbackLoading] = useState(true);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const t = translations[language];

  useEffect(() => {
    document.documentElement.lang = language === "sq" ? "sq" : "en";
  }, [language]);

  // Close lightbox with Escape and lock page scroll while open
  useEffect(() => {
    if (!selectedImage) return;
    const onKey = (e) => e.key === "Escape" && setSelectedImage(null);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [selectedImage]);

  // Load feedback state
  useEffect(() => {
    fetch("/api/feedback")
      .then((res) => res.json())
      .then((data) => {
        setFeedback({
          approve: data.approve || 0,
          disapprove: data.disapprove || 0,
        });
        setHasVoted(data.hasVoted || false);
      })
      .catch((error) => console.error("Failed to load feedback:", error))
      .finally(() => setFeedbackLoading(false));
  }, []);

  const submitFeedback = async (type) => {
    if (hasVoted || feedbackLoading) return;

    setFeedbackLoading(true);
    setFeedbackMessage("");

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit feedback");
      }

      setFeedback({
        approve: data.approve || 0,
        disapprove: data.disapprove || 0,
      });
      setHasVoted(true);
    } catch (error) {
      console.error("Feedback error:", error);
      setFeedbackMessage("error");
    } finally {
      setFeedbackLoading(false);
    }
  };

  const images = Object.entries(projectImages).sort(([a], [b]) =>
    a.localeCompare(b)
  );

  return (
    <main className="portfolio">
      {/* NAVIGATION */}
  
  <header className="site-header">
  <nav className="navbar" aria-label="Main">

    <a href="#top" className="nav-brand" aria-label="Amin Bislimaj, home">
     <img
  src="/favicon-dark-large.svg"
  alt="Amin Bislimaj"
  className="nav-logo"
/>
    </a>

    {/* Desktop navigation */}
    <div className="nav-links">
      <a href="#about">{t.nav.about}</a>
      <a href="#skills">{t.nav.skills}</a>
      <a href="#project">{t.nav.project}</a>
      <a href="#experience">{t.nav.experience}</a>
      <a href="#contact">{t.nav.contact}</a>
    </div>

    <div className="nav-right">
      <div className="language-switcher" role="group" aria-label="Language">
        <button
          className={language === "en" ? "active" : ""}
          onClick={() => setLanguage("en")}
          aria-pressed={language === "en"}
          type="button"
        >
          EN
        </button>

        <span aria-hidden="true">/</span>

        <button
          className={language === "sq" ? "active" : ""}
          onClick={() => setLanguage("sq")}
          aria-pressed={language === "sq"}
          type="button"
        >
          AL
        </button>
      </div>

      <a
        href={profile.cv}
        target="_blank"
        rel="noreferrer"
        className="nav-cv"
      >
        {t.nav.cv} ↗
      </a>
    </div>

    {/* Mobile button */}
    <button
      className="mobile-menu-button"
      type="button"
      aria-label="Open navigation"
      onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
    >
      ☰
    </button>

  </nav>

  {/* Mobile navigation */}
  {mobileMenuOpen && (
    <div className="mobile-menu">
      <a href="#about" onClick={() => setMobileMenuOpen(false)}>
        {t.nav.about}
      </a>

      <a href="#skills" onClick={() => setMobileMenuOpen(false)}>
        {t.nav.skills}
      </a>

      <a href="#project" onClick={() => setMobileMenuOpen(false)}>
        {t.nav.project}
      </a>

      <a href="#experience" onClick={() => setMobileMenuOpen(false)}>
        {t.nav.experience}
      </a>

      <a href="#contact" onClick={() => setMobileMenuOpen(false)}>
        {t.nav.contact}
      </a>

      <div className="mobile-menu-bottom">
        <div className="language-switcher">
          <button
            className={language === "en" ? "active" : ""}
            onClick={() => setLanguage("en")}
            type="button"
          >
            EN
          </button>

          <span>/</span>

          <button
            className={language === "sq" ? "active" : ""}
            onClick={() => setLanguage("sq")}
            type="button"
          >
            AL
          </button>
        </div>

        <a
          href={profile.cv}
          target="_blank"
          rel="noreferrer"
          className="nav-cv"
        >
          {t.nav.cv} ↗
        </a>
      </div>
    </div>
  )}
</header>

      {/* HERO */}
      <section className="hero" id="top">
        <div className="hero-content">
          <div className="eyebrow">
            <span className="status-dot"></span>
            {t.hero.available}
          </div>

          <h1>
            {t.hero.titleFirst} <span>{t.hero.titleHighlight}</span>{" "}
            {t.hero.titleSecond}
          </h1>

          <p className="hero-description">{t.hero.description}</p>

          <div className="hero-actions">
            <a href="#project" className="button button-dark">
              {t.hero.explore}
            </a>
            <a href={profile.cv} target="_blank" rel="noreferrer" className="button button-light">
              {t.hero.viewCv} ↗
            </a>
          </div>

          {/* APPROVAL FEATURE */}
          <div className="hero-feedback" role="group" aria-label={t.feedback.group}>
            <button
              type="button"
              className={`hero-approve-button ${hasVoted ? "disabled" : ""}`}
              onClick={() => submitFeedback("approve")}
              disabled={hasVoted || feedbackLoading}
              aria-pressed={hasVoted}
            >
              <span className="hero-approve-icon" aria-hidden="true">👍</span>
              <span className="hero-approve-text">
                {hasVoted ? t.feedback.thanks : t.feedback.approve}
              </span>
              <strong aria-label={`${feedback.approve} approvals`}>
                {feedback.approve}
              </strong>
            </button>

            {feedbackMessage === "error" && (
              <p className="feedback-message error" role="alert">
                {t.feedback.error}
              </p>
            )}
          </div>

          <div className="hero-meta">
            <span>{profile.location}</span>
            <span className="meta-separator">•</span>
            <span>{t.hero.focus}</span>
          </div>
        </div>

        <div className="hero-side">
          <div className="hero-card">
            <div className="hero-card-label">{t.hero.currentFocus}</div>
            <h3>{t.hero.backend}</h3>
            <p>{t.hero.backendDescription}</p>

            <div className="hero-card-stack">
              <span>Java</span>
              <span>Spring Boot</span>
              <span>SQL</span>
            </div>

            <dl className="hero-stats">
              {t.hero.stats.map((s) => (
                <div key={s.label}>
                  <dt>{s.value}</dt>
                  <dd>{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="section about-section" id="about">
        <div className="section-heading">
          <h2>{t.sections.about}</h2>
        </div>

        <div className="about-grid">
          <p className="large-text">{t.about.large}</p>
          <div className="about-text">
            <p>{t.about.p1}</p>
            <p>{t.about.p2}</p>
            <p>{t.about.p3}</p>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section className="section" id="skills">
        <div className="section-heading">
          <h2>{t.sections.skills}</h2>
        </div>

        <div className="skills-grid">
          <SkillCard title={t.skills.backend} items={skills.backend} />
          <SkillCard title={t.skills.database} items={skills.database} />
          <SkillCard title={t.skills.applications} items={skills.applications} />
          <SkillCard title={t.skills.infrastructure} items={skills.infrastructure} />
        </div>
      </section>

      {/* PROJECT */}
      <section className="section project-section" id="project">
        <div className="section-heading">
          <h2>{t.sections.project}</h2>
        </div>

        <div className="project-card">
          <div className="project-top">
            <div>
              <span className="project-label">{t.project.label}</span>
              <h2>{t.project.title}</h2>
              <p>{t.project.description}</p>
            </div>

            <div className="project-actions">
              <a href={profile.demoClient} target="_blank" rel="noreferrer" className="project-button">
                {t.project.client}
              </a>
              <a href={profile.demoAdmin} target="_blank" rel="noreferrer" className="project-button secondary">
                {t.project.admin}
              </a>
            </div>
          </div>

          <div className="project-tech">
            {[
              "Java", "Spring Boot", "MS SQL Server", "React", "React Native",
              "JavaFX", "Azure", "Render", "Cloudflare",
            ].map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>

          <div className="project-highlights">
            <h3>{t.project.highlightsTitle}</h3>
            <div className="project-highlights-grid">
              {t.project.highlights.map((h) => (
                <div className="project-highlight" key={h.title}>
                  <strong>{h.title}</strong>
                  <p>{h.text}</p>
                </div>
              ))}
            </div>
          </div>

          {images.length > 0 && (
            <div className="project-gallery">
              <div className="project-gallery-heading">
                <div>
                  <span className="project-gallery-label">{t.project.screenshots}</span>
                  <h3>{t.project.screenshotsTitle}</h3>
                  <p>{t.project.screenshotsDescription}</p>
                </div>
              </div>

              <div className="project-gallery-grid">
                {images.map(([path, image], index) => {
                  const fileName = path
                    .split("/")
                    .pop()
                    .replace(/\.[^/.]+$/, "")
                    .replace(/[-_]/g, " ");

                  return (
                    <button
                      type="button"
                      className={`project-image-card ${index === 0 ? "project-image-large" : ""}`}
                      key={path}
                      onClick={() => setSelectedImage({ src: image, name: fileName })}
                      aria-label={`Enlarge: ${fileName}`}
                    >
                      <img src={image} alt={`Beauty Salon ${fileName}`} loading="lazy" />
                      <div className="project-image-overlay">
                        <span>{fileName}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {selectedImage && (
            <div
              className="lightbox-overlay"
              role="dialog"
              aria-modal="true"
              aria-label={selectedImage.name}
              onClick={() => setSelectedImage(null)}
            >
              <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                <button
                  className="lightbox-close"
                  onClick={() => setSelectedImage(null)}
                  aria-label="Close"
                  type="button"
                >
                  &times;
                </button>
                <img src={selectedImage.src} alt={selectedImage.name} />
                <div className="lightbox-caption">{selectedImage.name}</div>
              </div>
            </div>
          )}

          <div className="project-body">
            <div className="project-column">
              <h3>{t.project.built}</h3>
              <ul>
                {t.project.builtItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="project-column">
              <h3>{t.project.business}</h3>
              <ul>
                {t.project.businessItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="project-footer">
            <div>
              <strong>{t.project.platform}</strong>
              <span>{t.project.platformValue}</span>
            </div>
            <div>
              <strong>{t.project.backend}</strong>
              <span>{t.project.backendValue}</span>
            </div>
            <div>
              <strong>{t.project.database}</strong>
              <span>{t.project.databaseValue}</span>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="section" id="experience">
        <div className="section-heading">
          <h2>{t.sections.experience}</h2>
        </div>

        <div className="experience">
          <div className="experience-item">
            <div className="experience-date">{t.experience.date}</div>

            <div className="experience-content">
              <span className="experience-type">{t.experience.type}</span>
              <h3>{t.experience.title}</h3>
              <p>{t.experience.description}</p>
              <ul>
                {t.experience.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section className="section compact-section" id="education">
        <div className="section-heading">
          <h2>{t.sections.education}</h2>
        </div>

        <div className="education-card">
          <div>
            <span>{t.education.universityLabel}</span>
            <h3>{profile.education}</h3>
          </div>
          <span>{t.education.location}</span>
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact-section" id="contact">
        <div className="contact-inner">
          <h2>
            {t.contact.titleFirst}
            <br />
            <span>{t.contact.titleHighlight}</span>
          </h2>

          <p>{t.contact.description}</p>

          <div className="contact-links">
            <a href={`mailto:${profile.email}`}>
              <span>{t.contact.email}</span>
              {profile.email}
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              <span>{t.contact.linkedin}</span>
              aminbislimaj
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer">
              <span>{t.contact.github}</span>
              aminbisl17
            </a>
            <a href={profile.whatsapp} target="_blank" rel="noreferrer">
              <span>{t.contact.whatsapp}</span>
              {profile.phone}
            </a>
          </div>

          <a href={profile.cv} download className="download-cv">
            {t.contact.download}
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <span>© {new Date().getFullYear()} Amin Bislimaj</span>
        <span>{t.footer.role}</span>
      </footer>
    </main>
  );
}

function SkillCard({ title, items }) {
  return (
    <div className="skill-card">
      <div className="skill-card-top">
        <h3>{title}</h3>
      </div>

      <div className="skill-list">
        {items.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </div>
  );
}