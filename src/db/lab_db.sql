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
  `Area_Size` int NOT NULL,
  `Area_Unit` varchar(10) DEFAULT NULL,
  `Area_Type` varchar(50) DEFAULT NULL,
  `Area_Locations` varchar(50) DEFAULT NULL,
  `Quantity` int DEFAULT NULL,
  PRIMARY KEY (`Area_ID`),
  UNIQUE KEY `Area_Name` (`Area_Name`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `area`
--

LOCK TABLES `area` WRITE;
/*!40000 ALTER TABLE `area` DISABLE KEYS */;
INSERT INTO `area` VALUES (3,'Lab 01',20,'m2','Tissue culture laboratory','Tầng 2 nhà A4',100),(4,'Lab 02',30,'m2','Tissue culture laboratory','Tầng 3 nhà A4',200),(5,'Tissue culture room 01',40,'m2','Tissue culture room','Tầng 1 nhà B2',300),(6,'Tissue culture room 02',40,'m2','Tissue culture room','Tầng 1 nhà B2',400),(8,'Lab 03',50,'m2','Tissue culture room','Home at Me',0),(9,'Lab 04',25,'m2','Tissue culture laboratory','Nhà A2',0);
/*!40000 ALTER TABLE `area` ENABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4  ;
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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4  ;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4  ;
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
  `Container_Quantity` varchar(50) NOT NULL,
  `Container_Type` varchar(50) NOT NULL,
  `Transition_Time` date NOT NULL,
  `Source_Area` varchar(100) DEFAULT NULL,
  `Number_of_Plants` int DEFAULT NULL,
  `Task_ID` int DEFAULT NULL,
  `Created_Date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `Status` varchar(100) DEFAULT NULL,
  `Current_Quantity` int DEFAULT '0',
  `Initial_Quantity` int DEFAULT '0',
  `Remaining_Days` int DEFAULT '0',
  `last_updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`Culture_Plan_ID`),
  KEY `culture_plan_FK` (`Area`),
  KEY `culture_plan_FK_1` (`Source_Area`),
  KEY `culture_plan_FK_3` (`Task_ID`),
  CONSTRAINT `culture_plan_FK` FOREIGN KEY (`Area`) REFERENCES `area` (`Area_Name`),
  CONSTRAINT `culture_plan_FK_1` FOREIGN KEY (`Source_Area`) REFERENCES `area` (`Area_Name`),
  CONSTRAINT `culture_plan_FK_3` FOREIGN KEY (`Task_ID`) REFERENCES `tasks` (`Task_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4  ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `culture_plan`
--

LOCK TABLES `culture_plan` WRITE;
/*!40000 ALTER TABLE `culture_plan` DISABLE KEYS */;
INSERT INTO `culture_plan` VALUES (6,'Nuôi cấy cây nha đam','Lab 01','Xương rồng','10','Pots','0004-05-23','Lab 01',5,NULL,NULL,NULL,0,0,0,'2023-05-08 14:05:45'),(45,'Test','Lab 01','Test','Test','Large','2018-04-23','Lab 01',2,1,'2023-05-03 17:08:02','delete',5,2,0,'2023-05-08 14:05:45'),(46,'Test','Lab 01','Test','Test','Large','2018-04-23','Lab 01',2,1,'2023-05-03 17:08:36','location change',5,2,0,'2023-05-08 14:05:45'),(47,'Test','Lab 01','Test','Test','Large','2018-04-23','Lab 01',2,1,'2023-05-03 17:08:59','location change',5,2,0,'2023-05-08 14:05:45'),(48,'Test','Lab 01','Test','Test','Large','2018-04-23','Lab 01',2,1,'2023-05-03 17:09:10','location change',5,2,0,'2023-05-08 14:05:45'),(49,'Test','Lab 01','Test','Test','Large','2018-04-23','Lab 01',2,1,'2023-05-03 17:10:44','location change',5,2,0,'2023-05-08 14:05:45'),(50,'Test','Lab 01','Test','Test','Large','2018-04-23','Lab 01',2,1,'2023-05-03 17:11:00','location change',5,2,0,'2023-05-08 14:05:45'),(51,'Test','Lab 01','Test','Test','Large','2018-04-23','Lab 01',2,1,'2023-05-03 17:23:38','delete',5,2,0,'2023-05-08 14:05:45'),(52,'Test','Lab 01','Test','Test','Large','2018-04-23','Lab 01',2,1,'2023-05-03 17:24:41','harvest',5,2,0,'2023-05-08 14:05:45'),(53,'Test','Lab 01','Test','Test','Large','2018-04-23','Lab 01',2,1,'2023-05-03 17:26:48','harvest',5,2,0,'2023-05-08 14:05:45'),(54,'Thử nghiệm','Lab 01','Test','Test','Large','2018-04-23','Lab 01',10,1,'2023-05-03 18:45:47','location change',5,2,1,'2023-05-08 14:05:45'),(55,'Test 1','Lab 01','Test 1','20','Pots','2023-12-23','Lab 01',5,NULL,'2023-05-08 03:25:33',NULL,5,5,5,'2023-05-08 14:05:45');
/*!40000 ALTER TABLE `culture_plan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `culture_plan_harvested_storage`
--

DROP TABLE IF EXISTS `culture_plan_harvested_storage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `culture_plan_harvested_storage` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Culture_Plan_ID` int DEFAULT NULL,
  `Quantity` int DEFAULT NULL,
  `Produced_Quantity` float DEFAULT NULL,
  `Source_Area_Name` varchar(255) DEFAULT NULL,
  `Created_Date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`),
  KEY `crop_read_harvested_storage_FK` (`Culture_Plan_ID`),
  CONSTRAINT `crop_read_harvested_storage_FK` FOREIGN KEY (`Culture_Plan_ID`) REFERENCES `culture_plan` (`Culture_Plan_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4  ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `culture_plan_harvested_storage`
--

LOCK TABLES `culture_plan_harvested_storage` WRITE;
/*!40000 ALTER TABLE `culture_plan_harvested_storage` DISABLE KEYS */;
INSERT INTO `culture_plan_harvested_storage` VALUES (1,NULL,2,2,'Lab 01','2023-05-03 22:24:41'),(2,53,NULL,NULL,'Lab 01','2023-05-03 22:26:48'),(3,45,NULL,NULL,'Lab 01','2023-05-03 22:40:31');
/*!40000 ALTER TABLE `culture_plan_harvested_storage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `culture_plan_moved_area`
--

DROP TABLE IF EXISTS `culture_plan_moved_area`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `culture_plan_moved_area` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Culture_Plan_ID` int DEFAULT NULL,
  `Area_Name` varchar(255) CHARACTER SET utf8mb4   DEFAULT NULL,
  `Initial_Quantity` int DEFAULT NULL,
  `Current_Quantity` int DEFAULT NULL,
  `Created_Date` datetime DEFAULT CURRENT_TIMESTAMP,
  `Transition_Time` datetime DEFAULT NULL,
  `Remaining_Days` int DEFAULT '0',
  `last_updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`),
  KEY `crop_read_moved_area_FK` (`Culture_Plan_ID`),
  CONSTRAINT `crop_read_moved_area_FK` FOREIGN KEY (`Culture_Plan_ID`) REFERENCES `culture_plan` (`Culture_Plan_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4  ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `culture_plan_moved_area`
--

LOCK TABLES `culture_plan_moved_area` WRITE;
/*!40000 ALTER TABLE `culture_plan_moved_area` DISABLE KEYS */;
INSERT INTO `culture_plan_moved_area` VALUES (10,50,'Lab 01',5,2,'2023-05-03 22:11:00','2018-04-23 00:00:00',0,'2023-05-08 14:06:05'),(11,54,'Lab 01',5,2,'2023-05-04 01:45:47','2018-04-23 00:00:00',1,'2023-05-08 14:06:05'),(12,6,'Lab 02',50,50,'2023-05-04 03:01:25','2023-05-10 00:00:00',6,'2023-05-08 14:06:05'),(13,45,'Tissue culture room 01',110,110,'2023-05-04 08:15:02','2023-05-10 00:00:00',6,'2023-05-08 14:06:05'),(14,45,'Tissue culture room 02',110,110,'2023-05-04 14:00:30','2023-05-10 00:00:00',10,'2023-05-08 14:06:05');
/*!40000 ALTER TABLE `culture_plan_moved_area` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `culture_plan_trash`
--

DROP TABLE IF EXISTS `culture_plan_trash`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `culture_plan_trash` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Culture_Plan_ID` int DEFAULT NULL,
  `Quantity` int DEFAULT NULL,
  `Source_Area_Name` varchar(255) DEFAULT NULL,
  `Created_Date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`),
  KEY `crop_read_trash_FK` (`Culture_Plan_ID`),
  CONSTRAINT `crop_read_trash_FK` FOREIGN KEY (`Culture_Plan_ID`) REFERENCES `culture_plan` (`Culture_Plan_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4  ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `culture_plan_trash`
--

LOCK TABLES `culture_plan_trash` WRITE;
/*!40000 ALTER TABLE `culture_plan_trash` DISABLE KEYS */;
INSERT INTO `culture_plan_trash` VALUES (1,51,NULL,'Lab 01','2023-05-03 22:23:38'),(2,45,NULL,'Lab 01','2023-05-03 22:41:16'),(3,45,NULL,'Lab 01','2023-05-03 22:41:25'),(4,45,NULL,'Lab 01','2023-05-03 22:42:01');
/*!40000 ALTER TABLE `culture_plan_trash` ENABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4  ;
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
  `Expiration_Date` date DEFAULT NULL,
  PRIMARY KEY (`Material_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4  ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `material`
--

LOCK TABLES `material` WRITE;
/*!40000 ALTER TABLE `material` DISABLE KEYS */;
INSERT INTO `material` VALUES (22,'Buffering Agent','HEPES',30.00,'Sigma-Aldrich',100,'Store at room temperature','g','2024-11-20'),(23,'Buffering Agent','Tris',25.00,'Sigma-Aldrich',100,'Store at room temperature','g','2025-01-10'),(24,'Supplement','Fetal Bovine Serum (FBS)',150.00,'Thermo Fisher',500,'Store at -20°C','mL','2023-05-23'),(25,'Agrochemical','Bovine Serum Albumin (BSA)',60.00,'Sigma-Aldrich',100,'Store at 4°C','g','2023-06-08'),(26,'Growth Factor','Epidermal Growth Factor (EGF)',200.00,'Thermo Fisher',10,'Store at -20°C','µg','2024-08-18'),(27,'Growth Factor','Fibroblast Growth Factor (FGF)',250.00,'Sigma-Aldrich',10,'Store at -20°C','µg','2024-10-05'),(28,'Antibiotic','Penicillin-Streptomycin',40.00,'Thermo Fisher',100,'Store at -20°C','mL','2024-08-08'),(29,'Antifungal','Amphotericin B',80.00,'Sigma-Aldrich',20,'Store at 4°C','mL','2024-02-14'),(30,'Solidifying Agent','Gelatin',20.00,'Sigma-Aldrich',500,'Store at room temperature','g','2024-07-19'),(31,'Solidifying Agent','Agar',60.00,'Thermo Fisher',500,'Store at room temperature','g','2025-03-10'),(32,'Vessel','T75 Flask',5.00,'Corning',1,'Sterile, single-use','item','2024-02-14'),(33,'Vessel','6-well Plate',3.00,'Corning',1,'Sterile, single-use','item','2024-09-02'),(34,'Vessel','15 mL Centrifuge Tube',0.50,'Eppendorf',1,'Sterile, single-use','item','2024-05-14'),(35,'Vessel','1.5 mL Eppendorf Tube',0.10,'Eppendorf',1,'Sterile, single-use','item','2024-02-18'),(36,'Agrochemical','DCMe',10.00,'Hanava',30,'Nothing','Kg','2023-05-26');
/*!40000 ALTER TABLE `material` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `Notification_ID` int NOT NULL AUTO_INCREMENT,
  `Task_ID` int NOT NULL,
  `Assigned_To` varchar(50) NOT NULL,
  `Message` varchar(255) NOT NULL,
  `Is_Read` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`Notification_ID`),
  KEY `notifications_FK` (`Assigned_To`),
  KEY `notifications_FK_Task` (`Task_ID`),
  CONSTRAINT `notifications_FK` FOREIGN KEY (`Assigned_To`) REFERENCES `users` (`User_Name`),
  CONSTRAINT `notifications_FK_Task` FOREIGN KEY (`Task_ID`) REFERENCES `tasks` (`Task_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4  ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4  ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plant`
--

LOCK TABLES `plant` WRITE;
/*!40000 ALTER TABLE `plant` DISABLE KEYS */;
INSERT INTO `plant` VALUES (1,'Cây nha đam','Aloe vera','Cây nha đam là một loài cây lâu năm với nhiều công dụng trong y học và làm đẹp, được trồng phổ biến ở các vùng khí hậu ấm.',NULL),(2,'Cây măng tây','Asparagus officinalis','Cây măng tây là một loại rau xanh phổ biến được trồng và sử dụng trong nhiều món ăn trên toàn thế giới.',NULL),(3,'Rose','Rosa','Roses are a type of flowering shrub.',NULL),(4,'Tulip','Tulipa','Tulips are perennial, bulbous plants with showy flowers.',NULL),(5,'Sunflower','Helianthus','Sunflowers are usually tall annual or perennial plants.',NULL),(6,'Orchid','Orchidaceae','Orchids are a diverse and widespread family of flowering plants.',NULL),(7,'Daisy','Bellis perennis','Daisies are small perennial plants with a symmetrical flower.',NULL),(8,'Lily','Lilium','Lilies are herbaceous flowering plants growing from bulbs.',NULL),(9,'Daffodil','Narcissus','Daffodils are predominantly spring perennial plants with yellow flowers.',NULL),(10,'Violet','Viola','Violets are flowering plants with heart-shaped leaves.',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4  ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
INSERT INTO `tasks` VALUES (1,'Test','Test','Test','High','2030-04-23','Active','MinMin123'),(2,'sanitation','Schedule regular cleaning tasks.','Ensure that all areas are cleaned on a regular basis, including floors, countertops, and equipment. Use appropriate cleaning solutions and follow proper procedures to maintain a sanitary environment. Dispose of waste materials properly and restock necessary supplies when needed.','normal','2021-07-22','Incomplete','tranhang12'),(3,'sanitation','Perform equipment maintenance.','Regularly inspect and maintain equipment to ensure it is in good working condition. Replace worn or damaged parts as needed and perform routine maintenance tasks according to the manufacturer\'s recommendations.','normal','2021-07-22','Incomplete','tranhang123'),(4,'reservoir','Monitor water quality in the reservoir.','Regularly test the water quality in the reservoir to ensure it meets required standards. Perform necessary treatments to maintain water quality and monitor for any potential issues or contaminants.','normal','2021-07-20','Incomplete','tranhang1234'),(5,'safety','Conduct safety inspections.','Perform regular safety inspections of the facilities and equipment to identify and address any potential hazards. Ensure that all safety protocols are being followed and that employees are properly trained in emergency procedures.','urgent','2021-07-20','Incomplete',NULL),(6,'general','Hold team meetings.','Schedule regular team meetings to discuss ongoing projects, address any concerns, and plan for future tasks. Encourage open communication and collaboration among team members to ensure the smooth operation of the organization.','normal','2021-03-30','Incomplete',NULL);
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4  ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_culture_plan`
--

LOCK TABLES `user_culture_plan` WRITE;
/*!40000 ALTER TABLE `user_culture_plan` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8mb4  ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (19,'tranhang12','$2b$10$2EkuXuv3LCbT06SuwocUuu/6GVAm1vLN97n7AjmX0ZZlJoRkMeBee','Tran Thi Hang','09837812498',1,'tranhang12@gmail.com'),(21,'tranhang123','$2b$10$A3X0QGt1Gt85fxJbXKepLOXmNHEiAKCJSYeP4h1OeIupZ1nXPdi5q','Hang Tran','0892374892',0,'tranhang13@gmail.com'),(25,'caominh25','$2b$10$nbupU97fA4BCC.kRG2u35eyCAiALu2AYtw0SVBgZiBd0t89w0Kw9e','Minh Cao','09238497312',1,'tranhang14@gmail.com'),(26,'MinMin123','$2b$10$A4dUIqMiVyLZFa3FVgiULeHSDwWxokFSSFkxkTuq8/l2UCUKjUBUq','Cao Minh','0834897355',1,'tranhang15@gmail.com'),(33,'Minmin12','$2b$10$neMgpz4eFAaIiU0jHA.7weFIRGRC/tF6bUn0tJpI8rSz.Gd8Rt5BG','Dương Ngọc Minh','098236578124',0,'tranhang17@gmail.com'),(35,'ThaoVy_2023','$2b$10$PFXjLUI4KE5BBw7ViDgphegV24iWmhyRLdF.MifRt/Mf0je/6sx2W','Thảo Vy','098236578124',0,'tranhang18@gmail.com'),(36,'tranhang1234','$2b$10$M1T6iug/vt95vfi.pvXkeeQ2YKzgY12EOioRmacY352g0lcQ5dNdK','Trần Thị Hằng','039297597654',0,'tranhang19@gmail.com'),(71,'admin123','$2b$10$cHZjGzTz2/w2EMJ7v9q4i../StWNXO6lLbMSEneLbA9YflQGqFmha','Trần Thị Hằng','03929759765',1,'tranhangsocute12@gmail.com');
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

-- Dump completed on 2023-05-09 21:34:54