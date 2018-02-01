var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var i;

/**
 * Gestion des requêtes HTTP des utilisateurs en leur renvoyant les fichiers du dossier 'public'
 */
app.use('/', express.static(__dirname + '/public'));

/**
 * Liste des utilisateurs connectés
 */
var users = [];

/**
 * Historique des messages
 */
var messages = [];

/**
 * Liste des utilisateurs en train de saisir un message
 */
var typingUsers = [];
var loggedUser;

io.on('connection', function (socket) {

  /**
   * Réception de l'événement 'chat-message' et réémission vers tous les utilisateurs
   */
  socket.on('chat-message', function (message) {
      // On ajoute le username au message et on émet l'événement
      console.log("message");
      io.emit('chat-message', message);
      // Sauvegarde du message
      messages.push(message);
      if (messages.length > 150) {
        messages.splice(0, 1);
      }
    
  });

  /**
   * Réception de l'événement 'alert' et réémission vers tous les utilisateurs
   */
  socket.on('alert', function (message) {
      // On ajoute le username au message et on émet l'événement
      console.log(message.lat + " " + message.lon + " " + message.id_emetteur + " " + message.status)
      io.emit('alert', message);
      // Sauvegarde du message
      messages.push(message);
      if (messages.length > 150) {
        messages.splice(0, 1);
      }
    
  });

  /**
   * Réception de l'événement 'start-typing'
   * L'utilisateur commence à saisir son message
   */
  socket.on('start-typing', function () {
    // Ajout du user à la liste des utilisateurs en cours de saisie
    if (typingUsers.indexOf(loggedUser) === -1) {
      typingUsers.push(loggedUser);
    }
    io.emit('update-typing', typingUsers);
  });

  /**
   * Réception de l'événement 'stop-typing'
   * L'utilisateur a arrêter de saisir son message
   */
  socket.on('stop-typing', function () {
    var typingUserIndex = typingUsers.indexOf(loggedUser);
    if (typingUserIndex !== -1) {
      typingUsers.splice(typingUserIndex, 1);
    }
    io.emit('update-typing', typingUsers);
  });

});

/**
 * Lancement du serveur en écoutant les connexions arrivant sur le port 3000
 */
http.listen(3000, function () {
  console.log('Server is listening on *:3000');
});