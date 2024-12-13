<?php
// Configuración de la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "gestion";

$connection = new mysqli($servername, $username, $password, $dbname);
if ($connection->connect_error) {
    die("Conexión fallida: " . $connection->connect_error);
}

header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Validar y registrar colaborador
    if (isset($_POST['id'], $_POST['nombre'], $_POST['apellido'], $_POST['telefono'], $_POST['rol'], $_POST['estado'], $_POST['direccion'])) {
        $nombre = mysqli_real_escape_string($connection, $_POST['nombre']);
        $apellido = mysqli_real_escape_string($connection, $_POST['apellido']);
        $telefono = mysqli_real_escape_string($connection, $_POST['telefono']);
        $rol = mysqli_real_escape_string($connection, $_POST['rol']);
        $estado = mysqli_real_escape_string($connection, $_POST['estado']);
        $direccion = mysqli_real_escape_string($connection, $_POST['direccion']);

        $query = "INSERT INTO colaborador (codADP, nombre, apellido, telefono, idEstadocolabo,IdRolcolabora, direccion)
                  VALUES ('{$_POST['id']}', '$nombre', '$apellido', '$telefono', '$estado', '$rol', '$direccion')";

        if (mysqli_query($connection, $query)) {
            echo json_encode(['status' => 'success', 'message' => 'Colaborador registrado exitosamente.']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Error: ' . mysqli_error($connection)]);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Faltan datos requeridos.']);
    }
} else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Obtener roles y estados
    $roles = $connection->query("SELECT idRol,rol FROM rol");
    $estados = $connection->query("SELECT idEstado,estado FROM estado");

    $data = [
        'roles' => $roles->fetch_all(MYSQLI_ASSOC),
        'estados' => $estados->fetch_all(MYSQLI_ASSOC)
    ];

    echo json_encode($data);
} else {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Método no permitido.']);
}

$connection->close();
?>
