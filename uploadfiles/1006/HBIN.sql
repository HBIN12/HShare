/*
SQLyog Ultimate v12.09 (64 bit)
MySQL - 5.5.68-MariaDB : Database - HBIN
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`HBIN` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `HBIN`;

/*Table structure for table `files` */

DROP TABLE IF EXISTS `files`;

CREATE TABLE `files` (
  `fid` int(11) NOT NULL AUTO_INCREMENT COMMENT '文件id',
  `fname` varchar(200) DEFAULT NULL COMMENT '文件名',
  `fpath` varchar(200) DEFAULT NULL COMMENT '文件地址',
  `uid` int(11) DEFAULT NULL COMMENT '文件所属用户id',
  `ispub` int(11) DEFAULT NULL COMMENT '是否共享',
  `uploadtime` datetime DEFAULT NULL COMMENT '上传时间',
  `size` varchar(200) DEFAULT NULL COMMENT '文件大小',
  `reportuids` varchar(200) DEFAULT NULL COMMENT '举报的文件id',
  PRIMARY KEY (`fid`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4;

/*Data for the table `files` */

insert  into `files`(`fid`,`fname`,`fpath`,`uid`,`ispub`,`uploadtime`,`size`,`reportuids`) values (61,'diqiuyi.png','C:\\Users\\11359\\NodejsProjects\\app\\uploadfiles\\1001/diqiuyi.png',1001,0,'2022-05-15 15:21:03','49098',NULL);

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `taken` varchar(200) DEFAULT NULL,
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1007 DEFAULT CHARSET=utf8mb4;

/*Data for the table `user` */

insert  into `user`(`id`,`name`,`password`,`taken`) values (1006,'root','root',NULL);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
