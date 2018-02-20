'use strict';
module.exports = function(sequelize, DataTypes) {

 var Clients_vehicules  = sequelize.define('clients_vehicules', {
 	status: {type: DataTypes.INTEGER}
 });

  Clients_vehicules.associate = models => {
    Clients_vehicules.belongsTo(models.vehicules);
    Clients_vehicules.belongsTo(models.utilisateur);
    Clients_vehicules.belongsTo(models.chauffeurs);
  };

  return Clients_vehicules;

};