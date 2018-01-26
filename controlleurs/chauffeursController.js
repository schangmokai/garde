var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var base64url = require('base64url');
var model = require("../models");
var Sequelize = require('sequelize');
var errorCode = require("../configs/errorCode");
var formidable = require('formidable');
var fs = require('fs');
var config = require('../configs/config');
var Op = Sequelize.Op;


function getParams(query, name){
    try{
        if(undefined != query[name] && query[name] != null){
            return query[name];
        }
        return null;
    }catch(r){
        console.log(r);
    }
}



exports.add = function(req, res) {
    
    try{
            /*var connected = req.session.userInfo;
            if(undefined == connected && null == connected){
                res.json({ code: '101', message: errorCode[101],  data: {}});
                return;
            }*/

            var allowed = {
                "addres": true,
                "cni_date": true,
                "cni_expire": true,
                "cni_no": true,
                "cni_place": true,
                "cni_scan": true,
                "nom": true,
                "permis_cat": true,
                "permis_date": true,
                "permis_expire": true,
                "permis_no": true,
                "permis_place": true,
                "permis_scan": true,
                "prenom": true,
                "photos": true,
                "tel": true,
                "tel2": true
            }

            var data = {};
            var ready = false;

            var form = new formidable.IncomingForm();
             form.parse(req, function(err, fields, files){
                var oldpath = files.filetoupload.path;
                monfichier = fields.nom + files.filetoupload.name;
                var newpath = config.repertoireImageChauffeur + monfichier;
                fs.rename(oldpath, newpath, function(err){
                   if(err) throw err;

                    for(var key in fields){
                        if(undefined != allowed[key]){
                            data[key] = fields[key];
                            ready = true;
                        }
                    }
                    data["photos"] = monfichier;


                    var sequelize = model.chauffeurs.dbo;
                    if(ready){
                        
                        model.chauffeurs.create(data).then(created=>{
                            if(created != null){
                                res.redirect('/chauffeurs/listes');
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

           })
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
            "addres": true,
            "cni_date": true,
            "cni_expire": true,
            "cni_no": true,
            "cni_place": true,
            "cni_scan": true,
            "nom": true,
            "permis_cat": true,
            "permis_date": true,
            "permis_expire": true,
            "permis_no": true,
            "permis_place": true,
            "permis_scan": true,
            "prenom": true,
            "photos": true,
            "tel": true,
            "tel2": true
        }
        var data = {};
        var ready = false;


         var form = new formidable.IncomingForm();
             form.parse(req, function(err, fields, files){
                var oldpath = files.filetoupload.path;
                monfichier = fields.nom + files.filetoupload.name;
                data["photos"] = monfichier;
                var newpath = config.repertoireImageChauffeur + monfichier;
                fs.rename(oldpath, newpath, function(err){
                   if(err) throw err;

                    for(var key in fields){
                       
                        if(undefined != allowed[key]){
                              data[key] = fields[key];
                              ready = true;
                        }
                    }

                    data["photos"] = monfichier;
                    
                    var sequelize = model.chauffeurs.dbo;
                    if(ready){

                        model.chauffeurs.update(data,{
                            where:{
                                id:fields.id
                            }
                        }).then(created=>{
                            if(created != null){
                              res.redirect('/chauffeurs/listes');   
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

      })
     });

    }catch(r){f
        console.log(r);
        res.json({ code: '105', message: errorCode[105], data: {} });
    }
};

exports.deletes = function(req, res) {
    model.chauffeurs.sync({force: false}).then(() => {
          //Table created
        model.chauffeurs.destroy(
          { where: {id : req.body.id }}
        ).then(result => {
           res.redirect('/chauffeurs/listes');
        })
    });
};

exports.listes =  function(req, res) { 
    model.chauffeurs.findAll().then(result => {
        res.render('pages/chauffeurs', {todolist: result});  
      });  
};



exports.map =  function(req, res) { 
    res.render('pages/map');  
};


exports.chauffeurs =  function(req, res) { 
    var code = "code";
    model.chauffeurs_vehicules.findAll({
        attributes:[],
        include:[
            {
                model:model.chauffeurs,
                attributes:['nom', 'id']
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
       res.json({
                result: result,
                data: {}
       }); 
    });  
};
