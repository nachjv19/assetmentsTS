#!/bin/bash
# ============================================
# Script: commit-con-fecha.sh
# Crea o reescribe el último commit con una fecha específica.
# Compatible con Windows Git Bash.
# ============================================

# === CONFIGURACIÓN ===
# Formato de fecha: "YYYY-MM-DDTHH:MM:SS"
# Ejemplo: "2025-10-14T12:00:00"
FECHA=${1:-"2025-10-14T12:00:00"}   # Si no pasas una fecha como argumento, usa esta por defecto.
MENSAJE=${2:-"Commit con fecha personalizada"}

# Mostrar valores
echo "📅 Fecha establecida: $FECHA"
echo "📝 Mensaje: $MENSAJE"
echo "--------------------------------------"

# === ETAPA 1: Asegurar que el repo está limpio o tiene algo para commitear ===
git add .

# === ETAPA 2: Crear o modificar el commit ===
# Si no hay commits aún, crea uno. Si ya existe, reescribe el último.
if git rev-parse HEAD >/dev/null 2>&1; then
  echo "🧩 Reescribiendo el último commit..."
  GIT_AUTHOR_DATE="$FECHA" GIT_COMMITTER_DATE="$FECHA" \
  git commit --amend --no-edit --allow-empty --reset-author
else
  echo "✨ Creando primer commit..."
  GIT_AUTHOR_DATE="$FECHA" GIT_COMMITTER_DATE="$FECHA" \
  git commit -m "$MENSAJE"
fi

# === ETAPA 3: Mostrar resultado ===
echo
echo "🔎 Verificando resultado:"
git show --format=fuller -1 | head -n 8

# === ETAPA 4: Push forzado ===
echo
read -p "¿Deseas subir los cambios a GitHub con --force? (s/n): " RESP
if [[ "$RESP" == "s" || "$RESP" == "S" ]]; then
  echo "🚀 Subiendo al remoto (force push)..."
  git push origin main --force
  echo "✅ Subido. Verifica en GitHub que diga 'committed on $(echo $FECHA | cut -d'T' -f1)'."
else
  echo "🛑 Cambios solo locales. Puedes hacer push manual cuando quieras."
fi
