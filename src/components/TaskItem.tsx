import type { Task, TaskStatus } from '../types/task'

interface Props {
  tarea: Task
  onEditar: () => void
  onEliminar: () => void
  onCambiarEstado: (estado: TaskStatus) => void
}

const ESTADOS_SIGUIENTES: Record<TaskStatus, { value: TaskStatus; label: string }> = {
  'pendiente': { value: 'en-progreso', label: 'Iniciar' },
  'en-progreso': { value: 'completada', label: 'Completar' },
  'completada': { value: 'pendiente', label: 'Reabrir' },
}

function formatoFecha(iso: string): string {
  return new Date(iso).toLocaleDateString('es-EC', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function TaskItem({ tarea, onEditar, onEliminar, onCambiarEstado }: Props) {
  const siguiente = ESTADOS_SIGUIENTES[tarea.estado]

  return (
    <div className={`task-item task-${tarea.estado}`}>
      <div className="task-header">
        <h4>{tarea.titulo}</h4>
        <span className={`badge badge-${tarea.estado}`}>
          {tarea.estado === 'pendiente' && 'Pendiente'}
          {tarea.estado === 'en-progreso' && 'En progreso'}
          {tarea.estado === 'completada' && 'Completada'}
        </span>
      </div>
      {tarea.descripcion && <p className="task-desc">{tarea.descripcion}</p>}
      <p className="task-date">Creada: {formatoFecha(tarea.createdAt)}</p>
      <div className="task-actions">
        <button className="btn btn-sm" onClick={() => onCambiarEstado(siguiente.value)}>
          {siguiente.label}
        </button>
        <button className="btn btn-sm btn-edit" onClick={onEditar}>
          Editar
        </button>
        <button className="btn btn-sm btn-danger" onClick={onEliminar}>
          Eliminar
        </button>
      </div>
    </div>
  )
}
