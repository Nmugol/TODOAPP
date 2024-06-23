import { useState, useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrash, faPenToSquare, faCheck, faFloppyDisk, faXmark} from '@fortawesome/free-solid-svg-icons'
import {io} from 'socket.io-client'

const socket = io('http://127.0.0.1:5000');

export default function Task({task}){
    
    const [task_class, setTaskClass] = useState("teks-uncompleted task-title")
    const [edit, setEdit] = useState(false)
    const [title, setTitle] = useState(task.title)

    useEffect(() => {
        if(task.complete){
            setTaskClass("task-completed task-title")
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
        <div className="task">
            <div className={task_class}>{task.title}</div>
            <button className="delete" onClick={deleteTask}><FontAwesomeIcon icon={faTrash} /></button>
            <button className="edit" onClick={() => setEdit(!edit)}><FontAwesomeIcon icon={faPenToSquare} /></button>
            <button className="complete" onClick={completeTask}><FontAwesomeIcon icon={faCheck} /></button>
            
            <input className={edit ? "open new_task_title" : "hidden new_task_title" } type="text" value={title} onChange={(e) => setTitle(e.target.value)}></input>
            <div className={edit ? "open separator" : "hidden separator"}></div>
            <button className={edit ? "open save_button" : "hidden save_button" } onClick={editTask}><FontAwesomeIcon icon={faFloppyDisk} /></button>
            <button className={edit ? "open cancel_button" : "hidden cancel_button" }onClick={() => setEdit(!edit)}><FontAwesomeIcon icon={faXmark} /></button>
        </div>
    )
}