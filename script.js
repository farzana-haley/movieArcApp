//create app movieArc to hold all methods
const movieArc = {};

//API key
movieArc.apiKey = "a106247c";

//------------------------First User Search and data display----------------------

//Make first ajax request based on user input
//  extract result.Search which is an array
//    call displayInfo function for result.Search array

movieArc.getInfo = function(parameter) {
  $.ajax({
    url: "http://www.omdbapi.com/?",
    method: "GET",
    dataType: "json",
    data: {
      apikey: movieArc.apiKey,
      r: "json",
      s: parameter
    }
  }).then(function(result) {
    $(".firstDisplayContainer").empty();
    movieArc.displayInfo(result.Search);
  });
};

//display the data on the page
//     for each array element create an ul consisting an image, title and movie

movieArc.displayInfo = function(data) {
  data.forEach(function(movie) {
    $(".firstDisplayContainer").append(`
      <li class="resultsContainer">
        <div class="movieImage">
          <img src="${movie.Poster}" alt="">
        </div>
          <div class="movieText">
            <h2 class="movieTitle">${movie.Title}</h2>
            <p class="movieYear">${movie.Year}</p>
          </div>
      </li>
    `);
  });
};

//collect first user input:
//  when the user search for a movie:
//     the search term is stored in a variable named userInput
//     getInfo function is called for userInput parameter

movieArc.collectInput = function() {
  $(".movieSearchForm").on("submit", function(event) {
    event.preventDefault();
    const userInput = $("#movieSearch").val();
    movieArc.getInfo(userInput);
  });
};

//------------------------Second User Search and data display----------------------

//Make second ajax request based on movie selected by user
//  extract result which is an object
//  call displaySecondInfo function for result parameter
movieArc.getSecondInfo = function(parameter) {
  $.ajax({
    url: "http://www.omdbapi.com/?",
    method: "GET",
    dataType: "json",
    data: {
      apikey: movieArc.apiKey,
      r: "json",
      t: parameter,
      plot: "full"
    }
  }).then(function(result) {
    console.log(result);
    movieArc.displaySecondInfo(result);
  });
};

//collect second user input:
//  when the user select a movie to know more details
//     the title of the movie is stored in a variable named movieTitle
//     getSecondInfo function is called for movieTitle parameter

movieArc.collectSecondInput = function() {
  $(".firstResults").on("click", "li", function() {
    const movieTitle = $(this)
      .find("h2")
      .text();
    movieArc.getSecondInfo(movieTitle);
  });
};

//display the data on the page
//     from the parameter display movie poster, details, and plot

//<div class="secondResults">
// <div class="poster"></div>
//  <div class="movieDetails">
//   <div class="movieInfo"></div>
//   <div class="moviePlot"></div>
//  </div>
//</div>

movieArc.displaySecondInfo = function(data) {
  $(".secondResults").html(`

  <div class="poster">

    <img src=${data.Poster}>
  
  </div>

  <div class="movieDetails">
     <div class="movieInfo">
        <p> Rating: ${data.Ratings[0].Value} </p>
        <p> Director: ${data.Director} </p>
        <p> Actors: ${data.Actors} </p>
        <p> Runtime: ${data.Runtime} </p>
        <p> Genre: ${data.Genre} </p>
      </div>
      <div class="moviePlot">
        <p> ${data.Plot}</p>
      </div>
  </div>

  `);

  $(".mainContainer").addClass("secondResultContainer");

  $(".firstResults").addClass("firstContainerDesign");
  $(".secondResults").addClass("secondContainerDesign");

  // $(".poster").html(`<img src=${data.Poster}>`);
  // $(".movieInfo").html(`
  //   <p> Rating: ${data.Ratings[0].Value} </p>
  //   <p> Director: ${data.Director} </p>
  //   <p> Actors: ${data.Actors} </p>
  //   <p> Runtime: ${data.Runtime} </p>
  //   <p> Genre: ${data.Genre} </p>`);
  // $(".moviePlot").html(`<p> ${data.Plot}`);
};

//----------------------initializing the app-------------------------

//start app
movieArc.init = function() {
  movieArc.collectInput();
  movieArc.collectSecondInput();
};

//document ready:trigger the init method
$(function() {
  movieArc.init();
});
