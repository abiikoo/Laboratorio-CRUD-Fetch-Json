<?php
require_once "conexion.php";

class Producto {
    public $id;
    public $codigo;
    public $producto;
    public $precio;
    public $cantidad;

    public function __construct($data = []) {
        $this->id       = $data['id'] ?? null;
        $this->codigo   = $data['codigo'] ?? '';
        $this->producto = $data['producto'] ?? '';
        $this->precio   = $data['precio'] ?? 0;
        $this->cantidad = $data['cantidad'] ?? 0;
    }

    public function validar() {
        $errores = [];

        if (trim($this->codigo) === '') {
            $errores['codigo'] = "El código es obligatorio";
        }

        if (trim($this->producto) === '') {
            $errores['producto'] = "El nombre del producto es obligatorio";
        }

        if (!is_numeric($this->precio) || $this->precio <= 0) {
            $errores['precio'] = "El precio debe ser mayor a 0";
        }

        if (!is_numeric($this->cantidad) || $this->cantidad < 0) {
            $errores['cantidad'] = "La cantidad debe ser 0 o mayor";
        }

        return $errores;
    }

    public function guardar() {
        $db = DB::getInstance();
        $sql = "INSERT INTO productos (codigo, producto, precio, cantidad)
                VALUES (:codigo, :producto, :precio, :cantidad)";
        return $db->insertSeguro($sql, [
            ':codigo'   => $this->codigo,
            ':producto' => $this->producto,
            ':precio'   => $this->precio,
            ':cantidad' => $this->cantidad,
        ]);
    }

    public function editar() {
        $db = DB::getInstance();
        $sql = "UPDATE productos
                SET codigo = :codigo,
                    producto = :producto,
                    precio = :precio,
                    cantidad = :cantidad
                WHERE id = :id";
        return $db->updateSeguro($sql, [
            ':codigo'   => $this->codigo,
            ':producto' => $this->producto,
            ':precio'   => $this->precio,
            ':cantidad' => $this->cantidad,
            ':id'       => $this->id,
        ]);
    }

    // LISTAR EN ORDEN ASCENDENTE
    public static function listarTodos() {
        $db = DB::getInstance();
        return $db->query("SELECT * FROM productos ORDER BY id ASC");
    }

    // Buscar por nombre O código (un solo campo de texto)
    public static function buscarPorTexto($texto) {
        $db = DB::getInstance();
        $sql = "SELECT * FROM productos 
                WHERE producto LIKE :texto
                OR codigo   LIKE :texto
                ORDER BY id ASC";
        return $db->query($sql, [':texto' => "%$texto%"]);
    }

    // Eliminar por id
    public static function eliminar($id) {
        $db = DB::getInstance();
        $sql = "DELETE FROM productos WHERE id = :id";
        return $db->updateSeguro($sql, [':id' => $id]);
    }
}
