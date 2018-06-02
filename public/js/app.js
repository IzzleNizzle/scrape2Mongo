$(document).ready(function () {





  if (document.URL.includes("saved")) {
    // if on saved page, only pull saved articles
    // print articles with comment option and 'delete from saved articles'
  } else {
    // if on home page, pull all articles
    // print articles with only 'save artice' option
  }







  // AJAX call to server to get data
  // GET AJAX call
  $.get('/api/data', function (data, status) {
    // if response is empty [], then do nothing
    // otherwise send data to be printed to dom
    if (data.length === 0) {
      // Do nothing
      console.log('The database is empty');
    } else {
      console.log('Successful AJAX call');
      console.log(data.length);

      printPosts(data);
    }
  });



});




// function that takes an object with link and title properties and prints to the dom as an article post

function printPosts(data) {
  // Creating Post HTML and Appending it to page for every object in the parameter Object
  for (let i = 0; i < data.length; i++) {
    // This functiont takes in a single JSON object for an article/headline
    // It constructs a jQuery element containing all of the formatted HTML for the
    // article panel
    let panel = $(
      [
        "<div class='panel panel-default'>",
        "<div class='panel-heading'>",
        "<h3>",
        "<a class='article-link' target='_blank' href='" + data[i].link + "'>",
        data[i].title,
        "</a>",
        "</h3>",
        "</div>",
        "<div class='panel-body'>",
        "<a class='btn btn-danger delete'>",
        "Delete From Saved",
        "</a>",
        "<a class='btn btn-info notes'>Article Notes</a>",
        "</div>",
        "</div>"
      ].join("")
    );
    // We attach the article's id to the jQuery element
    // We will use this when trying to figure out which article the user wants to remove or open notes for      
    panel.data("_id", data[i]._id);
    // We return the constructed panel jQuery element
    $('.main-articles').append(panel);

    console.log(data[i].comments[0]);
    
    // how to point at this data;
    // $('.btn').on('click', function() {console.log($(this).parents(".panel").data())})
  }

};





// AJAX call to scrape data from the server
// On click for the "Get News" button
$('#scrape-button').on('click', function () {

  // GET AJAX call
  $.get('/api/scrape');

  // activate modal, then refresh page after 3 seconds to activate the data to the page
  setTimeout(() => {
    location.reload();
  }, 3000);
  // turns modal on
  $('#myModal').modal();
})