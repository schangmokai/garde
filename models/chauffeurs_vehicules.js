'use strict';
module.exports = function(sequelize, DataTypes) {

 var Chauffeurs_vehicules  = sequelize.define('chauffeurs_vehicules', {});

  Chauffeurs_vehicules.associate = models => {
    Chauffeurs_vehicules.belongsTo(models.vehicules);
    Chauffeurs_vehicules.belongsTo(models.chauffeurs);
  };

  return Chauffeurs_vehicules;

};