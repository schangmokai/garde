/*var localStorage = require('localStorage');
var formidable = require('formidable');
var fs = require('fs');
var vehicules = require('../models/vehicules');


exports.listes =  function(req, res) {
	vehicules.findAll().then(result => {
        res.json(result);  
    }); 
};


exports.test = function(req, res) {
	 try{
          var username = req.body.username;
		  var password = req.body.password;
		  console.log(username  + " le mot de pass " + password);
	  }catch(error){
          console.log("error");
	  }
};*/
