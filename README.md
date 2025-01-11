# Proyecto React con Jenkins CI/CD

Este proyecto es una aplicación de **React** que ha sido configurada para realizar una integración continua y entrega continua (CI/CD) utilizando **Jenkins**. La pipeline de Jenkins se encarga de ejecutar varios procesos de calidad del código, pruebas, compilación, y despliegue en **Vercel**.

## Introducción

### ¿Qué es Jenkins?

**Jenkins** es una herramienta de automatización que facilita la integración continua (CI) y la entrega continua (CD). Con Jenkins, los desarrolladores pueden ejecutar tareas automáticas en sus proyectos, como la ejecución de pruebas, la construcción de artefactos, y el despliegue de aplicaciones en plataformas como Vercel.

### ¿Qué hace esta pipeline de Jenkins?

La pipeline de Jenkins en este proyecto automatiza varias tareas clave del ciclo de vida del desarrollo, que incluyen:
1. **Instalación de dependencias**: Se instalan todas las dependencias necesarias para el proyecto.
2. **Linter**: Se ejecuta un linter para verificar la calidad del código.
3. **Test**: Se ejecutan pruebas unitarias utilizando **Jest**.
4. **Build**: Se construye una versión empaquetada del proyecto para su despliegue.
5. **Actualización del README**: Se agrega un badge al README con el resultado de las pruebas. Este badge será añadido **al final del archivo `README.md`**, bajo la sección de "RESULTADO DE LOS ÚLTIMOS TESTS".
6. **Push de cambios**: Se realiza un commit y un push de los cambios al repositorio.
7. **Despliegue en Vercel**: Se despliega el proyecto en **Vercel**.
8. **Notificación en Telegram**: Se envía una notificación con los resultados de la pipeline a un **bot de Telegram**.

## RESULTADO DE LOS ÚLTIMOS TESTS

![Test Status](https://img.shields.io/badge/test-success-green)

