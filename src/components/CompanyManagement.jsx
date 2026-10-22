import { useState, useEffect, useCallback, useRef } from "react";
import "./CompanyManagement.css";
   import { LockKeyhole, ShieldCheck } from "lucide-react";

   const API = import.meta.env.VITE_BEAUTYSALON_API_URL;

const TOKEN_KEY = "accessToken";

const EMPTY_FORM = {
    tenantKey: "",
    schemaName: "",
    name: "",
    domain: "",
};

function OtpInput({ value, onChange, disabled }) {
    const inputRefs = useRef([]);

    const digits = Array.from(
        { length: 6 },
        (_, index) => value[index] || ""
    );

    const handleChange = (index, rawValue) => {
        const digit = rawValue.replace(/\D/g, "").slice(-1);

        const next = digits.slice();
        next[index] = digit;

        onChange(next.join(""));

        if (digit && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index, event) => {
        if (
            event.key === "Backspace" &&
            !digits[index] &&
            index > 0
        ) {
            inputRefs.current[index - 1]?.focus();
        }

        if (event.key === "ArrowLeft" && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }

        if (event.key === "ArrowRight" && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handlePaste = (event) => {
        event.preventDefault();

        const pasted = event.clipboardData
            .getData("text")
            .replace(/\D/g, "")
            .slice(0, 6);

        if (pasted) {
            onChange(pasted);

            const nextIndex = Math.min(pasted.length, 5);
            inputRefs.current[nextIndex]?.focus();
        }
    };

    return (
        <div className="cm-otp-digits" aria-label="Six-digit verification code">
            {digits.map((digit, index) => (
                <input
                    key={index}
                    ref={(element) => {
                        inputRefs.current[index] = element;
                    }}
                    className={`cm-otp-digit ${
                        digit ? "has-value" : ""
                    }`}
                    type="text"
                    inputMode="numeric"
                    autoComplete={index === 0 ? "one-time-code" : "off"}
                    aria-label={`Digit ${index + 1}`}
                    maxLength={1}
                    value={digit}
                    disabled={disabled}
                    onChange={(event) =>
                        handleChange(index, event.target.value)
                    }
                    onKeyDown={(event) =>
                        handleKeyDown(index, event)
                    }
                    onPaste={handlePaste}
                    onFocus={(event) => event.target.select()}
                />
            ))}
        </div>
    );
}

const getAuthHeaders = () => {
    const token = sessionStorage.getItem(TOKEN_KEY);
    return token ? { Authorization: `Bearer ${token}` } : {};
};

/** Reads an error message from a failed response (JSON or plain text). */
const readError = async (response, fallback) => {
    try {
        const text = await response.text();
        if (!text) return fallback;
        try {
            const json = JSON.parse(text);
            return json.message || json.title || fallback;
        } catch {
            return text;
        }
    } catch {
        return fallback;
    }
};

export default function LoginVerification() {
    const [view, setView] = useState("otp");

    /* ---------- OTP ---------- */
    const [otp, setOtp] = useState("");
    const [otpError, setOtpError] = useState("");
    const [verifying, setVerifying] = useState(false);
    const [sendingOtp, setSendingOtp] = useState(true);
    const [sendFailed, setSendFailed] = useState(false);

    /* ---------- Tenants ---------- */
    const [tenants, setTenants] = useState([]);
    const [loadingTenants, setLoadingTenants] = useState(false);
    const [tenantError, setTenantError] = useState("");
    const [showRegister, setShowRegister] = useState(false);
    const [registering, setRegistering] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    const [form, setForm] = useState(EMPTY_FORM);

    const firstFieldRef = useRef(null);

    /* ---------- Session ---------- */
    const signOut = useCallback(() => {
        sessionStorage.removeItem(TOKEN_KEY);
        setTenants([]);
        setOtp("");
        setOtpError("");
        setSendFailed(false);
        setSendingOtp(true);
        setView("otp");
    }, []);

    /* ---------- OTP request ---------- */
    const sendLoginRequest = useCallback(async () => {
        setSendingOtp(true);
        setSendFailed(false);
        setOtpError("");

        try {
            const response = await fetch(`${API}/auth/login`, {
                method: "POST",
                credentials: "include"
            });

            if (!response.ok) throw new Error("Failed to send OTP.");
        } catch {
            setSendFailed(true);
        } finally {
            setSendingOtp(false);
        }
    }, []);

    useEffect(() => {
        if (sessionStorage.getItem(TOKEN_KEY)) {
            setView("dashboard");
            setSendingOtp(false);
            return;
        }

        sendLoginRequest();
    }, [sendLoginRequest]);

    /* ---------- Tenants ---------- */
    const fetchTenants = useCallback(async () => {
        setLoadingTenants(true);
        setTenantError("");

        try {
            const response = await fetch(`${API}/tenants`, {
                method: "GET",
                headers: getAuthHeaders(),
                credentials: "include",
            });

            if (response.status === 401) {
                signOut();
                return;
            }

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
    }, [signOut]);

    useEffect(() => {
        if (view === "dashboard") fetchTenants();
    }, [view, fetchTenants]);

    /* Close the modal with Escape and focus the first field when it opens */
    useEffect(() => {
        if (!showRegister) return;

        firstFieldRef.current?.focus();

        const onKeyDown = (e) => {
            if (e.key === "Escape" && !registering) setShowRegister(false);
        };

        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [showRegister, registering]);

    /* ---------- Handlers ---------- */
   const handleOtpChange = async (rawValue) => {
    const value = String(rawValue).replace(/\D/g, "").slice(0, 6);

    setOtp(value);
    setOtpError("");

    if (value.length !== 6 || verifying || sendingOtp) return;

    setVerifying(true);

        try {
            const response = await fetch(`${API}/auth/verify-otp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ otp: value }),
            });

            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                setOtpError(data.message || "Invalid or expired code.");
                setOtp("");
                return;
            }

            if (!data.accessToken) {
                throw new Error("The server did not return an access token.");
            }

            sessionStorage.setItem(TOKEN_KEY, data.accessToken);
            setView("dashboard");
        } catch {
            setOtpError("Verification failed. Please try again.");
            setOtp("");
        } finally {
            setVerifying(false);
        }
    };

    const openRegister = () => {
        setTenantError("");
        setShowRegister(true);
    };

    const closeRegister = () => {
        if (!registering) setShowRegister(false);
    };

    const updateForm = (e) => {
        const { name, value } = e.target;
        setForm((previous) => ({ ...previous, [name]: value }));
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

            const response = await fetch(`${API}/tenants/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...getAuthHeaders(),
                },
                credentials: "include",
                body: JSON.stringify(payload),
            });

            if (response.status === 401) {
                signOut();
                return;
            }

            if (!response.ok) {
                throw new Error(
                    await readError(
                        response,
                        `Tenant registration failed (${response.status}).`
                    )
                );
            }

            setShowRegister(false);
            setForm(EMPTY_FORM);
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
                "This may affect the tenant's data and cannot necessarily be undone."
        );

        if (!confirmed) return;

        setDeletingId(tenant.id);
        setTenantError("");

        try {
            const response = await fetch(`${API}/tenants/${tenant.id}`, {
                method: "DELETE",
                headers: getAuthHeaders(),
                credentials: "include",
            });

            if (response.status === 401) {
                signOut();
                return;
            }

            if (!response.ok) {
                throw new Error(
                    await readError(
                        response,
                        `Failed to delete tenant (${response.status}).`
                    )
                );
            }

            await fetchTenants();
        } catch (err) {
            setTenantError(err.message || "Could not delete tenant.");
        } finally {
            setDeletingId(null);
        }
    };

    /* =====================================================
       OTP VIEW
    ===================================================== */
 if (view === "otp") {
    return (
        <div className="cm cm-verify">
            <div className="cm-brand cm-brand-dark cm-otp-page-brand">
                <span className="cm-brand-mark">B</span>
                <span>BeautySalon</span>
            </div>

            <div className="cm-otp-overlay">
                <section
                    className="cm-otp-dialog animate-slide-up"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="otp-title"
                >
                    <div className="cm-modal-drag-handle" />

                    <div className="cm-otp-header">
                      
                      <div className="cm-otp-icon" aria-hidden="true">
    <LockKeyhole size={26} />
</div>
                        <span className="cm-otp-eyebrow">
                            SECURE ACCESS
                        </span>

                        <h2 id="otp-title">VERIFICATION</h2>

                        <p>
                            A security code has been sent to your email
                            address. Enter the six-digit code to continue.
                        </p>
                    </div>

                    {sendingOtp ? (
                        <div className="cm-otp-status" role="status">
                            <span className="cm-otp-spinner" />
                            Sending your verification code…
                        </div>
                    ) : sendFailed ? (
                        <div className="cm-otp-error-area">
                            <p className="cm-otp-error" role="alert">
                                We couldn't send your verification code.
                                Please try again.
                            </p>

                            <button
                                type="button"
                                className="cm-button cm-button-dark cm-button-block"
                                onClick={sendLoginRequest}
                            >
                                Try again
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="cm-otp-input-area">
                                <OtpInput
                                    value={otp}
                                    onChange={handleOtpChange}
                                    disabled={verifying}
                                />
                            </div>

                            {verifying && (
                                <p className="cm-otp-status" role="status">
                                    <span className="cm-otp-spinner" />
                                    Verifying your code…
                                </p>
                            )}

                            {otpError && (
                                <p className="cm-otp-error" role="alert">
                                    {otpError}
                                </p>
                            )}

                            <button
                                type="button"
                                className="cm-otp-resend"
                                onClick={sendLoginRequest}
                                disabled={verifying || sendingOtp}
                            >
                                Didn't receive a code?{" "}
                                <span>Send again</span>
                            </button>
                        </>
                    )}

                    <div className="cm-otp-divider" />

                    <div className="cm-otp-footer">
<span className="cm-otp-secure-icon">
    <ShieldCheck size={16} />
</span>
                        Secure administrator access
                    </div>

                    <button
                        type="button"
                        className="cm-otp-cancel"
                        onClick={() => {
                            setOtp("");
                            setOtpError("");
                        }}
                        disabled={verifying || sendingOtp}
                    >
                        CLEAR CODE
                    </button>
                </section>
            </div>
        </div>
    );
}

    /* =====================================================
       DASHBOARD VIEW
    ===================================================== */
    const activeCount = tenants.filter((t) => t.isActive).length;
    const inactiveCount = tenants.length - activeCount;

    const stats = [
        { label: "Total tenants", value: tenants.length, hint: "Registered" },
        { label: "Active", value: activeCount, hint: "Currently enabled" },
        { label: "Inactive", value: inactiveCount, hint: "Currently disabled" },
    ];

    return (
        <div className="cm cm-dashboard">
            <aside className="cm-sidebar">
                <div className="cm-brand">
                    <span className="cm-brand-mark">B</span>
                    <span>BeautySalon</span>
                </div>

                <nav className="cm-nav" aria-label="Workspace">
                    <span className="cm-nav-label">Workspace</span>
                    <button
                        type="button"
                        className="cm-nav-item active"
                        aria-current="page"
                    >
                        Tenant management
                    </button>
                </nav>

                <div className="cm-sidebar-bottom">
                    <div className="cm-avatar">A</div>
                    <div className="cm-sidebar-user">
                        <strong>Administrator</strong>
                        <span>Platform owner</span>
                    </div>
                    <button
                        type="button"
                        className="cm-signout"
                        onClick={signOut}
                    >
                        Sign out
                    </button>
                </div>
            </aside>

            <main className="cm-main">
                <header className="cm-page-head">
                    <div>
                        <span className="cm-breadcrumb">
                            Workspace / Tenants
                        </span>
                        <h1>Tenant management</h1>
                        <p>
                            Register salon businesses and manage their tenant
                            configuration in one place.
                        </p>
                    </div>

                    <span className="cm-status-pill">
                        <span className="cm-dot" /> System online
                    </span>
                </header>

                <section className="cm-stats" aria-label="Tenant summary">
                    {stats.map((stat) => (
                        <article className="cm-stat" key={stat.label}>
                            <span className="cm-stat-label">{stat.label}</span>
                            <strong>
                                {loadingTenants && tenants.length === 0
                                    ? "—"
                                    : stat.value}
                            </strong>
                            <span className="cm-stat-hint">{stat.hint}</span>
                        </article>
                    ))}
                </section>

                <section className="cm-panel">
                    <div className="cm-panel-head">
                        <div>
                            <h2>Registered tenants</h2>
                            <p>Manage tenant keys, schemas and domains.</p>
                        </div>

                        <div className="cm-toolbar">
                            <button
                                type="button"
                                className="cm-button cm-button-light"
                                onClick={fetchTenants}
                                disabled={loadingTenants}
                            >
                                {loadingTenants ? "Refreshing…" : "Refresh"}
                            </button>

                            <button
                                type="button"
                                className="cm-button cm-button-dark"
                                onClick={openRegister}
                            >
                                Register tenant
                            </button>
                        </div>
                    </div>

                    {tenantError && !showRegister && (
                        <div className="cm-alert" role="alert">
                            {tenantError}
                        </div>
                    )}

                    <div className="cm-table-wrap">
                        <table className="cm-table">
                            <thead>
                                <tr>
                                    <th>Tenant</th>
                                    <th>Tenant key</th>
                                    <th>Schema</th>
                                    <th>Domain</th>
                                    <th>Status</th>
                                    <th>Created</th>
                                    <th>
                                        <span className="cm-sr-only">
                                            Actions
                                        </span>
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {loadingTenants && tenants.length === 0 ? (
                                    <tr className="cm-empty-row">
                                        <td colSpan={7}>Loading tenants…</td>
                                    </tr>
                                ) : tenants.length === 0 ? (
                                    <tr className="cm-empty-row">
                                        <td colSpan={7}>
                                            No tenants yet. Register your first
                                            tenant to get started.
                                        </td>
                                    </tr>
                                ) : (
                                    tenants.map((tenant) => (
                                        <tr key={tenant.id}>
                                            <td data-label="Tenant">
                                                <div className="cm-name-cell">
                                                    <span className="cm-row-avatar">
                                                        {(tenant.name || "T")
                                                            .charAt(0)
                                                            .toUpperCase()}
                                                    </span>
                                                    <div>
                                                        <strong>
                                                            {tenant.name}
                                                        </strong>
                                                        <span>
                                                            ID: {tenant.id}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>

                                            <td data-label="Tenant key">
                                                <code>{tenant.tenantKey}</code>
                                            </td>

                                            <td data-label="Schema">
                                                <code>{tenant.schemaName}</code>
                                            </td>

                                            <td data-label="Domain">
                                                {tenant.domain || "—"}
                                            </td>

                                            <td data-label="Status">
                                                <span
                                                    className={`cm-badge ${
                                                        tenant.isActive
                                                            ? "cm-badge-active"
                                                            : "cm-badge-inactive"
                                                    }`}
                                                >
                                                    {tenant.isActive
                                                        ? "Active"
                                                        : "Inactive"}
                                                </span>
                                            </td>

                                            <td data-label="Created">
                                                {tenant.createdAt
                                                    ? new Date(
                                                          tenant.createdAt
                                                      ).toLocaleDateString()
                                                    : "—"}
                                            </td>

                                            <td
                                                data-label="Actions"
                                                className="cm-actions-cell"
                                            >
                                                <button
                                                    type="button"
                                                    className="cm-button cm-button-danger cm-button-small"
                                                    disabled={
                                                        deletingId === tenant.id
                                                    }
                                                    onClick={() =>
                                                        handleDelete(tenant)
                                                    }
                                                >
                                                    {deletingId === tenant.id
                                                        ? "Deleting…"
                                                        : "Delete"}
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>

            {showRegister && (
                <div
                    className="cm-modal-backdrop"
                    onMouseDown={(e) => {
                        if (e.target === e.currentTarget) closeRegister();
                    }}
                >
                    <section
                        className="cm-modal"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="tenant-modal-title"
                    >
                        <div className="cm-modal-head">
                            <div>
                                <span className="cm-breadcrumb">
                                    Tenant configuration
                                </span>
                                <h2 id="tenant-modal-title">Register tenant</h2>
                            </div>

                            <button
                                type="button"
                                className="cm-close"
                                aria-label="Close registration form"
                                onClick={closeRegister}
                            >
                                ×
                            </button>
                        </div>

                        <form onSubmit={handleRegister}>
                            <label className="cm-field">
                                <span>Tenant name</span>
                                <input
                                    ref={firstFieldRef}
                                    name="name"
                                    value={form.name}
                                    onChange={updateForm}
                                    placeholder="Eva Massage"
                                    autoComplete="off"
                                    required
                                />
                            </label>

                            <label className="cm-field">
                                <span>Tenant key</span>
                                <input
                                    name="tenantKey"
                                    value={form.tenantKey}
                                    onChange={updateForm}
                                    placeholder="prishtina-evamassage"
                                    autoCapitalize="none"
                                    autoComplete="off"
                                    required
                                />
                            </label>

                            <label className="cm-field">
                                <span>Schema name</span>
                                <input
                                    name="schemaName"
                                    value={form.schemaName}
                                    onChange={updateForm}
                                    placeholder="eva_massage"
                                    autoCapitalize="none"
                                    autoComplete="off"
                                    required
                                />
                            </label>

                            <label className="cm-field">
                                <span>
                                    Domain <em>(optional)</em>
                                </span>
                                <input
                                    name="domain"
                                    value={form.domain}
                                    onChange={updateForm}
                                    placeholder="evamassage"
                                    autoCapitalize="none"
                                    autoComplete="off"
                                />
                            </label>

                            <p className="cm-form-note">
                                Make sure the schema name is valid and can be
                                provisioned by your backend.
                            </p>

                            {tenantError && (
                                <div className="cm-alert" role="alert">
                                    {tenantError}
                                </div>
                            )}

                            <div className="cm-modal-actions">
                                <button
                                    type="button"
                                    className="cm-button cm-button-light"
                                    onClick={closeRegister}
                                    disabled={registering}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="cm-button cm-button-dark"
                                    disabled={registering}
                                >
                                    {registering
                                        ? "Registering…"
                                        : "Register tenant"}
                                </button>
                            </div>
                        </form>
                    </section>
                </div>
            )}
        </div>
    );
}