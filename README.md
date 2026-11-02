## Tarea 2

*Curso:* SOFT-12 — Programación Web Avanzada  
*Universidad:* CENFOTEC  
*Proyecto:* Buscador de libros y tablero de lecturas
*Estudiante:* Roberto González Castillo

## 1. Presentación del proyecto

Estantería Común es una aplicación para un club de lectura que permite consultar libros, administrar lecturas y registrar propuestas.

El proyecto se divide en dos partes, desarrolladas con tecnologías diferentes:

- *Parte A — JavaScript:* buscador conectado a Open Library, con visualización de resultados, detalles de libros, lista de lectura y formulario de propuestas.
- *Parte B — React:* tablero para organizar las lecturas del club mediante estados, filtros, resumen y registro de nuevos libros.

El propósito es aplicar conceptos de manipulación del DOM, comunicación con APIs, validación de formularios, diseño adaptable y administración del estado en React.

## 2. Tecnologías utilizadas

| Tecnología | Aplicación |
|---|---|
| HTML5 | Estructura de la interfaz y formularios |
| CSS3 | Presentación y diseño adaptable |
| JavaScript | Eventos, DOM y comunicación con servicios |
| Bootstrap | Grillas, formularios, botones, tarjetas y modales |
| Sass | Organización de estilos mediante archivos parciales |
| React | Componentes y actualización declarativa |
| Vite | Entorno de desarrollo de React |
| Open Library | Consulta pública de libros |
| JSONPlaceholder | Simulación del envío de propuestas |

## 3. Organización del repositorio

text
SOFT-12-Tarea2/
├── buscador-js/
│   ├── assets/
│   │   └── sin-portada.jpg
│   ├── css/
│   │   └── estilos.css
│   ├── js/
│   │   ├── api.js
│   │   ├── formulario-busqueda.js
│   │   ├── formulario-propuesta.js
│   │   ├── lista.js
│   │   └── render.js
│   ├── scss/
│   │   ├── componentes/
│   │   │   ├── _busqueda-libros.scss
│   │   │   ├── _general.scss
│   │   │   ├── _header.scss
│   │   │   ├── _lista-libros.scss
│   │   │   └── _modal-detalle.scss
│   │   └── estilos.scss
│   ├── index.html
│   └── package.json
├── tablero-react/
│   ├── public/
│   ├── src/
│   │   ├── componentes/
│   │   │   ├── comunes/
│   │   │   ├── filtros/
│   │   │   ├── formulario/
│   │   │   ├── layout/
│   │   │   ├── libros/
│   │   │   └── resumen/
│   │   ├── data/
│   │   │   └── libros.js
│   │   ├── utils/
│   │   │   ├── libros.js
│   │   │   └── validarLibro.js
│   │   ├── App.jsx
│   │   ├── estilos.css
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
├── docs/
│   └── depuracion.md
├── .gitignore
└── README.md


Las dos aplicaciones se encuentran en carpetas independientes, lo que permite ejecutar y revisar cada implementación por separado.

## 4. Instalación y ejecución

### Requisitos previos

Para ejecutar el proyecto se necesita:

- Node.js y npm.
- Un editor de código, como Visual Studio Code.
- Un navegador web actualizado.
- Conexión a Internet para consultar las APIs externas.

### Parte A — Buscador de libros

Desde la raíz del repositorio:

bash
cd buscador-js
npm install


Abrir index.html utilizando un servidor local, como Live Server de Visual Studio Code.

La aplicación utiliza módulos JavaScript, por lo que se recomienda ejecutarla mediante HTTP en lugar de abrir directamente el archivo con file://.

Los estilos se organizan en archivos Sass y el repositorio incluye el archivo CSS generado.

### Parte B — Tablero React

Abrir otra terminal y ejecutar:

bash
cd tablero-react
npm install
npm run dev


Acceder a la dirección local que indique Vite.

Para compilar la aplicación:

bash
npm run build


Para visualizar la versión compilada:

bash
npm run preview


## 5. Parte A — Buscador con JavaScript

### 5.1 Consulta de libros

El buscador permite introducir un término y consultar la API de Open Library.

La solicitud se realiza con fetch() y async/await desde el módulo js/api.js.

La aplicación procesa la respuesta y obtiene información como:

- Título del libro.
- Autor o autores.
- Año de primera publicación.
- Imagen de portada.
- Disponibilidad del libro en español.

Cuando un libro no dispone de portada, se utiliza una imagen alternativa almacenada en assets/sin-portada.jpg.

### 5.2 Generación de resultados

