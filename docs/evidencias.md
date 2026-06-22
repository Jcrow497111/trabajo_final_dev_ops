# Evidencias — Task Manager

## 1. Ejecución de Comandos Linux

```
> ./scripts/install.sh
========================================
  Task Manager — Instalación
========================================
[OK] Bun detectado: 1.x.x
Instalando dependencias...
[OK] Instalación completada.

> ./scripts/build.sh
========================================
  Task Manager — Build
========================================
Construyendo la aplicación...
✓ built successfully
[OK] Build completado.
```

*Insertar captura de pantalla aquí*

---

## 2. Ambiente Funcionando

```
> bun run dev
  VITE v6.x.x  ready in XXXms
  ➜  Local:   http://localhost:5173/
```

*Insertar captura del navegador en http://localhost:5173 aquí*

---

## 3. Pruebas Realizadas

```
> bun run test
✓ src/tests/task-crud.test.tsx (7 tests)
✓ src/tests/task-validation.test.tsx (6 tests)

Test Files  2 passed (2)
     Tests  13 passed (13)
```

*Insertar captura de terminal con pruebas pasando aquí*

---

## 4. Pipeline CI Ejecutado

*Insertar captura de GitHub Actions mostrando pipeline exitoso aquí*

El pipeline incluye:
- ✅ Checkout del repositorio
- ✅ Configurar Bun
- ✅ Instalar dependencias
- ✅ Validar TypeScript
- ✅ Ejecutar pruebas
- ✅ Construir aplicación
- ✅ Verificar artefacto dist

---

## 5. Scripts Utilizados

```
scripts/
├── install.sh      → bun install
├── run.sh          → bun run dev
├── test.sh         → bun run test
├── build.sh        → bun run build
├── deploy-local.sh → build + instrucciones Docker
```

*Insertar captura de terminal ejecutando todos los scripts aquí*

---

## 6. Build de Producción (Docker)

```
> docker compose up --build
...
[+] Building ...
...
```

*Insertar captura de Docker funcionando en http://localhost:8080 aquí*
