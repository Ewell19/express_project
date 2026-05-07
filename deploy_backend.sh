#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

echo "[1/5] Pulling latest code from origin/main"
git pull --ff-only origin main

echo "[2/5] Installing dependencies"
npm install

echo "[3/5] Restarting PM2 process"
pm2 restart express_project_api

echo "[4/5] PM2 status"
pm2 status express_project_api

echo "[5/5] Health check with retries"
for i in 1 2 3 4 5 6; do
  if curl -s -i http://127.0.0.1:3001/items >/tmp/express_health.out 2>/dev/null; then
    sed -n "1,20p" /tmp/express_health.out
    echo "Deploy completed successfully."
    exit 0
  fi
  echo "Attempt $i failed, waiting 2s..."
  sleep 2
done

echo "Health check failed after retries." >&2
exit 1
