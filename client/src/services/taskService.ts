import { api } from "./api";
import type { Task, TaskStats, CreateTaskInput, UpdateTaskInput, TaskStatus } from "../../../shared/task.types";

export function getTasks(params?: {
  search?: string;
  status?: string;
  priority?: string;
  sortBy?: string;
  order?: string;
}): Promise<Task[]> {
  const query = new URLSearchParams();
  if (params?.search) query.set("search", params.search);
  if (params?.status) query.set("status", params.status);
  if (params?.priority) query.set("priority", params.priority);
  if (params?.sortBy) query.set("sortBy", params.sortBy);
  if (params?.order) query.set("order", params.order);
  const qs = query.toString();
  return api.get<Task[]>(`/api/tasks${qs ? `?${qs}` : ""}`);
}

export function getTaskById(id: string): Promise<Task> {
  return api.get<Task>(`/api/tasks/${id}`);
}

export function createTask(data: CreateTaskInput): Promise<Task> {
  return api.post<Task>("/api/tasks", data);
}

export function updateTask(id: string, data: UpdateTaskInput): Promise<Task> {
  return api.put<Task>(`/api/tasks/${id}`, data);
}

export function changeTaskStatus(id: string, status: TaskStatus): Promise<Task> {
  return api.patch<Task>(`/api/tasks/${id}/status`, { status });
}

export function deleteTask(id: string): Promise<void> {
  return api.delete<void>(`/api/tasks/${id}`);
}

export function getStats(): Promise<TaskStats> {
  return api.get<TaskStats>("/api/stats");
}
