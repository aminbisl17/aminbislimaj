import { useState, useEffect, useCallback } from "react";
import "./CompanyManagement.css";

const API =
    "https://beautysalon-amin-2026-ghfzbxbqcvdfb2hf.austriaeast-01.azurewebsites.net";

export default function LoginVerification() {
    const [view, setView] = useState("otp");
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [sendingOtp, setSendingOtp] = useState(true);

    const [tenants, setTenants] = useState([]);
    const [loadingTenants, setLoadingTenants] = useState(false);
    const [tenantError, setTenantError] = useState("");
    const [showRegister, setShowRegister] = useState(false);
    const [registering, setRegistering] = useState(false);
    const [deletingId, setDeletingId] = useState(null);

    const [form, setForm] = useState({
        tenantKey: "",
        schemaName: "",
        name: "",
        domain: "",
    });

    const fetchTenants = useCallback(async () => {
        setLoadingTenants(true);
        setTenantError("");

        try {
            const response = await fetch(`${API}/tenants`, {
                method: "GET",
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error(`Failed to load tenants (${response.status}).`);
            }

            const data = await response.json();

            if (!Array.isArray(data)) {
                throw new Error("Unexpected tenant response.");
            }

            setTenants(data);
        } catch (err) {
            setTenantError(err.message || "Could not load tenants.");
        } finally {
            setLoadingTenants(false);
        }
    }, []);

    useEffect(() => {
        const sendLoginRequest = async () => {
            try {
                const response = await fetch(`${API}/auth/login`, {
                    method: "POST",
                    credentials: "include",
                });

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

    useEffect(() => {
        if (view === "dashboard") {
            fetchTenants();
        }
    }, [view, fetchTenants]);

    const handleOtpChange = async (e) => {
        const value = e.target.value.replace(/\D/g, "").slice(0, 6);

        setOtp(value);
        setError("");

        if (value.length !== 6 || loading || sendingOtp) return;

        setLoading(true);

        try {
            const response = await fetch(`${API}/auth/verify-otp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ otp: value }),
            });

            if (!response.ok) {
                setError("Invalid or expired OTP.");
                setOtp("");
                return;
            }

            setView("dashboard");
        } catch {
            setError("Verification failed. Please try again.");
            setOtp("");
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setRegistering(true);
        setTenantError("");

        try {
            const payload = {
                tenantKey: form.tenantKey.trim(),
                schemaName: form.schemaName.trim(),
                name: form.name.trim(),
                domain: form.domain.trim() || null,
                isActive: true,
            };

            const response = await fetch(`${API}/tenants`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const message = await response.text();
                throw new Error(
                    message || `Tenant registration failed (${response.status}).`
                );
            }

            setShowRegister(false);
            setForm({
                tenantKey: "",
                schemaName: "",
                name: "",
                domain: "",
            });

            await fetchTenants();
        } catch (err) {
            setTenantError(err.message || "Could not register tenant.");
        } finally {
            setRegistering(false);
        }
    };

    const handleDelete = async (tenant) => {
        const confirmed = window.confirm(
            `Delete tenant "${tenant.name}" (${tenant.tenantKey})?\n\n` +
            "This action may affect the tenant's data and cannot necessarily be undone."
        );

        if (!confirmed) return;

        setDeletingId(tenant.id);
        setTenantError("");

        try {
            const response = await fetch(`${API}/tenants/${tenant.id}`, {
                method: "DELETE",
                credentials: "include",
            });

            if (!response.ok) {
                const message = await response.text();
                throw new Error(
                    message || `Failed to delete tenant (${response.status}).`
                );
            }

            await fetchTenants();
        } catch (err) {
            setTenantError(err.message || "Could not delete tenant.");
        } finally {
            setDeletingId(null);
        }
    };

    const updateForm = (e) => {
        const { name, value } = e.target;
        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));
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

    const activeCount = tenants.filter((tenant) => tenant.isActive).length;
    const inactiveCount = tenants.length - activeCount;

    return (
        <div className="company-dashboard">
            <aside className="company-sidebar">
                <div className="company-logo">
                    <span className="company-logo-mark">B</span>
                    <span>BeautySalon</span>
                </div>

                <div className="company-nav-label">WORKSPACE</div>

                <button
                    className="company-nav-item active"
                    type="button"
                >
                    <span>▦</span>
                    Tenant management
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
                            Workspace / Tenants
                        </span>
                        <h1>Tenant management</h1>
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
                            PLATFORM ADMINISTRATION
                        </span>
                        <h2>Your tenant workspace.</h2>
                        <p>
                            Register salon businesses and manage their
                            tenant configurations from one place.
                        </p>
                    </div>

                    <div className="company-welcome-decoration">B.</div>
                </section>

                <section className="company-stats">
                    <article className="company-stat-card">
                        <div className="company-stat-heading">
                            Total tenants <span>▦</span>
                        </div>
                        <strong>{loadingTenants ? "—" : tenants.length}</strong>
                        <p>Registered tenants</p>
                    </article>

                    <article className="company-stat-card">
                        <div className="company-stat-heading">
                            Active tenants <span>✓</span>
                        </div>
                        <strong>{loadingTenants ? "—" : activeCount}</strong>
                        <p>Currently enabled</p>
                    </article>

                    <article className="company-stat-card">
                        <div className="company-stat-heading">
                            Inactive tenants <span>◷</span>
                        </div>
                        <strong>{loadingTenants ? "—" : inactiveCount}</strong>
                        <p>Currently disabled</p>
                    </article>
                </section>

                <section className="company-list-section">
                    <div className="company-section-heading">
                        <div>
                            <h2>Registered tenants</h2>
                            <p>
                                Manage tenant identifiers, schemas and domains.
                            </p>
                        </div>

                        <div className="tenant-toolbar">
                            <button
                                type="button"
                                className="company-secondary-button"
                                onClick={fetchTenants}
                                disabled={loadingTenants}
                            >
                                {loadingTenants ? "Refreshing..." : "↻ Refresh"}
                            </button>

                            <button
                                type="button"
                                className="company-primary-button"
                                onClick={() => {
                                    setTenantError("");
                                    setShowRegister(true);
                                }}
                            >
                                + Register tenant
                            </button>
                        </div>
                    </div>

                    {tenantError && (
                        <div className="tenant-error" role="alert">
                            {tenantError}
                        </div>
                    )}

                    {showRegister && (
                        <div className="tenant-modal-backdrop">
                            <section
                                className="tenant-modal"
                                role="dialog"
                                aria-modal="true"
                                aria-labelledby="tenant-modal-title"
                            >
                                <div className="tenant-modal-heading">
                                    <div>
                                        <span className="company-eyebrow">
                                            TENANT CONFIGURATION
                                        </span>
                                        <h2 id="tenant-modal-title">
                                            Register tenant
                                        </h2>
                                    </div>

                                    <button
                                        type="button"
                                        className="tenant-close-button"
                                        aria-label="Close registration form"
                                        onClick={() => setShowRegister(false)}
                                    >
                                        ×
                                    </button>
                                </div>

                                <form onSubmit={handleRegister}>
                                    <label>
                                        Tenant name
                                        <input
                                            name="name"
                                            value={form.name}
                                            onChange={updateForm}
                                            placeholder="Eva Massage"
                                            required
                                        />
                                    </label>

                                    <label>
                                        Tenant key
                                        <input
                                            name="tenantKey"
                                            value={form.tenantKey}
                                            onChange={updateForm}
                                            placeholder="prishtina-evamassage"
                                            required
                                        />
                                    </label>

                                    <label>
                                        Schema name
                                        <input
                                            name="schemaName"
                                            value={form.schemaName}
                                            onChange={updateForm}
                                            placeholder="eva_massage"
                                            required
                                        />
                                    </label>

                                    <label>
                                        Domain (optional)
                                        <input
                                            name="domain"
                                            value={form.domain}
                                            onChange={updateForm}
                                            placeholder="evamassage"
                                        />
                                    </label>

                                    <p className="tenant-form-note">
                                        Make sure the schema is valid and
                                        provisioned according to your backend's
                                        tenant-registration logic.
                                    </p>

                                    <div className="tenant-modal-actions">
                                        <button
                                            type="button"
                                            className="company-secondary-button"
                                            onClick={() => setShowRegister(false)}
                                            disabled={registering}
                                        >
                                            Cancel
                                        </button>

                                        <button
                                            type="submit"
                                            className="company-primary-button"
                                            disabled={registering}
                                        >
                                            {registering
                                                ? "Registering..."
                                                : "Register tenant"}
                                        </button>
                                    </div>
                                </form>
                            </section>
                        </div>
                    )}

                    <div className="company-table-wrap">
                        <table className="company-table tenant-table">
                            <thead>
                                <tr>
                                    <th>TENANT</th>
                                    <th>TENANT KEY</th>
                                    <th>SCHEMA</th>
                                    <th>DOMAIN</th>
                                    <th>STATUS</th>
                                    <th>CREATED</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>

                            <tbody>
                                {loadingTenants ? (
                                    <tr>
                                        <td colSpan={7} className="tenant-empty">
                                            Loading tenants...
                                        </td>
                                    </tr>
                                ) : tenants.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="tenant-empty">
                                            No tenants found. Register your first tenant.
                                        </td>
                                    </tr>
                                ) : (
                                    tenants.map((tenant) => (
                                        <tr key={tenant.id}>
                                            <td>
                                                <div className="company-name-cell">
                                                    <span className="company-table-avatar">
                                                        {(tenant.name || "T")
                                                            .charAt(0)
                                                            .toUpperCase()}
                                                    </span>
                                                    <div>
                                                        <strong>{tenant.name}</strong>
                                                        <span>ID: {tenant.id}</span>
                                                    </div>
                                                </div>
                                            </td>

                                            <td>
                                                <code>{tenant.tenantKey}</code>
                                            </td>

                                            <td>
                                                <code>{tenant.schemaName}</code>
                                            </td>

                                            <td>
                                                {tenant.domain || "—"}
                                            </td>

                                            <td>
                                                <span
                                                    className={`company-status ${
                                                        tenant.isActive
                                                            ? "active-status"
                                                            : "pending-status"
                                                    }`}
                                                >
                                                    {tenant.isActive
                                                        ? "Active"
                                                        : "Inactive"}
                                                </span>
                                            </td>

                                            <td>
                                                {tenant.createdAt
                                                    ? new Date(
                                                          tenant.createdAt
                                                      ).toLocaleDateString()
                                                    : "—"}
                                            </td>

                                            <td>
                                                <button
                                                    type="button"
                                                    className="tenant-delete-button"
                                                    disabled={
                                                        deletingId === tenant.id
                                                    }
                                                    onClick={() =>
                                                        handleDelete(tenant)
                                                    }
                                                >
                                                    {deletingId === tenant.id
                                                        ? "Deleting..."
                                                        : "Delete"}
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    <p className="company-demo-note">
                        Tenant data is loaded from the backend.
                    </p>
                </section>
            </main>
        </div>
    );
}