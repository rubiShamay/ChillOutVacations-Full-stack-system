-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 10, 2023 at 08:13 PM
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
-- Database: `vacations`
--
CREATE DATABASE IF NOT EXISTS `vacations` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `vacations`;

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `userID` int(11) NOT NULL,
  `vacationsID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`userID`, `vacationsID`) VALUES
(12, 1),
(12, 4),
(12, 5),
(12, 6),
(12, 8),
(12, 9),
(12, 11);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `role` int(11) NOT NULL,
  `name` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`role`, `name`) VALUES
(1, 'Admin'),
(2, 'User');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `role` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `email`, `password`, `role`) VALUES
(5, 'Son', 'Goku', 'kakaroto@gmail.com', '12345', 1),
(10, 'yosi', 'cohen', 'yosi@gmail.com', '12345', 2),
(12, 'moshe', 'levi', 'mosthshe@gmail.com', '12345', 2),
(13, 'Avi', 'Cohen', 'fefef@gmail.com', '12345', 2);

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(500) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `ImageName` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`id`, `name`, `description`, `startDate`, `endDate`, `price`, `ImageName`) VALUES
(1, 'Paris', 'Paris is the most romantic city in the world, with friendly locals, excellent restaurants, and unique cultural sites.', '2023-12-14', '2023-12-27', 2000, '549b77ed-ab80-49a2-884b-dd8abfa6afe8.jpeg'),
(2, 'Kyoto', 'With the beautiful gardens of Sagano, the Kiyomizu temples, and a rich historical background, Kyoto offers a unique experience in various aspects.', '2024-08-12', '2024-08-31', 1500, 'fc4c4798-0e9f-4329-8043-6c05c43ce177.jpeg'),
(3, 'Cape Town', 'Cape Town offers breathtaking landscapes, from Table Mountain to the Cape of Good Hope. Enjoy diverse cultures, delicious cuisine, and a welcoming atmosphere.', '2024-01-15', '2024-01-29', 235, '70a28eb7-8cd4-4808-87c1-e124e6efa652.jpeg'),
(4, 'Bangkok', 'Explore vibrant street markets, visit ornate temples, and indulge in delicious Thai cuisine. Bangkok is a bustling city with a unique blend of tradition and modernity.', '2024-02-06', '2024-02-19', 2800, 'b6b24478-5d31-4131-be42-2c53a5390340.jpeg'),
(5, 'Reykjavik', 'Discover the land of fire and ice with geysers, waterfalls, and geothermal hot springs. Reykjavik offers a unique blend of nature and culture.', '2024-11-03', '2024-11-24', 4400, 'f8d7c880-66d4-4ad0-91cc-e16831524585.jpeg'),
(6, 'Rio de Janeiro', 'Experience the energy of Carnival, relax on the iconic Copacabana beach, and explore the vibrant neighborhoods of Rio de Janeiro.', '2024-04-01', '2024-04-24', 2638, '534a6f99-7434-4320-9a99-1a56d07486ea.jpeg'),
(7, 'Dubrovnik', 'Known for its stunning city walls and historic architecture, Dubrovnik offers a charming blend of history and seaside beauty.', '2024-02-06', '2024-02-15', 1235, '3690dac9-478c-408f-af03-12983f321969.jpeg'),
(8, 'Queenstown', 'Nestled on the shores of Lake Wakatipu, Queenstown is a paradise for outdoor enthusiasts with its stunning landscapes and adventure activities.', '2024-12-31', '2025-01-14', 1254, 'fd10854d-201c-40c9-8647-12f3b3f05d91.jpeg'),
(9, 'Amsterdam', 'Explore the picturesque canals, visit world-class museums, and experience the unique atmosphere of Amsterdam.', '2024-01-15', '2024-02-04', 3599, '63280714-271a-4668-895c-e42fe12daefc.jpeg'),
(10, 'Marrakech', 'Immerse yourself in the vibrant colors and bustling souks of Marrakech. Explore historic palaces, gardens, and the unique atmosphere of the medina.', '2024-04-02', '2024-04-24', 3149, '06feab45-c08e-45e7-84d4-ee71b3b7c6a0.jpeg'),
(11, 'Isreal', 'Enjoy the beautiful beaches, lush rice terraces, and vibrant culture of Isreal. Its a perfect destination for relaxation and exploration.', '2024-11-06', '2024-12-18', 4999, '0e084d42-6a74-4341-aea9-95c598e5f9f7.jpeg'),
(36, 'dfb', 'bdbd', '2023-11-28', '2023-11-29', 11, '07c8ba5f-baeb-446a-9a03-70150be07760.jpeg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD PRIMARY KEY (`userID`,`vacationsID`),
  ADD KEY `userID` (`userID`),
  ADD KEY `vacationsID` (`vacationsID`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`role`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `role` (`role`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `role` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`vacationsID`) REFERENCES `vacations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`userID`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role`) REFERENCES `roles` (`role`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
