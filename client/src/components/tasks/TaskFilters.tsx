import { Search } from "lucide-react";
import type { TaskFilters as TaskFiltersType } from "../../hooks/useTasks";

interface TaskFiltersProps {
  filters: TaskFiltersType;
  onChange: (filters: TaskFiltersType) => void;
}

export function TaskFilters({ filters, onChange }: TaskFiltersProps) {
  function update(key: keyof TaskFiltersType, value: string) {
    onChange({ ...filters, [key]: value });
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      <div className="relative flex-1">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar tareas..."
          value={filters.search}
          onChange={(e) => update("search", e.target.value)}
          className="input pl-9"
        />
      </div>
      <select
        value={filters.status}
        onChange={(e) => update("status", e.target.value)}
        className="input w-full sm:w-40"
      >
        <option value="">Todos los estados</option>
        <option value="pending">Pendiente</option>
        <option value="in_progress">En progreso</option>
        <option value="completed">Completada</option>
      </select>
      <select
        value={filters.priority}
        onChange={(e) => update("priority", e.target.value)}
        className="input w-full sm:w-40"
      >
        <option value="">Todas las prioridades</option>
        <option value="high">Alta</option>
        <option value="medium">Media</option>
        <option value="low">Baja</option>
      </select>
      <select
        value={`${filters.sortBy}-${filters.order}`}
        onChange={(e) => {
          const [sortBy, order] = e.target.value.split("-");
          onChange({ ...filters, sortBy, order });
        }}
        className="input w-full sm:w-44"
      >
        <option value="createdAt-desc">Más recientes</option>
        <option value="createdAt-asc">Más antiguas</option>
        <option value="dueDate-asc">Fecha límite (asc)</option>
        <option value="dueDate-desc">Fecha límite (desc)</option>
        <option value="title-asc">Título A-Z</option>
        <option value="title-desc">Título Z-A</option>
      </select>
    </div>
  );
}
