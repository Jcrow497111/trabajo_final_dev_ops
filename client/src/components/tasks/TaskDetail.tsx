import { Calendar, Clock, AlertTriangle } from "lucide-react";
import type { Task } from "../../../../shared/task.types";
import { StatusBadge, PriorityBadge } from "../ui/Badge";
import { formatDate, formatDateTime, isOverdue } from "../../lib/utils";

interface TaskDetailProps {
  task: Task;
  onEdit: () => void;
  onClose: () => void;
}

export function TaskDetail({ task, onEdit, onClose }: TaskDetailProps) {
  const overdue = isOverdue(task.dueDate, task.status);

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{task.title}</h3>
        {overdue && (
          <div className="flex items-center gap-1.5 mt-2 text-red-500 bg-red-50 dark:bg-red-900/20 px-3 py-1.5 rounded-lg text-sm font-medium">
            <AlertTriangle size={16} />
            <span>Esta tarea está vencida</span>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        <StatusBadge status={task.status} />
        <PriorityBadge priority={task.priority} />
      </div>

      {task.description && (
        <div>
          <p className="label">Descripción</p>
          <p className="text-gray-600 dark:text-gray-400 text-sm whitespace-pre-wrap">{task.description}</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
          <Calendar size={16} />
          <span>Fecha límite: <strong className="text-gray-700 dark:text-gray-300">{formatDate(task.dueDate)}</strong></span>
        </div>
        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
          <Clock size={16} />
          <span>Creada: <strong className="text-gray-700 dark:text-gray-300">{formatDateTime(task.createdAt)}</strong></span>
        </div>
      </div>

      <p className="text-xs text-gray-400 dark:text-gray-500">
        Última actualización: {formatDateTime(task.updatedAt)}
      </p>

      <div className="flex justify-end gap-3 pt-2 border-t border-gray-200 dark:border-gray-700">
        <button onClick={onClose} className="btn btn-secondary">Cerrar</button>
        <button onClick={onEdit} className="btn btn-primary">Editar tarea</button>
      </div>
    </div>
  );
}
