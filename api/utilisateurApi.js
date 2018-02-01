/*var localStorage = require('localStorage');
var formidable = require('formidable');
var fs = require('fs');
var utilisateurs = require('../models/utilisateurs');


exports.listes =  function(req, res) {
	utilisateurs.findAll().then(result => {
        res.json(result);  
    }); 
};


exports.test = function(req, res) {
	  var user_id = req.param('id');
	  var token = req.param('token');
	  var geo = req.param('geo');  
	  res.send(user_id + ' ' + token + ' ' + geo);
};




exports.logins= function(req, res){ 
   var username = req.body.username;
   var password = req.body.password;  
   utilisateurs.findByLoginAndPassword(username, password).then(result => {
       	res.json(result);   
   });    
}*/



var formidable = require('formidable');
var fs = require('fs');
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var base64url = require('base64url');
var model = require("../models");
var Sequelize = require('sequelize');
var errorCode = require("../configs/errorCode");
var Op = Sequelize.Op;



exports.insertposition = function(req, res) {
    
    try{

            var allowed = {
                "lat": true,
                "log": true,
                "date": true,
                "heure": true,
                "minute": true
            }

            var data = {};
            var ready = false;
            for(var key in req.body){
                if(undefined != allowed[key]){
                    data[key] = req.body[key];
                    ready = true;
                }
            }
            var sequelize = model.utilisateurs_gps.dbo;
            if(ready){

                model.utilisateurs_gps.create(data).then(created=>{
                    if(created != null){

                        res.send({
                            code: '200', message: errorCode[200],
                            data: {}
                        }); 

                    }else{
                        res.json({
                            code: '202', message: errorCode[202],
                            data: {}
                        });
                    }
                }).catch(function(err){
                    res.json({ code: '105', message: errorCode[105], data: {} });
                });


            }else{
                res.json({
                    code: '202', message: errorCode[202],
                    data: {}
                });
            }
        }catch(r){
            console.log(r);
            res.json({ code: '105', message: errorCode[105], data: {} });
        }
};



exports.listesUserEnDanger = function(req, res) {
    model.utilisateur.findAll({ 
              attributes:['id' ,'nom', 'prenom', 'image', 'tel'],
              include: [ 
                {
                  model: model.groupes, 
                  attributes:[]
                } 
              ], 
              where:{
                    danger: 1
              }

      }).then(result => {
         res.send(result); 
    });  
};



exports.logins= function(req, res){ 
   try{
    /*var connected = req.session.userInfo;
    if(undefined != connected && null != connected){
      res.json({ code: '400', message: errorCode[400],  data: {}, message:errorCode[400]});
      return;
    }*/

    var login = req.body.login;
    var password = req.body.password;

    bcrypt.genSalt(10, function(err, salt) {
          // Encrypt password using bycrpt module
      try{
            if (err){
              res.json({ code: '105', message: errorCode[105],  data: {} });
              return;
            }
            model.utilisateur.find({
              where:{
                login:login
              }
            })

        .then(utilisateurs => {
          
          if(utilisateurs != null){

            bcrypt.compare(password, utilisateurs.password, function(err, crypted) {
              try{
                if(crypted){
                  delete utilisateurs.password;
                  delete utilisateurs.reccode;
                  console.log("correct");
                  res.send({code: '400', message: errorCode[400], id: utilisateurs.id, status: utilisateurs.status} )
                }else{
                  res.send({code: '102', message: errorCode[102]} )
                }
              }catch(r){
                console.log(r);
                res.send({code: '105', message: errorCode[105]} )              
              }
            });
          }else{
            res.send({code: '101', message: errorCode[101]} )    
          }
            }, error=>{
              console.log(error);
              res.json({ code: '105', message: errorCode[105],  data: {} });
            }); 
      }catch(r){
        console.log(r);
        res.json({ 
          code: '105', message: errorCode[105], 
          data: {}
        });
      }
      });
  }catch(r){
      console.log(r);
      res.json({ code: '105', message: errorCode[105],  data: {} });
  }
}

