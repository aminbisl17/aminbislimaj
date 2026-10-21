
import { useState, useEffect } from "react";
import "./CompanyManagement.css";

export default function LoginVerification() {
    const [view, setView] = useState("otp");
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [sendingOtp, setSendingOtp] = useState(true);

    useEffect(() => {
        const sendLoginRequest = async () => {
            try {
                const response = await fetch(
                    "https://beautysalon-amin-2026-ghfzbxbqcvdfb2hf.austriaeast-01.azurewebsites.net/auth/login",
                    { method: "POST" }
                );

                if (!response.ok) {
                    throw new Error("Failed to send OTP.");
                }

                setError("");
            } catch {
                setError(
                    "Failed to send the verification code. Please refresh the page and try again."
                );
            } finally {
                setSendingOtp(false);
            }
        };

        sendLoginRequest();
    }, []);

    const handleOtpChange = async (e) => {
        const value = e.target.value.replace(/\D/g, "").slice(0, 6);

        setOtp(value);
        setError("");

        if (value.length !== 6 || loading || sendingOtp) return;

        setLoading(true);

        try {
            const response = await fetch(
                "https://beautysalon-amin-2026-ghfzbxbqcvdfb2hf.austriaeast-01.azurewebsites.net/auth/verify-otp",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ otp: value }),
                }
            );

            if (!response.ok) {
                setError("Invalid or expired OTP.");
                setOtp("");
                return;
            }

            setView("verified");
        } catch {
            setError("Verification failed. Please try again.");
            setOtp("");
        } finally {
            setLoading(false);
        }
    };

    if (view === "white") {
        return <div className="verification-white" />;
    }

    if (view === "otp") {
        return (
            <div className="verification-page">
                <div className="verification-card">
                    <div className="otp-brand">
                        <span className="otp-brand-icon">B</span>
                        <span>BeautySalon</span>
                    </div>

                    <h2>Verify your account</h2>

                    {sendingOtp ? (
                        <p className="otp-status">
                            Sending verification code to your email...
                        </p>
                    ) : error.startsWith("Failed to send") ? (
                        <p className="otp-error">{error}</p>
                    ) : (
                        <p>
                            Enter the 6-digit verification code sent to your email.
                        </p>
                    )}

                    <input
                        className="otp-input"
                        type="text"
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        maxLength={6}
                        placeholder="000000"
                        value={otp}
                        onChange={handleOtpChange}
                        autoFocus
                        disabled={
                            sendingOtp ||
                            loading ||
                            error.startsWith("Failed to send")
                        }
                    />

                    {loading && (
                        <p className="otp-status">Verifying...</p>
                    )}

                    {error && !error.startsWith("Failed to send") && (
                        <p className="otp-error">{error}</p>
                    )}

                    <p className="otp-security-note">
                        <span>●</span> Secure administrator access
                    </p>
                </div>
            </div>
        );
    }

    // Demo dashboard — static data for preview only.
    return (
        <div className="company-dashboard">
            <aside className="company-sidebar">
                <div className="company-logo">
                    <span className="company-logo-mark">B</span>
                    <span>BeautySalon</span>
                </div>

                <div className="company-nav-label">WORKSPACE</div>

                <button className="company-nav-item active">
                    <span>▦</span>
                    Overview
                </button>

                <button className="company-nav-item">
                    <span>♙</span>
                    Companies
                </button>

                <button className="company-nav-item">
                    <span>◷</span>
                    Activity
                </button>

                <div className="company-sidebar-bottom">
                    <div className="company-admin-avatar">A</div>
                    <div>
                        <strong>Administrator</strong>
                        <span>Platform owner</span>
                    </div>
                </div>
            </aside>

            <main className="company-main">
                <header className="company-topbar">
                    <div>
                        <span className="company-breadcrumb">
                            Workspace / Overview
                        </span>
                        <h1>Company management</h1>
                    </div>

                    <div className="company-topbar-right">
                        <span className="company-live-indicator">
                            <span /> System online
                        </span>
                        <div className="company-admin-avatar">A</div>
                    </div>
                </header>

                <section className="company-welcome">
                    <div>
                        <span className="company-eyebrow">
                            ADMINISTRATOR WORKSPACE
                        </span>
                        <h2>Welcome back.</h2>
                        <p>
                            Manage your salon companies and monitor your platform
                            from one place.
                        </p>
                    </div>

                    <div className="company-welcome-decoration">B.</div>
                </section>

                <section className="company-stats">
                    <article className="company-stat-card">
                        <div className="company-stat-heading">
                            Total companies
                            <span>▦</span>
                        </div>
                        <strong>12</strong>
                        <p><span>+2</span> this month</p>
                    </article>

                    <article className="company-stat-card">
                        <div className="company-stat-heading">
                            Active companies
                            <span>✓</span>
                        </div>
                        <strong>10</strong>
                        <p>Currently operational</p>
                    </article>

                    <article className="company-stat-card">
                        <div className="company-stat-heading">
                            Pending setup
                            <span>◷</span>
                        </div>
                        <strong>2</strong>
                        <p>Awaiting configuration</p>
                    </article>
                </section>

                <section className="company-list-section">
                    <div className="company-section-heading">
                        <div>
                            <h2>Companies</h2>
                            <p>Manage your registered salon businesses.</p>
                        </div>

                        <button
                            className="company-primary-button"
                            onClick={() =>
                                alert("Demo only — company creation is not connected yet.")
                            }
                        >
                            + Add company
                        </button>
                    </div>

                    <div className="company-table-wrap">
                        <table className="company-table">
                            <thead>
                                <tr>
                                    <th>COMPANY</th>
                                    <th>TENANT KEY</th>
                                    <th>STATUS</th>
                                    <th>PLAN</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <div className="company-name-cell">
                                            <span className="company-table-avatar">L</span>
                                            <div>
                                                <strong>Luna Beauty Studio</strong>
                                                <span>luna@example.com</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>luna-beauty</td>
                                    <td>
                                        <span className="company-status active-status">
                                            Active
                                        </span>
                                    </td>
                                    <td>Professional</td>
                                    <td><button className="company-more">···</button></td>
                                </tr>

                                <tr>
                                    <td>
                                        <div className="company-name-cell">
                                            <span className="company-table-avatar avatar-beige">M</span>
                                            <div>
                                                <strong>Maison Hair & Beauty</strong>
                                                <span>maison@example.com</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>maison-beauty</td>
                                    <td>
                                        <span className="company-status active-status">
                                            Active
                                        </span>
                                    </td>
                                    <td>Starter</td>
                                    <td><button className="company-more">···</button></td>
                                </tr>

                                <tr>
                                    <td>
                                        <div className="company-name-cell">
                                            <span className="company-table-avatar avatar-gray">R</span>
                                            <div>
                                                <strong>Rose Beauty Center</strong>
                                                <span>rose@example.com</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>rose-center</td>
                                    <td>
                                        <span className="company-status pending-status">
                                            Pending
                                        </span>
                                    </td>
                                    <td>Starter</td>
                                    <td><button className="company-more">···</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <p className="company-demo-note">
                        Demo preview · Company information is illustrative.
                    </p>
                </section>
            </main>
        </div>
    );
}
