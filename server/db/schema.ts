import { sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull(),
  name: text("name").notNull(),
  passwordHash: text("password_hash").notNull(),
  sessionToken: text("session_token"),
  createdAt: text("created_at").notNull(),
}, (table) => ({
  emailIdx: uniqueIndex("email_idx").on(table.email),
}));

export const tasks = sqliteTable("tasks", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  status: text("status", { enum: ["pending", "in_progress", "completed"] }).notNull(),
  priority: text("priority", { enum: ["low", "medium", "high"] }).notNull(),
  dueDate: text("due_date").notNull(),
  userId: text("user_id"),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});
