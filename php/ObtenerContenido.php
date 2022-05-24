<?php

include("../php/ConexionBD.php");
$ID = $_REQUEST["data"];
$Query = "SELECT * FROM contenidorss where idRSS= '$ID' order by fecha DESC";

$data = array();

$maxage = 60; 
if (filemtime("online1.txt") < (time() - $maxage)) {
$execute = mysqli_query($conexionBD, $Query);
while ($row = mysqli_fetch_assoc($execute)) {
    $data[] = $row;
}
file_put_contents("online1.txt", $data);
$datareserv[]=$data;
}else {
	
$datareserv[]= file_get_contents("online1.txt");
}
echo json_encode($datareserv, JSON_UNESCAPED_SLASHES);

?>