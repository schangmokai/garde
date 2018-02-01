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



exports.login = function(req, res) {

  try{
    /*var connected = req.session.userInfo;
    if(undefined != connected && null != connected){
      res.json({ code: '400', message: errorCode[400],  data: {}, message:errorCode[400]});
      return;
    }*/

    var login = req.body.login;
    var password = req.body.password;
    console.log("============================ "+ login);
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
          console.log("le mokai : " +  utilisateurs);
          
          if(utilisateurs != null){

            bcrypt.compare(password, utilisateurs.password, function(err, crypted) {
              try{
                if(crypted){
                  delete utilisateurs.password;
                  delete utilisateurs.reccode;
                  //req.session.infosUtilisateur = utilisateurs;
                  res.redirect('/utilisateurs/listes');
                }else{
                  result.code = 102;
                  result.message = errorCode[102];
                  res.json(result);
                }
              }catch(r){
                console.log(r);
                res.json({ 
                  code: '105', message: errorCode[105], 
                      data: {}
                  });
              }
            });
          }else{
            res.json({ 
              code: '101', message: errorCode[101], 
              data: {}
            });
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
};

exports.logout = function(req, res) {
  req.session.destroy(function(err) {
    res.redirect('/login');
  });
};


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
                "cni_scan":true,
                "email": true,
                "login": true,
                "nom": true,
                "password": true,
                "prenom": true,
                "tel": true,
                "tel2": true,
                "groupeId": true,
                "image": true
            }

            var data = {};
            var ready = false;

            
            var monfichier = "";

             var form = new formidable.IncomingForm();
             form.parse(req, function(err, fields, files){
                var oldpath = files.filetoupload.path;
                monfichier = fields.nom + files.filetoupload.name;
                
                var newpath = config.repertoireImage + monfichier;
                fs.rename(oldpath, newpath, function(err){
                   if(err) throw err;

                    for(var key in fields){
                        if(undefined != allowed[key]){
                              data[key] = fields[key];
                              ready = true;
                        }
                    }
                    data["image"] = monfichier;
                    
                    var sequelize = model.utilisateur.dbo;
                    if(ready){

                        model.utilisateur.create(data).then(created=>{
                            if(created != null){
                                res.redirect('/utilisateurs/listes');
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
            "cni_scan":true,
            "email": true,
            "login": true,
            "nom": true,
            "prenom": true,
            "tel": true,
            "tel2": true,
            "groupeId": true,
            "image": true
        }
        var data = {};
        var ready = false;



        var monfichier = "";

         var form = new formidable.IncomingForm();
         form.parse(req, function(err, fields, files){
            var oldpath = files.filetoupload.path;
            monfichier = fields.nom + files.filetoupload.name;

            var newpath = config.repertoireImage + monfichier;
            fs.rename(oldpath, newpath, function(err){
               if(err) throw err;

                  for(var key in fields){
                        if(undefined != allowed[key]){
                              data[key] = fields[key];
                              ready = true;
                        }
                    }

                    data["image"] = monfichier;
                    var sequelize = model.groupes.dbo;

                    if(ready){
                        model.utilisateur.update(data,{
                            where:{
                                id:fields.id
                            }
                        }).then(created=>{
                            if(created != null){
                              res.redirect('/utilisateurs/listes');   
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

                  /*utilisateurs.create(fields.addres, fields.cni_date, fields.cni_expire, fields.cni_no, fields.cni_place, fields.cni_scan, fields.email, fields.login, fields.nom, fields.password, fields.prenom, fields.tel, fields.tel2, fields.groupeId, monfichier).then(result => {
                       res.redirect('/utilisateurs/listes');
                  });*/

            })
         });

    }catch(r){
        console.log(r);
        res.json({ code: '105', message: errorCode[105], data: {} });
    }
};

exports.deletes = function(req, res) {
   model.utilisateur.sync({force: false}).then(() => {
        //Table created
        model.utilisateur.destroy(
          { where: {id : req.body.id }}
        ).then(result => {
           res.redirect('/utilisateurs/listes');
        })
    });
};

exports.listes =  function(req, res) {
    model.utilisateur.findAll({ include: [ model.groupes ] }).then(result => {
         model.groupes.findAll().then(listgroupes => {
                res.render('pages/utilisateurs', {todolist: result, groupelist: listgroupes});  
         });   
    });  
};


function cryptPassword(password) {
    console.log("cryptPassword" + password);
    return new Promise(function(resolve, reject) {
      bcrypt.genSalt(10, function(err, salt) {
        // Encrypt password using bycrpt module
        if (err) return reject(err);

        bcrypt.hash(password, salt, null, function(err, hash) {
          if (err) return reject(err);
          return resolve(hash);
        });
      });
    });
}