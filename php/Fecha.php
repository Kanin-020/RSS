<?php

$fecha = "Wed, 17 Jul 2019 04:16:33 GMT";
getFecha($fecha);

function getFecha($fecha) {
    $formatoArray = date_parse_from_format("D, d M Y H:i:s GMT", $fecha);
    print_r($formatoArray);
}

?>