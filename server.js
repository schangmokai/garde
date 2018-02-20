// server.js
// load the things we need
var express = require('express');
var formidable = require('formidable');
var fs = require('fs');
var mysql = require('mysql');
var path = require('path');
var app = express();
var liste = [];
var bodyParser = require('body-parser'); // Charge le middleware de gestion des paramètres
var urlencodedParser = bodyParser.urlencoded({ extended: true });
var server = require('http').createServer(app), ent = require('ent');

var http = require('http').Server(app);
var io = require('socket.io')(http);


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
var vehiculeApi = require('./api/vehiculeApi');
var chauffeurApi = require('./api/chauffeurApi');
var utilisateurApi = require('./api/utilisateurApi');

var config = require('./configs/config');
var dbContext = require("./models");

// get items from models 
var models = [];
for (var property in dbContext) {
  // register as options you can add { model: xxx, methods: ["get", "post"] }  
  // methods are (optional) defaults all registered ["get", "post", "put", "delete"]  
  models.push({ model: dbContext[property] });  
}

//app.use('/required', express.static('required'));

app.use(express.static(path.join(__dirname, 'www')));
app.use('/img',express.static(path.join(__dirname, 'www/img')));
app.use('/js',express.static(path.join(__dirname, 'www/js')));
app.use('/css',express.static(path.join(__dirname, 'www/css')));



const Sequelize = require('sequelize');

//var connexion = require('./models/connexion');
//var sequelize = connexion.sequelize();

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

var localStorage = require('localStorage');
var acceuils = require('./controlleurs/acceuilController');
var utilisateurs = require('./controlleurs/utilisateursController');
var groupes = require('./controlleurs/groupesController');
var types_vehicules = require('./controlleurs/types_vehiculesController');
/*var vehicules_gps = require('./controlleurs/vehicules_gpsController');
var commander_taxis = require('./controlleurs/commander_taxisController');*/
var chauffeurs = require('./controlleurs/chauffeursController');
var marques_vehicules = require('./controlleurs/marques_vehiculesController');
var serie_vehicules = require('./controlleurs/serie_vehiculesController');
var vehicules = require('./controlleurs/vehiculesController');


//var chauffeurss = require('./models/chauffeurs');

/*sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');

  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
 });*/

///chauffeurss.create("addres", "cni_date", "cni_expire", "cni_no", "cni_place", "cni_scan","nom", "permis_cat","permis_date", "permis_expire","permis_no", "permis_place","permis_scan","prenom","tel", "tel2");


app.use(function(req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});



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
	  database: "garde"
	  //database: "nodetest"
});

//******************************************************************************//
//******************************************************************************//
//                        page d'acceuil de notre application                   //
//******************************************************************************//
//******************************************************************************//


app.get('/', acceuils.acceuil);



//  gestion des utilisateurs cooooooooooooooooooooooooolllllllllllllllllllllllll


//******************************************************************************//
//******************************************************************************//
//                        ajouter un utilisateur                                //
//***************************************************************************** //
//******************************************************************************//


app.post('/utilisateurs/ajouter/', urlencodedParser, utilisateurs.add)


//******************************************************************************//
//******************************************************************************//
//                        modifier un utilisateur                               //
//******************************************************************************//
//******************************************************************************//


app.post('/utilisateurs/update/', urlencodedParser, utilisateurs.update)


//******************************************************************************//
//******************************************************************************//
//                        suprimer un utilisateur                               //
//******************************************************************************//
//******************************************************************************//

app.post('/utilisateurs/supprimer/', urlencodedParser, utilisateurs.deletes)




//******************************************************************************//
//******************************************************************************//
//                        liste des utilisateurs                                //
//******************************************************************************//
//******************************************************************************//


app.get('/utilisateurs/listes', utilisateurs.listes);



// nous passons a la gestion des groupes cooooooooooooooooooooooooolllllllllllllllllllllllll


//******************************************************************************//
//******************************************************************************//
//                        ajouter un groupes                                    //
//******************************************************************************//
//******************************************************************************//


app.post('/groupes/ajouter/', groupes.add)


//******************************************************************************//
//******************************************************************************//
//                        modifier un groupes                                   //
//******************************************************************************//
//******************************************************************************//



app.post('/groupes/update/', urlencodedParser, groupes.update)


//******************************************************************************//
//******************************************************************************//
//                        suprimer un groupes                                   //
//******************************************************************************//
//******************************************************************************//

app.post('/groupes/supprimer/', urlencodedParser, groupes.deletes)




//******************************************************************************//
//******************************************************************************//
//                        liste des groupes                                     //
//******************************************************************************//
//******************************************************************************//



app.get('/groupes/listes', groupes.listes);








// nous passons a la gestion des chauffeurs cooooooooooooooooooooooooolllllllllllllllllllllllll


//******************************************************************************//
//******************************************************************************//
//                        ajouter un chauffeurs                                    //
//******************************************************************************//
//******************************************************************************//


app.post('/chauffeurs/ajouter/', chauffeurs.add)


//******************************************************************************//
//******************************************************************************//
//                        modifier un chauffeurs                                   //
//******************************************************************************//
//******************************************************************************//



app.post('/chauffeurs/update/', urlencodedParser, chauffeurs.update)


//******************************************************************************//
//******************************************************************************//
//                        suprimer un groupes                                   //
//******************************************************************************//
//******************************************************************************//

app.post('/chauffeurs/supprimer/', urlencodedParser, chauffeurs.deletes)




//******************************************************************************//
//******************************************************************************//
//                        liste des groupes                                     //
//******************************************************************************//
//******************************************************************************//



app.get('/chauffeurs/listes', chauffeurs.listes);


app.get('/chauffeurs/chauffeurs', chauffeurs.chauffeurs);

