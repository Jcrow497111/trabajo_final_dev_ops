import { describe, it, expect } from "vitest";
import { createTaskSchema, updateTaskSchema, changeStatusSchema } from "../../../shared/task.schema";

describe("createTaskSchema", () => {
  it("valida una tarea correcta", () => {
    const result = createTaskSchema.safeParse({
      title: "Tarea válida",
      status: "pending",
      priority: "medium",
      dueDate: "2026-12-31",
    });
    expect(result.success).toBe(true);
  });

  it("rechaza título vacío", () => {
    const result = createTaskSchema.safeParse({
      title: "",
      status: "pending",
      priority: "medium",
      dueDate: "2026-12-31",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("El título es obligatorio");
    }
  });

  it("rechaza estado inválido", () => {
    const result = createTaskSchema.safeParse({
      title: "Tarea",
      status: "invalid_status",
      priority: "medium",
      dueDate: "2026-12-31",
    });
    expect(result.success).toBe(false);
  });

  it("rechaza prioridad inválida", () => {
    const result = createTaskSchema.safeParse({
      title: "Tarea",
      status: "pending",
      priority: "urgent",
      dueDate: "2026-12-31",
    });
    expect(result.success).toBe(false);
  });

  it("rechaza fecha límite vacía", () => {
    const result = createTaskSchema.safeParse({
      title: "Tarea sin fecha",
      status: "pending",
      priority: "low",
      dueDate: "",
    });
    expect(result.success).toBe(false);
  });

  it("acepta descripción opcional", () => {
    const result = createTaskSchema.safeParse({
      title: "Tarea",
      status: "pending",
      priority: "high",
      dueDate: "2026-12-31",
    });
    expect(result.success).toBe(true);
  });

  it("acepta descripción null", () => {
    const result = createTaskSchema.safeParse({
      title: "Tarea",
      description: null,
      status: "pending",
      priority: "low",
      dueDate: "2026-12-31",
    });
    expect(result.success).toBe(true);
  });
});

describe("updateTaskSchema", () => {
  it("valida una actualización correcta", () => {
    const result = updateTaskSchema.safeParse({
      title: "Tarea actualizada",
      status: "completed",
      priority: "high",
      dueDate: "2026-12-31",
    });
    expect(result.success).toBe(true);
  });

  it("rechaza título vacío en actualización", () => {
    const result = updateTaskSchema.safeParse({
      title: "",
      status: "pending",
      priority: "medium",
      dueDate: "2026-12-31",
    });
    expect(result.success).toBe(false);
  });
});

describe("changeStatusSchema", () => {
  it("valida estado pendiente", () => {
    const result = changeStatusSchema.safeParse({ status: "pending" });
    expect(result.success).toBe(true);
  });

  it("valida estado en progreso", () => {
    const result = changeStatusSchema.safeParse({ status: "in_progress" });
    expect(result.success).toBe(true);
  });

  it("valida estado completada", () => {
    const result = changeStatusSchema.safeParse({ status: "completed" });
    expect(result.success).toBe(true);
  });

  it("rechaza estado inválido", () => {
    const result = changeStatusSchema.safeParse({ status: "invalid" });
    expect(result.success).toBe(false);
  });
});