El archivo js/render.js contiene las funciones encargadas de representar los resultados en pantalla.

Se utilizan métodos como document.createElement(), append() y replaceChildren() para construir tarjetas y actualizar distintas secciones de la interfaz.

La aplicación contempla diferentes situaciones durante una búsqueda:

- Carga de resultados.
- Resultados encontrados.
- Búsqueda sin coincidencias.
- Errores al consultar el servicio.

### 5.3 Detalles y lista de lectura

Los resultados incluyen un botón que permite abrir un modal con información adicional del libro.

Desde ese modal se puede agregar el libro a una lista de lectura.

El archivo js/lista.js administra la colección y las acciones disponibles:

- Agregar libros evitando identificadores duplicados.
- Cambiar entre los estados Pendiente, Leyendo y Leído.
- Eliminar registros de la lista.
- Actualizar la tabla después de modificar los datos.

Los libros se mantienen en un arreglo de JavaScript durante el uso de la aplicación.

### 5.4 Formulario de propuestas

La aplicación incorpora un formulario para proponer nuevas lecturas.

Entre los datos solicitados se encuentran el título, autores, año de publicación, páginas, correo electrónico, fecha de sesión y motivo de la propuesta.

El formulario utiliza atributos de validación HTML5 y comprobaciones mediante JavaScript.

También permite agregar campos adicionales de autores durante la ejecución.

Cuando la información es válida, se envía una solicitud POST a JSONPlaceholder para simular el registro de la propuesta.

La interfaz informa el resultado mediante un modal de notificación.

*Nota:* JSONPlaceholder es un servicio de pruebas. Los datos enviados no se almacenan permanentemente.

## 6. Parte B — Tablero de lecturas con React

### 6.1 Componentes

El tablero se divide en componentes funcionales que cumplen responsabilidades específicas.

| Componente | Responsabilidad |
|---|---|
| Pagina | Estructura general de la aplicación |
| Encabezado | Barra de navegación |
| Panel | Contenedor reutilizable |
| ListaLibros | Renderizado del conjunto de libros |
| TarjetaLibro | Información y acciones de cada libro |
| Filtros | Selección de criterios de filtrado |
| Resumen | Presentación de cantidades por estado |
| FormularioLibro | Registro de nuevas lecturas |

Los componentes se comunican mediante props, permitiendo compartir información y ejecutar acciones definidas en componentes superiores.

### 6.2 Administración de lecturas

El archivo App.jsx utiliza useState para administrar la colección de libros.

Las principales acciones son:

- *Agregar:* incorporar un libro con estado inicial Pendiente.
- *Cambiar estado:* avanzar al siguiente estado de lectura.
- *Eliminar:* retirar un libro del arreglo.

Las actualizaciones se realizan mediante map(), filter() y el operador de propagación, creando nuevos arreglos u objetos sin modificar directamente los valores anteriores.

### 6.3 Filtros

El tablero permite combinar tres criterios de filtrado:

- Estado de lectura.
- Miembro que propuso el libro.
- Idioma original de la obra.

Los filtros se administran en App.jsx y se comunican al componente Filtros mediante props.

La lista visible se calcula utilizando filter() sobre la colección de libros.

### 6.4 Resumen de lecturas

El componente Resumen muestra la cantidad de libros correspondiente a cada estado.

Los conteos se calculan a partir del arreglo principal, evitando mantener un segundo estado con información que puede derivarse de los datos existentes.

De esta forma, cuando se agrega, elimina o cambia el estado de un libro, el resumen se actualiza de acuerdo con la colección.

### 6.5 Formulario controlado

El formulario React permite registrar libros indicando:

- Título.
- Autor.
- Idioma original.
- Miembro que propone la lectura.

Los valores de los campos se almacenan mediante useState.

Cada modificación se gestiona con onChange, mientras que el envío utiliza onSubmit y una función de validación definida en utils/validarLibro.js.

Cuando los datos son válidos, el formulario comunica el nuevo libro a App.jsx mediante una prop de tipo función.

## 7. Del DOM manual a React

Una de las diferencias principales entre las dos partes es la manera en que se actualiza la interfaz después de modificar un libro.

### Parte A — Actualización manual

En buscador-js/js/lista.js, la función cambiarEstado() localiza el libro correspondiente, calcula el siguiente estado y actualiza el arreglo.

Después, llama a mostrarLista(), definida en js/render.js, para reconstruir el contenido de la tabla a partir del arreglo actualizado.

Por lo tanto, el desarrollador debe indicar explícitamente cuándo y cómo modificar los elementos del DOM.

### Parte B — Actualización mediante estado

