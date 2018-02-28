-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Client: localhost
-- Généré le: Mer 28 Février 2018 à 14:05
-- Version du serveur: 5.5.24-log
-- Version de PHP: 5.4.3

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données: `gardes`
--

-- --------------------------------------------------------

--
-- Structure de la table `chauffeurs`
--

CREATE TABLE IF NOT EXISTS `chauffeurs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `addres` varchar(255) DEFAULT NULL,
  `cni_date` varchar(255) DEFAULT NULL,
  `cni_expire` varchar(255) DEFAULT NULL,
  `cni_no` varchar(255) DEFAULT NULL,
  `cni_place` varchar(255) DEFAULT NULL,
  `cni_scan` varchar(255) DEFAULT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `permis_cat` varchar(255) DEFAULT NULL,
  `permis_date` varchar(255) DEFAULT NULL,
  `permis_expire` varchar(255) DEFAULT NULL,
  `permis_no` varchar(255) DEFAULT NULL,
  `permis_place` varchar(255) DEFAULT NULL,
  `permis_scan` varchar(255) DEFAULT NULL,
  `prenom` varchar(255) DEFAULT NULL,
  `tel` varchar(255) DEFAULT NULL,
  `tel2` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `photos` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Contenu de la table `chauffeurs`
--

INSERT INTO `chauffeurs` (`id`, `addres`, `cni_date`, `cni_expire`, `cni_no`, `cni_place`, `cni_scan`, `nom`, `permis_cat`, `permis_date`, `permis_expire`, `permis_no`, `permis_place`, `permis_scan`, `prenom`, `tel`, `tel2`, `createdAt`, `updatedAt`, `photos`) VALUES
(1, 'addressssss', 'cni_date', 'cni_expire', 'cni_no', 'cni_place', 'cni_scan', 'nom', 'permis_cat', 'permis_date', 'permis_expire', 'permis_no', 'permis_place', 'permis_scan', 'prenom', 'tel', 'tel2', '2017-11-08 14:19:49', '2018-01-19 15:34:38', 'nomadvance-card-tmntr.jpg'),
(2, 'addres', 'cni_date', 'cni_expire', 'cni_no', 'cni_place', 'cni_scan', 'mokai', 'permis_cat', 'permis_date', 'permis_expire', 'permis_no', 'permis_place', 'permis_scan', 'prenom', 'tel', 'tel2', '2017-11-08 14:58:34', '2018-01-19 15:34:52', 'doumtsopben.png'),
(3, 'mokai@yahoo.fr', '12/12/1990', '12/12/2018', '11872928928', 'douala', 'lsmslm', 'doumtsop', 'la plante', '12/12/1990', '12/12/1998', '89899898', 'douala', 'mslmslsm', 'mokai', '677827827', '67282728', '2018-01-19 14:34:24', '2018-01-19 15:35:00', 'doumtsopian-avatar.png'),
(4, 'login@yahoo.fr', '12/12/1990', '12/12/2018', '11872928928', 'douala', 'lsmslm', 'doumtsop', 'la plante', '12/12/1990', '12/12/1998', '89899898', 'douala', 'mslmslsm', 'Meli', '67777777', '66777777', '2018-01-19 15:11:57', '2018-01-19 15:35:08', 'doumtsopben.png');

-- --------------------------------------------------------

--
-- Structure de la table `chauffeurs_vehicules`
--

CREATE TABLE IF NOT EXISTS `chauffeurs_vehicules` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `vehiculeId` int(11) DEFAULT NULL,
  `chauffeurId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `vehiculeId` (`vehiculeId`),
  KEY `chauffeurId` (`chauffeurId`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Contenu de la table `chauffeurs_vehicules`
--

INSERT INTO `chauffeurs_vehicules` (`id`, `createdAt`, `updatedAt`, `vehiculeId`, `chauffeurId`) VALUES
(3, '2018-01-18 00:00:00', '2018-01-18 00:00:00', 1, 1),
(4, '2018-01-18 00:00:00', '2018-01-18 00:00:00', 2, 2);

-- --------------------------------------------------------

--
-- Structure de la table `clients_vehicules`
--

CREATE TABLE IF NOT EXISTS `clients_vehicules` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `vehiculeId` int(11) DEFAULT NULL,
  `utilisateurId` int(11) DEFAULT NULL,
  `chauffeurId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `vehiculeId` (`vehiculeId`),
  KEY `utilisateurId` (`utilisateurId`),
  KEY `chauffeurId` (`chauffeurId`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=19 ;

--
-- Contenu de la table `clients_vehicules`
--

INSERT INTO `clients_vehicules` (`id`, `status`, `createdAt`, `updatedAt`, `vehiculeId`, `utilisateurId`, `chauffeurId`) VALUES
(2, 0, '2018-02-15 09:09:43', '2018-02-15 09:09:43', 2, 7, 2),
(3, 0, '2018-02-16 12:50:10', '2018-02-16 12:50:10', 2, 7, 2),
(4, 0, '2018-02-17 16:41:56', '2018-02-17 16:41:56', 2, 7, 2),
(5, 0, '2018-02-21 08:21:31', '2018-02-21 08:21:31', 2, 7, 2),
(6, 0, '2018-02-21 08:21:37', '2018-02-21 08:21:37', 2, 8, 2),
(7, 0, '2018-02-21 08:22:10', '2018-02-21 08:22:10', 2, 7, 2),
(8, 0, '2018-02-21 08:24:28', '2018-02-21 08:24:28', 2, 7, 2),
(17, 1, '2018-02-21 10:59:09', '2018-02-21 10:59:09', 2, 7, 2),
(18, 1, '2018-02-25 11:14:15', '2018-02-25 11:14:15', 2, 7, 2);

-- --------------------------------------------------------

--
-- Structure de la table `commander_taxes`
--

CREATE TABLE IF NOT EXISTS `commander_taxes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date_debut` varchar(255) DEFAULT NULL,
  `date_fin` varchar(255) DEFAULT NULL,
  `iscommand` varchar(255) DEFAULT NULL,
  `lat_arrive` varchar(255) DEFAULT NULL,
  `lat_depart` varchar(255) DEFAULT NULL,
  `lon_depart` varchar(255) DEFAULT NULL,
  `lon_arrive` varchar(255) DEFAULT NULL,
  `point_depart` varchar(255) DEFAULT NULL,
  `point_arrive` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `utilisateurId` int(11) DEFAULT NULL,
  `vehiculeId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `utilisateurId` (`utilisateurId`),
  KEY `vehiculeId` (`vehiculeId`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Contenu de la table `commander_taxes`
--

INSERT INTO `commander_taxes` (`id`, `date_debut`, `date_fin`, `iscommand`, `lat_arrive`, `lat_depart`, `lon_depart`, `lon_arrive`, `point_depart`, `point_arrive`, `createdAt`, `updatedAt`, `utilisateurId`, `vehiculeId`) VALUES
(1, 'date_debut', 'date_fin', 'iscommand', 'lat_arrive', 'lat_depart', 'lon_depart', 'lon_arrive', 'point_depart', 'point_arrive', '2017-11-07 19:25:37', '2017-11-07 19:25:37', NULL, 1),
(2, 'mooeeoeo', 'msmso', 'msosms', 'msmso', 'amomss', 'omsomso', 'omsomso', 'mosomsom', 'msomso', '2017-11-08 19:19:38', '2017-11-08 19:19:38', NULL, 3);

-- --------------------------------------------------------

--
-- Structure de la table `groupes`
--

CREATE TABLE IF NOT EXISTS `groupes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

--
-- Contenu de la table `groupes`
--

INSERT INTO `groupes` (`id`, `name`, `description`, `createdAt`, `updatedAt`) VALUES
(1, 'mokai', 'groupes des developpeurs', '2017-10-27 07:46:18', '2017-10-27 07:46:18'),
(2, 'zozo', 'kldddkld', '2017-10-27 12:49:46', '2017-10-27 13:05:41'),
(3, 'yyrhjhg', 'zozete\r\n', '2017-10-31 09:13:51', '2017-10-31 09:20:30'),
(4, 'mokai', 'pros', '2018-01-03 10:17:32', '2018-01-03 10:17:32'),
(7, 'papoao', 'proposa', '2018-01-03 10:55:29', '2018-01-03 12:28:04'),
(8, 'PC', 'Police Camerounaise', '2018-01-30 07:42:10', '2018-01-30 07:42:10');

-- --------------------------------------------------------

--
-- Structure de la table `marques`
--

CREATE TABLE IF NOT EXISTS `marques` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Contenu de la table `marques`
--

INSERT INTO `marques` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'Prado', '2017-10-27 07:59:57', '2017-10-27 07:59:57'),
(2, 'toyota', '2017-10-27 08:00:11', '2017-10-27 13:06:51'),
(3, 'hummeur', '2017-10-27 08:03:46', '2017-10-27 13:06:32'),
(4, 'marque de l''heure', '2017-10-27 13:07:02', '2017-10-27 13:07:02');

-- --------------------------------------------------------

--
-- Structure de la table `serie_vehicules`
--

CREATE TABLE IF NOT EXISTS `serie_vehicules` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `marqueId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `marqueId` (`marqueId`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Contenu de la table `serie_vehicules`
--

INSERT INTO `serie_vehicules` (`id`, `name`, `createdAt`, `updatedAt`, `marqueId`) VALUES
(1, 'ma serie', '2017-10-27 13:22:32', '2017-10-27 13:36:17', 2),
(2, 'gfdfhh', '2017-10-27 13:28:23', '2017-10-27 13:41:37', 3);

-- --------------------------------------------------------

--
-- Structure de la table `types_vehicules`
--

CREATE TABLE IF NOT EXISTS `types_vehicules` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Contenu de la table `types_vehicules`
--

INSERT INTO `types_vehicules` (`id`, `name`, `createdAt`, `updatedAt`, `description`) VALUES
(1, 'mon type', '2017-10-27 13:51:24', '2017-10-27 14:03:01', 'klfkffl'),
(2, 'mon type', '2017-10-27 13:58:52', '2017-10-27 13:58:52', 'garcon'),
(3, 'vopor', '2017-10-27 14:02:06', '2017-10-27 14:03:14', 'nono');

-- --------------------------------------------------------

--
-- Structure de la table `utilisateurs`
--

CREATE TABLE IF NOT EXISTS `utilisateurs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `addres` varchar(255) DEFAULT NULL,
  `cni_date` varchar(255) DEFAULT NULL,
  `cni_expire` varchar(255) DEFAULT NULL,
  `cni_no` varchar(255) DEFAULT NULL,
  `cni_place` varchar(255) DEFAULT NULL,
  `cni_scan` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `login` varchar(255) DEFAULT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `prenom` varchar(255) DEFAULT NULL,
  `tel` varchar(255) DEFAULT NULL,
  `tel2` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `groupeId` int(11) DEFAULT NULL,
  `secret` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT '0',
  `danger` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `groupeId` (`groupeId`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=10 ;

--
-- Contenu de la table `utilisateurs`
--

INSERT INTO `utilisateurs` (`id`, `addres`, `cni_date`, `cni_expire`, `cni_no`, `cni_place`, `cni_scan`, `email`, `login`, `nom`, `password`, `prenom`, `tel`, `tel2`, `createdAt`, `updatedAt`, `groupeId`, `secret`, `image`, `status`, `danger`) VALUES
(3, 'meli', 'hjjhjgh', 'ghgghghf', 'hhjjghjkhk', 'ghjjfjg', 'hjgfjgfj', 'khjhkgkjk', 'zozete', 'zozo', 'meli', 'pros', '125465335', '533553553', '2017-10-31 09:55:28', '2018-01-30 07:37:19', 1, NULL, 'totomax.png', 0, 0),
(5, 'mokai@yahoo.fr', '12/05/2016', '10/10/2018', '1272892892', 'DLA', 'oiios', 'doumtsopmelifranck@yahoo.fr', 'zozo', 'mokai', 'mokai', 'zozo', '662442206', '662442204', '2018-01-03 15:20:26', '2018-01-03 15:20:26', 1, NULL, 'totomax.png', 0, 0),
(7, 'mokai@yahoo.fr', '12/12/1990', '12/12/2018', '11872928928', 'douala', 'lsmslm', 'doumtsopmelifranck@yahoo.fr', 'mokai', 'doumtsop', '$2a$10$FFrRaAlgwc88EX2q/OYmH.9vE3HT9ffLsuHIfkf1uZgFv5LieAEIq', 'mokai', '662442204', '662442205', '2018-01-08 10:43:34', '2018-02-25 11:14:45', 4, NULL, 'totomax.png', 1, 1),
(8, 'meli@yahoo.fr', '12/05/2016', '10/10/2018', '1272892892', 'DLA', 'hjgfjgfj', 'meli@yahoo.fr', 'meli', 'meli', '$2a$10$j5vKrXwiZYx9RuaimqEkhOyCzaPtlgv58nz6nMtBukIBhjGgnKYmy', 'franck', '66689289', '6728772882', '2018-01-30 07:41:41', '2018-01-30 07:44:36', 8, NULL, 'totomax.png', 0, 0),
(9, 'Douala', '12/05/2016', '10/10/2018', '1272892892', 'DLA', 'hjgfjgfj', 'toto@yahoo.fr', 'toto', 'toto', '$2a$10$vraIJzhF/JL5Zt4reOSyF.b1R1BGx0e20bHT66bQAwxTUy2fpFRxe', 'youpi', '662442206', '533553553', '2018-02-01 11:08:11', '2018-02-01 11:08:11', 4, NULL, 'totomax.png', 1, 0);

-- --------------------------------------------------------

--
-- Structure de la table `utilisateurs_gps`
--

CREATE TABLE IF NOT EXISTS `utilisateurs_gps` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `lat` varchar(255) DEFAULT NULL,
  `log` varchar(255) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `heure` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `minute` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=55 ;

--
-- Contenu de la table `utilisateurs_gps`
--

INSERT INTO `utilisateurs_gps` (`id`, `lat`, `log`, `date`, `heure`, `createdAt`, `updatedAt`, `minute`) VALUES
(8, '3.8480325', '11.502075200000002', '2018-01-25 12:52:21', '13', '2018-01-25 12:52:21', '2018-01-25 12:52:21', '52'),
(28, '3.8480325', '11.502075200000002', '2018-01-25 13:35:28', '14', '2018-01-25 13:35:28', '2018-01-25 13:35:28', '35'),
(29, '3.8480325', '11.502075200000002', '2018-01-25 13:35:33', '14', '2018-01-25 13:35:33', '2018-01-25 13:35:33', '35'),
(30, '3.8480325', '11.502075200000002', '2018-01-25 13:35:38', '14', '2018-01-25 13:35:38', '2018-01-25 13:35:38', '35'),
(31, '3.8480325', '11.502075200000002', '2018-01-25 13:35:43', '14', '2018-01-25 13:35:43', '2018-01-25 13:35:43', '35'),
(32, '3.8480325', '11.502075200000002', '2018-01-25 13:35:48', '14', '2018-01-25 13:35:48', '2018-01-25 13:35:48', '35'),
(33, '3.8480325', '11.502075200000002', '2018-01-25 13:35:53', '14', '2018-01-25 13:35:53', '2018-01-25 13:35:53', '35'),
(34, '3.8480325', '11.502075200000002', '2018-01-25 13:35:58', '14', '2018-01-25 13:35:58', '2018-01-25 13:35:58', '35'),
(35, '3.8480325', '11.502075200000002', '2018-01-25 13:48:20', '14', '2018-01-25 13:48:20', '2018-01-25 13:48:20', '48'),
(36, '3.8480325', '11.502075200000002', '2018-01-25 13:48:25', '14', '2018-01-25 13:48:25', '2018-01-25 13:48:25', '48'),
(37, '4.0490236', '9.700467399999999', '2018-01-26 13:59:57', '14', '2018-01-26 13:59:57', '2018-01-26 13:59:57', '59'),
(38, '4.0490236', '9.700467399999999', '2018-01-26 14:00:02', '15', '2018-01-26 14:00:02', '2018-01-26 14:00:02', '0'),
(39, '4.0490236', '9.700467399999999', '2018-01-26 14:00:11', '15', '2018-01-26 14:00:11', '2018-01-26 14:00:11', '0'),
(40, '4.0490236', '9.700467399999999', '2018-01-26 14:00:15', '15', '2018-01-26 14:00:15', '2018-01-26 14:00:15', '0'),
(41, '4.0490236', '9.700467399999999', '2018-01-26 14:00:20', '15', '2018-01-26 14:00:20', '2018-01-26 14:00:20', '0'),
(42, '4.0490236', '9.700467399999999', '2018-01-26 14:00:24', '15', '2018-01-26 14:00:24', '2018-01-26 14:00:24', '0'),
(43, '4.0490236', '9.700467399999999', '2018-01-26 14:00:29', '15', '2018-01-26 14:00:29', '2018-01-26 14:00:29', '0'),
(44, '4.0490236', '9.700467399999999', '2018-01-26 14:00:33', '15', '2018-01-26 14:00:33', '2018-01-26 14:00:33', '0'),
(45, '4.0490236', '9.700467399999999', '2018-01-26 14:00:38', '15', '2018-01-26 14:00:38', '2018-01-26 14:00:38', '0'),
(46, '4.0490236', '9.700467399999999', '2018-01-26 14:00:47', '15', '2018-01-26 14:00:48', '2018-01-26 14:00:48', '0'),
(47, '4.0490477', '9.7004798', '2018-01-26 14:24:59', '15', '2018-01-26 14:24:59', '2018-01-26 14:24:59', '24'),
(48, '4.0490477', '9.7004798', '2018-01-26 14:25:03', '15', '2018-01-26 14:25:03', '2018-01-26 14:25:03', '25'),
(49, '4.0490477', '9.7004798', '2018-01-26 14:25:07', '15', '2018-01-26 14:25:07', '2018-01-26 14:25:07', '25'),
(50, '4.0490477', '9.7004798', '2018-01-26 14:25:12', '15', '2018-01-26 14:25:12', '2018-01-26 14:25:12', '25'),
(51, '4.0490477', '9.7004798', '2018-01-26 14:25:16', '15', '2018-01-26 14:25:16', '2018-01-26 14:25:16', '25'),
(52, '4.0490477', '9.7004798', '2018-01-26 14:25:21', '15', '2018-01-26 14:25:21', '2018-01-26 14:25:21', '25'),
(53, '4.0490477', '9.7004798', '2018-01-26 14:25:25', '15', '2018-01-26 14:25:25', '2018-01-26 14:25:25', '25'),
(54, '4.0490477', '9.7004798', '2018-01-26 14:25:30', '15', '2018-01-26 14:25:30', '2018-01-26 14:25:30', '25');

-- --------------------------------------------------------

--
-- Structure de la table `vehicules`
--

CREATE TABLE IF NOT EXISTS `vehicules` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `carte_grice_expire` varchar(255) DEFAULT NULL,
  `carte_grice_issue` varchar(255) DEFAULT NULL,
  `carte_grice_num` varchar(255) DEFAULT NULL,
  `carte_grise_place` varchar(255) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `code_gps` varchar(255) DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  `date_fabri` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `imatriculation` varchar(255) DEFAULT NULL,
  `lat` varchar(255) DEFAULT NULL,
  `lon` varchar(255) DEFAULT NULL,
  `num_chaisis` varchar(255) DEFAULT NULL,
  `photos_1` varchar(255) DEFAULT NULL,
  `photos_2` varchar(255) DEFAULT NULL,
  `photos_3` varchar(255) DEFAULT NULL,
  `photos_4` varchar(255) DEFAULT NULL,
  `photos_5` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `utilisateurId` int(11) DEFAULT NULL,
  `typesVehiculeId` int(11) DEFAULT NULL,
  `serieVehiculeId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `utilisateurId` (`utilisateurId`),
  KEY `typesVehiculeId` (`typesVehiculeId`),
  KEY `serieVehiculeId` (`serieVehiculeId`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Contenu de la table `vehicules`
--

INSERT INTO `vehicules` (`id`, `carte_grice_expire`, `carte_grice_issue`, `carte_grice_num`, `carte_grise_place`, `code`, `code_gps`, `color`, `date_fabri`, `description`, `imatriculation`, `lat`, `lon`, `num_chaisis`, `photos_1`, `photos_2`, `photos_3`, `photos_4`, `photos_5`, `createdAt`, `updatedAt`, `utilisateurId`, `typesVehiculeId`, `serieVehiculeId`) VALUES
(1, 'carte_grice_expire', 'douala', '123673', 'carte_grise_place', '123673125426', 'code_gps', 'date_fabri', 'description', 'imatriculation', 'lat', 'lon', 'num_chaisis', '125426', 'taxisvuesarriere.jpg', 'taxisvuesdroitjpg.jpg', 'taxisvuesface.jpg', 'taxisvuesgauche.jpg', '1', '2017-11-07 15:28:28', '2018-01-20 06:21:39', NULL, NULL, NULL),
(2, 'carte_grice_expire', 'lieeoeioz', 'carte_grice_num', 'carte_grise_place', 'carte_grice_num80909', 'code_gps', 'date_fabri', 'description', 'imatriculation', 'lat', 'lon', 'num_chaisis', '80909', 'taxisvuesarriere.jpg', 'taxisvuesdroitjpg.jpg', 'taxisvuesface.jpg', 'taxisvuesgauche.jpg', '1', '2017-11-07 15:52:03', '2018-01-20 06:22:34', NULL, NULL, 1),
(3, 'carte 23', 'carte_grice_issue', 'carte_grice_num', 'carte_grise_place', 'code', 'code_gps', 'date_fabri', 'description', 'imatriculation', 'lat', 'lon', 'num_chaisis', 'photos_1', 'taxisvuesarriere.jpg', 'taxisvuesdroitjpg.jpg', 'taxisvuesface.jpg', 'taxisvuesgauche.jpg', '1', '2017-11-07 16:22:41', '2017-11-07 18:22:02', NULL, 1, 1),
(4, 'dsdffq', 'fggdf', 'ghdh', 'dsgd', 'dfgsdfg', 'gfdgd', 'fdgdg', 'dgfd', 'gdgfdg', 'fdgdf', 'dfgdf', 'gdfgd', 'dgfdfgdg', 'taxisvuesarriere.jpg', 'taxisvuesdroitjpg.jpg', 'taxisvuesface.jpg', 'gdffgdtaxisvuesgauche.jpg', 'gfgd', '2017-11-07 18:32:36', '2017-11-07 18:32:36', NULL, 2, 2);

--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `chauffeurs_vehicules`
--
ALTER TABLE `chauffeurs_vehicules`
  ADD CONSTRAINT `chauffeurs_vehicules_ibfk_1` FOREIGN KEY (`vehiculeId`) REFERENCES `vehicules` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `chauffeurs_vehicules_ibfk_2` FOREIGN KEY (`chauffeurId`) REFERENCES `chauffeurs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `clients_vehicules`
--
ALTER TABLE `clients_vehicules`
  ADD CONSTRAINT `clients_vehicules_ibfk_1` FOREIGN KEY (`vehiculeId`) REFERENCES `vehicules` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `clients_vehicules_ibfk_2` FOREIGN KEY (`utilisateurId`) REFERENCES `utilisateurs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `clients_vehicules_ibfk_3` FOREIGN KEY (`chauffeurId`) REFERENCES `chauffeurs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `commander_taxes`
--
ALTER TABLE `commander_taxes`
  ADD CONSTRAINT `commander_taxes_ibfk_1` FOREIGN KEY (`utilisateurId`) REFERENCES `utilisateurs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `commander_taxes_ibfk_2` FOREIGN KEY (`vehiculeId`) REFERENCES `vehicules` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `serie_vehicules`
--
ALTER TABLE `serie_vehicules`
  ADD CONSTRAINT `serie_vehicules_ibfk_1` FOREIGN KEY (`marqueId`) REFERENCES `marques` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  ADD CONSTRAINT `utilisateurs_ibfk_1` FOREIGN KEY (`groupeId`) REFERENCES `groupes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `vehicules`
--
ALTER TABLE `vehicules`
  ADD CONSTRAINT `vehicules_ibfk_1` FOREIGN KEY (`utilisateurId`) REFERENCES `utilisateurs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `vehicules_ibfk_2` FOREIGN KEY (`typesVehiculeId`) REFERENCES `types_vehicules` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `vehicules_ibfk_3` FOREIGN KEY (`serieVehiculeId`) REFERENCES `serie_vehicules` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
