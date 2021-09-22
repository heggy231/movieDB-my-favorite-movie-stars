const lookupActorID = async (actorNameStr) => {
  // Input: Actor's name in string format
  // Output: Look up movie db's actor id in number format
  const response = await fetch(
    `https://api.themoviedb.org/3/search/person?api_key=6a58b3d8272d36ba7d59905a29e8d6ba&query=${actorNameStr}`
  );
  // error handling
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const dataID = await response.json();
  console.log("actor id ====>", dataID.results[0].id); // actor id: 500 for Tom Cruise
  return dataID.results[0].id;
};

const findMovieListByMyFavoriteActor = async (actorNameStr) => {
  // Input: Actor's name in string format
  // Output: List of movies that my favorite actor
  //         casted in array of obj format

  // url needed to look up movie credits by my favorite actor
  // https://api.themoviedb.org/3/person/500/movie_credits?api_key=6a58b3d8272d36ba7d59905a29e8d6ba
  const myActorID = await lookupActorID(actorNameStr).catch((error) => {
    console.log(
      "There has been a problem with your fetch operation: " + error.message
    );
  }); // returns actorID

  const response = await fetch(
    `https://api.themoviedb.org/3/person/${myActorID}/movie_credits?api_key=6a58b3d8272d36ba7d59905a29e8d6ba`
  );
  // error handling
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const movieList = await response.json();
  console.log(
    "movie list that my favorite actor casted in =====>",
    movieList.cast
  );
  console.log(
    "number of movies my fav actor played in =====>",
    movieList.cast.length
  );

  return movieList.cast;
};

/**
 * ex of what `movieList.cast` data look like:
 * 1) data type: array of obj, [{…}, {…}, {…}, {…}, ...]
 * 2) each obj property:
 * adult: false
backdrop_path: "/vwCc9PP6xkSjnYsSl9lzTABhexe.jpg"
character: "Ray Ferrier"
credit_id: "52fe4213c3a36847f800226b"
genre_ids: (3) [12, 53, 878]
id: 74
order: 0
original_language: "en"
original_title: "War of the Worlds"
overview: "Ray Ferrier is a divorced dockworker and less-than-perfect father. Soon after his ex-wife and her new husband drop off his teenage son and young daughter for a rare weekend visit, a strange and powerful lightning storm touches down."
popularity: 29.57
poster_path: "/6Biy7R9LfumYshur3YKhpj56MpB.jpg"
release_date: "2005-06-28"
title: "War of the Worlds"
video: false
vote_average: 6.5
vote_count: 6393
 */

const displayMovieListByMyFavoriteActor = async (actorNameStr) => {
  // Input: Actor name in string
  // Output: List of movies that my favorite actor was casted in Array of obj format

  const movieList = await findMovieListByMyFavoriteActor(actorNameStr); // returns array of obj [{…}, {…}, {…}, {…}, ...]
  // lists out movies
  document.getElementById("movie").innerHTML = `
    <h2>Your favorite movie star ${actorNameStr.toUpperCase()}'s list of movies he/she/they/ze played in: </h2>
    <ul>
      ${movieList.map((movie) => `<li>${movie.title}</li>`).join("")}
    </ul>
  `;
};

// get the user's favorite actor info
// get two more actors info from the user for movie fight!
alert(`***** Welcome to My Favorite Movie Star App! ********
Enter your favorite actor's name.
I will tell you list of movies your favorite movie star played in!
************************************************************`);
const actorNameStr = prompt(
  "Please Enter your favorite actor/actress name: ",
  "Tom Cruise"
);
displayMovieListByMyFavoriteActor(actorNameStr).catch((error) => {
  console.log(
    "There has been a problem with your fetch operation: " + error.message
  );
});

const winnerOfMostCastedActorAmongstTwoActors = async (actor1, actor2) => {
  // Input: Two Actors' names in string
  // Output: Actor's name, one who played in most movies in string
  let numberOfMoviesActor1PlayedIn = await findMovieListByMyFavoriteActor(
    actor1
  ).catch((error) => {
    console.log(
      "There has been a problem with your fetch operation: " + error.message
    );
  });

  let numberOfMoviesActor2PlayedIn = await findMovieListByMyFavoriteActor(
    actor2
  ).catch((error) => {
    console.log(
      "There has been a problem with your fetch operation: " + error.message
    );
  });

  if (
    numberOfMoviesActor1PlayedIn.length === numberOfMoviesActor2PlayedIn.length
  ) {
    alert(
      `It's a tie! ${actor1.toUpperCase()} and ${actor2.toUpperCase()} played in the same number of movies (# of movies casted: ${
        numberOfMoviesActor1PlayedIn.length
      }).`
    );
  } else if (
    numberOfMoviesActor1PlayedIn.length > numberOfMoviesActor2PlayedIn.length
  ) {
    alert(
      `${actor1.toUpperCase()} won! ${actor1} (# of movies casted: ${
        numberOfMoviesActor1PlayedIn.length
      }) played ${
        numberOfMoviesActor1PlayedIn.length -
        numberOfMoviesActor2PlayedIn.length
      } more movies than ${actor2} (# of movies casted: ${
        numberOfMoviesActor2PlayedIn.length
      })!`
    );
  } else {
    alert(
      `${actor2.toUpperCase()} won! ${actor2} (# of movies casted: ${
        numberOfMoviesActor2PlayedIn.length
      }) played ${
        numberOfMoviesActor2PlayedIn.length -
        numberOfMoviesActor1PlayedIn.length
      } more movies than ${actor1} (# of movies casted: ${
        numberOfMoviesActor1PlayedIn.length
      })!`
    );
  }
};

// get two more actors info from the user for movie fight!
alert(`************* Now it's time for movie fight! *****************
Enter two of your favorite actors' names.
I will tell you which one of them played in more movies!
****************************************************`);
const getActor1NameForMovieFight = prompt(
  "Please Enter First actor/actress name: ",
  "Tom Cruise"
);
const getActor2NameForMovieFight = prompt(
  "Please Enter One More actor/actress name: ",
  "Tom Hanks"
);

winnerOfMostCastedActorAmongstTwoActors(
  getActor1NameForMovieFight,
  getActor2NameForMovieFight
).catch((error) => {
  console.log(
    "There has been a problem with your fetch operation: " + error.message
  );
});
