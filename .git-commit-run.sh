#!/bin/bash
set -e
cd /home/adriano/Documentos/Projects/design-identity
OUT="/home/adriano/Documentos/Projects/design-identity/.git-commit-results.txt"
> "$OUT"

section() {
  echo "=== $1 ===" >> "$OUT"
}

section "STATUS_BEFORE"
git status >> "$OUT" 2>&1

section "DIFF"
git diff >> "$OUT" 2>&1

section "STAGED_BEFORE"
git diff --staged >> "$OUT" 2>&1

section "LOG_BEFORE"
git log --oneline -5 >> "$OUT" 2>&1 || echo "(no commits yet)" >> "$OUT"

section "STAGE"
git add . >> "$OUT" 2>&1

section "STAGED_AFTER_ADD"
git diff --staged --stat >> "$OUT" 2>&1

section "COMMIT"
git commit -m "$(cat <<'EOF'
Initial commit: design identity portfolio site

React + TypeScript + Vite + Tailwind CSS portfolio for showcasing design identity work.
EOF
)" >> "$OUT" 2>&1

section "COMMIT_HASH"
git rev-parse HEAD >> "$OUT" 2>&1

section "STATUS_AFTER"
git status >> "$OUT" 2>&1

echo "DONE" >> "$OUT"
