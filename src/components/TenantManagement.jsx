import { useState } from "react";
import "./TenantManagement.css";

const API_URL = import.meta.env.VITE_BEAUTYSALON_API_URL;
const LOGIN_URL = `${API_URL}/auth/login`;

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | loading | error
  const [message, setMessage] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (status === "error") {
      setStatus("idle");
      setMessage("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch(LOGIN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // needed if your backend sets a session cookie
        body: JSON.stringify({
          username: form.username.trim(),
          password: form.password,
        }),
      });

      let data = {};
      try {
        data = await res.json();
      } catch {
        // response had no JSON body
      }

      if (!res.ok) {
        throw new Error(
          data.message ||
            (res.status === 401
              ? "Incorrect username or password."
              : "Something went wrong. Please try again.")
        );
      }

      // If your backend returns a token, store it here, e.g.:
      // localStorage.setItem("token", data.token);

      setStatus("idle");
      setLoggedIn(true); // switch to the blank view
    } catch (err) {
      setStatus("error");
      setMessage(
        err instanceof TypeError
          ? "Can't reach the server. Check your connection and try again."
          : err.message
      );
    }
  };

  // Blank view shown after a successful login. Put your content in here later.
  if (loggedIn) {
    return <main className="blank-view" />;
  }

  const isLoading = status === "loading";
  const canSubmit = form.username.trim() && form.password && !isLoading;

  return (
    <main className="login-page">
      <div className="login-card">
        <div className="login-label">Admin access</div>
        <h1>Sign in</h1>
        <p className="login-subtitle">
          Enter your username and password to continue.
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="login-field">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              autoFocus
              value={form.username}
              onChange={handleChange}
              disabled={isLoading}
              aria-invalid={status === "error"}
            />
          </div>

          <div className="login-field">
            <label htmlFor="password">Password</label>
            <div className="login-password">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={form.password}
                onChange={handleChange}
                disabled={isLoading}
                aria-invalid={status === "error"}
              />
              <button
                type="button"
                className="login-toggle"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <p
            className={`login-message ${status === "error" ? "error" : ""}`}
            role="alert"
            aria-live="polite"
          >
            {message}
          </p>

          <button
            type="submit"
            className="button button-dark login-submit"
            disabled={!canSubmit}
          >
            {isLoading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <a href="/" className="login-back">
          Back to portfolio
        </a>
      </div>
    </main>
  );
}