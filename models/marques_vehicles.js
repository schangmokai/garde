'use strict';

module.exports = function(sequelize, DataTypes) {

var Marques  = sequelize.define('marques', {
     name: {type: DataTypes.STRING }
});


Marques.associate = models => {
    Marques.hasMany(models.serie_vehicules);
    Marques.map = [models.serie_vehicules];
};

  
 return Marques;


};



exports.findAll = function(){
    return Marques.findAll();
}

exports.delete = function(id){
   Marques.sync({force: false}).then(() => {
      //Table created
      Marques.destroy(
      { where: {id : id }}
    );
      return true;
   }).catch(function(err){
        return err;
   });
}

