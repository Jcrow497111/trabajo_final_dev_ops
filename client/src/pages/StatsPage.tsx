import {
  BarChart3,
  ListTodo,
  Clock,
  PlayCircle,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";
import { useTaskStats } from "../hooks/useTaskStats";
import { useTasks } from "../hooks/useTasks";
import { LoadingSpinner } from "../components/ui/Loading";
import { formatDate, isOverdue } from "../lib/utils";
import { StatusBadge, PriorityBadge } from "../components/ui/Badge";
import type { TaskStatus, TaskPriority } from "../../../shared/task.types";

export default function StatsPage() {
  const { stats, loading: statsLoading } = useTaskStats();
  const { tasks, loading: tasksLoading } = useTasks();

  if (statsLoading || tasksLoading) return <LoadingSpinner />;
  if (!stats) return null;

  const statusCounts: Record<TaskStatus, number> = {
    pending: tasks.filter((t) => t.status === "pending").length,
    in_progress: tasks.filter((t) => t.status === "in_progress").length,
    completed: tasks.filter((t) => t.status === "completed").length,
  };

  const priorityCounts: Record<TaskPriority, number> = {
    high: tasks.filter((t) => t.priority === "high").length,
    medium: tasks.filter((t) => t.priority === "medium").length,
    low: tasks.filter((t) => t.priority === "low").length,
  };

  const maxStatus = Math.max(...Object.values(statusCounts), 1);
  const maxPriority = Math.max(...Object.values(priorityCounts), 1);

  const now = new Date().toISOString().split("T")[0];
  const overdueTasks = tasks.filter((t) => t.dueDate < now && t.status !== "completed");
  const upcomingTasks = tasks
    .filter((t) => t.dueDate >= now && t.status !== "completed")
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 5);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Estadísticas</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Resumen completo del estado de tus tareas
        </p>
      </div>

      {/* Main stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <div className="card p-4">
          <div className="flex items-center gap-2 text-primary-600 mb-2">
            <ListTodo size={18} />
            <span className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Total</span>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{stats.total}</p>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-2 text-yellow-600 mb-2">
            <Clock size={18} />
            <span className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Pendientes</span>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{stats.pending}</p>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-2 text-blue-600 mb-2">
            <PlayCircle size={18} />
            <span className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">En progreso</span>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{stats.inProgress}</p>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-2 text-green-600 mb-2">
            <CheckCircle2 size={18} />
            <span className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Completadas</span>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{stats.completed}</p>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-2 text-red-600 mb-2">
            <AlertTriangle size={18} />
            <span className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Vencidas</span>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{stats.overdue}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Completion rate */}
        <div className="card p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={20} className="text-primary-600" />
            <h2 className="font-semibold text-gray-900 dark:text-gray-100">Porcentaje completado</h2>
          </div>
          <div className="flex items-end gap-4">
            <span className="text-5xl font-bold text-primary-600">{stats.completionRate}%</span>
            <div className="flex-1 h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary-500 to-indigo-600 rounded-full transition-all duration-500"
                style={{ width: `${stats.completionRate}%` }}
              />
            </div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            {stats.completed} de {stats.total} tareas completadas
          </p>
        </div>

        {/* Priority distribution */}
        <div className="card p-6">
          <h2 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Tareas por prioridad</h2>
          <div className="space-y-3">
            {(["high", "medium", "low"] as TaskPriority[]).map((p) => {
              const count = priorityCounts[p];
              const pct = (count / maxPriority) * 100;
              const labels: Record<TaskPriority, string> = { high: "Alta", medium: "Media", low: "Baja" };
              const colors: Record<TaskPriority, string> = {
                high: "bg-red-500",
                medium: "bg-orange-500",
                low: "bg-green-500",
              };
              return (
                <div key={p}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <PriorityBadge priority={p} />
                    <span className="font-medium text-gray-700 dark:text-gray-300">{count}</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className={`h-full ${colors[p]} rounded-full transition-all duration-500`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Status distribution */}
        <div className="card p-6">
          <h2 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Tareas por estado</h2>
          <div className="space-y-3">
            {(["pending", "in_progress", "completed"] as TaskStatus[]).map((s) => {
              const count = statusCounts[s];
              const pct = (count / maxStatus) * 100;
              const labels: Record<TaskStatus, string> = {
                pending: "Pendiente",
                in_progress: "En progreso",
                completed: "Completada",
              };
              const colors: Record<TaskStatus, string> = {
                pending: "bg-yellow-500",
                in_progress: "bg-blue-500",
                completed: "bg-green-500",
              };
              return (
                <div key={s}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-400">{labels[s]}</span>
                    <span className="font-medium text-gray-700 dark:text-gray-300">{count}</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className={`h-full ${colors[s]} rounded-full transition-all duration-500`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Overdue & upcoming */}
        <div className="card p-6">
          <h2 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Tareas vencidas ({overdueTasks.length})
          </h2>
          {overdueTasks.length === 0 ? (
            <p className="text-sm text-gray-400">No hay tareas vencidas</p>
          ) : (
            <div className="space-y-2">
              {overdueTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-2 rounded-lg bg-red-50 dark:bg-red-900/10">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{task.title}</p>
                    <p className="text-xs text-red-500">{formatDate(task.dueDate)}</p>
                  </div>
                  <StatusBadge status={task.status} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Upcoming */}
        <div className="card p-6">
          <h2 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Próximas a vencer
          </h2>
          {upcomingTasks.length === 0 ? (
            <p className="text-sm text-gray-400">No hay tareas próximas</p>
          ) : (
            <div className="space-y-2">
              {upcomingTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{task.title}</p>
                    <p className="text-xs text-gray-500">{formatDate(task.dueDate)}</p>
                  </div>
                  <PriorityBadge priority={task.priority} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
