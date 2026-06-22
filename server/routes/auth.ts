import { Hono } from "hono";
import { eq } from "drizzle-orm";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { db, schema } from "../db";

const registerSchema = z.object({
  email: z.string().email("Correo inválido"),
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

const loginSchema = z.object({
  email: z.string().email("Correo inválido"),
  password: z.string().min(1, "La contraseña es obligatoria"),
});

const authApi = new Hono();

authApi.post("/register", async (c) => {
  try {
    const body = await c.req.json();
    const parsed = registerSchema.safeParse(body);
    if (!parsed.success) {
      return c.json({ error: "Datos inválidos", details: parsed.error.flatten() }, 400);
    }

    const existing = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.email, parsed.data.email))
      .limit(1);

    if (existing.length > 0) {
      return c.json({ error: "El correo ya está registrado" }, 409);
    }

    const id = crypto.randomUUID();
    const passwordHash = await bcrypt.hash(parsed.data.password, 10);
    const sessionToken = crypto.randomUUID();
    const now = new Date().toISOString();

    await db.insert(schema.users).values({
      id,
      email: parsed.data.email,
      name: parsed.data.name,
      passwordHash,
      sessionToken,
      createdAt: now,
    });

    return c.json({
      user: { id, email: parsed.data.email, name: parsed.data.name },
      token: sessionToken,
    }, 201);
  } catch (error) {
    console.error("Error registering user:", error);
    return c.json({ error: "Error al registrar usuario" }, 500);
  }
});

authApi.post("/login", async (c) => {
  try {
    const body = await c.req.json();
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      return c.json({ error: "Datos inválidos", details: parsed.error.flatten() }, 400);
    }

    const users = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.email, parsed.data.email))
      .limit(1);

    if (users.length === 0) {
      return c.json({ error: "Credenciales inválidas" }, 401);
    }

    const user = users[0];
    const valid = await bcrypt.compare(parsed.data.password, user.passwordHash);
    if (!valid) {
      return c.json({ error: "Credenciales inválidas" }, 401);
    }

    const sessionToken = crypto.randomUUID();
    await db
      .update(schema.users)
      .set({ sessionToken })
      .where(eq(schema.users.id, user.id));

    return c.json({
      user: { id: user.id, email: user.email, name: user.name },
      token: sessionToken,
    });
  } catch (error) {
    console.error("Error logging in:", error);
    return c.json({ error: "Error al iniciar sesión" }, 500);
  }
});

authApi.get("/me", async (c) => {
  try {
    const authHeader = c.req.header("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return c.json({ error: "No autorizado" }, 401);
    }

    const token = authHeader.slice(7);
    const users = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.sessionToken, token))
      .limit(1);

    if (users.length === 0) {
      return c.json({ error: "Sesión inválida" }, 401);
    }

    const user = users[0];
    return c.json({ id: user.id, email: user.email, name: user.name });
  } catch (error) {
    console.error("Error checking session:", error);
    return c.json({ error: "Error de autenticación" }, 500);
  }
});

authApi.post("/logout", async (c) => {
  try {
    const authHeader = c.req.header("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return c.json({ error: "No autorizado" }, 401);
    }

    const token = authHeader.slice(7);
    await db
      .update(schema.users)
      .set({ sessionToken: null })
      .where(eq(schema.users.sessionToken, token));

    return c.json({ message: "Sesión cerrada" });
  } catch (error) {
    console.error("Error logging out:", error);
    return c.json({ error: "Error al cerrar sesión" }, 500);
  }
});

export default authApi;
