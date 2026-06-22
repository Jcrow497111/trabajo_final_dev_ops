#!/usr/bin/env bash
set -euo pipefail

echo "========================================"
echo "  Task Manager — Deploy Local"
echo "========================================"

echo "Paso 1: Construyendo la aplicación..."
bun run build

echo ""
echo "Paso 2: Despliegue simulado completado."
echo ""
echo "  El contenido de 'dist/' puede servirse con:"
echo "    docker compose up --build"
echo "  o con un servidor estático:"
echo "    npx serve dist"
echo ""
echo "  Puerto (Docker): http://localhost:8080"
echo ""

echo "[OK] Deploy local finalizado."
