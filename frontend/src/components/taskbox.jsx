import { useState, useEffect } from 'react';
import './components.css'
import Task from './tasks'

export default function Taskbox() {
    const [allTasks, setAllTasks] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/tasks', {
            method: 'POST',
            credentials: "include"})
            .then((res) => {
                if (!res.ok) {
                    throw new Error("failed to load tasks")
                }
                return res.json()
            })
            .then((data) => {
                setAllTasks(data)
            })
            .catch((err) => console.log(err))
    }, [])


    return (
        <div className="dashboard">
            <h1 className="date">7 December, 2024</h1>
            <h1 className="header">Dashboard</h1>
            <div className="taskContainer">
                {
                    allTasks.map((task, id) => (
                        <Task key={id} task={task} />
                    ))
                }
            </div>
        </div>
    )
}