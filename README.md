<div align="center">
  <a href="https://dtoro-dev-portfolio.netlify.app/">
    <img src="https://raw.githubusercontent.com/dtoro-dev/minimalist-portfolio/master/src/assets/logo-2.2.webp" height="90px" width="auto" style="background-color: #f2f1eb; border-radius: 10px; border: 3px solid #e8c538" />
  </a> 


  # BullJS CLI

  [![Node.js](https://img.shields.io/badge/Node.js-%2343853D.svg?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
  ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
  ![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)

  ![GitHub stars](https://img.shields.io/github/stars/dtoro-dev/bulljs-cli)
  ![GitHub issues](https://img.shields.io/github/issues/dtoro-dev/bulljs-cli)
  ![GitHub forks](https://img.shields.io/github/forks/dtoro-dev/bulljs-cli)
  ![GitHub PRs](https://img.shields.io/github/issues-pr/dtoro-dev/bulljs-cli)
</div>

## Descripción

BullJS CLI es una herramienta de línea de comandos diseñada para inicializar proyectos backend basados en el repositorio [bullwork](https://github.com/dtoro-dev/bullwork). Con BullJS CLI, puedes crear nuevos proyectos rápidamente y comenzar a desarrollar en minutos. Lo puedes encontrar en *npm* [bulljs-cli](https://www.npmjs.com/package/bulljs-cli).

## Características

- **Inicialización Rápida**: Clona automáticamente el repositorio bullwork.
- **Instalación Automática de Dependencias**: Configura tu entorno de desarrollo con todas las dependencias necesarias.
- **Configuración Personalizada**: Facilita la creación de proyectos con nombres personalizados.
- **Opción de Saltar Prompts**: Si se proporciona un nombre de proyecto directamente, se salta el prompt interactivo.
- **Comandos de Versión**: Consulta la versión de BullJS CLI instalada con bull -v o bull --version.
- **Manejo de Cancelación**: Presiona Ctrl + C para cancelar el proceso de creación del proyecto con un mensaje claro en la consola.

## Instalación

Primero, instala BullJS CLI globalmente en tu máquina:

```bash
npm install -g bulljs-cli
```

### Uso
Para crear un nuevo proyecto, simplemente ejecuta:

```bash
bull new
```
O
```bash
bull new project-name
```

Esto hará lo siguiente:

- Clonará el repositorio [bullwork](https://github.com/dtoro-dev/bullwork).
- Instalará todas las dependencias necesarias utilizando pnpm.
- Configurará el proyecto en una nueva carpeta con el nombre project-name.
- Podrás utilizar los comandos del Bulljs-cli para crear y eliminar módulos.

#### Ejemplo
```bash
bull new my-awesome-project
```

### Scripts Disponibles
Una vez creado el proyecto, puedes utilizar los siguientes comandos:

 - Inicia el entorno de desarrollo.
```bash
bull run dev
```

 - Genera un nuevo módulo en el proyecto.
```bash
bull run generate:module <module-name>
```

 - Elimina un módulo existente del proyecto.
```bash
bull run remove:module <module-name>
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