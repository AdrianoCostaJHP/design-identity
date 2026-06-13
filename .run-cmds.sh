#!/bin/bash
RESULTS="/home/adriano/Documentos/Projects/design-identity/.cmd-results.txt"
> "$RESULTS"
cd /home/adriano/Documentos/Projects/design-identity

run_cmd() {
  local name="$1"
  shift
  echo "=== $name ===" >> "$RESULTS"
  local tmp
  tmp=$(mktemp)
  set +e
  "$@" > "$tmp" 2>&1
  local code=$?
  set -e
  echo "EXIT_CODE: $code" >> "$RESULTS"
  cat "$tmp" >> "$RESULTS"
  echo "" >> "$RESULTS"
  rm -f "$tmp"
}

run_cmd "npm install" npm install
run_cmd "npm run lint" npm run lint
run_cmd "npm run build" npm run build
