#!/usr/bin/env bash
set -euo pipefail

REPO="${1:-menguex/captas}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if ! git remote get-url origin &>/dev/null; then
  git remote add origin "git@github.com:${REPO}.git"
fi

if command -v gh >/dev/null 2>&1; then
  if ! gh auth status &>/dev/null 2>&1; then
    echo "Inicia sesión en GitHub (se abrirá el navegador)…"
    gh auth login --hostname github.com --git-protocol ssh --web
  fi
  gh repo create "${REPO#*/}" --public --source=. --remote=origin --push 2>/dev/null \
    || git push -u origin main
else
  echo "Crea el repo vacío en https://github.com/new (nombre: ${REPO#*/})"
  echo "Luego ejecuta: git push -u origin main"
  git push -u origin main
fi

echo "Listo: https://github.com/${REPO}"
