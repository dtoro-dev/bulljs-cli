<div align="center">
  <a href="https://dtoro-dev-portfolio.netlify.app/">
    <img src="https://raw.githubusercontent.com/dtoro-dev/minimalist-portfolio/master/src/assets/logo-2.2.webp" height="90px" width="auto" style="background-color: #f2f1eb; border-radius: 10px; border: 3px solid #e8c538" />
  </a> 


  # BullJS CLI

  [![TypeScript](https://img.shields.io/badge/TypeScript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Node.js](https://img.shields.io/badge/Node.js-%2343853D.svg?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
  [![Express](https://img.shields.io/badge/Express-%23000000.svg?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
  [![Prisma](https://img.shields.io/badge/Prisma-%2300A3E0.svg?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
  [![SQLite](https://img.shields.io/badge/SQLite-%23003B57.svg?style=for-the-badge&logo=sqlite&logoColor=white)](https://sqlite.org/)

  ![GitHub stars](https://img.shields.io/github/stars/dtoro-dev/bulljs-cli)
  ![GitHub issues](https://img.shields.io/github/issues/dtoro-dev/bulljs-cli)
  ![GitHub forks](https://img.shields.io/github/forks/dtoro-dev/bulljs-cli)
  ![GitHub PRs](https://img.shields.io/github/issues-pr/dtoro-dev/bulljs-cli)
</div>

## Descripción

BullJS CLI es una herramienta de línea de comandos diseñada para inicializar proyectos basados en el repositorio [bullwork](https://github.com/dtoro-dev/bullwork). Con BullJS CLI, puedes crear nuevos proyectos rápidamente y comenzar a desarrollar en minutos.

## Características

- **Inicialización Rápida**: Clona automáticamente el repositorio bullwork.
- **Instalación Automática de Dependencias**: Configura tu entorno de desarrollo con todas las dependencias necesarias.
- **Configuración Personalizada**: Facilita la creación de proyectos con nombres personalizados.

## Instalación

Primero, instala BullJS CLI globalmente en tu máquina:

```bash
npm install -g bulljs-cli
```

### Uso
Para crear un nuevo proyecto, simplemente ejecuta:

```bash
bull new project-name
```

Esto hará lo siguiente:

 - Clonará el repositorio [bullwork](https://github.com/dtoro-dev/bullwork).
Instalará todas las dependencias necesarias utilizando pnpm.
Configurará el proyecto en una nueva carpeta con el nombre project-name.

#### Ejemplo
```bash
bull new my-awesome-project
```

### Scripts Disponibles
Una vez creado el proyecto, puedes utilizar los siguientes comandos:

 - Inicia el entorno de desarrollo.
```bash
pnpm run dev
```

 - Genera un nuevo módulo en el proyecto.
```bash
pnpm run generate:module <module-name>
```

 - Elimina un módulo existente del proyecto.
```bash
pnpm run remove:module <module-name>
```

### Requisitos
- Node.js >= 20.15.1 (LTS)
- `pnpm` instalado globalmente.

### Contribución
Si deseas contribuir a este proyecto, sigue estos pasos:

 - Haz un fork del repositorio.
 - Crea una nueva rama (git checkout -b feature/nueva-funcionalidad).
 - Realiza tus cambios y haz un commit (git commit -am 'Añade nueva funcionalidad').
 - Sube tu rama (git push origin feature/nueva-funcionalidad).
 - Abre un Pull Request.

### Licencia
Este proyecto está licenciado bajo la licencia MIT. Consulta el archivo LICENSE para más detalles.

## Autor
Diego Toro Reyes - GitHub

¡Gracias por usar BullJS CLI! Si tienes alguna pregunta o sugerencia, no dudes en abrir un issue en el repositorio de GitHub.