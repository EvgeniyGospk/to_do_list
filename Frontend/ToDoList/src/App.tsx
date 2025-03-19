import React from "react"
import { useEffect, useState } from "react"
import { TaskList } from "./ui/TaskList"
import { taskController } from "./controllers/taskController"
import { Task } from "./types/task"

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    const loadTasks = async () => {
      const loadedTasks = await taskController.loadTasks()
      setTasks(loadedTasks)
    }
    loadTasks()
  }, [])

  const handleCreate = async (title: string, description: string, audioTrack?: File) => {
    await taskController.handleCreateTask(title, description, audioTrack)
    console.log("Обновлённые задачи после создания:", taskController.getTasks());
    setTasks(taskController.getTasks())
  }

  const handleUpdate = async (id: string, updates: Partial<Task>) => {
    await taskController.handleUpdateTask(id, updates)
    setTasks(taskController.getTasks())
  }

  const handleDelete = async (id: string) => {
    await taskController.handleDeleteTask(id)
    setTasks(taskController.getTasks())
  }

  return (
    <TaskList
      tasks={tasks}
      onCreate={handleCreate}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
    />
  )

}

export default App
