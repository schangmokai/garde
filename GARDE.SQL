drop database if exists garde;

create database if not exists garde;
use garde;
# -----------------------------------------------------------------------------
#       table : groupes
# -----------------------------------------------------------------------------

create table if not exists groupes
 (
   id integer not null auto_increment ,
   name varchar(128) not null  ,
   description text not null  ,
   modified datetime null  ,
   created datetime not null  
   , primary key (id) 
 ) 
 comment = "groupes utilisateurs";

# -----------------------------------------------------------------------------
#       table : types_vehicles
# -----------------------------------------------------------------------------

create table if not exists types_vehicles
 (
   id integer not null auto_increment ,
   name varchar(128) not null  ,
   description text not null  ,
   modified datetime null  ,
   created datetime not null  
   , primary key (id) 
 ) 
 comment = "types de véhicule";

# -----------------------------------------------------------------------------
#       table : vehcules_gps
# -----------------------------------------------------------------------------

create table if not exists vehcules_gps
 (
   id bigint(4) not null auto_increment ,
   id_chauffeur bigint(4) not null  ,
   lon decimal(10,2) null  ,
   lat decimal(10,2) null  ,
   modified datetime null  ,
   created datetime not null  
   , primary key (id) 
 ) 
 comment = "localisation d'un tai";

# -----------------------------------------------------------------------------
#       table : alerts
# -----------------------------------------------------------------------------

create table if not exists alerts
 (
   id integer not null auto_increment ,
   id_emmettre_alert bigint(4) not null  ,
   status smallint not null  ,
   lon decimal(10,2) null  ,
   lat decimal(10,2) null  ,
   message varchar(128) not null  ,
   modified datetime null  ,
   created datetime not null  
   , primary key (id) 
 ) 
 comment = "alerts d'agression des utilisateurs";

# -----------------------------------------------------------------------------
#       table : chauffeurs
# -----------------------------------------------------------------------------

create table if not exists chauffeurs
 (
   id integer not null auto_increment ,
   nom varchar(128) null  ,
   prenom varchar(128) null  ,
   photos varchar(128) null  ,
   tel varchar(32) not null  ,
   tel2 varchar(32) null  ,
   cni_no varchar(128) not null  ,
   cni_place varchar(128) not null  ,
   cni_date date not null  ,
   cni_expire date not null  ,
   cni_scan varchar(128) not null  ,
   addres varchar(128) not null  ,
   permis_no varchar(128) not null  ,
   permis_cat varchar(2) not null  ,
   permis_date date not null  ,
   permis_expires date not null  ,
   permis_place varchar(128) not null  ,
   permis_scan varchar(128) not null  ,
   modified datetime null  ,
   created datetime not null  
   , primary key (id) 
 ) 
 comment = "chauffeur";

# -----------------------------------------------------------------------------
#       table : commander_taxis
# -----------------------------------------------------------------------------

create table if not exists commander_taxis
 (
   id integer not null auto_increment ,
   id_vehicule bigint(4) not null  ,
   id_commande integer null  ,
   id_utilisateur bigint(4) not null  ,
   point_depart varchar(128) null  ,
   point_arrive char(255) null  ,
   lon_depart bigint(4) null  ,
   lat_depart decimal(10,2) null  ,
   lon_arrive decimal(10,2) null  ,
   lat_arrive decimal(10,2) null  ,
   date_debut datetime not null  ,
   date_fin datetime null  ,
   iscommand smallint not null  ,
   status smallint not null  ,
   modified datetime null  ,
   created datetime not null  
   , primary key (id) 
 ) 
 comment = "commander_taxi";

# -----------------------------------------------------------------------------
#       table : commande_coast
# -----------------------------------------------------------------------------

create table if not exists commande_coast
 (
   id integer not null auto_increment ,
   montant decimal(13,2) not null  ,
   modified datetime null  ,
   created datetime not null  
   , primary key (id) 
 ) 
 comment = "cout des commandes de taxi";

# -----------------------------------------------------------------------------
#       table : marques_vehicles
# -----------------------------------------------------------------------------

create table if not exists marques_vehicles
 (
   id integer not null auto_increment ,
   name varchar(128) not null  ,
   modified datetime null  ,
   created datetime not null  
   , primary key (id) 
 ) 
 comment = "types de véhicule";

# -----------------------------------------------------------------------------
#       table : serie_vehicles
# -----------------------------------------------------------------------------

create table if not exists serie_vehicles
 (
   id integer not null auto_increment ,
   id_marque integer not null  ,
   name varchar(128) not null  ,
   modified datetime null  ,
   created datetime not null  
   , primary key (id) 
 ) 
 comment = "serie de véhicule";

# -----------------------------------------------------------------------------
#       table : vehicules
# -----------------------------------------------------------------------------

