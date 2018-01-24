'use strict';

module.exports = function(sequelize, DataTypes) {

var Groupes  = sequelize.define('groupes', {
     name: {type: DataTypes.STRING },
     description: { type: DataTypes.STRING }
});


Groupes.associate = models => {
    Groupes.hasMany(models.utilisateur);
    Groupes.map = [models.utilisateur];
};


//Groupes.hasMany(user.Users());

/*

exports.Groupes = function(){
  return Groupes;
}
  

exports.create = function(name, description){
  return Groupes.sync({force: false}).then(() => {
  // Table created
    Groupes.create({
      name: name,
      description: description
    });
  });
}


exports.update = function(name, description, id){
 return Groupes.sync({force: false}).then(() => {
    // Table created
      Groupes.update({
      name: name,
      description: description
      },
      { where: {id : id }}
    );
  });

}

exports.deletes = function(id){
  return Groupes.sync({force: false}).then(() => {
      //Table created
      Groupes.destroy(
      { where: {id : id }}
    );
  });

}

exports.findAll = function(){
    return Groupes.findAll();
}
*/
  

  return Groupes;

};



exports.findAll = function(){
    return Groupes.findAll();
}

exports.delete = function(id){
   Groupes.sync({force: false}).then(() => {
      //Table created
      Groupes.destroy(
      { where: {id : id }}
    );
      return true;
   }).catch(function(err){
        return err;
   });
}

