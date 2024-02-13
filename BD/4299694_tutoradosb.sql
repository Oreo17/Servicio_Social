-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 13, 2024 at 02:29 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `4299694_tutoradosb`
--

-- --------------------------------------------------------

--
-- Table structure for table `calificacion`
--

CREATE TABLE `calificacion` (
  `id` bigint(20) NOT NULL,
  `calificacion` int(11) DEFAULT NULL,
  `cursada` varchar(100) NOT NULL,
  `intentos` int(11) NOT NULL DEFAULT 1,
  `idCurso` bigint(20) NOT NULL,
  `idCuenta` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `calificacion`
--

INSERT INTO `calificacion` (`id`, `calificacion`, `cursada`, `intentos`, `idCurso`, `idCuenta`) VALUES
(1, 6, '1', 1, 10054, 2),
(2, 8, '1', 1, 10055, 2),
(3, 9, '1', 1, 10056, 2),
(4, 10, '1', 1, 10057, 2),
(5, 10, '1', 1, 10058, 2),
(6, 9, '1', 1, 10059, 2),
(7, 0, '0', 1, 10060, 2),
(8, 10, '1', 1, 10061, 2),
(9, 0, '0', 1, 10062, 2),
(10, 10, '1', 1, 10063, 2),
(11, 0, '0', 1, 10064, 2),
(12, 0, '0', 1, 10054, 3),
(13, 0, '0', 1, 10055, 3),
(14, 9, '1', 1, 10054, 5),
(15, 10, '1', 1, 10055, 5),
(16, 9, '1', 1, 10056, 5),
(17, 8, '1', 1, 10057, 5),
(18, 10, '1', 1, 10058, 5),
(19, 10, '1', 1, 10059, 5),
(20, 9, '1', 1, 10060, 5),
(21, 10, '1', 1, 10061, 5),
(22, 8, '1', 1, 10062, 5),
(23, 10, '1', 1, 10063, 5),
(24, 9, '1', 1, 10064, 5),
(25, 0, '0', 1, 10065, 5),
(26, 0, '0', 1, 10066, 5),
(27, 0, '0', 1, 10067, 5),
(28, 0, '0', 1, 10068, 5),
(29, 0, '0', 1, 10069, 5),
(30, 10, '1', 1, 10054, 7),
(31, 9, '1', 1, 10055, 7),
(32, 10, '1', 1, 10056, 7),
(33, 9, '1', 1, 10057, 7),
(34, 9, '1', 1, 10058, 7),
(35, 8, '1', 1, 10059, 7),
(36, 8, '1', 1, 10060, 7),
(37, 9, '1', 1, 10061, 7),
(38, 7, '1', 1, 10062, 7),
(39, 9, '1', 1, 10063, 7),
(40, 10, '1', 1, 10064, 7),
(41, 10, '1', 1, 10065, 7),
(42, 9, '1', 1, 10066, 7),
(43, 9, '1', 1, 10067, 7),
(44, 10, '1', 1, 10068, 7),
(45, 10, '1', 1, 10069, 7),
(46, 9, '1', 1, 10070, 7),
(47, 10, '1', 1, 10071, 7),
(48, 9, '1', 1, 10072, 7),
(49, 10, '1', 1, 10073, 7),
(50, 10, '1', 1, 10074, 7),
(51, 0, '0', 1, 10054, 6),
(52, 0, '0', 1, 10055, 6),
(53, 0, '0', 1, 10056, 6),
(54, 0, '0', 1, 10057, 6),
(55, 0, '0', 1, 10058, 6),
(56, 0, '0', 1, 10058, 8),
(57, 0, '0', 1, 10056, 9),
(58, 0, '0', 1, 10075, 7),
(59, 0, '0', 1, 10076, 7),
(60, 0, '0', 1, 10077, 7),
(61, 0, '0', 1, 10078, 7),
(62, 0, '0', 1, 10079, 7),
(74, 9, '1', 1, 10054, 1),
(80, 0, '0', 1, 10054, 15),
(81, 0, '0', 1, 10055, 15),
(82, 0, '0', 1, 10056, 15),
(83, 0, '0', 1, 10057, 15),
(84, 0, '0', 1, 10058, 15),
(85, 8, '1', 1, 10055, 1),
(86, 10, '1', 1, 10056, 1),
(87, 10, '1', 1, 10057, 1),
(88, 10, '1', 1, 10058, 1),
(89, 0, '0', 1, 10058, 11),
(90, 0, '0', 1, 10057, 11),
(91, 0, '0', 1, 10056, 11),
(92, 0, '0', 1, 10055, 11),
(93, 0, '0', 1, 10054, 11),
(94, 0, '0', 1, 10054, 12),
(95, 0, '0', 1, 10055, 12),
(96, 0, '0', 1, 10056, 12),
(97, 0, '0', 1, 10057, 12),
(98, 0, '0', 1, 10058, 12),
(99, 8, '1', 1, 10059, 1),
(101, 10, '1', 2, 10054, 4),
(102, 10, '1', 2, 10055, 4),
(103, 10, '1', 1, 10056, 4),
(104, 10, '1', 1, 10058, 4),
(105, 10, '1', 1, 10057, 4),
(106, 9, '1', 2, 10059, 4),
(107, 0, '0', 1, 10062, 4),
(108, 0, '0', 1, 10061, 4),
(109, 0, '0', 1, 10060, 4),
(110, 0, '0', 1, 10064, 4),
(111, 0, '0', 1, 10063, 4),
(112, 0, '', 1, 10054, 17),
(113, 0, '', 1, 10055, 17),
(114, 0, '', 1, 10056, 17),
(115, 0, '', 1, 10057, 17),
(116, 0, '', 1, 10058, 17),
(117, 0, '', 1, 10054, 18),
(118, 0, '', 1, 10055, 18),
(119, 0, '', 1, 10056, 18),
(120, 0, '', 1, 10057, 18),
(121, 0, '', 1, 10058, 18),
(122, 0, '', 1, 10054, 19),
(123, 0, '', 1, 10055, 19),
(124, 0, '', 1, 10056, 19),
(125, 0, '', 1, 10057, 19),
(126, 0, '', 1, 10058, 19),
(127, 0, '', 1, 10054, 20),
(128, 0, '', 1, 10055, 20),
(129, 0, '', 1, 10056, 20),
(130, 0, '', 1, 10057, 20),
(131, 0, '', 1, 10058, 20),
(132, 0, '', 1, 10054, 21),
(133, 0, '', 1, 10055, 21),
(134, 0, '', 1, 10056, 21),
(135, 0, '', 1, 10057, 21),
(136, 0, '', 1, 10058, 21),
(137, 0, '', 1, 10054, 22),
(138, 0, '', 1, 10055, 22),
(139, 0, '', 1, 10056, 22),
(140, 0, '', 1, 10057, 22),
(141, 0, '', 1, 10058, 22);

-- --------------------------------------------------------

--
-- Table structure for table `cuenta`
--

CREATE TABLE `cuenta` (
  `id` bigint(20) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `apellidoMaterno` varchar(100) DEFAULT NULL,
  `apellidoPaterno` varchar(100) DEFAULT NULL,
  `correo` varchar(100) DEFAULT NULL,
  `telefono` varchar(10) DEFAULT NULL,
  `tipo` varchar(100) DEFAULT NULL,
  `idPlanEstudio` bigint(20) NOT NULL,
  `semestreActual` int(11) NOT NULL DEFAULT 1,
  `eliminado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cuenta`
--

INSERT INTO `cuenta` (`id`, `nombre`, `apellidoMaterno`, `apellidoPaterno`, `correo`, `telefono`, `tipo`, `idPlanEstudio`, `semestreActual`, `eliminado`) VALUES
(1, 'Orestes', 'Palafox', 'Calvario', 'orestes@correo.com', '2222222222', '1', 1, 2, 0),
(2, 'Jesus Emanuel', 'Lezama', 'Salgado', 'jesussalgadole@alumno.buap.mx', '2214394360', '0', 1, 2, 0),
(3, 'yo', 'soy', 'mero', 'yomero@correo.com', '2761005319', '0', 1, 1, 0),
(4, 'Marco', 'Roman', 'Amador', 'correo@correo.com', '2761005319', '0', 1, 1, 0),
(5, 'Michell', 'López', 'Sosa', 'michell.sosal@alumno.buap.mx', '2222222222', '0', 1, 3, 0),
(6, 'Liliana', 'Torcuato', 'Fierro', 'liliana@correo.mx', '2222222222', '0', 1, 1, 0),
(7, 'Karla', 'Escalona', 'Hernández ', 'karla@gmail.com', '2116390970', '0', 1, 1, 0),
(8, 'Denisse', 'Nativitas', 'Salgado', 'Denisse@alumno.com', '2214394360', '0', 1, 1, 0),
(9, 'Estudiambre', 'Siempre', 'Mucha', 'elsuyo@yomero.com', '2222222222', '0', 1, 1, 0),
(10, 'Pedro', 'Lopez', 'Juarez', 'pedro@gmail.com', '2209789542', '0', 1, 1, 0),
(11, 'Pedro', 'Lopez', 'Juarez', 'pedro@gmail.com', '2209789542', '0', 1, 1, 0),
(12, 'Arturo', 'Andrada', 'Lopez', 'arturo123@gmail.com', '2227615053', '0', 1, 1, 0),
(15, 'Moisés Isaac', 'Corozo ', 'Caicedo', 'moisesCaicedo@gmail.com', '2227615053', '0', 1, 1, 0),
(16, 'Alexander Isaac', 'Ramos ', 'Perez', 'isacc@gmail.com', '2227679053', '0', 1, 1, 0),
(17, 'Mariana', 'Cantu', 'Rodriguez', 'marianita@gmail.com', '2229274630', '0', 1, 1, 0),
(18, 'Madison', 'Beer', 'Elle', 'madison@gmail.com', '2224598430', '0', 1, 1, 0),
(19, 'César', 'Valera', 'Huerta', 'chinoHuerta@gmail.com', '2229282746', '0', 1, 1, 0),
(20, 'Judith', 'Marcial ', 'Pérez', 'judith@gmail.com', '2227197382', '1', 1, 1, 0),
(21, 'Luis', 'Garcia', 'Sanchez', 'luis__sa21@gmail.com', '2227462237', '0', 1, 1, 0),
(22, 'Ramiro', 'Perez', 'Munoz', 'ramiro@gmail.com', '2223242612', '0', 1, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `curso`
--

CREATE TABLE `curso` (
  `nrc` bigint(20) NOT NULL,
  `nombreCurso` varchar(100) DEFAULT NULL,
  `docente` bigint(20) DEFAULT NULL,
  `cupo` int(11) NOT NULL DEFAULT 40,
  `inscritos` int(11) NOT NULL DEFAULT 0,
  `idMateria` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `curso`
--

INSERT INTO `curso` (`nrc`, `nombreCurso`, `docente`, `cupo`, `inscritos`, `idMateria`) VALUES
(10000, 'Anatomia G - 1', 1, 40, 0, 7),
(10001, 'Bioquimica - 1', 1, 40, 0, 8),
(10003, 'Biologia CyM - 1', 1, 40, 0, 9),
(10004, 'Formación HyS - 1', 1, 40, 1, 10),
(10005, 'DHPC - 1', 1, 40, 2, 11),
(10006, 'Lengua E I - 1', 1, 40, 1, 12),
(10007, 'BioQII - 1', 1, 40, 1, 20),
(10008, 'MicroB - 1', 1, 40, 1, 21),
(10009, 'BioE - 1', 1, 40, 1, 22),
(10010, 'BioEtica NC - 1', 1, 40, 1, 23),
(10011, 'Antropologia Alim', 1, 40, 1, 24),
(10012, 'Nutricion SP', 1, 40, 1, 25),
(10013, 'Lengua EII - 1', 1, 40, 1, 26),
(10014, 'Fiosiologia - 1', 1, 40, 1, 27),
(10015, 'Inmunologia y N - 1', 1, 40, 1, 28),
(10016, 'MicroB de A - 1', 1, 40, 1, 29),
(10017, 'Nutricion I - 1', 1, 40, 1, 30),
(10018, 'Ev del Est Nutricion - 1', 1, 40, 1, 31),
(10019, 'Lengua E III - 1', 1, 40, 1, 32),
(10020, 'Met de la Inv - 1', 1, 40, 0, 33),
(10021, 'Toxicologia de los A - 1', 1, 40, 0, 34),
(10022, 'Dietetica - 1', 1, 40, 0, 35),
(10023, 'Fisiología de la N', 1, 40, 0, 36),
(10024, 'Eval del Est Nutricio - 1', 1, 40, 0, 37),
(10025, 'Nutricion II - 1', 1, 40, 0, 38),
(10026, 'Lengua E IV - 1', 1, 40, 0, 39),
(10027, 'Farmacologia - 1', 1, 40, 0, 40),
(10028, 'Educ para la Salud - 1', 1, 40, 0, 41),
(10029, 'Epidem de la Nutric - 1', 1, 40, 0, 42),
(10030, 'Dietoterapia I - 1', 1, 40, 0, 43),
(10031, 'Nutric Clinica I - 1', 1, 40, 0, 44),
(10032, 'Opt I - 1', 1, 40, 0, 45),
(10033, 'opt IV - 1', 1, 40, 0, 46),
(10034, 'Opt VII - 1', 1, 40, 0, 47),
(10035, 'Infect C - 1', 1, 40, 0, 48),
(10036, 'Dietoterapia II - 1', 1, 40, 0, 49),
(10037, 'Nutric Clin II - 1', 1, 40, 0, 50),
(10038, 'Nutric Clin Pediat - 1', 1, 40, 0, 51),
(10039, 'Nutric Comun - 1', 1, 40, 0, 52),
(10040, 'Clinic Prop y Analisis de la D - 1', 1, 40, 0, 53),
(10041, 'Opt II - 1', 1, 40, 0, 54),
(10042, 'Opt V - 1', 1, 40, 0, 55),
(10043, 'Opt VIII - 1', 1, 40, 0, 56),
(10044, 'Met de la Inv II - 1', 1, 40, 0, 57),
(10045, 'Psic Clin - 1', 1, 40, 0, 58),
(10046, 'Genética y Gen Nutric - 1', 1, 40, 0, 59),
(10047, 'Nutric Clin III - 1', 1, 40, 0, 60),
(10048, 'Nutric Clin Geriatrica - 1', 1, 40, 0, 61),
(10049, 'Opt III - 1', 1, 40, 0, 62),
(10050, 'Opt VI - 1', 1, 40, 0, 63),
(10051, 'Pract Prof - 1 ', 1, 40, 0, 64),
(10052, 'Serv Social I - 1', 1, 40, 0, 65),
(10053, 'Serv Social II - 1', 1, 40, 0, 66),
(10054, 'Intro a las Mat - 1', 1, 40, 5, 67),
(10055, 'Intro a la prog - 1', 1, 40, 5, 68),
(10056, 'Teoria Gen d Sis y SI - 1', 1, 40, 5, 69),
(10057, 'Formación HyS - 1', 1, 40, 4, 70),
(10058, 'Lengua E I - 1', 1, 40, 5, 71),
(10059, 'Calculo Dif e Int - 1', 1, 40, 3, 72),
(10060, 'Alg lineal con Aplics - 1', 1, 40, 3, 73),
(10061, 'POO I - 1', 1, 40, 3, 74),
(10062, 'Mod de proc de neg - 1', 1, 40, 3, 75),
(10063, 'DHPC - 1', 1, 40, 3, 76),
(10064, 'Lengua E II - 1', 1, 40, 3, 77),
(10065, 'Prob y est - 1', 1, 40, 2, 78),
(10066, 'Matematicas disc - 1', 1, 40, 2, 79),
(10067, 'POO II - 1', 1, 40, 2, 80),
(10068, 'Herram web - 1', 1, 40, 2, 81),
(10069, 'Lengua E III - 1', 1, 40, 2, 82),
(10070, 'Redes de comp - 1', 1, 40, 1, 83),
(10071, 'Metodos est - 1', 1, 40, 1, 84),
(10072, 'Ing de soft I - 1', 1, 40, 1, 85),
(10073, 'Diseño de bd - 1', 1, 40, 1, 86),
(10074, 'Lengua E IV - 1', 1, 40, 1, 87),
(10075, 'Redes y servs - 1', 1, 40, 1, 88),
(10076, 'Fundamentos de la prog log - 1', 1, 40, 1, 89),
(10077, 'Ing de soft II - 1', 1, 40, 1, 90),
(10078, 'Admin de bd - 1', 1, 40, 1, 91),
(10079, 'Admin de sist op - 1', 1, 40, 1, 92),
(10080, 'Admin de redes - 1', 1, 40, 0, 93),
(10081, 'Admin de proy - 1', 1, 40, 0, 94),
(10082, 'Diseñ de la int - 1', 1, 40, 0, 95),
(10083, 'Mineria de datos - 1', 1, 40, 0, 96),
(10084, 'Computo dist - 1', 1, 40, 0, 97),
(10085, 'Tecnologias web - 1', 1, 40, 0, 98),
(10086, 'Control de cal de soft - 1', 1, 40, 0, 99),
(10087, 'Inteligencia de neg - 1', 1, 40, 0, 100),
(10088, 'Modelos de des web - 1', 1, 40, 0, 101),
(10089, 'Opt 1 - 1', 1, 40, 0, 102),
(10090, 'Opt desit - 1', 1, 40, 0, 103),
(10091, 'Servicio social - 1', 1, 40, 0, 104),
(10092, 'Trabajo colab - 1', 1, 40, 0, 105),
(10093, 'Servicios web - 1', 1, 40, 0, 106),
(10094, 'Opt 2 - 1', 1, 40, 0, 107),
(10095, 'Opt 3 - 1', 1, 40, 0, 108),
(10096, 'Int de sist y arq - 1', 1, 40, 0, 109),
(10097, 'Practica Profesional - 1', 1, 40, 0, 110),
(10098, 'Prog de disp mov - 1', 1, 40, 0, 111),
(10099, 'Proy I+D - 1', 1, 40, 0, 112);

-- --------------------------------------------------------

--
-- Table structure for table `materia`
--

CREATE TABLE `materia` (
  `id` bigint(20) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `creditos` int(11) DEFAULT NULL,
  `semestre` int(11) DEFAULT NULL,
  `materiaAnterior` varchar(100) DEFAULT NULL,
  `materiaSiguiente` varchar(100) DEFAULT NULL,
  `idPlanEstudio` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `materia`
--

INSERT INTO `materia` (`id`, `nombre`, `creditos`, `semestre`, `materiaAnterior`, `materiaSiguiente`, `idPlanEstudio`) VALUES
(7, 'Anatomia general', 6, 1, NULL, NULL, 2),
(8, 'Bioquimica I', 7, 1, NULL, '20', 2),
(9, 'Biologia Celular y Molecular', 7, 1, NULL, '21', 2),
(10, 'Formacion Humana y Social', 4, 1, NULL, NULL, 2),
(11, 'DHPC', 4, 1, NULL, NULL, 2),
(12, 'Lengua Extranjera I', 4, 1, NULL, '26', 2),
(20, 'Bioquimica II', 7, 2, '8', '27;28;30;31', 2),
(21, 'Microbiologia', 7, 2, '9', '29', 2),
(22, 'Bioestadística', 7, 2, NULL, NULL, 2),
(23, 'Bioetica en Nutricion Clinica', 4, 2, NULL, '31', 2),
(24, 'Antropología de la Alimentación', 4, 2, NULL, NULL, 2),
(25, 'Nutricion en Salud Publica', 6, 2, NULL, NULL, 2),
(26, 'Lengua Extranjera II', 4, 2, '12', '32', 2),
(27, 'Fisiologia', 7, 3, '20', '36', 2),
(28, 'Inmunología y Nutrición', 7, 3, '20', NULL, 2),
(29, 'Microbiología de los Alimentos', 7, 3, '21', NULL, 2),
(30, 'Nutrición I', 7, 3, '20', '35;38', 2),
(31, 'Evaluación del Estado Nutricional I', 6, 3, '20;23', '37', 2),
(32, 'Lengua Extranjera III', 4, 3, '26', '39', 2),
(33, 'Metodología de la Investigación I', 4, 4, '22', '42', 2),
(34, 'Toxicología de los Alimentos', 7, 4, '25', '40', 2),
(35, 'Dietética ', 7, 4, '30', '43', 2),
(36, 'Fisiología de la nutrición', 7, 4, '27', '40', 2),
(37, 'Evaluación del Estado Nutricional II', 6, 4, '31', '44;51;52;61', 2),
(38, 'Nutrición II', 6, 4, '30', '44;51;52;61', 2),
(39, 'Lengua Extranjera IV', 4, 4, '32', NULL, 2),
(40, 'Farmacología', 7, 5, '36;34', NULL, 2),
(41, 'Educación para la Salud', 6, 5, '25', NULL, 2),
(42, 'Epidemiologia de la Nutrición', 6, 5, '33;25', NULL, 2),
(43, 'Dietoterapia I', 7, 5, '35', '49', 2),
(44, 'Nutrición Clínica I', 7, 5, '38;37', '50;53', 2),
(45, 'Optativa I', 3, 5, NULL, NULL, 2),
(46, 'Optativa IV', 3, 5, NULL, NULL, 2),
(47, 'Optativa VII', 3, 5, NULL, NULL, 2),
(48, 'Infectología Clínica', 7, 6, '21;27', NULL, 2),
(49, 'Dietoterapia II', 7, 6, '43', NULL, 2),
(50, 'Nutrición Clínica II', 7, 6, '44', '60', 2),
(51, 'Nutrición Clínica Pediátrica', 7, 6, '38;37', NULL, 2),
(52, 'Nutrición Comunitaria', 7, 6, '38;37', NULL, 2),
(53, 'Clínica Propedéutica y Análisis de la Decisión', 6, 6, '44', '60;58', 2),
(54, 'Optativa II', 3, 6, NULL, NULL, 2),
(55, 'Optativa V', 3, 6, NULL, NULL, 2),
(56, 'Optativa VIII', 3, 6, NULL, NULL, 2),
(57, 'Metodología de la investigación II', 7, 7, '21;27', NULL, 2),
(58, 'Psicología Clínica', 4, 7, '23;53', '64', 2),
(59, 'Genética y Genómica Nutricional', 7, 7, '9;38;53', NULL, 2),
(60, 'Nutrición Clínica III', 7, 7, '50;53', NULL, 2),
(61, 'Nutrición Clínica Geriátrica', 7, 7, '38;37', NULL, 2),
(62, 'Optativa III', 3, 7, NULL, NULL, 2),
(63, 'Optativa VI', 3, 7, NULL, NULL, 2),
(64, 'Práctica Profesional', 17, 8, '58', NULL, 2),
(65, 'Servicio Social', 26, 9, NULL, NULL, 2),
(66, 'Servicio Social', 26, 10, NULL, NULL, 2),
(67, 'Introducción a las matemáticas', 6, 1, NULL, '72;73', 1),
(68, 'Introducción a la programación', 6, 1, NULL, '74', 1),
(69, 'Teoría General de sistemas y sistemas de información', 4, 1, NULL, '75', 1),
(70, 'Formación humana y social', 4, 1, NULL, NULL, 1),
(71, 'Lengua Extrangera I', 4, 1, NULL, '77', 1),
(72, 'Calculo diferencial e integral', 6, 2, '67', '78', 1),
(73, 'Algebra lineal con aplicaciones', 6, 2, '67', '79', 1),
(74, 'Programacion orientada a objetos I', 6, 2, '68', '80', 1),
(75, 'Modelado de procesos de negocio', 4, 2, '69', '85;86', 1),
(76, 'DHPC', 4, 2, NULL, NULL, 1),
(77, 'Lengua extranjera II', 4, 2, '71', '82', 1),
(78, 'Probabilidad y estadistica', 6, 3, '72', '83;84', 1),
(79, 'Matematicas discretas', 6, 3, '73', '89', 1),
(80, 'Programacion orientada a objetos II', 6, 3, '74', '92;97', 1),
(81, 'Herramientas web', 6, 3, NULL, '98', 1),
(82, 'Lengua Extrangera III', 4, 3, '77', '87', 1),
(83, 'Redes de computadoras', 6, 4, '78', '88;109', 1),
(84, 'Metodos estadisticos', 6, 4, '78', NULL, 1),
(85, 'Ingenieria de software I', 6, 4, '75', '90', 1),
(86, 'Diseño de base de datos', 6, 4, '75', '91', 1),
(87, 'Lengua extranjera IV', 4, 4, '82', NULL, 1),
(88, 'Redes y servicios', 6, 5, '83', '93', 1),
(89, 'Fundamentos de la programacion logica', 4, 5, '79', NULL, 1),
(90, 'Ingenieria de software II', 6, 5, '85', '95;99', 1),
(91, 'Administracion de bases de datos', 6, 5, '86', '96', 1),
(92, 'Administracion de sistemas operativos', 7, 5, '80', NULL, 1),
(93, 'Administracion de redes', 6, 6, '88', NULL, 1),
(94, 'Administracion de proyectos', 5, 6, NULL, '112', 1),
(95, 'Diseño de la interaccion', 6, 6, '90', NULL, 1),
(96, 'Mineria de datos', 6, 6, '91', '100', 1),
(97, 'Computo distribuido', 6, 6, '80', '101', 1),
(98, 'Tecnologias web', 6, 6, '81', '101;112', 1),
(99, 'Control de calidad y software', 6, 7, '90', NULL, 1),
(100, 'Inteligencia de negocios', 6, 7, '96', NULL, 1),
(101, 'Modelos de desarrollo web', 6, 7, '97;98', '106', 1),
(102, 'Optativa 1', 6, 7, NULL, NULL, 1),
(103, 'Optativa 1 Desit', 6, 7, NULL, NULL, 1),
(104, 'Servicio social', 10, 8, '102', NULL, 1),
(105, 'Trabajo colaborativo', 6, 8, '101', NULL, 1),
(106, 'Servicios web', 6, 8, '101', '111', 1),
(107, 'Optativa 2', 6, 8, NULL, NULL, 1),
(108, 'Optativa 3', 6, 8, NULL, NULL, 1),
(109, 'Integracion de sistemas y arquitecturas', 6, 9, '83', NULL, 1),
(110, 'Practica profesional', 5, 9, '104', NULL, 1),
(111, 'Programacion de dispositivos moviles', 6, 9, '106', NULL, 1),
(112, 'Proyecto I+ D 1', 5, 9, '98;94', NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `planestudio`
--

CREATE TABLE `planestudio` (
  `id` bigint(20) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `planestudio`
--

INSERT INTO `planestudio` (`id`, `nombre`) VALUES
(1, 'Ingeniería en Tecnologías de la Información'),
(2, 'Licenciatura en Nutrición Clínica');

-- --------------------------------------------------------

--
-- Table structure for table `usuario`
--

CREATE TABLE `usuario` (
  `id` bigint(20) NOT NULL,
  `matricula` varchar(9) DEFAULT NULL,
  `contrasena` varchar(100) DEFAULT NULL,
  `token` varchar(300) DEFAULT NULL,
  `idCuenta` bigint(20) DEFAULT NULL,
  `tutorId` bigint(20) DEFAULT NULL,
  `eliminado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `usuario`
--

INSERT INTO `usuario` (`id`, `matricula`, `contrasena`, `token`, `idCuenta`, `tutorId`, `eliminado`) VALUES
(1, '201928248', '$2a$10$49xcTo9Ha3xHfKdwRuh6P.yC1k29y.wPy2L7ERKMS4KOQULglrB5S', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjEsInJvbGUiOiIxIiwibWF0cmljdWxhIjoiMjAxOTI4MjQ4IiwiaWF0IjoxNzA3MzQ5MTc3LCJleHAiOjE3MDczNTA5Nzd9.mUGRTx--Ec21eTsRwE353UiF5ITRqRhcBY1MXD3mNKI', 1, NULL, 0),
(2, '201943444', '$2a$10$49xcTo9Ha3xHfKdwRuh6P.yC1k29y.wPy2L7ERKMS4KOQULglrB5S', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjIsInJvbGUiOiIwIiwibWF0cmljdWxhIjoiMjAxOTQzNDQ0IiwiaWF0IjoxNzA3NTIxMTg1LCJleHAiOjE3MDc1MjI5ODV9.1rYgE-WW4mEXK1b3FSKV6bwaqQ5E2TTGrpBysnfspGs', 2, 20, 0),
(3, '202323232', '$2a$10$49xcTo9Ha3xHfKdwRuh6P.yC1k29y.wPy2L7ERKMS4KOQULglrB5S', NULL, 3, 20, 0),
(4, '201910000', '$2a$10$49xcTo9Ha3xHfKdwRuh6P.yC1k29y.wPy2L7ERKMS4KOQULglrB5S', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjQsInJvbGUiOiIwIiwibWF0cmljdWxhIjoiMjAxOTEwMDAwIiwiaWF0IjoxNzAwNDMyNzY2LCJleHAiOjE3MDA0MzQ1NjZ9.rCIHFyB00YsEBPfdE5yejyAR1BGU1Xz5SQTBwWFkGow', 4, 20, 0),
(5, '202268498', '$2a$10$49xcTo9Ha3xHfKdwRuh6P.yC1k29y.wPy2L7ERKMS4KOQULglrB5S', NULL, 5, 20, 0),
(6, '201936361', '$2a$10$49xcTo9Ha3xHfKdwRuh6P.yC1k29y.wPy2L7ERKMS4KOQULglrB5S', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjYsImlhdCI6MTY5OTYzNTM1NywiZXhwIjoxNjk5NjQyNTU3fQ.NsbEJWiP1_S3NoCf_YDWqYq8ASrqA7faRNe-wiaLG1s', 6, 20, 0),
(7, '201914233', '$2a$10$49xcTo9Ha3xHfKdwRuh6P.yC1k29y.wPy2L7ERKMS4KOQULglrB5S', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjcsInJvbGUiOiIwIiwibWF0cmljdWxhIjoiMjAxOTE0MjMzIiwiaWF0IjoxNzAwMzc4ODY0LCJleHAiOjE3MDAzODA2NjR9.b11h24eG28ltOoBmguufayNiHbU3yYk7D06HaQHVzIc', 7, 20, 0),
(8, '201912345', '$2a$10$49xcTo9Ha3xHfKdwRuh6P.yC1k29y.wPy2L7ERKMS4KOQULglrB5S', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjgsImlhdCI6MTY5OTIyOTczOSwiZXhwIjoxNjk5MjM2OTM5fQ.sofjJmfVqVG790s9idqtxfgerf31NdkN9n8K02C2b84', 8, 20, 0),
(9, '202222222', '$2a$10$49xcTo9Ha3xHfKdwRuh6P.yC1k29y.wPy2L7ERKMS4KOQULglrB5S', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjEsIm1hdHJpY3VsYSI6IjIwMTkyODI0OCIsImlhdCI6MTY5OTg5NTI0NCwiZXhwIjoxNjk5ODk4ODQ0fQ.XteWpxdyIgbIyS8Dk-l6JcMGHrj26PuMSDX0LV3FiKc', 9, 20, 0),
(10, '201988888', '$2a$12$cq.0my9ahKqqt3TG1DZxGeAatLhP.Xy5dphQoVgNhGDoxAuh9EyuW', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjEsIm1hdHJpY3VsYSI6IjIwMTkyODI0OCIsImlhdCI6MTY5OTg5NTI0NCwiZXhwIjoxNjk5ODk4ODQ0fQ.XteWpxdyIgbIyS8Dk-l6JcMGHrj26PuMSDX0LV3FiKc', 11, 20, 0),
(11, '201910391', '$2a$10$49xcTo9Ha3xHfKdwRuh6P.yC1k29y.wPy2L7ERKMS4KOQULglrB5S', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjExLCJtYXRyaWN1bGEiOiIyMDE5NzUzOTEiLCJpYXQiOjE2OTk5MDAwMDIsImV4cCI6MTY5OTkwMzYwMn0.7g_4MCeV1jY7ud4cNgZj_nbNgFyg26nxlsQcbC3d2F4', 12, 20, 0),
(15, '201975391', '$2a$10$g8TewlJkv1VYB7XAywLu2ewg07hIj7KasgaOqMEhBaMkCpCLCrrz6', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjE1LCJtYXRyaWN1bGEiOiIyMDE5NzUzOTEiLCJpYXQiOjE2OTk5MjgxNDEsImV4cCI6MTY5OTkzMTc0MX0.SvJga6CDZP4Sl2Xi-sHPaGRUuO90wHgQjHim8eXCz8Y', 15, 20, 0),
(16, '201971390', '$2a$10$CwkjKzPYH2kLKBEamWivUOxzpIgWCkzCME0WhSyhbJrwmvclfSyOO', NULL, 16, 20, 0),
(17, '201914066', '$2a$10$GPsOfZu8hHOynBnpSOeXROxhOw2iaDNL4tei2HO0hY3JQAGa8sBla', NULL, 17, 20, 0),
(18, '202087453', '$2a$10$mCBeyqnqGcvrMwtFhTglrOuV3DWEFnFlt8IlH1dGepX6zf9OjGCPe', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjE4LCJyb2xlIjoiMCIsIm1hdHJpY3VsYSI6IjIwMjA4NzQ1MyIsImlhdCI6MTcwMDQ2NjgwNCwiZXhwIjoxNzAwNDY4NjA0fQ.xFOEIlJPmzKsU5zE23HvC7WVcs9o3JGpYhktplz0JWs', 18, 20, 0),
(19, '202049357', '$2a$10$PsaETaBmss/ocpVn06z4VuyvoeWHUfkfvZ/FSIqNW6Z7uMgqZ6vy6', NULL, 19, 20, 0),
(20, '201979153', '$2a$10$xd9qYZSqoEfFIVRqZQGavOcZnLhOLc9/VtPGUJn.BQhxmYdl9UR7G', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjIwLCJyb2xlIjoiMSIsIm1hdHJpY3VsYSI6IjIwMTk3OTE1MyIsImlhdCI6MTcwNzUyMjE1NiwiZXhwIjoxNzA3NTIzOTU2fQ.ZyEXiezllSfqYiq8_jxaaNWHS7plZNMAeoOsX-Sde_w', 20, NULL, 0),
(21, '201975310', '$2a$10$d6Z12erYBsrZWSCS4LW32ukwcNSQwY29D.s2I1H27tmqip5jJWeKW', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjIxLCJyb2xlIjoiMCIsIm1hdHJpY3VsYSI6IjIwMTk3NTMxMCIsImlhdCI6MTcwNzUyMjA5MywiZXhwIjoxNzA3NTIzODkzfQ.J7OW1EMY3cCCKWcg9H4fix_mK-GdDW672gyrmCvNPmw', 21, 1, 0),
(22, '201954741', '$2a$10$8S6yksEEStzWvJNwlOIDhuIiI0V9nkALyL1LyU.bE8nMN0Q1dFlEG', NULL, 22, 1, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `calificacion`
--
ALTER TABLE `calificacion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `calificacion_ibfk_1` (`idCurso`),
  ADD KEY `idUsuario` (`idCuenta`);

--
-- Indexes for table `cuenta`
--
ALTER TABLE `cuenta`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idPlanEstudio` (`idPlanEstudio`);

--
-- Indexes for table `curso`
--
ALTER TABLE `curso`
  ADD PRIMARY KEY (`nrc`),
  ADD KEY `idMateria` (`idMateria`);

--
-- Indexes for table `materia`
--
ALTER TABLE `materia`
  ADD PRIMARY KEY (`id`),
  ADD KEY `materia_ibfk_1` (`idPlanEstudio`);

--
-- Indexes for table `planestudio`
--
ALTER TABLE `planestudio`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idCuenta` (`idCuenta`),
  ADD KEY `fk_tutor` (`tutorId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `calificacion`
--
ALTER TABLE `calificacion`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=142;

--
-- AUTO_INCREMENT for table `cuenta`
--
ALTER TABLE `cuenta`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `curso`
--
ALTER TABLE `curso`
  MODIFY `nrc` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10100;

--
-- AUTO_INCREMENT for table `materia`
--
ALTER TABLE `materia`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=113;

--
-- AUTO_INCREMENT for table `planestudio`
--
ALTER TABLE `planestudio`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `calificacion`
--
ALTER TABLE `calificacion`
  ADD CONSTRAINT `calificacion_ibfk_1` FOREIGN KEY (`idCurso`) REFERENCES `curso` (`nrc`),
  ADD CONSTRAINT `calificacion_ibfk_2` FOREIGN KEY (`idCuenta`) REFERENCES `cuenta` (`id`);

--
-- Constraints for table `cuenta`
--
ALTER TABLE `cuenta`
  ADD CONSTRAINT `cuenta_ibfk_1` FOREIGN KEY (`idPlanEstudio`) REFERENCES `planestudio` (`id`);

--
-- Constraints for table `curso`
--
ALTER TABLE `curso`
  ADD CONSTRAINT `curso_ibfk_1` FOREIGN KEY (`idMateria`) REFERENCES `materia` (`id`);

--
-- Constraints for table `materia`
--
ALTER TABLE `materia`
  ADD CONSTRAINT `materia_ibfk_1` FOREIGN KEY (`idPlanEstudio`) REFERENCES `planestudio` (`id`);

--
-- Constraints for table `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `fk_tutor` FOREIGN KEY (`tutorId`) REFERENCES `usuario` (`id`),
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`idCuenta`) REFERENCES `cuenta` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
