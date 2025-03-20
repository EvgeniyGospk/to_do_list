import React, { useEffect, useState } from "react";
import { Task } from "../types/task";


const TaskList: React.FC = () => {
    const [tasks, setTasks] = useState<Task>([]);
    const [title, setTitle] = useState<Task>("");
    const [description, setDescription] = useState("")

    useEffect(() => {
        const loadTasks = async () => {
            const data = await fetchTasks();
            setTasks(data)
        }
    })

    return (
        <></>
    )
}