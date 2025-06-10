import React from "react";
import { useState , useEffect } from "react";
import "./ToDoList.css";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { CiSaveDown1 } from "react-icons/ci";

const ToDoList = () => {
    const [tasks, setTasks] = useState(() => {
        return JSON.parse(localStorage.getItem("tasks")) || []; // Load tasks from localStorage or initialize with an empty array
    });
    const [inputValue, setInputValue] = useState("");
    const [editIndex, setEditIndex] = useState(null); // Track which task is being edited
    const [editValue, setEditValue] = useState(""); // Track the value of the edit input

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]); // Save tasks to localStorage whenever tasks change

    const handleInput = (e) => {
        setInputValue(e.target.value); // Update input value as user types
    }

    const toggleTaskCompletion = (index) => {
        setTasks((prevTasks) => {
            const updatedTasks = prevTasks.map((task, i) =>
                i === index ? { ...task, completed: !task.completed } : task
            );
            return updatedTasks;
        });
    };

    const handleAddTask = () => {
        if (inputValue.trim() === "") return;
        setTasks([...tasks, { text: inputValue, completed: false }]); // Add new task to the List 
        setInputValue(""); // Clear input field
    }

    // Delete button handler
    const handleDelete = (index) => {
        setTasks(tasks.filter((_, i) => i !== index)); //Remove tasks by index
    }

    // Edit button handler
    const handleEdit = (index) => {
        setEditIndex(index);
        setEditValue(tasks[index].text);
    };

    const handleSave = (index) => {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, text: editValue } : task
        );
        setTasks(updatedTasks);
        setEditIndex(null);
        setEditValue("");
    };

    return (
        <div className="container">
            <h2>Donezo - Get it done, stress none.</h2>
            <label htmlFor="myInput">Add your tasks</label>
            <div className="input-btn">
                <input type="text" placeholder="Enter task..." value={inputValue} onChange={handleInput} label="Your Name" className="enter-task-input" />
                <button onClick={handleAddTask}>Add Task</button>
            </div>
            {tasks.map((task, index) => (
                <div key={index} className="task" style={{ 
                    textDecoration: task.completed ? "line-through" : "none",
                    backgroundColor: editIndex === index ? '#e0f7fa' : 'white', // Visual feedback for edit mode
                    border: editIndex === index ? '2px solid #00bcd4' : '1px solid #ccc'
                }}>
                    <input type="checkbox" checked={task.completed} onChange={() => toggleTaskCompletion(index)} className="checkbox" />
                    {editIndex === index ? (
                        <input
                            type="text"
                            value={editValue}
                            onChange={e => setEditValue(e.target.value)}
                            autoFocus
                            onKeyDown={e => {
                                if (e.key === "Enter") handleSave(index);
                                if (e.key === "Escape") {
                                    setEditIndex(null);
                                    setEditValue("");
                                }
                            }}
                            className="edit-input"
                        />
                    ) : (
                        task.text
                    )}
                    <div className="buttons">
                        {editIndex === index ? (
                            <button className="Save" onClick={() => handleSave(index)}><CiSaveDown1 /></button>
                        ) : (
                            <button className="Edit" onClick={() => handleEdit(index)}><FaRegEdit /></button>
                        )}
                        <button className="delete" onClick={() => handleDelete(index)}><MdDeleteOutline /></button>
                    </div>
                </div>
            ))}

        </div>
    )
}

export default ToDoList;
