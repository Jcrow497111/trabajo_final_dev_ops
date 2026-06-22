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

describe('CRUD de tareas', () => {
  beforeEach(() => {
    limpiarSesion()
  })

  it('debe crear una tarea válida', async () => {
    const user = userEvent.setup()
    setup()

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /nueva tarea/i })).toBeInTheDocument()
    })

    await user.click(screen.getByRole('button', { name: /nueva tarea/i }))
    await user.type(screen.getByLabelText('Título'), 'Tarea de prueba')
    await user.type(screen.getByLabelText('Descripción'), 'Descripción de prueba')
    await user.click(screen.getByRole('button', { name: /guardar/i }))

    expect(screen.getByText('Tarea de prueba')).toBeInTheDocument()
    expect(screen.getByText('Descripción de prueba')).toBeInTheDocument()
  })

  it('debe editar una tarea', async () => {
    const user = userEvent.setup()
    setup()

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /nueva tarea/i })).toBeInTheDocument()
    })

    await user.click(screen.getByRole('button', { name: /nueva tarea/i }))
    await user.type(screen.getByLabelText('Título'), 'Tarea original')
    await user.click(screen.getByRole('button', { name: /guardar/i }))

    await user.click(screen.getByRole('button', { name: /editar/i }))
    const tituloInput = screen.getByLabelText('Título')
    await user.clear(tituloInput)
    await user.type(tituloInput, 'Tarea editada')
    await user.click(screen.getByRole('button', { name: /guardar/i }))

    expect(screen.getByText('Tarea editada')).toBeInTheDocument()
    expect(screen.queryByText('Tarea original')).not.toBeInTheDocument()
  })

  it('debe eliminar una tarea', async () => {
    const user = userEvent.setup()
    setup()

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /nueva tarea/i })).toBeInTheDocument()
    })

    await user.click(screen.getByRole('button', { name: /nueva tarea/i }))
    await user.type(screen.getByLabelText('Título'), 'Tarea a eliminar')
    await user.click(screen.getByRole('button', { name: /guardar/i }))

    expect(screen.getByText('Tarea a eliminar')).toBeInTheDocument()

    const deleteButtons = screen.getAllByRole('button', { name: /eliminar/i })
    await user.click(deleteButtons[0])
    const confirmButtons = screen.getAllByRole('button', { name: /eliminar/i })
    await user.click(confirmButtons[confirmButtons.length - 1])

    expect(screen.queryByText('Tarea a eliminar')).not.toBeInTheDocument()
  })

  it('debe cambiar estado de pendiente a en progreso', async () => {
    const user = userEvent.setup()
    setup()

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /nueva tarea/i })).toBeInTheDocument()
    })

    await user.click(screen.getByRole('button', { name: /nueva tarea/i }))
    await user.type(screen.getByLabelText('Título'), 'Tarea con estado')
    await user.click(screen.getByRole('button', { name: /guardar/i }))

    expect(getBadge()?.textContent).toBe('Pendiente')

    await user.click(screen.getByRole('button', { name: /iniciar/i }))

    expect(getBadge()?.textContent).toBe('En progreso')
  })

  it('debe cambiar estado de en progreso a completada', async () => {
    const user = userEvent.setup()
    setup()

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /nueva tarea/i })).toBeInTheDocument()
    })

    await user.click(screen.getByRole('button', { name: /nueva tarea/i }))
    await user.type(screen.getByLabelText('Título'), 'Tarea completada')
    await user.click(screen.getByRole('button', { name: /guardar/i }))

    await user.click(screen.getByRole('button', { name: /iniciar/i }))
    expect(getBadge()?.textContent).toBe('En progreso')

    await user.click(screen.getByRole('button', { name: /completar/i }))
    expect(getBadge()?.textContent).toBe('Completada')
  })

  it('debe filtrar tareas por estado', async () => {
    const user = userEvent.setup()
    setup()

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /nueva tarea/i })).toBeInTheDocument()
    })

    await user.click(screen.getByRole('button', { name: /nueva tarea/i }))
    await user.type(screen.getByLabelText('Título'), 'Tarea pendiente')
    await user.click(screen.getByRole('button', { name: /guardar/i }))

    await user.click(screen.getByRole('button', { name: /nueva tarea/i }))
    await user.type(screen.getByLabelText('Título'), 'Tarea completada')
    await user.click(screen.getByRole('button', { name: /guardar/i }))

    const iniciarBtns = screen.getAllByRole('button', { name: /iniciar/i })
    await user.click(iniciarBtns[1])
    await user.click(screen.getByRole('button', { name: /completar/i }))

    await user.click(screen.getByRole('button', { name: /^completada$/i }))
    expect(screen.getByText('Tarea completada')).toBeInTheDocument()
    expect(screen.queryByText('Tarea pendiente')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /^todas$/i }))
    expect(screen.getByText('Tarea pendiente')).toBeInTheDocument()
    expect(screen.getByText('Tarea completada')).toBeInTheDocument()
  })

  it('debe buscar tareas por nombre', async () => {
    const user = userEvent.setup()
    setup()

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /nueva tarea/i })).toBeInTheDocument()
    })

    await user.click(screen.getByRole('button', { name: /nueva tarea/i }))
    await user.type(screen.getByLabelText('Título'), 'Comprar pan')
    await user.click(screen.getByRole('button', { name: /guardar/i }))

    await user.click(screen.getByRole('button', { name: /nueva tarea/i }))
    await user.type(screen.getByLabelText('Título'), 'Estudiar React')
    await user.click(screen.getByRole('button', { name: /guardar/i }))

    const searchInput = screen.getByPlaceholderText('Buscar tarea...')
    await user.type(searchInput, 'Comprar')

    expect(screen.getByText('Comprar pan')).toBeInTheDocument()
    expect(screen.queryByText('Estudiar React')).not.toBeInTheDocument()
  })
})
