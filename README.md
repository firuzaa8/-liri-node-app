
**# liri-node-app**
## Introduction
The LIRI BOT app is designed to take user inputs(action, value) in the Terminal and complete an those requests in the terminal.
1. The app is waiting for 2 particular user commands from the Terminal
    1. First command **action** is chosen from a list of 4 defined actions
        1. concert-this
        1. spotify-this-song
        1. movie-this
        1. do-what-it-says
    1. Second command **value** is defined by the user and represents corresponding to the **action** data.
        1. any band
        1. any song
        1. any movie
        1. any band, song, movie *as long as it is specified in the **random.txt** file*.
    1. The result will vary for different **actions**.
        1. consert-this/any band will display:
            1. name of the venue
            1. venue location
            1. date of the event
        1. spotify-this-song/any song will display:
            1. artist
            1. the song's name
            1. a link from Spotify to the preview
            1. the name of the album
        1. movie-this/any movie will display:
            1. title of the movie.
            1. year the movie came out.
            1. IMDB Rating of the movie.
            1. Rotten Tomatoes Rating of the movie.
            1. country where the movie was produced.
            1. language of the movie.
            1. plot of the movie.
            1. actors in the movie.
        1. do-what-it-says can display all of the above, as long as the **value** and the **action** are listed in the random.txt file.

        

    

## App Organization

