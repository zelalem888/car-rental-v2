-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3307
-- Generation Time: Nov 03, 2025 at 09:42 AM
-- Server version: 11.5.2-MariaDB
-- PHP Version: 8.2.12

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

CREATE TABLE `admin` (
  `A_ID` varchar(50) NOT NULL,
  `type` varchar(50) NOT NULL,
  `FullName` varchar(100) DEFAULT NULL,
  `Username` varchar(50) DEFAULT NULL,
  `Password` varchar(100) DEFAULT NULL,
  `PhoneNumber` bigint(20) DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `Status` varchar(50) DEFAULT NULL,
  `Updation_Date` date DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `brand`
--

CREATE TABLE `brand` (
  `Brand_ID` varchar(50) NOT NULL,
  `Brand_Name` varchar(100) DEFAULT NULL,
  `Registration_Date` date DEFAULT NULL,
  `Updation_Date` date DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `C_ID` varchar(50) NOT NULL,
  `FullName` varchar(100) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `Password` varchar(100) DEFAULT NULL,
  `PhoneNumber` bigint(20) DEFAULT NULL,
  `DoB` date DEFAULT NULL,
  `Nationality` varchar(50) DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `City` varchar(50) DEFAULT NULL,
  `Register_Date` date DEFAULT NULL,
  `Update_Date` date DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `rent`
--

CREATE TABLE `rent` (
  `Rent_ID` varchar(255) NOT NULL,
  `C_ID` varchar(50) NOT NULL,
  `V_ID` varchar(50) NOT NULL,
  `A_ID` varchar(50) NOT NULL,
  `Reservation_R_ID` varchar(50) DEFAULT NULL,
  `Pickup_Date` date DEFAULT NULL,
  `Return_Date` date DEFAULT NULL,
  `Total_Rent_Day` int(11) DEFAULT NULL,
  `Daily_Fee` float DEFAULT NULL,
  `Fule_Provided_By` varchar(50) DEFAULT NULL,
  `Fule_Charged` float DEFAULT NULL,
  `Down_Payment` float DEFAULT NULL,
  `Total_Paid` float DEFAULT NULL,
  `Refund` float DEFAULT NULL,
  `Confirmation_Number` bigint(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reservation`
--

CREATE TABLE `reservation` (
  `R_ID` varchar(50) NOT NULL,
  `C_ID` varchar(50) NOT NULL,
  `V_ID` varchar(50) NOT NULL,
  `Pickup_Date` date DEFAULT NULL,
  `Return_Date` date DEFAULT NULL,
  `Status` varchar(50) DEFAULT NULL,
  `Confirmation_Number` bigint(20) DEFAULT NULL,
  `Posting_Date` date DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `vehicle`
--

CREATE TABLE `vehicle` (
  `V_ID` varchar(50) NOT NULL,
  `V_Name` varchar(100) DEFAULT NULL,
  `Plate_Number` varchar(20) DEFAULT NULL,
  `Brand_ID` varchar(50) DEFAULT NULL,
  `Price_Per_Day` float DEFAULT NULL,
  `Model_Year` int(11) DEFAULT NULL,
  `Seating_Capacity` int(11) DEFAULT NULL,
  `Fuel_Type` varchar(50) DEFAULT NULL,
  `Registration_Date` date DEFAULT NULL,
  `Updation_Date` date DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`A_ID`);

--
-- Indexes for table `brand`
--
ALTER TABLE `brand`
  ADD PRIMARY KEY (`Brand_ID`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`C_ID`);

--
-- Indexes for table `rent`
--
ALTER TABLE `rent`
  ADD PRIMARY KEY (`Rent_ID`),
  ADD UNIQUE KEY `Reservation_R_ID` (`Reservation_R_ID`),
  ADD KEY `FK_Rent_Customer` (`C_ID`),
  ADD KEY `FK_Rent_Vehicle` (`V_ID`),
  ADD KEY `FK_Rent_Admin` (`A_ID`) USING BTREE;

--
-- Indexes for table `reservation`
--
ALTER TABLE `reservation`
  ADD PRIMARY KEY (`R_ID`),
  ADD KEY `FK_Reservation_Customer` (`C_ID`),
  ADD KEY `FK_Reservation_Vehicle` (`V_ID`);

--
-- Indexes for table `vehicle`
--
ALTER TABLE `vehicle`
  ADD PRIMARY KEY (`V_ID`),
  ADD KEY `FK_Vehicle_Brand` (`Brand_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
