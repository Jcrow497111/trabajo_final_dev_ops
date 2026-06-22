import { useState, useEffect } from 'react'
import type { Task, TaskStatus } from '../types/task'

interface Props {
  tarea?: Task | null
  onGuardar: (titulo: string, descripcion: string, estado: TaskStatus) => void
  onCancelar: () => void
}

const ESTADOS: { value: TaskStatus; label: string }[] = [
  { value: 'pendiente', label: 'Pendiente' },
  { value: 'en-progreso', label: 'En progreso' },
  { value: 'completada', label: 'Completada' },
]

export default function TaskForm({ tarea, onGuardar, onCancelar }: Props) {
  const [titulo, setTitulo] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [estado, setEstado] = useState<TaskStatus>('pendiente')
  const [error, setError] = useState('')

  useEffect(() => {
    if (tarea) {
      setTitulo(tarea.titulo)
      setDescripcion(tarea.descripcion)
      setEstado(tarea.estado)
    }
  }, [tarea])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const t = titulo.trim()
    if (!t) {
      setError('El título es obligatorio')
      return
    }
    if (!estado) {
      setError('El estado es obligatorio')
      return
    }
    setError('')
    onGuardar(t, descripcion.trim(), estado)
    if (!tarea) {
      setTitulo('')
      setDescripcion('')
      setEstado('pendiente')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h3>{tarea ? 'Editar tarea' : 'Nueva tarea'}</h3>
      <div className="form-group">
        <label htmlFor="titulo">Título</label>
        <input
          id="titulo"
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Ingrese el título de la tarea"
        />
      </div>
      <div className="form-group">
        <label htmlFor="descripcion">Descripción</label>
        <textarea
          id="descripcion"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Ingrese una descripción (opcional)"
          rows={3}
        />
      </div>
      <div className="form-group">
        <label htmlFor="estado">Estado</label>
        <select id="estado" value={estado} onChange={(e) => setEstado(e.target.value as TaskStatus)}>
          {ESTADOS.map((e) => (
            <option key={e.value} value={e.value}>
              {e.label}
            </option>
          ))}
        </select>
      </div>
      {error && <p className="error-msg">{error}</p>}
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          Guardar
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancelar}>
          Cancelar
        </button>
      </div>
    </form>
  )
}
