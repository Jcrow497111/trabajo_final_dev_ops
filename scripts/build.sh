#!/usr/bin/env bash
set -euo pipefail

echo "========================================"
echo "  Task Manager — Build"
echo "========================================"

echo "Construyendo la aplicación..."
echo ""

bun run build

echo ""
echo "[OK] Build completado."
echo "  El contenido estático está en: dist/"
