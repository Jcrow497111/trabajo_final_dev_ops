import type { Task, TaskStatus } from "../../../../shared/task.types";
import { StatusBadge, PriorityBadge } from "../ui/Badge";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { formatDate, isOverdue } from "../../lib/utils";

interface KanbanColumnProps {
  title: string;
  status: TaskStatus;
  tasks: Task[];
  color: string;
  onView: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onStatusChange: (id: string, status: TaskStatus) => void;
}

export function KanbanColumn({
  title,
  status,
  tasks,
  color,
  onView,
  onEdit,
  onDelete,
  onStatusChange,
}: KanbanColumnProps) {
  const statuses: TaskStatus[] = ["pending", "in_progress", "completed"];

  return (
    <div className="flex-1 min-w-[280px]">
      <div className="flex items-center gap-2 mb-4">
        <div className={`w-3 h-3 rounded-full ${color}`} />
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
        <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
          {tasks.length}
        </span>
      </div>

      <div className="space-y-3">
        {tasks.length === 0 ? (
          <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center">
            <p className="text-sm text-gray-400 dark:text-gray-500">Sin tareas</p>
          </div>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className="card p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm leading-tight">
                  {task.title}
                </h4>
              </div>

              {task.description && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">
                  {task.description}
                </p>
              )}

              <div className="flex flex-wrap gap-1.5 mb-3">
                <PriorityBadge priority={task.priority} />
                {isOverdue(task.dueDate, task.status) && (
                  <span className="text-xs text-red-500 font-medium">Vencida</span>
                )}
              </div>

              <p className="text-xs text-gray-400 dark:text-gray-500 mb-3">
                {formatDate(task.dueDate)}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700">
                <div className="flex gap-1">
                  <button onClick={() => onView(task)} className="btn btn-sm btn-secondary" title="Ver">
                    <Eye size={14} />
                  </button>
                  <button onClick={() => onEdit(task)} className="btn btn-sm btn-secondary" title="Editar">
                    <Pencil size={14} />
                  </button>
                  <button onClick={() => onDelete(task)} className="btn btn-sm btn-secondary hover:!bg-red-50 hover:!text-red-600" title="Eliminar">
                    <Trash2 size={14} />
                  </button>
                </div>
                <div className="relative group">
                  <button className="btn btn-sm btn-primary text-xs">
                    Mover
                  </button>
                  <div className="absolute right-0 top-full mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 min-w-[150px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                    {statuses
                      .filter((s) => s !== status)
                      .map((s) => (
                        <button
                          key={s}
                          onClick={() => onStatusChange(task.id, s)}
                          className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          {s === "pending" ? "Mover a Pendiente" : s === "in_progress" ? "Mover a En progreso" : "Mover a Completada"}
                        </button>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
