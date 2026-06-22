export type TaskStatus = 'pendiente' | 'en-progreso' | 'completada'

export interface Task {
  id: string
  titulo: string
  descripcion: string
  estado: TaskStatus
  createdAt: string
  updatedAt: string
}

export type TaskStatusFilter = TaskStatus | 'todas'
