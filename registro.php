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
    if (isset($_POST['nombre'], $_POST['usuario'], $_POST['email'], $_POST['password'])) {
        // Sanitizar los datos recibidos para evitar SQL Injection
        $nombre = mysqli_real_escape_string($connection, $_POST['nombre']);
        $usuario = mysqli_real_escape_string($connection, $_POST['usuario']);
        $correo = mysqli_real_escape_string($connection, $_POST['email']);
        $password = mysqli_real_escape_string($connection, $_POST['password']);
        
        // Realizar la inserción en la base de datos
        $query = "INSERT INTO usuarios (nombre, usuario, correo, password) VALUES ('$nombre', '$usuario', '$correo', '$password')";
        
        if (mysqli_query($connection, $query)) {
            // Si la inserción fue exitosa
            echo json_encode(['status' => 'success', 'message' => 'Usuario registrado exitosamente.']);
        } else {
            // Si ocurrió un error en la inserción
            echo json_encode(['status' => 'error', 'message' => 'Error al registrar el usuario.']);
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