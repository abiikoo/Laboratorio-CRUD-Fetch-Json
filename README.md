<p align="center">
  <a href="https://www.php.net/" target="_blank">
    <img src="https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg" width="400" alt="PHP Logo">
  </a>
</p>

<p align="center">
  <a href="https://www.php.net/releases/"><img src="https://img.shields.io/badge/PHP-8.2-blue?logo=php"></a>
  <a href="https://www.apachefriends.org/es/index.html"><img src="https://img.shields.io/badge/XAMPP-Apache-orange?logo=apache"></a>
  <a href="https://developer.mozilla.org/es/docs/Web/HTML"><img src="https://img.shields.io/badge/HTML-5-red?logo=html5"></a>
  <a href="https://developer.mozilla.org/es/docs/Web/CSS"><img src="https://img.shields.io/badge/CSS-3-blue?logo=css3"></a>
  <a href="https://code.visualstudio.com/"><img src="https://img.shields.io/badge/Editor-VS%20Code-blue?logo=visualstudiocode"></a>
</p>

# Laboratorio-CRUD-Fetch-Json

Este proyecto presenta el desarrollo completo de una aplicación CRUD implementada con PHP, Fetch API, JSON y MySQL, siguiendo una arquitectura basada en clases y un controlador centralizado. Se creo un sistema web capaz de: Registrar productos, Editarlos, Eliminarlos, Listarlos dinámicamente, Realizar búsquedas por código o nombre, Validar datos del cliente y del servidor, Gestionar errores usando respuestas JSON.
Además, se implementó una interfaz en HTML utilizando Bootstrap, junto con el uso de SweetAlert2 para la visualización de alertas modernas y amigables. El sistema cumple con todos los requisitos definidos en la guía del laboratorio.


## Requisitos Previos

