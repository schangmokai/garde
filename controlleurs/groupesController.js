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
                "name": true,
                "description": true
            }

            var data = {};
            var ready = false;
            for(var key in req.body){
                if(undefined != allowed[key]){
                    data[key] = req.body[key];
                    ready = true;
                }
            }
            var sequelize = model.groupes.dbo;
            if(ready){

                model.groupes.create(data).then(created=>{
                    if(created != null){
                        res.redirect('/groupes/listes');
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
            "name": true,
            "description": true
        }
        var data = {};
        var ready = false;
        for(var key in req.body){
            if(undefined != allowed[key]){
                data[key] = req.body[key];
                ready = true;
            }
        }
        var sequelize = model.groupes.dbo;
        if(ready){
            model.groupes.update(data,{
                where:{
                    id:req.body.id
                }
            }).then(created=>{
                if(created != null){
                  res.redirect('/groupes/listes');   
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
    model.groupes.sync({force: false}).then(() => {
          //Table created
        model.groupes.destroy(
          { where: {id : req.body.id }}
        ).then(result => {
           res.redirect('/groupes/listes');
        })
    });
};

exports.listes =  function(req, res) { 
	  model.groupes.findAll().then(result => {
        res.render('pages/groupes', {todolist: result});  
      });  
};
