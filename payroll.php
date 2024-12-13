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
    $result = $connection->query("SELECT * FROM pagos");
    $pagos = $result ? $result->fetch_all(MYSQLI_ASSOC) : [];


    // Respuesta combinada
    echo json_encode([
        'pagos' => $pagos,
    ]);
} else {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Método no permitido.']);
}

$connection->close();
