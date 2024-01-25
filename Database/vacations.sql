-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 25, 2024 at 12:59 PM
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
(10, 6),
(10, 11),
(10, 41),
(12, 2),
(12, 4),
(12, 5),
(12, 6),
(12, 8),
(12, 9),
(12, 10),
(13, 4),
(13, 5),
(13, 11),
(14, 4),
(14, 6),
(14, 8),
(14, 11),
(14, 47),
(15, 4),
(16, 1),
(16, 2),
(16, 6),
(16, 8),
(16, 10),
(16, 43),
(17, 2),
(17, 3),
(17, 6),
(17, 11),
(18, 1),
(18, 6),
(18, 9),
(18, 11),
(18, 43),
(18, 44),
(19, 3),
(19, 5),
(19, 7),
(19, 41),
(20, 1),
(20, 43),
(20, 44),
(20, 46),
(20, 47),
(21, 41),
(21, 42),
(21, 45),
(21, 47);

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
  `password` varchar(200) NOT NULL,
  `role` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `email`, `password`, `role`) VALUES
(5, 'Son', 'Goku', 'kakaroto@gmail.com', 'd2ac4ad254983b2324d796546709ec5efde40c59fdbbbcc92284b1a623a0a24615c9d20153d34bc87f158820388a6dbfbdd495f930093ff5724822c501de15c5', 1),
(10, 'Yosi', 'Cohen', 'yosi@gmail.com', 'd2ac4ad254983b2324d796546709ec5efde40c59fdbbbcc92284b1a623a0a24615c9d20153d34bc87f158820388a6dbfbdd495f930093ff5724822c501de15c5', 2),
(12, 'Moshe', 'Levi', 'moshe@gmail.com', 'd2ac4ad254983b2324d796546709ec5efde40c59fdbbbcc92284b1a623a0a24615c9d20153d34bc87f158820388a6dbfbdd495f930093ff5724822c501de15c5', 2),
(13, 'Avi', 'Cohen', 'avi@gmail.com', 'd2ac4ad254983b2324d796546709ec5efde40c59fdbbbcc92284b1a623a0a24615c9d20153d34bc87f158820388a6dbfbdd495f930093ff5724822c501de15c5', 2),
(14, 'Shlomo', 'Borshtein', 'shlomo@gamil.com', 'd2ac4ad254983b2324d796546709ec5efde40c59fdbbbcc92284b1a623a0a24615c9d20153d34bc87f158820388a6dbfbdd495f930093ff5724822c501de15c5', 2),
(15, 'Michal', 'Lev', 'michal@gmail.com', 'd2ac4ad254983b2324d796546709ec5efde40c59fdbbbcc92284b1a623a0a24615c9d20153d34bc87f158820388a6dbfbdd495f930093ff5724822c501de15c5', 2),
(16, 'Stefany', 'Kostar', 'stefany@gmail.com', 'd2ac4ad254983b2324d796546709ec5efde40c59fdbbbcc92284b1a623a0a24615c9d20153d34bc87f158820388a6dbfbdd495f930093ff5724822c501de15c5', 2),
(17, 'May', 'Bason', 'may@gmail.com', 'd2ac4ad254983b2324d796546709ec5efde40c59fdbbbcc92284b1a623a0a24615c9d20153d34bc87f158820388a6dbfbdd495f930093ff5724822c501de15c5', 2),
(18, 'Alona', 'Tal', 'alona@gmail.com', 'd2ac4ad254983b2324d796546709ec5efde40c59fdbbbcc92284b1a623a0a24615c9d20153d34bc87f158820388a6dbfbdd495f930093ff5724822c501de15c5', 2),
(19, 'Ilan', 'Rozenfeld', 'ilan@gmail.com', 'd2ac4ad254983b2324d796546709ec5efde40c59fdbbbcc92284b1a623a0a24615c9d20153d34bc87f158820388a6dbfbdd495f930093ff5724822c501de15c5', 2),
(20, 'Oded', 'Paz', 'oded@gmail.com', 'd2ac4ad254983b2324d796546709ec5efde40c59fdbbbcc92284b1a623a0a24615c9d20153d34bc87f158820388a6dbfbdd495f930093ff5724822c501de15c5', 2),
(21, 'Daniel', 'Hason', 'daniel@gmail.com', 'd2ac4ad254983b2324d796546709ec5efde40c59fdbbbcc92284b1a623a0a24615c9d20153d34bc87f158820388a6dbfbdd495f930093ff5724822c501de15c5', 2);

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
  `price` decimal(6,2) NOT NULL,
  `ImageName` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`id`, `name`, `description`, `startDate`, `endDate`, `price`, `ImageName`) VALUES
