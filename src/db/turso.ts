import { createClient, type Client } from '@libsql/client/web'
import type { Task } from '../types/task'

let client: Client | null = null

function obtenerCliente(): Client {
  if (!client) {
    const url = import.meta.env.VITE_TURSO_DB_URL
    const authToken = import.meta.env.VITE_TURSO_AUTH_TOKEN

    if (!url || !authToken) {
      throw new Error('Faltan VITE_TURSO_DB_URL o VITE_TURSO_AUTH_TOKEN en .env')
    }

    client = createClient({ url, authToken })
  }
  return client
}

export async function inicializarBase(): Promise<void> {
  const db = obtenerCliente()
  await db.batch([
    `CREATE TABLE IF NOT EXISTS usuarios (
      id TEXT PRIMARY KEY,
      nombre TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      createdAt TEXT NOT NULL DEFAULT (datetime('now')),
      updatedAt TEXT NOT NULL DEFAULT (datetime('now'))
    )`,
    `CREATE TABLE IF NOT EXISTS tareas (
      id TEXT PRIMARY KEY,
      usuario_id TEXT NOT NULL,
      titulo TEXT NOT NULL,
      descripcion TEXT NOT NULL DEFAULT '',
      estado TEXT NOT NULL DEFAULT 'pendiente' CHECK(estado IN ('pendiente','en-progreso','completada')),
      createdAt TEXT NOT NULL DEFAULT (datetime('now')),
      updatedAt TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
    )`,
  ], 'write')
}

export async function obtenerTareas(usuarioId: string): Promise<Task[]> {
  const db = obtenerCliente()
  const rs = await db.execute({
    sql: 'SELECT * FROM tareas WHERE usuario_id = ? ORDER BY createdAt DESC',
    args: [usuarioId],
  })
  return rs.rows.map((r) => ({
    id: r.id as string,
    titulo: r.titulo as string,
    descripcion: r.descripcion as string,
    estado: r.estado as Task['estado'],
    createdAt: r.createdAt as string,
    updatedAt: r.updatedAt as string,
  }))
}

export async function guardarTarea(tarea: Task & { usuario_id: string }): Promise<void> {
  const db = obtenerCliente()
  await db.execute({
    sql: `INSERT INTO tareas (id, usuario_id, titulo, descripcion, estado, createdAt, updatedAt)
          VALUES (?, ?, ?, ?, ?, ?, ?)`,
    args: [tarea.id, tarea.usuario_id, tarea.titulo, tarea.descripcion, tarea.estado, tarea.createdAt, tarea.updatedAt],
  })
}

export async function actualizarTarea(id: string, titulo: string, descripcion: string, estado: string, updatedAt: string): Promise<void> {
  const db = obtenerCliente()
  await db.execute({
    sql: 'UPDATE tareas SET titulo = ?, descripcion = ?, estado = ?, updatedAt = ? WHERE id = ?',
    args: [titulo, descripcion, estado, updatedAt, id],
  })
}

export async function eliminarTarea(id: string): Promise<void> {
  const db = obtenerCliente()
  await db.execute({
    sql: 'DELETE FROM tareas WHERE id = ?',
    args: [id],
  })
}

export async function cambiarEstadoTarea(id: string, estado: string, updatedAt: string): Promise<void> {
  const db = obtenerCliente()
  await db.execute({
    sql: 'UPDATE tareas SET estado = ?, updatedAt = ? WHERE id = ?',
    args: [estado, updatedAt, id],
  })
}

type UsuarioRow = {
  id: string
  nombre: string
  email: string
  password: string
  createdAt: string
  updatedAt: string
}

export async function crearUsuario(nombre: string, email: string, password: string): Promise<UsuarioRow> {
  const db = obtenerCliente()
  const id = crypto.randomUUID()
  const now = new Date().toISOString()
  await db.execute({
    sql: 'INSERT INTO usuarios (id, nombre, email, password, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)',
    args: [id, nombre, email, password, now, now],
  })
  return { id, nombre, email, password, createdAt: now, updatedAt: now }
}

export async function obtenerUsuarioPorEmail(email: string): Promise<UsuarioRow | null> {
  const db = obtenerCliente()
  const rs = await db.execute({
    sql: 'SELECT * FROM usuarios WHERE email = ?',
    args: [email],
  })
  if (rs.rows.length === 0) return null
  const r = rs.rows[0]
  return {
    id: r.id as string,
    nombre: r.nombre as string,
    email: r.email as string,
    password: r.password as string,
    createdAt: r.createdAt as string,
    updatedAt: r.updatedAt as string,
  }
}
