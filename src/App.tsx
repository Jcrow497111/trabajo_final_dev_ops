import { useAuth } from './hooks/useAuth'
import LoginPage from './pages/LoginPage'
import TaskManagerPage from './pages/TaskManagerPage'

export default function App() {
  const { usuario, cargando, error, iniciarSesion, registrarse, cerrarSesion } = useAuth()

  if (usuario) {
    return <TaskManagerPage usuario={usuario} onCerrarSesion={cerrarSesion} />
  }

  return (
    <LoginPage
      onIniciarSesion={iniciarSesion}
      onRegistrarse={registrarse}
      cargando={cargando}
      error={error}
      usuario={usuario}
    />
  )
}
