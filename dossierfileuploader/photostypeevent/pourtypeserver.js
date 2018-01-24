// server.js
// load the things we need
var express = require('express');
var formidable = require('formidable');
var fs = require('fs');
var mysql = require('mysql');
var app = express();
var liste = [];
var bodyParser = require('body-parser'); // Charge le middleware de gestion des paramètres
var urlencodedParser = bodyParser.urlencoded({ extended: true });
var server = require('http').createServer(app),
    ent = require('ent');
var Multer = require('multer');
app.set('view engine', 'ejs');
var estconnecte = 0;
var excel = require('excel4node');
// Create a new instance of a Workbook class
var workbook = new excel.Workbook();
// Add Worksheets to the workbook
var worksheet = workbook.addWorksheet('Sheet 1');
var worksheet2 = workbook.addWorksheet('Sheet 2');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var util = require('util');


// Create a reusable style
var style = workbook.createStyle({
  font: {
    size: 12
  },
});

const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 // no larger than 5mb, you can change as needed.
    }
});

app.use(function(req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

/*

CREATE TABLE customers (
    id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    nom VARCHAR(40) NOT NULL,
    prenom VARCHAR(40) NOT NULL,
    pays VARCHAR(40) NOT NULL,
    ville VARCHAR(40) NOT NULL,
    PRIMARY KEY (id)
)
ENGINE=INNODB;


*/

// use res.render to load up an ejs view file



//******************************************************************************//
//******************************************************************************//
//             informations de connnection a la base de données                 //
//******************************************************************************//
//******************************************************************************//


var con = mysql.createConnection({
	  host: "localhost",
	  user: "root",
	  password: "", 
	  database: "goevent"
	  //database: "nodetest"
});

//******************************************************************************//
//******************************************************************************//
//                        page d'acceuil de notre application                   //
//******************************************************************************//
//******************************************************************************//


app.get('/', function(req, res) {
	if(estconnecte==0){
		var j = 0;
        con.connect(function(err) {
			  if (err) throw err;
			  con.query("SELECT * FROM towns", function (err, result, fields) {
			    if (err) throw err;
			    res.render('pages/index', {todolist: result});
			  });
		});

		estconnecte = 1;
	}else{
		res.render('pages/index', {todolist: []});
	}
});

//******************************************************************************//
//******************************************************************************//
//                        ajouter un client                                     //
//******************************************************************************//
//******************************************************************************//


app.post('/towns/ajouter/', urlencodedParser, function(req, res) {
    console.log("moka partenaire est bien dans la place");
    if (req.body.nom != '') {

		  console.log("Connected!");
		  //var sql = "INSERT INTO customers (nom, prenom, pays, ville) VALUES ("+req.body.nom+", "+req.body.prenom+", "+req.body.pays+", "+req.body.ville+")";
		  var sql = "INSERT INTO towns (name, description) VALUES ('"+req.body.name+"', '"+req.body.description+"')";
		  con.query(sql, function (err, result) {
		    if (err) throw err;
		    console.log("1 record inserted");
		  });
		
    }
   res.redirect('/towns/listes');
})


//******************************************************************************//
//******************************************************************************//
//                        modifier un client                                    //
//******************************************************************************//
//******************************************************************************//


app.post('/towns/update/', urlencodedParser, function(req, res) {
    console.log("le mokai pros lexus " + req.body.id )
    if (req.body.nom != '') {

		  console.log("Connected!");
		  //var sql = "INSERT INTO customers (nom, prenom, pays, ville) VALUES ("+req.body.nom+", "+req.body.prenom+", "+req.body.pays+", "+req.body.ville+")";
		  var sql = "UPDATE towns  SET name= '"+req.body.name+"', description = '"+req.body.description+"' WHERE id='"+req.body.id+"'";
		  con.query(sql, function (err, result) {
		    if (err) throw err;
		    console.log("1 record inserted");
		  });
		
    }
   res.redirect('/towns/listes');
})


//******************************************************************************//
//******************************************************************************//
//                        suprimer un client                                    //
//******************************************************************************//
//******************************************************************************//

app.post('/towns/supprimer/', urlencodedParser, function(req, res) {
    console.log("le voila alors " + req.body.id);
    if (req.body.id != '') {
       var sql = "DELETE FROM towns WHERE id = '"+req.body.id+"'";
		  con.query(sql, function (err, result) {
		    if (err) throw err;
		    console.log("Number of records deleted: " + result.affectedRows);
		});
    }
    res.redirect('/towns/listes');
})




//******************************************************************************//
//******************************************************************************//
//                        liste des client                                      //
//******************************************************************************//
//******************************************************************************//


app.get('/towns/listes', function(req, res) {
	  con.query("SELECT * FROM towns", function (err, result, fields) {
	    if (err) throw err;
	    //var j = 1;
	     res.render('pages/towns', {todolist: result}); 
	    //res.json(result);
	  });
});





//******************************************************************************//
//******************************************************************************//
//                        Uploader un fichier au serveur                        //
//******************************************************************************//
//******************************************************************************//


app.post('/fileupload', function(req, res) {
    var form = new formidable.IncomingForm();
	    form.parse(req, function (err, fields, files) {
	      var oldpath = files.filetoupload.path;
	      var newpath = 'C:/nodejs/dossierfileuploader/' + files.filetoupload.name;
	      fs.rename(oldpath, newpath, function (err) {
	        if (err) throw err;
	        res.redirect('/about');
	        res.end();
	      });
    });

})







// nous passons a la gestion des groupes cooooooooooooooooooooooooolllllllllllllllllllllllll


//******************************************************************************//
//******************************************************************************//
//                        ajouter un groupes                                    //
//******************************************************************************//
//******************************************************************************//


app.post('/groupes/ajouter/', function(req, res) {

    if (req.body.nom != '') {
         var nomfichier="";
         var j= 0;
         var names = "", description="", nomfichierbd="";
         var form = new formidable.IncomingForm();
			    form.parse(req, function (err, fields, files) {
			     
			      var oldpath = files.filetoupload.path;
			      names = fields.name;
			      description = fields.description;
                  nomfichierbd =  names + files.filetoupload.name;
			      var newpath = 'C:/goevent/dossierfileuploader/icongroupe/' + nomfichierbd;
			      nomfichier = files.filetoupload.name;
			      //var sql = "INSERT INTO customers (nom, prenom, pays, ville) VALUES ("+req.body.nom+", "+req.body.prenom+", "+req.body.pays+", "+req.body.ville+")";
				  var sql = "INSERT INTO groupes (name, description, icon) VALUES ('"+names+"', '"+description+"', '"+nomfichierbd+"')";
				  con.query(sql, function (err, result) {
				    if (err) throw err;
				  });
		
			      fs.rename(oldpath, newpath, function (err) {
			        if (err) throw err;
			      });
		    });


    }
   res.redirect('/groupes/listes');

})


//******************************************************************************//
//******************************************************************************//
//                        modifier un groupes                                   //
//******************************************************************************//
//******************************************************************************//


app.post('/groupes/update/', urlencodedParser, function(req, res) {
    if (req.body.nom != '') {

         var nomfichier="";
         var j= 0;
         var names = "", description="", nomfichierbd="";
         var form = new formidable.IncomingForm();
			    form.parse(req, function (err, fields, files) {
			     
			      var oldpath = files.filetoupload.path;
			      names = fields.name;
			      description = fields.description;
                  nomfichierbd =  names + files.filetoupload.name;
			      var newpath = 'C:/goevent/dossierfileuploader/icongroupe/' + nomfichierbd;
			      nomfichier = files.filetoupload.name;
			      //var sql = "INSERT INTO customers (nom, prenom, pays, ville) VALUES ("+req.body.nom+", "+req.body.prenom+", "+req.body.pays+", "+req.body.ville+")";
				  var sql = "UPDATE groupes  SET name= '"+names+"', description = '"+description+"' , icon = '"+nomfichierbd+"' WHERE id='"+fields.id+"'";
				  con.query(sql, function (err, result) {
				    if (err) throw err;
				  });
		
			      fs.rename(oldpath, newpath, function (err) {
			        if (err) throw err;
			      });
		    });
		
    }
   res.redirect('/groupes/listes');
})


//******************************************************************************//
//******************************************************************************//
//                        suprimer un groupes                                   //
//******************************************************************************//
//******************************************************************************//

app.post('/groupes/supprimer/', urlencodedParser, function(req, res) {
    if (req.body.id != '') {
       var sql = "DELETE FROM groupes WHERE id = '"+req.body.id+"'";
		  con.query(sql, function (err, result) {
		    if (err) throw err;
		    console.log("Number of records deleted: " + result.affectedRows);
		});
    }
    res.redirect('/groupes/listes');
})




//******************************************************************************//
//******************************************************************************//
//                        liste des groupes                                     //
//******************************************************************************//
//******************************************************************************//


app.get('/groupes/listes', function(req, res) {
	  con.query("SELECT * FROM groupes", function (err, result, fields) {
	    if (err) throw err;
	    //var j = 1;
	     res.render('pages/groupes', {todolist: result}); 
	    //res.json(result);
	  });
});







// nous passons a la gestion des types d'evenements cooooooooooooooooooooooooolllllllllllllllllllllllll


//******************************************************************************//
//******************************************************************************//
//                        ajouter un type evenement                                    //
//******************************************************************************//
//******************************************************************************//


app.post('/typeevents/ajouter/', urlencodedParser, function(req, res) {
    if (req.body.nom != '') {




		 var nomfichier="";
         var j= 0;
         var status = "", description="", photos="", icon="", names="pourtype";
         var form = new formidable.IncomingForm();
			    form.parse(req, function (err, fields, files) {
			     
			      var oldpath1 = files.filetoupload1.path;
			      var oldpath2 = files.filetoupload2.path;
			      status = fields.status;
			      description = fields.description;
                  icon =  names + files.filetoupload1.name;
                  photos = names + files.filetoupload2.name;
			      var newpath1 = 'C:/goevent/dossierfileuploader/icontypeevent/' + icon;
			      var newpath2 = 'C:/goevent/dossierfileuploader/photostypeevent/' + photos;
			      //var sql = "INSERT INTO customers (nom, prenom, pays, ville) VALUES ("+req.body.nom+", "+req.body.prenom+", "+req.body.pays+", "+req.body.ville+")";
				  var sql = "INSERT INTO type_events (description, icon, photo, status) VALUES ('"+description+"', '"+icon+"' , '"+photos+"' , '"+status+"')";
				  con.query(sql, function (err, result) {
				    if (err) throw err;
				  });
		
			      fs.rename(oldpath1, newpath1, function (err) {
			        if (err) throw err;
			      });
			       fs.rename(oldpath2, newpath2, function (err) {
			        if (err) throw err;
			      });
		    });
		
    }
   res.redirect('/typeevents/listes');
})


//******************************************************************************//
//******************************************************************************//
//                        modifier un evenement                                 //
//******************************************************************************//
//******************************************************************************//


app.post('/typeevents/update/', urlencodedParser, function(req, res) {
    if (req.body.nom != '') {

		  console.log("Connected!");
		  //var sql = "INSERT INTO customers (nom, prenom, pays, ville) VALUES ("+req.body.nom+", "+req.body.prenom+", "+req.body.pays+", "+req.body.ville+")";
		  var sql = "UPDATE type_events  SET  description = '"+req.body.description+"' , icon = '"+req.body.icon+"' , photo = '"+req.body.photo+"' , status = '"+req.body.status+"'  WHERE id='"+req.body.id+"'";
		  con.query(sql, function (err, result) {
		    if (err) throw err;
		    console.log("1 record inserted");
		  });
		
    }
   res.redirect('/typeevents/listes');
})


//******************************************************************************//
//******************************************************************************//
//                        suprimer un evenement                                 //
//******************************************************************************//
//******************************************************************************//

app.post('/typeevents/supprimer/', urlencodedParser, function(req, res) {
    console.log("le voila alors " + req.body.id);
    if (req.body.id != '') {
       var sql = "DELETE FROM type_events WHERE id = '"+req.body.id+"'";
		  con.query(sql, function (err, result) {
		    if (err) throw err;
		    console.log("Number of records deleted: " + result.affectedRows);
		});
    }
    res.redirect('/typeevents/listes');
})




//******************************************************************************//
//******************************************************************************//
//                        liste des evenement                                   //
//******************************************************************************//
//******************************************************************************//


app.get('/typeevents/listes', function(req, res) {
	  con.query("SELECT * FROM type_events", function (err, result, fields) {
	    if (err) throw err;
	    //var j = 1;
	     res.render('pages/typeevents', {todolist: result}); 
	    //res.json(result);
	  });
});



// nous passons a la gestion des utilisateurs cooooooooooooooooooooooooolllllllllllllllllllllllll


//******************************************************************************//
//******************************************************************************//
//                        ajouter un utilisateur                                 //
//******************************************************************************//
//******************************************************************************//


app.post('/users/ajouter/', urlencodedParser, function(req, res) {
    if (req.body.nom != '') {

		  console.log("Connected!");
		  //var sql = "INSERT INTO customers (nom, prenom, pays, ville) VALUES ("+req.body.nom+", "+req.body.prenom+", "+req.body.pays+", "+req.body.ville+")";
		  var sql = "INSERT INTO users (email, firstname, groupe_id, lastname, password, phone, phone2, photo, status, username) VALUES ('"+req.body.email+"', '"+req.body.firstname+"' , '"+req.body.groupe_id+"', '"+req.body.lastname+"' , '"+req.body.password+"', '"+req.body.phone+"', '"+req.body.phone2+"' , '"+req.body.photo+"' , '"+req.body.status+"', '"+req.body.username+"')";
		  con.query(sql, function (err, result) {
		    if (err) throw err;
		    console.log("1 record inserted");
		  });
    }
   res.redirect('/users/listes');
})


//******************************************************************************//
//******************************************************************************//
//                        modifier un utilisateur                                //
//******************************************************************************//
//******************************************************************************//


app.post('/users/update/', urlencodedParser, function(req, res) {
    if (req.body.nom != '') {

		  console.log("Connected!");
		  //var sql = "INSERT INTO customers (nom, prenom, pays, ville) VALUES ("+req.body.nom+", "+req.body.prenom+", "+req.body.pays+", "+req.body.ville+")";
		  var sql = "UPDATE users  SET  email = '"+req.body.email+"' , firstname = '"+req.body.firstname+"' , groupe_id = '"+req.body.groupe_id+"' , lastname = '"+req.body.lastname+"' , password = '"+req.body.password+"' , phone = '"+req.body.phone+"' , phone2 = '"+req.body.phone2+"' , photo = '"+req.body.photo+"' , username = '"+req.body.username+"' , status = '"+req.body.status+"'  WHERE id='"+req.body.id+"'";
		  con.query(sql, function (err, result) {
		    if (err) throw err;
		    console.log("1 record inserted");
		  });
		
    }
   res.redirect('/users/listes');
})


//******************************************************************************//
//******************************************************************************//
//                        suprimer un utilisateur                                //
//******************************************************************************//
//******************************************************************************//

app.post('/users/supprimer/', urlencodedParser, function(req, res) {
    console.log("le voila alors " + req.body.id);
    if (req.body.id != '') {
       var sql = "DELETE FROM users WHERE id = '"+req.body.id+"'";
		  con.query(sql, function (err, result) {
		    if (err) throw err;
		    console.log("Number of records deleted: " + result.affectedRows);
		});
    }
    res.redirect('/users/listes');
})




//******************************************************************************//
//******************************************************************************//
//                        liste des utilisateurs                                //
//******************************************************************************//
//******************************************************************************//


app.get('/users/listes', function(req, res) {
	  var j=0, k=0;
	  var liste1 = [];
	  var liste2 = [];
	  con.query("SELECT * FROM users", function (err, result, fields) {
	    if (err) throw err;
	      liste1 = result;
	       j = 1;
	      con.query("SELECT * FROM groupes", function (err, result, fields) {
			    if (err) throw err;
			       liste2 = result;
			        k = 1;
			        if((j!=0)&&(k!=0)){
					  	res.render('pages/users', {todolist: liste1, groupelist:liste2}); 
					}
		  });	      
	 });
});



// nous passons a la gestion des fichier pour evenement cooooooooooooooooooooooooolllllllllllllllllllllllll


//******************************************************************************//
//******************************************************************************//
//                        ajouter un ficghier a un evenement                    //
//******************************************************************************//
//******************************************************************************//


app.post('/events/ajouter/', urlencodedParser, function(req, res) {
    if (req.body.nom != '') {

		  console.log("Connected!");
		  //var sql = "INSERT INTO customers (nom, prenom, pays, ville) VALUES ("+req.body.nom+", "+req.body.prenom+", "+req.body.pays+", "+req.body.ville+")";
		  var sql = "INSERT INTO events (user_id, type_event_id, town_id, titre, description, date_debut, date_fin, heure_debut, heure_fin, address_party, lon, lat,flyer) VALUES ('"+req.body.user_id+"', '"+req.body.type_event_id+"' , '"+req.body.town_id+"', '"+req.body.titre+"' , '"+req.body.description+"', '"+req.body.date_debut+"', '"+req.body.date_fin+"' , '"+req.body.heure_debut+"' , '"+req.body.heure_fin+"', '"+req.body.address_party+"', '"+req.body.lon+"', '"+req.body.lat+"', '"+req.body.flyer+"')";
		  con.query(sql, function (err, result) {
		    if (err) throw err;
		    console.log("1 record inserted");
		  });
    }
   res.redirect('/events/listes');
})


//******************************************************************************//
//******************************************************************************//
//                        modifier un events                                //
//******************************************************************************//
//******************************************************************************//


app.post('/events/update/', urlencodedParser, function(req, res) {
    if (req.body.nom != '') {

		  console.log("Connected!");
		  //var sql = "INSERT INTO customers (nom, prenom, pays, ville) VALUES ("+req.body.nom+", "+req.body.prenom+", "+req.body.pays+", "+req.body.ville+")";
		  var sql = "UPDATE events  SET  user_id = '"+req.body.user_id+"' , type_event_id = '"+req.body.type_event_id+"' , town_id = '"+req.body.town_id+"' , titre = '"+req.body.titre+"' , description = '"+req.body.description+"' , date_debut = '"+req.body.date_debut+"' , date_fin = '"+req.body.date_fin+"' , heure_debut = '"+req.body.heure_debut+"' , heure_fin = '"+req.body.heure_fin+"' , address_party = '"+req.body.address_party+"', lon = '"+req.body.lon+"' , lat = '"+req.body.lat+"' , flyer = '"+req.body.flyer+"'  WHERE id='"+req.body.id+"'";
		  con.query(sql, function (err, result) {
		    if (err) throw err;
		    console.log("1 record inserted");
		  });
		
    }
   res.redirect('/events/listes');
})


//******************************************************************************//
//******************************************************************************//
//                        suprimer un events                                //
//******************************************************************************//
//******************************************************************************//

app.post('/events/supprimer/', urlencodedParser, function(req, res) {
    console.log("le voila alors " + req.body.id);
    if (req.body.id != '') {
       var sql = "DELETE FROM events WHERE id = '"+req.body.id+"'";
		  con.query(sql, function (err, result) {
		    if (err) throw err;
		    console.log("Number of records deleted: " + result.affectedRows);
		});
    }
    res.redirect('/events/listes');
})




//******************************************************************************//
//******************************************************************************//
//                        liste des events                                //
//******************************************************************************//
//******************************************************************************//


app.get('/events/listes', function(req, res) {
	  var i=0, j=0, k=0, l=0;
	  var liste1 = [];
	  var liste2 = [];
	  var liste3 = [];
	  var liste4 = [];
	  con.query("SELECT * FROM events", function (err, result, fields) {
	    if (err) throw err;
	      liste1 = result;
	       i = 1;
	      con.query("SELECT * FROM users", function (err, result, fields) {
			    if (err) throw err;
			       liste2 = result;
			        j = 1;
			        con.query("SELECT * FROM type_events", function (err, result, fields) {
						    if (err) throw err;
						       liste3 = result;
						        k = 1;
						        con.query("SELECT * FROM towns", function (err, result, fields) {
									    if (err) throw err;
									       liste4 = result;
									        l = 1;
									        if((i!=0)&&(j!=0)&&(k!=0)&&(l!=0)){
											  	res.render('pages/events', {todolist: liste1, userslist:liste2, typeeventslist: liste3, townslist: liste4}); 
											}
								 });
					  });	
			        
		  });	      
	 });
});





app.listen(8080);
console.log('8080 is the magic port');