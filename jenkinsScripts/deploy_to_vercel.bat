@echo off
npm install -g vercel
REM Verificar si el token de Vercel está presente
echo Token de Vercel: %VERCEL_TOKEN%

REM Intentar hacer el deploy a Vercel
vercel --prod --token %VERCEL_TOKEN%

REM Confirmar la versión de Vercel después del deploy
vercel --version
