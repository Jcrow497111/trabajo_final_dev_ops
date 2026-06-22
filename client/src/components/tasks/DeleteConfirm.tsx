import { AlertTriangle } from "lucide-react";

interface DeleteConfirmProps {
  taskTitle: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteConfirm({ taskTitle, onConfirm, onCancel }: DeleteConfirmProps) {
  return (
    <div className="text-center">
      <div className="mx-auto w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mb-4">
        <AlertTriangle size={24} className="text-red-600" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Eliminar tarea</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
        Esta acción no se puede deshacer.
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        ¿Deseas eliminar <strong className="text-gray-700 dark:text-gray-300">"{taskTitle}"</strong>?
      </p>
      <div className="flex justify-center gap-3">
        <button onClick={onCancel} className="btn btn-secondary">Cancelar</button>
        <button onClick={onConfirm} className="btn btn-danger">Eliminar</button>
      </div>
    </div>
  );
}
