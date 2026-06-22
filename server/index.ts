import { Hono } from "hono";
import { cors } from "hono/cors";
import tasksApi from "./routes/tasks";
import statsApi from "./routes/stats";
import { client } from "./db";

const app = new Hono();

app.use("/api/*", cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  credentials: true,
}));

app.get("/api/health", async (c) => {
  try {
    await client.execute("SELECT 1");
    return c.json({ status: "ok", database: "connected" });
  } catch {
    return c.json({ status: "ok", database: "disconnected" }, 503);
  }
});

app.route("/api/tasks", tasksApi);
app.route("/api/stats", statsApi);

const port = parseInt(process.env.PORT || "3000");
console.log(`Servidor iniciado en http://localhost:${port}`);

export default {
  port,
  fetch: app.fetch,
};
