-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: montera
-- ------------------------------------------------------
-- Server version	8.4.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `akuisisis`
--

DROP TABLE IF EXISTS `akuisisis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `akuisisis` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `no_transaksi` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `produk_id` bigint unsigned NOT NULL,
  `nama_nasabah` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `no_identitas_nasabah` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nominal_realisasi` decimal(15,2) NOT NULL,
  `tanggal_akuisisi` date NOT NULL,
  `status_verifikasi` enum('pending','verified','rejected') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `verifikator_id` bigint unsigned DEFAULT NULL,
  `verified_at` datetime DEFAULT NULL,
  `catatan_revisi` text COLLATE utf8mb4_unicode_ci,
  `lampiran_bukti` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `akuisisis_no_transaksi_unique` (`no_transaksi`),
  KEY `akuisisis_user_id_foreign` (`user_id`),
  KEY `akuisisis_produk_id_foreign` (`produk_id`),
  KEY `akuisisis_verifikator_id_foreign` (`verifikator_id`),
  CONSTRAINT `akuisisis_produk_id_foreign` FOREIGN KEY (`produk_id`) REFERENCES `produks` (`id`),
  CONSTRAINT `akuisisis_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `akuisisis_verifikator_id_foreign` FOREIGN KEY (`verifikator_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `akuisisis`
--

