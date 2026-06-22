# Task Manager — DevOps + Verificación y Validación

Aplicación web de gestión de tareas construida con **Bun + React + TypeScript + Vite** como proyecto de demostración para un flujo completo de **DevOps** y **Verificación y Validación (V&V)**.

## Tecnologías

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| Bun | 1.x | Runtime y gestor de paquetes |
| React | 18 | Interfaz de usuario |
| TypeScript | 5.6 | Tipado estático |
| Vite | 6 | Build y dev server |
| Vitest | 2 | Framework de pruebas |
| React Testing Library | 16 | Pruebas de componentes |
| Docker | — | Contenedor multi-etapa |
| Nginx | Alpine | Servidor de producción |
| GitHub Actions | — | Integración continua |

## Ambientes

### Desarrollo (Dev)

```bash
bun install
bun run dev
```

- Puerto: `5173`
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
# Clonar el repositorio
git clone https://github.com/tu-usuario/task-manager-devops-vv.git
cd task-manager-devops-vv

# Instalar dependencias
bun install
```

## Ejecución

```bash
# Desarrollo
bun run dev

# Build de producción
bun run build

# Vista previa del build
bun run preview
```

## Pruebas

```bash
# Ejecutar pruebas una vez
bun run test

# Modo watch
bun run test:watch
```

### Resultados de pruebas

```
✓ src/tests/task-crud.test.tsx         (7 tests)
✓ src/tests/task-validation.test.tsx   (6 tests)

Test Files  2 passed (2)
     Tests  13 passed (13)
```

### Casos de prueba cubiertos

| ID | Tipo | Descripción | Estado |
|----|------|-------------|--------|
| CP-01 | Funcional | Crear una tarea válida | ✅ |
| CP-02 | Funcional | Editar una tarea | ✅ |
| CP-03 | Funcional | Eliminar una tarea | ✅ |
| CP-04 | Funcional | Cambiar estado Pendiente → En progreso | ✅ |
| CP-05 | Funcional | Cambiar estado En progreso → Completada | ✅ |
| CP-06 | Funcional | Filtrar tareas por estado | ✅ |
| CP-07 | Funcional | Buscar tareas por nombre | ✅ |
| CP-08 | Negativa | No permitir crear tarea con título vacío | ✅ |
| CP-09 | Negativa | Mostrar validación si el título solo tiene espacios | ✅ |
| CP-10 | Borde | Crear tarea con título de 200 caracteres | ✅ |
| CP-11 | Borde | Crear 5 tareas y verificar conteo total | ✅ |
| CP-12 | Borde | Eliminar la última tarea de la lista | ✅ |
| CP-13 | Borde | Ciclo completo de estados (4 transiciones) | ✅ |

## Validación Completa

```bash
bun run validate
```

Ejecuta: lint → pruebas → build

## Docker

```bash
docker compose up --build
```

La aplicación estará disponible en `http://localhost:8080`.

## Scripts Disponibles

```bash
./scripts/install.sh       # Instalar dependencias
./scripts/run.sh            # Iniciar servidor de desarrollo
./scripts/test.sh           # Ejecutar pruebas
./scripts/build.sh          # Construir aplicación
./scripts/deploy-local.sh   # Simular despliegue local
```

## Flujo DevOps

1. **Desarrollo local** con Bun + Vite (hot reload)
2. **Control de versiones** con Git + GitHub
3. **Integración continua** con GitHub Actions:
   - push a `main` o `develop`
   - pull request hacia `main`
   - Etapas: lint → test → build → verificar dist
4. **Build de producción** con Docker multi-etapa
5. **Despliegue** con docker-compose + Nginx

## Estructura del Proyecto

```
task-manager-devops-vv/
├── .github/workflows/ci.yml    # Pipeline CI
├── docs/                        # Documentación V&V
├── infra/nginx/                 # Configuración Nginx
├── scripts/                     # Scripts Linux
├── src/                         # Código fuente
│   ├── components/              # Componentes React
│   ├── hooks/                   # Hooks personalizados
│   ├── types/                   # Tipos TypeScript
│   ├── utils/                   # Utilidades
│   └── tests/                   # Pruebas
├── Dockerfile                   # Build multi-etapa
├── docker-compose.yml           # Orquestación
└── package.json                 # Dependencias y scripts
```

## Capturas Sugeridas para la Entrega

1. Terminal ejecutando `bun run dev`
2. Navegador con la aplicación funcionando
3. Terminal con `bun run test` (13 pruebas pasando)
4. Terminal con `bun run build` exitoso
5. Terminal con `docker compose up --build` funcionando
6. GitHub Actions con pipeline CI exitoso
7. Navegador en `http://localhost:8080` con producción funcionando
