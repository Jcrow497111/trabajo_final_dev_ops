# Documento Técnico — Task Manager

## 1. Descripción del Sistema

Sistema web de gestión de tareas (Task Manager) desarrollado como proyecto de demostración para la asignatura de DevOps y Verificación y Validación.

Permite crear, editar, eliminar tareas, cambiar su estado (Pendiente, En progreso, Completada), filtrar por estado y buscar por texto. Los datos se persisten en localStorage del navegador.

## 2. Arquitectura General

- **Frontend:** SPA con React 18 + TypeScript
- **Build tool:** Vite
- **Runtime:** Bun
- **Persistencia:** localStorage
- **Infraestructura:** Docker + Nginx para producción
- **Pruebas:** Vitest + React Testing Library

La aplicación sigue una arquitectura de componentes funcionales con hooks. No tiene backend; funciona completamente en el navegador.

## 3. Gestión de Ambientes

### Desarrollo (Dev)
- Propósito: Desarrollo local
- Comando: `bun run dev`
- Puerto: 5173
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

1. Desarrollo local con Bun + Vite
2. Control de versiones con Git + GitHub
3. Integración continua con GitHub Actions
4. Build de producción con Docker multi-etapa
5. Despliegue local simulado con scripts

El pipeline CI ejecuta: lint → pruebas → build → verificación de artefactos.

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
- Modo oscuro
