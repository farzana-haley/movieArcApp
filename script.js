//create app movieArc to hold all methods

const movieArc = {};

movieArc.apiKey = "a106247c";

//Make ajax request with user input data

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
    movieArc.displayInfo(result.Search);
  });
};

//display the data on the page

movieArc.displayInfo = function(data) {
  data.forEach(function(movie) {
    $('ul').append(`
      <li>
        <div>
          <img src="${movie.Poster}" alt="">
        </div>
          <h2 class="movieTitle">${movie.Title}</h2>
          <p class="movieYear">${movie.Year}</p>
      </li>
    `);
    // const poster = $('<img>').attr('src', movie.Poster);
    // const title = $('<h2>').addClass('movieTitle').text(movie.Title);
    // const year = $('<p>').addClass('movieYear').text(movie.Year);
    // const movieItem = $('<div>').addClass('movieItem').append(poster, title, year);
    // $('.firstResults').append(movieItem);
  });

  


};
//collect user input

movieArc.collectInput = function() {
  $('.movieSearchForm').on('submit', function(event) {
    event.preventDefault();
    const userInput = $('#movieSearch').val();
    movieArc.getInfo(userInput);
  })
};



//----------------------------------------------
//Make second ajax request with user input data for the second*** time
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

//collect user input for the second*** time

movieArc.collectSecondInput = function() {
  $('.firstResults').on('click', 'li', function() {
    const movieTitle = $(this).find('h2').text();
    movieArc.getSecondInfo(movieTitle);
  });
};



//display the data on the page

movieArc.displaySecondInfo = function(data) {
  $('.poster').html(`<img src=${data.Poster}>`);
  $('.movieInfo').html(`
    <p> Rating: ${data.Ratings[0].Value} </p>
    <p> Director: ${data.Director} </p>
    <p> Actors: ${data.Actors} </p>
    <p> Runtime: ${data.Runtime} </p>
    <p> Genre: ${data.Genre} </p>`
  );
  $('.moviePlot').html(`<p> ${data.Plot}`);
};

//-----------------------------------------------

//start app

movieArc.init = function() {
  movieArc.collectInput();
  movieArc.collectSecondInput();
};

//doc ready

$(function() {
  movieArc.init();
});
