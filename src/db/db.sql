-- MySQL dump 10.13  Distrib 5.5.62, for Win64 (AMD64)
--
-- Host: localhost    Database: lab_management_db
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `area`
--

DROP TABLE IF EXISTS `area`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `area` (
  `Area_ID` int NOT NULL AUTO_INCREMENT,
  `Area_Name` varchar(100) NOT NULL,
  `Area_Size` varchar(100) NOT NULL,
  `Area_Unit` varchar(10) DEFAULT NULL,
  `Area_Type` varchar(50) DEFAULT NULL,
  `Area_Locations` varchar(50) DEFAULT NULL,
  `Area_Reservoir` varchar(100) NOT NULL,
  `Area_Photo` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Area_ID`),
  UNIQUE KEY `Area_Name` (`Area_Name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `area`
--

LOCK TABLES `area` WRITE;
/*!40000 ALTER TABLE `area` DISABLE KEYS */;
/*!40000 ALTER TABLE `area` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `culture`
--

DROP TABLE IF EXISTS `culture`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `culture` (
  `Culture_ID` int NOT NULL AUTO_INCREMENT,
  `Plant_ID` int DEFAULT NULL,
  `Culture_Medium_ID` int DEFAULT NULL,
  `Laboratory_ID` int DEFAULT NULL,
  `Nursery_ID` int DEFAULT NULL,
  `Greenhouse_ID` int DEFAULT NULL,
  `Field_ID` int DEFAULT NULL,
  `Start_Date` date DEFAULT NULL,
  `Duration_Of_Nursery_1` int DEFAULT NULL,
  `Duration_Of_Laboratory` int DEFAULT NULL,
  `Duration_Of_Nursery_2` int DEFAULT NULL,
  `Duration_Of_GreenHouse` int DEFAULT NULL,
  `Duration_Of_Field` int DEFAULT NULL,
  `Growth_Parameters_ID` int DEFAULT NULL,
  PRIMARY KEY (`Culture_ID`),
  KEY `Plant_ID` (`Plant_ID`),
  KEY `Culture_Medium_ID` (`Culture_Medium_ID`),
  KEY `Laboratory_ID` (`Laboratory_ID`),
  KEY `Nursery_ID` (`Nursery_ID`),
  KEY `Greenhouse_ID` (`Greenhouse_ID`),
  KEY `Field_ID` (`Field_ID`),
  KEY `Growth_Parameters_ID` (`Growth_Parameters_ID`),
  CONSTRAINT `Culture_ibfk_1` FOREIGN KEY (`Plant_ID`) REFERENCES `plant` (`Plant_ID`),
  CONSTRAINT `Culture_ibfk_2` FOREIGN KEY (`Culture_Medium_ID`) REFERENCES `culture_medium` (`Culture_Medium_ID`),
  CONSTRAINT `Culture_ibfk_3` FOREIGN KEY (`Laboratory_ID`) REFERENCES `laboratory` (`Laboratory_ID`),
  CONSTRAINT `Culture_ibfk_4` FOREIGN KEY (`Nursery_ID`) REFERENCES `nursery` (`Nursery_ID`),
  CONSTRAINT `Culture_ibfk_5` FOREIGN KEY (`Greenhouse_ID`) REFERENCES `greenhouse` (`Greenhouse_ID`),
  CONSTRAINT `Culture_ibfk_6` FOREIGN KEY (`Field_ID`) REFERENCES `field` (`Field_ID`),
  CONSTRAINT `Culture_ibfk_7` FOREIGN KEY (`Growth_Parameters_ID`) REFERENCES `growth_parameters` (`Growth_Parameters_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `culture`
--

LOCK TABLES `culture` WRITE;
/*!40000 ALTER TABLE `culture` DISABLE KEYS */;
/*!40000 ALTER TABLE `culture` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `culture_medium`
--

DROP TABLE IF EXISTS `culture_medium`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `culture_medium` (
  `Culture_Medium_ID` int NOT NULL AUTO_INCREMENT,
  `Culture_Medium_Name` varchar(100) NOT NULL,
  `Culture_Medium_Description` text,
  PRIMARY KEY (`Culture_Medium_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `culture_medium`
--

LOCK TABLES `culture_medium` WRITE;
/*!40000 ALTER TABLE `culture_medium` DISABLE KEYS */;
INSERT INTO `culture_medium` VALUES (1,'Test5','Ok5'),(6,'Test3','Ok');
/*!40000 ALTER TABLE `culture_medium` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `culture_plan`
--

DROP TABLE IF EXISTS `culture_plan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `culture_plan` (
  `Culture_Plan_ID` int NOT NULL AUTO_INCREMENT,
  `Activity_Type` varchar(50) NOT NULL,
  `Area` varchar(100) NOT NULL,
  `Plant_Type` varchar(100) NOT NULL,
  `Crop_Type` varchar(100) NOT NULL,
  `Container_Quantity` varchar(50) NOT NULL,
  `Container_Type` varchar(50) NOT NULL,
  `Transition_Time` date NOT NULL,
  `Source_Area` varchar(100) DEFAULT NULL,
  `Destination_Area` varchar(100) DEFAULT NULL,
  `Number_of_Plants` int DEFAULT NULL,
  PRIMARY KEY (`Culture_Plan_ID`),
  KEY `culture_plan_FK` (`Area`),
  KEY `culture_plan_FK_1` (`Source_Area`),
  KEY `culture_plan_FK_2` (`Destination_Area`),
  CONSTRAINT `culture_plan_FK` FOREIGN KEY (`Area`) REFERENCES `area` (`Area_Name`),
  CONSTRAINT `culture_plan_FK_1` FOREIGN KEY (`Source_Area`) REFERENCES `area` (`Area_Name`),
  CONSTRAINT `culture_plan_FK_2` FOREIGN KEY (`Destination_Area`) REFERENCES `area` (`Area_Name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `culture_plan`
--

LOCK TABLES `culture_plan` WRITE;
/*!40000 ALTER TABLE `culture_plan` DISABLE KEYS */;
/*!40000 ALTER TABLE `culture_plan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `field`
--

DROP TABLE IF EXISTS `field`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `field` (
  `Field_ID` int NOT NULL AUTO_INCREMENT,
  `Field_Name` varchar(100) NOT NULL,
  `Address` varchar(200) NOT NULL,
  `Size` decimal(10,2) NOT NULL,
  PRIMARY KEY (`Field_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `field`
--

LOCK TABLES `field` WRITE;
/*!40000 ALTER TABLE `field` DISABLE KEYS */;
INSERT INTO `field` VALUES (1,'Test3','Ok',2.00);
/*!40000 ALTER TABLE `field` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `greenhouse`
--

DROP TABLE IF EXISTS `greenhouse`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `greenhouse` (
  `Greenhouse_ID` int NOT NULL AUTO_INCREMENT,
  `Greenhouse_Name` varchar(100) NOT NULL,
  `Address` varchar(200) NOT NULL,
  `Phone_Number` varchar(20) NOT NULL,
  PRIMARY KEY (`Greenhouse_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `greenhouse`
--

LOCK TABLES `greenhouse` WRITE;
/*!40000 ALTER TABLE `greenhouse` DISABLE KEYS */;
INSERT INTO `greenhouse` VALUES (1,'Test3','Ok','34'),(3,'Test3','Ok','666666d');
/*!40000 ALTER TABLE `greenhouse` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `growth_parameters`
--

DROP TABLE IF EXISTS `growth_parameters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `growth_parameters` (
  `Growth_Parameters_ID` int NOT NULL AUTO_INCREMENT,
  `Temperature` decimal(5,2) DEFAULT NULL,
  `Photoperiod` varchar(50) DEFAULT NULL,
  `Light_Intensity` varchar(50) DEFAULT NULL,
  `Humidity` decimal(5,2) DEFAULT NULL,
  `pH` decimal(4,2) DEFAULT NULL,
  `Container` varchar(50) DEFAULT NULL,
  `Container_Size` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Growth_Parameters_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `growth_parameters`
--

LOCK TABLES `growth_parameters` WRITE;
/*!40000 ALTER TABLE `growth_parameters` DISABLE KEYS */;
INSERT INTO `growth_parameters` VALUES (1,50.00,'Test3',NULL,10.00,5.00,'BOX','4');
/*!40000 ALTER TABLE `growth_parameters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `growth_record`
--

DROP TABLE IF EXISTS `growth_record`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `growth_record` (
  `Growth_Record_ID` int NOT NULL AUTO_INCREMENT,
  `Culture_ID` int DEFAULT NULL,
  `Observation_Date` date DEFAULT NULL,
  `Height` decimal(10,2) DEFAULT NULL,
  `Width` decimal(10,2) DEFAULT NULL,
  `Number_of_Leaves` int DEFAULT NULL,
  `Health_Status` varchar(50) DEFAULT NULL,
  `Image` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Growth_Record_ID`),
  KEY `Culture_ID` (`Culture_ID`),
  CONSTRAINT `Growth_Record_ibfk_1` FOREIGN KEY (`Culture_ID`) REFERENCES `culture` (`Culture_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `growth_record`
--

LOCK TABLES `growth_record` WRITE;
/*!40000 ALTER TABLE `growth_record` DISABLE KEYS */;
/*!40000 ALTER TABLE `growth_record` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `laboratory`
--

DROP TABLE IF EXISTS `laboratory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `laboratory` (
  `Laboratory_ID` int NOT NULL AUTO_INCREMENT,
  `Laboratory_Name` varchar(100) NOT NULL,
  `Address` varchar(200) NOT NULL,
  `Phone_Number` varchar(20) NOT NULL,
  PRIMARY KEY (`Laboratory_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `laboratory`
--

LOCK TABLES `laboratory` WRITE;
/*!40000 ALTER TABLE `laboratory` DISABLE KEYS */;
INSERT INTO `laboratory` VALUES (2,'Test3','Ok','666666');
/*!40000 ALTER TABLE `laboratory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nursery`
--

DROP TABLE IF EXISTS `nursery`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nursery` (
  `Nursery_ID` int NOT NULL AUTO_INCREMENT,
  `Nursery_Name` varchar(100) NOT NULL,
  `Address` varchar(200) NOT NULL,
  `Phone_Number` varchar(20) NOT NULL,
  PRIMARY KEY (`Nursery_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nursery`
--

LOCK TABLES `nursery` WRITE;
/*!40000 ALTER TABLE `nursery` DISABLE KEYS */;
/*!40000 ALTER TABLE `nursery` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plant`
--

DROP TABLE IF EXISTS `plant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `plant` (
  `Plant_ID` int NOT NULL AUTO_INCREMENT,
  `Plant_Name` varchar(100) NOT NULL,
  `Scientific_Name` varchar(200) NOT NULL,
  `Plant_Description` text,
  `Image` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Plant_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plant`
--

LOCK TABLES `plant` WRITE;
/*!40000 ALTER TABLE `plant` DISABLE KEYS */;
/*!40000 ALTER TABLE `plant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tasks` (
  `Task_ID` int NOT NULL AUTO_INCREMENT,
  `Task_Category` varchar(20) NOT NULL,
  `Title` varchar(50) NOT NULL,
  `Description` varchar(500) DEFAULT NULL,
  `Priority` varchar(10) NOT NULL,
  `Due_Date` date NOT NULL,
  `Status` varchar(20) NOT NULL DEFAULT 'Incomplete',
  `Assigned_To` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Task_ID`),
  KEY `tasks_FK` (`Assigned_To`),
  CONSTRAINT `tasks_FK` FOREIGN KEY (`Assigned_To`) REFERENCES `users` (`User_Name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `User_ID` int NOT NULL AUTO_INCREMENT,
  `User_Name` varchar(50) NOT NULL,
  `User_Password` varchar(500) NOT NULL,
  `Full_Name` varchar(100) NOT NULL,
  `Phone_Number` varchar(20) NOT NULL,
  `Is_Admin` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`User_ID`),
  UNIQUE KEY `User_Name` (`User_Name`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (19,'Tranhang1','$2b$10$2EkuXuv3LCbT06SuwocUuu/6GVAm1vLN97n7AjmX0ZZlJoRkMeBee','Tranhang Socute','5464646',1),(21,'Hang1','$2b$10$A3X0QGt1Gt85fxJbXKepLOXmNHEiAKCJSYeP4h1OeIupZ1nXPdi5q','Hang Tran','56',0),(25,'Tranhang2','$2b$10$nbupU97fA4BCC.kRG2u35eyCAiALu2AYtw0SVBgZiBd0t89w0Kw9e','Tranhang Socute','5464646',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'lab_management_db'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-13 17:45:34
