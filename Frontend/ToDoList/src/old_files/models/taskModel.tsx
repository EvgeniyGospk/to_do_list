import { Task } from "../types/task";

export class TaskModel {
    private tasks: Task[] = [];
    setTasks(tasks: Task[]): void {
        this.tasks = tasks
    }

    getTasks(): Task[] {
        return this.tasks;
    }
}

export const taskModel = new TaskModel();