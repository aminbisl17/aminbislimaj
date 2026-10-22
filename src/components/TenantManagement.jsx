import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import "./TenantManagement.css";

const API_URL = import.meta.env.VITE_BEAUTYSALON_API_URL;
const LOGIN_URL = `${API_URL}/auth/login/company`;

export default function Login() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  // New: OTP and QR authentication
  const [otp, setOtp] = useState("");
  const [showQr, setShowQr] = useState(true);

  const qrPayload = JSON.stringify({
    username: form.username.trim(),
    otp,
  });

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
    setOtp("");

    try {
      const res = await fetch(LOGIN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          username: form.username.trim(),
          password: form.password,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(
          data.message ||
            (res.status === 401
              ? "Incorrect username or password."
              : "Something went wrong. Please try again.")
        );
      }

      if (!data.otp) {
        throw new Error("The server did not return an OTP.");
      }

      setOtp(String(data.otp));
      setStatus("idle");
    } catch (err) {
      setStatus("error");
      setMessage(
        err instanceof TypeError
          ? "Can't reach the server. Check your connection."
          : err.message
      );
    }
  };

  if (loggedIn) {
    return <main className="blank-view" />;
  }

  const isLoading = status === "loading";
  const canSubmit =
    form.username.trim() && form.password && !isLoading;

  return (
    <main className="login-page">
      <div className="login-card">
        {!otp ? (
          <>
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
                  required
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
                    required
                  />

                  <button
                    type="button"
                    className="login-toggle"
                    onClick={() =>
                      setShowPassword((value) => !value)
                    }
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <p
                className={`login-message ${
                  status === "error" ? "error" : ""
                }`}
                role="alert"
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
          </>
        ) : (
          <section className="login-otp">
            <div className="login-label">Secure verification</div>
            <h1>Verify your login</h1>

            <p className="login-subtitle">
              Scan this QR code with your BeautySalon mobile app,
              or use the displayed verification code.
            </p>

            <div className="login-code-box">
              <span>Verification code</span>
              <strong>{otp}</strong>
            </div>

            <div className="login-qr-toggle">
              <button
                type="button"
                className="button button-dark login-submit"
                onClick={() => setShowQr((value) => !value)}
              >
                {showQr ? "Hide QR code" : "Show QR code"}
              </button>
            </div>

            {showQr && (
              <div className="login-qr-box">
                <QRCodeSVG
                  value={qrPayload}
                  size={220}
                  level="M"
                  marginSize={3}
                  title="BeautySalon login verification QR code"
                />

                <p>Open the mobile app and scan this code.</p>
              </div>
            )}

            <p className="login-subtitle login-account">
              Account: <strong>{form.username}</strong>
            </p>

            <p className="login-message" role="status">
              Waiting for mobile verification.
            </p>

            <button
              type="button"
              className="login-back-button"
              onClick={() => {
                setOtp("");
                setMessage("");
                setStatus("idle");
              }}
            >
              Back to sign in
            </button>
          </section>
        )}
      </div>
    </main>
  );
}