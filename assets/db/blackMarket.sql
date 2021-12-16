# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.35)
# Database: blackmarket
<<<<<<< HEAD:assets/db/blackMarket.sql
# Generation Time: 2021-12-16 10:07:36 +0000
=======
# Generation Time: 2021-12-16 09:32:54 +0000
>>>>>>> b92034aa3d67878b04ccc89e7db45a54bcdfb499:assets/db/blackmarket.sql
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


<<<<<<< HEAD:assets/db/blackMarket.sql
# Dump of table orders
# ------------------------------------------------------------

DROP TABLE IF EXISTS `orders`;

CREATE TABLE `orders` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `order-number` varchar(30) NOT NULL DEFAULT '',
  `product-sku` varchar(30) NOT NULL DEFAULT '',
  `product-quantity` smallint(5) unsigned NOT NULL DEFAULT '0',
  `customer-id` int(11) NOT NULL,
=======
# Dump of table customers
# ------------------------------------------------------------

DROP TABLE IF EXISTS `customers`;

CREATE TABLE `customers` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `customer-address` varchar(255) NOT NULL DEFAULT '',
  `customer-postcode` varchar(10) NOT NULL DEFAULT '',
  `customer-email` varchar(255) NOT NULL DEFAULT '',
>>>>>>> b92034aa3d67878b04ccc89e7db45a54bcdfb499:assets/db/blackmarket.sql
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
