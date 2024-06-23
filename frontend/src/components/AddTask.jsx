import React from "react"
import {useState} from 'react'
import {io} from 'socket.io-client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons'

const socket = io('http://127.0.0.1:5000');

export default function AddTask(){

    const [task_title, setTaskTitle] = useState("")

    const addTask = (e) => {
        e.preventDefault()
        socket.emit('add_task', task_title)
        setTaskTitle("")
    }
    
    return (
        <div >
            <form className="add-task" onSubmit={addTask}>
                <input 
                    type="text" 
                    placeholder="Enter Task" 
                    value={task_title}
                    onChange={(e) => setTaskTitle(e.target.value)}    
                />
                <button type="submit"><FontAwesomeIcon icon={faPlus} /></button>
            </form>
        </div>
    )
}
