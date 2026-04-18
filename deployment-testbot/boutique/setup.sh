#!/bin/bash
set -e

# TestBot Setup Script for Online Boutique
# Starts the full microservices stack using Docker Compose.
# Backend services use pre-built images; frontend is built from source.
#
# Usage:
#   ./setup.sh                                    # Uses default repo path
#   BOUTIQUE_REPO_PATH=/path/to/repo ./setup.sh   # Custom repo path

cd "$(dirname "$0")"
SCRIPT_DIR="$(pwd)"

REPO_PATH="${BOUTIQUE_REPO_PATH:-$(dirname $(dirname "$SCRIPT_DIR"))}"

# ─── Health check helper ───
wait_for_url() {
    local url="$1"
    local max_wait="${2:-180}"
    local cookie="${3:-}"
    local elapsed=0
    echo "Waiting for $url (timeout: ${max_wait}s)..."
    while true; do
        if [ -n "$cookie" ]; then
            status=$(curl -s -o /dev/null -w "%{http_code}" -H "Cookie: $cookie" "$url" 2>/dev/null || echo "000")
        else
            status=$(curl -s -o /dev/null -w "%{http_code}" "$url" 2>/dev/null || echo "000")
        fi
        if [ "$status" = "200" ]; then
            echo "  $url is ready (${elapsed}s)"
            return 0
        fi
        sleep 3
        elapsed=$((elapsed + 3))
        if [ "$elapsed" -ge "$max_wait" ]; then
            echo "ERROR: $url not reachable after ${max_wait}s (last status: $status)"
            return 1
        fi
    done
}

echo "=== Online Boutique Setup ==="
echo "Repo path: $REPO_PATH"

# Export for docker-compose context
export BOUTIQUE_REPO_PATH="$REPO_PATH"

# Start the full stack
echo "Starting Docker Compose stack..."
docker compose -f "$SCRIPT_DIR/docker-compose.yml" up -d --build

# Wait for backend services first
echo ""
echo "Waiting for backend services..."
sleep 10

# Wait for frontend (the SUT)
echo ""
echo "Waiting for frontend..."
wait_for_url "http://localhost:8080/_healthz" 180 "shop_session-id=x-healthcheck"

# Verify homepage loads
echo ""
echo "Verifying homepage loads..."
wait_for_url "http://localhost:8080/" 30 "shop_session-id=x-verify"

echo ""
echo "=== Online Boutique setup complete ==="
echo "  Frontend URL: http://localhost:8080"
echo "  Health check: http://localhost:8080/_healthz"
echo ""
echo "  Services running:"
docker compose -f "$SCRIPT_DIR/docker-compose.yml" ps --format "table {{.Name}}\t{{.Status}}" 2>/dev/null || \
    docker compose -f "$SCRIPT_DIR/docker-compose.yml" ps
