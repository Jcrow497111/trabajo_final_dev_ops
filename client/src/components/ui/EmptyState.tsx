import { Inbox } from "lucide-react";

interface EmptyStateProps {
  message?: string;
  description?: string;
}

export function EmptyState({ message = "No hay tareas", description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <Inbox size={48} className="text-gray-300 dark:text-gray-600 mb-4" />
      <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400">{message}</h3>
      {description && <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">{description}</p>}
    </div>
  );
}
