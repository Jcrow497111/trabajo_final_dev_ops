import { ListTodo, Database, ArrowRight, Server, Globe, Shield, Users } from "lucide-react";

const team = [
  { name: "José", role: "Backend Developer" },
  { name: "Andrés", role: "DevOps Engineer" },
  { name: "Isaac", role: "QA Engineer" },
  { name: "Jeferson", role: "Product Manager" },
];

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Acerca del proyecto</h1>
        <p className="text-sm text-gray-500 mt-1">
          Información general del sistema TaskFlow
        </p>
      </div>

      {/* System Name */}
      <div className="card p-8 mb-6 text-center">
        <div className="mx-auto w-14 h-14 rounded-xl bg-primary-600 flex items-center justify-center mb-4">
          <ListTodo size={28} className="text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">TaskFlow</h2>
        <p className="text-gray-500 mt-2">
          Sistema de gestión de tareas para equipos de trabajo
        </p>
      </div>

      {/* Objective */}
      <div className="card p-6 mb-6">
        <h3 className="font-semibold text-gray-900 mb-3">Objetivo</h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          Crear una aplicación web profesional para la gestión de tareas de equipos de trabajo,
          permitiendo centralizar actividades, controlar estados, priorizar tareas y consultar
          métricas de rendimiento, todo con persistencia de datos en Turso.
        </p>
      </div>

      {/* Features */}
      <div className="card p-6 mb-6">
        <h3 className="font-semibold text-gray-900 mb-3">Funcionalidades principales</h3>
        <ul className="space-y-2">
          {[
            "Landing page pública con información del sistema",
            "Autenticación de usuarios",
            "CRUD completo de tareas (crear, leer, editar, eliminar)",
            "Tablero Kanban con columnas por estado",
            "Estadísticas y métricas de rendimiento",
            "Filtros y búsqueda de tareas",
            "Diseño responsive",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
              <ArrowRight size={16} className="text-primary-500 mt-0.5 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Tech Stack */}
      <div className="card p-6 mb-6">
        <h3 className="font-semibold text-gray-900 mb-4">Tecnologías utilizadas</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { icon: Globe, name: "React + Vite", desc: "Frontend moderno con TypeScript" },
            { icon: Server, name: "Bun + Hono", desc: "Backend rápido y ligero" },
            { icon: Database, name: "Turso", desc: "Base de datos SQLite distribuida" },
            { icon: Shield, name: "Drizzle ORM", desc: "ORM moderno y tipado" },
            { icon: ListTodo, name: "Tailwind CSS", desc: "Estilos utilitarios" },
            { icon: Users, name: "Lucide React", desc: "Iconos profesionales" },
          ].map((tech, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
              <div className="p-2 rounded-lg bg-primary-100">
                <tech.icon size={18} className="text-primary-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{tech.name}</p>
                <p className="text-xs text-gray-500">{tech.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Architecture */}
      <div className="card p-6 mb-6">
        <h3 className="font-semibold text-gray-900 mb-4">Arquitectura</h3>
        <div className="flex flex-wrap items-center gap-2 justify-center p-6 bg-gray-50 rounded-xl">
          {["React", "API Hono", "Drizzle ORM", "Turso"].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="px-4 py-2 rounded-lg bg-primary-100 text-primary-700 font-medium text-sm">
                {item}
              </span>
              {i < 3 && <ArrowRight size={18} className="text-gray-400" />}
            </div>
          ))}
        </div>
        <p className="text-sm text-center text-gray-500 mt-3">
          Arquitectura full-stack con frontend React, backend Hono y persistencia en Turso
        </p>
      </div>

      {/* Database */}
      <div className="card p-6 mb-6">
        <h3 className="font-semibold text-gray-900 mb-3">Base de datos Turso</h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          Turso es una base de datos SQLite distribuida globalmente, diseñada para aplicaciones
          modernas que requieren baja latencia y alta disponibilidad. En este proyecto, Turso
          se utiliza para almacenar y gestionar todas las tareas del sistema, aprovechando
          la sintaxis familiar de SQL combinada con la escalabilidad de una plataforma cloud nativa.
        </p>
      </div>

      {/* Team */}
      <div className="card p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Equipo de trabajo</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {team.map((member) => (
            <div key={member.name} className="p-4 rounded-lg bg-gray-50 text-center">
              <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-2">
                <span className="text-primary-700 font-bold text-sm">
                  {member.name.charAt(0)}
                </span>
              </div>
              <p className="font-medium text-gray-900 text-sm">{member.name}</p>
              <p className="text-xs text-gray-500">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
