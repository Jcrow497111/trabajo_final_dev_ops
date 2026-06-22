#!/bin/bash
set -e

echo "======================================"
echo " Construcción de la aplicación"
echo "======================================"

bun run build

echo "Build generado correctamente."
