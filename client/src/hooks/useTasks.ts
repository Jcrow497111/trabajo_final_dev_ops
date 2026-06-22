import { useState, useEffect, useCallback } from "react";
import type { Task, TaskStatus, TaskPriority, CreateTaskInput, UpdateTaskInput } from "../../../shared/task.types";
import * as taskService from "../services/taskService";
import { useToast } from "../context/ToastContext";

export interface TaskFilters {
  search: string;
  status: string;
  priority: string;
  sortBy: string;
  order: string;
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<TaskFilters>({
    search: "",
    status: "",
    priority: "",
    sortBy: "createdAt",
    order: "desc",
  });
  const { showToast } = useToast();

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await taskService.getTasks({
        search: filters.search || undefined,
        status: filters.status || undefined,
        priority: filters.priority || undefined,
        sortBy: filters.sortBy || undefined,
        order: filters.order || undefined,
      });
      setTasks(data);
    } catch (err) {
      setError("Error al cargar las tareas");
      showToast("Error al cargar las tareas", "error");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const createTask = async (data: CreateTaskInput) => {
    try {
      await taskService.createTask(data);
      showToast("Tarea creada correctamente");
      await fetchTasks();
    } catch {
      showToast("Error al crear la tarea", "error");
    }
  };

  const updateTask = async (id: string, data: UpdateTaskInput) => {
    try {
      await taskService.updateTask(id, data);
      showToast("Tarea actualizada correctamente");
      await fetchTasks();
    } catch {
      showToast("Error al actualizar la tarea", "error");
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await taskService.deleteTask(id);
      showToast("Tarea eliminada correctamente");
      await fetchTasks();
    } catch {
      showToast("Error al eliminar la tarea", "error");
    }
  };

  const changeTaskStatus = async (id: string, status: TaskStatus) => {
    try {
      await taskService.changeTaskStatus(id, status);
      showToast("Estado actualizado correctamente");
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, status } : t))
      );
    } catch {
      showToast("Error al cambiar el estado", "error");
    }
  };

  return {
    tasks,
    loading,
    error,
    filters,
    setFilters,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    changeTaskStatus,
  };
}
