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
                attributes:['id'],
                where:{
                    code: code
                },
                group: ['id']
            }
        ]
    }).then(result => {
       res.send(result); 
    }); 

};

// permettre de recuperer les images d'un vehicule ainsi que les photos du chauffeur en cour.

exports.findClientByVehicule =  function(req, res) { 
    
    var utilisateurId = req.body.utilisateurId;
    
    model.clients_vehicules.findAll({
        attributes:[],
        include:[
            {
                model:model.chauffeurs,
                attributes:['nom','photos', 'id']
            },
            {
                model:model.vehicules,
                attributes:['imatriculation','photos_1','photos_2','photos_3', 'photos_4']
            },
            {
                model:model.utilisateur,
                attributes:[],
                where:{
                    id: utilisateurId,
                }
            }

        ],

        where:{
            status:1,
            createdAt: new Date()
        }

    }).then(result => {
       res.send(result); 
    }); 

};

//pour recupérer tous les clients actifs présent dans le vehcule a un instant précis

exports.findAllClientByVehiculeId =  function(req, res) { 
    
    var chauffeurId = req.body.chauffeurId;
    var vehiculeId = req.body.vehiculeId;
    
    
    model.clients_vehicules.findAll({
        attributes:[],
        include:[
            {
                model:model.chauffeurs,
                attributes:[],
                where:{
                    id: chauffeurId,
                }
            },
            {
                model:model.vehicules,
                attributes:[],
                where:{
                    id: vehiculeId,
                }
            },
            {
                model:model.utilisateur,
                attributes:["nom", "prenom", "image", "tel"]
            }

        ],

        where:{
            status:1
        }

    }).then(result => {
       console.log("le mokai pros");
       res.send(result); 
    }); 

};




exports.saveClientVehicule =  function(req, res) { 
    
     try{

            var allowed = {
                "vehiculeId": true,
                "chauffeurId": true,
                "utilisateurId": true
            }

            var data = {};
            var ready = false;
            for(var key in req.body){
                if(undefined != allowed[key]){
                    data[key] = req.body[key];
                    ready = true;
                }
            }

            data["status"] = 1;

            var sequelize = model.clients_vehicules.dbo;
            if(ready){

                model.clients_vehicules.create(data).then(created=>{
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

