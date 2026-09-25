import React, { useEffect, useState } from "react";
import "./Portfolio.css";

const projectImages = import.meta.glob(
  "../assets/project/*.{png,jpg,jpeg,webp}",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
);

export default function Main() {
const [selectedImage, setSelectedImage] = useState(null);
  const profile = {
    name: "Amin Bislimaj",
    role: "Software Developer",
    focus: "Java · Spring Boot · Backend Systems",
    location: "Prizren, Kosovo",
    education: "UBT – University for Business and Technology",
    email: "amin.b05@icloud.com",
    phone: "+383 45 380 871",

    whatsapp: "https://wa.me/38345380871",
    github: "https://github.com/aminbisl17",
    linkedin: "https://www.linkedin.com/in/aminbislimaj",

    demoClient: "https://beautysalonclient.aminbislimaj.com",
    demoAdmin: "https://beautysalonadmin.aminbislimaj.com",

    cv: "/Amin_Bislimaj_CV (5).pdf",
  };

  const [language, setLanguage] = useState("en");

  const [feedback, setFeedback] = useState({
  approve: 0,
  disapprove: 0,
});

const [hasVoted, setHasVoted] = useState(false);
const [feedbackLoading, setFeedbackLoading] = useState(true);
const [feedbackMessage, setFeedbackMessage] = useState("");


  const translations = {
    en: {
      nav: {
        about: "About",
        skills: "Skills",
        project: "Project",
        experience: "Experience",
        contact: "Contact",
        cv: "View CV",
      },



      hero: {
        available: "Available for software development opportunities",
        titleFirst: "I build",
        titleHighlight: "software systems",
        titleSecond: "from backend to interface.",
        description:
          "I'm Amin Bislimaj, a self-taught software developer focused on Java and Spring Boot. I build business-oriented applications, REST APIs, relational databases and multi-platform systems.",
        explore: "Explore my work",
        viewCv: "View CV",
        focus: "Java · Spring Boot · Backend Systems",
        currentFocus: "CURRENT FOCUS",
        backend: "Backend Engineering",
        backendDescription:
          "Designing APIs, authentication systems, databases and business logic with Java & Spring Boot.",
      },

      sections: {
        about: "About me",
        skills: "Technical skills",
        project: "Featured project",
        experience: "Experience",
        education: "Education",
        contact: "Contact",
      },

      about: {
        large:
          "I am a self-taught software developer with a strong focus on backend development and software architecture.",
        p1:
          "My main stack is Java and Spring Boot, with a strong interest in databases, API design, authentication and business logic.",
        p2:
          "Rather than building isolated demos, I have been working on a complete SaaS product that combines backend services, databases, web applications, mobile applications and a desktop client.",
        p3:
          "I enjoy understanding how the different parts of a system communicate and turning real business requirements into working software.",
      },

      project: {
        label: "01 / MAIN PROJECT",
        title: "Beauty Salon SaaS",

          screenshots: "Platform demo images",
  screenshotsTitle: "Beauty Salon Platform",
  screenshotsDescription:
     "Some interface images of the platform that includes web, mobile and desktop interfaces",
    
        description:
          "A complete multi-platform business management system designed around salon appointments, employees, services, clients and availability.",
        client: "Client Web ↗",
        admin: "Admin Web ↗",
        built: "What I built",
        business: "Business functionality",

        builtItems: [
          "Spring Boot backend and REST API architecture",
          "Relational database and business logic",
          "Client and administration web applications",
          "Mobile applications with React Native",
          "Desktop application with JavaFX",
          "JWT authentication and role-based access",
          "Real-time communication with WebSockets",
        ],

        businessItems: [
          "Appointment and reservation management",
          "Employee and role management",
          "Services and pricing",
          "Dynamic employee availability",
          "Client history",
          "Multi-role access",
          "Synchronization between applications",
        ],

        platform: "Multi-platform system",
        platformValue: "Web · Mobile · Desktop",

        backend: "Backend",
        backendValue: "Java · Spring Boot",

        database: "Database",
        databaseValue: "SQL Server · MySQL",
      },

      experience: {
        type: "SOFTWARE DEVELOPMENT",
        title: "Independent Software Developer",
        date: "Independent",
        description:
          "Designed and developed a complete SaaS platform from the initial idea through implementation and production deployment.",
        items: [
          "Built a Spring Boot REST API serving multiple applications.",
          "Designed and implemented a relational database for business operations.",
          "Implemented JWT authentication, refresh tokens and role-based access control.",
          "Worked across backend, frontend, mobile and desktop applications.",
          "Used Git, GitHub and Postman for development and API testing.",
        ],
      },

      education: {
        university: "UBT – University for Business and Technology",
        location: "Prizren, Kosovo",
        universityLabel: "University",
      },

      contact: {
        titleFirst: "Let's build something",
        titleHighlight: "useful.",
        description:
          "I'm interested in software development opportunities where I can contribute to real systems and continue growing as an engineer.",
        email: "Email",
        linkedin: "LinkedIn",
        github: "GitHub",
        whatsapp: "WhatsApp",
        download: "Download CV ↓",
      },

      footer: {
        role: "Software Developer",
      },

      feedback: {
  title: "What do you think about this portfolio?",
  description: "Your feedback helps me improve it.",
  approve: "Approve",
  disapprove: "Disapprove",
  thanks: "Thank you for your feedback.",
  already: "You have already voted.",
  error: "Something went wrong. Please try again.",
},

      skills: {
        backend: "Backend",
        database: "Databases",
        applications: "Applications",
        infrastructure: "Infrastructure & Integrations",
      },
    },

    sq: {
      nav: {
        about: "Rreth meje",
        skills: "Aftësitë",
        project: "Projekti",
        experience: "Përvoja",
        contact: "Kontakt",
        cv: "Shiko CV-në",
      },

      hero: {
        available:
          "I disponueshëm për mundësi në zhvillimin e softuerit",
        titleFirst: "Ndërtoj",
        titleHighlight: "sisteme softuerike",
        titleSecond: "nga backend-i deri te ndërfaqja.",
        description:
          "Jam Amin Bislimaj, zhvillues softuerësh i vetë-mësuar me fokus në Java dhe Spring Boot. Ndërtoj aplikacione biznesi, REST API, databaza relacionale dhe sisteme multi-platformë.",
        explore: "Shiko projektet e mia",
        viewCv: "Shiko CV-në",
        focus: "Java · Spring Boot · Backend Systems",
        currentFocus: "FOKUSI AKTUAL",
        backend: "Zhvillim Backend",
        backendDescription:
          "Dizajnim i API-ve, sistemeve të autentikimit, databazave dhe logjikës së biznesit me Java & Spring Boot.",
      },
      sections: {
        about: "Rreth meje",
        skills: "Aftësitë teknike",
        project: "Projekti kryesor",
        experience: "Përvoja",
        education: "Edukimi",
        contact: "Kontakt",
      },

      about: {
        large:
          "Jam zhvillues softuerësh i vetë-mësuar me fokus të fortë në zhvillimin backend dhe arkitekturën softuerike.",
        p1:
          "Stack-u im kryesor është Java dhe Spring Boot, me fokus të veçantë në databaza, dizajnimin e API-ve, autentikimin dhe logjikën e biznesit.",
        p2:
          "Në vend të projekteve të izoluara demo, kam punuar në një produkt të plotë SaaS që kombinon backend-in, databazat, aplikacionet web, mobile dhe një aplikacion desktop.",
        p3:
          "Më pëlqen të kuptoj se si komunikojnë pjesët e ndryshme të një sistemi dhe t'i shndërroj kërkesat reale të biznesit në softuer funksional.",
      },

      project: {
        label: "01 / PROJEKTI KRYESOR",
        title: "Beauty Salon SaaS",
        
screenshots: "Imazhe të platformës",
screenshotsTitle: "Platforma Beauty Salon",
screenshotsDescription:
"Disa imazhe të ndërfaqes së platformës, e cila përfshin ndërfaqe web, mobile dhe desktop",

        description:
          "Sistem i plotë multi-platformë për menaxhimin e operacioneve të salloneve të bukurisë, i ndërtuar rreth termineve, punëtorëve, shërbimeve, klientëve dhe disponueshmërisë.",
        client: "Client Web ↗",
        admin: "Admin Web ↗",
        built: "Çfarë kam ndërtuar",
        business: "Funksionalitetet e biznesit",

        builtItems: [
          "Backend me Spring Boot dhe arkitekturë REST API",
          "Databazë relacionale dhe logjikë biznesi",
          "Aplikacione web për klientë dhe administratë",
          "Aplikacione mobile me React Native",
          "Aplikacion desktop me JavaFX",
          "Autentikim JWT dhe akses sipas roleve",
          "Komunikim në kohë reale me WebSockets",
        ],

        businessItems: [
          "Menaxhimi i termineve dhe rezervimeve",
          "Menaxhimi i punëtorëve dhe roleve",
          "Shërbimet dhe çmimet",
          "Disponueshmëria dinamike e punëtorëve",
          "Historiku i klientëve",
          "Akses multi-rol",
          "Sinkronizimi ndërmjet aplikacioneve",
        ],

        platform: "Sistem multi-platformë",
        platformValue: "Web · Mobile · Desktop",

        backend: "Backend",
        backendValue: "Java · Spring Boot",

        database: "Databaza",
        databaseValue: "SQL Server · MySQL",
      },

      experience: {
        type: "ZHVILLIM SOFTUERI",
        title: "Zhvillues Softuerësh i Pavarur",
        date: "I pavarur",
        description:
          "Dizajnova dhe zhvillova një platformë të plotë SaaS nga ideja fillestare deri te implementimi dhe vendosja në prodhim.",
        items: [
          "Ndërtova REST API me Spring Boot që shërben disa aplikacione.",
          "Dizajnova dhe implementova databazë relacionale për operacionet e biznesit.",
          "Implementova autentikim JWT, refresh tokens dhe kontroll të aksesit sipas roleve.",
          "Punova në backend, frontend, aplikacione mobile dhe desktop.",
          "Përdora Git, GitHub dhe Postman për zhvillim dhe testim të API-ve.",
        ],
      },

      education: {
        university: "UBT – University for Business and Technology",
        location: "Prizren, Kosovë",
        universityLabel: "Universiteti",
      },

      contact: {
        titleFirst: "Le të ndërtojmë diçka",
        titleHighlight: "të dobishme.",
        description:
          "Jam i interesuar për mundësi në zhvillimin e softuerit ku mund të kontribuoj në sisteme reale dhe të vazhdoj të zhvillohem si inxhinier.",
        email: "Email",
        linkedin: "LinkedIn",
        github: "GitHub",
        whatsapp: "WhatsApp",
        download: "Shkarko CV-në ↓",
      },

      footer: {
        role: "Zhvillues Softuerësh",
      },

      feedback: {
  title: "Çfarë mendoni për këtë portfolio?",
  description: "Feedback-u juaj më ndihmon ta përmirësoj.",
  approve: "Aprovo",
  disapprove: "Mos e aprovo",
  thanks: "Faleminderit për feedback-un.",
  already: "Ju tashmë keni votuar.",
  error: "Diçka shkoi keq. Provo përsëri.",
},

      skills: {
        backend: "Backend",
        database: "Databaza",
        applications: "Aplikacionet",
        infrastructure: "Infrastrukturë & Integrime",
      },
    },
  };

  const t = translations[language];

  const skills = {
    backend: [
      "Java",
      "Spring Boot",
      "REST APIs",
      "OOP",
      "Layered Architecture",
      "JWT",
      "Refresh Tokens",
      "RBAC",
      "Type-Based Access Control",
    ],

    database: [
      "Microsoft SQL Server",
      "MySQL",
      "Relational Database Design",
      "SQL Queries",
      "Stored Procedures",
      "Data Optimization",
      "Business Rules",
    ],

    applications: [
      "React",
      "React Native",
      "JavaFX",
      "REST API Integration",
      "Web Applications",
      "Mobile Applications",
      "Desktop Applications",
    ],

    infrastructure: [
      "Git",
      "GitHub",
      "Azure",
      "Render",
      "Cloudflare",
      "Postman",
      "WebSockets",
      "SMS & Email Services",
      "QR Authentication",
    ],
  };

const submitFeedback = async (type) => {
  if (hasVoted || feedbackLoading) return;

  setFeedbackLoading(true);
  setFeedbackMessage("");

  try {
    const response = await fetch("/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error || "Failed to submit feedback"
      );
    }

    setFeedback({
      approve: data.approve || 0,
      disapprove: data.disapprove || 0,
    });

    setHasVoted(true);

    setFeedbackMessage(t.feedback.thanks);
  } catch (error) {
    console.error("Feedback error:", error);

    setFeedbackMessage(t.feedback.error);
  } finally {
    setFeedbackLoading(false);
  }
};

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
    .catch((error) => {
      console.error(
        "Failed to load feedback:",
        error
      );
    })
    .finally(() => {
      setFeedbackLoading(false);
    });
}, []);


  return (
    <main className="portfolio">
      {/* NAVIGATION */}
      <nav className="navbar">
        <a href="#top" className="nav-brand">
          AB<span>.</span>
        </a>

        <div className="nav-links">
          <a href="#about">{t.nav.about}</a>
          <a href="#skills">{t.nav.skills}</a>
          <a href="#project">{t.nav.project}</a>
          <a href="#experience">{t.nav.experience}</a>
          <a href="#contact">{t.nav.contact}</a>
        </div>

        <div className="nav-right">
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
      </nav>

      {/* HERO */}
      <section className="hero" id="top">
        <div className="hero-content">
          <div className="eyebrow">
            <span className="status-dot"></span>
            {t.hero.available}
          </div>

          <h1>
            {t.hero.titleFirst}{" "}
            <span>{t.hero.titleHighlight}</span>
            <br />
            {t.hero.titleSecond}
          </h1>

          <p className="hero-description">
            {t.hero.description}
          </p>

          <div className="hero-actions">
            <a href="#project" className="button button-dark">
              {t.hero.explore}
              <span>→</span>
            </a>

            <a
              href={profile.cv}
              target="_blank"
              rel="noreferrer"
              className="button button-light"
            >
              {t.hero.viewCv}
              <span>↗</span>
            </a>
          </div>

          <div className="hero-feedback">
  <button
    type="button"
    className={`hero-approve-button ${
      hasVoted ? "disabled" : ""
    }`}
    onClick={() => submitFeedback("approve")}
    disabled={hasVoted || feedbackLoading}
  >
    <span className="hero-approve-icon">👍</span>

    <span className="hero-approve-text">
      {hasVoted
        ? t.feedback.thanks
        : t.feedback.approve}
    </span>

    <strong>{feedback.approve}</strong>
  </button>
</div>

          <div className="hero-meta">
            <span>{profile.location}</span>
            <span className="meta-separator">•</span>
            <span>{t.hero.focus}</span>
          </div>
        </div>

        <div className="hero-side">
          <div className="hero-card">
            <div className="hero-card-label">
              {t.hero.currentFocus}
            </div>

            <h3>{t.hero.backend}</h3>

            <p>{t.hero.backendDescription}</p>

            <div className="hero-card-stack">
              <span>Java</span>
              <span>Spring Boot</span>
              <span>SQL</span>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="section about-section" id="about">
        <div className="section-heading">
          <span className="section-number">01</span>
          <h2>{t.sections.about}</h2>
        </div>

        <div className="about-grid">
          <div>
            <p className="large-text">{t.about.large}</p>
          </div>

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
          <span className="section-number">02</span>
          <h2>{t.sections.skills}</h2>
        </div>

        <div className="skills-grid">
          <SkillCard
            number="01"
            title={t.skills.backend}
            items={skills.backend}
          />

          <SkillCard
            number="02"
            title={t.skills.database}
            items={skills.database}
          />

          <SkillCard
            number="03"
            title={t.skills.applications}
            items={skills.applications}
          />

          <SkillCard
            number="04"
            title={t.skills.infrastructure}
            items={skills.infrastructure}
          />
        </div>
      </section>

      {/* PROJECT */}
      <section className="section project-section" id="project">
        <div className="section-heading">
          <span className="section-number">03</span>
          <h2>{t.sections.project}</h2>
        </div>

        <div className="project-card">
          <div className="project-top">
            <div>
              <span className="project-label">
                {t.project.label}
              </span>

              <h2>{t.project.title}</h2>

              <p>{t.project.description}</p>
            </div>

            <div className="project-actions">
              <a
                href={profile.demoClient}
                target="_blank"
                rel="noreferrer"
                className="project-button"
              >
                {t.project.client}
              </a>

              <a
                href={profile.demoAdmin}
                target="_blank"
                rel="noreferrer"
                className="project-button secondary"
              >
                {t.project.admin}
              </a>
            </div>
          </div>

          <div className="project-tech">
            {[
              "Java",
              "Spring Boot",
              "MS SQL Server",
              "React",
              "React Native",
              "JavaFX",
              "Azure",
              "Render",
              "Cloudflare",
            ].map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>

<div className="project-gallery">
  <div className="project-gallery-heading">
    <div>
      <span className="project-gallery-label">
        {t.project.screenshots}
      </span>
     
      <h3>{t.project.screenshotsTitle}</h3>

      <p>{t.project.screenshotsDescription}</p>
    </div>
  </div>

  <div className="project-gallery-grid">
    {Object.entries(projectImages).map(([path, image], index) => {
      const fileName = path
        .split("/")
        .pop()
        .replace(/\.[^/.]+$/, "")
        .replace(/[-_]/g, " ");

      return (
        <div
          className={`project-image-card ${
            index === 0 ? "project-image-large" : ""
          }`}
          key={path}
          onClick={() => setSelectedImage({ src: image, name: fileName })}
        >
          <img
            src={image}
            alt={`Beauty Salon ${fileName}`}
          />

          <div className="project-image-overlay">
            <span>{fileName}</span>
          </div>
        </div>
      );
    })}
  </div>

  {/* Full View Modal */}
  {selectedImage && (
    <div className="lightbox-overlay" onClick={() => setSelectedImage(null)}>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <button className="lightbox-close" onClick={() => setSelectedImage(null)}>
          &times;
        </button>
        <img src={selectedImage.src} alt={selectedImage.name} />
        <div className="lightbox-caption">{selectedImage.name}</div>
      </div>
    </div>
  )}
</div>



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
          <span className="section-number">04</span>
          <h2>{t.sections.experience}</h2>
        </div>

        <div className="experience">
          <div className="experience-item">
            <div className="experience-date">
              {t.experience.date}
            </div>

            <div className="experience-content">
              <span className="experience-type">
                {t.experience.type}
              </span>

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
      <section className="section compact-section">
        <div className="section-heading">
          <span className="section-number">05</span>
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
          <span className="section-number">06</span>

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

            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              <span>{t.contact.linkedin}</span>
              aminbislimaj
            </a>

            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
            >
              <span>{t.contact.github}</span>
              aminbisl17
            </a>

            <a
              href={profile.whatsapp}
              target="_blank"
              rel="noreferrer"
            >
              <span>{t.contact.whatsapp}</span>
              {profile.phone}
            </a>
          </div>

          <a
            href={profile.cv}
            download
            className="download-cv"
          >
            {t.contact.download}
          </a>
        </div>
      </section>


      {/* FOOTER */}
      <footer>
        <span>
          © {new Date().getFullYear()} Amin Bislimaj
        </span>

        <span>{t.footer.role}</span>
      </footer>
    </main>
  );
}

function SkillCard({ number, title, items }) {
  return (
    <div className="skill-card">
      <div className="skill-card-top">
        <span>{number}</span>
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
