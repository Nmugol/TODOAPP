import { useState, useEffect } from "react"
import {io} from 'socket.io-client'

const socket = io('http://127.0.0.1:5000');

export default function Task({task}){
    
    const [task_class, setTaskClass] = useState("teks")
    const [edit, setEdit] = useState(false)
    const [title, setTitle] = useState(task.title)

    useEffect(() => {
        if(task.complete){
            setTaskClass("task-completed")
        }
    }, [task.complete])

    function completeTask(){
        socket.emit('complete_task', task.id)
    }

    function deleteTask(){
        socket.emit('delete_task', task.id)
    }

    function editTask(){

        const data = {
            title: title,
            id: task.id
        }
        socket.emit('edit_task', data)
    }

    return (
        <div >
            <div className={task_class}>{task.title}</div>
            <button onClick={deleteTask}>Delete</button>
            <button onClick={() => setEdit(!edit)}>Edit</button>
            <button onClick={completeTask}>Complete</button>
            <div className={edit ? "edit open" : "hidden edit"}>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}></input>
                <button onClick={editTask}>Save</button>
                <button onClick={() => setEdit(!edit)}>Cancel</button>
            </div>
        </div>
    )
}