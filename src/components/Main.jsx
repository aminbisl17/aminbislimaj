import React from 'react';
import './Portfolio.css';

export default function main() {
  const profile = {
    name: "Amin Bislimaj",
    title: "Zhvillues Backend Junior | Zhvillues Java Spring Boot",
    location: "Prizren, Kosovë",
    education: "UBT – University for Business and Technology",
    email: "amin.b05@icloud.com",
    github: "https://github.com/aminbisl17",
    linkedin: "https://www.linkedin.com/in/aminbislimaj",
    demo: "https://beautysalon.aminbislimaj.com/"
  };

  const skills = {
    backend: ["Java", "Spring Boot", "Krijimi i REST API-ve", "Programim OOP", "Arkitekturë me shtresa (Controller/Service/Repository)", "JWT & Refresh Tokens", "RBAC / Type-Based Access Control"],
    database: ["Microsoft SQL Server", "MySQL", "Dizajnimi i databazave relacionale", "SQL Queries & Stored Procedures", "Optimizim i strukturës së të dhënave", "Validim i rregullave biznesore"],
    frontend: ["React", "React Native (Expo)", "JavaFX", "Integrimi me REST API", "Dizajnim UI Multi-platform"],
    toolsAndCloud: ["Git / GitHub", "Azure", "Render", "Cloudflare", "Postman", "Dizajnim i arkitekturës së sistemeve"],
    integrations: ["SMS & Email Services", "WebSocket (Komunikim në kohë reale)", "Sisteme autentikimi me QR Code"]
  };

  const featuredProject = {
    title: "Beauty Salon SaaS Platform",
    subtitle: "Sistem Menaxhimi Multi-Platformë për Operacione Biznesi",
    description: "Platformë e plotë SaaS e ndërtuar për menaxhimin e salloneve të bukurisë me sistem multi-rol dhe multi-platformë (web, mobile dhe desktop) në kohë reale[cite: 1].",
    techStack: ["Java", "Spring Boot", "MS SQL Server", "MySQL", "React.js", "React Native (Expo)", "JavaFX", "Azure", "Render", "Cloudflare"],
    metrics: [
      "Mbështet 4 aplikacione të sinkronizuara në kohë reale (Web Admin, Web Client, Mobile Apps, Desktop)[cite: 1]",
      "Menaxhon mesatarisht qindra operacione ditore (rezervime, klientë, shërbime)[cite: 1]",
      "Redukton kohën e menaxhimit të termineve me rreth 60–70% krahasuar me proceset manuale[cite: 1]",
      "Siguron akses të ndarë sipas roleve (admin, punëtor, klient) me JWT dhe Refresh Tokens[cite: 1]"
    ],
    features: [
      "Rezervime dhe termine në kohë reale si dhe historik të plotë të klientëve[cite: 1]",
      "Menaxhim i punëtorëve, roleve, shërbimeve dhe disponueshmërisë dinamike[cite: 1]",
      "Sinkronizim i të dhënave ndërmjet platformave përmes REST API dhe WebSockets[cite: 1]"
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
            <a href={profile.github} target="_blank" rel="noreferrer" className="btn btn-outline">
              💻 GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn btn-outline">
              🔗 LinkedIn
            </a>
            <a href={profile.demo} target="_blank" rel="noreferrer" className="btn btn-primary">
              🚀 Demo Live
            </a>
          </div>
        </div>
      </header>

      {/* Summary Section */}
      <section className="portfolio-section">
        <h2 className="section-title">Përmbledhje Profesionale</h2>
        <div className="card summary-card">
          <p className="paragraph">
            Zhvillues softuerësh i fokusuar në zhvillimin backend me Java dhe Spring Boot[cite: 1]. 
            Kam përvojë në ndërtimin e aplikacioneve biznesi, REST API-ve, sistemeve të sigurta të autentikimit[cite: 1], 
            dizajnimit të databazave relacionale dhe integrimeve me shërbime të jashtme[cite: 1]. 
            I përkushtuar në ndërtimin e sistemeve të sigurta, të qëndrueshme dhe të shkallëzueshme[cite: 1].
          </p>
        </div>
      </section>

      {/* Technical Skills Section */}
      <section className="portfolio-section">
        <h2 className="section-title">Aftësitë Teknike</h2>
        <div className="skills-grid">
          <div className="card skill-card">
            <h3 className="card-title">Backend Development</h3>
            <ul className="skill-list">
              {skills.backend.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>

          <div className="card skill-card">
            <h3 className="card-title">Databaza</h3>
            <ul className="skill-list">
              {skills.database.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>

          <div className="card skill-card">
            <h3 className="card-title">Frontend & Klientë</h3>
            <ul className="skill-list">
              {skills.frontend.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>

          <div className="card skill-card">
            <h3 className="card-title">Cloud, Mjete & Integrime</h3>
            <ul className="skill-list">
              {skills.toolsAndCloud.concat(skills.integrations).map((item, i) => <li key={i}>{item}</li>)}
            </ul>
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
            <a href={profile.demo} target="_blank" rel="noreferrer" className="btn btn-primary">
              Shiko Live ↗
            </a>
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
              <ul className="skill-list">
                {featuredProject.metrics.map((metric, i) => <li key={i}>{metric}</li>)}
              </ul>
            </div>
            <div>
              <h4 className="sub-heading">Veçoritë Kryesore</h4>
              <ul className="skill-list">
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
          <ul className="skill-list">
            <li>Zhvillova një platformë SaaS nga ideja deri në implementim të plotë në prodhim[cite: 1].</li>
            <li>Ndërtova REST API me Spring Boot që shërben si backend për 4 aplikacione të ndryshme[cite: 1].</li>
            <li>Implementova sistem që përpunon qindra request-e në ditë për rezervime dhe operacione biznesi[cite: 1].</li>
            <li>Dizajnova dhe implementova databazë relacionale me struktura të optimizuara për performancë[cite: 1].</li>
            <li>Reduktova kompleksitetin e menaxhimit të termineve duke automatizuar proceset kryesore të biznesit[cite: 1].</li>
            <li>Implementova sistem sigurie me JWT dhe Role-Based Access Control (RBAC)[cite: 1].</li>
            <li>Përdora Git, GitHub dhe Postman për versionim, menaxhim të kodit dhe testim të API-ve[cite: 1].</li>
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