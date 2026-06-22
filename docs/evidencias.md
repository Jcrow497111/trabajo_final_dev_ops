# Evidencias — TaskFlow

## 1. Ejecución de Comandos

### Instalación

```bash
$ ./scripts/install.sh
======================================
 Instalación de dependencias
======================================
Bun detectado: 1.2.5
Instalando dependencias...
Instalación completada correctamente.
```

### TypeScript

```bash
$ bun run typecheck
→ Sin errores de tipos
```

### Pruebas

```bash
$ bun run test

 ✓ client/src/tests/task-validation.test.tsx (13 tests)
 ✓ client/src/tests/task-crud.test.tsx (14 tests)

 Test Files  2 passed (2)
      Tests  27 passed (27)
```

### Build

```bash
$ ./scripts/build.sh
======================================
 Construcción de la aplicación
======================================
$ cd client && vite build
vite v6.4.3 building for production...
✓ 1604 modules transformed.
✓ built in 6.56s
Build generado correctamente.
```

### Validación completa

```bash
$ ./scripts/validate.sh
======================================
 Validación completa del proyecto
======================================
$ tsc --noEmit
$ vitest run
 Tests  27 passed (27)
$ vite build
✓ built in 3.92s
Validación completa finalizada correctamente.
```

### Backend Health Check

```bash
$ curl http://localhost:3000/api/health
{"status":"ok","database":"connected"}
```

---

## 2. Ambiente Funcionando

```
> bun run dev
  VITE v6.4.3  ready in XXXms
  ➜  Local:   http://localhost:5173/
  Servidor iniciado en http://localhost:3000
```

---

## 3. Capturas de Pantalla

| Aplicación | Screenshot |
|-----------|-----------|
| Landing | ![Landing](../screenshots/taskflow-landing.png) |
| Login | ![Login](../screenshots/taskflow-login.png) |
| Registro | ![Registro](../screenshots/taskflow-register.png) |
| Dashboard | ![Dashboard](../screenshots/taskflow-dashboard.png) |
| Tareas | ![Tareas](../screenshots/taskflow-tasks.png) |
| Kanban | ![Kanban](../screenshots/taskflow-kanban.png) |
| Estadísticas | ![Stats](../screenshots/taskflow-stats.png) |

| Infraestructura | Screenshot |
|----------------|-----------|
| GitHub Repositorio | ![GitHub](../screenshots/github-repo.png) |
| GitHub Actions | ![Actions](../screenshots/github-actions.png) |
| Backend Health | ![Health](../screenshots/backend-health.png) |

---

## 4. Pruebas Realizadas

**Estado: COMPLETADO** — 27/27 tests pasan.

| Archivo | Tests | Descripción |
|---------|-------|-------------|
| `client/src/tests/task-crud.test.tsx` | 14 | TaskTable (7), TaskForm (5), TaskFilters (2) |
| `client/src/tests/task-validation.test.tsx` | 13 | Validación Zod de schemas compartidos |

Escenarios cubiertos:
- Renderizado de lista de tareas y lista vacía
- Badges de estado (Pendiente, En progreso, Completada)
- Acciones Ver y Eliminar
- Validación de formulario (título vacío, solo espacios, fecha faltante)
- Envío de formulario con datos válidos
- Carga de datos existentes para edición
- Filtros de búsqueda y estado
- Validación Zod de ids, fechas, enums y transformaciones

---

## 5. Pipeline CI Ejecutado

El pipeline (.github/workflows/ci.yml) ejecuta en cada push:
1. ✅ Checkout del repositorio
2. ✅ Configurar Bun
3. ✅ Instalar dependencias (bun install --frozen-lockfile)
4. ✅ Validar TypeScript (tsc --noEmit)
5. ✅ Ejecutar pruebas (27/27)
6. ✅ Construir aplicación (vite build)
7. ✅ Verificar artefacto dist

---

## 6. Scripts DevOps

```
scripts/
├── install.sh       → Verifica Bun e instala dependencias
├── run.sh           → Inicia frontend + backend en desarrollo
├── test.sh          → Ejecuta suite de pruebas
├── build.sh         → Build de producción con Vite
├── validate.sh      → typecheck + test + build (validación completa)
├── deploy-local.sh  → Build + verificación + Docker Compose
├── check.sh         → Verifica ambientes dev/test/prod
├── stop.sh          → Detiene servicios
└── run-env.sh       → Ejecuta entorno específico (dev|test|prod)
```

---

## 7. Build de Producción (Docker)

```
> docker compose up --build
[+] Building ...
→ Contenedor api (Hono) en :3000
→ Contenedor web (Nginx) en :8080
→ Nginx proxy reverso /api/ → api:3000
```

---

## 8. Git — Commits Recientes

```
508742e docs: explicacion detallada de produccion Docker
4c9e0cf docs: readme detallado con pasos de configuracion
82082c5 docs: actualizar documento técnico
bc44b93 fix: produccion Docker con API + Nginx
4749c41 docs: agregar screenshots y mejorar README
23be350 fix: instalar lucide-react en raiz para tsc
c9c6835 fix: compatibilidad cross-platform Node.js/Bun
9aace9d Agregar automatización DevOps con scripts y CI
e3431de feat: auth real con Turso + bcrypt
7c3d911 creacion estructura del proyecto y entornos
```
