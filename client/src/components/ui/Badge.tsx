import type { TaskStatus, TaskPriority } from "../../../../shared/task.types";

const statusConfig: Record<TaskStatus, { label: string; classes: string }> = {
  pending: { label: "Pendiente", classes: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400" },
  in_progress: { label: "En progreso", classes: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" },
  completed: { label: "Completada", classes: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" },
};

const priorityConfig: Record<TaskPriority, { label: string; classes: string }> = {
  high: { label: "Alta", classes: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" },
  medium: { label: "Media", classes: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400" },
  low: { label: "Baja", classes: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" },
};

export function StatusBadge({ status }: { status: TaskStatus }) {
  const config = statusConfig[status];
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.classes}`}>
      {config.label}
    </span>
  );
}

export function PriorityBadge({ priority }: { priority: TaskPriority }) {
  const config = priorityConfig[priority];
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.classes}`}>
      {config.label}
    </span>
  );
}
