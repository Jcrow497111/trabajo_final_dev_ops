#!/bin/bash
set -e

echo "======================================"
echo " Ejecución del sistema Task Manager"
echo "======================================"

echo "Frontend esperado: http://localhost:5173"
echo "Backend esperado: http://localhost:3000/api/health"

bun run dev
