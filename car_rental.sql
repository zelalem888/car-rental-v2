-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Nov 26, 2025 at 11:12 AM
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
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`A_ID`, `type`, `FullName`, `Username`, `Password`, `PhoneNumber`, `Address`, `Status`, `Updation_Date`) VALUES
(1, 'admin', 'Zelalem', 'Zelalem', '123', 1234, 'kebede', 'pending', '2025-11-08'),
(3, 'admin', 'Zelalem', 'kebede', '123', 1234, 'kebede', 'pending', '2025-11-08');

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
) ENGINE=MyISAM AUTO_INCREMENT=46 DEFAULT CHARSET=latin1;

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
  `Down_Payment` float DEFAULT NULL,
  `Total_Paid` float DEFAULT NULL,
  `Refund` float DEFAULT NULL,
  `Confirmation_Number` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Rent_ID`),
  UNIQUE KEY `Reservation_R_ID` (`Reservation_R_ID`),
  KEY `FK_Rent_Customer` (`C_ID`),
  KEY `FK_Rent_Vehicle` (`V_ID`),
  KEY `FK_Rent_Admin` (`A_ID`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;

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
) ENGINE=MyISAM AUTO_INCREMENT=49 DEFAULT CHARSET=latin1;

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
) ENGINE=MyISAM AUTO_INCREMENT=272 DEFAULT CHARSET=latin1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
