#!/bin/bash
set -e

echo "======================================"
echo " Simulación de despliegue local"
echo "======================================"

bun run build

if [ -d "client/dist" ]; then
  echo "Artefacto de producción generado correctamente."
  echo "El sistema está listo para ser servido en un ambiente de producción."
else
  echo "Error: no se encontró la carpeta dist."
  exit 1
fi
