# Documento Técnico — TaskFlow

## 1. Descripción del Sistema

Sistema web full-stack de gestión de tareas para equipos de trabajo. Permite registrar usuarios, autenticarse, y gestionar tareas con operaciones CRUD, cambio de estados (Pendiente, En progreso, Completada), tablero Kanban, filtros, búsqueda y estadísticas en vivo. Los datos se persisten en una base de datos Turso distribuida con autenticación segura mediante bcrypt + tokens de sesión.

## 2. Arquitectura General

```
┌─────────────────────────────────────┐
│         Cliente (React SPA)         │
│  Vite + React 18 + TypeScript       │
│  Tailwind CSS + Lucide React        │
└──────────────┬──────────────────────┘
               │ HTTP (JSON)
┌──────────────▼──────────────────────┐
│     Backend (Hono + Bun/Node)       │
│  API REST en /api/*                 │
│   ├─ /api/auth (register/login/me)  │
│   ├─ /api/tasks (CRUD + filtros)    │
│   └─ /api/stats (estadísticas)      │
└──────────────┬──────────────────────┘
               │ Drizzle ORM
┌──────────────▼──────────────────────┐
│     Base de Datos (Turso/libSQL)    │
│  SQLite distribuida en la nube      │
│  Tablas: users, tasks               │
└─────────────────────────────────────┘
```

### Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Frontend | React 18 + TypeScript + Vite + Tailwind CSS + React Router |
| Backend | Hono + Bun (compatible Node.js via tsx) |
| Base de datos | Turso (SQLite distribuida) |
| ORM | Drizzle ORM con tipos estáticos |
| Autenticación | bcryptjs + tokens UUID por sesión |
| Contenedores | Docker multi-etapa + Nginx |
| CI/CD | GitHub Actions |
| Pruebas | Vitest + React Testing Library + user-event |

### Frontend (cliente SPA)

- **Páginas**: Landing, Login, Registro, Dashboard, Tareas, Kanban, Estadísticas, Acerca del proyecto
- **Componentes**: Sidebar de navegación, tarjetas de tarea, tabla kanban, gráficos de estadísticas, modal de creación/edición
- **Ruteo**: React Router v6 con lazy loading y redirect basado en sesión
- **Estado de sesión**: Context API con token almacenado y verificación contra backend

### Backend (API REST)

- **Rutas**:
  - `GET /api/health` — Health check con verificación de BD
  - `POST /api/auth/register` — Registro con validación Zod
  - `POST /api/auth/login` — Login con bcrypt + token
  - `GET /api/auth/me` — Verificar sesión activa
  - `POST /api/auth/logout` — Cerrar sesión
  - `GET /api/tasks` — Listar tareas con filtros (status, priority, search, sortBy, order)
  - `GET /api/tasks/:id` — Obtener tarea por ID
  - `POST /api/tasks` — Crear tarea (validada con Zod)
  - `PUT /api/tasks/:id` — Actualizar tarea
  - `PATCH /api/tasks/:id/status` — Cambiar estado individual
  - `DELETE /api/tasks/:id` — Eliminar tarea
  - `GET /api/stats` — Estadísticas: total, pendientes, en progreso, completadas, vencidas, tasa de finalización

### Base de Datos

- **Tabla `users`**: id, email (único indexado), name, password_hash, session_token, created_at
- **Tabla `tasks`**: id, title, description, status (pending/in_progress/completed), priority (low/medium/high), due_date, user_id, created_at, updated_at

## 3. Gestión de Ambientes

| Ambiente | Propósito | Comando | Puerto(s) | Variables |
|----------|-----------|---------|-----------|-----------|
| **Dev** | Desarrollo local con hot reload | `bun run dev` | Frontend :5173, Backend :3000 | `.env.development` |
| **Test** | Pruebas automatizadas | `bun run test` | — | `.env.test` |
| **Prod** | App compilada servida con Nginx | `docker compose up --build` | :8080 (Nginx :80 → API :3000) | `.env.production` |

Cada ambiente tiene su propio archivo `.env.*` con variables específicas (TURSO_DATABASE_URL, TURSO_AUTH_TOKEN, VITE_API_URL).

## 4. Flujo DevOps

```
[Desarrollo local] → [Git push] → [GitHub Actions CI] → [Docker build] → [Deploy]
      │                    │               │                      │
      ▼                    ▼               ▼                      ▼
  Bun + Vite           GitHub         typecheck                docker-compose
  hot reload                          + test                   + Nginx
                                       + build
```

### Etapas del Pipeline CI (`.github/workflows/ci.yml`)

