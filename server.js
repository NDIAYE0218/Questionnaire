//** appel des module de base et initialisation de la variable port **// 
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
//** chemins vers configuration de la BD MongoDB **//
configDB=require('./config/base_de_données.js');
//chemins configuration creation nouveau questionnaire
require('./config/nouveauquestionnaire');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

mongoose.connect(configDB.url,{useMongoClient:true}); // connexion a la BD

require('./config/authentification')(passport); // chemin configuration authentification

//** appel des midleware de passport **//
app.use(morgan('dev')); 
app.use(cookieParser()); 
app.use(bodyParser()); 
app.set('view engine', 'ejs');

// required for passport
app.use(session({ secret: 'lidjentigorgolouboubakhabakhtchidjaminshalladinabakh' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//** Chemin vers configuration des route **//
require('./app/routes.js')(app, passport); 

//** lancement server **//
app.listen(port);
console.log('Lidjenti a démarrer et est accessible sur le port: ' + port);
