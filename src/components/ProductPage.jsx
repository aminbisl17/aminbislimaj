import { useEffect, useMemo, useState } from "react";
import products from "./Products";
import "./ProductPage.css";

const API = {
  requestKey: "/api/keys", // POST { name, email, plan, productId }
  reviews: (productId) => `/api/products/${productId}/reviews`, // GET list, POST { name, rating, text }
};

function Stars({ value, size = 16 }) {
  return (
    <span className="pp-stars" role="img" aria-label={`${value} out of 5 stars`} style={{ fontSize: size }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} className={n <= Math.round(value) ? "on" : ""}>★</span>
      ))}
    </span>
  );
}

function KeyModal({ product, plan, onClose }) {
  const [form, setForm] = useState({ name: "", email: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | done | error

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const submit = async () => {
    if (!form.name.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) {
      setStatus("invalid");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(API.requestKey, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, plan: plan.id, productId: product.id }),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="pp-overlay" role="dialog" aria-modal="true" aria-label="Get your key" onClick={onClose}>
      <div className="pp-modal" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="pp-modal-close" onClick={onClose} aria-label="Close">&times;</button>

        {status === "done" ? (
          <div className="pp-modal-done">
            <h3>Your key is on its way</h3>
            <p>We sent the {plan.name} license key to {form.email}. It can take a minute to arrive.</p>
            <button type="button" className="pp-btn pp-btn-solid" onClick={onClose}>Done</button>
          </div>
        ) : (
          <>
            <h3>Get your {product.name} {plan.name} key</h3>
            <p className="pp-modal-sub">${plan.price} / month. Enter your details and we will email your license key.</p>

            <label>
              Full name
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} autoComplete="name" />
            </label>
            <label>
              Email
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} autoComplete="email" />
            </label>

            {status === "invalid" && <p className="pp-error">Enter your name and a valid email address.</p>}
            {status === "error" && <p className="pp-error">Something went wrong sending your key. Try again in a moment.</p>}

            <button type="button" className="pp-btn pp-btn-solid pp-btn-block" onClick={submit} disabled={status === "sending"}>
              {status === "sending" ? "Sending…" : "Get key"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function Reviews({ product }) {
  const [reviews, setReviews] = useState(product.reviews || []);
  const [form, setForm] = useState({ name: "", rating: 0, text: "" });
  const [msg, setMsg] = useState("");

  useEffect(() => {
    setReviews(product.reviews || []);
    fetch(API.reviews(product.id))
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => Array.isArray(data) && data.length && setReviews(data))
      .catch(() => {});
  }, [product]);

  const { avg, counts } = useMemo(() => {
    const c = [0, 0, 0, 0, 0];
    reviews.forEach((r) => (c[r.rating - 1] += 1));
    const total = reviews.length || 1;
    return { avg: reviews.reduce((s, r) => s + r.rating, 0) / total, counts: c };
  }, [reviews]);

  const submit = async () => {
    if (!form.name.trim() || !form.rating || form.text.trim().length < 10) {
      setMsg("Add your name, a star rating and at least a sentence of feedback.");
      return;
    }
    const review = { ...form, id: Date.now(), date: new Date().toISOString().slice(0, 10) };
    try {
      await fetch(API.reviews(product.id), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } catch {
      /* still show locally */
    }
    setReviews([review, ...reviews]);
    setForm({ name: "", rating: 0, text: "" });
    setMsg("Thanks, your review is posted.");
  };

  return (
    <section className="pp-section" id="reviews">
      <h2>Reviews</h2>

      <div className="pp-reviews">
        <aside className="pp-summary">
          <div className="pp-avg">{avg.toFixed(1)}</div>
          <Stars value={avg} size={20} />
          <p>{reviews.length} review{reviews.length === 1 ? "" : "s"}</p>

          <ul>
            {[5, 4, 3, 2, 1].map((n) => (
              <li key={n}>
                <span>{n}★</span>
                <i><b style={{ width: `${(counts[n - 1] / (reviews.length || 1)) * 100}%` }} /></i>
                <span>{counts[n - 1]}</span>
              </li>
            ))}
          </ul>
        </aside>

        <div>
          <div className="pp-review-form">
            <h3>Write a review</h3>
            <div className="pp-rate" role="radiogroup" aria-label="Your rating">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  type="button"
                  key={n}
                  role="radio"
                  aria-checked={form.rating === n}
                  aria-label={`${n} star${n > 1 ? "s" : ""}`}
                  className={n <= form.rating ? "on" : ""}
                  onClick={() => setForm({ ...form, rating: n })}
                >★</button>
              ))}
            </div>
            <input placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <textarea rows={3} placeholder="What did you like, and what could be better?" value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} />
            <div className="pp-form-row">
              <button type="button" className="pp-btn pp-btn-solid" onClick={submit}>Post review</button>
              {msg && <span className="pp-form-msg" role="status">{msg}</span>}
            </div>
          </div>

          <ul className="pp-review-list">
            {reviews.map((r) => (
              <li key={r.id}>
                <div className="pp-review-head">
                  <strong>{r.name}</strong>
                  <Stars value={r.rating} size={13} />
                  <time>{r.date}</time>
                </div>
                <p>{r.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Gallery({ product }) {
  const items = product.gallery || [];
  const [current, setCurrent] = useState(null); // index or null

  useEffect(() => {
    if (current === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") setCurrent(null);
      if (e.key === "ArrowRight") setCurrent((i) => (i + 1) % items.length);
      if (e.key === "ArrowLeft") setCurrent((i) => (i - 1 + items.length) % items.length);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [current, items.length]);

  if (!items.length) return null;

  return (
    <section className="pp-section" id="gallery">
      <h2>Inside the product</h2>
      <div className="pp-gallery">
        {items.map((item, i) => (
          <button
            type="button"
            key={item.src}
            className={`pp-shot ${i === 0 ? "pp-shot-large" : ""}`}
            onClick={() => setCurrent(i)}
            aria-label={`Enlarge: ${item.name}`}
          >
            <img src={item.src} alt={`${product.name} ${item.name}`} loading="lazy" />
            <span className="pp-shot-caption">{item.name}</span>
          </button>
        ))}
      </div>

      {current !== null && (
        <div className="pp-overlay" role="dialog" aria-modal="true" aria-label={items[current].name} onClick={() => setCurrent(null)}>
          <div className="pp-lightbox" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="pp-modal-close" onClick={() => setCurrent(null)} aria-label="Close">&times;</button>
            {items.length > 1 && (
              <>
                <button type="button" className="pp-lb-nav pp-lb-prev" onClick={() => setCurrent((current - 1 + items.length) % items.length)} aria-label="Previous">‹</button>
                <button type="button" className="pp-lb-nav pp-lb-next" onClick={() => setCurrent((current + 1) % items.length)} aria-label="Next">›</button>
              </>
            )}
            <img src={items[current].src} alt={items[current].name} />
            <p>{items[current].name} · {current + 1} / {items.length}</p>
          </div>
        </div>
      )}
    </section>
  );
}

export default function ProductPage({ slug }) {
  const product = products.find((p) => p.slug === slug);
  const [activePlan, setActivePlan] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (product) document.title = `${product.name} | Portfolio`;
  }, [slug, product]);

  if (!product) {
    return (
      <main className="product-page">
        <div className="pp-wrap">
          <nav className="pp-topbar">
            <a href="/#project" className="pp-back">← Back to portfolio</a>
          </nav>
          <section className="pp-section">
            <h2>Product not found</h2>
            <p className="pp-lead">There is no product at this address. Go back to the portfolio and pick one from the list.</p>
          </section>
        </div>
      </main>
    );
  }

  const featuredPlan = product.plans.find((p) => p.featured) || product.plans[0];

  return (
    <main className="product-page">
      <div className="pp-wrap">
        <nav className="pp-topbar">
          <a href="/#project" className="pp-back">← Back to portfolio</a>
          <div className="pp-topnav">
            <a href="#gallery">Gallery</a>
            <a href="#plans">Plans</a>
            <a href="#features">Features</a>
            <a href="#reviews">Reviews</a>
          </div>
        </nav>

        {/* Hero */}
        <header className="pp-hero">
          <div className="pp-hero-copy">
            <span className="pp-brand"><b>{product.brandIcon}</b> {product.name}</span>
            <h1>{product.title}</h1>
            <p>{product.description}</p>
            <div className="pp-hero-actions">
              <a href="/company" className="pp-btn pp-btn-light">
  Get key
</a>
              <a href="#plans" className="pp-btn pp-btn-ghost">See plans</a>
            </div>
            <div className="pp-hero-rating">
              <Stars value={product.rating} size={14} /> <a href="#reviews">Read client reviews</a>
            </div>
          </div>
        </header>

        {/* Platforms */}
        <section className="pp-section">
          <h2>{product.platformsTitle}</h2>
          <div className="pp-grid-3">
            {product.platforms.map(([title, text]) => (
              <article className="pp-card" key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="pp-section" id="features">
          <h2>{product.featuresTitle}</h2>
          <div className="pp-features">
            {product.features.map(([title, text]) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <Gallery product={product} />

        {/* Plans */}
        {/* Plans */}
        <section className="pp-section" id="plans">
          <h2>Choose your plan</h2>
          <p className="pp-lead">Every plan includes updates and a license key you can activate in minutes.</p>

          <div className="pp-grid-3 pp-plans">
            {product.plans.map((plan) => (
              <article className={`pp-plan ${plan.featured ? "featured" : ""}`} key={plan.id}>
                {plan.featured && <span className="pp-badge">Most popular</span>}
                <h3>{plan.name}</h3>
                <p className="pp-plan-blurb">{plan.blurb}</p>
                <div className="pp-price">
                  <strong>${plan.price}</strong> <span>/ month</span>
                </div>
                <ul>
                  {plan.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <button
                  type="button"
                  className={`pp-btn pp-btn-block ${plan.featured ? "pp-btn-solid" : "pp-btn-outline"}`}
                  onClick={() => setActivePlan(plan)}
                >
                  Get key
                </button>
              </article>
            ))}
          </div>
        </section>

        <Reviews product={product} />

        {/* Closing CTA */}
        <section className="pp-final">
          <div>
            <h2>{product.cta.title}</h2>
            <p>{product.cta.text}</p>
          </div>
          <div className="pp-hero-actions">
            <button type="button" className="pp-btn pp-btn-light" onClick={() => setActivePlan(featuredPlan)}>Get key</button>
            <a href="/#contact" className="pp-btn pp-btn-ghost">Contact me</a>
          </div>
        </section>
      </div>

      {activePlan && <KeyModal product={product} plan={activePlan} onClose={() => setActivePlan(null)} />}
    </main>
  );
}