![PHP](https://img.shields.io/badge/PHP-8.2-blue?logo=php) ![Apache](https://img.shields.io/badge/Apache-Servidor-orange?logo=apache) ![VS Code](https://img.shields.io/badge/Editor-VS%20Code-blue?logo=visualstudiocode)  

- PHP ≥ versión **8.0**  
- Servidor local **XAMPP** o **WAMP** con Apache habilitado.  
- Editor de código (**Visual Studio Code** recomendado).  
- Navegador web actualizado (Google Chrome, Edge o Firefox).
- Conexión a phpMyAdmin

## Funcionalidades Principales
- CRUD completo funcionando:
  - Crear: inserción validada y confirmación visual
  - Leer: listado dinámico actualizado con Fetch
  - Actualizar: datos precargados y guardados correctamente
  - Eliminar: con confirmación moderna y actualización automática
  - Buscar: por nombre o código, en tiempo real con Fetch
- Validaciones en backend y frontend
- Manejo de respuestas JSON
- Diseño responsivo con Bootstrap
- Alertas con SweetAlert2
- Código organizado en clases + controlador central
- Estilos visuales agregados con CSS personalizado lila

## Estructura del Proyecto
- Para que este proyecto funcione es fundamental mantener una estructura ordenada.
  ```php
  /labcrudfetchsql
  │
  ├── index.html
  ├── script.js
  ├── style.css
  ├── registrar.php
  │
  ├── Modelo/
  │   ├── conexion.php
  │   └── Productos.php
## Funciones y Clases Importantes en PHP
### 1️.Clase DB (`Modelo/conexion.php`)

**Funciones clave:**

- **`getInstance()`**  
  Implementa el patrón *Singleton* para garantizar una sola conexión a la base de datos (BD).

- **`insertSeguro($sql, $params)`**  
  Ejecuta queries `INSERT` con parámetros de forma segura usando PDO.

- **`updateSeguro($sql, $params)`**  
  Similar a `insertSeguro`, pero utilizado para operaciones `UPDATE` y `DELETE`.

- **`query($sql, $params)`**  
  Ejecuta consultas `SELECT` y retorna arreglos asociativos usando PDO.


### 2️. Clase Producto (`Modelo/Productos.php`)
Gestiona toda la lógica relacionada con los productos.
**Métodos principales:**

- **`__construct($data)`**  
  Constructor que mapea los datos del formulario al objeto.

- **`validar()`**  
  Verifica que los campos del formulario sean válidos.  
  Devuelve un arreglo `errors[]` que luego se envía en formato JSON al front-end.

- **`guardar()`**  
  Inserta un producto nuevo en la base de datos.

- **`editar()`**  
  Actualiza los datos de un producto existente.

- **`eliminar($id)`**  
  Elimina un producto de la tabla según su `id`.

- **`listarTodos()`**  
  Retorna todos los productos ordenados de forma ascendente (ASC).

- **`buscarPorTexto($texto)`**  
  Realiza una búsqueda por código **o** nombre del producto.


### 3️. Controlador `registrar.php`

Actúa como punto central de las operaciones del CRUD.

- **`switch ($_POST['Accion'])`**  
  Controla todas las acciones del sistema:
  - `Guardar`
  - `Modificar`
  - `Listar`
  - `Buscar`
  - `Eliminar`

- **`json_encode($response)`**  
  Envía la respuesta al frontend en formato JSON con la estructura:
  ```json
  {
    "success": true,
    "message": "",
    "errors": [],
    "data": []
  }

## Capturas del Programa
A continuación estaremos viendo la interface del programa realizado.
### Inicio
<img width="1088" height="556" alt="Image" src="https://github.com/user-attachments/assets/889f723b-88b5-4188-81fb-a0a6a3a44ce2" />

### Registro de Producto
<img width="1088" height="564" alt="Image" src="https://github.com/user-attachments/assets/e5d450bb-5844-4887-8d18-052f9c30c120" />

### SweetAlert2
<img width="1088" height="566" alt="Image" src="https://github.com/user-attachments/assets/8bebbb4f-e700-43d3-93cf-153bf084986b" />

### Tabla Actualizada
<img width="1088" height="567" alt="Image" src="https://github.com/user-attachments/assets/a1f775d9-1b46-43c6-9988-4e0a6bad2fdb" />

### Busqueda
<img width="1088" height="465" alt="image" src="https://github.com/user-attachments/assets/22248546-96eb-4c38-ac81-76dd9c7dd93d" />

### Edición de Producto
<img width="1088" height="563" alt="image" src="https://github.com/user-attachments/assets/e4d05fae-d8a9-4bd0-a2a8-1ea58e232e5a" />

### Eliminar Producto
<img width="1088" height="569" alt="image" src="https://github.com/user-attachments/assets/1fc939cb-13e5-41b5-b33b-5131061cdd25" />

### Producto Eliminado
<img width="1088" height="561" alt="image" src="https://github.com/user-attachments/assets/94400457-ef4d-46d1-9d05-3ac8b974701c" />

### Ejemplo de Error
<img width="1088" height="561" alt="image" src="https://github.com/user-attachments/assets/5633dd54-ef55-4495-a9e3-1a0fe527538e" />


## Referencias
[1] [Documentación oficial de PHP](https://www.php.net/docs.php)  
[2] [Documentación PDO – PHP Manual](https://www.php.net/manual/es/book.pdo.php)  
[3] [Fetch API – MDN Web Docs](https://developer.mozilla.org/es/docs/Web/API/Fetch_API)  
[4] [FormData – MDN Web Docs](https://developer.mozilla.org/es/docs/Web/API/FormData)  
[5] [JSON – JavaScript Object Notation](https://www.json.org/json-es.html)  
[6] [Bootstrap 5 – Documentación oficial](https://getbootstrap.com/docs/5.3/getting-started/introduction/)  
[7] [SweetAlert2 – Documentación oficial](https://sweetalert2.github.io/)  
[8] [MySQL Prepared Statements](https://dev.mysql.com/doc/refman/8.0/en/sql-prepared-statements.html)  
[9] [Guía de XAMPP](https://www.apachefriends.org/es/faq_windows.html)  
[10] [W3Schools PHP Tutorial](https://www.w3schools.com/php/)  


---

Este laboratorio ha sido desarrollado por los estudiantes de la Universidad Tecnológica de Panamá:  
**Nombres:** Jose Bustamante y Abigail Koo  
**Correos:** jose.bustamante2@utp.ac.pa y abigail.koo@utp.ac.pa  
**Curso:** Ingeniería Web  
**Instructor:** Ing. Irina Fong <br>
**Fecha de Ejecución:** 13 de Noviembre de 2025
