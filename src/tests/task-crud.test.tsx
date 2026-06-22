import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, within, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'

function setup() {
  localStorage.clear()
  return render(<App />)
}

describe('CRUD de tareas', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('debe crear una tarea válida', async () => {
    const user = userEvent.setup()
    setup()

    await user.click(screen.getByText('+ Nueva tarea'))
    await user.type(screen.getByLabelText('Título'), 'Tarea de prueba')
    await user.type(screen.getByLabelText('Descripción'), 'Descripción de prueba')
    await user.click(screen.getByText('Guardar'))

    expect(screen.getByText('Tarea de prueba')).toBeInTheDocument()
    expect(screen.getByText('Descripción de prueba')).toBeInTheDocument()
  })

  it('debe editar una tarea', async () => {
    const user = userEvent.setup()
    setup()

    await user.click(screen.getByText('+ Nueva tarea'))
    await user.type(screen.getByLabelText('Título'), 'Tarea original')
    await user.click(screen.getByText('Guardar'))

    await user.click(screen.getByText('Editar'))
    const tituloInput = screen.getByLabelText('Título')
    await user.clear(tituloInput)
    await user.type(tituloInput, 'Tarea editada')
    await user.click(screen.getByText('Guardar'))

    expect(screen.getByText('Tarea editada')).toBeInTheDocument()
    expect(screen.queryByText('Tarea original')).not.toBeInTheDocument()
  })

  it('debe eliminar una tarea', async () => {
    const user = userEvent.setup()
    setup()

    await user.click(screen.getByText('+ Nueva tarea'))
    await user.type(screen.getByLabelText('Título'), 'Tarea a eliminar')
    await user.click(screen.getByText('Guardar'))

    expect(screen.getByText('Tarea a eliminar')).toBeInTheDocument()

    await user.click(screen.getByText('Eliminar'))
    await user.click(screen.getByText('Eliminar')) // Confirmar en el diálogo

    expect(screen.queryByText('Tarea a eliminar')).not.toBeInTheDocument()
  })

  it('debe cambiar estado de pendiente a en progreso', async () => {
    const user = userEvent.setup()
    setup()

    await user.click(screen.getByText('+ Nueva tarea'))
    await user.type(screen.getByLabelText('Título'), 'Tarea con estado')
    await user.click(screen.getByText('Guardar'))

    expect(screen.getByText('Pendiente')).toBeInTheDocument()

    await user.click(screen.getByText('Iniciar'))

    expect(screen.getByText('En progreso')).toBeInTheDocument()
  })

  it('debe cambiar estado de en progreso a completada', async () => {
    const user = userEvent.setup()
    setup()

    await user.click(screen.getByText('+ Nueva tarea'))
    await user.type(screen.getByLabelText('Título'), 'Tarea completada')
    await user.click(screen.getByText('Guardar'))

    await user.click(screen.getByText('Iniciar'))
    expect(screen.getByText('En progreso')).toBeInTheDocument()

    await user.click(screen.getByText('Completar'))
    expect(screen.getByText('Completada')).toBeInTheDocument()
  })

  it('debe filtrar tareas por estado', async () => {
    const user = userEvent.setup()
    setup()

    await user.click(screen.getByText('+ Nueva tarea'))
    await user.type(screen.getByLabelText('Título'), 'Tarea pendiente')
    await user.click(screen.getByText('Guardar'))

    await user.click(screen.getByText('+ Nueva tarea'))
    await user.type(screen.getByLabelText('Título'), 'Tarea completada')
    await user.click(screen.getByText('Guardar'))

    await user.click(screen.getAllByText('Iniciar')[1])
    await user.click(screen.getByText('Completar'))

    await user.click(screen.getByText('Completada'))
    expect(screen.getByText('Tarea completada')).toBeInTheDocument()
    expect(screen.queryByText('Tarea pendiente')).not.toBeInTheDocument()

    await user.click(screen.getByText('Todas'))
    expect(screen.getByText('Tarea pendiente')).toBeInTheDocument()
    expect(screen.getByText('Tarea completada')).toBeInTheDocument()
  })

  it('debe buscar tareas por nombre', async () => {
    const user = userEvent.setup()
    setup()

    await user.click(screen.getByText('+ Nueva tarea'))
    await user.type(screen.getByLabelText('Título'), 'Comprar pan')
    await user.click(screen.getByText('Guardar'))

    await user.click(screen.getByText('+ Nueva tarea'))
    await user.type(screen.getByLabelText('Título'), 'Estudiar React')
    await user.click(screen.getByText('Guardar'))

    const searchInput = screen.getByPlaceholderText('Buscar tarea...')
    await user.type(searchInput, 'Comprar')

    expect(screen.getByText('Comprar pan')).toBeInTheDocument()
    expect(screen.queryByText('Estudiar React')).not.toBeInTheDocument()
  })
})
