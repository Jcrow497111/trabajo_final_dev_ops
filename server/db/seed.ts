import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { eq } from "drizzle-orm";
import * as schema from "./schema";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

const seedDb = drizzle(client, { schema });

const tareasIniciales = [
  {
    title: "Diseñar interfaz del sistema",
    description: "Crear los mockups y prototipos de la interfaz de usuario para el gestor de tareas",
    status: "completed" as const,
    priority: "high" as const,
    dueDate: "2026-01-15",
  },
  {
    title: "Configurar base de datos Turso",
    description: "Instalar y configurar la base de datos Turso con Drizzle ORM",
    status: "completed" as const,
    priority: "high" as const,
    dueDate: "2026-01-10",
  },
  {
    title: "Implementar CRUD de tareas",
    description: "Desarrollar las operaciones de crear, leer, actualizar y eliminar tareas",
    status: "in_progress" as const,
    priority: "high" as const,
    dueDate: "2026-02-01",
  },
  {
    title: "Crear tablero Kanban",
    description: "Implementar la vista Kanban con columnas de pendiente, en progreso y completada",
    status: "pending" as const,
    priority: "medium" as const,
    dueDate: "2026-02-15",
  },
  {
    title: "Preparar validaciones del formulario",
    description: "Agregar validaciones completas a los formularios de creación y edición de tareas",
    status: "pending" as const,
    priority: "medium" as const,
    dueDate: "2026-02-20",
  },
  {
    title: "Revisar presentación final",
    description: "Verificar que todos los módulos funcionan correctamente antes de la presentación",
    status: "pending" as const,
    priority: "low" as const,
    dueDate: "2026-03-01",
  },
];

async function seed() {
  const existing = await seedDb.select().from(schema.tasks).limit(1);

  if (existing.length > 0) {
    console.log("La base de datos ya tiene tareas. Omitiendo seed.");
    return;
  }

  const now = new Date().toISOString();

  for (const tarea of tareasIniciales) {
    await seedDb.insert(schema.tasks).values({
      id: crypto.randomUUID(),
      title: tarea.title,
      description: tarea.description,
      status: tarea.status,
      priority: tarea.priority,
      dueDate: tarea.dueDate,
      createdAt: now,
      updatedAt: now,
    });
  }

  console.log(`✅ ${tareasIniciales.length} tareas insertadas correctamente.`);
}

seed().catch((err) => {
  console.error("Error ejecutando seed:", err);
  process.exit(1);
});
