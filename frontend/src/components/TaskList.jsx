import React from "react";
import Task from "./task";

const TaskList = ({tasks}) => {

    return (
        <div className="task-list">
            {tasks.map((task) => (
                <Task task={task}></Task>
            ))}
        </div>
    )
}

export default TaskList