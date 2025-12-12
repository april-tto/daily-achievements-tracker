import React from 'react';
import { useNavigate } from 'react-router-dom';
import './pages.css';

export default function AddTask() {
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [date, setDate] = React.useState('');
    const [error, setError] = React.useState('');
    const navigate = useNavigate();

    const handleEvent = () => {
        setError(false);
        if (title == '' || description == '' || date == '') {
            setError(true)
            return;
        }

        fetch(`${import.meta.env.VITE_API_URL}/upload-tasks`, {
            method: 'POST',
            credentials: "include",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: title, description: description, dueDate: date })
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to add task")
                }
                return res.json()
            })
            .then((data) => {
                console.log(data)
                navigate("/homepage")
            })
            .catch((err) => {
                console.log(err)
                setTitle("");
                setDescription("");
                setDate("");
                setError(true);
            })
    }


    return (
        <div className="login-container">
            <div className="login-main">
                <h1>Add new task</h1>
                <h2>Title: </h2>
                <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="please enter task title" />
                <h2>Description: </h2>
                <textarea value={description} onChange={(event) => setDescription(event.target.value)} rows="10" cols="40" placeholder="Type your description here..." />
                <h2>Due Date: </h2>
                <input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
                <button onClick={handleEvent} className="login-buttons">Add</button>
                {error && <p style={{ color: 'red', fontWeight: 'bold' }}>please enter all fields</p>}
            </div>
        </div>
    )
}
