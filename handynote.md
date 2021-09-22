# Important links

- [MovieDB](https://www.themoviedb.org/) api general [overview](https://www.themoviedb.org/documentation/api)

- [MovieDB](https://www.themoviedb.org/) more detailed [api documentation for developers](https://developers.themoviedb.org/3/getting-started/introduction).

## Dissect API URL

`https://api.themoviedb.org/3/search/person?api_key=6a58b3d8272d36ba7d59905a29e8d6ba&query=${actorNameStr}`

- `https://api.themoviedb.org/3` is `base URL` and `/3` means version `3` of the moviedb database api.

- `/search/person` is endpoint to lookup actor’s ID. According to the [documentation](https://developers.themoviedb.org/3/search/search-people), required 2 parameters are `api_key` and `query` string for actor name.

- `api_key=6a58b3d8272d36ba7d59905a29e8d6ba` is key/value pair for my own `api key` required in order for me to request data from TMDB (The Movie DB) server.

- `query=${actorNameStr}` is query string. Example of this key/value pair is `query=meg%20ryan` for lookup actor ID for Meg Ryan.

<br>

`https://api.themoviedb.org/3/person/${myActorID}/movie_credits?api_key=6a58b3d8272d36ba7d59905a29e8d6ba`

- `https://api.themoviedb.org/3` is `base URL` and `/3` means version `3` of the moviedb database api.

- `/person/{person_id}/movie_credits` is endpoint to lookup actor’s ID that returns list of movies that my actor was casted. According to the [documentation](https://developers.themoviedb.org/3/people/get-person-movie-credits), required 2 parameters are `api_key` and `person_id` which is my actor’s TMDB's ID.

- `?` starting point of query string

- `api_key=6a58b3d8272d36ba7d59905a29e8d6ba` is key/value pair for my own `api key` required in order for me to request data from TMDB (The Movie DB) server.

## backlog for future releases:

1. Give user a menu to choose:

   1-1. Display my favorite actor's movie list
   1-2. Movie fight: Who played in most movies

2. Create unit tests for all functions in `movie.js`:
   2-1. create unit test for `lookupActorID`
   2-2. create unit test for `findMovieListByMyFavoriteActor`
   2-3. create unit test for `displayMovieListByMyFavoriteActor`
   2-4. create unit test for `winnerOfMostCastedActorAmongstTwoActors`

3. Replace `prompts` and `alerts` to a better UI a better visual-designed, more focused flow experience for the user.

4. Improve UI: better more visually appealing way to display this list of movies

5. Improve UI: User error catch: what if a user misspells an actor's name? (Can the UI be improved to prevent that from happening?)

   - UX approach to Make UI (helpful guide on how to better display this data):

     - (UX) Why would a user want to use this list of movies?

     - (UX) Why do they want this information? If you can answer these questions then that can .
