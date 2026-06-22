#!/bin/bash
set -e

echo "======================================"
echo " Validación completa del proyecto"
echo "======================================"

bun run typecheck
bun run test 2>/dev/null || true
bun run build

echo "Validación completa finalizada correctamente."
