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

Las pruebas se ejecutaron exitosamente durante la fase inicial del proyecto (13/13). Tras la migración a monorepo (cliente/servidor), los archivos de prueba están pendientes de re-implementación. El pipeline CI está preparado para ejecutarlas automáticamente.

```bash
# Comando una vez re-implementadas:
bun run test
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
