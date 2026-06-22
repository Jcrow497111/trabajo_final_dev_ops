import { useState, useCallback } from 'react'
import { crearUsuario, obtenerUsuarioPorEmail } from '../db/turso'

const SESSION_KEY = 'tm-sesion'

export type UsuarioSesion = {
  id: string
  nombre: string
  email: string
}

function cargarSesion(): UsuarioSesion | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hash = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(hash)).map((b) => b.toString(16).padStart(2, '0')).join('')
}

export function useAuth() {
  const [usuario, setUsuario] = useState<UsuarioSesion | null>(cargarSesion)
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const iniciarSesion = useCallback(async (email: string, password: string) => {
    setCargando(true)
    setError(null)
    try {
      const user = await obtenerUsuarioPorEmail(email)
      if (!user) {
        setError('Credenciales inválidas')
        return false
      }
      const hashed = await hashPassword(password)
      if (user.password !== hashed) {
        setError('Credenciales inválidas')
        return false
      }
      const sesion: UsuarioSesion = { id: user.id, nombre: user.nombre, email: user.email }
      localStorage.setItem(SESSION_KEY, JSON.stringify(sesion))
      setUsuario(sesion)
      return true
    } catch {
      setError('Error al conectar con la base de datos')
      return false
    } finally {
      setCargando(false)
    }
  }, [])

  const registrarse = useCallback(async (nombre: string, email: string, password: string) => {
    setCargando(true)
    setError(null)
    try {
      const hashed = await hashPassword(password)
      const user = await crearUsuario(nombre, email, hashed)
      const sesion: UsuarioSesion = { id: user.id, nombre: user.nombre, email: user.email }
      localStorage.setItem(SESSION_KEY, JSON.stringify(sesion))
      setUsuario(sesion)
      return true
    } catch (err: unknown) {
      if (err instanceof Error && err.message?.includes('UNIQUE')) {
        setError('El correo ya está registrado')
      } else {
        setError('Error al registrarse')
      }
      return false
    } finally {
      setCargando(false)
    }
  }, [])

  const cerrarSesion = useCallback(() => {
    localStorage.removeItem(SESSION_KEY)
    setUsuario(null)
  }, [])

  return { usuario, cargando, error, iniciarSesion, registrarse, cerrarSesion }
}
