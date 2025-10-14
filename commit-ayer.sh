#!/bin/bash
# ============================================
# Script para crear un commit con fecha de AYER
# y subirlo al repositorio remoto (GitHub)
# Funciona en Git Bash (Windows)
# ============================================

# Configura la fecha de AYER a las 12:00 (hora local)
FECHA=$(date -d "yesterday 12:00" +"%Y-%m-%dT%H:%M:%S")

# Si 'date -d' no funciona (en algunos Git Bash viejos), usa manual:
# FECHA="2025-10-14T12:00:00"

# Mensaje del commit
MENSAJE="update frontend"

echo "📅 Fecha usada: $FECHA"
echo "📝 Mensaje: $MENSAJE"

# Asegurar que hay cambios
git add .

# Crear el commit con ambas fechas forzadas
GIT_AUTHOR_DATE="$FECHA" GIT_COMMITTER_DATE="$FECHA" git commit -m "update frontend"

# Verificar resultado
echo "✅ Commit creado con fecha forzada:"
git log -1 --pretty=fuller

# Hacer push (usa --force si el repo remoto ya tiene algo)
echo "🚀 Subiendo al remoto..."
git push -u origin main --force

echo "🎉 Listo. Verifica en GitHub que la fecha del commit diga 'committed on <ayer>'."
