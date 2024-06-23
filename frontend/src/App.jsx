import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";
import { io } from "socket.io-client";

const socket = io("http://127.0.0.1:5000");

export default function App() {
    const [task, setTask] = useState([]);

    useEffect(() => {
        socket.on("connected", (data) => {
            setTask(data.tasks);
        });

        socket.on("added_task", (data) => {
            setTask(data);
        });

        socket.on("completed_task", (data) => {
            setTask(data);
        });

        socket.on("deleted_task", (data) => {
            setTask(data);
        });

        socket.on("edited_task", (data) => {
            setTask(data);
        });
    }, [task]);

    return (
        <div className="App">
            <AddTask></AddTask>
            <TaskList tasks={task}></TaskList>
        </div>
    );
}
