import "./pages.css";
import React from 'react';
import { useNavigate } from 'react-router-dom';


export default function Register({ onDataRequested }) {
    const [email, setEmail] = React.useState("");
    const [user, setUser] = React.useState("");
    const [fname, setFname] = React.useState("");
    const [lname, setLname] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [date, setDate] = React.useState("");
    const [error, setError] = React.useState("");
    const navigate = useNavigate();

    const handleRegistration = () => {
        setError(false);
        if (email == '' || password == '' || lname == '' || fname == '' || user == '') {
            setError(true)
            return;
        }

        const newUser = {
            user_name: user,
            first_name: fname,
            last_name: lname,
            email: email,
            password: password,
            birthday_date: date,
        }

        fetch("http://localhost:3000/user", {
            method: 'POST',
            credentials: "include",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser)
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to register")
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
                setDate("");
                setLname("");
                setFname("");
                setUser("");
                setError(true);
            })
    }

    return (
        <div className="login-container">
            <div className="login-main">
                <h1>Registration</h1>
                <h2>User name: </h2>
                <input value={user} onChange={(event) => setUser(event.target.value)} />
                <h2>First name: </h2>
                <input value={fname} onChange={(event) => setFname(event.target.value)} />
                <h2>Last name: </h2>
                <input value={lname} onChange={(event) => setLname(event.target.value)} />
                <h2>Email: </h2>
                <input value={email} onChange={(event) => setEmail(event.target.value)} />
                <h2>Password: </h2>
                <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                <h2>Birthday:</h2>
                <input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
                <button onClick={handleRegistration} className="login-buttons">Register</button>

                {error && <p style={{ color: 'red', fontWeight: 'bold' }}>Enter all fields!</p>}
            </div>
        </div>
    )
}