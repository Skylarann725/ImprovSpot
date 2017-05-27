// Our scraping tools
var request = require("request");
var cheerio = require("cheerio");

var db = require("../models");

// Routes
// ======
module.exports = function(app) {
    app.get("/", function(req, res) {
        res.render("index");
    });

    app.get("/gamespot", function(req, res) {
        db.improv.findAll({}).then(function(data) {
            var hbsObject = {
                game_info: data
            };
            console.log(hbsObject);
            res.render("gamespot", hbsObject);
        });
    });

    app.get("/toolspot", function(req, res) {
        res.render("toolspot");
    });

    app.get("/findspot", function(req, res) {
        res.render("findspot");
    });

    app.get("/userspot", function(req, res) {
        res.render("userspot");
    });

    app.get("/loginspot", function(req, res) {
        res.render("loginspot");
    });

    app.post("/gamespot", function(req, res) {
        db.improv.create({
            burger_name: req.body.name
        }).then(function() {
            res.redirect('/');
        });
    });

    app.post("/:id", function(req, res) {
        db.burger.update({
            'devoured': true
        }, {
            where: {
                id: req.params.id
            }
        }).then(function() {
            res.redirect("/");
        });

    });
};
