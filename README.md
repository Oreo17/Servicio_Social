# Sistema de Tutoría Escolar

El proyecto del Sistema de Tutoría Escolar tiene como objetivo abordar y reducir los problemas identificados en el ámbito universitario, proporcionando un sistema dedicado al acompañamiento académico de los estudiantes. Los estudiantes de la BUAP generalmente tienen problemas para visualizar su avance académico de forma fácil y gráfica, generando problemas en mantener un seguimiento de su situación e información importante. Este sistema integra un seguimiento detallado del historial académico, brindando vistas específicas tanto para alumnos como para tutores, además de mostrar dicho historial académico con una buena presentación, mejorando la accesibilidad para todo usuario que use el sistema.

## Microservicios

El Sistema de Tutoría Escolar se implementa utilizando una arquitectura de microservicios. Los microservicios son una forma de estructurar una aplicación como un conjunto de pequeños servicios independientes, cada uno de los cuales se centra en realizar una tarea específica.

### Ventajas de los Microservicios:

- **Escalabilidad**: Los microservicios permiten escalar partes específicas de la aplicación según sea necesario, lo que mejora la capacidad de respuesta y la eficiencia.
- **Flexibilidad**: Cada microservicio puede ser desarrollado, desplegado y actualizado de forma independiente, lo que facilita la incorporación de cambios y mejoras en la aplicación.

- **Mantenimiento Simplificado**: Al dividir la aplicación en servicios más pequeños y enfocados, el mantenimiento y la resolución de problemas se simplifican, ya que cada microservicio es más fácil de entender y depurar.

### Implementación de Microservicios en el Sistema de Tutoría Escolar:

El Sistema de Tutoría Escolar se divide en los siguientes microservicios:

1. **Gestión de Usuarios**: Maneja el registro, inicio de sesión y gestión de perfiles de usuarios.

2. **Gestión de Tutorías**: Administra la programación y seguimiento de sesiones de tutoría entre estudiantes y tutores.

3. **Gestión Académica**: Maneja el seguimiento y visualización del historial académico de los estudiantes.

4. **Interfaz de Usuario**: Proporciona una interfaz de usuario amigable para que los estudiantes y tutores interactúen con el sistema.

Cada microservicio es independiente y se comunica con los demás a través de interfaces bien definidas, lo que permite una fácil integración y colaboración entre los diferentes componentes del sistema.

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
   git clone <https://github.com/Oreo17/Servicio_Social.git>
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
