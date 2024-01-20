-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-01-2024 a las 20:08:50
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `inventario_sexto`
--
CREATE DATABASE IF NOT EXISTS `inventario_sexto` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `inventario_sexto`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `escuelas`
--

DROP TABLE IF EXISTS `escuelas`;
CREATE TABLE `escuelas` (
  `ID_escuela` int(11) NOT NULL,
  `Nombre_escuela` varchar(100) DEFAULT NULL,
  `Ciudad` varchar(50) DEFAULT NULL,
  `Nivel_educativo` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `escuelas`:
--

--
-- Volcado de datos para la tabla `escuelas`
--

INSERT INTO `escuelas` (`ID_escuela`, `Nombre_escuela`, `Ciudad`, `Nivel_educativo`) VALUES
(3, 'La salle', 'Riobamba', 'Bachillerato'),
(6, 'Cisneros2', 'Ambato', 'BGU'),
(8, 'Maldonado', 'Guayaquil', 'BGA');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesores`
--

DROP TABLE IF EXISTS `profesores`;
CREATE TABLE `profesores` (
  `ID_profesor` int(11) NOT NULL,
  `ID_escuela` int(11) DEFAULT NULL,
  `nombre_profesor` varchar(100) DEFAULT NULL,
  `materia` varchar(100) DEFAULT NULL,
  `salario` double(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `profesores`:
--   `ID_escuela`
--       `escuelas` -> `ID_escuela`
--

--
-- Volcado de datos para la tabla `profesores`
--

INSERT INTO `profesores` (`ID_profesor`, `ID_escuela`, `nombre_profesor`, `materia`, `salario`) VALUES
(7, 3, 'Kevin Sanchez', 'Quimica', 800.00),
(8, 8, 'Jose Alberto Valencia', 'Matematica', 1000.00);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `escuelas`
--
ALTER TABLE `escuelas`
  ADD PRIMARY KEY (`ID_escuela`);

--
-- Indices de la tabla `profesores`
--
ALTER TABLE `profesores`
  ADD PRIMARY KEY (`ID_profesor`),
  ADD KEY `ID_escuela` (`ID_escuela`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `escuelas`
--
ALTER TABLE `escuelas`
  MODIFY `ID_escuela` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `profesores`
--
ALTER TABLE `profesores`
  MODIFY `ID_profesor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `profesores`
--
ALTER TABLE `profesores`
  ADD CONSTRAINT `profesores_ibfk_1` FOREIGN KEY (`ID_escuela`) REFERENCES `escuelas` (`ID_escuela`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
