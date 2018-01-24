-- phpMyAdmin SQL Dump
-- version 4.4.15.7
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Ven 29 Septembre 2017 à 17:04
-- Version du serveur :  5.6.36
-- Version de PHP :  7.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

CREATE DATABASE goevent;

USE goevent;


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `go_events`
--

-- --------------------------------------------------------

--
-- Structure de la table `abonnements`
--

CREATE TABLE IF NOT EXISTS `abonnements` (
  `id` int(2) NOT NULL,
  `user_id` int(2) NOT NULL,
  `follower_id` int(2) NOT NULL,
  `sms` smallint(1) NOT NULL,
  `mail` smallint(1) NOT NULL,
  `created` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='abonnements';

-- --------------------------------------------------------

--
-- Structure de la table `api_requests`
--

CREATE TABLE IF NOT EXISTS `api_requests` (
  `id` char(36) NOT NULL,
  `http_method` varchar(10) NOT NULL,
  `endpoint` varchar(2048) NOT NULL,
  `token` varchar(2048) DEFAULT NULL,
  `ip_address` varchar(50) NOT NULL,
  `request_data` longtext,
  `response_code` int(5) NOT NULL,
  `response_type` varchar(50) DEFAULT 'json',
  `response_data` longtext,
  `exception` longtext,
  `created` datetime NOT NULL,
  `modified` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `chats`
--

CREATE TABLE IF NOT EXISTS `chats` (
  `id` int(2) NOT NULL,
  `event_id` int(2) NOT NULL,
  `user_id` int(2) NOT NULL,
  `message` text NOT NULL,
  `file` text,
  `file_code` smallint(1) DEFAULT NULL,
  `lon` decimal(10,2) DEFAULT NULL,
  `lat` decimal(10,2) DEFAULT NULL,
  `created` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='chats';

-- --------------------------------------------------------

--
-- Structure de la table `events`
--

CREATE TABLE IF NOT EXISTS `events` (
  `id` int(2) NOT NULL,
  `user_id` int(2) NOT NULL,
  `type_event_id` int(2) NOT NULL,
  `town_id` int(2) NOT NULL,
  `titre` varchar(128) NOT NULL,
  `description` text,
  `date_debut` date NOT NULL,
  `heure_debut` time NOT NULL,
  `date_fin` date NOT NULL,
  `heure_fin` time DEFAULT NULL,
  `address_party` varchar(128) NOT NULL,
  `lon` decimal(10,2) DEFAULT NULL,
  `lat` decimal(10,2) DEFAULT NULL,
  `flyer` text,
  `modified` datetime DEFAULT NULL,
  `created` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='évènements';

-- --------------------------------------------------------

--
-- Structure de la table `files_events`
--

CREATE TABLE IF NOT EXISTS `files_events` (
  `id` int(2) NOT NULL,
  `event_id` int(2) NOT NULL,
  `titre` varchar(128) NOT NULL,
  `description` text,
  `name` varchar(128) NOT NULL,
  `size` bigint(4) NOT NULL,
  `type` varchar(128) NOT NULL,
  `path` text NOT NULL,
  `modified` datetime DEFAULT NULL,
  `created` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='type d''évènements';

-- --------------------------------------------------------

--
-- Structure de la table `groupes`
--

CREATE TABLE IF NOT EXISTS `groupes` (
  `id` int(2) NOT NULL,
  `name` varchar(128) NOT NULL,
  `description` text,
  `icon` varchar(128) DEFAULT NULL,
  `modified` datetime DEFAULT NULL,
  `created` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='groupes utilisateurs';

-- --------------------------------------------------------

--
-- Structure de la table `towns`
--

CREATE TABLE IF NOT EXISTS `towns` (
  `id` int(2) NOT NULL,
  `name` varchar(128) NOT NULL,
  `description` text,
  `modified` datetime DEFAULT NULL,
  `created` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='towns';

-- --------------------------------------------------------

--
-- Structure de la table `type_events`
--

CREATE TABLE IF NOT EXISTS `type_events` (
  `id` int(2) NOT NULL,
  `titre` varchar(128) NOT NULL,
  `description` text,
  `status` smallint(1) NOT NULL,
  `icon` varchar(128) DEFAULT NULL,
  `photo` varchar(128) DEFAULT NULL,
  `modified` datetime DEFAULT NULL,
  `created` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='type d''évènements';

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(2) NOT NULL,
  `username` char(32) NOT NULL,
  `groupe_id` int(2) NOT NULL,
  `password` varchar(128) NOT NULL,
  `firstname` varchar(128) DEFAULT NULL,
  `lastname` varchar(128) DEFAULT NULL,
  `email` varchar(128) DEFAULT NULL,
  `phone` varchar(128) DEFAULT NULL,
  `phone2` varchar(128) DEFAULT NULL,
  `photo` text,
  `status` smallint(1) NOT NULL,
  `modified` datetime DEFAULT NULL,
  `created` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='utilisateurs';

--
-- Index pour les tables exportées
--

--
-- Index pour la table `abonnements`
--
ALTER TABLE `abonnements`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_abonnements_users` (`user_id`),
  ADD KEY `fk_abonnements_users1` (`follower_id`);

--
-- Index pour la table `api_requests`
--
ALTER TABLE `api_requests`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `chats`
--
ALTER TABLE `chats`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_chats_events` (`event_id`),
  ADD KEY `fk_chats_users` (`user_id`);

--
-- Index pour la table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_events_users` (`user_id`),
  ADD KEY `fk_events_type_events` (`type_event_id`),
  ADD KEY `fk_events_towns` (`town_id`);

--
-- Index pour la table `files_events`
--
ALTER TABLE `files_events`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_files_events_events` (`event_id`);

--
-- Index pour la table `groupes`
--
ALTER TABLE `groupes`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `towns`
--
ALTER TABLE `towns`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `type_events`
--
ALTER TABLE `type_events`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_users_groupes` (`groupe_id`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `abonnements`
--
ALTER TABLE `abonnements`
  MODIFY `id` int(2) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `chats`
--
ALTER TABLE `chats`
  MODIFY `id` int(2) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(2) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `files_events`
--
ALTER TABLE `files_events`
  MODIFY `id` int(2) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `groupes`
--
ALTER TABLE `groupes`
  MODIFY `id` int(2) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `towns`
--
ALTER TABLE `towns`
  MODIFY `id` int(2) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `type_events`
--
ALTER TABLE `type_events`
  MODIFY `id` int(2) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(2) NOT NULL AUTO_INCREMENT;
--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `abonnements`
--
ALTER TABLE `abonnements`
  ADD CONSTRAINT `fk_abonnements_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `fk_abonnements_users1` FOREIGN KEY (`follower_id`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `chats`
--
ALTER TABLE `chats`
  ADD CONSTRAINT `fk_chats_events` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`),
  ADD CONSTRAINT `fk_chats_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `fk_events_towns` FOREIGN KEY (`town_id`) REFERENCES `towns` (`id`),
  ADD CONSTRAINT `fk_events_type_events` FOREIGN KEY (`type_event_id`) REFERENCES `type_events` (`id`),
  ADD CONSTRAINT `fk_events_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `files_events`
--
ALTER TABLE `files_events`
  ADD CONSTRAINT `fk_files_events_events` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`);

--
-- Contraintes pour la table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_users_groupes` FOREIGN KEY (`groupe_id`) REFERENCES `groupes` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
