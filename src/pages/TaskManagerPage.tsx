import { useState } from 'react'
import { useTasks } from '../hooks/useTasks'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'
import TaskFilters from '../components/TaskFilters'
import TaskStats from '../components/TaskStats'
import ConfirmDialog from '../components/ConfirmDialog'
import type { Task, TaskStatus } from '../types/task'
import type { UsuarioSesion } from '../hooks/useAuth'

interface Props {
  usuario: UsuarioSesion
  onCerrarSesion: () => void
}

export default function TaskManagerPage({ usuario, onCerrarSesion }: Props) {
  const {
    tareas,
    totales,
    filtro,
    busqueda,
    cargando,
    setFiltro,
    setBusqueda,
    agregarTarea,
    editarTarea,
    eliminarTarea,
    cambiarEstado,
  } = useTasks(usuario)

  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [tareaEditando, setTareaEditando] = useState<Task | null>(null)
  const [tareaEliminar, setTareaEliminar] = useState<string | null>(null)

  function handleGuardar(titulo: string, descripcion: string, estado: TaskStatus) {
    if (tareaEditando) {
      editarTarea(tareaEditando.id, titulo, descripcion, estado)
    } else {
      agregarTarea(titulo, descripcion)
    }
    setTareaEditando(null)
    setMostrarFormulario(false)
  }

  function handleEditar(t: Task) {
    setTareaEditando(t)
    setMostrarFormulario(true)
  }

  function handleEliminar(id: string) {
    eliminarTarea(id)
    setTareaEliminar(null)
  }

  function handleCancelar() {
    setTareaEditando(null)
    setMostrarFormulario(false)
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="app-header-row">
          <div>
            <h1>Task Manager</h1>
            <p className="subtitle">Gestión de tareas — DevOps + Verificación y Validación</p>
          </div>
          <div className="header-user">
            <span className="user-name">{usuario.nombre}</span>
            <button className="btn btn-sm" onClick={onCerrarSesion}>
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      {cargando ? (
        <p className="empty-msg">Cargando tareas...</p>
      ) : (
        <>
          <TaskStats
            total={totales.total}
            pendientes={totales.pendientes}
            enProgreso={totales.enProgreso}
            completadas={totales.completadas}
          />

          <TaskFilters
            filtro={filtro}
            busqueda={busqueda}
            onCambiarFiltro={setFiltro}
            onCambiarBusqueda={setBusqueda}
          />

          {!mostrarFormulario ? (
            <button className="btn btn-primary btn-block" onClick={() => setMostrarFormulario(true)}>
              + Nueva tarea
            </button>
          ) : (
            <TaskForm tarea={tareaEditando} onGuardar={handleGuardar} onCancelar={handleCancelar} />
          )}

          <TaskList
            tareas={tareas}
            onEditar={handleEditar}
            onEliminar={(id) => setTareaEliminar(id)}
            onCambiarEstado={cambiarEstado}
          />

          {tareaEliminar && (
            <ConfirmDialog
              mensaje="¿Está seguro de eliminar esta tarea?"
              onConfirmar={() => handleEliminar(tareaEliminar)}
              onCancelar={() => setTareaEliminar(null)}
            />
          )}
        </>
      )}
    </div>
  )
}
