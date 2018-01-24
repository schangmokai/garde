var localStorage = require('localStorage');
var formidable = require('formidable');
var fs = require('fs');

var estconnecte = 0;


exports.acceuil = function(req, res) {
	if(estconnecte==0){
		var j = 0;
        res.render('pages/index');
		estconnecte = 1;
	}else{
		res.render('pages/index');
	}
};


exports.logout = function(req, res) {
	  localStorage.setItem('myKey', "deconnexion");
      res.redirect('/');
};


exports.datchboard = function(req, res) {
	         res.render('pages/template');
}