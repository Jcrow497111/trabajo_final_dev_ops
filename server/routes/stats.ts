import { Hono } from "hono";
import { eq, sql } from "drizzle-orm";
import { db, schema } from "../db";

const statsApi = new Hono();

statsApi.get("/", async (c) => {
  try {
    const allTasks = await db.select().from(schema.tasks);
    const total = allTasks.length;

    const pending = allTasks.filter((t) => t.status === "pending").length;
    const inProgress = allTasks.filter((t) => t.status === "in_progress").length;
    const completed = allTasks.filter((t) => t.status === "completed").length;

    const now = new Date().toISOString().split("T")[0];
    const overdue = allTasks.filter(
      (t) => t.dueDate < now && t.status !== "completed"
    ).length;

    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    return c.json({
      total,
      pending,
      inProgress,
      completed,
      overdue,
      completionRate,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return c.json({ error: "Error al obtener estadísticas" }, 500);
  }
});

export default statsApi;
