import { z } from "zod";

const taskStatusEnum = z.enum(["pending", "in_progress", "completed"]);
const taskPriorityEnum = z.enum(["low", "medium", "high"]);

export const createTaskSchema = z.object({
  title: z.string().min(1, "El título es obligatorio"),
  description: z.string().nullable().optional(),
  status: taskStatusEnum,
  priority: taskPriorityEnum,
  dueDate: z.string().min(1, "La fecha límite es obligatoria"),
});

export const updateTaskSchema = z.object({
  title: z.string().min(1, "El título es obligatorio"),
  description: z.string().nullable().optional(),
  status: taskStatusEnum,
  priority: taskPriorityEnum,
  dueDate: z.string().min(1, "La fecha límite es obligatoria"),
});

export const changeStatusSchema = z.object({
  status: taskStatusEnum,
});
