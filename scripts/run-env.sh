#!/usr/bin/env bash

set -e

ENVIRONMENT=${1:-dev}

case "$ENVIRONMENT" in
  dev)
    PORT=8080
    ;;
  test)
    PORT=8081
    ;;
  prod)
    PORT=8082
    ;;
  *)
    echo "Uso correcto: ./scripts/run-env.sh dev|test|prod"
    exit 1
    ;;
esac

CONTAINER_NAME="taskmanager-$ENVIRONMENT"

docker rm -f "$CONTAINER_NAME" 2>/dev/null || true

cp "$PWD/config/$ENVIRONMENT/config.js" "$PWD/src/config.js"

docker run -d \
  --name "$CONTAINER_NAME" \
  -p "$PORT:80" \
  -v "$PWD/src:/usr/share/nginx/html:ro" \
  nginx:alpine

echo "Ambiente $ENVIRONMENT levantado en http://localhost:$PORT"
