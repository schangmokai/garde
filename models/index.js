'use strict';
var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename);
var config    = require(path.join(__dirname, '../configs/config.json'));
var logging = require("../plugin/sequelize-logging");
// placeholder for all 
var dbContext = {};
config.options.logging = function(msg){
  logging(msg);
}
// connect

try{

  var sequelize = new Sequelize(config.database, config.username,'', config.options);
  console.log("sucess de la connexion");
}catch(er){
  console.log(err);
}


// imports everything in this directory into entities and register relations later. 
fs.readdirSync(__dirname)
  .filter(function(f) {
    return (f.indexOf('.') !== 0) && (f !== basename) && (f.slice(-3) === '.js');
  })
  .forEach(function(f) {
    try{
      var model = sequelize.import(path.join(__dirname, f));
      model.dbo = sequelize;
      dbContext[model.name] = model;  
    }catch(r){
      console.log(f+"@@@@"+r);
    }
  });

// invoke associate methods on models 
Object.keys(dbContext)
  .forEach(function(key) {
    if(dbContext[key].associate) {
      // this will invoke our relationships 
      dbContext[key].associate(dbContext);
    }
  });
// sync context once 
sequelize.sync();
// exports 
module.exports = dbContext;