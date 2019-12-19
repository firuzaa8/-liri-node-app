require("dotenv").config();
var moment = require('moment');
moment().format();
var keys = require("./keys.js");
var action = process.argv[2];
var value = process.argv[3];

if (action == "do-what-it-says") {
    var fs = require("fs")
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        random = data.split(",")
        action = random[0];
        value = random[1];
        doAction();
    });
} else {
    doAction();
}

function doAction() {
    switch (action) {
        case "spotify-this-song":
            music();
            break;
        case "movie-this":
            movie();
            break;
        case "concert-this":
            concert();
            break;
        default:
            console.log("invalid command")


    }
}

function music() {
    var Spotify = require('node-spotify-api');
    var spotify = new Spotify(keys.spotify);

    if (value == undefined) {
        value = "The Sign - Ace of Base";
    }

    spotify.search({ type: 'track', query: value }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        var song = data.tracks.items[0];
        var artist = song.artists[0].name;
        var songName = song.name;
        var preview = song.preview_url;
        if (preview === null) {
            preview = "(not available)";
        }
        var album = song.album.name;
        console.log("--------------------------------------------------------------------------------------------------------------------------");
        console.log("--------------------------------------------------------------------------------------------------------------------------");
        console.log("Artist: " + artist);
        console.log("Title: " + songName);
        console.log("Album: " + album);
        console.log("Preview: " + preview);
        console.log("--------------------------------------------------------------------------------------------------------------------------");
        console.log("--------------------------------------------------------------------------------------------------------------------------");
    });

}
function concert() {
    var axios = require("axios");
    var queryUrl = "https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp";

    axios.get(queryUrl).then(
        function (data) {
            if (data.data.length == 0) {
                console.log("No events found");
            }

            for (i = 0; i < data.data.length; i++) {
                var date = moment(data.data.datetime).format("MM/DD/YYYY");
                console.log("---------------Event---------------");
                console.log("Venue:       " + data.data[i].venue.name);
                console.log("City:        " + data.data[i].venue.city);
                console.log("State:       " + data.data[i].venue.region);
                console.log("Event Date:  " + date);
                console.log("-----------------------------------");
            }

        })
        .catch(function (error) {
            if (error.data) {
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
}
function movie() {
    var axios = require("axios");
    if (value == undefined) {
        value = "Mr.Nobody";
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy";

    axios.get(queryUrl).then(
        function (data) {
            var rottenTomatoes = "No Rating";
            for (i = 0; i < data.data.Ratings.length; i++) {
                if (data.data.Ratings[i].Source === "Rotten Tomatoes") {
                    rottenTomatoes = data.data.Ratings[i].Value;
                    break;
                }
            }
            console.log("--------------------------------------------------------------------------------------------------------------------------");
            console.log("--------------------------------------------------------------------------------------------------------------------------");
            console.log("Title:                      " + data.data.Title);
            console.log("Year:                       " + data.data.Year);
            console.log("IMDB Rating:                " + data.data.imdbRating);
            console.log("Rotten Tomatoes Rating:     " + rottenTomatoes);
            console.log("Origin Country:             " + data.data.Country);
            console.log("Language of the Movie:      " + data.data.Language);
            console.log("Movie Plot:                 " + data.data.Plot);
            console.log("Actors:                     " + data.data.Actors);
            console.log("--------------------------------------------------------------------------------------------------------------------------");
            console.log("--------------------------------------------------------------------------------------------------------------------------");

        })
        .catch(function (error) {
            if (error.data) {
                console.log(error.data.data);
                console.log(error.data.status);
                console.log(error.data.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            console.log(error.config);
        });

}
