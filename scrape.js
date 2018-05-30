// Using this template, the cheerio documentation,
// and what you've learned in class so far, scrape a website
// of your choice, save information from the page in a result array, and log it to the console.

var cheerio = require("cheerio");
var request = require("request");

// Make a request call to grab the HTML body from the site of your choice
request("https://medium.freecodecamp.org/", function(error, response, html) {
    // console.log(html);
  // Load the HTML into cheerio and save it to a variable
  // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
  var $ = cheerio.load(html);

  // An empty array to save the data that we'll scrape
  var results = [];

  // Select each element in the HTML body from which you want information.
  // NOTE: Cheerio selectors function similarly to jQuery's selectors,
  // but be sure to visit the package's npm page to see how it works
  $("div.section-inner").each(function(i, element) {
    // console.log(html);
    
    // var link = $(element).html();
    // var title = $(element).children().text();
    // var link = $(element).children().attr("href");
    // var imgLink = $(element).find("a").find("href").val();
    var title = $(element).find("h3").text();

    // console.log(title);

    // Save these results in an object that we'll push into the results array we defined earlier
    // results.push({
    //   // title: title,
    //   link: link
    // });
  });


  $("div.postArticle-readMore").each(function(i, element) {

    var link = $(element).find("a").attr("href");

    console.log(link);
  });
  

  // Log the results once you've looped through each of the elements found with cheerio
  console.log(results);

  // console.log($('script').length);

  // for (i = 0; i < $('script').length; i++) {
    
  //   console.log(parse($("script")[i]));
  // }
  
  






// console.log(html);












});
