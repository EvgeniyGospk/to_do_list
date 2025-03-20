import $api from "../http";
import { AxiosResponse } from "axios";
import { ITask } from "../models/ITask";

export default class TaskService {
  static async createTask(
    title: string,
    description?: string,
    audioTrack?: string
  ): Promise<AxiosResponse<ITask>> {
    return $api.post<ITask>("/tasks", { title, description, audioTrack });
  }

  static async fetchTasks(): Promise<AxiosResponse<ITask[]>> {
    return $api.get<ITask[]>("/tasks");
  }

  static async fetchTask(id: number): Promise<AxiosResponse<ITask>> {
    return $api.get<ITask[]>(`/tasks/${id}`);
  }

  static async updateTask(
    id: number,
    task: Partial<ITask>
  ): AxiosResponse<ITask> {
    return $api.put(`/tasks/${id}`, task);
  }

  static async deleteTask(id: number): Promise<AxiosResponse<any>> {
    return $api.delete(`/tasks/${id}`)
  }
}
