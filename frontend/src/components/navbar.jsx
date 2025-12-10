import './components.css';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();


    const handleLogout = () => {
        console.log("Starting the logout");
        fetch("http://localhost:3000/user/logout", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to logout")
                }
                return res.json()
            })
            .then((data) => {
                navigate("/");
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className="navbar">
            <button className="page">
                <p className="pageTitle">view user profile</p>
            </button>
            <button className="page" onClick={() => navigate("/add-task")}>
                <p className="pageTitle">upload new task</p>
            </button>
            <button className="page">
                <p className="pageTitle">view my cookies</p>
            </button>
            <button className="page">
                <p className="pageTitle">piggy bank</p>
            </button>
            <button className="page" onClick={handleLogout}>
                <p className="pageTitle">logout</p>
            </button>
        </div>
    )
}