import type { TaskStatusFilter } from '../types/task'

interface Props {
  filtro: TaskStatusFilter
  busqueda: string
  onCambiarFiltro: (f: TaskStatusFilter) => void
  onCambiarBusqueda: (s: string) => void
}

const OPCIONES: { value: TaskStatusFilter; label: string }[] = [
  { value: 'todas', label: 'Todas' },
  { value: 'pendiente', label: 'Pendiente' },
  { value: 'en-progreso', label: 'En progreso' },
  { value: 'completada', label: 'Completada' },
]

export default function TaskFilters({ filtro, busqueda, onCambiarFiltro, onCambiarBusqueda }: Props) {
  return (
    <div className="task-filters">
      <input
        type="text"
        placeholder="Buscar tarea..."
        value={busqueda}
        onChange={(e) => onCambiarBusqueda(e.target.value)}
        className="search-input"
      />
      <div className="filter-buttons">
        {OPCIONES.map((op) => (
          <button
            key={op.value}
            className={`btn btn-sm ${filtro === op.value ? 'btn-active' : ''}`}
            onClick={() => onCambiarFiltro(op.value)}
          >
            {op.label}
          </button>
        ))}
      </div>
    </div>
  )
}
