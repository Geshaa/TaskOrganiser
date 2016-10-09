-- phpMyAdmin SQL Dump
-- version 4.4.12
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 
-- Версия на сървъра: 5.6.25
-- PHP Version: 5.6.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `taskorganiser`
--

-- --------------------------------------------------------

--
-- Структура на таблица `categories`
--

CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `name` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Схема на данните от таблица `categories`
--

INSERT INTO `categories` (`id`, `user_id`, `name`, `description`, `date`) VALUES
(1, 16, 'Test Category', 'Test Description', '2016-09-07'),
(2, 16, 'New Test--', 'Newwww', '2016-09-20'),
(3, 16, 'test', 'test', '2016-09-17'),
(5, 16, 'manchester', 'united test description', '2016-09-17');

-- --------------------------------------------------------

--
-- Структура на таблица `deleted`
--

CREATE TABLE IF NOT EXISTS `deleted` (
  `user_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `name` varchar(300) COLLATE utf32_unicode_ci NOT NULL,
  `description` varchar(2000) COLLATE utf32_unicode_ci NOT NULL,
  `date` date NOT NULL,
  `done` tinyint(4) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_unicode_ci;

--
-- Схема на данните от таблица `deleted`
--

INSERT INTO `deleted` (`user_id`, `category_id`, `name`, `description`, `date`, `done`) VALUES
(14, 2, 'Another User', 'asdasd asdasd asd', '2016-10-29', 0),
(16, 13, 'na na delete', 'delete', '2016-10-18', 0);

-- --------------------------------------------------------

--
-- Структура на таблица `tasks`
--

CREATE TABLE IF NOT EXISTS `tasks` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `name` varchar(300) COLLATE utf32_unicode_ci NOT NULL,
  `description` varchar(2000) COLLATE utf32_unicode_ci NOT NULL,
  `date` date NOT NULL,
  `done` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf32 COLLATE=utf32_unicode_ci;

--
-- Схема на данните от таблица `tasks`
--

INSERT INTO `tasks` (`id`, `user_id`, `category_id`, `name`, `description`, `date`, `done`) VALUES
(1, 16, 1, 'Test Task', 'Very very very long description of test task', '2016-09-21', 0),
(3, 16, 5, 'Manchester category Task', 'Manchestereer manchester', '2016-09-16', 0),
(10, 16, 3, 'new test delete', 'neww test delete', '2016-10-29', 1);

-- --------------------------------------------------------

--
-- Структура на таблица `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL,
  `firstName` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `lastName` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `phone` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(5000) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Схема на данните от таблица `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `phone`, `email`, `password`) VALUES
(1, 'georgi', 'ivanov', '', 'gesh@abv.bg', '1234'),
(14, '123123', '1231235324', '', '13213@abv.bg', '$2y$10$1LBLvgsLFA.bPzso/JW.8uO1fZI1nzytSUPjrP.eVfvdnZUVmgunm'),
(15, '213123', '123123', '', 'sadasdsdad@abv.bg', '$2y$10$aGKueaEWNa5kY9G/ua6juujwhMEOFodIust0Nf.gHa8Gxnc9QmFxi'),
(16, 'dido', 'daniel', '081283123', 'dido@abv.bg', '$2y$10$3Z4xkECRJv6oJ7e3xoba.OCuU1I.B8UKszN0ZYi2.w4JWAxl2nxZm'),
(27, 'niki', 'iliev', '12938123', 'niki@cloudcart.com', '$2y$10$QUIguUezmrLLI/FhIQk2a.R1QWrLp1TIXZ7ogwji6U0QknITpIkNe');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `deleted`
--
ALTER TABLE `deleted`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=18;
--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=21;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=28;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
