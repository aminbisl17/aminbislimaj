import React from 'react';
import './Portfolio.css';

export default function Main() {
  const profile = {
    name: "Amin Bislimaj",
    title: "Zhvillues Backend Junior | Zhvillues Java Spring Boot",
    location: "Prizren, Kosovë",
    education: "UBT – University for Business and Technology",
    email: "amin.b05@icloud.com",
    phone: "+383 45 380 871",
    whatsapp: "https://wa.me/38345380871",
    github: "https://github.com/aminbisl17",
    linkedin: "https://www.linkedin.com/in/aminbislimaj",
    demoClient: "https://beautysalonclient.aminbislimaj.com",
    demoAdmin: "https://beautysalonadmin.aminbislimaj.com"
  };

  const skills = {
    backend: ["Java", "Spring Boot", "Krijimi i REST API-ve", "Programim OOP", "Arkitekturë me shtresa", "JWT & Refresh Tokens", "RBAC / Type-Based Access Control"],
    database: ["Microsoft SQL Server", "MySQL", "Dizajnimi i databazave relacionale", "SQL Queries & Stored Procedures", "Optimizim i strukturës së të dhënave", "Validim i rregullave biznesore"],
    frontend: ["React", "React Native (Expo)", "JavaFX", "Integrimi me REST API", "Dizajnim UI Multi-platform"],
    toolsAndCloud: ["Git / GitHub", "Azure", "Render", "Cloudflare", "Postman", "Dizajnim i arkitekturës së sistemeve"],
    integrations: ["SMS & Email Services", "WebSocket (Komunikim në kohë reale)", "Sisteme autentikimi me QR Code"]
  };

  const featuredProject = {
    title: "Beauty Salon SaaS Platform",
    subtitle: "Sistem Menaxhimi Multi-Platformë për Operacione Biznesi",
    description: "Platformë e plotë SaaS e ndërtuar për menaxhimin e salloneve të bukurisë me sistem multi-rol dhe multi-platformë (web, mobile dhe desktop) në kohë reale.",
    techStack: ["Java", "Spring Boot", "MS SQL Server", "MySQL", "React.js", "React Native (Expo)", "JavaFX", "Azure", "Render", "Cloudflare"],
    metrics: [
      "Mbështet 4 aplikacione të sinkronizuara në kohë reale (Web Admin, Web Client, Mobile Apps, Desktop)",
      "Menaxhon mesatarisht qindra operacione ditore (rezervime, klientë, shërbime)",
      "Redukton kohën e menaxhimit të termineve me rreth 60–70% krahasuar me proceset manuale",
      "Siguron akses të ndarë sipas roleve (admin, punëtor, klient) me JWT dhe Refresh Tokens"
    ],
    features: [
      "Rezervime dhe termine në kohë reale si dhe historik të plotë të klientëve",
      "Menaxhim i punëtorëve, roleve, shërbimeve dhe disponueshmërisë dinamike",
      "Sinkronizim i të dhënave ndërmjet platformave përmes REST API dhe WebSockets"
    ]
  };

  return (
    <div className="portfolio-container">
      {/* Hero / Header Section */}
      <header className="portfolio-header">
        <div className="header-content">
          <h1 className="profile-name">{profile.name}</h1>
          <p className="profile-title">{profile.title}</p>
          <p className="profile-location">📍 {profile.location} • 🎓 {profile.education}</p>
          
          <div className="contact-bar">
            <a href={`mailto:${profile.email}`} className="btn btn-secondary">
              ✉️ {profile.email}
            </a>
            <a href={profile.whatsapp} target="_blank" rel="noreferrer" className="btn btn-whatsapp">
              💬 WhatsApp ({profile.phone})
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="btn btn-outline">
              💻 GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn btn-outline">
              🔗 LinkedIn
            </a>
          </div>
        </div>
      </header>

      {/* Summary Section */}
      <section className="portfolio-section">
        <h2 className="section-title">Përmbledhje Profesionale</h2>
        <div className="card summary-card">
          <p className="paragraph">
            Zhvillues softuerësh i fokusuar në zhvillimin backend me Java dhe Spring Boot. 
            Kam përvojë në ndërtimin e aplikacioneve biznesi, REST API-ve, sistemeve të sigurta të autentikimit, 
            dizajnimit të databazave relacionale dhe integrimeve me shërbime të jashtme. 
            I përkushtuar në ndërtimin e sistemeve të sigurta, të qëndrueshme dhe të shkallëzueshme.
          </p>
        </div>
      </section>

      {/* Technical Skills Section */}
      <section className="portfolio-section">
        <h2 className="section-title">Aftësitë Teknike</h2>
        <div className="skills-grid">
          <div className="card skill-card">
            <h3 className="card-title">Backend Development</h3>
            <div className="skill-pills">
              {skills.backend.map((item, i) => <span key={i} className="skill-pill">{item}</span>)}
            </div>
          </div>

          <div className="card skill-card">
            <h3 className="card-title">Databaza</h3>
            <div className="skill-pills">
              {skills.database.map((item, i) => <span key={i} className="skill-pill">{item}</span>)}
            </div>
          </div>

          <div className="card skill-card">
            <h3 className="card-title">Frontend & Klientë</h3>
            <div className="skill-pills">
              {skills.frontend.map((item, i) => <span key={i} className="skill-pill">{item}</span>)}
            </div>
          </div>

          <div className="card skill-card">
            <h3 className="card-title">Cloud, Mjete & Integrime</h3>
            <div className="skill-pills">
              {skills.toolsAndCloud.concat(skills.integrations).map((item, i) => (
                <span key={i} className="skill-pill">{item}</span>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* Featured Project Section */}
      <section className="portfolio-section">
        <h2 className="section-title">Projekti Kryesor</h2>
        <div className="card project-card">
          <div className="project-header">
            <div>
              <h3 className="project-title">{featuredProject.title}</h3>
              <p className="project-subtitle">{featuredProject.subtitle}</p>
            </div>
            <div className="project-links">
              <a href={profile.demoClient} target="_blank" rel="noreferrer" className="btn btn-primary">
                Client Web ↗
              </a>
              <a href={profile.demoAdmin} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ marginLeft: '8px' }}>
                Admin Web ↗
              </a>
            </div>
          </div>

          <p className="paragraph">{featuredProject.description}</p>

          <div className="tag-container">
            {featuredProject.techStack.map((tech, idx) => (
              <span key={idx} className="tech-tag">{tech}</span>
            ))}
          </div>

          <div className="project-details-grid">
            <div>
              <h4 className="sub-heading">Rezultate & Ndikim</h4>
              <ul className="custom-list">
                {featuredProject.metrics.map((metric, i) => <li key={i}>{metric}</li>)}
              </ul>
            </div>
            <div>
              <h4 className="sub-heading">Veçoritë Kryesore</h4>
              <ul className="custom-list">
                {featuredProject.features.map((feat, i) => <li key={i}>{feat}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="portfolio-section">
        <h2 className="section-title">Përvojë në Zhvillim Softuerik</h2>
        <div className="card experience-card">
          <div className="exp-header">
            <div>
              <h3 className="card-title">Zhvillues Softuerësh i Pavarur</h3>
              <p className="exp-subtitle">Zhvillim i Platformës SaaS</p>
            </div>
          </div>
          <ul className="custom-list">
            <li>Zhvillova një platformë SaaS nga ideja deri në implementim të plotë në prodhim.</li>
            <li>Ndërtova REST API me Spring Boot që shërben si backend për 4 aplikacione të ndryshme.</li>
            <li>Implementova sistem që përpunon qindra request-e në ditë për rezervime dhe operacione biznesi.</li>
            <li>Dizajnova dhe implementova databazë relacionale me struktura të optimizuara për performancë.</li>
            <li>Reduktova kompleksitetin e menaxhimit të termineve duke automatizuar proceset kryesore të biznesit.</li>
            <li>Implementova sistem sigurie me JWT dhe Role-Based Access Control (RBAC).</li>
            <li>Përdora Git, GitHub dhe Postman për versionim, menaxhim të kodit dhe testim të API-ve.</li>
          </ul>
        </div>
      </section>

      {/* Education Section */}
      <section className="portfolio-section">
        <h2 className="section-title">Edukimi</h2>
        <div className="card education-card">
          <h3 className="card-title">{profile.education}</h3>
          <p className="profile-location">{profile.location}</p>
        </div>
      </section>
    </div>
  ); 
}