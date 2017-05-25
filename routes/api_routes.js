// Our scraping tools
var request = require("request");
var cheerio = require("cheerio");

var db = require("../models");

// Routes
// ======
module.exports = function(app) {
    // A GET request to scrape the echojs website
    app.get("/scrape", function(req, res) {
        // First, we grab the body of the html with request
        request("http://improvencyclopedia.org/index.html", function(error, response, html) {
            //Check for error
            if (error) {
                throw error;
            }
            // Then, we load that into cheerio and save it to $ for a shorthand selector
            var $ = cheerio.load(html);
            // Now, we grab every h2 within an article tag, and do the following:
            $(".details").each(function(i, element) {

                // Saves an empty result object
                var result = {};

                // Add the text and href of every link, and save them as properties of the result object
                result.link = $(this).find("ul li a").attr("href");

                // Using our Article model, creates a new entry
                // This effectively passes the result object to the entry (and the title and link)
                var entry = new Article(result);

                // Saves that entry to the db
                entry.save(function(err, doc) {
                    // Log any errors
                    if (err) {
                        console.log(err);
                    }
                    // Or log the doc
                    else {
                        console.log(doc);
                    }
                });

            });
            res.redirect("/");
        });
    });

};
