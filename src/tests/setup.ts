import '@testing-library/jest-dom'
import { vi } from 'vitest'

const SESSION_KEY = 'tm-sesion'

const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value },
    removeItem: (key: string) => { delete store[key] },
    clear: () => { store = {} },
    get length() { return Object.keys(store).length },
    key: (index: number) => Object.keys(store)[index] ?? null,
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

// Mock de @libsql/client/web
vi.mock('@libsql/client/web', () => {
  const tareasDb: Record<string, any[]> = {}

  const mockClient = {
    batch: vi.fn(async (stmts: string[]) => {
      return stmts.map(() => ({ rows: [] }))
    }),
    execute: vi.fn(async ({ sql, args }: { sql: string; args?: any[] }) => {
      if (sql.includes('CREATE TABLE IF NOT EXISTS')) {
        return { rows: [] }
      }
      if (sql.includes('SELECT * FROM tareas')) {
        const usuarioId = args?.[0]
        const data = Object.values(tareasDb)
          .flat()
          .filter((t: any) => t.usuario_id === usuarioId)
        return { rows: data }
      }
      if (sql.includes('SELECT * FROM usuarios')) {
        return { rows: [] }
      }
      if (sql.includes('INSERT INTO tareas')) {
        const tarea = {
          id: args?.[0],
          usuario_id: args?.[1],
          titulo: args?.[2],
          descripcion: args?.[3],
          estado: args?.[4],
          createdAt: args?.[5],
          updatedAt: args?.[6],
        }
        if (!tareasDb[tarea.usuario_id]) {
          tareasDb[tarea.usuario_id] = []
        }
        tareasDb[tarea.usuario_id].push(tarea)
        return { rows: [], rowsAffected: 1, lastInsertRowid: undefined }
      }
      if (sql.includes('UPDATE tareas')) {
        return { rows: [], rowsAffected: 1 }
      }
      if (sql.includes('DELETE FROM tareas')) {
        const id = args?.[0]
        for (const userId of Object.keys(tareasDb)) {
          tareasDb[userId] = tareasDb[userId].filter((t: any) => t.id !== id)
        }
        return { rows: [], rowsAffected: 1 }
      }
      if (sql.includes('INSERT INTO usuarios')) {
        return { rows: [], rowsAffected: 1, lastInsertRowid: undefined }
      }
      return { rows: [] }
    }),
    close: vi.fn(),
  }

  return {
    createClient: vi.fn(() => mockClient),
  }
})

if (!globalThis.crypto?.randomUUID) {
  Object.defineProperty(globalThis, 'crypto', {
    value: {
      randomUUID: () =>
        'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
          const r = (Math.random() * 16) | 0
          const v = c === 'x' ? r : (r & 0x3) | 0x8
          return v.toString(16)
        }),
    },
    writable: true,
  })
}

// Mock de VITE env vars
vi.stubEnv('VITE_TURSO_DB_URL', 'libsql://test.turso.io')
vi.stubEnv('VITE_TURSO_AUTH_TOKEN', 'test-token')

export function crearSesion() {
  const usuario = {
    id: crypto.randomUUID(),
    nombre: 'Test User',
    email: 'test@test.com',
  }
  localStorage.setItem(SESSION_KEY, JSON.stringify(usuario))
  return usuario
}

export function limpiarSesion() {
  localStorage.removeItem(SESSION_KEY)
}