LOCK TABLES `akuisisis` WRITE;
/*!40000 ALTER TABLE `akuisisis` DISABLE KEYS */;
INSERT INTO `akuisisis` VALUES (1,'TRX-20260107-0001',26,12,'Budi Santoso','9158276526439184',50485093.00,'2025-12-29','verified',4,'2026-01-04 17:36:11',NULL,'bukti_akuisisi_1.pdf','2025-12-20 10:36:11','2026-01-07 10:36:11'),(2,'TRX-20260107-0002',17,5,'Siti Aminah','6374864557004404',5298983.00,'2025-12-23','verified',2,'2026-01-02 17:36:11',NULL,'bukti_akuisisi_2.pdf','2025-12-21 10:36:11','2026-01-07 10:36:11'),(3,'TRX-20260107-0003',13,11,'Andi Wijaya','3193247281264202',67250393.00,'2026-01-01','rejected',2,'2026-01-03 17:36:11','Dokumen KTP buram atau tanda tangan tidak cocok.','bukti_akuisisi_3.pdf','2026-01-03 10:36:11','2026-01-07 10:36:11'),(4,'TRX-20260107-0004',10,10,'Rina Pratama','3386265083599379',141017287.00,'2025-11-22','verified',2,'2026-01-04 17:36:11',NULL,'bukti_akuisisi_4.pdf','2026-01-04 10:36:11','2026-01-07 10:36:11'),(5,'TRX-20260107-0005',9,7,'Eko Susanto','2932797373719784',74173919.00,'2025-11-26','pending',NULL,NULL,NULL,'bukti_akuisisi_5.pdf','2025-11-10 10:36:11','2026-01-07 10:36:11'),(6,'TRX-20260107-0006',24,12,'Dewi Lestari','6320397550596265',146526660.00,'2025-12-19','pending',NULL,NULL,NULL,'bukti_akuisisi_6.pdf','2025-12-23 10:36:11','2026-01-07 10:36:11'),(7,'TRX-20260107-0007',21,8,'Fajar Ramadhan','2627196736669130',123076508.00,'2025-12-29','pending',NULL,NULL,NULL,'bukti_akuisisi_7.pdf','2025-12-22 10:36:11','2026-01-07 10:36:11'),(8,'TRX-20260107-0008',19,13,'Gita Gutawa','9615944076762067',11210035.00,'2025-11-11','verified',3,'2026-01-04 17:36:11',NULL,'bukti_akuisisi_8.pdf','2025-11-18 10:36:11','2026-01-07 10:36:11'),(9,'TRX-20260107-0009',23,12,'Hadi Sucipto','3052453006622929',146329509.00,'2025-12-31','rejected',4,'2026-01-03 17:36:11','Dokumen KTP buram atau tanda tangan tidak cocok.','bukti_akuisisi_9.pdf','2025-11-29 10:36:11','2026-01-07 10:36:11'),(10,'TRX-20260107-0010',11,2,'Indah Permata','3391242616730252',123830814.00,'2025-11-25','rejected',5,'2026-01-05 17:36:11','Dokumen KTP buram atau tanda tangan tidak cocok.','bukti_akuisisi_10.pdf','2025-11-29 10:36:11','2026-01-07 10:36:11'),(11,'TRX-20260107-0011',16,12,'Joko Widodo','4374785568682630',144197875.00,'2025-11-21','pending',NULL,NULL,NULL,'bukti_akuisisi_11.pdf','2025-11-20 10:36:11','2026-01-07 10:36:11'),(12,'TRX-20260107-0012',15,10,'Kartika Sari','2964230231951170',10047370.00,'2025-11-16','pending',NULL,NULL,NULL,'bukti_akuisisi_12.pdf','2025-11-17 10:36:11','2026-01-07 10:36:11'),(13,'TRX-20260107-0013',20,7,'Lutfi Hakim','1160343968885942',123609186.00,'2025-11-24','verified',5,'2026-01-06 17:36:11',NULL,'bukti_akuisisi_13.pdf','2026-01-02 10:36:11','2026-01-07 10:36:11'),(14,'TRX-20260107-0014',21,12,'Maya Ahmad','8907483815828425',5862466.00,'2025-11-10','rejected',3,'2026-01-05 17:36:11','Dokumen KTP buram atau tanda tangan tidak cocok.','bukti_akuisisi_14.pdf','2025-11-14 10:36:11','2026-01-07 10:36:11'),(15,'TRX-20260107-0015',25,7,'Nico Saputra','6824926076202191',39857715.00,'2025-11-20','pending',NULL,NULL,NULL,'bukti_akuisisi_15.pdf','2025-12-26 10:36:11','2026-01-07 10:36:11'),(16,'TRX-20260107-0016',16,1,'Oki Setiawan','9157884626919021',88415370.00,'2025-11-25','verified',4,'2026-01-02 17:36:11',NULL,'bukti_akuisisi_16.pdf','2025-12-28 10:36:11','2026-01-07 10:36:11'),(17,'TRX-20260107-0017',26,10,'Putri Ayu','9570343315700132',42314387.00,'2026-01-06','rejected',2,'2026-01-05 17:36:11','Dokumen KTP buram atau tanda tangan tidak cocok.','bukti_akuisisi_17.pdf','2025-12-19 10:36:11','2026-01-07 10:36:11'),(18,'TRX-20260107-0018',14,4,'Qori Iskandar','2537880158538147',128312928.00,'2025-12-04','pending',NULL,NULL,NULL,'bukti_akuisisi_18.pdf','2025-12-09 10:36:11','2026-01-07 10:36:11'),(19,'TRX-20260107-0019',13,5,'Rudi Hartono','3643739831509825',79073000.00,'2025-12-27','rejected',4,'2026-01-03 17:36:11','Dokumen KTP buram atau tanda tangan tidak cocok.','bukti_akuisisi_19.pdf','2025-12-30 10:36:11','2026-01-07 10:36:11'),(20,'TRX-20260107-0020',15,8,'Siska Amelia','7521794366109770',36388039.00,'2025-12-30','rejected',5,'2026-01-03 17:36:11','Dokumen KTP buram atau tanda tangan tidak cocok.','bukti_akuisisi_20.pdf','2025-12-21 10:36:11','2026-01-07 10:36:11'),(21,'TRX-20260107-0021',19,7,'Tono Subagyo','9797699759001257',4673463.00,'2025-12-24','pending',NULL,NULL,NULL,'bukti_akuisisi_21.pdf','2025-11-14 10:36:11','2026-01-07 10:36:11'),(22,'TRX-20260107-0022',24,12,'Umar Bakri','5751840604162606',84721378.00,'2025-12-08','rejected',2,'2026-01-02 17:36:11','Dokumen KTP buram atau tanda tangan tidak cocok.','bukti_akuisisi_22.pdf','2026-01-04 10:36:11','2026-01-07 10:36:11'),(23,'TRX-20260107-0023',9,8,'Vina Panduwinata','7902426284047175',11892130.00,'2025-12-20','rejected',5,'2026-01-05 17:36:11','Dokumen KTP buram atau tanda tangan tidak cocok.','bukti_akuisisi_23.pdf','2025-12-12 10:36:11','2026-01-07 10:36:11'),(24,'TRX-20260107-0024',14,9,'Wawan Hendrawan','6455921648958697',7970787.00,'2025-11-15','pending',NULL,NULL,NULL,'bukti_akuisisi_24.pdf','2025-12-19 10:36:11','2026-01-07 10:36:11'),(25,'TRX-20260107-0025',12,8,'Xena Warrior','2813350780725593',114357635.00,'2025-12-24','verified',6,'2026-01-03 17:36:11',NULL,'bukti_akuisisi_25.pdf','2025-11-13 10:36:11','2026-01-07 10:36:11'),(26,'TRX-20260107-0026',21,7,'Yusuf Mansur','9757434538294545',92036205.00,'2025-12-06','pending',NULL,NULL,NULL,'bukti_akuisisi_26.pdf','2025-12-01 10:36:11','2026-01-07 10:36:11'),(27,'TRX-20260107-0027',24,1,'Zainal Abidin','4843904183510001',24094367.00,'2025-12-29','verified',4,'2026-01-06 17:36:11',NULL,'bukti_akuisisi_27.pdf','2026-01-01 10:36:11','2026-01-07 10:36:11'),(28,'TRX-20260107-0028',13,5,'Agus Salim','3908547417176180',1243761.00,'2026-01-02','verified',2,'2026-01-03 17:36:11',NULL,'bukti_akuisisi_28.pdf','2025-12-02 10:36:11','2026-01-07 10:36:11'),(29,'TRX-20260107-0029',15,9,'Bambang Pamungkas','7879932744552584',70004621.00,'2025-12-26','pending',NULL,NULL,NULL,'bukti_akuisisi_29.pdf','2025-11-29 10:36:11','2026-01-07 10:36:11'),(30,'TRX-20260107-0030',21,12,'Cici Paramida','2029626620324306',97087580.00,'2025-11-11','pending',NULL,NULL,NULL,'bukti_akuisisi_30.pdf','2025-12-06 10:36:11','2026-01-07 10:36:11'),(31,'TRX-20260107-0031',14,1,'Dedi Corbuzier','9025962309713878',29364031.00,'2025-11-30','verified',3,'2026-01-04 17:36:11',NULL,'bukti_akuisisi_31.pdf','2025-11-09 10:36:11','2026-01-07 10:36:11'),(32,'TRX-20260107-0032',16,15,'Endang Soekamti','3575665892341075',68529309.00,'2025-12-08','pending',NULL,NULL,NULL,'bukti_akuisisi_32.pdf','2025-11-27 10:36:11','2026-01-07 10:36:11'),(33,'TRX-20260107-0033',25,9,'Farah Quinn','6510665940689051',149631788.00,'2025-11-26','rejected',5,'2026-01-04 17:36:11','Dokumen KTP buram atau tanda tangan tidak cocok.','bukti_akuisisi_33.pdf','2025-12-10 10:36:11','2026-01-07 10:36:11'),(34,'TRX-20260107-0034',18,12,'Gading Marten','3563583547245733',103972361.00,'2025-12-28','rejected',2,'2026-01-07 17:36:11','Dokumen KTP buram atau tanda tangan tidak cocok.','bukti_akuisisi_34.pdf','2025-11-12 10:36:11','2026-01-07 10:36:11'),(35,'TRX-20260107-0035',13,5,'Hesti Purwadinata','3513910712207582',59694468.00,'2025-12-29','verified',4,'2026-01-05 17:36:11',NULL,'bukti_akuisisi_35.pdf','2025-12-30 10:36:11','2026-01-07 10:36:11'),(36,'TRX-20260107-0036',16,14,'Irfan Hakim','6700620870337644',130103763.00,'2025-12-04','rejected',2,'2026-01-07 17:36:11','Dokumen KTP buram atau tanda tangan tidak cocok.','bukti_akuisisi_36.pdf','2025-12-22 10:36:11','2026-01-07 10:36:11'),(37,'TRX-20260107-0037',16,4,'Jessica Iskandar','9773258633589106',59344484.00,'2025-11-16','rejected',2,'2026-01-04 17:36:11','Dokumen KTP buram atau tanda tangan tidak cocok.','bukti_akuisisi_37.pdf','2025-12-14 10:36:11','2026-01-07 10:36:11'),(38,'TRX-20260107-0038',19,8,'Kevin Aprilio','2888760238092540',97786681.00,'2025-12-03','rejected',5,'2026-01-07 17:36:11','Dokumen KTP buram atau tanda tangan tidak cocok.','bukti_akuisisi_38.pdf','2025-11-20 10:36:11','2026-01-07 10:36:11'),(39,'TRX-20260107-0039',18,13,'Luna Maya','9799122697768600',11317087.00,'2025-11-17','verified',3,'2026-01-02 17:36:11',NULL,'bukti_akuisisi_39.pdf','2025-11-22 10:36:11','2026-01-07 10:36:11'),(40,'TRX-20260107-0040',12,1,'Melly Goeslaw','3173743278124127',51609610.00,'2025-11-30','pending',NULL,NULL,NULL,'bukti_akuisisi_40.pdf','2025-11-08 10:36:11','2026-01-07 10:36:11'),(41,'TRX-20260107-0041',13,14,'Nunung Srimulat','9843202441735879',146283273.00,'2025-11-08','pending',NULL,NULL,NULL,'bukti_akuisisi_41.pdf','2025-12-24 10:36:11','2026-01-07 10:36:11'),(42,'TRX-20260107-0042',20,6,'Opick Tomboati','9032138212303670',26828496.00,'2025-12-08','verified',5,'2026-01-04 17:36:11',NULL,'bukti_akuisisi_42.pdf','2026-01-05 10:36:11','2026-01-07 10:36:11'),(43,'TRX-20260107-0043',21,1,'Pasha Ungu','4989371800098471',104212847.00,'2025-12-16','rejected',4,'2026-01-05 17:36:11','Dokumen KTP buram atau tanda tangan tidak cocok.','bukti_akuisisi_43.pdf','2025-12-13 10:36:11','2026-01-07 10:36:11'),(44,'TRX-20260107-0044',27,7,'Qibil Changcuters','8398227651655173',34054007.00,'2026-01-06','verified',5,'2026-01-06 17:36:11',NULL,'bukti_akuisisi_44.pdf','2025-11-22 10:36:11','2026-01-07 10:36:11'),(45,'TRX-20260107-0045',16,8,'Raffi Ahmad','4864727471063035',105661674.00,'2025-12-25','pending',NULL,NULL,NULL,'bukti_akuisisi_45.pdf','2025-12-22 10:36:11','2026-01-07 10:36:11'),(46,'TRX-20260107-0046',16,12,'Sule Prikitiw','4211822572284804',103383229.00,'2025-12-29','verified',5,'2026-01-03 17:36:11',NULL,'bukti_akuisisi_46.pdf','2025-12-05 10:36:11','2026-01-07 10:36:11'),(47,'TRX-20260107-0047',20,12,'Tukul Arwana','5988960580672206',76481942.00,'2025-12-02','pending',NULL,NULL,NULL,'bukti_akuisisi_47.pdf','2025-11-15 10:36:11','2026-01-07 10:36:11'),(48,'TRX-20260107-0048',18,12,'Uya Kuya','4452489074778130',32763168.00,'2025-11-28','verified',4,'2026-01-07 17:36:11',NULL,'bukti_akuisisi_48.pdf','2025-11-19 10:36:11','2026-01-07 10:36:11'),(49,'TRX-20260107-0049',24,12,'Vicky Prasetyo','8480285503298014',73856703.00,'2025-11-28','verified',6,'2026-01-03 17:36:11',NULL,'bukti_akuisisi_49.pdf','2025-12-20 10:36:11','2026-01-07 10:36:11'),(50,'TRX-20260107-0050',17,5,'Wendy Cagur','4149956238796404',16638934.00,'2025-12-06','rejected',2,'2026-01-06 17:36:11','Dokumen KTP buram atau tanda tangan tidak cocok.','bukti_akuisisi_50.pdf','2025-11-19 10:36:11','2026-01-07 10:36:11'),(51,'TRX-20260107-0051',18,8,'Xabiru Oshe','6486939163574241',148753696.00,'2025-12-01','verified',2,'2026-01-05 17:36:11',NULL,'bukti_akuisisi_51.pdf','2025-11-14 10:36:11','2026-01-07 10:36:11'),(52,'TRX-20260107-0052',14,3,'Yuni Shara','3418261107453573',127207460.00,'2025-11-21','rejected',5,'2026-01-04 17:36:11','Dokumen KTP buram atau tanda tangan tidak cocok.','bukti_akuisisi_52.pdf','2025-11-27 10:36:11','2026-01-07 10:36:11'),(53,'TRX-20260107-0053',20,9,'Zaskia Gotik','9255984968335482',83131061.00,'2025-12-18','rejected',3,'2026-01-04 17:36:11','Dokumen KTP buram atau tanda tangan tidak cocok.','bukti_akuisisi_53.pdf','2025-11-08 10:36:11','2026-01-07 10:36:11'),(54,'TRX-20260107-0054',18,11,'Ade Rai','1234289480962646',33882200.00,'2025-11-14','pending',NULL,NULL,NULL,'bukti_akuisisi_54.pdf','2025-12-20 10:36:11','2026-01-07 10:36:11'),(55,'TRX-20260107-0055',16,7,'Baim Wong','5802396856884198',52949256.00,'2025-12-11','rejected',4,'2026-01-07 17:36:11','Dokumen KTP buram atau tanda tangan tidak cocok.','bukti_akuisisi_55.pdf','2025-12-18 10:36:11','2026-01-07 10:36:11'),(56,'TRX-20260107-0056',11,14,'Chika Jessica','6691210490742330',45714825.00,'2025-12-10','verified',4,'2026-01-06 17:36:11',NULL,'bukti_akuisisi_56.pdf','2025-12-30 10:36:11','2026-01-07 10:36:11'),(57,'TRX-20260107-0057',9,3,'Denny Cagur','1204860980828070',53585423.00,'2025-11-29','verified',6,'2026-01-04 17:36:11',NULL,'bukti_akuisisi_57.pdf','2025-11-09 10:36:11','2026-01-07 10:36:11'),(58,'TRX-20260107-0058',27,13,'Eko Patrio','8714341621940794',124318352.00,'2025-12-07','rejected',2,'2026-01-07 17:36:11','Dokumen KTP buram atau tanda tangan tidak cocok.','bukti_akuisisi_58.pdf','2025-12-04 10:36:11','2026-01-07 10:36:11'),(59,'TRX-20260107-0059',17,3,'Fitri Tropica','2383810414751602',121551611.00,'2025-11-08','rejected',6,'2026-01-04 17:36:11','Dokumen KTP buram atau tanda tangan tidak cocok.','bukti_akuisisi_59.pdf','2025-12-18 10:36:11','2026-01-07 10:36:11'),(60,'TRX-20260107-0060',15,8,'Gilang Dirga','9770207383249475',143067461.00,'2025-11-14','rejected',2,'2026-01-02 17:36:11','Dokumen KTP buram atau tanda tangan tidak cocok.','bukti_akuisisi_60.pdf','2025-12-07 10:36:11','2026-01-07 10:36:11'),(61,'TRX-20260107-0061',23,15,'Hengky Kurniawan','5008257397569895',6588730.00,'2025-11-25','pending',NULL,NULL,NULL,'bukti_akuisisi_61.pdf','2026-01-01 10:36:11','2026-01-07 10:36:11'),(62,'TRX-20260107-0062',26,13,'Indra Bekti','1669561735276812',116745307.00,'2025-12-06','verified',5,'2026-01-06 17:36:11',NULL,'bukti_akuisisi_62.pdf','2026-01-06 10:36:11','2026-01-07 10:36:11'),(63,'TRX-20260107-0063',18,12,'Jojon Pelawak','2870239052843809',102456721.00,'2026-01-02','rejected',3,'2026-01-02 17:36:11','Dokumen KTP buram atau tanda tangan tidak cocok.','bukti_akuisisi_63.pdf','2025-12-18 10:36:11','2026-01-07 10:36:11'),(64,'TRX-20260107-0064',15,3,'Komeng Uhuy','6809964185454218',19555290.00,'2025-11-19','pending',NULL,NULL,NULL,'bukti_akuisisi_64.pdf','2025-12-19 10:36:11','2026-01-07 10:36:11'),(65,'TRX-20260107-0065',16,12,'Lesti Kejora','6041090694578299',8063029.00,'2025-12-11','rejected',5,'2026-01-04 17:36:11','Dokumen KTP buram atau tanda tangan tidak cocok.','bukti_akuisisi_65.pdf','2026-01-04 10:36:11','2026-01-07 10:36:11'),(66,'TRX-20260107-0066',17,11,'Mpok Alpa','4683211993234165',91153872.00,'2025-11-17','rejected',3,'2026-01-02 17:36:11','Dokumen KTP buram atau tanda tangan tidak cocok.','bukti_akuisisi_66.pdf','2026-01-01 10:36:11','2026-01-07 10:36:11'),(67,'TRX-20260107-0067',11,1,'Nassar Sungkar','2961188067929978',7945321.00,'2025-12-02','verified',3,'2026-01-03 17:36:11',NULL,'bukti_akuisisi_67.pdf','2025-11-11 10:36:11','2026-01-07 10:36:11'),(68,'TRX-20260107-0068',24,4,'Olga Syahputra','4837048562181676',41729443.00,'2025-12-24','pending',NULL,NULL,NULL,'bukti_akuisisi_68.pdf','2025-12-30 10:36:11','2026-01-07 10:36:11'),(69,'TRX-20260107-0069',18,4,'Parto Patrio','8280795022821415',148589459.00,'2025-12-05','rejected',5,'2026-01-02 17:36:11','Dokumen KTP buram atau tanda tangan tidak cocok.','bukti_akuisisi_69.pdf','2025-12-28 10:36:11','2026-01-07 10:36:11'),(70,'TRX-20260107-0070',14,11,'Quilla Simanjuntak','4561223822514753',91559130.00,'2025-12-28','rejected',5,'2026-01-07 17:36:11','Dokumen KTP buram atau tanda tangan tidak cocok.','bukti_akuisisi_70.pdf','2025-12-03 10:36:11','2026-01-07 10:36:11'),(71,'TRX-20260107-0071',11,7,'Rina Nose','8673705432750398',130886312.00,'2025-12-15','verified',4,'2026-01-06 17:36:11',NULL,'bukti_akuisisi_71.pdf','2025-12-19 10:36:11','2026-01-07 10:36:11'),(72,'TRX-20260107-0072',22,4,'Sojimah Pancawati','2360002133477034',34517065.00,'2025-12-03','verified',5,'2026-01-07 17:36:11',NULL,'bukti_akuisisi_72.pdf','2026-01-06 10:36:11','2026-01-07 10:36:11'),(73,'TRX-20260107-0073',26,1,'Tora Sudiro','6606268437446065',44276317.00,'2025-12-31','pending',NULL,NULL,NULL,'bukti_akuisisi_73.pdf','2025-11-22 10:36:11','2026-01-07 10:36:11'),(74,'TRX-20260107-0074',12,4,'Ucok Baba','7732314920062990',85036996.00,'2025-11-30','pending',NULL,NULL,NULL,'bukti_akuisisi_74.pdf','2026-01-04 10:36:11','2026-01-07 10:36:11'),(75,'TRX-20260107-0075',27,5,'Vincent Rompies','9395593181194270',7448634.00,'2025-11-25','rejected',3,'2026-01-06 17:36:11','Dokumen KTP buram atau tanda tangan tidak cocok.','bukti_akuisisi_75.pdf','2025-12-22 10:36:11','2026-01-07 10:36:11');
/*!40000 ALTER TABLE `akuisisis` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache`
--

DROP TABLE IF EXISTS `cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache`
--

LOCK TABLES `cache` WRITE;
/*!40000 ALTER TABLE `cache` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache_locks`
--

LOCK TABLES `cache_locks` WRITE;
/*!40000 ALTER TABLE `cache_locks` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache_locks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `divisis`
--

DROP TABLE IF EXISTS `divisis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `divisis` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nama_divisi` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `kode_divisi` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lokasi_lantai` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `kepala_divisi` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `divisis_kode_divisi_unique` (`kode_divisi`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `divisis`
--

LOCK TABLES `divisis` WRITE;
/*!40000 ALTER TABLE `divisis` DISABLE KEYS */;
INSERT INTO `divisis` VALUES (1,'SDM & Umum','ADM',NULL,NULL,'2026-01-07 10:35:58','2026-01-07 10:35:58'),(2,'Operasional','OPS',NULL,NULL,'2026-01-07 10:35:58','2026-01-07 10:35:58'),(3,'Pemasaran & Bisnis','MKT',NULL,NULL,'2026-01-07 10:35:58','2026-01-07 10:35:58'),(4,'Kredit & Konsumer','CRD',NULL,NULL,'2026-01-07 10:35:58','2026-01-07 10:35:58'),(5,'Pimpinan Cabang','KCP',NULL,NULL,'2026-01-07 10:35:58','2026-01-07 10:35:58');
/*!40000 ALTER TABLE `divisis` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `indikators`
--

DROP TABLE IF EXISTS `indikators`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `indikators` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `produk_id` bigint unsigned NOT NULL,
  `nama_kpi` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `satuan` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `bobot_nilai` decimal(8,2) NOT NULL,
  `target_minimal` decimal(15,2) NOT NULL,
  `metode_perhitungan` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `indikators_produk_id_foreign` (`produk_id`),
  CONSTRAINT `indikators_produk_id_foreign` FOREIGN KEY (`produk_id`) REFERENCES `produks` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `indikators`
--

LOCK TABLES `indikators` WRITE;
/*!40000 ALTER TABLE `indikators` DISABLE KEYS */;
INSERT INTO `indikators` VALUES (1,4,'Penyaluran KUR Mikro','Rupiah',25.00,500000000.00,'(Total Realisasi / Target) * Bobot','2026-01-07 10:36:10','2026-01-07 10:36:10'),(2,4,'Booking Loan Consumer','Rupiah',20.00,300000000.00,'Total pencairan kredit baru','2026-01-07 10:36:10','2026-01-07 10:36:10'),(3,4,'Recovery Rate (Penagihan)','Persen',15.00,5.00,'(Hutang Tertagih / Total Macet) * 100','2026-01-07 10:36:10','2026-01-07 10:36:10'),(4,4,'NPL Ratio (Kredit Macet)','Persen',10.00,2.00,'Menjaga NPL di bawah threshold','2026-01-07 10:36:10','2026-01-07 10:36:10'),(5,1,'Pembukaan Rekening Baru (NOA)','Unit',15.00,50.00,'Jumlah akun baru valid','2026-01-07 10:36:10','2026-01-07 10:36:10'),(6,1,'Rasio CASA (Dana Murah)','Persen',15.00,40.00,'(Giro + Tabungan) / Total DPK','2026-01-07 10:36:10','2026-01-07 10:36:10'),(7,1,'Volume Deposito','Rupiah',10.00,1000000000.00,'Total penempatan deposito baru','2026-01-07 10:36:10','2026-01-07 10:36:10'),(8,1,'Akuisisi Merchant QRIS','Unit',10.00,20.00,'Jumlah merchant aktif baru','2026-01-07 10:36:10','2026-01-07 10:36:10'),(9,7,'Premi Asuransi Jiwa (Bancassurance)','Rupiah',20.00,100000000.00,'Total premi collected','2026-01-07 10:36:10','2026-01-07 10:36:10'),(10,7,'Polis Baru Kendaraan','Unit',10.00,15.00,'Jumlah polis terbit','2026-01-07 10:36:10','2026-01-07 10:36:10'),(11,7,'Fee Based Income (FBI) Asuransi','Rupiah',10.00,25000000.00,'Pendapatan fee dari penjualan','2026-01-07 10:36:10','2026-01-07 10:36:10'),(12,7,'Retensi Nasabah Prioritas','Persen',15.00,90.00,'Persentase renewal polis','2026-01-07 10:36:10','2026-01-07 10:36:10');
/*!40000 ALTER TABLE `indikators` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jabatans`
--

DROP TABLE IF EXISTS `jabatans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jabatans` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nama_jabatan` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `kode_jabatan` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `level_otoritas` int NOT NULL,
  `deskripsi_tugas` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `jabatans_kode_jabatan_unique` (`kode_jabatan`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jabatans`
--

LOCK TABLES `jabatans` WRITE;
/*!40000 ALTER TABLE `jabatans` DISABLE KEYS */;
INSERT INTO `jabatans` VALUES (1,'Administrator','ADM',1,'Mengelola data sistem, pengguna, hak akses, serta memastikan kelancaran operasional aplikasi dan administrasi internal.','2026-01-07 10:35:58','2026-01-07 10:35:58'),(2,'Supervisor','SPV',2,'Mengawasi dan memverifikasi kinerja pegawai, melakukan validasi data operasional, serta memberikan arahan dan evaluasi.','2026-01-07 10:35:58','2026-01-07 10:35:58'),(3,'Kepala Cabang','KACAB',0,'Memimpin dan mengawasi seluruh operasional cabang, mengambil keputusan strategis, serta bertanggung jawab atas pencapaian target cabang.','2026-01-07 10:35:58','2026-01-07 10:35:58'),(4,'Pegawai','STF',3,'Melaksanakan tugas operasional harian, menginput dan mengelola data sesuai tanggung jawab, serta melaporkan hasil kerja.','2026-01-07 10:35:58','2026-01-07 10:35:58');
/*!40000 ALTER TABLE `jabatans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_batches`
--

DROP TABLE IF EXISTS `job_batches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_batches`
--

LOCK TABLES `job_batches` WRITE;
/*!40000 ALTER TABLE `job_batches` DISABLE KEYS */;
/*!40000 ALTER TABLE `job_batches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint unsigned NOT NULL,
  `reserved_at` int unsigned DEFAULT NULL,
  `available_at` int unsigned NOT NULL,
  `created_at` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'0001_01_01_000001_create_cache_table',1),(2,'0001_01_01_000002_create_jobs_table',1),(3,'0001_01_01_000003_create_jabatans_table',1),(4,'0001_01_01_000004_create_divisis_table',1),(5,'0001_01_01_000005_create_users_table',1),(6,'2025_12_29_103845_create_produks_table',1),(7,'2025_12_30_103811_create_indikators_table',1),(8,'2025_12_30_103912_create_targets_table',1),(9,'2025_12_30_103923_create_akuisisis_table',1),(10,'2026_01_05_104021_create_transaksis_table',1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produks`
--

DROP TABLE IF EXISTS `produks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produks` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nama_produk` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `kode_produk` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `kategori` enum('tabungan','kredit','asuransi','retail','corporate','digital') COLLATE utf8mb4_unicode_ci NOT NULL,
  `harga_satuan` decimal(15,2) NOT NULL DEFAULT '0.00',
  `komisi_poin` decimal(8,2) NOT NULL DEFAULT '0.00',
  `deskripsi_produk` text COLLATE utf8mb4_unicode_ci,
  `status` enum('tersedia','discontinued','aktif') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'tersedia',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `produks_kode_produk_unique` (`kode_produk`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produks`
--

LOCK TABLES `produks` WRITE;
/*!40000 ALTER TABLE `produks` DISABLE KEYS */;
INSERT INTO `produks` VALUES (1,'Tabungan Britama','TAB431','tabungan',0.00,0.00,NULL,'aktif','2026-01-07 10:36:10','2026-01-07 10:36:10'),(2,'Tabungan Simpedes','TAB944','tabungan',0.00,0.00,NULL,'aktif','2026-01-07 10:36:10','2026-01-07 10:36:10'),(3,'Tabungan Haji','TAB874','tabungan',0.00,0.00,NULL,'aktif','2026-01-07 10:36:10','2026-01-07 10:36:10'),(4,'Kredit Usaha Rakyat (KUR)','KRE524','kredit',0.00,0.00,NULL,'aktif','2026-01-07 10:36:10','2026-01-07 10:36:10'),(5,'Kredit Perumahan (KPR)','KRE544','kredit',0.00,0.00,NULL,'aktif','2026-01-07 10:36:10','2026-01-07 10:36:10'),(6,'Kredit Kendaraan','KRE623','kredit',0.00,0.00,NULL,'aktif','2026-01-07 10:36:10','2026-01-07 10:36:10'),(7,'Asuransi Jiwa Sraya','ASU571','asuransi',0.00,0.00,NULL,'aktif','2026-01-07 10:36:10','2026-01-07 10:36:10'),(8,'Asuransi Kesehatan Plus','ASU706','asuransi',0.00,0.00,NULL,'aktif','2026-01-07 10:36:10','2026-01-07 10:36:10'),(9,'Deposito Berjangka','DEP348','tabungan',0.00,0.00,NULL,'aktif','2026-01-07 10:36:10','2026-01-07 10:36:10'),(10,'Kredit Modal Kerja','KRE981','kredit',0.00,0.00,NULL,'aktif','2026-01-07 10:36:10','2026-01-07 10:36:10'),(11,'Kredit Konsumsi','KRE249','kredit',0.00,0.00,NULL,'aktif','2026-01-07 10:36:10','2026-01-07 10:36:10'),(12,'Asuransi Pendidikan','ASU573','asuransi',0.00,0.00,NULL,'aktif','2026-01-07 10:36:10','2026-01-07 10:36:10'),(13,'Tabungan Rencana','TAB829','tabungan',0.00,0.00,NULL,'aktif','2026-01-07 10:36:10','2026-01-07 10:36:10'),(14,'Kredit Mikro','KRE957','kredit',0.00,0.00,NULL,'aktif','2026-01-07 10:36:10','2026-01-07 10:36:10'),(15,'Asuransi Kendaraan','ASU859','asuransi',0.00,0.00,NULL,'aktif','2026-01-07 10:36:10','2026-01-07 10:36:10');
/*!40000 ALTER TABLE `produks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('JFnZAl1b9Y5yVCV2TeARTm9SFhbG3sblQfkJxEkF',9,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36 Edg/143.0.0.0','YTozOntzOjY6Il90b2tlbiI7czo0MDoiU3gydHBNbGZzRGU1RHV6TzIxUWVNZWh1ZUxlTGR5VW84VlcwdXp6UiI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6OTt9',1767813605);
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `targets`
--

DROP TABLE IF EXISTS `targets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `targets` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `indikator_id` bigint unsigned NOT NULL,
  `produk_id` bigint unsigned DEFAULT NULL,
  `nilai_target` decimal(15,2) NOT NULL,
  `tipe_target` enum('nominal','noa') COLLATE utf8mb4_unicode_ci NOT NULL,
  `periode` enum('mingguan','bulanan','tahunan') COLLATE utf8mb4_unicode_ci NOT NULL,
  `tahun` int NOT NULL DEFAULT '2026',
  `tanggal_mulai` date NOT NULL,
  `tanggal_selesai` date NOT NULL,
  `deadline_pencapaian` date NOT NULL,
  `keterangan_tambahan` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `targets_user_id_foreign` (`user_id`),
  KEY `targets_indikator_id_foreign` (`indikator_id`),
  KEY `targets_produk_id_foreign` (`produk_id`),
  CONSTRAINT `targets_indikator_id_foreign` FOREIGN KEY (`indikator_id`) REFERENCES `indikators` (`id`),
  CONSTRAINT `targets_produk_id_foreign` FOREIGN KEY (`produk_id`) REFERENCES `produks` (`id`),
  CONSTRAINT `targets_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `targets`
--

LOCK TABLES `targets` WRITE;
/*!40000 ALTER TABLE `targets` DISABLE KEYS */;
INSERT INTO `targets` VALUES (1,17,9,11,471750280.00,'noa','bulanan',2026,'2026-01-01','2026-01-31','2026-01-31','Target performa bulanan Q1.','2026-01-07 10:36:10','2026-01-07 10:36:10'),(2,10,7,5,331105508.00,'noa','bulanan',2026,'2026-01-01','2026-01-31','2026-01-31','Target performa bulanan Q1.','2026-01-07 10:36:10','2026-01-07 10:36:10'),(3,13,3,14,166397978.00,'noa','bulanan',2026,'2026-01-01','2026-01-31','2026-01-31','Target performa bulanan Q1.','2026-01-07 10:36:10','2026-01-07 10:36:10'),(4,11,11,14,274366093.00,'noa','bulanan',2026,'2026-01-01','2026-01-31','2026-01-31','Target performa bulanan Q1.','2026-01-07 10:36:10','2026-01-07 10:36:10'),(5,25,11,5,324072747.00,'noa','bulanan',2026,'2026-01-01','2026-01-31','2026-01-31','Target performa bulanan Q1.','2026-01-07 10:36:10','2026-01-07 10:36:10'),(6,11,6,12,322673463.00,'noa','bulanan',2026,'2026-01-01','2026-01-31','2026-01-31','Target performa bulanan Q1.','2026-01-07 10:36:10','2026-01-07 10:36:10'),(7,27,3,13,265093787.00,'noa','bulanan',2026,'2026-01-01','2026-01-31','2026-01-31','Target performa bulanan Q1.','2026-01-07 10:36:10','2026-01-07 10:36:10'),(8,14,4,6,74436976.00,'noa','bulanan',2026,'2026-01-01','2026-01-31','2026-01-31','Target performa bulanan Q1.','2026-01-07 10:36:11','2026-01-07 10:36:11'),(9,18,8,14,259780847.00,'noa','bulanan',2026,'2026-01-01','2026-01-31','2026-01-31','Target performa bulanan Q1.','2026-01-07 10:36:11','2026-01-07 10:36:11'),(10,19,6,5,77354831.00,'noa','bulanan',2026,'2026-01-01','2026-01-31','2026-01-31','Target performa bulanan Q1.','2026-01-07 10:36:11','2026-01-07 10:36:11'),(11,11,3,7,311593708.00,'nominal','bulanan',2026,'2026-01-01','2026-01-31','2026-01-31','Target performa bulanan Q1.','2026-01-07 10:36:11','2026-01-07 10:36:11'),(12,25,2,1,83935786.00,'noa','bulanan',2026,'2026-01-01','2026-01-31','2026-01-31','Target performa bulanan Q1.','2026-01-07 10:36:11','2026-01-07 10:36:11'),(13,20,5,2,487481993.00,'noa','bulanan',2026,'2026-01-01','2026-01-31','2026-01-31','Target performa bulanan Q1.','2026-01-07 10:36:11','2026-01-07 10:36:11'),(14,11,10,4,178541706.00,'nominal','bulanan',2026,'2026-01-01','2026-01-31','2026-01-31','Target performa bulanan Q1.','2026-01-07 10:36:11','2026-01-07 10:36:11'),(15,11,7,2,461476236.00,'noa','bulanan',2026,'2026-01-01','2026-01-31','2026-01-31','Target performa bulanan Q1.','2026-01-07 10:36:11','2026-01-07 10:36:11'),(16,11,7,12,205265941.00,'nominal','bulanan',2026,'2026-01-01','2026-01-31','2026-01-31','Target performa bulanan Q1.','2026-01-07 10:36:11','2026-01-07 10:36:11'),(17,16,8,13,359443483.00,'noa','bulanan',2026,'2026-01-01','2026-01-31','2026-01-31','Target performa bulanan Q1.','2026-01-07 10:36:11','2026-01-07 10:36:11'),(18,12,7,12,129386589.00,'nominal','bulanan',2026,'2026-01-01','2026-01-31','2026-01-31','Target performa bulanan Q1.','2026-01-07 10:36:11','2026-01-07 10:36:11'),(19,14,10,11,379401355.00,'noa','bulanan',2026,'2026-01-01','2026-01-31','2026-01-31','Target performa bulanan Q1.','2026-01-07 10:36:11','2026-01-07 10:36:11'),(20,21,7,6,209093326.00,'noa','bulanan',2026,'2026-01-01','2026-01-31','2026-01-31','Target performa bulanan Q1.','2026-01-07 10:36:11','2026-01-07 10:36:11'),(21,19,9,2,435814743.00,'noa','bulanan',2026,'2026-01-01','2026-01-31','2026-01-31','Target performa bulanan Q1.','2026-01-07 10:36:11','2026-01-07 10:36:11'),(22,15,12,5,255142912.00,'nominal','bulanan',2026,'2026-01-01','2026-01-31','2026-01-31','Target performa bulanan Q1.','2026-01-07 10:36:11','2026-01-07 10:36:11');
/*!40000 ALTER TABLE `targets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaksis`
--

DROP TABLE IF EXISTS `transaksis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaksis` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `produk_id` bigint unsigned NOT NULL,
  `indikator_id` bigint unsigned NOT NULL,
  `akuisisi_id` bigint unsigned NOT NULL,
  `nilai_realisasi` decimal(15,2) NOT NULL,
  `poin_didapat` int NOT NULL,
  `bulan` int NOT NULL,
  `tahun` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `transaksis_user_id_foreign` (`user_id`),
  KEY `transaksis_produk_id_foreign` (`produk_id`),
  KEY `transaksis_indikator_id_foreign` (`indikator_id`),
  KEY `transaksis_akuisisi_id_foreign` (`akuisisi_id`),
  CONSTRAINT `transaksis_akuisisi_id_foreign` FOREIGN KEY (`akuisisi_id`) REFERENCES `akuisisis` (`id`),
  CONSTRAINT `transaksis_indikator_id_foreign` FOREIGN KEY (`indikator_id`) REFERENCES `indikators` (`id`),
  CONSTRAINT `transaksis_produk_id_foreign` FOREIGN KEY (`produk_id`) REFERENCES `produks` (`id`),
  CONSTRAINT `transaksis_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaksis`
--

LOCK TABLES `transaksis` WRITE;
/*!40000 ALTER TABLE `transaksis` DISABLE KEYS */;
INSERT INTO `transaksis` VALUES (1,26,12,7,1,50485093.00,39,1,2026,'2026-01-07 10:36:11','2026-01-07 10:36:11'),(2,20,7,9,13,123609186.00,18,1,2026,'2026-01-07 10:36:11','2026-01-07 10:36:11'),(3,16,1,5,16,88415370.00,46,1,2026,'2026-01-07 10:36:11','2026-01-07 10:36:11'),(4,12,8,1,25,114357635.00,80,1,2026,'2026-01-07 10:36:11','2026-01-07 10:36:11'),(5,24,1,5,27,24094367.00,79,1,2026,'2026-01-07 10:36:11','2026-01-07 10:36:11'),(6,13,5,1,28,1243761.00,36,1,2026,'2026-01-07 10:36:11','2026-01-07 10:36:11'),(7,14,1,5,31,29364031.00,22,1,2026,'2026-01-07 10:36:11','2026-01-07 10:36:11'),(8,18,13,12,39,11317087.00,83,1,2026,'2026-01-07 10:36:11','2026-01-07 10:36:11'),(9,20,6,7,42,26828496.00,21,1,2026,'2026-01-07 10:36:11','2026-01-07 10:36:11'),(10,16,12,5,46,103383229.00,65,1,2026,'2026-01-07 10:36:11','2026-01-07 10:36:11'),(11,18,12,11,48,32763168.00,10,1,2026,'2026-01-07 10:36:11','2026-01-07 10:36:11'),(12,11,14,12,56,45714825.00,32,1,2026,'2026-01-07 10:36:11','2026-01-07 10:36:11'),(13,9,3,6,57,53585423.00,64,1,2026,'2026-01-07 10:36:11','2026-01-07 10:36:11'),(14,26,13,11,62,116745307.00,54,1,2026,'2026-01-07 10:36:11','2026-01-07 10:36:11'),(15,11,1,5,67,7945321.00,100,1,2026,'2026-01-07 10:36:11','2026-01-07 10:36:11'),(16,11,7,9,71,130886312.00,18,1,2026,'2026-01-07 10:36:11','2026-01-07 10:36:11'),(17,22,4,1,72,34517065.00,21,1,2026,'2026-01-07 10:36:11','2026-01-07 10:36:11');
/*!40000 ALTER TABLE `transaksis` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nip` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `jabatan_id` bigint unsigned NOT NULL,
  `divisi_id` bigint unsigned NOT NULL,
  `status_aktif` enum('aktif','nonaktif') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'aktif',
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_nip_unique` (`nip`),
  UNIQUE KEY `users_email_unique` (`email`),
  KEY `users_jabatan_id_foreign` (`jabatan_id`),
  KEY `users_divisi_id_foreign` (`divisi_id`),
  CONSTRAINT `users_divisi_id_foreign` FOREIGN KEY (`divisi_id`) REFERENCES `divisis` (`id`),
  CONSTRAINT `users_jabatan_id_foreign` FOREIGN KEY (`jabatan_id`) REFERENCES `jabatans` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Budi Administrator','19900101001','adminbankxyz@mail.com','$2y$12$48PuMttk9kl4mqBLxc/u0eXBFEhGrkUFQ0.mrj/3oOp4JBTRdpxH2',1,1,'aktif','503GQxaDT42oauN5EO4jIVdq2StFQ7syNZzxRIZOg6kSsTyuigN94pC5Ihqr','2026-01-07 10:35:58','2026-01-07 10:35:58'),(2,'Siti SPV','19900101002','siti_spv@mail.com','$2y$12$eYbwebaWyVJg3g0dsNBjeuNtJkKvq.70FPhgoG0gM7ct0i.eCfPG.',2,1,'aktif','o3Ly4gsfPMIkiNlv07DI2e6nUoAFdirrdaEyiHNDmYu6Pdf6mjSPHwnfM7Ih','2026-01-07 10:35:59','2026-01-07 10:35:59'),(3,'Indra SPV','19900104402','indra_spv@mail.com','$2y$12$i8MBaMEF.HgtEhwxCPOn.eV1mYTCIDPc2x4HDiyXZGc6tCK3yhNIm',2,2,'aktif','Kv5dike7cM5yBoGbkC4zoSSNGeMZnrRUpcJmS04w3nkG4Zy5v9rbiVKXXUcb','2026-01-07 10:35:59','2026-01-07 10:35:59'),(4,'Anto SPV','19904104402','anto_spv@mail.com','$2y$12$3SpQDe4UhcWa0n6Ox8SpCO5Oqp4d0Zn1CPzKcy492SquCFLF3nrj6',2,3,'aktif',NULL,'2026-01-07 10:36:00','2026-01-07 10:36:00'),(5,'Roni SPV','19904184402','roni_spv@mail.com','$2y$12$uNKQDCEtnKVEBIObUZ0hR.fL/23L4ywyxCdZl5lBp1ZJBPOEYLU4u',2,4,'aktif',NULL,'2026-01-07 10:36:00','2026-01-07 10:36:00'),(6,'Toni SPV','19964184402','toni_spv@mail.com','$2y$12$g7q.rC10tNFeMmVbz7ljk.dW7pjIBriKFIGjXBrc8cLOG6Ohi1rLa',2,5,'aktif',NULL,'2026-01-07 10:36:00','2026-01-07 10:36:00'),(7,'Kepala Cabang I Bank XYZ','19900102007','kacab@mail.com','$2y$12$CtTMuyp0s/.gT.ldqWg8Geb3I7iUP9yA1qsbmLxRCcpKCeGkh7CTS',3,5,'aktif',NULL,'2026-01-07 10:36:01','2026-01-07 10:36:01'),(8,'Kepala Cabang II Bank XYZ','19940102007','kacab2@mail.com','$2y$12$FgtLcHlDIlZSWw1BiyS9X.a7EiwU/C6Q0yB32LrgHpPRYO4yNgNL6',3,5,'aktif',NULL,'2026-01-07 10:36:01','2026-01-07 10:36:01'),(9,'Pegawai Unit 1','300001','staff1@bankxyz.com','$2y$12$obdsnmGm/8LSx/cY7cdwye/vty/XIXDPz1qPTSaVjAcp8AU6sJJgS',4,3,'aktif','OLZPnDqCpJwHkmLoByyHGWXkotQqeBq9i7UppBCOakN7Gak6nKQTpBkmctwT','2026-01-07 10:36:02','2026-01-07 10:36:02'),(10,'Pegawai Unit 2','300002','staff2@bankxyz.com','$2y$12$jd3w/2xkVHuSXwhurIc1Ae8vBBKL3kIEkhHsrebRcyKhuvqX4V3H.',4,3,'aktif',NULL,'2026-01-07 10:36:02','2026-01-07 10:36:02'),(11,'Pegawai Unit 3','300003','staff3@bankxyz.com','$2y$12$bghPX.juEdt5cWfslfeuX.801obBpw7CgLTdJvNeV81AIVefTKKRy',4,2,'aktif',NULL,'2026-01-07 10:36:03','2026-01-07 10:36:03'),(12,'Pegawai Unit 4','300004','staff4@bankxyz.com','$2y$12$uIADqgnljgE055VC63ZhwujJetkPr0gfv6iIb/QbtxmfEdzPRDTli',4,2,'aktif',NULL,'2026-01-07 10:36:03','2026-01-07 10:36:03'),(13,'Pegawai Unit 5','300005','staff5@bankxyz.com','$2y$12$Bbdh7w1fXXxafE6r5ToKoOwttclBMUTQn96aFswf9.K9/.1WgwG5u',4,2,'aktif',NULL,'2026-01-07 10:36:04','2026-01-07 10:36:04'),(14,'Pegawai Unit 6','300006','staff6@bankxyz.com','$2y$12$eVec2YZD7JycsjuW/wVPcuo28iDz7JMfG0r5WtFfVAWWVSV.T2EKe',4,3,'aktif',NULL,'2026-01-07 10:36:04','2026-01-07 10:36:04'),(15,'Pegawai Unit 7','300007','staff7@bankxyz.com','$2y$12$g8fVW/nu9YhiW9aqhcHYO.jBKpO0VdMX0THKbe8eSVVpxQJgZ8X6y',4,4,'aktif',NULL,'2026-01-07 10:36:05','2026-01-07 10:36:05'),(16,'Pegawai Unit 8','300008','staff8@bankxyz.com','$2y$12$L9ZL5a8ilKHznEbHgs.fquMROUdByE3aU6qngoP45thyYrk2s1CqS',4,2,'aktif',NULL,'2026-01-07 10:36:05','2026-01-07 10:36:05'),(17,'Pegawai Unit 9','300009','staff9@bankxyz.com','$2y$12$hgP8ypGubQTqa5LaPncJc.t/Ld7toIbYBDbC4pIUtsbvsdqw7DZqS',4,3,'aktif',NULL,'2026-01-07 10:36:06','2026-01-07 10:36:06'),(18,'Pegawai Unit 10','300010','staff10@bankxyz.com','$2y$12$JTNWS5FbceNIqsJZ8x/53eO1wq40GKUytIziTS/1wNNvjM586FAR6',4,2,'aktif',NULL,'2026-01-07 10:36:06','2026-01-07 10:36:06'),(19,'Pegawai Unit 11','300011','staff11@bankxyz.com','$2y$12$nTkw3Dqf/0fz9eh80eEhd.hG3l4CHDZogEXfdbdFKtvf5YHVSXnam',4,3,'aktif',NULL,'2026-01-07 10:36:06','2026-01-07 10:36:06'),(20,'Pegawai Unit 12','300012','staff12@bankxyz.com','$2y$12$ooa1BiTziRHG2NwOHGnt1O5DSgtLrHTH1xa3c0MTcO0/.FdaphrpW',4,2,'aktif',NULL,'2026-01-07 10:36:07','2026-01-07 10:36:07'),(21,'Pegawai Unit 13','300013','staff13@bankxyz.com','$2y$12$wb6RrWJkspn//xnbt1hP..tRjeUCGmAd3r5fs.kjMIwgUttjf4XcW',4,3,'aktif',NULL,'2026-01-07 10:36:07','2026-01-07 10:36:07'),(22,'Pegawai Unit 14','300014','staff14@bankxyz.com','$2y$12$QyRWLgH2DBWaJJj5sK.TteL4fc2QbXy2sh363k923naCqP3tby2T2',4,2,'aktif',NULL,'2026-01-07 10:36:08','2026-01-07 10:36:08'),(23,'Pegawai Unit 15','300015','staff15@bankxyz.com','$2y$12$hfcD2UT3nM9xG7mkd0gyeObGQAc2QEir7CuC1Ise2P6kWQ3Qy.cF.',4,4,'aktif',NULL,'2026-01-07 10:36:08','2026-01-07 10:36:08'),(24,'Pegawai Unit 16','300016','staff16@bankxyz.com','$2y$12$0pyScRFqLoriiDCBhOhEVOssnxUHFuKiv4dSQkZaX6GWktI0.C9tW',4,3,'aktif',NULL,'2026-01-07 10:36:09','2026-01-07 10:36:09'),(25,'Pegawai Unit 17','300017','staff17@bankxyz.com','$2y$12$kbeJhIpeK0nzhoriO6MDnO3MyS.45/Y08mCs0j..2P9uEpSwC7QQK',4,4,'aktif',NULL,'2026-01-07 10:36:09','2026-01-07 10:36:09'),(26,'Pegawai Unit 18','300018','staff18@bankxyz.com','$2y$12$Zqk.ulLE3vGsOccJ7iJLT.v519W67eMRFuYZSbV/kRhJbluV3USc.',4,3,'aktif',NULL,'2026-01-07 10:36:10','2026-01-07 10:36:10'),(27,'Pegawai Unit 19','300019','staff19@bankxyz.com','$2y$12$fNq4Y1XcBQgQuLlgkMaHWulD725B/5q0DWktFDItII6Jgtn1x0aB2',4,3,'aktif',NULL,'2026-01-07 10:36:10','2026-01-07 10:36:10');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-01-08 12:48:21
