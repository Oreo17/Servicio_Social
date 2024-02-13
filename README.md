# Servicio Social Microservicios

Aquí va el nombre descriptivo del proyecto.

## Descripción

Breve descripción del proyecto y su propósito.

## Tecnologías Utilizadas

- Node.js
- Express (para la aplicación backend)
- Angular (para la aplicación frontend)
- Docker

## Requisitos Previos

- Docker instalado en tu sistema.

## Instalación

1. Clona este repositorio en tu máquina local:

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   ```

2. Accede al directorio del proyecto:

   ```bash
   cd <NOMBRE_DEL_DIRECTORIO_DEL_PROYECTO>
   ```

3. Construye la imagen Docker del servidor API (si aplica):

   ```bash
   docker build -t api:latest .
   ```

4. Construye la imagen Docker de la aplicación Angular (si aplica):

   ```bash
   docker build -t angular-app:latest .
   ```

## Ejecución

- Para ejecutar el servidor API (si aplica):

  ```bash
  docker run -p 3000:3006 api:latest
  ```

- Para ejecutar la aplicación Angular (si aplica):

  ```bash
  docker run -p 8080:4200 angular-app:latest
  ```

## Acceso a la Aplicación

- Servidor API: Accede a `http://localhost:3000` en tu navegador.
- Aplicación Angular: Accede a `http://localhost:8080` en tu navegador.

## Contribuciones

Las contribuciones son bienvenidas. Si deseas contribuir a este proyecto, sigue estos pasos:

1. Haz un fork del proyecto.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit de ellos (`git commit -am 'Añadir nueva funcionalidad'`).
4. Sube tu rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

## Licencia

---

Este README.md proporciona una guía detallada sobre cómo instalar, ejecutar y contribuir al proyecto. Asegúrate de completar la información según las necesidades específicas de tu proyecto.
