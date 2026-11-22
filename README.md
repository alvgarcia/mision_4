# Misión 4 - Full Contact Forms

## Descripción

Aplicación de gestión de contactos desarrollada con React.

Permite crear contactos mediante un formulario y consultar los contactos guardados.

Los contactos se almacenan en un archivo `db.json` mediante JSON Server, que simula una API REST.

El objetivo de la práctica es utilizar React Hook Form y Zod para gestionar y validar formularios, y TanStack Query para realizar peticiones HTTP.

## Lenguajes y tecnologías utilizados

- HTML
- CSS
- JavaScript
- JSX
- React 19
- Vite
- React Hook Form
- Zod
- TanStack Query v5
- JSON Server
- Vitest y Testing Library

## Funcionalidades

- **GET:** obtener y mostrar los contactos.
- **POST:** crear contactos nuevos.
- **Validación:** comprobar los campos del formulario utilizando Zod.
- **Gestión de peticiones:** utilizar `useQuery` y `useMutation`, con invalidación de consultas para actualizar el listado.
- **Feedback:** mostrar estados de carga, error, éxito y envío pendiente.
- **Accesibilidad:** asociar los errores de validación con sus campos mediante etiquetas y atributos ARIA.
- **Pruebas:** comprobar el esquema Zod y los estados principales del formulario y del listado.

## Cómo ejecutar el proyecto

Instalar las dependencias:

```bash
npm install
```

Iniciar JSON Server en una terminal:

```bash
npm run api
```

Iniciar React en otra terminal:

```bash
npm run dev
```

JSON Server estará disponible en `http://localhost:3001/contacts` y la aplicación React en la dirección local que indique Vite, normalmente `http://localhost:5173`.

## Cómo ejecutar las pruebas

```bash
npm test
```

## Uso de IA

He utilizado GitHub Copilot como herramienta de apoyo para resolver dudas sobre React Hook Form, Zod y TanStack Query, organizar el proyecto en componentes y verificar el resultado.

### Prompt 1

> Puedes preparar todo con Vite como se hizo en la M3.

### Resultado 1

La IA creó el proyecto React con Vite y configuró la estructura inicial a partir de la plantilla disponible.

### Prompt 2

Divideme en los pasos a realizar para hacer una agenda telefonica con los requisitos anteriores.

### Resultado 2

La IA describio los pasos que se tenian que realizar para completar la web y cumplir los requisitos.

## Decisiones de implementación

### Decisión 1: Utilizar JSON Server

He decidido utilizar JSON Server para simular una API REST sin necesidad de desarrollar un backend completo.

Esto permite almacenar los contactos en `db.json` y practicar las peticiones GET y POST.

### Decisión 2: Separar las validaciones en un esquema Zod

He creado un archivo `contactSchema.js` que contiene las reglas de validación del formulario.

Así las validaciones no están repartidas por los componentes y React Hook Form puede utilizarlas mediante `zodResolver`.

### Decisión 3: Separar formulario y listado

He dividido la interfaz en componentes para mantener separadas las responsabilidades:

- `ContactForm` gestiona el formulario y sus errores.
- `ContactList` muestra carga, errores, lista vacía y contactos.
- `contactsService` centraliza las peticiones a la API.

Esta separación hace que cada parte del proyecto sea más fácil de entender, probar y mantener.

### Decisión 4: Añadir pruebas automáticas

He añadido pruebas con Vitest y Testing Library para comprobar que el esquema rechaza datos incorrectos y que el formulario y el listado muestran los estados esperados.
