import './components.css'

export default function Task(props) {
    const { task } = props;
    const date = task.dueDate;
    const year = date.slice(0, 4);
    const month = date.slice(5, 7);
    const day = date.slice(8, 10);
    return (
        <div className="task">
            <div className="container">
                <h3 className="taskTitle">{task.title}</h3>
            </div>
            <div className="container">
                <p className="due">{year}</p>
                <p className="due">{month}</p>
                <p className="due">{day}</p>
            </div>
        </div>
    )
}