1. **Checkout** — Clonar repositorio
2. **Setup Bun** — Configurar runtime Bun
3. **Instalar dependencias** — `bun install --frozen-lockfile`
4. **Validar TypeScript** — `bun run typecheck`
5. **Ejecutar pruebas** — `bun run test`
6. **Construir aplicación** — `cd client && bun run build`
7. **Verificar artefacto** — Confirmar que `client/dist/` existe

### Automatización local (scripts)

| Script | Función |
|--------|---------|
| `scripts/install.sh` | Verifica Bun e instala dependencias |
| `scripts/run.sh` | Inicia servidor de desarrollo |
| `scripts/test.sh` | Ejecuta suite de pruebas |
| `scripts/build.sh` | Construye aplicación para producción |
| `scripts/validate.sh` | Ejecuta typecheck + test + build |
| `scripts/deploy-local.sh` | Build + verificación de artefacto + Docker |
| `scripts/stop.sh` | Detiene procesos en puertos usados |
| `scripts/check.sh` | Verifica prerequisitos (Bun, Docker, Node) |
| `scripts/run-env.sh` | Ejecuta con ambiente específico |

## 5. Estrategia de Pruebas

### Tipos de pruebas definidas

| Tipo | Descripción | Casos |
|------|-------------|-------|
| **Funcionales** | Verificar operaciones CRUD y cambios de estado | CP-01 al CP-07 (7 casos) |
| **Negativas** | Validar rechazo de entradas inválidas | CP-08, CP-09 (2 casos) |
| **Borde** | Verificar comportamiento en límites del sistema | CP-10 al CP-13 (4 casos) |

### Herramientas

- **Vitest**: Framework de pruebas unitarias y de componentes
- **React Testing Library**: Pruebas de interacción con componentes
- **@testing-library/user-event**: Simulación de eventos de usuario
- **jsdom**: Entorno DOM simulado para pruebas

### Plan de ejecución

Las pruebas se definieron en el plan de pruebas (`docs/plan-pruebas.md`) y casos de prueba (`docs/casos-prueba.md`). Tras la migración a monorepo (cliente/servidor), los archivos de prueba deben re-implementarse en `client/src/tests/` para mantener la cobertura. El pipeline CI está configurado para ejecutar `bun run test` una vez que los tests estén disponibles.

## 6. Resultados Obtenidos

### TypeScript

```
> bun run typecheck
→ Sin errores de tipos
```

### Build de producción

```
> cd client && bun run build
✓ built successfully
→ Artefacto generado en client/dist/
```

### Pipeline CI

El pipeline de GitHub Actions ejecuta correctamente:
- ✅ Checkout del repositorio
- ✅ Configuración de Bun
- ✅ Instalación de dependencias
- ✅ Validación TypeScript
- ⏳ Pruebas (pendiente de re-implementación post-migración)
- ✅ Build de producción
- ✅ Verificación de artefacto

### Docker

```
> docker compose up --build
→ Contenedor api (Hono) en :3000
→ Contenedor web (Nginx) en :8080
→ Nginx proxy reverso /api/ → api:3000
```

## 7. Problemas y Mejoras

### Errores detectados durante el desarrollo

| Error | Impacto | Solución aplicada |
|-------|---------|-------------------|
| `bun --cwd client run dev` no ejecutaba correctamente | Imposible iniciar frontend desde raíz | Cambiado a `concurrently` para ejecutar cliente y servidor en paralelo |
| Servidor no resolvía `zod` desde `shared/` | Error de importación en backend | Instalado `zod` como dependencia directa del workspace |
| `tsc --noEmit` fallaba por falta de `lucide-react` | Typecheck bloqueado en CI | Agregado `lucide-react` como dependencia en raíz |
| `Bun.serve()` incompatible con Node.js | Servidor no arrancaba con `tsx` | Agregado `@hono/node-server` como fallback con detección de runtime |
| Fechas vencidas mostraban cálculos incorrectos | Estadísticas inconsistentes | Implementado filtro por fecha ISO en servidor |

### Problemas conocidos actuales

- Las tareas no están asociadas a usuarios específicos (columna `user_id` existe pero no se usa en consultas)
- No hay paginación en la lista de tareas
- No hay recuperación de contraseña
- Las pruebas unitarias se eliminaron durante la migración a monorepo; deben re-implementarse

### Mejoras propuestas

| Mejora | Prioridad | Estado |
|--------|-----------|--------|
| Asociar tareas al usuario autenticado | Alta | Pendiente |
| Agregar paginación en API `/api/tasks` | Media | Pendiente |
| Implementar pruebas de integración backend | Media | Pendiente |
| Agregar caché con Redis para sesiones | Baja | Pendiente |
| Notificaciones en tiempo real (WebSockets) | Baja | Pendiente |
