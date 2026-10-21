import { useState, useEffect } from "react";
import "./CompanyManagement.css";

export default function LoginVerification() {
    const [view, setView] = useState("otp");
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [sendingOtp, setSendingOtp] = useState(true);

    // Send the login request when the page opens.
    useEffect(() => {
        const sendLoginRequest = async () => {
            try {
                const response = await fetch("https://beautysalon-amin-2026-ghfzbxbqcvdfb2hf.austriaeast-01.azurewebsites.net/auth/login", {
                    method: "POST",
                });

                if (!response.ok) {
                    throw new Error("Failed to send OTP.");
                }

                setError("");
            } catch (err) {
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

        // Wait until all 6 digits are entered and OTP sending is complete.
        if (
            value.length !== 6 ||
            loading ||
            sendingOtp
        ) {
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("https://beautysalon-amin-2026-ghfzbxbqcvdfb2hf.austriaeast-01.azurewebsites.net/auth/verify-otp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ otp: value }),
            });

            if (!response.ok) {
                setError("Invalid or expired OTP.");
                setOtp("");
                return;
            }

            setView("verified");
        } catch (err) {
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
                    <h2>Verify your account</h2>

                    {sendingOtp ? (
                        <p className="otp-status">
                            Sending verification code to your email...
                        </p>
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
                        disabled={sendingOtp || loading || !!error && error.startsWith("Failed to send")}
                    />

                    {loading && (
                        <p className="otp-status">Verifying...</p>
                    )}

                    {error && (
                        <p className="otp-error">{error}</p>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="verification-page">
            <div className="verification-card">
                <h2>Verification successful</h2>
                <p>Your account has been verified.</p>

                <div className="next-view">
                    Your next view goes here.
                </div>
            </div>
        </div>
    );
}