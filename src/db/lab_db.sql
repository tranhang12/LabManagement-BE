-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: lab_management_db
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
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
  `Quantity` int DEFAULT NULL,
  PRIMARY KEY (`Area_ID`),
  UNIQUE KEY `Area_Name` (`Area_Name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `area`
--

LOCK TABLES `area` WRITE;
/*!40000 ALTER TABLE `area` DISABLE KEYS */;
INSERT INTO `area` VALUES (3,'Lab 01','20','m2','Phòng cấy mô','Tầng 2 nhà A4',NULL),(4,'Lab 02','30','m2','Phòng cấy mô','Tầng 3 nhà A4',NULL),(5,'Tissue culture room 01','40','m2','Phòng nuôi mô','Tầng 1 nhà B2',NULL),(6,'Tissue culture room 02','40','m2','Phòng nuôi mô','Tầng 1 nhà B2',NULL);
/*!40000 ALTER TABLE `area` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `crop_read_harvested_storage`
--

DROP TABLE IF EXISTS `crop_read_harvested_storage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `crop_read_harvested_storage` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Crop_UID` int DEFAULT NULL,
  `Quantity` int DEFAULT NULL,
  `Produced_Quantity` float DEFAULT NULL,
  `Source_Area_UID` int DEFAULT NULL,
  `Source_Area_Name` varchar(255) DEFAULT NULL,
  `Created_Date` datetime DEFAULT CURRENT_TIMESTAMP,
  `Last_Updated` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`),
  KEY `crop_read_harvested_storage_FK` (`Crop_UID`),
  CONSTRAINT `crop_read_harvested_storage_FK` FOREIGN KEY (`Crop_UID`) REFERENCES `culture_plan` (`Culture_Plan_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `crop_read_harvested_storage`
--

LOCK TABLES `crop_read_harvested_storage` WRITE;
/*!40000 ALTER TABLE `crop_read_harvested_storage` DISABLE KEYS */;
INSERT INTO `crop_read_harvested_storage` VALUES (3,6,5,2,3,'Lab 01','2023-04-29 19:18:43','2023-04-29 19:18:43');
/*!40000 ALTER TABLE `crop_read_harvested_storage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `crop_read_moved_area`
--

DROP TABLE IF EXISTS `crop_read_moved_area`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `crop_read_moved_area` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Crop_UID` int DEFAULT NULL,
  `Area_UID` int DEFAULT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `Initial_Quantity` int DEFAULT NULL,
  `Current_Quantity` int DEFAULT NULL,
  `Created_Date` datetime DEFAULT CURRENT_TIMESTAMP,
  `Last_Updated` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`),
  KEY `crop_read_moved_area_FK` (`Crop_UID`),
  CONSTRAINT `crop_read_moved_area_FK` FOREIGN KEY (`Crop_UID`) REFERENCES `culture_plan` (`Culture_Plan_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `crop_read_moved_area`
--

LOCK TABLES `crop_read_moved_area` WRITE;
/*!40000 ALTER TABLE `crop_read_moved_area` DISABLE KEYS */;
INSERT INTO `crop_read_moved_area` VALUES (1,6,3,'Lab 01',5,2,'2023-04-29 19:17:24','2023-04-29 19:17:24'),(2,6,3,'Lab 01',5,2,'2023-04-29 21:51:07','2023-04-29 21:51:07'),(3,6,3,'Lab 01',5,2,'2023-04-29 21:51:15','2023-04-29 21:51:15');
/*!40000 ALTER TABLE `crop_read_moved_area` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `crop_read_trash`
--

DROP TABLE IF EXISTS `crop_read_trash`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `crop_read_trash` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Crop_UID` int DEFAULT NULL,
  `Quantity` int DEFAULT NULL,
  `Source_Area_UID` int DEFAULT NULL,
  `Source_Area_Name` varchar(255) DEFAULT NULL,
  `Created_Date` datetime DEFAULT CURRENT_TIMESTAMP,
  `Last_Updated` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`),
  KEY `crop_read_trash_FK` (`Crop_UID`),
  CONSTRAINT `crop_read_trash_FK` FOREIGN KEY (`Crop_UID`) REFERENCES `culture_plan` (`Culture_Plan_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `crop_read_trash`
--

LOCK TABLES `crop_read_trash` WRITE;
/*!40000 ALTER TABLE `crop_read_trash` DISABLE KEYS */;
INSERT INTO `crop_read_trash` VALUES (1,6,5,3,'Lab 01','2023-04-29 21:51:45','2023-04-29 17:00:43');
/*!40000 ALTER TABLE `crop_read_trash` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `culture`
--

DROP TABLE IF EXISTS `culture`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `culture` (
  `Culture_ID` int NOT NULL AUTO_INCREMENT,
  `Plant_ID` int DEFAULT NULL,
  `Duration_Of_Culture` int DEFAULT NULL,
  `Duration_Of_Bud_Regeneration` int DEFAULT NULL,
  `Duration_Of_Multiply_Bud` int DEFAULT NULL,
  `Duration_Of_Rooting` int DEFAULT NULL,
  `Temperature_Min` float DEFAULT NULL,
  `Temperature_Max` float DEFAULT NULL,
  `Light_Intensity` varchar(100) DEFAULT NULL,
  `Lighting_Time` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Culture_ID`),
  KEY `Plant_ID` (`Plant_ID`),
  CONSTRAINT `Culture_ibfk_1` FOREIGN KEY (`Plant_ID`) REFERENCES `plant` (`Plant_ID`)
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
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `culture_medium` (
  `Culture_Medium_ID` int NOT NULL AUTO_INCREMENT,
  `Culture_Medium_Name` varchar(100) NOT NULL,
  `Culture_Medium_Description` text,
  PRIMARY KEY (`Culture_Medium_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `culture_medium`
--

LOCK TABLES `culture_medium` WRITE;
/*!40000 ALTER TABLE `culture_medium` DISABLE KEYS */;
INSERT INTO `culture_medium` VALUES (9,'Murashige and Skoog (MS)','Môi trường phổ biến nhất, phù hợp cho nhiều loài thực vật. Gọi là \"môi trường tiêu chuẩn\"'),(10,'Gamborg B5 (B5)','Được phát triển để cải tiến cho các loài thực vật phân nhánh cao hơn, ít yêu cầu hơn so với MS'),(11,'White\'s medium','Môi trường thích hợp cho các loài cây cối mập mạp, chịu nhiều bệnh'),(12,'Schenk and Hildebrandt (SH)','Được sử dụng cho cây bầu bi hoặc bí, thường kết hợp với sinh tố B1'),(13,'Knop\'s medium','Môi trường đơn giản nhất, phù hợp cho các loài cây cỏ, cỏ monocot'),(14,'Lloyd and McCown (LM)','Được phát triển cho loài cây Rhododendron, giảm nồng độ muối nitrat so với môi trường MS');
/*!40000 ALTER TABLE `culture_medium` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `culture_medium_relation`
--

DROP TABLE IF EXISTS `culture_medium_relation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `culture_medium_relation` (
  `culture_id` int NOT NULL,
  `culture_medium_id` int NOT NULL,
  PRIMARY KEY (`culture_id`,`culture_medium_id`),
  KEY `culture_medium_id` (`culture_medium_id`),
  CONSTRAINT `culture_medium_relation_ibfk_1` FOREIGN KEY (`culture_id`) REFERENCES `culture` (`Culture_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `culture_medium_relation_ibfk_2` FOREIGN KEY (`culture_medium_id`) REFERENCES `culture_medium` (`Culture_Medium_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `culture_medium_relation`
--

LOCK TABLES `culture_medium_relation` WRITE;
/*!40000 ALTER TABLE `culture_medium_relation` DISABLE KEYS */;
/*!40000 ALTER TABLE `culture_medium_relation` ENABLE KEYS */;
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
  `Task_ID` int DEFAULT NULL,
  `Created_Date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Culture_Plan_ID`),
  KEY `culture_plan_FK` (`Area`),
  KEY `culture_plan_FK_1` (`Source_Area`),
  KEY `culture_plan_FK_2` (`Destination_Area`),
  KEY `culture_plan_FK_3` (`Task_ID`),
  CONSTRAINT `culture_plan_FK` FOREIGN KEY (`Area`) REFERENCES `area` (`Area_Name`),
  CONSTRAINT `culture_plan_FK_1` FOREIGN KEY (`Source_Area`) REFERENCES `area` (`Area_Name`),
  CONSTRAINT `culture_plan_FK_2` FOREIGN KEY (`Destination_Area`) REFERENCES `area` (`Area_Name`),
  CONSTRAINT `culture_plan_FK_3` FOREIGN KEY (`Task_ID`) REFERENCES `tasks` (`Task_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `culture_plan`
--

LOCK TABLES `culture_plan` WRITE;
/*!40000 ALTER TABLE `culture_plan` DISABLE KEYS */;
INSERT INTO `culture_plan` VALUES (6,'Nuôi cấy cây nha đam','Lab 01','Xương rồng','In vitro','10','Pots','0004-05-23','Lab 01','Tissue culture room 01',5,NULL,NULL);
/*!40000 ALTER TABLE `culture_plan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `growth_record`
--

DROP TABLE IF EXISTS `growth_record`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `growth_record` (
  `Growth_Record_ID` int NOT NULL AUTO_INCREMENT,
  `Culture_Plan_ID` int DEFAULT NULL,
  `Observation_Date` date DEFAULT NULL,
  `Height` decimal(10,2) DEFAULT NULL,
  `Width` decimal(10,2) DEFAULT NULL,
  `Number_of_Leaves` int DEFAULT NULL,
  `Health_Status` varchar(50) DEFAULT NULL,
  `Image` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Growth_Record_ID`),
  KEY `Culture_ID` (`Culture_Plan_ID`),
  CONSTRAINT `Growth_Record_FK` FOREIGN KEY (`Culture_Plan_ID`) REFERENCES `culture_plan` (`Culture_Plan_ID`)
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
-- Table structure for table `material`
--

DROP TABLE IF EXISTS `material`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `material` (
  `Material_ID` int NOT NULL AUTO_INCREMENT,
  `Category` varchar(255) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Price` decimal(10,2) NOT NULL,
  `Produced_By` varchar(255) NOT NULL,
  `Quantity` int NOT NULL,
  `Additional_Notes` text,
  `Unit` varchar(100) DEFAULT NULL,
  `expiration_date` date DEFAULT NULL,
  PRIMARY KEY (`Material_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `material`
--

LOCK TABLES `material` WRITE;
/*!40000 ALTER TABLE `material` DISABLE KEYS */;
INSERT INTO `material` VALUES (20,'Culture Media','DMEM',50.00,'Sigma-Aldrich',500,'Store at 4°C','mL','2024-06-30'),(21,'Culture Media','RPMI 1640',45.00,'Thermo Fisher',500,'Store at 4°C','mL','2024-09-15'),(22,'Buffering Agent','HEPES',30.00,'Sigma-Aldrich',100,'Store at room temperature','g','2024-11-20'),(23,'Buffering Agent','Tris',25.00,'Sigma-Aldrich',100,'Store at room temperature','g','2025-01-10'),(24,'Supplement','Fetal Bovine Serum (FBS)',150.00,'Thermo Fisher',500,'Store at -20°C','mL','2024-03-12'),(25,'Supplement','Bovine Serum Albumin (BSA)',60.00,'Sigma-Aldrich',100,'Store at 4°C','g','2024-12-25'),(26,'Growth Factor','Epidermal Growth Factor (EGF)',200.00,'Thermo Fisher',10,'Store at -20°C','µg','2024-08-18'),(27,'Growth Factor','Fibroblast Growth Factor (FGF)',250.00,'Sigma-Aldrich',10,'Store at -20°C','µg','2024-10-05'),(28,'Antibiotic','Penicillin-Streptomycin',40.00,'Thermo Fisher',100,'Store at -20°C','mL','2024-08-08'),(29,'Antifungal','Amphotericin B',80.00,'Sigma-Aldrich',20,'Store at 4°C','mL','2024-02-14'),(30,'Solidifying Agent','Gelatin',20.00,'Sigma-Aldrich',500,'Store at room temperature','g','2024-07-19'),(31,'Solidifying Agent','Agar',60.00,'Thermo Fisher',500,'Store at room temperature','g','2025-03-10'),(32,'Vessel','T75 Flask',5.00,'Corning',1,'Sterile, single-use','item','2024-02-14'),(33,'Vessel','6-well Plate',3.00,'Corning',1,'Sterile, single-use','item','2024-09-02'),(34,'Vessel','15 mL Centrifuge Tube',0.50,'Eppendorf',1,'Sterile, single-use','item','2024-05-14'),(35,'Vessel','1.5 mL Eppendorf Tube',0.10,'Eppendorf',1,'Sterile, single-use','item','2024-02-18');
/*!40000 ALTER TABLE `material` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plant`
--

DROP TABLE IF EXISTS `plant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
/*!50503 SET character_set_client = utf8mb4 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
INSERT INTO `tasks` VALUES (1,'Test','Test','Test','High','2030-04-23','Active','MinMin123');
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_culture_plan`
--

DROP TABLE IF EXISTS `user_culture_plan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_culture_plan` (
  `User_Culture_Plan_ID` int NOT NULL AUTO_INCREMENT,
  `User_ID` int NOT NULL,
  `Culture_Plan_ID` int NOT NULL,
  PRIMARY KEY (`User_Culture_Plan_ID`),
  KEY `user_culture_plan_FK` (`User_ID`),
  KEY `user_culture_plan_FK_1` (`Culture_Plan_ID`),
  CONSTRAINT `user_culture_plan_FK` FOREIGN KEY (`User_ID`) REFERENCES `users` (`User_ID`),
  CONSTRAINT `user_culture_plan_FK_1` FOREIGN KEY (`Culture_Plan_ID`) REFERENCES `culture_plan` (`Culture_Plan_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_culture_plan`
--

LOCK TABLES `user_culture_plan` WRITE;
/*!40000 ALTER TABLE `user_culture_plan` DISABLE KEYS */;
INSERT INTO `user_culture_plan` VALUES (3,19,6),(5,19,6);
/*!40000 ALTER TABLE `user_culture_plan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `User_ID` int NOT NULL AUTO_INCREMENT,
  `User_Name` varchar(50) NOT NULL,
  `User_Password` varchar(500) NOT NULL,
  `Full_Name` varchar(100) NOT NULL,
  `Phone_Number` varchar(20) NOT NULL,
  `Is_Admin` tinyint(1) NOT NULL DEFAULT '0',
  `email` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`User_ID`),
  UNIQUE KEY `User_Name` (`User_Name`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (19,'tranhang12','$2b$10$2EkuXuv3LCbT06SuwocUuu/6GVAm1vLN97n7AjmX0ZZlJoRkMeBee','Tran Thi Hang','09837812498',1,'tranhang12@gmail.com'),(21,'tranhang123','$2b$10$A3X0QGt1Gt85fxJbXKepLOXmNHEiAKCJSYeP4h1OeIupZ1nXPdi5q','Hang Tran','0892374892',0,'tranhang13@gmail.com'),(25,'caominh25','$2b$10$nbupU97fA4BCC.kRG2u35eyCAiALu2AYtw0SVBgZiBd0t89w0Kw9e','Minh Cao','09238497312',1,'tranhang14@gmail.com'),(26,'MinMin123','$2b$10$A4dUIqMiVyLZFa3FVgiULeHSDwWxokFSSFkxkTuq8/l2UCUKjUBUq','Cao Minh','0834897355',1,'tranhang15@gmail.com'),(33,'Minmin12','$2b$10$neMgpz4eFAaIiU0jHA.7weFIRGRC/tF6bUn0tJpI8rSz.Gd8Rt5BG','Dương Ngọc Minh','098236578124',0,'tranhang17@gmail.com'),(35,'ThaoVy_2023','$2b$10$PFXjLUI4KE5BBw7ViDgphegV24iWmhyRLdF.MifRt/Mf0je/6sx2W','Thảo Vy','098236578124',0,'tranhang18@gmail.com'),(36,'tranhang1234','$2b$10$M1T6iug/vt95vfi.pvXkeeQ2YKzgY12EOioRmacY352g0lcQ5dNdK','Trần Thị Hằng','039297597654',0,'tranhang19@gmail.com');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'lab_management_db'
--
