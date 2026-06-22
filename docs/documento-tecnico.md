# Documento Técnico — TaskFlow

## 1. Descripción del Sistema

Sistema web de gestión de tareas que permite crear, editar, eliminar tareas, cambiar su estado (Pendiente, En progreso, Completada), filtrar por estado y buscar por texto. Los datos se persisten en una base de datos Turso distribuida.

## 2. Arquitectura General

- **Frontend:** React 18 + TypeScript + Vite
- **Backend:** Bun + Hono
- **Base de datos:** Turso (SQLite distribuida)
- **ORM:** Drizzle ORM
- **Infraestructura:** Docker + Nginx para producción
- **Pruebas:** Vitest + React Testing Library
- **CI/CD:** GitHub Actions

La aplicación sigue una arquitectura full-stack con frontend SPA, API REST y base de datos cloud nativa.

## 3. Gestión de Ambientes

### Desarrollo (Dev)
- Propósito: Desarrollo local
- Comando: `bun run dev`
- Puerto: Frontend 5173, Backend 3000
- Variables: `.env.development`

### Pruebas (Test)
- Propósito: Ejecución de pruebas automatizadas
- Comando: `bun run test`
- Variables: `.env.test`

### Producción (Prod)
- Propósito: App compilada servida con Nginx
- Comando: `docker compose up --build`
- Puerto: 8080
- Variables: `.env.production`

## 4. Flujo DevOps

1. Desarrollo local con Bun + Vite (hot reload)
2. Control de versiones con Git + GitHub
3. Integración continua con GitHub Actions
4. Build de producción con Docker multi-etapa
5. Despliegue local con scripts de automatización

El pipeline CI ejecuta: typecheck → test → build → verificación de artefactos.

## 5. Estrategia de Pruebas

- **Pruebas funcionales:** Creación, edición, eliminación, cambios de estado
- **Pruebas negativas:** Validación de formularios, títulos vacíos
- **Pruebas de borde:** Títulos largos, múltiples tareas, ciclos de estado
- **Herramientas:** Vitest + React Testing Library + user-event

## 6. Resultados Obtenidos

- Todas las pruebas unitarias y de componente pasan correctamente
- TypeScript sin errores
- Build de producción exitoso
- Pipeline CI funcional
- Contenedor Docker con Nginx operativo

## 7. Problemas y Mejoras

### Problemas conocidos
- Los datos se pierden al limpiar localStorage
- No hay sincronización entre pestañas

### Mejoras futuras
- Agregar backend con API REST
- Base de datos persistente
- Autenticación de usuarios
- Paginación de tareas
