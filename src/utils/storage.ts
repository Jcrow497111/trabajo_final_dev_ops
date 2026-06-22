import type { Task } from '../types/task'

const STORAGE_KEY = 'task-manager-tareas'

export function cargarTareas(): Task[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    if (!data) return []
    return JSON.parse(data) as Task[]
  } catch {
    return []
  }
}

export function guardarTareas(tareas: Task[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tareas))
}