create table if not exists vehicules
 (
   id bigint(4) not null auto_increment ,
   id_serie_vehicule integer not null  ,
   id_types_vehiules integer not null  ,
   id_proprietaire_taxi bigint(4) not null  ,
   code varchar(128) not null  ,
   imatriculation varchar(128) not null  ,
   carte_grise_num varchar(128) not null  ,
   num_chasis varchar(128) not null  ,
   date_fabri date null  ,
   carte_grise_issue date null  ,
   carte_grise_expires date null  ,
   carte_grise_place varchar(128) null  ,
   color varchar(128) null  ,
   photo_1 varchar(128) not null  ,
   photo_2 varchar(128) not null  ,
   photo_3 varchar(128) not null  ,
   photo_4 varchar(128) not null  ,
   photo_5 varchar(128) null  ,
   description text null  ,
   lon decimal(10,2) null  ,
   lat decimal(10,2) null  ,
   code_gps varchar(128) null  ,
   modified datetime null  ,
   created datetime not null  
   , primary key (id) 
 ) 
 comment = "element permettant de repertorier les vehicules";

# -----------------------------------------------------------------------------
#       table : notifications
# -----------------------------------------------------------------------------

create table if not exists notifications
 (
   id integer not null auto_increment ,
   id_utilisateur bigint(4) not null  ,
   message varchar(256) not null  ,
   status smallint not null  ,
   modified datetime null  ,
   created datetime not null  
   , primary key (id) 
 ) 
 comment = "notification utilisaturs";

# -----------------------------------------------------------------------------
#       table : utilisateurs
# -----------------------------------------------------------------------------

create table if not exists utilisateurs
 (
   id bigint(4) not null auto_increment ,
   id_groupe integer not null  ,
   login char(255) not null  ,
   password char(255) null  ,
   nom varchar(128) null  ,
   prenom varchar(128) null  ,
   tel varchar(32) not null  ,
   tel2 varchar(32) null  ,
   email varchar(128) null  ,
   cni_no varchar(128) null  ,
   cni_place varchar(128) null  ,
   cni_date date null  ,
   cni_expire date null  ,
   cni_scan varchar(128) null  ,
   addres varchar(128) null  ,
   modified datetime null  ,
   created datetime not null  
   , primary key (id) 
 ) 
 comment = "utilisateur";

# -----------------------------------------------------------------------------
#       table : chauffeurs_vehicules
# -----------------------------------------------------------------------------

create table if not exists chauffeurs_vehicules
 (
   id bigint(4) not null  ,
   id_1 integer not null  ,
   status smallint not null  ,
   modified datetime null  ,
   created datetime not null  
   , primary key (id,id_1) 
 ) 
 comment = "";

# -----------------------------------------------------------------------------
#       table : recevoir_alerts
# -----------------------------------------------------------------------------

create table if not exists recevoir_alerts
 (
   id integer not null  ,
   id_1 bigint(4) not null  ,
   status smallint null  ,
   modified datetime null  ,
   created datetime not null  
   , primary key (id,id_1) 
 ) 
 comment = "receveoir alerts";


# -----------------------------------------------------------------------------
#       creation des references de table
# -----------------------------------------------------------------------------

alter table vehcules_gps 
  add foreign key fk_vehcules_gps_vehicules (id_chauffeur)
      references vehicules (id) ;


alter table alerts 
  add foreign key fk_alerts_utilisateurs (id_emmettre_alert)
      references utilisateurs (id) ;


alter table commander_taxis 
  add foreign key fk_commander_taxis_vehicules (id_vehicule)
      references vehicules (id) ;


alter table commander_taxis 
  add foreign key fk_commander_taxis_commande_coast (id_commande)
      references commande_coast (id) ;


alter table commander_taxis 
  add foreign key fk_commander_taxis_utilisateurs (id_utilisateur)
      references utilisateurs (id) ;


alter table serie_vehicles 
  add foreign key fk_serie_vehicles_marques_vehicles (id_marque)
      references marques_vehicles (id) ;


alter table vehicules 
  add foreign key fk_vehicules_serie_vehicles (id_serie_vehicule)
      references serie_vehicles (id) ;


alter table vehicules 
  add foreign key fk_vehicules_types_vehicles (id_types_vehiules)
      references types_vehicles (id) ;


alter table vehicules 
  add foreign key fk_vehicules_utilisateurs (id_proprietaire_taxi)
      references utilisateurs (id) ;


alter table notifications 
  add foreign key fk_notifications_utilisateurs (id_utilisateur)
      references utilisateurs (id) ;


alter table utilisateurs 
  add foreign key fk_utilisateurs_groupes (id_groupe)
      references groupes (id) ;


alter table chauffeurs_vehicules 
  add foreign key fk_chauffeurs_vehicules_vehicules (id)
      references vehicules (id) ;


alter table chauffeurs_vehicules 
  add foreign key fk_chauffeurs_vehicules_chauffeurs (id_1)
      references chauffeurs (id) ;


alter table recevoir_alerts 
  add foreign key fk_recevoir_alerts_alerts (id)
      references alerts (id) ;


alter table recevoir_alerts 
  add foreign key fk_recevoir_alerts_utilisateurs (id_1)
      references utilisateurs (id) ;

