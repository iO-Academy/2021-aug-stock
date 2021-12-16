# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.35)
# Database: blackmarket
# Generation Time: 2021-12-16 10:14:09 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table customers
# ------------------------------------------------------------

DROP TABLE IF EXISTS `customers`;

CREATE TABLE `customers` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `customer-address` varchar(255) NOT NULL DEFAULT '',
  `customer-postcode` varchar(10) NOT NULL DEFAULT '',
  `customer-email` varchar(255) NOT NULL DEFAULT '',
  `customer-id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table orders
# ------------------------------------------------------------

DROP TABLE IF EXISTS `orders`;

CREATE TABLE `orders` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `order-number` varchar(30) NOT NULL DEFAULT '',
  `product-sku` varchar(30) NOT NULL DEFAULT '',
  `product-quantity` smallint(5) unsigned NOT NULL DEFAULT '0',
  `customer-id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table products
# ------------------------------------------------------------

DROP TABLE IF EXISTS `products`;

CREATE TABLE `products` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `product-name` varchar(50) NOT NULL DEFAULT '',
  `price` decimal(13,2) unsigned NOT NULL DEFAULT '0.00',
  `stock-quantity` smallint(5) unsigned NOT NULL DEFAULT '0',
  `sku` varchar(30) NOT NULL DEFAULT '',
  `deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `sku` (`sku`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;

INSERT INTO `products` (`id`, `product-name`, `price`, `stock-quantity`, `sku`, `deleted`)
VALUES
	(9,'Nuclear Warhead',1000000000.00,50,'NUC-BATS91RD6KX7REHS5',0),
	(10,'Druggy Bag Surprise',1000.00,500,'DRU-BATS91RD6KX7RFFJF',0),
	(11,'Liver - Human',550000.00,15,'LIV-BATS91RD6KX7RFNI3',0),
	(12,'Siberian Tiger',5000000.00,50,'SIB-BATS91RD6KX7RFUV1',0),
	(13,'Thermite - Bucket',20000000.00,3,'THE-BATS91RD6KX7RG2J3',0),
	(14,'Coronavirus - Yoghurt Pot',10.00,10000,'COR-BATS91RD6KX7RG8ZC',0);

/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
