import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TaskTable } from "../components/tasks/TaskTable";
import { TaskForm } from "../components/tasks/TaskForm";
import { TaskFilters } from "../components/tasks/TaskFilters";
import type { Task } from "../../../shared/task.types";

const mockTask = (overrides: Partial<Task> = {}): Task => ({
  id: "1",
  title: "Tarea de prueba",
  description: "Descripción de prueba",
  status: "pending",
  priority: "medium",
  dueDate: "2026-12-31",
  createdAt: "2026-06-21T00:00:00Z",
  updatedAt: "2026-06-21T00:00:00Z",
  ...overrides,
});

describe("TaskTable", () => {
  it("renderiza una lista de tareas", () => {
    const tasks = [mockTask({ title: "Tarea 1" }), mockTask({ id: "2", title: "Tarea 2" })];
    render(<TaskTable tasks={tasks} onView={vi.fn()} onEdit={vi.fn()} onDelete={vi.fn()} onStatusChange={vi.fn()} />);

    expect(screen.getByText("Tarea 1")).toBeInTheDocument();
    expect(screen.getByText("Tarea 2")).toBeInTheDocument();
  });

  it("no renderiza nada si la lista está vacía", () => {
    const { container } = render(<TaskTable tasks={[]} onView={vi.fn()} onEdit={vi.fn()} onDelete={vi.fn()} onStatusChange={vi.fn()} />);
    expect(container.innerHTML).toBe("");
  });

  it("muestra badge de estado Pendiente", () => {
    const task = mockTask({ status: "pending" });
    render(<TaskTable tasks={[task]} onView={vi.fn()} onEdit={vi.fn()} onDelete={vi.fn()} onStatusChange={vi.fn()} />);

    const pendiente = screen.getAllByText("Pendiente");
    expect(pendiente.length).toBeGreaterThan(0);
  });

  it("muestra badge de estado En progreso", () => {
    const task = mockTask({ status: "in_progress" });
    render(<TaskTable tasks={[task]} onView={vi.fn()} onEdit={vi.fn()} onDelete={vi.fn()} onStatusChange={vi.fn()} />);

    const enProgreso = screen.getAllByText("En progreso");
    expect(enProgreso.length).toBeGreaterThan(0);
  });

  it("muestra badge de estado Completada", () => {
    const task = mockTask({ status: "completed" });
    render(<TaskTable tasks={[task]} onView={vi.fn()} onEdit={vi.fn()} onDelete={vi.fn()} onStatusChange={vi.fn()} />);

    const completada = screen.getAllByText("Completada");
    expect(completada.length).toBeGreaterThan(0);
  });

  it("llama a onView al hacer click en Ver", async () => {
    const user = userEvent.setup();
    const onView = vi.fn();
    const task = mockTask();
    render(<TaskTable tasks={[task]} onView={onView} onEdit={vi.fn()} onDelete={vi.fn()} onStatusChange={vi.fn()} />);

    await user.click(screen.getByRole("button", { name: /ver detalle/i }));

    expect(onView).toHaveBeenCalledWith(task);
  });

  it("llama a onDelete al hacer click en Eliminar", async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();
    const task = mockTask();
    render(<TaskTable tasks={[task]} onView={vi.fn()} onEdit={vi.fn()} onDelete={onDelete} onStatusChange={vi.fn()} />);

    const buttons = screen.getAllByRole("button", { name: /eliminar/i });
    await user.click(buttons[0]);

    expect(onDelete).toHaveBeenCalledWith(task);
  });
});

describe("TaskForm", () => {
  it("valida título vacío", async () => {
    const user = userEvent.setup();
    const onSave = vi.fn();
    render(<TaskForm onSave={onSave} onCancel={vi.fn()} />);

    await user.click(screen.getByRole("button", { name: /crear tarea/i }));

    expect(screen.getByText("El título es obligatorio")).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });

  it("llama a onSave con datos válidos", async () => {
    const user = userEvent.setup();
    const onSave = vi.fn();
    const { container } = render(<TaskForm onSave={onSave} onCancel={vi.fn()} />);

    const inputs = container.querySelectorAll('input[type="text"]') as NodeListOf<HTMLInputElement>;
    await user.type(inputs[0], "Nueva tarea");

    const desc = screen.getByPlaceholderText("Descripción opcional");
    await user.type(desc, "Descripción");

    const dateInput = container.querySelector('input[type="date"]') as HTMLInputElement;
    fireEvent.change(dateInput, { target: { value: "2026-12-31" } });

    await user.click(screen.getByRole("button", { name: /crear tarea/i }));

    expect(onSave).toHaveBeenCalledWith(
      expect.objectContaining({ title: "Nueva tarea", description: "Descripción" })
    );
  });

  it("carga datos de una tarea existente para edición", () => {
    const { container } = render(
      <TaskForm task={mockTask({ title: "Tarea a editar", description: "Descripción original" })} onSave={vi.fn()} onCancel={vi.fn()} />
    );

    const inputs = container.querySelectorAll('input[type="text"]') as NodeListOf<HTMLInputElement>;
    const titleInput = Array.from(inputs).find(i => i.value === "Tarea a editar");
    expect(titleInput).toBeTruthy();
    expect(titleInput!.value).toBe("Tarea a editar");
  });

  it("valida fecha límite vacía", async () => {
    const user = userEvent.setup();
    const { container } = render(<TaskForm onSave={vi.fn()} onCancel={vi.fn()} />);

    const inputs = container.querySelectorAll('input[type="text"]') as NodeListOf<HTMLInputElement>;
    await user.type(inputs[0], "Tarea sin fecha");
    await user.click(screen.getByRole("button", { name: /crear tarea/i }));

    expect(screen.getByText("La fecha límite es obligatoria")).toBeInTheDocument();
  });

  it("no permite título con solo espacios", async () => {
    const user = userEvent.setup();
    const onSave = vi.fn();
    const { container } = render(<TaskForm onSave={onSave} onCancel={vi.fn()} />);

    const inputs = container.querySelectorAll('input[type="text"]') as NodeListOf<HTMLInputElement>;
    await user.type(inputs[0], "   ");
    await user.click(screen.getByRole("button", { name: /crear tarea/i }));

    expect(screen.getByText("El título es obligatorio")).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });
});

describe("TaskFilters", () => {
  it("actualiza el filtro de búsqueda", async () => {
    const onChange = vi.fn();
    const filters = { search: "", status: "", priority: "", sortBy: "createdAt", order: "desc" };

    render(<TaskFilters filters={filters} onChange={onChange} />);

    const input = screen.getByPlaceholderText("Buscar tareas...") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "comprar" } });

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ search: "comprar" })
    );
  });

  it("cambia filtro de estado", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const filters = { search: "", status: "", priority: "", sortBy: "createdAt", order: "desc" };

    render(<TaskFilters filters={filters} onChange={onChange} />);

    const selects = screen.getAllByRole("combobox");
    await user.selectOptions(selects[0], "completed");

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ status: "completed" })
    );
  });
});
