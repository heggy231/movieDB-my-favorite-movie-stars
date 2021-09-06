const lookupActorID = async (actorNameStr) => {
  // Input: Actor's name in string format
  // Output: Look up movie db's actor id in number format
  const response = await fetch(
    `https://api.themoviedb.org/3/search/person?api_key=6a58b3d8272d36ba7d59905a29e8d6ba&query=${actorNameStr}`
  );
  const dataID = await response.json();
  console.log("actor id ====>", dataID.results[0].id); // 500 for Tom Cruise
  return dataID.results[0].id;
};

const findMovieListByMyFavoriteActor = async (actorNameStr) => {
  // input: Actor's name in string format
  // output: List of movies that my favorite actor
  //         casted in array of obj format

  // url needed to look up movie credits by my favorite actor
  // https://api.themoviedb.org/3/person/500/movie_credits?api_key=6a58b3d8272d36ba7d59905a29e8d6ba
  const myActorID = await lookupActorID(actorNameStr); // returns actorID
  const response = await fetch(
    `https://api.themoviedb.org/3/person/${myActorID}/movie_credits?api_key=6a58b3d8272d36ba7d59905a29e8d6ba`
  );
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
 * ex look how obj look like from movieList.cast result:
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
  // Output: list of movies that actor casted in
  const movieList = await findMovieListByMyFavoriteActor(actorNameStr); // returns array of obj [{…}, {…}, {…}, {…}, ...]
  // lists out movies
  document.getElementById("movie").innerHTML = `
    <ul>
      ${movieList.map((movie) => `<li>${movie.title}</li>`).join("")}
    </ul>
  `;
};

// get the user's favorite actor info
const actorNameStr = prompt(
  "Please Enter your favorite actor/actress name: ",
  "tom cruise"
);
displayMovieListByMyFavoriteActor(actorNameStr);

// function that accepts two actors and return one
//  of them played in more movies
const winnerOfMostPlayedAmongstTwoActors = async (actor1, actor2) => {
  let numberOfMoviesActor1PlayedIn = await findMovieListByMyFavoriteActor(
    actor1
  );

  let numberOfMoviesActor2PlayedIn = await findMovieListByMyFavoriteActor(
    actor2
  );

  if (
    numberOfMoviesActor1PlayedIn.length === numberOfMoviesActor2PlayedIn.length
  ) {
    alert(
      `It's a tie! ${actor1} and ${actor2} played in the same number of movies`
    );
  } else if (
    numberOfMoviesActor1PlayedIn.length > numberOfMoviesActor2PlayedIn.length
  ) {
    alert(`${actor1} won! ${actor1} played more movies than ${actor2}!`);
  } else {
    alert(`${actor2} won! ${actor2} played more movies than ${actor1}!`);
  }
};

// get two more actors info from the user for movie fight!
alert(`************* Now it's time for movie fight! *****************
Enter two of your favorite actors' names.
I will tell you which one of them played in more movies!
****************************************************`);
const getActor1NameForMovieFight = prompt(
  "Please Enter First actor/actress name: ",
  "tom cruise"
);
const getActor2NameForMovieFight = prompt(
  "Please Enter One More actor/actress name: ",
  "tom hanks"
);

winnerOfMostPlayedAmongstTwoActors(
  getActor1NameForMovieFight,
  getActor2NameForMovieFight
);
