var express = require ("express");
var exphbs = require("express-handlebars");

var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
//Scraping tools
var axios = require("axios");
var cheerio = require("cheerio");
// Require all models
//var db = require("./models");
var PORT = process.env.PORT || 3000;
// Initialize express
var app = express();

//  Middleware configuration

// use morgan logger for logging requests
app.use(logger("dev"));
// use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: false }));
// use express.static to serve the public folder as a static directory
app.use(express.static("public"));
// use express handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Database configuration with Mongoose
// connect to the Mongo DB
var databaseUri = 'mongodb://localhost/' + PORT;
if(process.env.MONGOD_URI){
    mongoose.connect(process.env.MONGOD_URI);
}else{
    mongoose.connect(databaseUri);
}
var db = mongoose.connection;

//Show errors
db.on('error', (err)=>{
    console.log('Mongoose Error: ', err)
});
// display successful connection when logged in via mongoose
db.once('open', () => {
    console.log('Mongoose connection successful.');
});

// Import of note and article models
var Note = require("./models/note");
var Article = require("./models/article");
// Import of controller
var router = require("./controllers/controller");
app.use('/', router);

// Launch application
 var port = process.env.PORT || 3000;
 app.listen(port, ()=>{
    console.log('Running on port: ' + port);
 });