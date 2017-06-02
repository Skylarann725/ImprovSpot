// Our scraping tools
var request = require("request");
var cheerio = require("cheerio");

var db = require("../models");

// Routes
// ======
module.exports = function(app, passport) {

// A GET request to scrape the echojs website
app.get("/scrape", function(req, res) {
    // First, we require the crawler npm package
    var Crawler = require("crawler");
    var c = new Crawler({
        maxConnections: 10,
        // This will be called for each crawled page
        callback: function(error, res, done) {
            if (error) {
                console.log(error);
            } else {
                var $ = res.$;
                // Now, we grab every line within the tag, and do the following:
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
                            // Adds all of the data to our database
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
            }
            done();
        }
    });
    // Queue a list of URLs
    c.queue(['http://www.improvopedia.com/improv-games', 'http://www.improvopedia.com/improv-games/2', 'http://www.improvopedia.com/improv-games/3', 
        'http://www.improvopedia.com/improv-games/4', 'http://www.improvopedia.com/improv-games/5', 'http://www.improvopedia.com/improv-games/6', 
        'http://www.improvopedia.com/improv-games/7', 'http://www.improvopedia.com/improv-games/8', 'http://www.improvopedia.com/improv-games/9', 
        'http://www.improvopedia.com/improv-games/10', 'http://www.improvopedia.com/improv-games/11']);

res.redirect("/");

});

app.get("/", function(req, res) {
    res.render("index");
});

app.get("/gamespot", function(req, res) {
    db.improv.findAll({order: ('avg_rating DESC')
}).then(function(data) {
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
    db.locations.findAll({}).then(function(data) {
        var hbsObject = {
            locations: data
        };
        res.render("findspot", hbsObject);
    });
});

app.get("/userspot", function(req, res) {
    res.render("userspot");
});

app.get("/loginspot", function(req, res) {
    res.redirect("/");
});

// app.post("/loginspot", passport.authenticate('local-signup', {
//         successRedirect: "/",

//         failureRedirect: "/loginspot"
//     }

// ));
};
