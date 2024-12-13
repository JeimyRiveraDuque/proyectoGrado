<?php
// Configuración de la base de datos
$servername = "localhost";
$username = "root"; // Cambia si tu usuario es diferente
$password = ""; // Cambia si tienes una contraseña configurada para el usuario root
$dbname = "gestion"; // Asegúrate de que la base de datos exista

// Establecer la conexión a la base de datos
$connection = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($connection->connect_error) {
    die("Conexión fallida: " . $connection->connect_error);
}

// Definir el tipo de respuesta como JSON
header("Content-Type: application/json");

// Verificar si la solicitud es POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['idZona'], $_POST['nombrezona'])){
        $zona = mysqli_real_escape_string($connection, $_POST['idZona']);
        $nombre = mysqli_real_escape_string($connection, $_POST['nombrezona']);

        // Debug temporal
        error_log("Datos recibidos: idZona=$zona, nombrezona=$nombre");

        $query = "INSERT INTO zona (idZona, nombrezona) VALUES ('$zona', '$nombre')";

        if (mysqli_query($connection, $query)) {
            echo json_encode(['status' => 'success', 'message' => 'Zona registrada exitosamente.']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Error al registrar la zona: ' . mysqli_error($connection)]);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Faltan datos requeridos.']);
    }
} else {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Método no permitido.']);
}


// Cerrar la conexión
$connection->close();
?>