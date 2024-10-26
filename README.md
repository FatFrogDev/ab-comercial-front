# Front end AB-COMERCIAL prueba técnica

Este proyecto es una aplicación web para gestionar solicitudes de vehículos. Permite a los usuarios solicitar vehículos, ver las solicitudes existentes y editar o eliminar solicitudes. 
Este proyecto se complementa con el [backend](https://github.com/FatFrogDev/ab-comercial-front) de la aplicación.

# Contenido

- [Tecnologías](#Tecnologías)
- [Dependencias](#Dependencias)
- [Como ejecutar](#Como-Ejecutar)
- [End Points](#End-Points)


## Tecnologías

- Vite
- React

## Dependencias

- react
- react-dom
- react-router-dom

## Configuración

Configurar las variables de entorno. 
- Crear un archivo `".env.local"`
- Asignar el valor `"VITE_BASE_BACKEND_URL="https://tubackend/api/v1"`

## Como ejecutar

1. Clonar el repositorio:

```sh
   git clone https://github.com/FatFrogDev/ab-comercial-front.git
```
2. Navegar al repo

```sh
    cd ab-comercial-front
```
3. Instalar dependencias

```sh
    npm install
```

4. Correr el proyecto

```sh
    npm run dev
```

## Despliegue

Para el despliegue(en teoría), solo debe configurar una variable de entorno mediante la configuración del proyecto que se vaya a usar para despliegue.<br>
La variable es la siguiente:
```js
  const BASE_URL= import.meta.env.VITE_BASE_BACKEND_URL ;
```
Dado que se usa vite. Se recomienda usar el prefijo `"VITE_"`, de otro modo puede ser no reconocida por vite.<br>
Agregue el valor de esta variable mediante el menú de su sitio de despliegue. Considere añadir o configurar opciones adicionales (como en este caso el archivo `"vercel.json"`), despliegue y verifique la disponibilidad y funcionalidad del sitio.
# End Points

Los endpoints para esta web se componene de dos:

- "/" -> Landing page.
- "/dashboard" -> Dashboard contenedor del contenido.

---
Hecho con ♥ por [Deyby Ariza](https://github.com/fatfrogdev/)

