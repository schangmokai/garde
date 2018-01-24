'use strict';

module.exports = function(sequelize, DataTypes) {

var Serie_vehicules  = sequelize.define('serie_vehicules', {
     name: {type: DataTypes.STRING }
});


Serie_vehicules.associate = models => {
    Serie_vehicules.belongsTo(models.marques);
}

  
 return Serie_vehicules;

 
};



exports.findAll = function(){
    return Serie_vehicules.findAll();
}



exports.delete = function(id){
   Serie_vehicules.sync({force: false}).then(() => {
      //Table created
      Serie_vehicules.destroy(
      { where: {id : id }}
    );
      return true;
   }).catch(function(err){
        return err;
   });
}

