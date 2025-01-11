@echo off

REM Verificar si TEST_RESULT es igual a "SUCCESS"
if "%TEST_RESULT%"=="SUCCESS" (
    set BADGE=https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg
) else (
    set BADGE=https://img.shields.io/badge/test-failure-red
)

REM Agregar el badge al README.md
echo. >> README.md
echo RESULTADO DE LOS ÚLTIMOS TESTS >> README.md
echo !BADGE! >> README.md
