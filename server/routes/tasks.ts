import { Hono } from "hono";
import { eq, like, or, sql } from "drizzle-orm";
import { db, schema } from "../db";
import {
  createTaskSchema,
  updateTaskSchema,
  changeStatusSchema,
} from "../../shared/task.schema";
import type { TaskStatus, TaskPriority } from "../../shared/task.types";

const tasksApi = new Hono();

tasksApi.get("/", async (c) => {
  try {
    const search = c.req.query("search")?.toLowerCase();
    const status = c.req.query("status");
    const priority = c.req.query("priority");
    const sortBy = c.req.query("sortBy") || "createdAt";
    const order = c.req.query("order") || "desc";

    const conditions = [];
    if (status) conditions.push(eq(schema.tasks.status, status as TaskStatus));
    if (priority) conditions.push(eq(schema.tasks.priority, priority as TaskPriority));
    if (search) {
      conditions.push(
        or(
          like(sql`lower(${schema.tasks.title})`, `%${search}%`),
          like(sql`lower(${schema.tasks.description})`, `%${search}%`)
        )
      );
    }

    const where = conditions.length > 0 ? conditions.reduce((a, b) => sql`${a} AND ${b}`) : undefined;

    const orderColumn = sortBy === "dueDate" ? schema.tasks.dueDate
      : sortBy === "title" ? schema.tasks.title
      : sortBy === "status" ? schema.tasks.status
      : sortBy === "priority" ? schema.tasks.priority
      : schema.tasks.createdAt;

    const orderFn = order === "asc" ? (col: any) => sql`${col} ASC` : (col: any) => sql`${col} DESC`;

    const result = await db
      .select()
      .from(schema.tasks)
      .where(where)
      .orderBy(orderFn(orderColumn));

    return c.json(result);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return c.json({ error: "Error al obtener tareas" }, 500);
  }
});

tasksApi.get("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const result = await db
      .select()
      .from(schema.tasks)
      .where(eq(schema.tasks.id, id))
      .limit(1);

    if (result.length === 0) return c.json({ error: "Tarea no encontrada" }, 404);
    return c.json(result[0]);
  } catch (error) {
    console.error("Error fetching task:", error);
    return c.json({ error: "Error al obtener la tarea" }, 500);
  }
});

tasksApi.post("/", async (c) => {
  try {
    const body = await c.req.json();
    const parsed = createTaskSchema.safeParse(body);
    if (!parsed.success) {
      return c.json({ error: "Datos inválidos", details: parsed.error.flatten() }, 400);
    }

    const now = new Date().toISOString();
    const id = crypto.randomUUID();

    await db.insert(schema.tasks).values({
      id,
      title: parsed.data.title,
      description: parsed.data.description ?? null,
      status: parsed.data.status,
      priority: parsed.data.priority,
      dueDate: parsed.data.dueDate,
      createdAt: now,
      updatedAt: now,
    });

    const created = await db
      .select()
      .from(schema.tasks)
      .where(eq(schema.tasks.id, id))
      .limit(1);

    return c.json(created[0], 201);
  } catch (error) {
    console.error("Error creating task:", error);
    return c.json({ error: "Error al crear la tarea" }, 500);
  }
});

tasksApi.put("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const parsed = updateTaskSchema.safeParse(body);
    if (!parsed.success) {
      return c.json({ error: "Datos inválidos", details: parsed.error.flatten() }, 400);
    }

    const existing = await db
      .select()
      .from(schema.tasks)
      .where(eq(schema.tasks.id, id))
      .limit(1);
    if (existing.length === 0) return c.json({ error: "Tarea no encontrada" }, 404);

    const now = new Date().toISOString();
    await db
      .update(schema.tasks)
      .set({
        title: parsed.data.title,
        description: parsed.data.description ?? null,
        status: parsed.data.status,
        priority: parsed.data.priority,
        dueDate: parsed.data.dueDate,
        updatedAt: now,
      })
      .where(eq(schema.tasks.id, id));

    const updated = await db
      .select()
      .from(schema.tasks)
      .where(eq(schema.tasks.id, id))
      .limit(1);

    return c.json(updated[0]);
  } catch (error) {
    console.error("Error updating task:", error);
    return c.json({ error: "Error al actualizar la tarea" }, 500);
  }
});

tasksApi.patch("/:id/status", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const parsed = changeStatusSchema.safeParse(body);
    if (!parsed.success) {
      return c.json({ error: "Estado inválido", details: parsed.error.flatten() }, 400);
    }

    const existing = await db
      .select()
      .from(schema.tasks)
      .where(eq(schema.tasks.id, id))
      .limit(1);
    if (existing.length === 0) return c.json({ error: "Tarea no encontrada" }, 404);

    const now = new Date().toISOString();
    await db
      .update(schema.tasks)
      .set({ status: parsed.data.status, updatedAt: now })
      .where(eq(schema.tasks.id, id));

    const updated = await db
      .select()
      .from(schema.tasks)
      .where(eq(schema.tasks.id, id))
      .limit(1);

    return c.json(updated[0]);
  } catch (error) {
    console.error("Error changing status:", error);
    return c.json({ error: "Error al cambiar el estado" }, 500);
  }
});

tasksApi.delete("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const existing = await db
      .select()
      .from(schema.tasks)
      .where(eq(schema.tasks.id, id))
      .limit(1);
    if (existing.length === 0) return c.json({ error: "Tarea no encontrada" }, 404);

    await db.delete(schema.tasks).where(eq(schema.tasks.id, id));
    return c.json({ message: "Tarea eliminada correctamente" });
  } catch (error) {
    console.error("Error deleting task:", error);
    return c.json({ error: "Error al eliminar la tarea" }, 500);
  }
});

export default tasksApi;
