import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'
import { crearSesion, limpiarSesion } from './setup'

let container: HTMLElement

function setup() {
  limpiarSesion()
  crearSesion()
  const view = render(<App />)
  container = view.container
}

function getBadge(): Element | null {
  return container.querySelector('.badge')
}

describe('Validación y casos borde', () => {
  beforeEach(() => {
    limpiarSesion()
  })

  it('no debe permitir crear tarea con título vacío', async () => {
    const user = userEvent.setup()
    setup()

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /nueva tarea/i })).toBeInTheDocument()
    })

    await user.click(screen.getByRole('button', { name: /nueva tarea/i }))
    await user.click(screen.getByRole('button', { name: /guardar/i }))

    expect(screen.getByText('El título es obligatorio')).toBeInTheDocument()
  })

  it('debe mostrar mensaje de validación si faltan datos', async () => {
    const user = userEvent.setup()
    setup()

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /nueva tarea/i })).toBeInTheDocument()
    })

    await user.click(screen.getByRole('button', { name: /nueva tarea/i }))
    const tituloInput = screen.getByLabelText('Título')
    await user.type(tituloInput, '   ')
    await user.click(screen.getByRole('button', { name: /guardar/i }))

    expect(screen.getByText('El título es obligatorio')).toBeInTheDocument()
  })

  it('debe crear tarea con título largo', async () => {
    const user = userEvent.setup()
    setup()

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /nueva tarea/i })).toBeInTheDocument()
    })

    const tituloLargo = 'A'.repeat(200)

    await user.click(screen.getByRole('button', { name: /nueva tarea/i }))
    await user.type(screen.getByLabelText('Título'), tituloLargo)
    await user.click(screen.getByRole('button', { name: /guardar/i }))

    expect(screen.getByText(tituloLargo)).toBeInTheDocument()
  })

  it('debe crear varias tareas y verificar conteo', async () => {
    const user = userEvent.setup()
    setup()

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /nueva tarea/i })).toBeInTheDocument()
    })

    for (let i = 1; i <= 5; i++) {
      await user.click(screen.getByRole('button', { name: /nueva tarea/i }))
      await user.type(screen.getByLabelText('Título'), `Tarea ${i}`)
      await user.click(screen.getByRole('button', { name: /guardar/i }))
    }

    const totales = screen.getAllByText('5')
    expect(totales.length).toBeGreaterThan(0)
  })

  it('debe eliminar la última tarea de la lista', async () => {
    const user = userEvent.setup()
    setup()

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /nueva tarea/i })).toBeInTheDocument()
    })

    await user.click(screen.getByRole('button', { name: /nueva tarea/i }))
    await user.type(screen.getByLabelText('Título'), 'Única tarea')
    await user.click(screen.getByRole('button', { name: /guardar/i }))

    expect(screen.getByText('Única tarea')).toBeInTheDocument()

    const deleteButtons = screen.getAllByRole('button', { name: /eliminar/i })
    await user.click(deleteButtons[0])
    const confirmButtons = screen.getAllByRole('button', { name: /eliminar/i })
    await user.click(confirmButtons[confirmButtons.length - 1])

    expect(screen.getByText('No hay tareas que mostrar')).toBeInTheDocument()
  })

  it('debe cambiar varias veces el estado de una misma tarea', async () => {
    const user = userEvent.setup()
    setup()

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /nueva tarea/i })).toBeInTheDocument()
    })

    await user.click(screen.getByRole('button', { name: /nueva tarea/i }))
    await user.type(screen.getByLabelText('Título'), 'Tarea dinámica')
    await user.click(screen.getByRole('button', { name: /guardar/i }))

    expect(getBadge()?.textContent).toBe('Pendiente')

    await user.click(screen.getByRole('button', { name: /iniciar/i }))
    expect(getBadge()?.textContent).toBe('En progreso')

    await user.click(screen.getByRole('button', { name: /completar/i }))
    expect(getBadge()?.textContent).toBe('Completada')

    await user.click(screen.getByRole('button', { name: /reabrir/i }))
    expect(getBadge()?.textContent).toBe('Pendiente')

    await user.click(screen.getByRole('button', { name: /iniciar/i }))
    expect(getBadge()?.textContent).toBe('En progreso')
  })
})
