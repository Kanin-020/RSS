<?php
// Creamos los atributos para la base de datos
$host = "localhost";
$usuario = "root";
$password = "";
$nombreBD = "noticias";
// realizamos la conexion
$conexionBD = mysqli_connect($host, $usuario, $password, $nombreBD);
// mensaje si la operacion anterior no es exitosa
if (mysqli_connect_errno()) {
    echo 'No se pudo conectar a la base de datos : ' . mysqli_connect_error();
}
?>