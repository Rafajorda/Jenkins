@echo off

REM Verificar si el token de Vercel está presente
echo Token de Vercel: %VERCEL_TOKEN%

REM Intentar hacer el deploy a Vercel
vercel --prod --token %VERCEL_TOKEN% --yes
