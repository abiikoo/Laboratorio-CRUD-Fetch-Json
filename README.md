# Laboratorio-CRUD-Fetch-Json
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

# Mini Proyecto 1

Este **Mini Proyecto 2** es un desarrollo realizado en **PHP, HTML y CSS**, enfocado en la resolución de problemas mediante **estructuras de decisión y repetición**, el uso de **funciones, arreglos, clases con métodos estáticos** y la implementación de **buenas prácticas de programación.** 

Este trabajo tiene como propósito aplicar **técnicas y metodologías de diseño web** que permitan optimizar la ejecución y mantenimiento del código, cumpliendo criterios de **usabilidad y accesibilidad**. Además, integra medidas de **seguridad en aplicaciones PHP**, considerando los riesgos del **OWASP Top 10** (como inyección de código o ataques XSS), implementando funciones de sanitización como `htmlspecialchars()`, `preg_match()` y `filter_var()` para prevenir vulnerabilidades.

## Requisitos Previos

![PHP](https://img.shields.io/badge/PHP-8.2-blue?logo=php) ![Apache](https://img.shields.io/badge/Apache-Servidor-orange?logo=apache) ![VS Code](https://img.shields.io/badge/Editor-VS%20Code-blue?logo=visualstudiocode)  

- PHP ≥ versión **8.0**  
- Servidor local **XAMPP** o **WAMP** con Apache habilitado.  
- Editor de código (**Visual Studio Code** recomendado).  
- Navegador web actualizado (Google Chrome, Edge o Firefox).  

## Instalación y Ejecución

#### 1. Repositorio
- Clonar o descargar el repositorio
  ```bash
  git clone https://github.com/usuario/mini-proyecto-2.git

#### 2. Mover los archivos al entorno local
- Copia la carpeta completa del proyecto dentro del directorio:
  ```bash
  C:\xampp\htdocs\
  
#### 3. Iniciar el servidor Apache
- Abre el Panel de Control de XAMPP y activa el módulo Apache.

#### 4. Ejecutar en el navegador
- Abre tu navegador y accede a la siguiente dirección:
  ```bash
  http://localhost/mini_proyecto_2/
  
## Diseño y Estilo
El proyecto implementa una interfaz moderna con gradientes suaves, efectos hover, bordes redondeados y animaciones de entrada, gracias a los estilos definidos en `css_mini_proyecto.css` El diseño mantiene una estructura responsive que se adapta tanto a escritorio como a dispositivos móviles.

## Funcionalidades Principales
- Formularios dinámicos con validación de entrada.
- Cálculos automáticos de resultados según cada problema.
- Uso modular de funciones y archivos externos (`utilidades.php`, `validacion.php`).
- Interfaz gráfica con feedback visual inmediato.
- Navegación rápida entre los 10 ejercicios.

## Funciones Matemáticas y de Validación
Esta sección describe las principales **funciones matemáticas, de validación y sanitización de datos** utilizadas a lo largo del proyecto **Mini Proyecto 2**.  
Todas las funciones fueron implementadas bajo las buenas prácticas de codificación establecidas en el estándar **PSR-1**, utilizando nombres descriptivos en **camelCase** y, en algunos casos, **métodos estáticos** dentro de clases de utilidad.

### 1. Funciones Matemáticas

#### `pow($base, $exponente)`
- **Descripción:** Calcula la potencia de un número base elevado a un exponente.  
- **Uso en el proyecto:** En el **Problema 9**, para generar las 15 primeras potencias de un número entre 1 y 9.  
- **Ejemplo:**
  ```php
  $resultado = pow($numero, $exponente);
  
#### `sqrt($valor)`
- Descripción: Devuelve la raíz cuadrada positiva de un número.
- Uso en el proyecto: En los Problemas 1 y 7, para calcular la desviación estándar a partir de la varianza.
- **Ejemplo:**
  ```php
  $desviacion = sqrt($suma / $cantidad);

#### `round($numero, $decimales)`
- **Descripción:** Redondea un número decimal al número de cifras indicado.
- **Uso en el proyecto:** Se utiliza para presentar los resultados con mejor legibilidad, por ejemplo en promedios o desviaciones estándar.
- **Ejemplo:**
   ```php
   $promedio = round($suma / $cantidad, 2);

#### `min($array)` y `max($array)`
- **Descripción:** Obtienen el valor mínimo y máximo de un conjunto de datos almacenados en un arreglo.
- **Uso en el proyecto:**
  - **Problema 1:** para determinar el número mínimo y máximo entre los cinco primeros números positivos ingresados.
  - **Problema 7:** para calcular la nota más alta y más baja.
- Ejemplo:
  ```php
  $minimo = min($numeros);
  $maximo = max($numeros);

#### `array_sum($array)` y `count($array)`
- **Descripción:**
  - `array_sum()` obtiene la suma de todos los elementos del arreglo.
  - `count()` devuelve la cantidad de elementos.
- **Uso en el proyecto:** En Problemas 1 y 7, para calcular el promedio aritmético.
- Ejemplo:
  ```php
  $promedio = array_sum($notas) / count($notas);

#### `date("m")` y `date("d")`
- Descripción: Devuelven la fecha actual o extraen partes específicas (mes o día).
- Uso en el proyecto: En Problema 8 (Estación del año) y en el archivo `footer.php` para mostrar la fecha actual de ejecución.
- Ejemplo:
  ```php
  $mes = date("m");
  echo "Fecha de ejecución: " . date("d/m/Y");

#### Funciones Personalizadas (definidas en `utilidades.php`)
- **Ejemplo de función estática:**
  ```php
  class Utilidades {
  public static function calcularPromedio($numeros) {
    return round(array_sum($numeros) / count($numeros), 2);
  }
  }
- **Uso:** En Problemas 1 y 7, para centralizar los cálculos de promedio y reutilizar el código.

### 2. Funciones de Validación y Sanitización
#### `filter_var($variable, FILTER_VALIDATE_INT/FLOAT)`
- **Descripción:** Verifica si el valor ingresado es un número entero o decimal válido.
- **Uso en el proyecto:** En `validacion.php` para validar las entradas de los formularios numéricos (problemas 1, 2, 3, 4, 5, 7 y 9).
- **Ejemplo:**
  ```php
  if (!filter_var($edad, FILTER_VALIDATE_INT)) {
    echo "Por favor ingrese un número válido.";
  }

#### `htmlspecialchars($variable)`
- **Descripción:** Convierte caracteres especiales en entidades HTML para prevenir ataques XSS (Cross-Site Scripting).
- **Uso en el proyecto:** En todos los formularios que muestran valores ingresados por el usuario (problemas 5 y 8 principalmente).
- **Ejemplo:**
  ```php
  echo "Hola, " . htmlspecialchars($_POST["nombre"]) . "!";

#### `preg_match($patron, $cadena)`
- **Descripción:** Evalúa si una cadena cumple con un patrón definido mediante expresiones regulares.
- **Uso en el proyecto:** Validar entradas como texto alfabético o fechas correctas.
- **Ejemplo:**
  ```php
  if (!preg_match("/^[a-zA-Z\s]+$/", $nombre)) {
    echo "El nombre contiene caracteres inválidos.";
  }

### 3. Funciones de Navegación y Footer

#### `volverMenu($url)`
- **Descripción:** Función auxiliar para generar un botón o enlace de retorno al menú principal (`index.php`).
- **Ubicación:** Archivo `utilidades.php`.
- **Ejemplo:**
  ```php
  function volverMenu($url) {
    echo "<a class='btn volver' href='$url'>Volver al Menú Principal</a>";
  }




#### `mostrarFooter()`
- **Descripción:** Inserta automáticamente un pie de página con la fecha
- actual del sistema y la identidad institucional (UTP).
- **Ubicación:** Archivo `footer.php`.
- **Ejemplo:**
  ```php
  echo "<footer><p>Universidad Tecnológica de Panamá — " . date('d/m/Y') . "</p></footer>";

## Descripción de los Programas
A continuación estaremos viendo la interface de cada uno de los programas realizados.
### Home
<img width="1919" height="998" alt="Image" src="https://github.com/user-attachments/assets/49bfb913-3744-41f3-aa82-3970775216e4" />

### Problema 1 – Cálculo Estadístico de Números
El programa solicita cinco números positivos ingresados por el usuario a través de un formulario. Calcula la **media**, **desviación estándar**, **valor mínimo** y **valor máximo** utilizando funciones matemáticas definidas en PHP. Implementa estructuras `for` y funciones de validación para evitar datos no numéricos o vacíos.  

<img width="1919" height="895" alt="Image" src="https://github.com/user-attachments/assets/2eec03e6-ef10-4886-959f-62ed1b6f8de5" />

### Problema 2 – Múltiplos de 4
Solicita al usuario un número `N` y genera los **N primeros múltiplos de 4** (4×1, 4×2, 4×3, ...). Aplica un ciclo repetitivo y control de límite para evitar desbordamientos en la salida. El resultado se muestra en formato tabular o listado.  

<img width="1919" height="1000" alt="Image" src="https://github.com/user-attachments/assets/1c78a861-ea16-4aa4-971b-548c6bc8de1d" />

### Problema 3 – Suma de los Números del 1 al 1000 
Este programa realiza la suma de todos los números comprendidos entre **1 y 1000**, mostrando el resultado total en pantalla. Utiliza un ciclo **`for`** y muestra el resultado acumulado con formato visual. El resultado esperado es **500500**.  

<img width="1919" height="1004" alt="Image" src="https://github.com/user-attachments/assets/f4191394-e243-459c-8989-0bd11b370d5e" />

### Problema 4 – Suma de Números Pares e Impares
Calcula por separado la **suma de los números pares** y la **suma de los impares** comprendidos entre **1 y 200**. Se utiliza una estructura `for` combinada con una condición `if` para clasificar cada número. El resultado se presenta en una tabla comparativa con los totales.  

<img width="1919" height="988" alt="Image" src="https://github.com/user-attachments/assets/39985d54-65bb-4fd5-9a86-47e668c1abd5" />

### Problema 5 – Clasificación de Edades
Lee la edad de cinco personas ingresadas mediante formulario y clasifica cada una en las categorías: **Niño (0–12)**, **Adolescente (13–17)**, **Adulto (18–64)** o **Adulto mayor (65+)**. Utiliza condicionales `if–elseif` y genera estadísticas visuales de cuántas personas pertenecen a cada grupo, con apoyo de gráficos de barras.  

<img width="1919" height="982" alt="Image" src="https://github.com/user-attachments/assets/ee1ce1a0-73e2-451f-b021-68cb1e3523da" />

### Problema 6 – Presupuesto Hospitalario
Simula el reparto del presupuesto anual de un hospital entre tres áreas: **Ginecología (40%)**, **Traumatología (35%)** y **Pediatría (25%)**. A partir del presupuesto total ingresado, calcula los montos correspondientes a cada área. Los resultados se presentan en formato tabular y gráfico.  

<img width="1919" height="992" alt="Image" src="https://github.com/user-attachments/assets/6e614df9-afb2-49a6-8949-fee5d38b0fe4" />

### Problema 7 – Calculadora de Datos Estadísticos
Permite ingresar una cantidad variable de notas y calcula automáticamente:  **promedio, desviación estándar, nota mínima y máxima.**  Utiliza arreglos, ciclos `foreach` y funciones matemáticas personalizadas. Incluye validación de entradas y visualización de resultados en cuadros resaltados.  

<img width="1919" height="991" alt="Image" src="https://github.com/user-attachments/assets/4b9c66f2-d3bd-4239-8bf9-5375f421e6e6" />

### Problema 8 – Estación del Año
El usuario introduce una **fecha específica**, y el sistema determina automáticamente la **estación del año** correspondiente (primavera, verano, otoño o invierno).  
Integra imágenes alusivas a cada estación (por ejemplo, `invierno.jpg`, `verano.jpg`). Utiliza funciones de fecha (`date()`) y estructuras `if–elseif` para establecer rangos de meses.  
 
<img width="1919" height="985" alt="Image" src="https://github.com/user-attachments/assets/fb0003c2-2cf7-4aef-8534-403ba4b81e03" />

### Problema 9 – Potencias de un Número
Solicita un número del **1 al 9** y muestra las **15 primeras potencias** de ese número. Aplica ciclos `for` y operaciones exponenciales (`pow()`). Los resultados se muestran en formato de lista o tabla, con una barra de progreso visual.  

<img width="1919" height="979" alt="Image" src="https://github.com/user-attachments/assets/412b0f41-d350-44f6-980d-000d7231ff5a" />

### Problema 10 – Ventas por Vendedor y Producto
Simula el registro de ventas de **cuatro vendedores** y **cinco productos**, almacenando los datos en un **arreglo bidimensional**. Calcula las ventas totales por **vendedor** y por **producto**, mostrando una tabla con los totales cruzados. Refuerza el uso de bucles anidados, acumuladores y estructuras matriciales.  

<img width="1919" height="992" alt="Image" src="https://github.com/user-attachments/assets/a06a0f07-93f0-4d9e-a0e6-14c9ad7b297a" />

## Dificultades Y Soluciones
- **Problema:** Errores en validación de campos vacíos.
  - **Solución:** Se creó el archivo `validacion.php` con funciones específicas para controlar entradas no válidas.

- **Problema:** Estilos CSS no aplicaban correctamente al cambiar de páginas.
  - **Solución:** Se centralizó la hoja `css_mini_proyecto.css` y se enlazó correctamente desde cada archivo PHP.

- **Problema:** Problemas de rutas relativas al incluir archivos.
  - **Solución:** Se utilizó `include_once()` para mantener las dependencias correctas sin duplicar código.

## Referencias

[1] [Documentación oficial de PHP](https://www.php.net/docs.php)  
[2] [Manual de HTML5 - MDN Web Docs](https://developer.mozilla.org/es/docs/Web/HTML)  
[3] [Manual de CSS3 - MDN Web Docs](https://developer.mozilla.org/es/docs/Web/CSS)  
[4] [Guía de XAMPP](https://www.apachefriends.org/es/faq_windows.html)  
[5] [W3Schools PHP Tutorial](https://www.w3schools.com/php/)  
[6] [PHP & OWASP Top 10: Essential Steps for Keeping Your Web Application Safe and Secure — Medium](https://medium.com/@khaledzeitar/php-owasp-top-10-essential-steps-for-keeping-your-web-application-safe-and-secure-72b5e7e55523)  
[7] [OWASP Top Ten (Proyecto Oficial)](https://owasp.org/www-project-top-ten/)

---

Este laboratorio ha sido desarrollado por los estudiantes de la Universidad Tecnológica de Panamá:  
**Nombres:** Jose Bustamante y Abigail Koo  
**Correos:** jose.bustamante2@utp.ac.pa y abigail.koo@utp.ac.pa  
**Curso:** Ingeniería Web  
**Instructor:** Ing. Irina Fong <br>
**Fecha de Ejecución:** 8 de Octubre de 2025
