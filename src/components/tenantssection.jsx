import React, { useEffect, useState } from "react";
import "./tenantssection.css";

// Base URL of the Beauty Salon backend, e.g. VITE_BEAUTYSALON_API_URL=https://api.example.com

const API_BASE = (
  import.meta.env.VITE_BEAUTYSALON_API_URL ??
  "https://beautysalon-amin-2026-ghfzbxbqcvdfb2hf.austriaeast-01.azurewebsites.net"
).replace(/\/+$/, "");

const projects = [
  {
    id: "beautysalon",
    name: "Beauty Salon SaaS",
    tenantsUrl: `${API_BASE}/tenants`,
  },
];

function toUrl(domain) {
  if (!domain) return null;
  return /^https?:\/\//i.test(domain) ? domain : `https://${domain}`;
}

export default function TenantsSection({ t, language, number = "04" }) {
  const labels = t.tenants;

  const [projectId, setProjectId] = useState(projects[0].id);
  const [tenants, setTenants] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [selectedId, setSelectedId] = useState(null);

  const project = projects.find((p) => p.id === projectId);
  const selected = tenants.find((tenant) => tenant.id === selectedId) || null;

  // Load the tenants of the selected project
  useEffect(() => {
    const controller = new AbortController();

    setStatus("loading");
    setTenants([]);
    setSelectedId(null);

    fetch(project.tenantsUrl, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setTenants(Array.isArray(data) ? data : []);
        setStatus("ready");
      })
      .catch((error) => {
        if (error.name === "AbortError") return;
        console.error("Failed to load tenants:", error);
        setStatus("error");
      });

    return () => controller.abort();
  }, [project.tenantsUrl]);

  const formatDate = (value) => {
    if (!value) return "—";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "—";
    return date.toLocaleDateString(language === "sq" ? "sq-AL" : "en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <section className="section tenants-section" id="tenants">
      <div className="section-heading">
        <span className="section-number">{number}</span>
        <h2>{labels.title}</h2>
      </div>

      <div className="tenants-card">
        {/* 1. PROJECT */}
        <div className="tenants-column">
          <span className="tenants-label">{labels.project}</span>

          <div className="tenants-project-list" role="radiogroup">
            {projects.map((p) => (
              <button
                key={p.id}
                type="button"
                role="radio"
                aria-checked={p.id === projectId}
                className={`tenants-project ${p.id === projectId ? "active" : ""}`}
                onClick={() => setProjectId(p.id)}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* 2. TENANTS OF THE PROJECT */}
        <div className="tenants-column">
          <span className="tenants-label">
            {labels.tenantsLabel}
            {status === "ready" && ` · ${tenants.length}`}
          </span>

          {status === "loading" && <p className="tenants-note">{labels.loading}</p>}
          {status === "error" && <p className="tenants-note error">{labels.error}</p>}
          {status === "ready" && tenants.length === 0 && (
            <p className="tenants-note">{labels.empty}</p>
          )}

          {status === "ready" && tenants.length > 0 && (
            <div className="tenants-list" role="radiogroup">
              {tenants.map((tenant) => (
                <button
                  key={tenant.id}
                  type="button"
                  role="radio"
                  aria-checked={tenant.id === selectedId}
                  className={`tenants-item ${tenant.id === selectedId ? "active" : ""}`}
                  onClick={() => setSelectedId(tenant.id)}
                >
                  <span className="tenants-item-text">
                    <strong>{tenant.name}</strong>
                    <small>{tenant.domain}</small>
                  </span>

                  <span className={`tenants-dot ${tenant.isActive ? "on" : "off"}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 3. DETAILS OF THE SELECTED TENANT */}
        <div className="tenants-column tenants-detail">
          <span className="tenants-label">{labels.details}</span>

          {!selected && <p className="tenants-note">{labels.select}</p>}

          {selected && (
            <>
              <h3>{selected.name}</h3>

              <dl>
                <div>
                  <dt>{labels.domain}</dt>
                  <dd>{selected.domain}</dd>
                </div>

                <div>
                  <dt>{labels.key}</dt>
                  <dd>{selected.tenantKey}</dd>
                </div>

                <div>
                  <dt>{labels.statusLabel}</dt>
                  <dd>
                    <span className={`tenants-badge ${selected.isActive ? "active" : "inactive"}`}>
                      {selected.isActive ? labels.active : labels.inactive}
                    </span>
                  </dd>
                </div>

                <div>
                  <dt>{labels.created}</dt>
                  <dd>{formatDate(selected.createdAt)}</dd>
                </div>
              </dl>

              {selected.domain && (
                <a
                  href={toUrl(selected.domain)}
                  target="_blank"
                  rel="noreferrer"
                  className="button button-dark tenants-open"
                >
                  {labels.open}
                  <span>↗</span>
                </a>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}