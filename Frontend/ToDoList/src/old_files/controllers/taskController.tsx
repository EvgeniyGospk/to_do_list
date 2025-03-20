import { TaskService, taskService } from "../services/taskService";
import { Task } from "../types/task";

export class TaskController {
    private service: TaskService;

    constructor(service: TaskService) {
        this.service = service;
    }

    async loadTasks(): Promise<Task[]> {
        return await this.service.fetchTasks();
    }

    async handleCreateTask(title: string, description: string, audioTrack?: File): Promise<Task> {
        const taskData = {
            title,
            description,
            audioTrack
        }
        return await this.service.createTask(taskData)
    }

    async handleUpdateTask(id: string, updates: Partial<Task>): Promise<Task> {
        return await this.service.updateTask(id, updates);
    }

    async handleDeleteTask(id: string): Promise<void> {
        await this.service.deleteTask(id);
    }

    getTasks():Task[] {
        return this.service.getTasks();
    }

}

export const taskController = new TaskController(taskService);