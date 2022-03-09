<?php

include("../php/ConexionBD.php");
$ID = $_REQUEST["data"];
$Query = "SELECT * FROM contenidorss where idRSS= '$ID' order by fecha DESC";
$execute = mysqli_query($conexionBD, $Query);
$data = array();

while ($row = mysqli_fetch_assoc($execute)) {
    $data[] = $row;
}
echo json_encode($data, JSON_UNESCAPED_SLASHES);

?>