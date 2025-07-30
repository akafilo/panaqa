#!/bin/bash

# Script de deploy para PANAQA website
echo "🚀 Iniciando deploy de PANAQA website..."

# Verificar que estamos en la rama main
git checkout main

# Actualizar desde remoto
git pull origin main

# Agregar cambios
git add .

# Solicitar mensaje de commit
echo "📝 Ingresa el mensaje del commit:"
read commit_message

# Hacer commit
git commit -m "$commit_message"

# Push a GitHub
git push origin main

echo "✅ Deploy completado!"
echo "🌐 Tu sitio estará disponible en: https://panaqa.net"
echo "⏰ Los cambios pueden tardar 1-10 minutos en verse reflejados"