(1, 'Paris', 'Paris is the most romantic city in the world, with friendly locals, excellent restaurants, and unique cultural sites.', '2023-12-14', '2023-12-27', 2000.00, '549b77ed-ab80-49a2-884b-dd8abfa6afe8.jpeg'),
(2, 'Kyoto', 'With the beautiful gardens of Sagano, the Kiyomizu temples, and a rich historical background, Kyoto offers a unique experience in various aspects.', '2024-08-12', '2024-08-31', 1500.00, 'fc4c4798-0e9f-4329-8043-6c05c43ce177.jpeg'),
(3, 'Cape Town', 'Cape Town offers breathtaking landscapes, from Table Mountain to the Cape of Good Hope. Enjoy diverse cultures, delicious cuisine, and a welcoming atmosphere.', '2024-01-15', '2024-01-29', 235.00, '70a28eb7-8cd4-4808-87c1-e124e6efa652.jpeg'),
(4, 'Bangkok', 'Explore vibrant street markets, visit ornate temples, and indulge in delicious Thai cuisine. Bangkok is a bustling city with a unique blend of tradition and modernity.', '2024-02-06', '2024-02-19', 2800.00, 'b6b24478-5d31-4131-be42-2c53a5390340.jpeg'),
(5, 'Reykjavik', 'Discover the land of fire and ice with geysers, waterfalls, and geothermal hot springs. Reykjavik offers a unique blend of nature and culture.', '2024-11-03', '2024-11-24', 4400.00, 'f8d7c880-66d4-4ad0-91cc-e16831524585.jpeg'),
(6, 'Rio de Janeiro', 'Experience the energy of Carnival, relax on the iconic Copacabana beach, and explore the vibrant neighborhoods of Rio de Janeiro.', '2024-04-01', '2024-04-24', 2638.00, '534a6f99-7434-4320-9a99-1a56d07486ea.jpeg'),
(7, 'Dubrovnik', 'Known for its stunning city walls and historic architecture, Dubrovnik offers a charming blend of history and seaside beauty.', '2024-02-06', '2024-02-15', 1235.00, '3690dac9-478c-408f-af03-12983f321969.jpeg'),
(8, 'Queenstown', 'Nestled on the shores of Lake Wakatipu, Queenstown is a paradise for outdoor enthusiasts with its stunning landscapes and adventure activities.', '2024-12-31', '2025-01-14', 1254.00, 'fd10854d-201c-40c9-8647-12f3b3f05d91.jpeg'),
(9, 'Amsterdam', 'Explore the picturesque canals, visit world-class museums, and experience the unique atmosphere of Amsterdam.', '2024-01-15', '2024-02-04', 3599.00, '63280714-271a-4668-895c-e42fe12daefc.jpeg'),
(10, 'Marrakech', 'Immerse yourself in the vibrant colors and bustling souks of Marrakech. Explore historic palaces, gardens, and the unique atmosphere of the medina.', '2024-04-02', '2024-04-24', 3149.00, '06feab45-c08e-45e7-84d4-ee71b3b7c6a0.jpeg'),
(11, 'Isreal', 'Enjoy the beautiful beaches, lush rice terraces, and vibrant culture of Isreal. Its a perfect destination for relaxation and exploration.', '2024-11-06', '2024-12-18', 4999.00, '0e084d42-6a74-4341-aea9-95c598e5f9f7.jpeg'),
(41, 'Paradise St. Tropez', 'A Mediterranean gem, seamlessly blending golden beaches and clear waters with vibrant city life and upscale culture. Experience luxury with exquisite restaurants, glamorous cafes, and high-end boutiques. Ideal for nature lovers, water sports enthusiasts, and art aficionados. Paradise St. Tropez promises a holiday of indelible and unique memories.', '2024-02-20', '2024-02-29', 2345.00, 'b13f83f8-036b-4b87-afa9-b9dbc3d40999.webp'),
(42, 'Venice', 'Venice, a city built on water, is a romantic destination with its winding canals, historic architecture, and artistic treasures. Take a gondola ride, visit St. Mark\'s Square, and experience the Venetian culture.', '2024-12-10', '2024-12-30', 3980.00, '35051513-1edd-46f4-a547-9a160d5e8068.jpeg'),
(43, 'Prague', 'Prague, the \"City of a Hundred Spires,\" captivates with its fairy-tale architecture and rich history. Walk across Charles Bridge, explore Prague Castle, and indulge in delicious Czech cuisine.', '2024-05-25', '2024-05-29', 1199.99, 'f4c8262a-ae83-4ec0-99f8-a57010e141a0.jpeg'),
(44, 'Barcelona', 'Barcelona is a vibrant city known for its unique architecture, lively street life, and rich cultural heritage. Explore the distinctive works of Gaudí, stroll down La Rambla, and relax on the city\'s beautiful beaches.', '2024-04-03', '2024-04-16', 2579.99, 'e5136113-fe7a-45fb-b523-e3f7c9738cc6.jpeg'),
(45, 'Dubai', 'Immerse yourself in the opulence of Dubai, a city of futuristic architecture, luxury shopping, and desert adventures. Visit the towering Burj Khalifa, indulge in a desert safari, and experience the vibrant culture.', '2024-02-07', '2024-02-21', 4999.00, '75175feb-03b1-439b-9f2a-7ee0fb6343ed.jpeg'),
(46, 'Santorini', 'Experience the enchanting beauty of Santorini, with its iconic white-washed buildings perched on cliffs overlooking the Aegean Sea. Enjoy romantic sunsets, explore ancient ruins, and savor delicious Greek cuisine.', '2024-04-30', '2024-05-14', 3699.99, '94645ae5-59d1-4e06-9262-62ba8b33fa3a.jpeg'),
(47, 'Sydney', 'Explore the dynamic city of Sydney, with its iconic Opera House, Sydney Harbour Bridge, and beautiful beaches. Enjoy a ferry ride across the harbor, visit Taronga Zoo, and experience the lively culture.', '2024-07-16', '2024-07-23', 2123.98, '5e90a909-8d2f-4297-88f7-8e0d53dc7bb5.jpeg');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

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
