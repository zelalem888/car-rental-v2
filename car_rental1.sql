-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Dec 04, 2025 at 10:56 AM
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
  `Create_Date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`A_ID`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`A_ID`, `type`, `FullName`, `Username`, `Password`, `PhoneNumber`, `Address`, `Status`, `Updation_Date`, `Create_Date`) VALUES
(1, 'admin', 'Zelalem', 'Zelalem', '123', 1234, 'kebede', 'pending', '2025-11-08', '2025-12-04 10:49:41'),
(3, 'superadmin', 'Zelalem', 'kebede', '123', 1234, 'kebede', 'pending', '2025-11-08', '2025-12-04 10:49:41'),
(4, 'admin', 'zeberga', 'zebsh', '12344321', 978543679, 'ewifqelkd', 'Active', '0000-00-00', '2025-12-04 10:49:41'),
(5, 'admin', 'chebude', 'chebie', '123345543', 978543612, '1245wd', 'Active', '0000-00-00', '2025-12-04 10:49:41');

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
  `City` varchar(50) DEFAULT NULL,
  `Register_Date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `Update_Date` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`C_ID`)
) ENGINE=MyISAM AUTO_INCREMENT=67 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`C_ID`, `FullName`, `Email`, `Password`, `PhoneNumber`, `DoB`, `Nationality`, `City`, `Register_Date`, `Update_Date`) VALUES
(65, 'Zelalem Legesse Reda', 'zlegesse9@gmail.com', '$2b$10$C2/FqP/hu.rJHVUR.RMYw.epFuDzQ17KVYJVtdlnhKZ5C4GIRsLa2', 931260114, '2007-11-07', 'Ethiopian', 'Addis Ababa', '2025-12-04 07:32:42', '12/4/2025, 10:32:42 AM'),
(66, 'Zelalem Legesse Reda', 'bbctheone@gmail.com', '$2b$10$WdOAQEqCxWc8R2pNME9Rte/3ymXeqgsdukRaRT.hrzNjZ.GXTr5Y6', 931260114, '2007-10-30', 'Ethiopian', 'Addis Ababa', '2025-12-04 07:40:45', '12/4/2025, 10:40:45 AM');

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
  `over_payment` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `Fule_Charged` float DEFAULT NULL,
  `Total_paid` float DEFAULT NULL,
  `Refund` float DEFAULT NULL,
  `Confirmation_Number` varchar(50) DEFAULT NULL,
  `Update_Date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Rent_ID`),
  UNIQUE KEY `Reservation_R_ID` (`Reservation_R_ID`),
  KEY `FK_Rent_Customer` (`C_ID`),
  KEY `FK_Rent_Vehicle` (`V_ID`),
  KEY `FK_Rent_Admin` (`A_ID`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=32 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `rent`
--

INSERT INTO `rent` (`Rent_ID`, `C_ID`, `V_ID`, `A_ID`, `Reservation_R_ID`, `Pickup_Date`, `Return_Date`, `Total_Rent_Day`, `Daily_Fee`, `over_payment`, `Fule_Charged`, `Total_paid`, `Refund`, `Confirmation_Number`, `Update_Date`) VALUES
(26, '50', '276', '1', '54', '2025-11-29', '2025-11-30', 2, 900, '0', NULL, 0, 1800, '112731eb-874d-4dc3-8e2a-38fe1b6658ab', '2025-12-02 08:11:33'),
(25, '51', '274', '1', '55', '2025-12-01', '2026-01-08', 41, 1100, '0', NULL, 0, 45100, 'a1628828-57ef-4743-8518-70f9a64fc5a0', '2025-12-02 08:11:33'),
(24, '50', '277', '1', '53', '2025-12-04', '2025-12-09', 11, 1200, '0', NULL, 0, 13200, 'be122f3e-f966-41a4-a022-5b3ba37d4dc7', '2025-12-02 08:11:33'),
(27, '51', '278', '3', '67', '2025-12-01', '2025-12-05', 5, 1800, '0', NULL, 7200, 9000, '81d4a33f-0d08-4fb5-9c99-1c622bd5b4a1', '2025-12-02 08:11:33'),
(28, '60', '275', '1', '71', '2025-12-01', '2025-12-05', 3, 2000, '0', NULL, 8000, 6000, 'e002ae06-024c-48a0-8532-c8a7c04d2a43', '2025-12-02 08:11:33'),
(29, '51', '277', '3', '70', '2025-12-02', '2025-12-20', 18, 1200, '0', NULL, 21600, 21600, '47e426c3-12b6-4679-9a17-25bd5bf102a4', '2025-12-02 08:11:33'),
(30, '60', '278', '3', '73', '2025-12-02', '2025-12-09', 7, 1800, '0', NULL, 12600, 12600, 'ef86101d-b545-4fcf-9412-6827570d528d', '2025-12-02 08:11:33'),
(31, '60', '276', '3', '74', '2025-12-05', '2025-12-09', 7, 900, '0', NULL, 3600, 6300, '2c1b0d79-1f25-4e3e-957c-85e518338956', '2025-12-02 08:11:33');

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
  `Rent_Day` int DEFAULT NULL,
  `total_Payment` int DEFAULT NULL,
  `Status` varchar(50) DEFAULT NULL,
  `Confirmation_Number` varchar(50) DEFAULT NULL,
  `Posting_Date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`R_ID`),
  KEY `FK_Reservation_Customer` (`C_ID`),
  KEY `FK_Reservation_Vehicle` (`V_ID`)
) ENGINE=MyISAM AUTO_INCREMENT=75 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `reservation_logs`
--

DROP TABLE IF EXISTS `reservation_logs`;
CREATE TABLE IF NOT EXISTS `reservation_logs` (
  `Log_ID` int NOT NULL AUTO_INCREMENT,
  `Reservation_ID` int NOT NULL,
  `C_ID` int NOT NULL,
  `V_ID` int NOT NULL,
  `Admin_ID` int DEFAULT NULL,
  `Action_Type` enum('created','updated','done','deleted','cancelled','overdue','confirmed') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Old_Status` varchar(50) DEFAULT NULL,
  `New_Status` varchar(50) DEFAULT NULL,
  `Pickup_Date` date DEFAULT NULL,
  `Return_Date` date DEFAULT NULL,
  `Rent_Days` int DEFAULT NULL,
  `Price_Per_Day` decimal(10,2) DEFAULT NULL,
  `Total_Charge` decimal(10,2) DEFAULT NULL,
  `Overpayment` decimal(10,2) DEFAULT NULL,
  `Refund` decimal(10,2) DEFAULT NULL,
  `Confirmation_Number` varchar(100) DEFAULT NULL,
  `Logged_At` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Log_ID`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reservation_logs`
--

INSERT INTO `reservation_logs` (`Log_ID`, `Reservation_ID`, `C_ID`, `V_ID`, `Admin_ID`, `Action_Type`, `Old_Status`, `New_Status`, `Pickup_Date`, `Return_Date`, `Rent_Days`, `Price_Per_Day`, `Total_Charge`, `Overpayment`, `Refund`, `Confirmation_Number`, `Logged_At`) VALUES
(6, 71, 60, 275, 1, 'created', 'No status', 'pending', '2025-12-01', '2025-12-05', 4, 2000.00, 8000.00, NULL, NULL, 'e002ae06-024c-48a0-8532-c8a7c04d2a43', '2025-11-30 22:43:24'),
(5, 70, 51, 277, 1, 'updated', 'pending', 'pending', '2025-12-02', '2025-12-20', 18, 1200.00, 21600.00, NULL, NULL, '47e426c3-12b6-4679-9a17-25bd5bf102a4', '2025-11-30 22:36:34'),
(4, 70, 51, 277, 1, 'created', 'No status', 'pending', '2025-12-02', '2025-12-10', 8, 1200.00, 9600.00, NULL, NULL, '47e426c3-12b6-4679-9a17-25bd5bf102a4', '2025-11-30 22:35:48'),
(7, 72, 60, 274, 1, 'created', 'No status', 'pending', '2025-12-05', '2025-12-07', 2, 1100.00, 2200.00, NULL, NULL, '833672c5-3020-4795-bd1b-88cd2fef841f', '2025-12-02 07:25:32'),
(8, 72, 60, 274, 1, 'updated', 'pending', 'pending', '2025-12-05', '2025-12-08', 4, 1100.00, 4400.00, NULL, NULL, '833672c5-3020-4795-bd1b-88cd2fef841f', '2025-12-02 07:27:28'),
(9, 72, 60, 274, 1, 'deleted', 'pending', 'Reservation Deleted', '2025-12-05', '2025-12-08', 4, 1100.00, 4400.00, NULL, NULL, '833672c5-3020-4795-bd1b-88cd2fef841f', '2025-12-02 07:38:02'),
(10, 73, 60, 278, 1, 'created', 'No status', 'pending', '2025-12-02', '2025-12-09', 7, 1800.00, 12600.00, NULL, NULL, 'ef86101d-b545-4fcf-9412-6827570d528d', '2025-12-02 07:59:00'),
(11, 73, 60, 278, 1, 'confirmed', 'pending', 'Reservation confirmed by AdminID 1', '2025-12-02', '2025-12-09', 7, 1800.00, 12600.00, NULL, NULL, 'ef86101d-b545-4fcf-9412-6827570d528d', '2025-12-02 07:59:39'),
(12, 74, 60, 276, 1, 'created', 'No status', 'pending', '2025-12-05', '2025-12-09', 4, 900.00, 3600.00, NULL, NULL, '2c1b0d79-1f25-4e3e-957c-85e518338956', '2025-12-02 08:00:22'),
(13, 74, 60, 276, 1, 'confirmed', 'pending', 'Reservation confirmed by AdminID 3', '2025-12-05', '2025-12-09', 4, 900.00, 3600.00, NULL, NULL, '2c1b0d79-1f25-4e3e-957c-85e518338956', '2025-12-02 08:00:33'),
(14, 74, 60, 276, 1, 'done', 'confirmed', 'Reservation completed by AdminID 3', '2025-12-05', '2025-12-09', 4, 900.00, 3600.00, NULL, NULL, '2c1b0d79-1f25-4e3e-957c-85e518338956', '2025-12-02 08:31:48'),
(15, 70, 51, 277, 1, 'done', 'confirmed', 'Reservation completed by AdminID 3', '2025-12-02', '2025-12-20', 18, 1200.00, 21600.00, 0.00, 21600.00, '47e426c3-12b6-4679-9a17-25bd5bf102a4', '2025-12-02 08:34:05');

-- --------------------------------------------------------

--
-- Table structure for table `user_logs`
--

DROP TABLE IF EXISTS `user_logs`;
CREATE TABLE IF NOT EXISTS `user_logs` (
  `Log_ID` int NOT NULL AUTO_INCREMENT,
  `User_ID` int NOT NULL,
  `Role` enum('customer','admin') NOT NULL,
  `Action` varchar(100) NOT NULL,
  `Target_ID` int DEFAULT NULL,
  `Description` text,
  `Device` varchar(200) DEFAULT NULL,
  `Logged_At` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Log_ID`)
) ENGINE=MyISAM AUTO_INCREMENT=107 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_logs`
--

INSERT INTO `user_logs` (`Log_ID`, `User_ID`, `Role`, `Action`, `Target_ID`, `Description`, `Device`, `Logged_At`) VALUES
(1, 59, 'customer', 'Account Created.', NULL, 'Account created by userID 59', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', '2025-11-28 20:05:33'),
(2, 50, 'customer', 'Login.', NULL, 'Account Logged In by userID 50', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', '2025-11-28 20:09:38'),
(5, 50, 'customer', 'Created Reservation.', 63, 'Created Reservation by userID 50', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', '2025-11-28 20:21:48'),
(6, 50, 'customer', 'Update Reservation', 63, 'Updated Reservation by userID 50', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', '2025-11-28 20:31:52'),
(7, 50, 'customer', 'Delete Reservation', 63, 'Deleted Reservation by userID 50', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', '2025-11-28 20:36:00'),
(8, 50, 'customer', 'Update Account', NULL, 'Updated Account by userID 50', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', '2025-11-28 20:43:19'),
(9, 50, 'customer', 'Deleted Account', NULL, 'Deleted Reservation by userID 50', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', '2025-11-28 20:43:46'),
(10, 51, 'customer', 'Login.', NULL, 'Account Logged In by userID 51', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', '2025-11-29 12:43:12'),
(11, 1, 'admin', 'Admin Login', NULL, 'Admin logged In by AdminID 1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:145.0) Gecko/20100101 Firefox/145.0', '2025-11-29 12:57:20'),
(12, 1, 'admin', 'Create/add a vehicle', 280, 'Vehicle Add by AdminID 1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:145.0) Gecko/20100101 Firefox/145.0', '2025-11-29 13:03:56'),
(13, 3, 'admin', 'Admin Login', NULL, 'Admin logged In by AdminID 3', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:145.0) Gecko/20100101 Firefox/145.0', '2025-11-29 13:04:47'),
(14, 1, 'admin', 'update a vehicle', 280, 'Vehicle Updated by AdminID 1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:145.0) Gecko/20100101 Firefox/145.0', '2025-11-29 13:16:44'),
(15, 3, 'admin', 'Admin Login', NULL, 'Admin logged In by AdminID 3', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:145.0) Gecko/20100101 Firefox/145.0', '2025-11-29 13:18:43'),
(20, 3, 'admin', 'Create/add a vehicle', 282, 'Vehicle Add by AdminID 3', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:145.0) Gecko/20100101 Firefox/145.0', '2025-11-29 13:44:32'),
(19, 3, 'admin', 'Create/add a vehicle', 281, 'Vehicle Add by AdminID 3', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:145.0) Gecko/20100101 Firefox/145.0', '2025-11-29 13:39:45'),
(18, 3, 'admin', 'update a vehicle', 280, 'Vehicle Updated by AdminID 3', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:145.0) Gecko/20100101 Firefox/145.0', '2025-11-29 13:24:23'),
(21, 3, 'admin', 'Create/add a vehicle', 283, 'Vehicle Add by AdminID 3', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:145.0) Gecko/20100101 Firefox/145.0', '2025-11-29 13:47:41'),
(22, 3, 'admin', 'Delete a vehicle', 283, 'Vehicle Deleted by AdminID 3', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:145.0) Gecko/20100101 Firefox/145.0', '2025-11-29 13:47:45'),
(23, 51, 'customer', 'Created Reservation.', 64, 'Created Reservation by userID 51', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', '2025-11-29 14:35:13'),
(24, 51, 'customer', 'Created Reservation.', 65, 'Created Reservation by userID 51', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', '2025-11-29 14:35:14'),
(25, 51, 'customer', 'Created Reservation.', 66, 'Created Reservation by userID 51', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', '2025-11-29 14:35:18'),
(26, 51, 'customer', 'Created Reservation.', 67, 'Created Reservation by userID 51', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', '2025-11-30 19:55:40'),
(27, 51, 'customer', 'Created Reservation.', 68, 'Created Reservation by userID 51', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', '2025-11-30 21:12:46'),
(28, 51, 'customer', 'Update Reservation', 68, 'Updated Reservation by userID 51', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', '2025-11-30 22:13:27'),
(29, 51, 'customer', 'Update Reservation', 68, 'Updated Reservation by userID 51', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', '2025-11-30 22:13:47'),
(30, 51, 'customer', 'Delete Reservation', 68, 'Deleted Reservation by userID 51', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', '2025-11-30 22:28:05'),
(31, 51, 'customer', 'Created Reservation.', 69, 'Created Reservation by userID 51', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', '2025-11-30 22:29:28'),
(32, 51, 'customer', 'Update Reservation', 69, 'Updated Reservation by userID 51', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', '2025-11-30 22:30:28'),
(33, 51, 'customer', 'Delete Reservation', 69, 'Deleted Reservation by userID 51', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', '2025-11-30 22:35:18'),
(34, 51, 'customer', 'Created Reservation.', 70, 'Created Reservation by userID 51', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', '2025-11-30 22:35:48'),
(35, 51, 'customer', 'Update Reservation', 70, 'Updated Reservation by userID 51', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', '2025-11-30 22:36:34'),
(36, 60, 'customer', 'Account Created.', NULL, 'Account created by userID 60', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', '2025-11-30 22:42:22'),
(37, 60, 'customer', 'Created Reservation.', 71, 'Created Reservation by userID 60', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', '2025-11-30 22:43:24'),
(38, 1, 'admin', 'Admin Login', NULL, 'Admin logged In by AdminID 1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:145.0) Gecko/20100101 Firefox/145.0', '2025-11-30 22:44:29'),
(39, 1, 'admin', 'Create/add a vehicle', 284, 'Vehicle Add by AdminID 1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:145.0) Gecko/20100101 Firefox/145.0', '2025-11-30 23:02:16'),
(40, 60, 'customer', 'Created Reservation.', 72, 'Created Reservation by userID 60', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', '2025-12-02 07:25:32'),
(41, 60, 'customer', 'Update Reservation', 72, 'Updated Reservation by userID 60', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', '2025-12-02 07:27:28'),
(42, 60, 'customer', 'Delete Reservation', 72, 'Deleted Reservation by userID 60', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', '2025-12-02 07:38:02'),
(43, 60, 'customer', 'Created Reservation.', 73, 'Created Reservation by userID 60', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', '2025-12-02 07:59:00'),
(44, 60, 'customer', 'Created Reservation.', 74, 'Created Reservation by userID 60', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', '2025-12-02 08:00:22'),
(45, 3, 'admin', 'Admin Login', NULL, 'Admin logged In by AdminID 3', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:145.0) Gecko/20100101 Firefox/145.0', '2025-12-02 08:00:29'),
(46, 1, 'admin', 'Admin Login', NULL, 'Admin logged In by AdminID 1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', '2025-12-02 18:44:00'),
(47, 1, 'admin', 'Admin Login', NULL, 'Admin logged In by AdminID 1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', '2025-12-02 18:44:02'),
(48, 1, 'admin', 'Admin Login', NULL, 'Admin logged In by AdminID 1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', '2025-12-02 18:44:02'),
(49, 1, 'admin', 'Admin Login', NULL, 'Admin logged In by AdminID 1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', '2025-12-02 18:44:03'),
(50, 1, 'admin', 'Admin Login', NULL, 'Admin logged In by AdminID 1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', '2025-12-02 18:44:05'),
(51, 1, 'admin', 'Admin Login', NULL, 'Admin logged In by AdminID 1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', '2025-12-02 18:44:06'),
(52, 1, 'admin', 'Admin Login', NULL, 'Admin logged In by AdminID 1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', '2025-12-02 18:44:06'),
(53, 1, 'admin', 'Admin Login', NULL, 'Admin logged In by AdminID 1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', '2025-12-02 18:44:06'),
(54, 1, 'admin', 'Admin Login', NULL, 'Admin logged In by AdminID 1', 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36', '2025-12-02 18:53:15'),
(55, 1, 'admin', 'Admin Login', NULL, 'Admin logged In by AdminID 1', 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36', '2025-12-02 18:54:30'),
(56, 1, 'admin', 'Admin Login', NULL, 'Admin logged In by AdminID 1', 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36', '2025-12-02 18:55:08'),
(57, 1, 'admin', 'Admin Login', NULL, 'Admin logged In by AdminID 1', 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36', '2025-12-02 18:55:42'),
(58, 1, 'admin', 'Admin Login', NULL, 'Admin logged In by AdminID 1', 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36', '2025-12-02 18:56:21'),
(59, 1, 'admin', 'Admin Login', NULL, 'Admin logged In by AdminID 1', 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36', '2025-12-02 19:02:12'),
(60, 1, 'admin', 'Admin Login', NULL, 'Admin logged In by AdminID 1', 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36', '2025-12-02 19:02:17'),
(61, 1, 'admin', 'Admin Login', NULL, 'Admin logged In by AdminID 1', 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36', '2025-12-02 19:02:19'),
(62, 1, 'admin', 'Admin Login', NULL, 'Admin logged In by AdminID 1', 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36', '2025-12-02 19:02:40'),
(63, 1, 'admin', 'Admin Login', NULL, 'Admin logged In by AdminID 1', 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36', '2025-12-02 19:03:02'),
(64, 1, 'admin', 'Admin Login', NULL, 'Admin logged In by AdminID 1', 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36', '2025-12-02 19:05:57'),
(65, 1, 'admin', 'Admin Login', NULL, 'Admin logged In by AdminID 1', 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36', '2025-12-02 19:06:36'),
(66, 1, 'admin', 'Admin Login', NULL, 'Admin logged In by AdminID 1', 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36', '2025-12-02 19:06:46'),
(67, 1, 'admin', 'Admin Login', NULL, 'Admin logged In by AdminID 1', 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36', '2025-12-02 19:07:41'),
(68, 1, 'admin', 'Admin Login', NULL, 'Admin logged In by AdminID 1', 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36', '2025-12-02 19:09:43'),
(69, 1, 'admin', 'Admin Login', NULL, 'Admin logged In by AdminID 1', 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36', '2025-12-02 19:13:39'),
(70, 1, 'admin', 'Admin Login', NULL, 'Admin logged In by AdminID 1', 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36', '2025-12-02 19:13:59'),
(71, 1, 'admin', 'Admin Login', NULL, 'Admin logged In by AdminID 1', 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36', '2025-12-02 19:24:06'),
(72, 1, 'admin', 'Admin Login', NULL, 'Admin logged In by AdminID 1', 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36', '2025-12-02 19:24:18'),
(73, 1, 'admin', 'Admin Login', NULL, 'Admin logged In by AdminID 1', 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36', '2025-12-02 19:25:34'),
(74, 1, 'admin', 'Admin Login', NULL, 'Admin logged In by AdminID 1', 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36', '2025-12-02 19:26:26'),
(75, 1, 'admin', 'Admin Login', NULL, 'Admin logged In by AdminID 1', 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36', '2025-12-02 19:26:42'),
(76, 1, 'admin', 'Admin Login', NULL, 'Admin logged In by AdminID 1', 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36', '2025-12-02 19:27:09'),
(77, 1, 'admin', 'Admin Login', NULL, 'Admin logged In by AdminID 1', 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36', '2025-12-02 19:27:10'),
(78, 1, 'admin', 'Admin Login', NULL, 'Admin logged In by AdminID 1', 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36', '2025-12-02 19:27:15'),
(79, 1, 'admin', 'Admin Login', NULL, 'Admin logged In by AdminID 1', 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36', '2025-12-02 19:28:28'),
(80, 1, 'admin', 'Admin Login', NULL, 'Admin logged In by AdminID 1', 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36', '2025-12-02 19:28:53'),
(81, 1, 'admin', 'Admin Login', NULL, 'Admin logged In by AdminID 1', 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36', '2025-12-02 19:29:18'),
(82, 1, 'admin', 'Admin Login', NULL, 'Admin logged In by AdminID 1', 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36', '2025-12-02 19:30:44'),
(83, 60, 'customer', 'Login.', NULL, 'Account Logged In by userID 60', 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36', '2025-12-02 19:45:53'),
(84, 1, 'admin', 'Admin Login', NULL, 'Admin logged In by AdminID 1', 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36', '2025-12-02 19:46:56'),
(85, 1, 'admin', 'Admin Login', NULL, 'Admin logged In by AdminID 1', 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36', '2025-12-02 19:47:18'),
(86, 3, 'admin', 'Admin Login', NULL, 'Admin logged In by AdminID 3', 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36', '2025-12-02 19:50:22'),
(87, 60, 'customer', 'Login.', NULL, 'Account Logged In by userID 60', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', '2025-12-03 16:22:37'),
(88, 60, 'customer', 'Login.', NULL, 'Account Logged In by userID 60', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', '2025-12-04 07:07:26'),
(89, 61, 'customer', 'Account Created.', NULL, 'Account created by userID 61', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', '2025-12-04 07:14:00'),
(90, 62, 'customer', 'Account Created.', NULL, 'Account created by userID 62', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', '2025-12-04 07:17:28'),
(91, 63, 'customer', 'Account Created.', NULL, 'Account created by userID 63', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', '2025-12-04 07:18:16'),
(92, 64, 'customer', 'Account Created.', NULL, 'Account created by userID 64', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', '2025-12-04 07:19:16'),
(93, 65, 'customer', 'Account Created.', NULL, 'Account created by userID 65', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', '2025-12-04 07:32:42'),
(94, 65, 'customer', 'Login.', NULL, 'Account Logged In by userID 65', 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36', '2025-12-04 07:38:08'),
(95, 65, 'customer', 'Login.', NULL, 'Account Logged In by userID 65', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', '2025-12-04 07:39:27'),
(96, 65, 'customer', 'Login.', NULL, 'Account Logged In by userID 65', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', '2025-12-04 07:40:01'),
(97, 66, 'customer', 'Account Created.', NULL, 'Account created by userID 66', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', '2025-12-04 07:40:45'),
(98, 3, 'admin', 'Admin Login', NULL, 'Admin logged In by AdminID 3', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:145.0) Gecko/20100101 Firefox/145.0', '2025-12-04 09:06:13'),
(99, 1, 'admin', 'Admin Login', NULL, 'Admin logged In by AdminID 1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:145.0) Gecko/20100101 Firefox/145.0', '2025-12-04 09:06:40'),
(100, 3, 'admin', 'Admin Login', NULL, 'Admin logged In by AdminID 3', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:145.0) Gecko/20100101 Firefox/145.0', '2025-12-04 09:06:56'),
(101, 1, 'admin', 'Admin Login', NULL, 'Admin logged In by AdminID 1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:145.0) Gecko/20100101 Firefox/145.0', '2025-12-04 09:08:01'),
(102, 1, 'admin', 'Create/add a vehicle', 285, 'Vehicle Add by AdminID 1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:145.0) Gecko/20100101 Firefox/145.0', '2025-12-04 09:12:40'),
(103, 1, 'admin', 'Admin Login', NULL, 'Admin logged In by AdminID 1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:145.0) Gecko/20100101 Firefox/145.0', '2025-12-04 09:13:57'),
(104, 1, 'admin', 'Create/add a vehicle', 286, 'Vehicle Add by AdminID 1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:145.0) Gecko/20100101 Firefox/145.0', '2025-12-04 09:20:44'),
(105, 1, 'admin', 'Delete a vehicle', 286, 'Vehicle Deleted by AdminID 1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:145.0) Gecko/20100101 Firefox/145.0', '2025-12-04 09:35:38'),
(106, 3, 'admin', 'Admin Login', NULL, 'Admin logged In by AdminID 3', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:145.0) Gecko/20100101 Firefox/145.0', '2025-12-04 09:35:44');

-- --------------------------------------------------------

--
-- Table structure for table `vehicle`
--

DROP TABLE IF EXISTS `vehicle`;
CREATE TABLE IF NOT EXISTS `vehicle` (
  `V_ID` int NOT NULL AUTO_INCREMENT,
  `A_ID` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `V_Name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Plate_Number` varchar(20) DEFAULT NULL,
  `Brand_Name` varchar(255) NOT NULL,
  `Price_Per_Day` float DEFAULT NULL,
  `Model_Year` int DEFAULT NULL,
  `Seating_Capacity` int DEFAULT NULL,
  `Fuel_Type` varchar(50) DEFAULT NULL,
  `Images` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `Registration_Date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `Updation_Date` varchar(50) NOT NULL,
  PRIMARY KEY (`V_ID`),
  KEY `fk_admin_vehicle` (`A_ID`)
) ENGINE=MyISAM AUTO_INCREMENT=287 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `vehicle`
--

INSERT INTO `vehicle` (`V_ID`, `A_ID`, `V_Name`, `Plate_Number`, `Brand_Name`, `Price_Per_Day`, `Model_Year`, `Seating_Capacity`, `Fuel_Type`, `Images`, `Registration_Date`, `Updation_Date`) VALUES
(278, '1', 'GTR', 'ET-2022', 'Nissan', 1800, 2018, 2, 'Diesel', '[\"/uploads/1764157366297-991.jpg\",\"/uploads/1764157366303-130.jpg\",\"/uploads/1764162081700-889.webp\"]', '2025-11-26 11:42:46', '11/26/2025, 4:01:21 PM'),
(277, '1', 'Mustang ', 'ET-2303', 'Ford', 1200, 2022, 2, 'Diesel', '[\"/uploads/1764157083055-534.jpg\",\"/uploads/1764157083059-822.jpg\",\"/uploads/1764157083062-849.jpg\"]', '2025-11-26 11:38:03', '11/26/2025, 2:38:03 PM'),
(276, '1', 'Corolla Cross', 'ET-4042', 'Toyota', 900, 2023, 6, 'Hybrid', '[\"/uploads/1764156935770-841.jpg\",\"/uploads/1764157853968-207.webp\",\"/uploads/1764157853972-18.jpg\"]', '2025-11-26 11:35:35', '11/26/2025, 2:50:53 PM'),
(275, '1', 'M3', 'ET-2324', 'BMW', 2000, 2024, 2, 'Electric', '[\"/uploads/1764156783691-459.jpg\",\"/uploads/1764156783695-588.jpg\"]', '2025-11-26 11:33:03', '11/26/2025, 2:33:03 PM'),
(274, '1', 'Model X', 'ET-4032', 'Tesla', 1100, 2022, 5, 'Electric', '[\"/uploads/1764156715245-908.jpg\",\"/uploads/1764156715245-249.jpg\",\"/uploads/1764156715248-787.jpg\"]', '2025-11-26 11:31:55', '11/26/2025, 2:31:55 PM'),
(273, '1', 'Model Y', 'ET-4043', 'Tesla', 1200, 2021, 5, 'Electric', '[\"/uploads/1764156666148-781.jpg\",\"/uploads/1764156666162-898.jpg\",\"/uploads/1764156666169-351.jpg\",\"/uploads/1764156666171-163.jpeg\"]', '2025-11-26 11:31:06', '11/26/2025, 2:31:06 PM'),
(279, '1', 'Wrangler ', 'ET-3933', 'Jeep', 2200, 2015, 6, 'Diesel', '[\"/uploads/1764157519349-745.jpg\",\"/uploads/1764157519351-636.webp\",\"/uploads/1764157755322-50.jpg\"]', '2025-11-26 11:45:19', '11/26/2025, 2:49:15 PM'),
(284, '1', 'betties', 'ET-32202', 'BMW', 100, 2011, 12, 'Gasoline', '[\"/uploads/1764543736558-360.jpg\",\"/uploads/1764543736568-501.jpg\",\"/uploads/1764543736577-18.jpg\"]', '2025-11-30 23:02:16', '12/1/2025, 2:02:16 AM');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
