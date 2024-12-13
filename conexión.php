<?php
$connection = mysqli_connect(
  'localhost', 
  'root', 
  '', // Asume que no tienes contraseña en el usuario 'root'
  'usuarios' // Nombre de la base de datos
);

if($connection) {
  echo 'Database is connected';
} else {
  echo 'Connection failed: ' . mysqli_connect_error();
}
?>