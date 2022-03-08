<?php

include("../php/ConexionBD.php");

$Query = "SELECT * FROM `inforss`";
$execute = mysqli_query($con, $Query);

while ($row = mysqli_fetch_array($execute)) {
    ActualizarNoticias($row["RSSLink"]);
}

function ActualizarNoticias($url) {
    include("../php/ConexionBD.php");
    $rss = simplexml_load_file($url);
    $irss = intval(getID($url));

    foreach ($rss->channel->item as $item) {
        $link = $item->link;  //extrae el link
        $title = $item->title;  //extrae el titulo
        $date = new DateTime($item->pubDate); //extrae la fecha
        $date = $date->format(DateTime::ATOM);
        $categorie = $item->category;  //extrae la categoria
        $description = strip_tags($item->description);  //extrae la descripcion
        if (strlen($description) > 400) { //limita la descripcion a 400 caracteres
            $stringCut = substr($description, 0, 200);
            $description = substr($stringCut, 0, strrpos($stringCut, ' ')) . '...';
        }

        $stmt = $con->prepare("INSERT INTO contenidorss (idRSS,fecha,titulo,enlace,descripcion,cat) VALUES (?,?,?,?,?,?) ON DUPLICATE KEY UPDATE idRSS = idRSS;");
        $stmt->bind_param("isssss", $irss, $date, $title, $link, $description, $categorie);
        $stmt->execute() or dir(mysqli_error($con));
    }
}

function getID($url) {
    include("../php/ConexionBD.php");
    $Query = "SELECT idRSS FROM inforss WHERE RSSLink='$url'";
    $execute = mysqli_query($con, $Query);
    $id = mysqli_fetch_array($execute);
    return $id["idRSS"];
}

?>