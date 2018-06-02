// Dependencies
// =============================================================
// Including packages for scraping
var cheerio = require("cheerio");
var request = require("request");
// Requiring the `Post` model for accessing the `Posts` collection
var Post = require("../userModel.js");

// Routes
// =============================================================
module.exports = function (app) {


  // Routes

  // Route for scraping the latest posts
  app.get("/scrape", function (req, res) {

    // Defining data object that I will fill from scraping the page
    let objects = [];
    let data = {
      title: [],
      link: []
    };
    // Make a request call to grab the HTML body from the site of your choice
    request("https://medium.freecodecamp.org/", function (error, response, html) {

      // Load the HTML into cheerio and save it to a variable
      var $ = cheerio.load(html);

      // Select these elements from the html and do something for each one
      $("div.section-inner").each(function (i, element) {
        // Get title for each post
        data.title.push($(element).find("h3").text());


      });

      // Select more elements from the html and do something for each one
      $("div.postArticle-readMore").each(function (i, element) {
        // Get links for each post
        data.link.push($(element).find("a").attr("href"));
      });
      // Organizing the data into several objects instead of two seperate arrays
      for (let i = 0; i < data.title.length; i++) {
        objects.push({
          title: data.title[i],
          link: data.link[i]
        })
      }
      // Saving this data into the database
      for (let i = 0; i < objects.length; i++) {
        // Create a new user using req.body
        let post = new Post(objects[i]);

        Post.create(post)
          .then(function (dbUser) {
            // If saved successfully, send the the new User document to the client
            // res.json(dbUser);
          })
          .catch(function (err) {
            // If an error occurs, send the error to the client
            res.json(err);
          });
      }
      // Responding to client with data
      res.json(objects);
    });

  });

  // Route for getting scraped data from the database
  app.get("/data", function(req, res){
    Post.find(function (err, posts) {
      if (err) return console.error(err);
      console.log(posts);
    })
    
    // res.send(data);
  });


  // Route to post our form submission to mongoDB via mongoose
  app.post("/submit", function (req, res) {
    // Create a new user using req.body
    let post = new Post(object[i]);

    Post.create(post)
      .then(function (dbUser) {
        // If saved successfully, send the the new User document to the client
        res.json(dbUser);
      })
      .catch(function (err) {
        // If an error occurs, send the error to the client
        res.json(err);
      });
  });

};
