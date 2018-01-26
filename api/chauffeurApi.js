/*var localStorage = require('localStorage');
var formidable = require('formidable');
var fs = require('fs');
var chauffeurs = require('../models/chauffeurs');


exports.listes =  function(req, res) {
	chauffeurs.findAll().then(result => {
        res.json(result);  
    }); 
};


exports.test = function(req, res) {
	  var user_id = req.param('id');
	  var token = req.param('token');
	  var geo = req.param('geo');  
	  res.send(user_id + ' ' + token + ' ' + geo);
};*/

var formidable = require('formidable');
var fs = require('fs');
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var base64url = require('base64url');
var model = require("../models");
var Sequelize = require('sequelize');
var errorCode = require("../configs/errorCode");
var Op = Sequelize.Op;



exports.findChauffeurByCodeVehicule =  function(req, res) { 



    var code = req.body.code;

    model.chauffeurs_vehicules.findAll({
        attributes:[],
        include:[
            {
                model:model.chauffeurs,
                attributes:['nom','photos', 'id']
            },
            {
                model:model.vehicules,
                attributes:[],
                where:{
                    code: code
                },
                group: ['id']
            }
        ]
    }).then(result => {
       console.log("============================== " + result);
       res.send(result); 
    });  
};

