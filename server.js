// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var passport = require("passport");
var passportLocal = require("passport-local");
var session = require("express-session");
var bCrypt = require('bcrypt-nodejs');

// Our scraping tools
var request = require("request");
var cheerio = require("cheerio");

// Sets up the Express App
// =============================================================
var PORT = process.env.PORT || 8080;
var app = express();
var env = require('dotenv').load();

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: "application/vnd.api+json"}));

// For Passport

app.use(session({secret: 'keyboard cat', resave: true, saveUninitialized: true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions


// Static directory
app.use(express.static("./public"));

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

// Routes =============================================================

require("./routes/api_routes.js")(app, passport);
require("./routes/passport.js")(passport);

// Syncing our sequelize models and then starting our express app
db.sequelize.sync().then(function () {
    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
    });
});