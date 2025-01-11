#!/bin/bash
echo "Ejecutando deploy a Vercel..."

# Verificar si el token está presente
echo "Token de Vercel: $VERCEL_TOKEN"

# Intentar hacer el deploy a Vercel
vercel --prod --token $VERCEL_TOKEN

# Confirmar la versión de Vercel después del deploy
echo "Vercel version: $(vercel --version)"