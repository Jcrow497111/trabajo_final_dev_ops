# TaskFlow — Gestión de Tareas

Aplicación web full-stack de gestión de tareas con React + Hono + Turso.

## Tecnologías

| Tecnología | Propósito |
|------------|-----------|
| React 18 | Interfaz de usuario |
| TypeScript | Tipado estático |
| Vite | Build y dev server |
| Bun / Node.js | Runtime (compatible con ambos) |
| Hono | Backend API REST |
| Turso (libSQL) | Base de datos SQLite distribuida |
| Drizzle ORM | ORM tipado |
| Tailwind CSS | Estilos |
| Docker + Nginx | Contenedor multi-etapa + proxy reverso |
| GitHub Actions | Integración continua |

## Requisitos

- [Bun](https://bun.sh) (recomendado) o Node.js 18+
- Docker (para producción)

## Variables de Entorno

| Archivo | Propósito |
|---------|-----------|
| `.env` (raíz) | TURSO_DATABASE_URL y TURSO_AUTH_TOKEN para el servidor |
| `client/.env` | VITE_API_URL para el cliente en desarrollo |
| `client/.env.production` | VITE_API_URL para build de producción |

### Desarrollo

```bash
# Clonar e instalar
git clone <repo>
cd task-manager-devops-vv
bun install

# Iniciar (Bun o npm)
bun run dev
# o
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000/api/health`

### Producción (Docker)

```bash
# Exportar credenciales Turso
export TURSO_DATABASE_URL=libsql://...
export TURSO_AUTH_TOKEN=eyJ...

# Iniciar
docker compose up --build
```

Aplicación en `http://localhost:8080`.

### Build manual

```bash
bun run build       # Genera client/dist/
```

## Validación

```bash
bun run typecheck   # TypeScript
```

## Docker

```bash
docker compose up --build
```

Dos servicios:
- **api** — Backend Hono (puerto 3000)
- **web** — Nginx con frontend estático + proxy `/api/` al backend (puerto 8080)

## Estructura

```
task-manager-devops-vv/
├── .github/workflows/     # Pipeline CI
├── client/                 # Frontend React (Vite)
│   └── src/
│       ├── components/     # Componentes UI
│       ├── pages/          # Páginas (Login, Register, Dashboard, etc.)
│       ├── context/        # AuthContext, ThemeContext, ToastContext
│       └── services/       # API client
├── server/                 # Backend Hono
│   ├── db/                 # Schema Drizzle y migraciones
│   ├── routes/             # auth, tasks, stats
│   └── index.ts            # Entry point
├── infra/nginx/            # Configuración Nginx
├── Dockerfile              # Build multi-etapa (frontend)
├── Dockerfile.api          # Build backend
└── docker-compose.yml      # Orquestación producción
```

## CI/CD

GitHub Actions ejecuta en cada push:
1. `bun install --frozen-lockfile`
2. `bun run typecheck`
3. `cd client && bun run build`
