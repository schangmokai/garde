var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var base64url = require('base64url');
var model = require("../models");
var Sequelize = require('sequelize');
var errorCode = require("../configs/errorCode");
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
                "date_debut": true,
                "date_fin": true,
                "iscommand": true,
                "lat_depart": true,
                "lat_arrive": true,
                "lon_depart": true,
                "lon_arrive": true,
                "point_depart": true,
                "point_arrive": true,
                "utilisateurId": true,
                "vehiculeId": true
            }

            var data = {};
            var ready = false;
            for(var key in req.body){
                if(undefined != allowed[key]){
                    data[key] = req.body[key];
                    ready = true;
                }
            }
            var sequelize = model.commander_taxis.dbo;
            if(ready){

                model.commander_taxis.create(data).then(created=>{
                    if(created != null){
                        res.redirect('/commander_taxis/listes');
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

exports.update = function(req, res) {
  try{
        /*var connected = req.session.userInfo;
        if(undefined == connected && null == connected){
            res.json({ code: '101', message: errorCode[101],  data: {}});
            return;
        }*/
        var allowed = {
            "date_debut": true,
            "date_fin": true,
            "iscommand": true,
            "lat_depart": true,
            "lat_arrive": true,
            "lon_depart": true,
            "lon_arrive": true,
            "point_depart": true,
            "point_arrive": true,
            "utilisateurId": true,
            "vehiculeId": true
        }
        var data = {};
        var ready = false;
        for(var key in req.body){
            if(undefined != allowed[key]){
                data[key] = req.body[key];
                ready = true;
            }
        }
        var sequelize = model.commander_taxis.dbo;
        if(ready){
            model.commander_taxis.update(data,{
                where:{
                    id:req.body.id
                }
            }).then(created=>{
                if(created != null){
                  res.redirect('/commander_taxis/listes');   
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

exports.deletes = function(req, res) {
    model.commander_taxis.sync({force: false}).then(() => {
          //Table created
        model.commander_taxis.destroy(
          { where: {id : req.body.id }}
        ).then(result => {
           res.redirect('/commander_taxis/listes');
        })
    });
};



model.utilisateur.findAll({ include: [ model.groupes ] }).then(result => {
         model.groupes.findAll().then(listgroupes => {
                res.render('pages/utilisateurs', {todolist: result, groupelist: listgroupes});  
         });   
    });  





exports.listes =  function(req, res) { 
    model.commander_taxis.findAll({ include: [ model.utilisateur, model.vehicules ] }).then(result => {
         model.utilisateur.findAll().then(listutilisateurs => {
               model.vehicules.findAll().then(listvehicules => {
                res.render('pages/commander_taxis', {todolist: result, listutilisateurs:listutilisateurs, listvehicules:listvehicules});
           });
        });   
      });  
};
