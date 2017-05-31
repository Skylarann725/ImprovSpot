// Our scraping tools
var request = require("request");
var cheerio = require("cheerio");

var db = require("../models");

// Routes
// ======
module.exports = function(app, passport) {

    // A GET request to scrape the echojs website
    app.get("/scrape", function(req, res) {
        // First, we grab the body of the html with request
        request("http://www.improvopedia.com/improv-games", function(error, response, html) {
            //Check for error
            if (error) {
                throw error;
            }
            // Then, we load that into cheerio and save it to $ for a shorthand selector
            var $ = cheerio.load(html);
            // Now, we grab every h2 within an article tag, and do the following:
            $(".nav-stacked li").each(function(i, element) {

                // Saves an empty result object
                var result = {};

                // Add the text and href of every link, and save them as properties of the result object      
                result.link = $(this).find("a").attr("href");

                request("http://www.improvopedia.com" + result.link, function(error, response, html) {
                    if (error) {
                        throw error;
                    }
                    var $ = cheerio.load(html);
                    $(".well").each(function(i, element) {
                        result.title = $(this).find(".lead").text();
                        result.info = $(this).find(".lead").next().text();
                        result.tag = $(this).find("p a .label").text();


                        console.log(result);
                        // Using our Article model, creates a new entry
                        // This effectively passes the result object to the entry (and the title and link)

                        db.improv.create({
                            game_name: result.title,
                            instructions: result.info,
                            category: result.tag
                        }).then(function(data) {
                            console.log(data);
                        })
                    });
                });

            });

        });
        res.redirect("/");
    });

    app.get("/", function(req, res) {
        res.render("index");
    });

    app.get("/gamespot", function(req, res) {
        db.improv.findAll({}).then(function(data) {
            var hbsObject = {
                improvs: data
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

    app.post("/loginspot", passport.authenticate('local-signup', {
            successRedirect: "/",

            failureRedirect: "/loginspot"
        }

    ));
};