En tablero-react/src/App.jsx, la función avanzar() también utiliza map() para crear una nueva colección con el estado actualizado.

Sin embargo, en lugar de reconstruir manualmente la tabla o las tarjetas, llama a setLibros().

React procesa el cambio de estado y vuelve a renderizar los componentes correspondientes, mostrando la información actualizada.

### Comparación

| Aspecto | JavaScript nativo | React |
|---|---|---|
| Datos | Arreglo de JavaScript | Estado con useState |
| Eventos | addEventListener | onClick y otras props de eventos |
| Actualización | Funciones de renderizado del DOM | Actualización mediante setLibros |
| Listas | Creación de elementos HTML | map() y componentes |
| Comunicación | Importación de funciones entre módulos | Props y funciones |
| Sincronización | Se invocan funciones para actualizar la interfaz | El renderizado responde a cambios del estado |

La principal ventaja del enfoque utilizado con React es que permite describir cómo debe verse la interfaz según los datos actuales, sin reconstruir manualmente sus elementos después de cada modificación.

## 8. Decisiones de implementación

### Organización modular

La Parte A separa la consulta de servicios, la búsqueda, el formulario, la lista y el renderizado en archivos distintos.

Esta división facilita localizar funcionalidades y mantener responsabilidades diferenciadas.

### Uso de Bootstrap

Bootstrap proporciona componentes y clases utilitarias para construir la interfaz, organizar el contenido y facilitar la adaptación a diferentes tamaños de pantalla.

### Organización de estilos Sass

La Parte A utiliza un archivo principal scss/estilos.scss que reúne estilos distribuidos en parciales para diferentes secciones de la interfaz.

Esta estructura permite mantener los estilos separados según su propósito.

### Estado compartido en React

El estado principal se mantiene en App.jsx, ya que diferentes componentes necesitan acceder a la misma colección de libros.

Los componentes hijos reciben los datos y las funciones necesarias mediante props.

### Datos derivados

Los filtros y el resumen se calculan a partir del estado principal en lugar de almacenar copias independientes.

Esto facilita que la interfaz refleje los cambios en la colección.

## 9. Depuración y pruebas

El proyecto incluye el archivo docs/depuracion.md, destinado a documentar el proceso de depuración y las observaciones realizadas mediante las herramientas de desarrollador.

Para verificar el funcionamiento de las aplicaciones se pueden revisar los siguientes escenarios:

- Búsquedas con resultados y sin coincidencias.
- Respuestas y errores de las APIs externas.
- Prevención de libros duplicados.
- Cambio de estados y eliminación de lecturas.
- Validación del formulario de propuestas.
- Combinación de filtros en React.
- Actualización del resumen de lecturas.
- Validación y registro de libros desde React.
- Adaptación de la interfaz en diferentes tamaños de pantalla.

## 10. Control de versiones

El proyecto utiliza Git para registrar los cambios realizados durante el desarrollo.

El historial puede consultarse directamente en GitHub:

[Consultar historial de commits](https://github.com/verbrannt-bob/SOFT-12-Tarea2/commits/main)

## 11. Conclusión

Estantería Común permite comparar dos enfoques de desarrollo web aplicados a un mismo problema.

La Parte A utiliza JavaScript nativo para gestionar eventos, consultar servicios y modificar directamente el DOM.

La Parte B utiliza React para dividir la interfaz en componentes y mantenerla sincronizada con los datos mediante el estado.

El proyecto reúne conceptos de desarrollo web como comunicación asincrónica, formularios, organización modular, diseño adaptable y actualización dinámica de interfaces.

## Resumen de commits|| # |

<!-- INICIO TABLA COMMITS -->
| # | Fecha | Hash | Mensaje |
|---|-------|------|---------|
| 2026-11-01 | 069b2fd | Agregar estilso propios |
| 2026-11-01 | 01c9f90 | Formularrio de Propuesta en buscador-js |
| 2026-11-01 | 54d190a | Corrección de error no registra idioma en formulario |
| 2026-11-01 | 03e61e2 | Escribir App.jsx + corección de errores |
| 2026-11-01 | 7df8726 | Componente FormularioLibro |
| 2026-11-01 | ece0ba5 | Componente de Filtros y ajustes a las tarjetas para Filtro Idioma |
| 2026-11-01 | 463bed8 | Componente de Resumen |
| 2026-11-01 | 7e54acc | Componentes para la organización visual de la página |
| 2026-11-01 | 1f08539 | Componentes para la lista de libros |
| 2026-11-01 | 4724930 | Funcionalidad de lista de lectura sin estilos |