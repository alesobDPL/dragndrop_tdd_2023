# **DND_proyect**

Software dedicado a la empresa Bapets

## **Tabla de contenidos**
1. [Software Stack](#software-stack)
2. [Conexión a la base de datos](#conexión-a-la-base-de-datos)
3. [Clonación del repositorio](#clonación-del-repositorio)
4. [Variables de entorno](#variables-de-entorno)
5. [Instalar dependencias del proyecto ambiente de desarrollo](#instalar-dependencias-del-proyecto-ambiente-de-desarrollo)
6. [Entorno de producción (Servidor)](#servidor-de-producción)
7. [Instalar dependencias del proyecto ambiente de producción](#instalar-dependencias-del-proyecto-ambiente-de-producción)
8. [Credenciales de acceso](#credenciales-de-acceso)
9. [Construido con](#construido-con)




## **Software stack**
El proyecto "DND_proyect" es una aplicación web que corre sobre el siguiente software:

- Ubuntu 20.04
- NodeJS 18.16.1
- NextJS 12.1.6
- ReactJS 18.2.0
- ExpressJS 4.18.2
- Mongoose 7.2.0
- MongoDB 4.5.0
- MongoAtlas
- Yarn
- NPM
## **Configuraciones de Ejecución para Entorno de Desarrollo y Produccción**

### Conexión a la base de datos
Para obtener un string de conexion de atlas lo primero que se debe hacer es ir a la página de [MongoAtlas](https://account.mongodb.com/account/login), se registra y le pedirá que ingrese un nombre y contraseña para una base de datos. Crea la nueva base de datos y luego en el menú de la izquierda selecciona "Clusters" y luego "Connect" y selecciona "Connect your application" y copia el string de conexion. Este string de conexion debe ser para el que se entrega con la siguiente configuracion:
- NodeJS
- 2.2.12 or later

Con esto deberia entregarse un string de conexion tal que asi:
```
mongodb://tallerDesarrollo:<password>@tallerDesarrollo-shard-00-00.eziad.mongodb.net:27017,tallerDesarrollo-shard-00-01.eziad.mongodb.net:27017,tallerDesarrollo-shard-00-02.eziad.mongodb.net:27017/?ssl=true&replicaSet=atlas-li16kg-shard-0&authSource=admin&retryWrites=true&w=majority
```

Entre las etiquetas < > se debe reemplazar el password por el que se le entrega al crear la base de datos.

Este string de conexion debe ser reemplazado en el archivo .env que se encuentra en la raiz del proyecto, en la variable de entorno `DB`.



### **Clonación del repositorio**
Para obtener una copia del proyecto se debe clonar el repositorio de GitHub, para esto se debe ejecutar el siguiente comando en la terminal:

```bash
git clone -b [branch] https://github.com/alesobDPL/dragndrop_tdd_2023/
```

Si se desea clonar el backend del proyecto se debe reemplazar `[branch]` por `backendProd` y si se desea clonar el frontend del proyecto se debe reemplazar `[branch]` por `frontendProd`. Si quieres se desea clonar el proyecto completo se debe reemplazar `[branch]` por `main`.

### **Variables de entorno**
- Se debe generar un archivo .env en la carpeta frontend y backend respectivamente, el cual debe contener las siguientes variables de entorno:

**Backend:**
```.env
DB=MONGOATLASURL
PORT=3001
ORIGIN = http://localhost:3000
JWT_SECRET = CLAVESECRETA
EMAIL_USER = user_email
EMAIL_PASS = user_pass
NODE_VERSION = 18.16.1

```
- Para la variable `DB`, se debe ingresar la URL de la base de datos de MongoAtlas, la cual se puede obtener en el siguiente link: https://www.mongodb.com/cloud/atlas
- Para la variable `SECRET_TOKEN`, se debe ingresar una cadena de caracteres que se utilizará para la encriptación de las contraseñas de los usuarios.


**Frontend:**
```
SERVIDOR = colocar_url_de_backend


"Variables para declarar el peso maximo soportado por cada equipo.
Cada equipo soporta 2 mascotas, por lo tanto, si el peso maximo declarado es de 20(kg),
la suma del peso de las mascotas no debiese superar ese peso. "

PESO_EQUIPO_1 = 10
PESO_EQUIPO_2 = 25
PESO_EQUIPO_3 = 55
PESO_EQUIPO_4 = 85
PESO_EQUIPO_5 = 0 "extra"

JWT_SECRET = CLAVESECRETA
```
- Para la variable `SERVIDOR`, se debe ingresar la URL del servidor de backend, para producción se debe ingresar la IP: `http://00:000:000:00/api`. Para desarrollo se debe ingresar la IP del servidor de desarrollo.




## **Servidor de producción**
Es importante considerar que para el funcionamiento correcto del proyecto deben estar corriendo los proyectos en diferentes servidores donde deberan realizarse los pasos de instalación de dependencias y configuración de variables de entorno.

Para configurar el servidor de producción se debe seguir los siguientes pasos en ambos servidores, frontend y backend:


Iniciar el modo root e ingresar las credenciales de administrador del servidor
```bash
sudo su
```

Actualizar el sistema operativo
```bash
apt-get update
```

Instalar curl para descargar paquetes
```bash
apt-get install -y curl
```

Instalar autoclean para limpiar el sistema
```bash
apt-get -y autoclean
```

Instalar git para clonar el repositorio
```bash
apt-get install git
```

Instalar nano para editar archivos
```bash
apt-get install nano
```

Instalar nvm para instalar NodeJS
```bash
curl --silent -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.2/install.sh | bash
```
Reiniciar bash para que se puedan utilizar comandos de NVM

```bash
exec bash
```

Instalar version 18.16.1 de NodeJS
```bash
nvm install 18.16.1
```
Cambiar alias de NodeJS
```bash
nvm alias default 18.16.1
```
Cambiar la version de NodeJS
```bash
nvm use default
```

Instalar yarn para instalar dependencias y pm2 para correr la aplicación
```bash
npm install -g yarn
npm install -g pm2
```

Clonar el repositorio del proyecto como se menciona en el apartado "Clonación del repositorio"


Luego de haber clonado el repositorio se debe mover hacia la carpeta raiz del proyecto, para esto se debe ejecutar el siguiente comando:

```bash
cd dragndrop_tdd_2023
```

### **Instalar dependencias del proyecto ambiente de producción**

Si se encuentra en la carpeta raiz del proyecto y desea instalar las dependencias, se debe ejecutar el siguiente comando:

```bash
yarn install
```

Para poder ejecutar el proyecto se debe generar el .env en la carpeta raiz del proyecto, el cual debe contener las variables mencionadas anteriormente dependiendo de cual de los proyectos este corriendo, el frontend o el backend. Para generar el .env mediante terminal se debe ejecutar el siguiente comando:

```bash
touch .env
```

Para modificar el archivo .env se debe ejecutar el siguiente comando:

```bash
nano .env
```

Para ejecutar el proyecto se debe ejecutar el siguiente comando en la terminal:

```bash
pm2 start yarn -- dev
```

Para visualizar el frontend se debe dirigir a la siguiente ruta:

```bash
http://localhost:3000
```

## **Credenciales de acceso**
| usuario | Contraseña | Tipo Usuario |
|--------------------|------------|
|admin| 12345|admin|
|pancho|12345|user|


## **Construido con**

- [ReactJS](https://es.reactjs.org/) - Framework Javascript para manejo de logica funcional de Frontend
- [Next.JS](https://nextjs.org/) - Libreria de React para generación de proyectos Serverless y base del proyecto visual
- [Express](https://expressjs.com/es/) - Framework utilizado para creación de backend con API RESTFUL
- [Mongoose](https://mongoosejs.com/) - Gestor de base de datos no relacional MongoDB
- [Nodemailer](https://nodemailer.com/about/) - Libreria de envio de correos electronicos
- [Chakra](https://chakra-ui.com/) - Libreria de componentes visuales para frameworks
- [JWT-Simple](https://www.npmjs.com/package/jwt-simple) - Libreria generadora de tokens
- [moment](https://momentjs.com/) - Libreria de manejo de tiempos para tokens
- [Yarn](https://yarnpkg.com/) - Administrador de dependencias
- [dotenv](https://www.npmjs.com/package/dotenv) - Libreria de lectura de archivos .env
- [bcrypt](https://openbase.com/js/bcrypt/documentation) - Libreria para encriptar información
- [cors](https://www.npmjs.com/package/cors) - Libreria de control de acceso
- [MongoDB](https://www.mongodb.com/) - Base de datos no relacional
- [MongoDB Compass](https://www.mongodb.com/try/download/compass) - Administrador de base de datos
- [Axios](https://axios-http.com/docs/intro) - Libreria de consultas con protocolo http y https
- [React-Icons](https://react-icons.github.io/react-icons/) - Libreria de iconos como componentes de React
- [Nodemon](https://nodemon.io/) - Monitoreador de cambios
- [Github](https://github.com) - Almacenador de control de versiones
- [Git](https://github.com) - Sistema de control de versiones