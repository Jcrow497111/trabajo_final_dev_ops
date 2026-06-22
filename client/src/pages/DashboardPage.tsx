import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ListTodo,
  Clock,
  PlayCircle,
  CheckCircle2,
  AlertTriangle,
  Plus,
  TrendingUp,
} from "lucide-react";
import { useTaskStats } from "../hooks/useTaskStats";
import { useTasks } from "../hooks/useTasks";
import { formatDate, isOverdue } from "../lib/utils";
import { LoadingSpinner } from "../components/ui/Loading";
import { Modal } from "../components/ui/Modal";
import { TaskForm } from "../components/tasks/TaskForm";
import { StatusBadge, PriorityBadge } from "../components/ui/Badge";
import type { CreateTaskInput } from "../../../shared/task.types";

export default function DashboardPage() {
  const navigate = useNavigate();
  const { stats, loading: statsLoading } = useTaskStats();
  const { tasks, loading: tasksLoading, createTask } = useTasks();
  const [showCreate, setShowCreate] = useState(false);

  const recentTasks = tasks.slice(0, 5);
  const upcomingTasks = tasks
    .filter((t) => t.status !== "completed")
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 5);

  const statCards = [
    { label: "Total", value: stats?.total ?? 0, icon: ListTodo, color: "text-primary-600 bg-primary-100 dark:bg-primary-900/30" },
    { label: "Pendientes", value: stats?.pending ?? 0, icon: Clock, color: "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30" },
    { label: "En progreso", value: stats?.inProgress ?? 0, icon: PlayCircle, color: "text-blue-600 bg-blue-100 dark:bg-blue-900/30" },
    { label: "Completadas", value: stats?.completed ?? 0, icon: CheckCircle2, color: "text-green-600 bg-green-100 dark:bg-green-900/30" },
    { label: "Vencidas", value: stats?.overdue ?? 0, icon: AlertTriangle, color: "text-red-600 bg-red-100 dark:bg-red-900/30" },
  ];

  async function handleCreate(data: CreateTaskInput) {
    await createTask(data);
    setShowCreate(false);
  }

  if (statsLoading && tasksLoading) return <LoadingSpinner />;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Bienvenido al panel de control de tareas
          </p>
        </div>
        <button onClick={() => setShowCreate(true)} className="btn btn-primary">
          <Plus size={18} />
          Nueva tarea
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {statCards.map((card) => (
          <div key={card.label} className="card p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{card.label}</span>
              <div className={`p-1.5 rounded-lg ${card.color}`}>
                <card.icon size={16} />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      {stats && stats.total > 0 && (
        <div className="card p-6 mb-8">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <TrendingUp size={18} className="text-primary-600" />
              <span className="font-semibold text-gray-900 dark:text-gray-100">Progreso general</span>
            </div>
            <span className="text-2xl font-bold text-primary-600">{stats.completionRate}%</span>
          </div>
          <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary-500 to-indigo-600 rounded-full transition-all duration-500"
              style={{ width: `${stats.completionRate}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            {stats.completed} de {stats.total} tareas completadas
          </p>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Tasks */}
        <div className="card">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900 dark:text-gray-100">Últimas tareas</h2>
            <button onClick={() => navigate("/app/tasks")} className="text-sm text-primary-600 hover:text-primary-700 font-medium">
              Ver todas
            </button>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {recentTasks.length === 0 ? (
              <p className="p-6 text-sm text-gray-400 text-center">No hay tareas todavía</p>
            ) : (
              recentTasks.map((task) => (
                <div key={task.id} className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{task.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{formatDate(task.createdAt)}</p>
                  </div>
                  <StatusBadge status={task.status} />
                </div>
              ))
            )}
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="card">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900 dark:text-gray-100">Próximas a vencer</h2>
            <span className="text-xs text-gray-500">{upcomingTasks.length} tareas</span>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {upcomingTasks.length === 0 ? (
              <p className="p-6 text-sm text-gray-400 text-center">No hay tareas pendientes</p>
            ) : (
              upcomingTasks.map((task) => (
                <div key={task.id} className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{task.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-xs ${isOverdue(task.dueDate, task.status) ? "text-red-500 font-medium" : "text-gray-500"}`}>
                        {formatDate(task.dueDate)}
                      </span>
                      <PriorityBadge priority={task.priority} />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <Modal open={showCreate} onClose={() => setShowCreate(false)} title="Nueva tarea">
        <TaskForm onSave={handleCreate} onCancel={() => setShowCreate(false)} />
      </Modal>
    </div>
  );
}
