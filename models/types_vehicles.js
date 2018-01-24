'use strict';

module.exports = function(sequelize, DataTypes) {

var Types_vehicules  = sequelize.define('types_vehicules', {
     name: {type: DataTypes.STRING },
     description: { type: DataTypes.STRING }
});


Types_vehicules.associate = models => {
    //Types_vehicules.hasMany(models.utilisateur);
   // Types_vehicules.map = [models.utilisateur];
};


//Types_vehicules.hasMany(user.Users());

/*

exports.Types_vehicules = function(){
  return Types_vehicules;
}
  

exports.create = function(name, description){
  return Types_vehicules.sync({force: false}).then(() => {
  // Table created
    Types_vehicules.create({
      name: name,
      description: description
    });
  });
}


exports.update = function(name, description, id){
 return Types_vehicules.sync({force: false}).then(() => {
    // Table created
      Types_vehicules.update({
      name: name,
      description: description
      },
      { where: {id : id }}
    );
  });

}

exports.deletes = function(id){
  return Types_vehicules.sync({force: false}).then(() => {
      //Table created
      Types_vehicules.destroy(
      { where: {id : id }}
    );
  });

}

exports.findAll = function(){
    return Types_vehicules.findAll();
}
*/
  

  return Types_vehicules;

};



exports.findAll = function(){
    return Types_vehicules.findAll();
}

exports.delete = function(id){
   Types_vehicules.sync({force: false}).then(() => {
      //Table created
      Types_vehicules.destroy(
      { where: {id : id }}
    );
      return true;
   }).catch(function(err){
        return err;
   });
}

