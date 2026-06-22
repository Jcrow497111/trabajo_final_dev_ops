import { Eye, Pencil, Trash2, ChevronRight } from "lucide-react";
import type { Task } from "../../../../shared/task.types";
import { StatusBadge, PriorityBadge } from "../ui/Badge";
import { formatDate, isOverdue } from "../../lib/utils";

interface TaskTableProps {
  tasks: Task[];
  onView: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onStatusChange: (id: string, status: Task["status"]) => void;
}

export function TaskTable({ tasks, onView, onEdit, onDelete, onStatusChange }: TaskTableProps) {
  if (tasks.length === 0) return null;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Título</th>
            <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400 hidden md:table-cell">Estado</th>
            <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400 hidden md:table-cell">Prioridad</th>
            <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400 hidden lg:table-cell">Fecha límite</th>
            <th className="text-left py-3 px-4 font-medium text-gray-500 dark:text-gray-400 hidden lg:table-cell">Creada</th>
            <th className="text-right py-3 px-4 font-medium text-gray-500 dark:text-gray-400">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr
              key={task.id}
              className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            >
              <td className="py-3 px-4">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${
                    task.status === "completed" ? "bg-green-500" :
                    task.status === "in_progress" ? "bg-blue-500" : "bg-yellow-500"
                  }`} />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">{task.title}</p>
                    {isOverdue(task.dueDate, task.status) && (
                      <span className="text-xs text-red-500 font-medium">Vencida</span>
                    )}
                  </div>
                </div>
              </td>
              <td className="py-3 px-4 hidden md:table-cell">
                <StatusBadge status={task.status} />
              </td>
              <td className="py-3 px-4 hidden md:table-cell">
                <PriorityBadge priority={task.priority} />
              </td>
              <td className="py-3 px-4 hidden lg:table-cell text-gray-600 dark:text-gray-400">
                {formatDate(task.dueDate)}
              </td>
              <td className="py-3 px-4 hidden lg:table-cell text-gray-500 dark:text-gray-500 text-xs">
                {formatDate(task.createdAt)}
              </td>
              <td className="py-3 px-4">
                <div className="flex items-center justify-end gap-1">
                  <button onClick={() => onView(task)} className="btn btn-sm btn-secondary" title="Ver detalle">
                    <Eye size={14} />
                  </button>
                  <button onClick={() => onEdit(task)} className="btn btn-sm btn-secondary" title="Editar">
                    <Pencil size={14} />
                  </button>
                  <button onClick={() => onDelete(task)} className="btn btn-sm btn-secondary hover:!bg-red-50 hover:!text-red-600 dark:hover:!bg-red-900/20" title="Eliminar">
                    <Trash2 size={14} />
                  </button>
                  <div className="relative group">
                    <button className="btn btn-sm btn-secondary" title="Cambiar estado">
                      <ChevronRight size={14} />
                    </button>
                    <div className="absolute right-0 top-full mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 min-w-[160px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                      {(["pending", "in_progress", "completed"] as const).map((s) => (
                        <button
                          key={s}
                          onClick={() => onStatusChange(task.id, s)}
                          className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${
                            task.status === s ? "font-medium text-primary-600" : "text-gray-700 dark:text-gray-300"
                          }`}
                        >
                          {s === "pending" ? "Pendiente" : s === "in_progress" ? "En progreso" : "Completada"}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
