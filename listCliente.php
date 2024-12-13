<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Configuración de la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "gestion";

$connection = new mysqli($servername, $username, $password, $dbname);

if ($connection->connect_error) {
    die(json_encode(['status' => 'error', 'message' => $connection->connect_error]));
}

header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Obtener clientes
    $resultClientes = $connection->query("SELECT codEmpresa, nombreEmpresa,direccion,telefono,correo,maneger,idZona FROM cliente");
    $clientes = $resultClientes ? $resultClientes->fetch_all(MYSQLI_ASSOC) : [];

    // Obtener zonas
    $resultZonas = $connection->query("SELECT idZona, nombrezona FROM zona");
    $zonas = $resultZonas ? $resultZonas->fetch_all(MYSQLI_ASSOC) : [];

    // Respuesta combinada
    echo json_encode([
        'clientes' => $clientes,
        'zonas' => $zonas,
    ]);
} else {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Método no permitido.']);
}

$connection->close();
