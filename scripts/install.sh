#!/bin/bash
set -e

echo "======================================"
echo " Instalación de dependencias"
echo "======================================"

if ! command -v bun &> /dev/null; then
  echo "Error: Bun no está instalado."
  echo "Instala Bun desde https://bun.sh"
  exit 1
fi

echo "Bun detectado:"
bun --version

echo "Instalando dependencias..."
bun install

echo "Instalación completada correctamente."
