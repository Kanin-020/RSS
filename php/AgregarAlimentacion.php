<?php

$url = $_REQUEST["url"];

addRSS($url);
addNews($url);

function getTitle($url) {
    $doc = new DOMDocument();
    libxml_use_internal_errors(true);
    $doc->loadHTMLFile($url);
    $title = $doc->getElementsByTagName('title');
    return $title->item(0)->nodeValue;
}

function getID($url) {
    include("../php/ConexionBD.php");
    $Query = "SELECT idRSS FROM inforss WHERE RSSLink='$url'";
    $execute = mysqli_query($conexionBD, $Query);
    $id = mysqli_fetch_array($execute);
    return $id["idRSS"];
}

function addNews($feedURL) {
    include("../php/ConexionBD.php");
    $url = $feedURL;
    $rss = simplexml_load_file($url);
    $irss = intval(getID($feedURL));

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

        $stmt = $conexionBD->prepare("INSERT INTO contenidorss (idRSS,fecha,titulo,enlace,descripcion,cat) VALUES (?,?,?,?,?,?) ON DUPLICATE KEY UPDATE idRSS = idRSS;");
        $stmt->bind_param("isssss", $irss, $date, $title, $link, $description, $categorie);
        $stmt->execute() or dir(mysqli_error($conexionBD));
    }
}

function addRSS($url) {
    include("../php/ConexionBD.php");
    $title = getTitle($url);
    $stmt = $conexionBD->prepare("INSERT INTO inforss (RSSLink,RSSTitle)  VALUES (?,?) ON DUPLICATE KEY UPDATE RSSLink = RSSLink;");
    $stmt->bind_param("ss", $url, $title);
    $stmt->execute() or dir(mysqli_error($conexionBD));
    $stmt->close();
}
