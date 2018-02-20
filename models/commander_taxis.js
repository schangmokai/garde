'use strict';

module.exports = function(sequelize, DataTypes) {

    var Commander_taxis  = sequelize.define('commander_taxis', {
         date_debut: {type: DataTypes.STRING},
         date_fin: { type: DataTypes.STRING},
          iscommand: { type: DataTypes.STRING }, 
          lat_arrive: { type: DataTypes.STRING },
          lat_depart: { type: DataTypes.STRING },
          lon_depart: { type: DataTypes.STRING },
          lon_arrive: { type: DataTypes.STRING },
          point_depart: { type: DataTypes.STRING },
          point_arrive: { type: DataTypes.STRING }
    });


    Commander_taxis.associate = models => {
        Commander_taxis.belongsTo(models.utilisateur);
        Commander_taxis.belongsTo(models.vehicules);
    }


  

/*
exports.create = function(date_debut, date_fin, iscommand, lat_depart, lat_arrive, lon_depart, lon_arrive, point_depart, point_arrive , utilisateurId, vehiculeId){
  return Commander_taxis.sync({force: false}).then(() => {
  // Table created
    Commander_taxis.create({
      date_debut: date_debut,
      date_fin: date_fin,
      iscommand: iscommand,
      lat_depart: lat_depart,
      lat_arrive: lat_arrive,
      lon_depart: lon_depart,
      lon_arrive: lon_arrive,
      point_depart: point_depart,
      point_arrive: point_arrive,
      utilisateurId: utilisateurId,
      vehiculeId: vehiculeId
      
    });
  });
}


exports.update = function(date_debut, date_fin, iscommand, lat_depart, lat_arrive, lon_depart, lon_arrive, point_depart, point_arrive , utilisateurId, vehiculeId, id){

  return Commander_taxis.sync({force: false}).then(() => {
    // Table created
      Commander_taxis.update({
      date_debut: date_debut,
      date_fin: date_fin,
      iscommand: iscommand,
      lat_depart: lat_depart,
      lat_arrive: lat_arrive,
      lon_depart: lon_depart,
      lon_arrive: lon_arrive,
      point_depart: point_depart,
      point_arrive: point_arrive,
      utilisateurId: utilisateurId,
      vehiculeId: vehiculeId
      },
      { where: {id : id }}
    );
  });

}*/

exports.deletes = function(id){
  return Commander_taxis.sync({force: false}).then(() => {
    // Table created
      Commander_taxis.destroy(
      { where: {id : id }}
    );
  });

};

exports.findAll = function(){
    return Commander_taxis.findAll({ include: [ utilisateurs.Utilisateur(), vehicules.Vehicules()] });
};


  return Commander_taxis;

};