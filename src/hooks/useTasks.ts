import { useState, useEffect, useCallback } from 'react'
import type { Task, TaskStatus, TaskStatusFilter } from '../types/task'
import { cargarTareas, guardarTareas } from '../utils/storage'

function generarId(): string {
  return crypto.randomUUID?.() ?? Date.now().toString(36) + Math.random().toString(36).slice(2)
}

export function useTasks() {
  const [tareas, setTareas] = useState<Task[]>([])
  const [filtro, setFiltro] = useState<TaskStatusFilter>('todas')
  const [busqueda, setBusqueda] = useState('')

  useEffect(() => {
    setTareas(cargarTareas())
  }, [])

  useEffect(() => {
    guardarTareas(tareas)
  }, [tareas])

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

  const agregarTarea = useCallback((titulo: string, descripcion: string) => {
    const nueva: Task = {
      id: generarId(),
      titulo,
      descripcion,
      estado: 'pendiente',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setTareas((prev) => [...prev, nueva])
  }, [])

  const editarTarea = useCallback((id: string, titulo: string, descripcion: string, estado: TaskStatus) => {
    setTareas((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, titulo, descripcion, estado, updatedAt: new Date().toISOString() }
          : t
      )
    )
  }, [])

  const eliminarTarea = useCallback((id: string) => {
    setTareas((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const cambiarEstado = useCallback((id: string, estado: TaskStatus) => {
    setTareas((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, estado, updatedAt: new Date().toISOString() } : t
      )
    )
  }, [])

  return {
    tareas: tareasFiltradas,
    todas: tareas,
    totales,
    filtro,
    busqueda,
    setFiltro,
    setBusqueda,
    agregarTarea,
    editarTarea,
    eliminarTarea,
    cambiarEstado,
  }
}
