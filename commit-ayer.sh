#!/bin/bash
# ============================================
# Script: commit-ayer.sh
# Crea un commit con fecha de AYER (funciona en Windows Git Bash)
# ============================================

# Generar fecha de ayer (compatible con Windows Git Bash)
FECHA=$(powershell.exe -Command "(Get-Date).AddDays(-1).ToString('yyyy-MM-ddTHH:mm:ss')")

# Elimina posibles retornos de línea de PowerShell
FECHA=$(echo $FECHA | tr -d '\r')

# Mensaje del commit
MENSAJE="update frontend"

echo "📅 Fecha usada: $FECHA"
echo "📝 Mensaje: $MENSAJE"

# Asegurar que hay cambios listos
git add .

# Crear commit con ambas fechas forzadas (autor y committer)
GIT_AUTHOR_DATE="$FECHA" GIT_COMMITTER_DATE="$FECHA" git commit -m "update frontend"

# Mostrar confirmación
echo "✅ Commit creado con fecha forzada:"
git log -1 --pretty=fuller

# Subir al repo remoto (usa --force si es un repo nuevo)
echo "🚀 Subiendo a GitHub..."
git push -u origin main --force

echo "🎉 Listo. Verifica en GitHub: debería decir 'committed on <ayer>'."
