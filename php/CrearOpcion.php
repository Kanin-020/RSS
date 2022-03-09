<?php
include("../php/ConexionBD.php");

$Query = "SELECT idRSS , RSStitle FROM inforss";
$execute = mysqli_query($conexionBD, $Query);

if ($execute != null) {
    $ListOfRSSsource = array();
    while ($row = mysqli_fetch_assoc($execute)) {
        $ListOfRSSsource[] = $row;
    }
    echo json_encode($ListOfRSSsource, JSON_UNESCAPED_UNICODE);
} else {
    echo "Lista vacía";
}
