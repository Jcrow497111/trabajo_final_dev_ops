#!/usr/bin/env bash
set -euo pipefail

echo "========================================"
echo "  Task Manager — Ejecución"
echo "========================================"

echo "Iniciando servidor de desarrollo..."
echo "  URL local: http://localhost:5173"
echo ""

bun run dev