app.get('/chauffeurs/map', chauffeurs.map);








// nous passons a la gestion des marques_vehicules cooooooooooooooooooooooooolllllllllllllllllllllllll


//******************************************************************************//
//******************************************************************************//
//                        ajouter un marques_vehicules                                    //
//******************************************************************************//
//******************************************************************************//


app.post('/marques_vehicules/ajouter/', marques_vehicules.add)


//******************************************************************************//
//******************************************************************************//
//                        modifier un marques_vehicules                                   //
//******************************************************************************//
//******************************************************************************//



app.post('/marques_vehicules/update/', urlencodedParser, marques_vehicules.update)


//******************************************************************************//
//******************************************************************************//
//                        suprimer un groupes                                   //
//******************************************************************************//
//******************************************************************************//

app.post('/marques_vehicules/supprimer/', urlencodedParser, marques_vehicules.deletes)




//******************************************************************************//
//******************************************************************************//
//                        liste des groupes                                     //
//******************************************************************************//
//******************************************************************************//



app.get('/marques_vehicules/listes', marques_vehicules.listes);






// nous passons a la gestion des serie_vehicules cooooooooooooooooooooooooolllllllllllllllllllllllll


//******************************************************************************//
//******************************************************************************//
//                        ajouter un serie_vehicules                                    //
//******************************************************************************//
//******************************************************************************//


app.post('/serie_vehicules/ajouter/', serie_vehicules.add)


//******************************************************************************//
//******************************************************************************//
//                        modifier un serie_vehicules                                   //
//******************************************************************************//
//******************************************************************************//



app.post('/serie_vehicules/update/', urlencodedParser, serie_vehicules.update)


//******************************************************************************//
//******************************************************************************//
//                        suprimer un serie_vehicules                                   //
//******************************************************************************//
//******************************************************************************//

app.post('/serie_vehicules/supprimer/', urlencodedParser, serie_vehicules.deletes)




//******************************************************************************//
//******************************************************************************//
//                        liste des serie_vehicules                                     //
//******************************************************************************//
//******************************************************************************//



app.get('/serie_vehicules/listes', serie_vehicules.listes);






// nous passons a la gestion des types_vehicules cooooooooooooooooooooooooolllllllllllllllllllllllll


//******************************************************************************//
//******************************************************************************//
//                        ajouter un types_vehicules                                    //
//******************************************************************************//
//******************************************************************************//


app.post('/types_vehicules/ajouter/', types_vehicules.add)


//******************************************************************************//
//******************************************************************************//
//                        modifier un types_vehicules                                   //
//******************************************************************************//
//******************************************************************************//



app.post('/types_vehicules/update/', urlencodedParser, types_vehicules.update)


//******************************************************************************//
//******************************************************************************//
//                        suprimer un types_vehicules                                   //
//******************************************************************************//
//******************************************************************************//

app.post('/types_vehicules/supprimer/', urlencodedParser, types_vehicules.deletes)




//******************************************************************************//
//******************************************************************************//
//                        liste des types_vehicules                                     //
//******************************************************************************//
//******************************************************************************//



app.get('/types_vehicules/listes', types_vehicules.listes);




// nous passons a la gestion des types_vehicules cooooooooooooooooooooooooolllllllllllllllllllllllll


//******************************************************************************//
//******************************************************************************//
//                        ajouter un types_vehicules                                    //
//******************************************************************************//
//******************************************************************************//



// nous passons a la gestion des vehicules cooooooooooooooooooooooooolllllllllllllllllllllllll


//******************************************************************************//
//******************************************************************************//
//                        ajouter un vehicules                                    //
//******************************************************************************//
//******************************************************************************//


app.post('/vehicules/ajouter/', vehicules.add)


//******************************************************************************//
//******************************************************************************//
//                        modifier un vehicules                                   //
//******************************************************************************//
//******************************************************************************//



app.post('/vehicules/update/', urlencodedParser, vehicules.update)


//******************************************************************************//
//******************************************************************************//
//                        suprimer un vehicules                                   //
//******************************************************************************//
//******************************************************************************//

app.post('/vehicules/supprimer/', urlencodedParser, vehicules.deletes)




//******************************************************************************//
//******************************************************************************//
//                        liste des vehicules                                     //
//******************************************************************************//
//******************************************************************************//



app.get('/vehicules/listes', vehicules.listes);





//******************************************************************************//
//******************************************************************************//
//                        login en action                                       //
//******************************************************************************//
//******************************************************************************//

app.post('/login', urlencodedParser, utilisateurs.login);

app.get('/logout', acceuils.logout);

app.get('/datchboard', acceuils.datchboard);


//app.get('/api/findChauffeurByCodeVehicule', chauffeurApi.findChauffeurByCodeVehicule);


app.post('/api/findChauffeurByCodeVehicule', chauffeurApi.findChauffeurByCodeVehicule);

app.post('/api/findClientByVehicule', chauffeurApi.findClientByVehicule);


app.post('/api/saveClientVehicule', chauffeurApi.saveClientVehicule);


app.post('/api/insertposition', utilisateurApi.insertposition);

app.post('/api/utilisateurs/logins', utilisateurApi.logins);

app.get('/api/utilisateurs/listesUserEnDanger', utilisateurApi.listesUserEnDanger);

app.post('/api/utilisateurs/signalerdanger', utilisateurApi.signalerdanger);





///////////////////////////////////////////////////////////////////////////////:
/**                                                                     ******/
/**                            Fin API                                  ******/
/**                                                                     ******/
//////////////////////////////////////////////////////////////////////////////:





app.use(function(req, res, next){
    res.render('pages/404');
})

app.listen(config.port);
console.log( config.port + ' is the magic port of SUPER GARDE !!!!');