-- phpMyAdmin SQL Dump
-- version 4.4.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Sep 29, 2016 at 03:37 PM
-- Server version: 5.6.26
-- PHP Version: 5.6.12

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
-- Table structure for table `categories`
--

CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `name` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `user_id`, `name`, `description`, `date`) VALUES
(1, 16, 'Test Category', 'Test Description', '2016-09-07'),
(2, 16, 'New Test--', 'Newwww', '2016-09-20'),
(3, 16, 'test', 'test', '2016-09-17'),
(5, 16, 'manchester', 'united test description', '2016-09-17');

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE IF NOT EXISTS `tasks` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `name` varchar(300) COLLATE utf32_unicode_ci NOT NULL,
  `description` varchar(2000) COLLATE utf32_unicode_ci NOT NULL,
  `date` date NOT NULL,
  `done` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf32 COLLATE=utf32_unicode_ci;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`id`, `user_id`, `category_id`, `name`, `description`, `date`, `done`) VALUES
(1, 16, 1, 'Test Task', 'Very very very long description of test task', '2016-09-21', 0),
(2, 16, 2, 'New Task by GESH', 'GESH GESH GESH GESH GESH', '2016-09-21', 1),
(3, 16, 5, 'Manchester category Task', 'Manchestereer manchester', '2016-09-16', 0),
(4, 16, 3, 'Manchester', 'Man man man man united', '1899-11-28', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
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
-- Dumping data for table `users`
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=28;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
