#!/bin/bash
# TestBot Teardown Script for Online Boutique
# Stops all containers and cleans up resources.

cd "$(dirname "$0")"

echo "=== Online Boutique Teardown ==="

echo "Stopping containers..."
docker compose down -v

echo "  Online Boutique teardown complete"
