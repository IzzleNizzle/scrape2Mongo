$(document).ready(function () {

  // Which page am I on?
  if (document.URL.includes("saved")) {
    // if on saved page, only pull saved articles
    $.get('/api/saved', function (data, status) {
      // if response is empty [], then do nothing
      // otherwise send data to be printed to dom
      if (data.length === 0) {
        // Do nothing
        console.log('The database is empty');
      } else {
        // print articles with comment option and 'delete from saved articles'
        printSavedPosts(data);
      }
    });
  } else {
    // if on home page, pull all articles
    // AJAX call to server to get data
    $.get('/api/data', function (data, status) {
      // if response is empty [], then do nothing
      // otherwise send data to be printed to dom
      if (data.length === 0) {
        // Do nothing
        console.log('The database is empty');
      } else {
        printPosts(data);
      }
    });
  }




});




// function that takes an object with link and title properties and prints to the dom as an article post
// print articles with only 'save article' option
function printPosts(article) {
  // This functiont takes in a single JSON object for an article/headline
  // It constructs a jQuery element containing all of the formatted HTML for the
  // article panel
  for (let i = 0; i < article.length; i++) {
    let panel;
    // if saved property is true, do not print saved button
    if (article[i].saved) {
      panel = $(
        [
          "<div class='panel panel-default'>",
          "<div class='panel-heading'>",
          "<h3>",
          "<a class='article-link' target='_blank' href='" + article[i].link + "'>",
          article[i].title,
          "</a>",
          "<span class='glyphicon glyphicon-ok saved'>Saved</span>",
          "</h3>",
          "</div>",
          "<div class='panel-body'>",
          article[i].title,
          "</div>",
          "</div>"
        ].join("")
      );
    } else {
      panel = $(
        [
          "<div class='panel panel-default'>",
          "<div class='panel-heading'>",
          "<h3>",
          "<a class='article-link' target='_blank' href='" + article[i].link + "'>",
          article[i].title,
          "</a>",
          "<span class='btnSave save'>",
          "<a class='btn btn-success save'>",
          "Save Article",
          "</a>",
          "</span>",
          "</h3>",
          "</div>",
          "<div class='panel-body'>",
          article[i].title,
          "</div>",
          "</div>"
        ].join("")
      );
    }

    // We attach the article's id to the jQuery element
    // We will use this when trying to figure out which article the user wants to save
    panel.data("_id", article[i]._id);
    // We return the constructed panel jQuery element
    console.log(article.length)
    $('.main-articles').append(panel);

  }
  // console.log(data[i].comments[1]);

  // how to point at this data;
  // $('.btn').on('click', function() {console.log($(this).parents(".panel").data())})
  activateDOM();

};

// print articles with comment option and 'delete from saved articles'
function printSavedPosts(data) {
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

    // console.log(data[i].comments[1]);

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




function activateDOM() {
  // On click function for .save buttons to change to a checkmark when saved
  $('.btnSave').on('click', function () {
    // $(this).html("<span class='glyphicon glyphicon-ok saved'>Saved</span>");
    $(this).attr('class', 'glyphicon glyphicon-ok saved');
    $(this).text('Saved');
  })
}