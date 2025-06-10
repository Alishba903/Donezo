import React, { useEffect } from "react";
import {useState} from "react";
import "./ToDoList.css";

const ToDoList = () => {
    const [tasks, setTasks] = useState(()=>{
        return JSON.parse(localStorage.getItem("tasks")) || []; // Load tasks from localStorage or initialize with an empty array
    });
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    },[tasks]); // Save tasks to localStorage whenever tasks change
    
    const handleInput = (e) =>{
        setInputValue(e.target.value)
    }

    const handleAddTask = () =>{
        if(inputValue.trim() === "") return;
        setTasks([...tasks, inputValue]); // Add new task to the List 
        setInputValue(""); // Clear input field
    }

    const handleDelete = (index) =>{
      setTasks(tasks.filter((_,i)=> i!==index)); //Remove tasks by index
    }
    return (
        <div className="container">
        <h2>Donezo - Get it done, stress none.</h2>
        <label for="input">Add your tasks</label>
        <div className="input-btn">
        <input type="text" placeholder="Enter task..." value={inputValue} onChange={handleInput} label="Your Name"/>
        <button onClick={handleAddTask}>Add Task</button> 
        </div>
        {tasks.map((task, index) => (
            <div key={index} className="task" >
                {task}
                 <div className="buttons">
            <button className="Edit">Edit</button>
            <button className="delete" onClick={()=>handleDelete(index)}>Delete</button>
        </div>
            </div>
        ))}
       
        </div>
    )
}

export default ToDoList;
