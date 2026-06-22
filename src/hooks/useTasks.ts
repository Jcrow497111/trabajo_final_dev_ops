import { useState, useEffect, useCallback } from 'react'
import type { Task, TaskStatus, TaskStatusFilter } from '../types/task'
import { obtenerTareas, guardarTarea, actualizarTarea, eliminarTarea, cambiarEstadoTarea } from '../db/turso'
import { inicializarBase } from '../db/turso'
import type { UsuarioSesion } from './useAuth'

function generarId(): string {
  return crypto.randomUUID?.() ?? Date.now().toString(36) + Math.random().toString(36).slice(2)
}

export function useTasks(usuario: UsuarioSesion | null) {
  const [tareas, setTareas] = useState<Task[]>([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filtro, setFiltro] = useState<TaskStatusFilter>('todas')
  const [busqueda, setBusqueda] = useState('')

  const recargar = useCallback(async () => {
    if (!usuario) return
    setCargando(true)
    try {
      await inicializarBase()
      const datos = await obtenerTareas(usuario.id)
      setTareas(datos)
      setError(null)
    } catch {
      setError('Error al cargar las tareas')
    } finally {
      setCargando(false)
    }
  }, [usuario])

  useEffect(() => {
    recargar()
  }, [recargar])

  const tareasFiltradas = tareas.filter((t) => {
    const coincideEstado = filtro === 'todas' || t.estado === filtro
    const texto = busqueda.toLowerCase()
    const coincideTexto =
      !texto || t.titulo.toLowerCase().includes(texto) || t.descripcion.toLowerCase().includes(texto)
    return coincideEstado && coincideTexto
  })

  const totales = {
    total: tareas.length,
    pendientes: tareas.filter((t) => t.estado === 'pendiente').length,
    enProgreso: tareas.filter((t) => t.estado === 'en-progreso').length,
    completadas: tareas.filter((t) => t.estado === 'completada').length,
  }

  const agregarTarea = useCallback(async (titulo: string, descripcion: string) => {
    if (!usuario) return
    const now = new Date().toISOString()
    const nueva: Task = {
      id: generarId(),
      titulo,
      descripcion,
      estado: 'pendiente',
      createdAt: now,
      updatedAt: now,
    }
    try {
      await guardarTarea({ ...nueva, usuario_id: usuario.id })
      setTareas((prev) => [...prev, nueva])
    } catch {
      setError('Error al guardar la tarea')
    }
  }, [usuario])

  const editarTarea = useCallback(async (id: string, titulo: string, descripcion: string, estado: TaskStatus) => {
    const now = new Date().toISOString()
    try {
      await actualizarTarea(id, titulo, descripcion, estado, now)
      setTareas((prev) =>
        prev.map((t) => (t.id === id ? { ...t, titulo, descripcion, estado, updatedAt: now } : t))
      )
    } catch {
      setError('Error al actualizar la tarea')
    }
  }, [])

  const eliminarTareaAction = useCallback(async (id: string) => {
    try {
      await eliminarTarea(id)
      setTareas((prev) => prev.filter((t) => t.id !== id))
    } catch {
      setError('Error al eliminar la tarea')
    }
  }, [])

  const cambiarEstado = useCallback(async (id: string, estado: TaskStatus) => {
    const now = new Date().toISOString()
    try {
      await cambiarEstadoTarea(id, estado, now)
      setTareas((prev) =>
        prev.map((t) => (t.id === id ? { ...t, estado, updatedAt: now } : t))
      )
    } catch {
      setError('Error al cambiar el estado')
    }
  }, [])

  return {
    tareas: tareasFiltradas,
    todas: tareas,
    totales,
    filtro,
    busqueda,
    cargando,
    error,
    setFiltro,
    setBusqueda,
    agregarTarea,
    editarTarea,
    eliminarTarea: eliminarTareaAction,
    cambiarEstado,
    recargar,
  }
}
