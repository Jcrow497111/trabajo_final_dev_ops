#!/usr/bin/env bash
set -euo pipefail

echo "========================================"
echo "  Task Manager — Pruebas"
echo "========================================"

echo "Ejecutando pruebas con Vitest..."
echo ""

bun run test
