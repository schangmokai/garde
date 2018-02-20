'use strict';

module.exports = function(sequelize, DataTypes) {

  var Chauffeurs  = sequelize.define('chauffeurs', {

      addres: {type: DataTypes.STRING},
      cni_date: {type: DataTypes.STRING},
      cni_expire: {type: DataTypes.STRING}, 
      cni_no: {type: DataTypes.STRING},
      cni_place: { type: DataTypes.STRING},
      cni_scan: { type: DataTypes.STRING},
      nom: { type: DataTypes.STRING },
      permis_cat: { type: DataTypes.STRING },
      permis_date: { type: DataTypes.STRING },
      permis_expire: { type: DataTypes.STRING },
      permis_no: {type: DataTypes.STRING},
      permis_place: { type: DataTypes.STRING},
      permis_scan: {type: DataTypes.STRING}, 
      prenom: { type: DataTypes.STRING },
      photos: { type: DataTypes.STRING },
      tel: {type: DataTypes.STRING},
      tel2: {type: DataTypes.STRING}
     
    });


    Chauffeurs.associate = models => {
      Chauffeurs.hasMany(models.clients_vehicules);
      Chauffeurs.map = [models.clients_vehicules];
      Chauffeurs.hasMany(models.chauffeurs_vehicules);
      Chauffeurs.map = [models.chauffeurs_vehicules];
    }


      

/*exports.create = function(addres, cni_date, cni_expire, cni_no, cni_place, cni_scan,nom, permis_cat,permis_date, permis_expire,permis_no, permis_place,permis_scan,prenom,tel, tel2){
  return Chauffeurs.sync({force: false}).then(() => {
  // Table created
    Chauffeurs.create({
      addres: addres,
      cni_date: cni_date,
      cni_expire: cni_expire,
      cni_no: cni_no,
      cni_place: cni_place,
      cni_scan: cni_scan,
      nom: nom,
      permis_cat: permis_cat,
      permis_date: permis_date,
      permis_expire: permis_expire,
      permis_no: permis_no,
      permis_place: permis_place,
      permis_scan: permis_scan,
      prenom:prenom,
      tel: tel,
      tel2: tel2
    });
  });
}


/*

exports.update = function(addres, cni_date, cni_expire, cni_no, cni_place, cni_scan,nom, permis_cat,permis_date, permis_expire,permis_no, permis_place,permis_scan,prenom,tel, tel2, id){

  return Chauffeurs.sync({force: false}).then(() => {
    // Table created
      Chauffeurs.update({
      addres: addres,
      cni_date: cni_date,
      cni_expire: cni_expire,
      cni_no: cni_no,
      cni_place: cni_place,
      cni_scan: cni_scan,
      nom: nom,
      permis_cat: permis_cat,
      permis_date: permis_date,
      permis_expire: permis_expire,
      permis_no: permis_no,
      permis_place: permis_place,
      permis_scan: permis_scan,
      prenom:prenom,
      tel: tel,
      tel2: tel2
      },
      { where: {id : id }}
    );
  });

}

exports.deletes = function(id){
  return Chauffeurs.sync({force: false}).then(() => {
    // Table created
      Chauffeurs.destroy(
      { where: {id : id }}
    );
  });
}*/

exports.findAll = function(){
    return Chauffeurs.findAll();
} 

  return Chauffeurs;
}