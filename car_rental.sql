-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Nov 15, 2025 at 05:01 PM
-- Server version: 9.1.0
-- PHP Version: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `car_rental`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
CREATE TABLE IF NOT EXISTS `admin` (
  `A_ID` int NOT NULL AUTO_INCREMENT,
  `type` varchar(50) NOT NULL,
  `FullName` varchar(100) DEFAULT NULL,
  `Username` varchar(50) DEFAULT NULL,
  `Password` varchar(100) DEFAULT NULL,
  `PhoneNumber` bigint DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `Status` varchar(50) DEFAULT NULL,
  `Updation_Date` date DEFAULT NULL,
  PRIMARY KEY (`A_ID`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`A_ID`, `type`, `FullName`, `Username`, `Password`, `PhoneNumber`, `Address`, `Status`, `Updation_Date`) VALUES
(1, 'admin', 'Zelalem', 'Zelalem', '123', 1234, 'kebede', 'pending', '2025-11-08');

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
CREATE TABLE IF NOT EXISTS `customer` (
  `C_ID` int NOT NULL AUTO_INCREMENT,
  `FullName` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `Email` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `Password` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `PhoneNumber` bigint DEFAULT NULL,
  `DoB` date DEFAULT NULL,
  `Nationality` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `City` varchar(50) DEFAULT NULL,
  `Register_Date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `Update_Date` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`C_ID`)
) ENGINE=MyISAM AUTO_INCREMENT=46 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`C_ID`, `FullName`, `Email`, `Password`, `PhoneNumber`, `DoB`, `Nationality`, `Address`, `City`, `Register_Date`, `Update_Date`) VALUES
(11, 'Kenji Tanaka', 'tanaka.k@corp.jp', 'Tokyo2024!', 819012345678, '1980-08-18', 'Japanese', '1-1-1 Shibuya, Apt 501', 'Tokyo', '2025-11-04 19:32:56', '11/5/2025, 10:47:16 AM'),
(10, 'Liam O\'Connell', 'liam.o@mail.com.au', 'Ozk99$liam', 61412345678, '1992-06-17', 'Australian', '6 Ocean View Parade', 'Sydney', '2025-11-04 19:32:15', '11/4/2025, 10:32:15 PM'),
(9, 'Elizabeth A. Vance', 'liz.vance@example.com', 'StrongPassword123!', 447700900000, '1995-07-25', 'British', '45 Regent Street, Apt 2A', 'London', '2025-11-04 09:27:03', '11/4/2025, 12:27:03 PM'),
(12, 'David Chen', 'dchen@web.ca', 'HockeyNightInCanada', 14169876543, '1975-04-10', 'Canadian', '25 Maple Leaf Dr', 'Toronto', '2025-11-04 19:33:15', '11/4/2025, 10:33:15 PM'),
(13, 'Anna Schmidt', 'anna.schmidt@mail.de', 'BerlinWall89', 49301234567890, '2000-01-20', 'German', 'Hauptstrasse 15', 'Berlin', '2025-11-04 19:33:24', '11/4/2025, 10:33:24 PM'),
(14, 'Marcus K. Rodriguez', 'marcus.r@company.net', 'M@rcusSecurePws!', 5551234567, '1988-11-03', 'American', '789 Oak Avenue, Unit 10', 'Chicago', '2025-11-04 19:33:34', '11/4/2025, 10:33:34 PM'),
(15, 'Thandi Nkosi', 'thandi.n@safrica.net', 'NkosiSecure#01', 27715559999, '1978-02-14', 'South African', 'Unit 4, Sun Park Estate', 'Cape Town', '2025-11-05 06:43:44', '11/5/2025, 9:43:44 AM'),
(16, 'Leo Min', 'min@a.co', 'p_w_d_min', 1234567890, '1950-01-01', 'IR', '1 A St.', 'NY', '2025-11-05 06:47:14', '11/5/2025, 9:47:14 AM'),
(17, 'Sofia Alves', 'sofia.alves@br.com', 'Carnival$2025', 5521987654321, '1994-03-29', 'Brazilian', 'Rua Copacabana 100', 'Rio de Janeiro', '2025-11-05 06:47:23', '11/5/2025, 9:47:23 AM'),
(19, 'bereket tsegaye', 'tanaka.k@corp.jop', 'Tokyo2024!', 819012345678, '1980-08-18', 'Japanese', '1-1-1 Shibuya, Apt 501', 'Tokyo', '2025-11-05 08:10:27', '11/5/2025, 11:10:27 AM'),
(20, 'kaleab worku', 'tanaka.k@corp.joing', 'Tokyo2024!', 819012345678, '1980-08-18', 'Japanese', '1-1-1 Shibuya, Apt 501', 'Tokyo', '2025-11-05 08:11:39', '11/5/2025, 11:11:39 AM'),
(29, 'Zelalem Legesse Reda', 'zlegesse9@gmail.com', '12345678', 931260114, '2007-11-06', 'Ethiopian', NULL, 'Addis Ababa', '2025-11-12 07:29:15', '11/12/2025, 10:29:14 AM'),
(28, 'Kenji Tanaka', 'tanaka.k@corp.coms', 'Tokyo2024!', 819012345678, '1980-08-18', 'Japanese', '1-1-1 Shibuya, Apt 501', 'Tokyo', '2025-11-09 14:55:06', '11/9/2025, 5:55:06 PM'),
(27, 'Kenji Tanaka', 'tanaka.k@corp.com', 'Tokyo2024!', 819012345678, '1980-08-18', 'Japanese', '1-1-1 Shibuya, Apt 501', 'Tokyo', '2025-11-09 14:52:59', '11/9/2025, 5:52:59 PM'),
(26, 'Kenji Tanaka', 'tanaka.k@corp.con', 'Tokyo2024!', 819012345678, '1980-08-18', 'Japanese', '1-1-1 Shibuya, Apt 501', 'Tokyo', '2025-11-09 14:49:57', '11/9/2025, 5:49:56 PM'),
(30, 'Zelalem Legesse Reda', 'bizuyeleg@gmail.com', '12345678', 931260114, '2007-11-06', 'Ethiopian', NULL, 'Addis Ababa', '2025-11-12 07:32:34', '11/12/2025, 10:32:34 AM'),
(31, 'Zelalem Legesse Reda', 'zlegesseb9@gmail.com', '12345678', 931260114, '2007-11-06', 'Ethiopian', NULL, 'Addis Ababa', '2025-11-12 07:38:43', '11/12/2025, 10:38:42 AM'),
(32, 'Zelalem Legesse Reda', 'zlegseb9@gmail.com', '12345678', 931260113, '2007-11-06', 'Ethiopian', NULL, 'Addis Ababa', '2025-11-12 07:40:03', '11/12/2025, 10:40:03 AM'),
(33, 'Zelalem Legesse Reda', 'zlegseeeb9@gmail.com', '12345678', 931260113, '2007-11-06', 'Ethiopian', NULL, 'Addis Ababa', '2025-11-12 07:40:44', '11/12/2025, 10:40:44 AM'),
(34, 'Zelalem Legesse Reda', 'zlegsseeeb9@gmail.com', '12345678', 931260113, '2007-11-06', 'Ethiopian', NULL, 'Addis Ababa', '2025-11-12 07:42:42', '11/12/2025, 10:42:42 AM'),
(35, 'Zelalem Legesse Reda', 'zlegesddsse9@gmail.com', '12345678', 931260114, '2007-10-31', 'Ethiopian', NULL, 'Addis Ababa', '2025-11-12 07:53:20', '11/12/2025, 10:53:20 AM'),
(36, 'Zelalem Legesse Reda', 'zlegesse93@gmail.com', '12345678', 931260114, '2007-11-08', 'Ethiopian', NULL, 'Addis Ababa', '2025-11-12 08:07:16', '11/12/2025, 11:07:16 AM'),
(37, 'Zelalem Legesse Reda', 'zleegesse9@gmail.com', '12345678', 931260114, '2007-11-01', 'Ethiopian', NULL, 'Addis Ababa', '2025-11-12 08:08:50', '11/12/2025, 11:08:50 AM'),
(38, 'tenagne Legesse', 'tenagne12@gmail.com', '11111111', 931260114, '2007-10-30', 'Ethiopian', NULL, 'Addis Ababa', '2025-11-15 13:06:29', '11/15/2025, 4:06:28 PM'),
(39, 'tenagne Legesse', 'tenagn2@gmail.com', '11111111', 931260114, '2007-10-30', 'Ethiopian', NULL, 'Addis Ababa', '2025-11-15 13:07:42', '11/15/2025, 4:07:42 PM'),
(40, 'tenagne Legesse', 'tenagne2@gmail.com', '11111111', 931260114, '2007-10-30', 'Ethiopian', NULL, 'Addis Ababa', '2025-11-15 13:09:23', '11/15/2025, 4:09:23 PM'),
(41, 'Zelalem Legesse Reda', 'zlegesddse9@gmail.com', '11111111', 931260114, '2007-10-29', 'Ethiopian', NULL, 'Addis Ababa', '2025-11-15 13:10:00', '11/15/2025, 4:10:00 PM'),
(42, 'Zelalem Legesse Reda', 'zlegesse9@gmails.com', '11111111', 931260114, '2007-10-31', 'Ethiopian', NULL, 'Addis Ababa', '2025-11-15 13:16:14', '11/15/2025, 4:16:14 PM'),
(43, 'Zelalem Legesse Reda', 'zleges33se9@gmail.com', '11111111', 931260114, '2007-11-01', 'Ethiopian', NULL, 'Addis Ababa', '2025-11-15 13:18:04', '11/15/2025, 4:18:04 PM'),
(44, 'Zelalem Legesse Reda', 'zlegesssse9@gmail.com', '11111111', 931260114, '2007-10-30', 'Ethiopian', NULL, 'Addis Ababa', '2025-11-15 13:19:59', '11/15/2025, 4:19:59 PM'),
(45, 'Zelalem Legesse Reda', 'zlssegesse9@gmail.com', '11111111', 931260114, '2007-11-08', 'Ethiopian', NULL, 'Addis Ababa', '2025-11-15 13:22:47', '11/15/2025, 4:22:46 PM');

-- --------------------------------------------------------

--
-- Table structure for table `rent`
--

DROP TABLE IF EXISTS `rent`;
CREATE TABLE IF NOT EXISTS `rent` (
  `Rent_ID` int NOT NULL AUTO_INCREMENT,
  `C_ID` varchar(50) NOT NULL,
  `V_ID` varchar(50) NOT NULL,
  `A_ID` varchar(50) NOT NULL,
  `Reservation_R_ID` varchar(50) DEFAULT NULL,
  `Pickup_Date` date DEFAULT NULL,
  `Return_Date` date DEFAULT NULL,
  `Total_Rent_Day` int DEFAULT NULL,
  `Daily_Fee` float DEFAULT NULL,
  `over-payment` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `Fule_Charged` float DEFAULT NULL,
  `Down_Payment` float DEFAULT NULL,
  `Total_Paid` float DEFAULT NULL,
  `Refund` float DEFAULT NULL,
  `Confirmation_Number` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Rent_ID`),
  UNIQUE KEY `Reservation_R_ID` (`Reservation_R_ID`),
  KEY `FK_Rent_Customer` (`C_ID`),
  KEY `FK_Rent_Vehicle` (`V_ID`),
  KEY `FK_Rent_Admin` (`A_ID`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `rent`
--

INSERT INTO `rent` (`Rent_ID`, `C_ID`, `V_ID`, `A_ID`, `Reservation_R_ID`, `Pickup_Date`, `Return_Date`, `Total_Rent_Day`, `Daily_Fee`, `over-payment`, `Fule_Charged`, `Down_Payment`, `Total_Paid`, `Refund`, `Confirmation_Number`) VALUES
(17, '11', '245', '1', '24', '2025-11-12', '2025-11-28', 16, 33.5, NULL, NULL, NULL, 536, NULL, '45b110c8-8f4e-46b3-ba04-e84c0891204c'),
(16, '12', '245', '1', '19', '2025-11-11', '2025-11-12', 1, 33.5, NULL, NULL, NULL, 33.5, NULL, '8f535f53-e774-4748-b967-4daaf0e17b41');

-- --------------------------------------------------------

--
-- Table structure for table `reservation`
--

DROP TABLE IF EXISTS `reservation`;
CREATE TABLE IF NOT EXISTS `reservation` (
  `R_ID` int NOT NULL AUTO_INCREMENT,
  `C_ID` varchar(50) NOT NULL,
  `V_ID` varchar(50) NOT NULL,
  `Pickup_Date` date DEFAULT NULL,
  `Return_Date` date DEFAULT NULL,
  `Status` varchar(50) DEFAULT NULL,
  `Confirmation_Number` varchar(50) DEFAULT NULL,
  `Posting_Date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`R_ID`),
  KEY `FK_Reservation_Customer` (`C_ID`),
  KEY `FK_Reservation_Vehicle` (`V_ID`)
) ENGINE=MyISAM AUTO_INCREMENT=25 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `reservation`
--

INSERT INTO `reservation` (`R_ID`, `C_ID`, `V_ID`, `Pickup_Date`, `Return_Date`, `Status`, `Confirmation_Number`, `Posting_Date`) VALUES
(20, '11', '259', '2025-11-21', NULL, 'pending', 'afe41fab-a979-4e67-a1f1-1439e32a342a', '2025-11-15 16:10:41'),
(19, '12', '245', '2025-11-11', '2025-11-12', 'confirmed', '8f535f53-e774-4748-b967-4daaf0e17b41', '2025-11-09 19:52:17'),
(18, '12', '246', '2025-11-11', '2025-11-12', 'pending', '8f535f53-e774-4748-b967-4daaf0e17b41', '2025-11-09 19:52:17'),
(21, '11', '259', '2025-11-04', '0000-00-00', 'pending', '8fecd08a-0b2c-49f7-95e2-eaef5400af2a', '2025-11-15 16:12:35'),
(22, '11', '259', '2025-11-02', '2025-11-20', 'pending', '2aa854ab-e941-46d3-8b22-458a3dd55a7b', '2025-11-15 16:14:04'),
(23, '11', '259', '2025-11-02', '2025-11-20', 'pending', 'fbd8ed13-374c-4821-ac6d-c3f94c6c5b5b', '2025-11-15 16:29:22'),
(24, '11', '245', '2025-11-12', '2025-11-28', 'confirmed', '45b110c8-8f4e-46b3-ba04-e84c0891204c', '2025-11-15 16:33:01');

-- --------------------------------------------------------

--
-- Table structure for table `vehicle`
--

DROP TABLE IF EXISTS `vehicle`;
CREATE TABLE IF NOT EXISTS `vehicle` (
  `V_ID` int NOT NULL AUTO_INCREMENT,
  `A_ID` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `V_Name` varchar(100) DEFAULT NULL,
  `Plate_Number` varchar(20) DEFAULT NULL,
  `Brand_Name` varchar(255) NOT NULL,
  `driver` varchar(50) NOT NULL,
  `Price_Per_Day` float DEFAULT NULL,
  `Model_Year` int DEFAULT NULL,
  `Seating_Capacity` int DEFAULT NULL,
  `Fuel_Type` varchar(50) DEFAULT NULL,
  `Registration_Date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `Updation_Date` varchar(50) NOT NULL,
  PRIMARY KEY (`V_ID`),
  KEY `fk_admin_vehicle` (`A_ID`)
) ENGINE=MyISAM AUTO_INCREMENT=260 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `vehicle`
--

INSERT INTO `vehicle` (`V_ID`, `A_ID`, `V_Name`, `Plate_Number`, `Brand_Name`, `driver`, `Price_Per_Day`, `Model_Year`, `Seating_Capacity`, `Fuel_Type`, `Registration_Date`, `Updation_Date`) VALUES
(253, '0', 'zelame', 'ET121', 'BMW', '', 122, 122, 122, 'Gasoline', '2025-11-13 10:47:21', '11/13/2025, 3:18:15 PM'),
(259, '1', 'teraraw', 'ET ze', 'Porsche', '', 222, 2020, 2, 'Diesel', '2025-11-14 07:32:54', '11/14/2025, 10:32:53 AM'),
(248, '0', 'E-Class', 'ET-20202', 'Mercedes-Benz', 'N/A', 110, 2024, 5, 'Hybrid', '2024-02-11 21:00:00', '11/13/2025, 9:42:03 PM'),
(246, '0', 'Sentra', 'FL-16033', 'Nissan', 'N/A', 28.25, 2023, 5, 'Gasoline', '2023-03-17 21:00:00', '2024-09-21'),
(245, '0', 'Malibu', 'AZ-15032', 'Chevrolet', 'N/A', 33.5, 2024, 5, 'Gasoline', '2024-01-10 21:00:00', '2024-11-05'),
(244, '0', 'Suburban', 'AZ-15031', 'Chevrolet', 'N/A', 78.75, 2020, 8, 'Gasoline', '2020-03-31 21:00:00', '2023-12-09'),
(243, '0', 'Model X', 'NY-14030', 'Tesla', 'N/A', 120.5, 2023, 6, 'Electric', '2023-09-20 21:00:00', '2024-10-09'),
(242, '0', 'Model Y', 'NY-14029', 'Tesla', 'N/A', 88.9, 2024, 5, 'Electric', '2024-02-01 21:00:00', '2024-11-05'),
(241, '0', 'Highlander', 'CA-13028', 'Toyota', 'N/A', 56, 2023, 7, 'Hybrid', '2023-05-14 21:00:00', '2024-06-17'),
(240, '0', 'Corolla', 'CA-13027', 'Toyota', 'N/A', 29.99, 2024, 5, 'Gasoline', '2024-01-19 21:00:00', '2024-11-05'),
(239, '0', 'Explorer', 'TX-12026', 'Ford', 'N/A', 60.25, 2022, 7, 'Gasoline', '2022-09-11 21:00:00', '2024-07-05'),
(238, '0', 'Mustang', 'TX-12025', 'Ford', 'N/A', 120, 2023, 4, 'Gasoline', '2023-03-04 21:00:00', '2024-08-26'),
(237, '0', 'Pilot', 'CA-11024', 'Honda', 'N/A', 52, 2021, 7, 'Gasoline', '2021-06-09 21:00:00', '2024-07-18'),
(236, '0', 'Accord', 'CA-11023', 'Honda', 'N/A', 34.75, 2024, 5, 'Gasoline', '2024-02-10 21:00:00', '2024-11-05'),
(235, '0', 'Q7', 'WA-71022', 'Audi', 'N/A', 95.5, 2022, 7, 'Hybrid', '2022-07-13 21:00:00', '2024-09-10'),
(234, '0', 'A4', 'WA-71021', 'Audi', 'N/A', 78, 2023, 5, 'Gasoline', '2023-04-21 21:00:00', '2024-10-01'),
(233, '0', 'XC90', 'CO-70010', 'Volvo', 'N/A', 72.5, 2024, 7, 'Hybrid', '2023-12-31 21:00:00', '2024-11-05'),
(232, '0', '911', 'GA-60009', 'Porsche', 'N/A', 199.99, 2020, 2, 'Gasoline', '2020-05-14 21:00:00', '2024-06-01'),
(231, '0', 'Telluride', 'MI-50008', 'Kia', 'N/A', 55, 2023, 7, 'Gasoline', '2023-03-29 21:00:00', '2024-07-22'),
(230, '0', 'Elantra', 'IL-40007', 'Hyundai', 'N/A', 32.5, 2024, 5, 'Gasoline', '2024-01-17 21:00:00', '2024-11-05'),
(229, '0', 'Wrangler', 'AZ-30006', 'Jeep', 'N/A', 60, 2020, 4, 'Gasoline', '2020-07-06 21:00:00', '2023-09-09'),
(228, '0', 'C-Class', 'MA-20005', 'Mercedes-Benz', 'N/A', 80, 2022, 5, 'Hybrid', '2022-02-13 21:00:00', '2024-10-20'),
(227, '0', '3 Series', 'NY-10004', 'BMW', 'N/A', 85.5, 2024, 4, 'Gasoline', '2024-05-24 21:00:00', '2024-11-05'),
(226, '0', 'Tahoe', 'CA-90003', 'Chevrolet', 'N/A', 70, 2021, 7, 'Diesel', '2021-03-31 21:00:00', '2023-11-11'),
(252, '0', '12', 'ET12', 'BMW', '', 12, 12, 12, 'Hybrid', '2025-11-13 10:45:36', '0000-00-00'),
(223, '0', 'X5', 'NY-54321', 'BMW', 'N/A', 95.99, 2023, 5, 'Hybrid', '2023-12-11 21:00:00', '2024-09-10'),
(224, '0', 'Camry', 'TX-70001', 'Toyota', 'N/A', 38.5, 2023, 5, 'Gasoline', '2023-08-09 21:00:00', '2024-01-05'),
(225, '0', 'Rogue', 'FL-80002', 'Nissan', 'N/A', 42, 2022, 5, 'Gasoline', '2022-09-14 21:00:00', '2024-03-20'),
(254, '0', 'zelame', 'ET1211', 'BMW', '', 122, 122, 122, 'Gasoline', '2025-11-13 10:50:09', '11/13/2025, 1:50:09 PM'),
(255, '0', 'taxi', 'ET-202', 'Jeep', '', 1212, 1212, 1212, 'Gasoline', '2025-11-13 10:54:10', '11/13/2025, 1:54:10 PM'),
(258, '1', 'temesgen', 'ET-202', 'Chevrolet', '', 222, 2022, 4, 'Diesel', '2025-11-13 18:43:20', '11/13/2025, 9:43:37 PM');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
