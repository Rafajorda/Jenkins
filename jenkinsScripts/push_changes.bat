@echo off

REM Añadir cambios y hacer commit
git add README.md
git commit -m "Pipeline ejecutada por %EJECUTOR%. Motivo: %MOTIVO%"
git push origin main
