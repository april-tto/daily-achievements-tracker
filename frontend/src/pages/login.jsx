import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './pages.css';

export default function Login({ onDataRequested }) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [enableError, setEnableError] = React.useState(false);
    const navigate = useNavigate();

    const handleSubmission = () => {
        setEnableError(false);
        if (email == '' || password == '') {
            setEnableError(true)
            return;
        }

        fetch(`${import.meta.env.VITE_API_URL}/user/login`, {
            method: 'POST',
            credentials: "include",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: password })
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to verify")
                }
                return res.json()
            })
            .then((data) => {
                console.log(data)
                onDataRequested(email)
                navigate("/verify")
            })
            .catch((err) => {
                console.log(err)
                setEmail("");
                setPassword("");
                setEnableError(true);
            })
    }

    return (
        <div className="login-container">
            <div className="login-main">
                <h1>Login page</h1>
                <h2>Email: </h2>
                <input value={email} onChange={(event) => setEmail(event.target.value)} />
                <h2>Password: </h2>
                <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                <button onClick={handleSubmission} className="login-buttons">Login</button>
                <Link to="/register" style={{color: "black", textDecoration: "none", paddingTop: "20px", fontSize: "15px"}}>New user? Click here to register</Link>
                {enableError && <p style={{ color: 'red', fontWeight: 'bold' }}>Email or Password was not entered!</p>}
            </div>
        </div>
    )
}