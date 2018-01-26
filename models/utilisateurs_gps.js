'use strict';
module.exports = function(sequelize, DataTypes) {

 var Utilisateurs_gps  = sequelize.define('utilisateurs_gps', {
 	
 	lat: {type: DataTypes.STRING},
    log: {type: DataTypes.STRING},
    date: {type: DataTypes.DATE},
    heure: {type: DataTypes.STRING},
    minute: {type: DataTypes.STRING}

 });

  Utilisateurs_gps.associate = models => {
    Utilisateurs_gps.belongsTo(models.utilisateur);
  };

  return Utilisateurs_gps;

};