#!/usr/bin/env bash

docker rm -f taskmanager-dev taskmanager-test taskmanager-prod 2>/dev/null || true

echo "Ambientes detenidos correctamente."