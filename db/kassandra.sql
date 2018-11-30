-- MySQL dump 10.13  Distrib 8.0.13, for Win64 (x86_64)
--
-- Host: localhost    Database: kassandra
-- ------------------------------------------------------
-- Server version	8.0.13

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8mb4 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `autonomous`
--

DROP TABLE IF EXISTS `autonomous`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `autonomous` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `auto_line` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `autonomous`
--

LOCK TABLES `autonomous` WRITE;
/*!40000 ALTER TABLE `autonomous` DISABLE KEYS */;
/*!40000 ALTER TABLE `autonomous` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `end_game`
--

DROP TABLE IF EXISTS `end_game`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `end_game` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `end_game`
--

LOCK TABLES `end_game` WRITE;
/*!40000 ALTER TABLE `end_game` DISABLE KEYS */;
/*!40000 ALTER TABLE `end_game` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `events` (
  `event_name` varchar(10) NOT NULL,
  PRIMARY KEY (`event_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events_teams`
--

DROP TABLE IF EXISTS `events_teams`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `events_teams` (
  `team` int(11) NOT NULL,
  `event` varchar(10) NOT NULL,
  KEY `team_idx` (`team`),
  KEY `event_idx` (`event`),
  CONSTRAINT `event_participation` FOREIGN KEY (`event`) REFERENCES `events` (`event_name`),
  CONSTRAINT `team` FOREIGN KEY (`team`) REFERENCES `teams` (`team_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events_teams`
--

LOCK TABLES `events_teams` WRITE;
/*!40000 ALTER TABLE `events_teams` DISABLE KEYS */;
/*!40000 ALTER TABLE `events_teams` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `game_data`
--

DROP TABLE IF EXISTS `game_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `game_data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `team` int(11) NOT NULL,
  `match` int(11) NOT NULL,
  `autonomous` int(11) NOT NULL,
  `teleop` int(11) NOT NULL,
  `end_game` int(11) NOT NULL,
  `comments` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `game_data_teams_fk` (`team`),
  KEY `game_data_matches_fk` (`match`),
  KEY `game_data_autonomous_fk` (`autonomous`),
  KEY `game_data_teleop_fk` (`teleop`),
  KEY `game_data_end_game_fk` (`end_game`),
  CONSTRAINT `game_data_autonomous_fk` FOREIGN KEY (`autonomous`) REFERENCES `autonomous` (`id`),
  CONSTRAINT `game_data_end_game_fk` FOREIGN KEY (`end_game`) REFERENCES `end_game` (`id`),
  CONSTRAINT `game_data_matches_fk` FOREIGN KEY (`match`) REFERENCES `matches` (`id`),
  CONSTRAINT `game_data_teams_fk` FOREIGN KEY (`team`) REFERENCES `teams` (`team_number`),
  CONSTRAINT `game_data_teleop_fk` FOREIGN KEY (`teleop`) REFERENCES `teleop` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game_data`
--

LOCK TABLES `game_data` WRITE;
/*!40000 ALTER TABLE `game_data` DISABLE KEYS */;
/*!40000 ALTER TABLE `game_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `matches`
--

DROP TABLE IF EXISTS `matches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `matches` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `match_type` enum('QM','QF','SF','F') NOT NULL,
  `match_id` int(11) NOT NULL,
  `match_number` int(11) NOT NULL,
  `event` varchar(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `event_idx` (`event`),
  CONSTRAINT `event` FOREIGN KEY (`event`) REFERENCES `events` (`event_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `matches`
--

LOCK TABLES `matches` WRITE;
/*!40000 ALTER TABLE `matches` DISABLE KEYS */;
/*!40000 ALTER TABLE `matches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teams`
--

DROP TABLE IF EXISTS `teams`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `teams` (
  `team_number` int(11) NOT NULL,
  PRIMARY KEY (`team_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teams`
--

LOCK TABLES `teams` WRITE;
/*!40000 ALTER TABLE `teams` DISABLE KEYS */;
/*!40000 ALTER TABLE `teams` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teleop`
--

DROP TABLE IF EXISTS `teleop`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `teleop` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teleop`
--

LOCK TABLES `teleop` WRITE;
/*!40000 ALTER TABLE `teleop` DISABLE KEYS */;
/*!40000 ALTER TABLE `teleop` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'kassandra'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-11-30 10:58:28
