#!/usr/bin/env bash

echo "Validando ambiente DEV..."
curl -I http://localhost:8080

echo "Validando ambiente TEST..."
curl -I http://localhost:8081

echo "Validando ambiente PRODUCCIÓN..."
curl -I http://localhost:8082