import { useState } from 'react'
import type { UsuarioSesion } from '../hooks/useAuth'

type Modo = 'login' | 'registro'

interface Props {
  onIniciarSesion: (email: string, password: string) => Promise<boolean>
  onRegistrarse: (nombre: string, email: string, password: string) => Promise<boolean>
  cargando: boolean
  error: string | null
  usuario: UsuarioSesion | null
}

export default function LoginPage({ onIniciarSesion, onRegistrarse, cargando, error }: Props) {
  const [modo, setModo] = useState<Modo>('login')
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [verPassword, setVerPassword] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (modo === 'login') {
      await onIniciarSesion(email, password)
    } else {
      await onRegistrarse(nombre, email, password)
    }
  }

  function toggleModo() {
    setModo(modo === 'login' ? 'registro' : 'login')
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">
            <span className="login-icon">✓</span>
          </div>
          <h1>Task Manager</h1>
          <p className="login-subtitle">
            {modo === 'login' ? 'Inicia sesión para continuar' : 'Crea tu cuenta'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {modo === 'registro' && (
            <div className="form-group">
              <label htmlFor="nombre">Nombre</label>
              <input
                id="nombre"
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Tu nombre"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="usuario@ejemplo.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <div className="password-wrapper">
              <input
                id="password"
                type={verPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setVerPassword(!verPassword)}
              >
                {verPassword ? 'Ocultar' : 'Mostrar'}
              </button>
            </div>
          </div>

          {error && <p className="error-msg">{error}</p>}

          <button type="submit" className="btn btn-primary btn-block" disabled={cargando}>
            {cargando ? 'Procesando...' : modo === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
          </button>
        </form>

        <div className="login-footer">
          <p>
            {modo === 'login' ? (
              <>
                ¿No tienes cuenta?{' '}
                <button className="link-btn" onClick={toggleModo}>
                  Regístrate
                </button>
              </>
            ) : (
              <>
                ¿Ya tienes cuenta?{' '}
                <button className="link-btn" onClick={toggleModo}>
                  Inicia sesión
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}
