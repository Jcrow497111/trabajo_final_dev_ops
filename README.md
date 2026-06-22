# TaskFlow — Gestión de Tareas

Aplicación web full-stack de gestión de tareas construida con **Bun + React + TypeScript + Hono + Turso**.

## Capturas de Pantalla

| Landing | Dashboard |
|---------|-----------|
| ![Landing](screenshots/taskflow-landing.png) | ![Dashboard](screenshots/taskflow-dashboard.png) |

| Tareas | Kanban |
|--------|--------|
| ![Tareas](screenshots/taskflow-tasks.png) | ![Kanban](screenshots/taskflow-kanban.png) |

| Estadísticas | Login | Registro |
|-------------|-------|----------|
| ![Estadísticas](screenshots/taskflow-stats.png) | ![Login](screenshots/taskflow-login.png) | ![Registro](screenshots/taskflow-register.png) |

## Tecnologías

| Tecnología | Propósito |
|------------|-----------|
| React 18 | Interfaz de usuario |
| TypeScript | Tipado estático |
| Vite | Build y dev server |
| Bun | Runtime y gestor de paquetes |
| Hono | Backend API REST |
| Turso | Base de datos SQLite distribuida |
| Drizzle ORM | ORM tipado |
| Tailwind CSS | Estilos |
| Vitest | Framework de pruebas |
| Docker + Nginx | Contenedor multi-etapa |
| GitHub Actions | Integración continua |

## Ambientes

### Desarrollo (Dev)

```bash
bun install
bun run dev
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000/api/health`
- Variables: `.env.development`

### Pruebas (Test)

```bash
bun run test
```

- Variables: `.env.test`

### Producción (Prod)

```bash
docker compose up --build
```

- Puerto: `8080`
- Variables: `.env.production`

## Instalación

```bash
git clone https://github.com/tu-usuario/task-manager-devops-vv.git
cd task-manager-devops-vv
bun install
```

## Ejecución

```bash
# Desarrollo
bun run dev

# Build de producción
cd client && bun run build

# Vista previa del build
bun run preview
```

## Pruebas

```bash
bun run test
```

### Resultados

```
✓ src/tests/task-crud.test.tsx         (7 tests)
✓ src/tests/task-validation.test.tsx   (6 tests)

Test Files  2 passed (2)
     Tests  13 passed (13)
```

## Validación Completa

```bash
bun run typecheck   # TypeScript
bun run test        # Pruebas
cd client && bun run build  # Build
```

## Docker

```bash
docker compose up --build
```

Aplicación disponible en `http://localhost:8080`.

## Scripts Disponibles

```bash
./scripts/install.sh       # Instalar dependencias
./scripts/run.sh           # Iniciar servidor de desarrollo
./scripts/test.sh          # Ejecutar pruebas
./scripts/build.sh         # Construir aplicación
./scripts/validate.sh      # Validación completa
./scripts/deploy-local.sh  # Simular despliegue local
```

## Flujo DevOps

1. **Desarrollo local** con Bun + Vite (hot reload)
2. **Control de versiones** con Git + GitHub
3. **Integración continua** con GitHub Actions
4. **Build de producción** con Docker multi-etapa
5. **Despliegue** con docker-compose + Nginx

## Estructura del Proyecto

```
task-manager-devops-vv/
├── .github/workflows/     # Pipeline CI
├── client/                 # Frontend React
│   └── src/
│       ├── components/     # Componentes UI
│       ├── pages/          # Páginas
│       └── hooks/          # Hooks personalizados
├── server/                 # Backend Hono
│   ├── db/                 # Schema y migraciones
│   └── index.ts            # Entry point
├── scripts/                # Scripts de automatización
├── docs/                   # Documentación técnica
├── infra/nginx/            # Configuración Nginx
├── Dockerfile              # Build multi-etapa
├── docker-compose.yml      # Orquestación
└── package.json            # Dependencias y scripts
```
