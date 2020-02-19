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
          <button>
          <div class="testContainer">
            <div class="movieImage">
              <img src="${movie.Poster}" alt="">
            </div>
              <div class="movieText">
                <h2 class="movieTitle">${movie.Title}</h2>
                <p class="movieYear">${movie.Year}</p>
                <p class="overlayText">Click for more info</p>
              </div> 
          </div>
          </button>
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
    // if user doesn't fill out input alert them
    if (userInput == "") {
      alert("Please enter your desired keyword!")
      // when there is user input, call getInfo
    } else {
      movieArc.getInfo(userInput);
      $('body').css("background-image", "none");
      $("body").css("background-color", "black");
    }
    // clear out input field after search
    $('input').val("");
  });
};

//------------------------Second User Search and data display----------------------

//Make second ajax request based on movie selected by user
//  extract result which is an object
//  call displaySecondInfo function for result parameter
movieArc.getSecondInfo = function(parameter, currentMovie) {
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
    $(".movieDetails").remove();
    movieArc.displaySecondInfo(result, currentMovie);
  });
};

//collect second user input:
//  when the user select a movie to know more details
//     the title of the movie is stored in a variable named movieTitle
//     getSecondInfo function is called for movieTitle parameter

movieArc.collectSecondInput = function() {
  $(".firstResults").on("click", "li", function() {
    const currentMovie = this;
    const movieTitle = $(this).find("h2").text();
    movieArc.getSecondInfo(movieTitle, currentMovie);
  });
};

//display the data on the page
//     from the parameter display movie poster, details, and plot

movieArc.displaySecondInfo = function(data, currentMovie) {
  $(currentMovie).append(`
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
};

// change input placeholder text when px width is 550px
movieArc.changeInputText = function() {
  if ($(window).width() < 550 ) {
    console.log('550')
    $('input').attr('placeholder','Search...');
  } else if ($(window).width() > 551) {
    console.log('bigger!')
    $("input").attr("placeholder", "Search your desired movie...");
  }
}

//----------------------initializing the app-------------------------

//start app
movieArc.init = function() {
  movieArc.collectInput();
  movieArc.collectSecondInput();
  movieArc.changeInputText();
};

//document ready:trigger the init method
$(function() {
  movieArc.init();
});
