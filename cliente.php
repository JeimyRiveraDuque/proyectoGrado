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
    if (isset($_POST['id'], $_POST['nombre'], $_POST['telefono'], $_POST['correo'], $_POST['maneger'], $_POST['direccion'], $_POST['zona'])) {
        $id = mysqli_real_escape_string($connection, $_POST['id']);
        $nombre= mysqli_real_escape_string($connection, $_POST['nombre']);
        $telefono = mysqli_real_escape_string($connection, $_POST['telefono']);
        $correo = mysqli_real_escape_string($connection, $_POST['correo']);
        $maneger = mysqli_real_escape_string($connection, $_POST['maneger']);
        $direccion = mysqli_real_escape_string($connection, $_POST['direccion']);
        $zona = mysqli_real_escape_string($connection, $_POST['zona']);


        $query = "INSERT INTO cliente (codEmpresa, nombreEmpresa, direccion, telefono, correo, manager, idZona)
                  VALUES ('$id', '$nombre', '$direccion', '$telefono', '$correo', '$maneger', '$zona')";

        if (mysqli_query($connection, $query)) {
            echo json_encode(['status' => 'success', 'message' => 'Cliente registrado exitosamente.']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Error: ' . mysqli_error($connection)]);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Faltan datos requeridos.']);
    }
} else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Obtener roles y estados
    $zonas = $connection->query("SELECT idZona,nombrezona FROM zona");
    

    $data = [
        'zonas' => $zonas->fetch_all(MYSQLI_ASSOC),
        
    ];

    echo json_encode($data);
} else {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Método no permitido.']);
}

$connection->close();
?>
