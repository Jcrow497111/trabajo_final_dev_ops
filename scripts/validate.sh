#!/bin/bash
set -e

echo "======================================"
echo " Validación completa del proyecto"
echo "======================================"

bun run typecheck
bun run test --if-present
bun run build

echo "Validación completa finalizada correctamente."
