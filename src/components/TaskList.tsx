import type { Task, TaskStatus } from '../types/task'
import TaskItem from './TaskItem'

interface Props {
  tareas: Task[]
  onEditar: (tarea: Task) => void
  onEliminar: (id: string) => void
  onCambiarEstado: (id: string, estado: TaskStatus) => void
}

export default function TaskList({ tareas, onEditar, onEliminar, onCambiarEstado }: Props) {
  if (tareas.length === 0) {
    return <p className="empty-msg">No hay tareas que mostrar</p>
  }

  return (
    <div className="task-list">
      {tareas.map((t) => (
        <TaskItem
          key={t.id}
          tarea={t}
          onEditar={() => onEditar(t)}
          onEliminar={() => onEliminar(t.id)}
          onCambiarEstado={(estado) => onCambiarEstado(t.id, estado)}
        />
      ))}
    </div>
  )
}
