-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-04-2021 a las 02:50:56
-- Versión del servidor: 10.4.17-MariaDB
-- Versión de PHP: 8.0.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `feedrss`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `feedtable`
--

CREATE TABLE `feedtable` (
  `idRSS` int(11) NOT NULL,
  `RSSLink` varchar(100) NOT NULL,
  `RSSTitle` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `feedtable`
--

INSERT INTO `feedtable` (`idRSS`, `RSSLink`, `RSSTitle`) VALUES
(45, 'https://expansion.mx/rss/nacional', 'Expansión - Nacional');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `feedtable`
--
ALTER TABLE `feedtable`
  ADD PRIMARY KEY (`RSSLink`);

ALTER TABLE `feedtable` ADD INDEX `rss_id_index` (`idRSS`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `feedtable`
--
ALTER TABLE `feedtable`
  MODIFY `idRSS` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;