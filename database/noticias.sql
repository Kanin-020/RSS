-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-02-2022 a las 05:38:53
-- Versión del servidor: 8.0.28
-- Versión de PHP: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `noticias`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contenidorss`
--

CREATE TABLE `contenidorss` (
  `idnews` int NOT NULL,
  `idRSS` int NOT NULL,
  `fecha` varchar(100) NOT NULL,
  `titulo` varchar(100) NOT NULL,
  `enlace` varchar(400) NOT NULL,
  `descripcion` varchar(400) DEFAULT NULL,
  `cat` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inforss`
--

CREATE TABLE `inforss` (
  `idRSS` int NOT NULL,
  `RSSLink` varchar(100) NOT NULL,
  `RSSTitle` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `contenidorss`
--
ALTER TABLE `contenidorss`
  ADD PRIMARY KEY (`enlace`),
  ADD KEY `news_id_index` (`idnews`);

--
-- Indices de la tabla `inforss`
--
ALTER TABLE `inforss`
  ADD PRIMARY KEY (`RSSLink`),
  ADD KEY `rss_id_index` (`idRSS`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `contenidorss`
--
ALTER TABLE `contenidorss`
  MODIFY `idnews` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=945;

--
-- AUTO_INCREMENT de la tabla `inforss`
--
ALTER TABLE `inforss`
  MODIFY `idRSS` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
