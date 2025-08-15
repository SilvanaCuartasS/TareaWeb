import { useState } from "react";
import './Form.css';


const Form = () => {
    const [taskInput, setTaskInput] = useState('');
    const [priority, setPriority] = useState('low'); //Predeterminado
    const [tasks, setTasks] = useState([]);
    const [filterPriority, setFilterPriority] = useState('all');

    const sendForm = (e) => {
        e.preventDefault();
        setTasks([...tasks, { title: taskInput, priority }]);
        setTaskInput('');
        setPriority('low');
    };

    const handleDelete = (id) => {
        setTasks(tasks.filter((_, index) => id !== index));
    };

    const filteredTasks = filterPriority === 'all'
        ? tasks
        : tasks.filter(task => task.priority === filterPriority);

    return (
        <>
            <form onSubmit={sendForm}>
                <input
                    onChange={(e) => setTaskInput(e.target.value)}
                    placeholder="Ingresa una tarea"
                    value={taskInput}
                />
                <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option value="low">Baja</option>
                    <option value="medium">Media</option>
                    <option value="high">Alta</option>
                </select>
                <button type="submit">Agregar</button>
            </form>

            <div>
                <label>Filtrar por prioridad: </label>
                <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
                    <option value="all">Todas</option>
                    <option value="low">Baja</option>
                    <option value="medium">Media</option>
                    <option value="high">Alta</option>
                </select>
            </div>

            {filteredTasks.length > 0 && filteredTasks.map((task, index) => (
            <div key={index} className="task-item">
            <span className={`priority ${task.priority}`}>{task.priority}</span>
            <span>{task.title}</span>
            <button className="delete-btn" onClick={() => handleDelete(index)}>Delete</button>
            </div>
))}

        </>
    );
};

export default Form;
