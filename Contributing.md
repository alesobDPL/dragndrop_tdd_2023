# Guía de Contribución

## Autores

- [Alejandro sobarzo](@alesobDPL) - Dueño del proyecto 

## Estándar de Codificación

### Estilo de Codificación

El estilo de código de este proyecto debe seguir las recomendaciones de los siguientes estándares:
- [Estándares de Codificación de JavaScript](https://developer.mozilla.org/en-US/docs/MDN/Contribute/Guidelines/Code_guidelines/JavaScript)

### Configuraciones para Editores de Código

Antes de escribir código, asegúrate de que las configuraciones generales de tu editor estén ajustadas de la siguiente manera:

- Final/Salto de Línea (EOL - End of Line): LF, CRLF
- Codificación de Archivos de Código (Encoding - Charset): UTF-8
- Utiliza 2 (dos) espacios por indentación.
- Sigue las prácticas recomendadas para nomenclatura de variables y funciones.

### Editor Config

Busca e instala [Editor Config](https://editorconfig.org/) como plugin para tu IDE o Editor de Código. Esto configurará automáticamente las opciones para editores de código mencionadas anteriormente.

## Desarrollo del Código

### Arquitectura del Sistema - Patrones de Diseño

- El proyecto se basa en la arquitectura MERN (MongoDB, Express, React, Node.js).

## Interacción con el Repositorio

1. Crea una nueva rama a partir de la rama master para tu trabajo.

2. Desarrolla el código en la nueva rama creada:
    - Realiza commits en la rama correspondiente.
    - Describe claramente en el mensaje del commit lo que has implementado.

3. Asegúrate de escribir pruebas unitarias y de integración para verificar el correcto funcionamiento de tu desarrollo. Evita que tu nuevo código afecte de manera no intencionada otras partes del sistema.

4. Envía tu código al repositorio solo cuando todas las pruebas sean exitosas. Abre una Solicitud de Extracción (Pull Request):
    - Detalla los cambios que deseas integrar en la rama master.
    - Establece los criterios de aceptación y revisión del código.

5. Espera la aprobación de [Alejandro sobarzo](@alesobDPL), el dueño de este repositorio, antes de fusionar tu código en la rama master.

### Archivos/Directorios que no Deben Ser Versionados o Enviados al Repositorio (no incluir en los commits)

- `config/*`
- `node_modules/*`
- `env/*` 

### Archivos/Directorios que no Deben Estar en Ambientes de Producción

- `Docker/*`
- `env/*` 
- `README.md`
- `.gitignore`
- `.git/*`
