#!/usr/bin/env bash
set -euo pipefail

echo "========================================"
echo "  Task Manager — Instalación"
echo "========================================"

if ! command -v bun &>/dev/null; then
  echo "[ERROR] Bun no está instalado."
  echo "  Instálalo con: curl -fsSL https://bun.sh/install | bash"
  exit 1
fi

echo "[OK] Bun detectado: $(bun --version)"
echo "Instalando dependencias..."

bun install

echo ""
echo "[OK] Instalación completada."
echo "  Usa 'bun run dev' para iniciar la app."
