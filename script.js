//create app movieArc to hold all methods

const movieArc = {};

movieArc.apiKey = "a106247c";

//collect user input

movieArc.collectInput = function() {
  $('.movieSearchForm').on('submit', function(event) {
    event.preventDefault();
    const userInput = $('#movieSearch').val();
  })
};

//Make ajax request with user input data

movieArc.getInfo = function() {
  $.ajax({
    url: "http://www.omdbapi.com/?",
    method: "GET",
    dataType: "json",
    data: {
      apikey: movieArc.apiKey,
      r: "json",
      s: "harry"
    }
  }).then(function(result) {
    console.log(result);
  });
};

//display the data on the page

movieArc.displayInfo = function() {};

//----------------------------------------------
//collect user input for the second*** time

movieArc.collectSecondInput = function() {};

//Make second ajax request with user input data for the second*** time

movieArc.getSecondInfo = function() {
  $.ajax({
    url: "http://www.omdbapi.com/?",
    method: "GET",
    dataType: "json",
    data: {
      apikey: movieArc.apiKey,
      r: "json",
      s: "",
      t: "The Godfather"
    }
  }).then(function(result) {
    console.log(result);
  });
};

//display the data on the page

movieArc.displaySecondInfo = function() {};

//-----------------------------------------------

//start app

movieArc.init = function() {
  movieArc.collectInput();
  movieArc.getInfo();
  movieArc.getSecondInfo();
};

//doc ready

$(function() {
  movieArc.init();
});
