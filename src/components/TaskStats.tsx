interface Props {
  total: number
  pendientes: number
  enProgreso: number
  completadas: number
}

export default function TaskStats({ total, pendientes, enProgreso, completadas }: Props) {
  return (
    <div className="task-stats">
      <div className="stat-card">
        <span className="stat-number">{total}</span>
        <span className="stat-label">Total</span>
      </div>
      <div className="stat-card stat-pendiente">
        <span className="stat-number">{pendientes}</span>
        <span className="stat-label">Pendientes</span>
      </div>
      <div className="stat-card stat-progreso">
        <span className="stat-number">{enProgreso}</span>
        <span className="stat-label">En progreso</span>
      </div>
      <div className="stat-card stat-completada">
        <span className="stat-number">{completadas}</span>
        <span className="stat-label">Completadas</span>
      </div>
    </div>
  )
}
