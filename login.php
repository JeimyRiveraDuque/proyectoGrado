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
    // Verificar si los datos necesarios están presentes en la solicitud
    if (isset($_POST['usuario'], $_POST['password'])) {
        // Sanitizar los datos recibidos para evitar SQL Injection
        $usuario = mysqli_real_escape_string($connection, $_POST['usuario']);
        $password = mysqli_real_escape_string($connection, $_POST['password']);
        
        // Consulta para verificar si el usuario existe y la contraseña es correcta
        $query = "SELECT * FROM usuarios WHERE usuario = '$usuario' AND password = '$password'";
        $result = mysqli_query($connection, $query);
        
        if (mysqli_num_rows($result) > 0) {
            // Si se encuentra el usuario, devolver "exito"
            echo json_encode(['status' => 'success', 'message' => 'Usuario encontrado.']);
        } else {
            // Si no se encuentra el usuario o la contraseña es incorrecta
            echo json_encode(['status' => 'error', 'message' => 'No está registrado o la contraseña es incorrecta.']);
        }
    } else {
        // Si falta algún dato necesario en la solicitud
        echo json_encode(['status' => 'error', 'message' => 'Faltan datos requeridos.']);
    }
} else {
    // Si la solicitud no es POST
    http_response_code(405); // Método no permitido
    echo json_encode(['status' => 'error', 'message' => 'Método no permitido.']);
}

// Cerrar la conexión
$connection->close();
?>