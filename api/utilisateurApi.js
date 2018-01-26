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

