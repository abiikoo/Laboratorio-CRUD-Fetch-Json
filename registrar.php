<?php
header("Content-Type: application/json; charset=utf-8");

require_once "Modelo/Productos.php";

$accion = $_POST['Accion'] ?? '';

$response = [
    'success' => false,
    'message' => 'Acción no reconocida',
    'accion'  => $accion,
    'errors'  => []
];

try {
    switch ($accion) {
        case 'Guardar':
            $producto = new Producto($_POST);
            $errores = $producto->validar();

            if (!empty($errores)) {
                $response['errors']  = $errores;
                $response['message'] = "Hay errores de validación";
            } else {
                if ($producto->guardar()) {
                    $response['success'] = true;
                    $response['message'] = "Producto guardado correctamente";
                } else {
                    $response['message'] = "No se pudo guardar el producto";
                }
            }
        break;

        case 'Modificar':
            $producto = new Producto($_POST);
            $errores = $producto->validar();

            if (!empty($errores)) {
                $response['errors']  = $errores;
                $response['message'] = "Hay errores de validación";
            } else {
                if ($producto->editar()) {
                    $response['success'] = true;
                    $response['message'] = "Producto actualizado correctamente";
                } else {
                    $response['message'] = "No se pudo actualizar el producto";
                }
            }
        break;

        case 'Listar':
            $data = Producto::listarTodos();
            $response['success'] = true;
            $response['data']    = $data;
            $response['message'] = "Listado de productos";
        break;

        case 'Buscar':
            // Búsqueda general por nombre o código
            $texto = $_POST['texto'] ?? '';
            $data = Producto::buscarPorTexto($texto);
            $response['success'] = true;
            $response['data']    = $data;
            $response['message'] = "Resultados de la búsqueda";
        break;

        case 'Eliminar':
            $id = intval($_POST['id'] ?? 0);
            if ($id > 0 && Producto::eliminar($id)) {
                $response['success'] = true;
                $response['message'] = "Producto eliminado correctamente";
            } else {
                $response['message'] = "No se pudo eliminar el producto";
            }
        break;
    }
} catch (Exception $e) {
    $response['message'] = "Error: " . $e->getMessage();
}

echo json_encode($response);
