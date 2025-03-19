import { TaskModel, taskModel } from "../models/taskModel";
import { Task } from "../types/task";
import { getTasks, createTask, updateTask, deleteTask } from "../api/api";

export class TaskService {
    private model: TaskModel;

    constructor(model: TaskModel) {
        this.model = model;
    }

    async fetchTasks(): Promise<Task[]> {
        const tasks = await getTasks();
        this.model.setTasks(tasks);
        return tasks;
    }

    async createTask(task: Omit<Task, "id" | "completed">): Promise<Task> {
        const newTask = await createTask(task);
        this.model.setTasks();
        return newTask;
    }

    async updateTask(id: string, updates: Partial<Task>): Promise<Task> {
        const updatedTask = await this.updateTask(id, updates);
        const currentTasks = this.model.getTasks();
        this.model.setTasks(currentTasks.map(task => task.id === id ? updatedTask : task))
        return updatedTask
    }

    async deleteTask(id: string): Promise<void> {
        await deleteTask(id);
        const currentTasks = this.model.getTasks();
        this.model.setTasks(currentTasks.filter(task => task.id !== id))
    }

    getTasks(): Task[] {
        return this.model.getTasks();
    }
}

export const taskService = new TaskService(taskModel)