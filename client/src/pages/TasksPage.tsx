import { useState } from "react";
import { Plus } from "lucide-react";
import { useTasks } from "../hooks/useTasks";
import { TaskTable } from "../components/tasks/TaskTable";
import { TaskFilters } from "../components/tasks/TaskFilters";
import { TaskForm } from "../components/tasks/TaskForm";
import { TaskDetail } from "../components/tasks/TaskDetail";
import { DeleteConfirm } from "../components/tasks/DeleteConfirm";
import { Modal } from "../components/ui/Modal";
import { LoadingSpinner } from "../components/ui/Loading";
import { EmptyState } from "../components/ui/EmptyState";
import type { Task, CreateTaskInput, UpdateTaskInput, TaskStatus } from "../../../shared/task.types";

export default function TasksPage() {
  const {
    tasks,
    loading,
    error,
    filters,
    setFilters,
    createTask,
    updateTask,
    deleteTask,
    changeTaskStatus,
  } = useTasks();

  const [showCreate, setShowCreate] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [viewingTask, setViewingTask] = useState<Task | null>(null);
  const [deletingTask, setDeletingTask] = useState<Task | null>(null);

  async function handleCreate(data: CreateTaskInput) {
    await createTask(data);
    setShowCreate(false);
  }

  async function handleUpdate(data: CreateTaskInput) {
    if (!editingTask) return;
    await updateTask(editingTask.id, data as UpdateTaskInput);
    setEditingTask(null);
  }

  async function handleDelete() {
    if (!deletingTask) return;
    await deleteTask(deletingTask.id);
    setDeletingTask(null);
  }

  async function handleStatusChange(id: string, status: TaskStatus) {
    await changeTaskStatus(id, status);
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-16">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Mis tareas</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {tasks.length} tarea{tasks.length !== 1 ? "s" : ""} encontrada{tasks.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button onClick={() => setShowCreate(true)} className="btn btn-primary">
          <Plus size={18} />
          Nueva tarea
        </button>
      </div>

      <TaskFilters filters={filters} onChange={setFilters} />

      {loading ? (
        <LoadingSpinner />
      ) : tasks.length === 0 ? (
        <EmptyState
          message="No hay tareas"
          description="Crea tu primera tarea para comenzar"
        />
      ) : (
        <div className="card overflow-hidden">
          <TaskTable
            tasks={tasks}
            onView={(task) => setViewingTask(task)}
            onEdit={(task) => setEditingTask(task)}
            onDelete={(task) => setDeletingTask(task)}
            onStatusChange={handleStatusChange}
          />
        </div>
      )}

      {/* Create Modal */}
      <Modal open={showCreate} onClose={() => setShowCreate(false)} title="Nueva tarea">
        <TaskForm onSave={handleCreate} onCancel={() => setShowCreate(false)} />
      </Modal>

      {/* Edit Modal */}
      <Modal open={!!editingTask} onClose={() => setEditingTask(null)} title="Editar tarea">
        {editingTask && (
          <TaskForm task={editingTask} onSave={handleUpdate} onCancel={() => setEditingTask(null)} />
        )}
      </Modal>

      {/* View Modal */}
      <Modal open={!!viewingTask} onClose={() => setViewingTask(null)} title="Detalle de tarea" size="sm">
        {viewingTask && (
          <TaskDetail
            task={viewingTask}
            onEdit={() => {
              const t = viewingTask;
              setViewingTask(null);
              setEditingTask(t);
            }}
            onClose={() => setViewingTask(null)}
          />
        )}
      </Modal>

      {/* Delete Modal */}
      <Modal open={!!deletingTask} onClose={() => setDeletingTask(null)} title="Eliminar tarea" size="sm">
        {deletingTask && (
          <DeleteConfirm
            taskTitle={deletingTask.title}
            onConfirm={handleDelete}
            onCancel={() => setDeletingTask(null)}
          />
        )}
      </Modal>
    </div>
  );
}
