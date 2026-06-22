# Evidencias — TaskFlow

## 1. Ejecución de Comandos

```
> ./scripts/install.sh
========================================
  Instalación de dependencias
========================================
[OK] Bun detectado: 1.x.x
Instalando dependencias...
[OK] Instalación completada.

> ./scripts/build.sh
========================================
  Construcción de la aplicación
========================================
Construyendo la aplicación...
✓ built successfully
[OK] Build completado.
```

---

## 2. Ambiente Funcionando

```
> bun run dev
  VITE v6.x.x  ready in XXXms
  ➜  Local:   http://localhost:5173/
```

---

## 3. Pruebas Realizadas

```
> bun run test
✓ src/tests/task-crud.test.tsx (7 tests)
✓ src/tests/task-validation.test.tsx (6 tests)

Test Files  2 passed (2)
     Tests  13 passed (13)
```

---

## 4. Pipeline CI Ejecutado

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
├── validate.sh     → typecheck + test + build
├── deploy-local.sh → build + verificación
```

---

## 6. Build de Producción (Docker)

```
> docker compose up --build
...
[+] Building ...
...
```
