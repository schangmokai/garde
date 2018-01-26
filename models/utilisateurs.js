'use strict';
var bcrypt = require('bcrypt-nodejs');



module.exports = function(sequelize, DataTypes) {

 var Utilisateur  = sequelize.define('utilisateur', {
      addres: {type: DataTypes.STRING},
      cni_date: { type: DataTypes.STRING },
      cni_expire: { type: DataTypes.STRING },
      cni_no: { type: DataTypes.STRING },
      cni_place: { type: DataTypes.STRING },
      cni_scan: { type: DataTypes.STRING },
      email: { type: DataTypes.STRING },
      login: { type: DataTypes.STRING },
      nom: { type: DataTypes.STRING },
      password: { type: DataTypes.STRING },
      prenom: { type: DataTypes.STRING },
      image: { type: DataTypes.STRING },
      tel: { type: DataTypes.STRING },
      tel2: { type: DataTypes.STRING }
  });
     

  Utilisateur.associate = models => {
      Utilisateur.belongsTo(models.groupes);
      Utilisateur.hasMany(models.utilisateurs_gps);
      Utilisateur.map = [models.utilisateurs_gps];
  }


//picture.addTo(User);


   Utilisateur.beforeCreate(function(utilisateur, options) {
    return cryptPassword(utilisateur.password)
      .then(success => {
        utilisateur.password = success;
      })
      .catch(err => {
        if (err) console.log(err);
      });
  });
   

  function cryptPassword(password) {
    console.log("cryptPassword" + password);
    return new Promise(function(resolve, reject) {
      bcrypt.genSalt(10, function(err, salt) {
        // Encrypt password using bycrpt module
        if (err) return reject(err);

        bcrypt.hash(password, salt, null, function(err, hash) {
          if (err) return reject(err);
          return resolve(hash);
        });
      });
    });
  }


 return Utilisateur;

};

