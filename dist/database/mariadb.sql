-- --------------------------------------------------------
-- 主机:                           127.0.0.1
-- 服务器版本:                        10.3.10-MariaDB - mariadb.org binary distribution
-- 服务器操作系统:                      Win32
-- HeidiSQL 版本:                  9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- 导出 person_position 的数据库结构
CREATE DATABASE IF NOT EXISTS `person_position` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_bin */;
USE `person_position`;

-- 导出  表 person_position.device 结构
CREATE TABLE IF NOT EXISTS `device` (
  `id` varchar(50) COLLATE utf8_bin NOT NULL,
  `name` varchar(50) COLLATE utf8_bin NOT NULL,
  `section` varchar(50) COLLATE utf8_bin NOT NULL,
  `setup` varchar(25) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- 正在导出表  person_position.device 的数据：~0 rows (大约)
/*!40000 ALTER TABLE `device` DISABLE KEYS */;
/*!40000 ALTER TABLE `device` ENABLE KEYS */;

-- 导出  表 person_position.position 结构
CREATE TABLE IF NOT EXISTS `position` (
  `id` varchar(50) COLLATE utf8_bin NOT NULL,
  `time` varchar(25) COLLATE utf8_bin NOT NULL,
  `lat` varchar(12) COLLATE utf8_bin NOT NULL,
  `lng` varchar(12) COLLATE utf8_bin NOT NULL,
  `qf` varchar(2) COLLATE utf8_bin DEFAULT NULL,
  `alt` varchar(8) COLLATE utf8_bin DEFAULT NULL,
  `speed` varchar(8) COLLATE utf8_bin DEFAULT NULL,
  `track_true` varchar(8) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`,`time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- 正在导出表  person_position.position 的数据：~5 rows (大约)
/*!40000 ALTER TABLE `position` DISABLE KEYS */;
/*!40000 ALTER TABLE `position` ENABLE KEYS */;

-- 导出  表 person_position.users 结构
CREATE TABLE IF NOT EXISTS `users` (
  `id` varchar(50) COLLATE utf8_bin NOT NULL,
  `name` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `password` varchar(50) COLLATE utf8_bin NOT NULL,
  `setup` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `password` (`id`,`password`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- 正在导出表  person_position.users 的数据：~1 rows (大约)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `name`, `password`, `setup`) VALUES
	('admin', '管理员', 'admin', '2019-04-02 19:19:19');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
