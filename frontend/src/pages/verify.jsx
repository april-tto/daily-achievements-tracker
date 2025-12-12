import React from 'react'
import { useNavigate } from 'react-router-dom';
import "./pages.css";

export default function Verification({ email }) {
    const [otp, setOtp] = React.useState("");
    const navigate = useNavigate();
    const [error, setError] = React.useState(false);

    const handleOTPverification = () => {
        setError(false);

        fetch(`${import.meta.env.VITE_API_URL}/user/verify-login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ email: email, otp: otp })
        })
            .then((res) => {
                if (!res.ok) {
                    setError(true);
                    throw new Error("Failed to verify")
                }
                return res.json()
            })
            .then((data) => {
                navigate("/homepage");
            })
            .catch((err) => {
                setError(true)
                console.log(err)
            })
    }

    return (
        <div className="login-container">
            <div className="login-main">
                <h2>Email with verification code is sent to {email}!</h2>
                <h1>Enter OTP:</h1>
                <input value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Your one-time-password..." />
                <button onClick={handleOTPverification} className="login-buttons">Submit</button>
                {error && <h2 style={{ color: "red", fontWeight: "bold" }}>OTP does not match</h2>}
            </div>
        </div>
    )

}