var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var base64url = require('base64url');
var model = require("../models");
var Sequelize = require('sequelize');
var errorCode = require("../configs/errorCode");
var formidable = require('formidable');
var fs = require('fs');
var config = require('../configs/config');
var qrCode = require('qrcode');
var toSJIS = require('qrcode/helper/to-sjis');
var Op = Sequelize.Op;






exports.add = function(req, res) {
    try{
            /*var connected = req.session.userInfo;
            if(undefined == connected && null == connected){
                res.json({ code: '101', message: errorCode[101],  data: {}});
                return;
            }*/


            var allowed = {
                "carte_grice_expire": true,
                "carte_grice_issue": true,
                "carte_grice_num": true,
                "carte_grise_place": true,
                "code_gps": true,
                "color": true,
                "date_fabri": true,
                "description": true,
                "imatriculation": true,
                "lat": true,
                "lon": true,
                "num_chaisis": true,
                "photos_1":true,
                "photos_2": true,
                "photos_3": true,
                "photos_4": true,
                "photos_5": true,
                "utilisateurId": true,
                "serieVehiculeId": true,
                "typesVehiculeId": true
            }

            var data = {};
            var ready = false;

            
            var monfichier = "";

            var form = new formidable.IncomingForm();
             form.parse(req, function(err, fields, files){
                /*var oldpath = files.filetoupload.path;
                monfichier = fields.nom + files.filetoupload.name;
                var newpath = config.repertoireImage + monfichier;
                fs.rename(oldpath, newpath, function(err){
                   if(err) throw err;*/

                    for(var key in fields){
                        if(undefined != allowed[key]){
                            data[key] = fields[key];
                            ready = true;
                        }
                    }

                    var  moncode = fields.carte_grice_num + fields.num_chaisis;

                    data["code"] = moncode;

                    qrCode.toDataURL(moncode, {toSJISFunc:toSJIS}, function(err, url){
    
                      var base64Data = url.replace(/^data:image\/png;base64,/,"");
                      require("fs").writeFile(config.repertoireQrcode + moncode + ".png", base64Data, 'base64', function(err){
                      console.log(err);
                      });
                    })

                    var sequelize = model.vehicules.dbo;
                    if(ready){

                        model.vehicules.create(data).then(created=>{
                            if(created != null){
                                res.redirect('/vehicules/listes');
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

                 // })
              });

        }catch(r){
            console.log(r);
            res.json({ code: '105', message: errorCode[105], data: {} });
        }
};




exports.update = function(req, res) {
   try{
        /*var connected = req.session.userInfo;
        if(undefined == connected && null == connected){
            res.json({ code: '101', message: errorCode[101],  data: {}});
            return;
        }*/
        var allowed = {
                "carte_grice_expire": true,
                "carte_grice_issue": true,
                "carte_grice_num": true,
                "carte_grise_place": true,
                "code_gps": true,
                "color": true,
                "date_fabri": true,
                "description": true,
                "imatriculation": true,
                "lat": true,
                "lon": true,
                "num_chaisis": true,
                "photos_1":true,
                "photos_2": true,
                "photos_3": true,
                "photos_4": true,
                "photos_5": true,
                "utilisateurId": true,
                "serieVehiculeId": true,
                "typesVehiculeId": true
        }
        var data = {};
        var ready = false;



        var monfichier = "";

         var form = new formidable.IncomingForm();
         form.parse(req, function(err, fields, files){
            /*var oldpath = files.filetoupload.path;
            monfichier = fields.nom + files.filetoupload.name;
            var newpath = config.repertoireImage + monfichier;
            fs.rename(oldpath, newpath, function(err){
               if(err) throw err;*/

                  for(var key in fields){
                        if(undefined != allowed[key]){
                            data[key] = fields[key];
                            ready = true;
                        }
                    }
               
                   var  moncode = fields.carte_grice_num + fields.num_chaisis;

                    data["code"] = moncode;

                    qrCode.toDataURL(moncode, {toSJISFunc:toSJIS}, function(err, url){
    
                      var base64Data = url.replace(/^data:image\/png;base64,/,"");
                      require("fs").writeFile(config.repertoireQrcode + moncode + ".png", base64Data, 'base64', function(err){
                      console.log(err);
                      });
                    })

                    var sequelize = model.groupes.dbo;

                    if(ready){
                        model.vehicules.update(data,{
                            where:{
                                id:fields.id
                            }
                        }).then(created=>{
                            if(created != null){
                              res.redirect('/vehicules/listes');   
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

                 

            //})
         });

    }catch(r){
        console.log(r);
        res.json({ code: '105', message: errorCode[105], data: {} });
    }
};

exports.deletes = function(req, res) {
   model.vehicules.sync({force: false}).then(() => {
        //Table created
        model.vehicules.destroy(
          { where: {id : req.body.id }}
        ).then(result => {
           res.redirect('/vehicules/listes');
        })
    });
};

exports.listes =  function(req, res) {

    model.vehicules.findAll().then(result => {
            model.serie_vehicules.findAll().then(listserie_vehicule => {
                  model.utilisateur.findAll().then(listutilisateurs => {
                       model.types_vehicules.findAll().then(listtypes_vehicules => {
                        res.render('pages/vehicules', {todolist: result, listutilisateurs: listutilisateurs, listserie_vehicule :listserie_vehicule , listtypes_vehicules:listtypes_vehicules });  
               }); 
           }); 
         });   
    });  
};


