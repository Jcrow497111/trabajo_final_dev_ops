import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'

function setup() {
  localStorage.clear()
  return render(<App />)
}

describe('Validación y casos borde', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('no debe permitir crear tarea con título vacío', async () => {
    const user = userEvent.setup()
    setup()

    await user.click(screen.getByText('+ Nueva tarea'))
    await user.click(screen.getByText('Guardar'))

    expect(screen.getByText('El título es obligatorio')).toBeInTheDocument()
  })

  it('debe mostrar mensaje de validación si faltan datos', async () => {
    const user = userEvent.setup()
    setup()

    await user.click(screen.getByText('+ Nueva tarea'))
    const tituloInput = screen.getByLabelText('Título')
    await user.type(tituloInput, '   ')
    await user.click(screen.getByText('Guardar'))

    expect(screen.getByText('El título es obligatorio')).toBeInTheDocument()
  })

  it('debe crear tarea con título largo', async () => {
    const user = userEvent.setup()
    setup()

    const tituloLargo = 'A'.repeat(200)

    await user.click(screen.getByText('+ Nueva tarea'))
    await user.type(screen.getByLabelText('Título'), tituloLargo)
    await user.click(screen.getByText('Guardar'))

    expect(screen.getByText(tituloLargo)).toBeInTheDocument()
  })

  it('debe crear varias tareas y verificar conteo', async () => {
    const user = userEvent.setup()
    setup()

    for (let i = 1; i <= 5; i++) {
      await user.click(screen.getByText('+ Nueva tarea'))
      await user.type(screen.getByLabelText('Título'), `Tarea ${i}`)
      await user.click(screen.getByText('Guardar'))
    }

    const totales = screen.getAllByText('5')
    expect(totales.length).toBeGreaterThan(0)
  })

  it('debe eliminar la última tarea de la lista', async () => {
    const user = userEvent.setup()
    setup()

    await user.click(screen.getByText('+ Nueva tarea'))
    await user.type(screen.getByLabelText('Título'), 'Única tarea')
    await user.click(screen.getByText('Guardar'))

    expect(screen.getByText('Única tarea')).toBeInTheDocument()

    await user.click(screen.getByText('Eliminar'))
    await user.click(screen.getByText('Eliminar'))

    expect(screen.getByText('No hay tareas que mostrar')).toBeInTheDocument()
  })

  it('debe cambiar varias veces el estado de una misma tarea', async () => {
    const user = userEvent.setup()
    setup()

    await user.click(screen.getByText('+ Nueva tarea'))
    await user.type(screen.getByLabelText('Título'), 'Tarea dinámica')
    await user.click(screen.getByText('Guardar'))

    expect(screen.getByText('Pendiente')).toBeInTheDocument()

    await user.click(screen.getByText('Iniciar'))
    expect(screen.getByText('En progreso')).toBeInTheDocument()

    await user.click(screen.getByText('Completar'))
    expect(screen.getByText('Completada')).toBeInTheDocument()

    await user.click(screen.getByText('Reabrir'))
    expect(screen.getByText('Pendiente')).toBeInTheDocument()

    await user.click(screen.getByText('Iniciar'))
    expect(screen.getByText('En progreso')).toBeInTheDocument()
  })
})
