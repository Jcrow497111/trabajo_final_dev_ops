import { useNavigate } from "react-router-dom";
import {
  ListTodo, ArrowRight, CheckCircle2, BarChart3, Columns3,
  Filter, Pencil, Trash2, Users, Zap, Clock, Sparkles
} from "lucide-react";

const features = [
  { icon: ListTodo, title: "Crear y organizar", desc: "Registra tareas con título, descripción, prioridad y fecha límite." },
  { icon: Columns3, title: "Tablero Kanban", desc: "Visualiza el flujo de trabajo por columnas y mueve tareas con un clic." },
  { icon: BarChart3, title: "Estadísticas en vivo", desc: "Métrica de avance, tareas vencidas y tasa de finalización." },
  { icon: Filter, title: "Búsqueda y filtros", desc: "Encuentra cualquier tarea por estado, prioridad o palabra clave." },
  { icon: Pencil, title: "Edición rápida", desc: "Actualiza cualquier detalle sin perder el contexto." },
  { icon: Zap, title: "Actualización en tiempo real", desc: "Los cambios se reflejan al instante en toda la aplicación." },
];

export default function LandingPage() {
  const navigate = useNavigate();

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
                <ListTodo size={18} className="text-white" />
              </div>
              <span className="font-bold text-xl text-gray-900 dark:text-gray-100">TaskFlow</span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <button onClick={() => scrollTo("features")} className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">Funcionalidades</button>
              <button onClick={() => scrollTo("pricing")} className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">Precios</button>
              <button onClick={() => navigate("/login")} className="text-sm font-medium text-primary-600 hover:text-primary-700">Iniciar sesión</button>
            </nav>
            <button onClick={() => navigate("/login")} className="btn btn-primary hidden sm:inline-flex">
              Comenzar gratis
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-indigo-100 dark:from-gray-900 dark:to-gray-950" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 text-sm font-medium mb-6">
              <Sparkles size={14} />
              La forma más simple de gestionar tu equipo
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-gray-100 leading-tight mb-6">
              Organiza, prioriza y completa tus tareas en equipo
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
              Una plataforma sencilla pero poderosa para gestionar proyectos,
              asignar tareas y dar seguimiento al progreso de tu equipo.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={() => navigate("/login")} className="btn btn-primary text-base px-8 py-3">
                Comenzar ahora <ArrowRight size={18} />
              </button>
              <button onClick={() => scrollTo("features")} className="btn btn-secondary text-base px-8 py-3">
                Ver funcionalidades
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "10k+", label: "Tareas gestionadas" },
              { value: "500+", label: "Equipos activos" },
              { value: "99.9%", label: "Uptime" },
              { value: "4.9★", label: "Valoración" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{s.value}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Todo lo que necesitas para gestionar tareas
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              Herramientas simples pero efectivas para mantener a tu equipo alineado y productivo.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <div key={i} className="card p-6 hover:shadow-lg transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4">
                  <f.icon size={20} className="text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Cómo funciona
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              Tres pasos para transformar la forma en que tu equipo trabaja.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Crea tareas", desc: "Añade tareas con detalles, prioridad y fecha límite en segundos.", icon: ListTodo },
              { step: "2", title: "Organiza el flujo", desc: "Arrastra tareas entre columnas: Pendiente, En progreso, Completada.", icon: Columns3 },
              { step: "3", title: "Da seguimiento", desc: "Revisa estadísticas, identifica cuellos de botella y celebra avances.", icon: BarChart3 },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-14 h-14 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mx-auto mb-4">
                  <item.icon size={24} className="text-primary-600 dark:text-primary-400" />
                </div>
                <div className="w-8 h-8 rounded-full bg-primary-600 text-white text-sm font-bold flex items-center justify-center mx-auto mb-3">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs mx-auto">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Precios simples
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              Sin sorpresas. Sin compromisos. Empieza gratis y escala cuando lo necesites.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Gratis", price: "$0", desc: "Para empezar",
                items: ["Hasta 10 tareas activas", "Tablero Kanban", "Estadísticas básicas", "Soporte por email"],
              },
              {
                name: "Pro", price: "$9", desc: "/mes por usuario", popular: true,
                items: ["Tareas ilimitadas", "Prioridades y etiquetas", "Exportación de datos", "Soporte prioritario", "API access"],
              },
              {
                name: "Empresa", price: "$29", desc: "/mes por usuario",
                items: ["Todo lo de Pro", "Roles y permisos", "Auditoría de cambios", "SSO", "Soporte dedicado"],
              },
            ].map((plan) => (
              <div key={plan.name} className={`card p-6 ${plan.popular ? "ring-2 ring-primary-500 relative" : ""}`}>
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary-600 text-white text-xs font-semibold px-4 py-1 rounded-full">
                    Más popular
                  </span>
                )}
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{plan.name}</h3>
                <div className="mt-3 mb-4">
                  <span className="text-3xl font-bold text-gray-900 dark:text-gray-100">{plan.price}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{plan.desc}</span>
                </div>
                <ul className="space-y-2 mb-6">
                  {plan.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <CheckCircle2 size={14} className="text-green-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <button onClick={() => navigate("/login")} className={`w-full btn ${plan.popular ? "btn-primary" : "btn-secondary"}`}>
                  {plan.name === "Gratis" ? "Comenzar gratis" : "Suscribirse"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="card p-12 bg-gradient-to-br from-primary-600 to-indigo-700 border-0">
            <h2 className="text-3xl font-bold text-white mb-4">
              Empieza a organizar tu trabajo hoy
            </h2>
            <p className="text-primary-100 mb-8 max-w-lg mx-auto">
              Únete a los equipos que ya confían en TaskFlow para gestionar sus proyectos.
            </p>
            <button onClick={() => navigate("/login")} className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-white text-primary-700 font-semibold hover:bg-gray-100 transition-colors">
              Crear cuenta gratis <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <ListTodo size={16} className="text-primary-600" />
              <span className="font-semibold text-gray-800 dark:text-gray-200">TaskFlow</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
              <span>© 2026 TaskFlow</span>
              <button className="hover:text-gray-700 dark:hover:text-gray-300">Términos</button>
              <button className="hover:text-gray-700 dark:hover:text-gray-300">Privacidad</button>
              <button className="hover:text-gray-700 dark:hover:text-gray-300">Contacto</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
