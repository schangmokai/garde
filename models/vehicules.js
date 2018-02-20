'use strict';
var bcrypt = require('bcrypt-nodejs');



module.exports = function(sequelize, DataTypes) {

 var Vehicules  = sequelize.define('vehicules', {

      carte_grice_expire: { type: DataTypes.STRING},
      carte_grice_issue: { type: DataTypes.STRING},
      carte_grice_num: { type: DataTypes.STRING }, 
      carte_grise_place: { type: DataTypes.STRING },
      code: { type: DataTypes.STRING },
      code_gps: { type: DataTypes.STRING },
      color: { type: DataTypes.STRING },
      date_fabri: { type: DataTypes.STRING },
      description: { type: DataTypes.STRING },
      imatriculation: { type: DataTypes.STRING },
      lat: { type: DataTypes.STRING },
      lon: { type: DataTypes.STRING },
      num_chaisis: { type: DataTypes.STRING },
      photos_1: { type: DataTypes.STRING },
      photos_2: { type: DataTypes.STRING},
      photos_3: { type: DataTypes.STRING },
      photos_4: { type: DataTypes.STRING },
      photos_5: { type: DataTypes.STRING }
});

  Vehicules.associate = models => {
    Vehicules.hasMany(models.chauffeurs_vehicules);
    Vehicules.map = [models.chauffeurs_vehicules];
    Vehicules.hasMany(models.clients_vehicules);
    Vehicules.map = [models.clients_vehicules];
  };

  

  return Vehicules;

};



 