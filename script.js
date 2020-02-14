//create app movieArc to hold all methods

const movieArc = {};

movieArc.apiKey = "a106247c";

//collect user input

movieArc.collectInput = function() {};

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

movieArc.getSecondInfo = function() {};

//display the data on the page

movieArc.displaySecondInfo = function() {};

//-----------------------------------------------

//start app

movieArc.init = function() {
  movieArc.getInfo();
};

//doc ready

$(function() {
  movieArc.init();
});
