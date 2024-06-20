import React from "react"
import {useState, useEffect} from 'react'
import {io} from 'socket.io-client'

const socket = io('http://127.0.0.1:5000');

export default function AddTask(){

    const [task_title, setTaskTitle] = useState("")

    const addTask = (e) => {
        e.preventDefault()
        socket.emit('add_task', task_title)
    }
    
    return (
        <div>
            <form onSubmit={addTask}>
                <input 
                    type="text" 
                    placeholder="Enter Task" 
                    value={task_title}
                    onChange={(e) => setTaskTitle(e.target.value)}    
                />
                <button>Add Task</button>
            </form>
        </div>
    )
}