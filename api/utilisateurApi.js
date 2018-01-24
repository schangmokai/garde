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