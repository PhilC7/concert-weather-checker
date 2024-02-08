$(document).ready(function () {

/********************
APIS
********************/
var weatherKey = "7a91cf58326cd6da40050bda09317cd6";
var eventAPI = "a1xNaECtJW1ZqG3CbA6rC75l1QJMc15f";


/********************
GLOBAL VARIABLES
********************/
var artistName = ''; //change to take input value.
var history = []; //declate empty array for local storage

/********************
Display Event Function
********************/
function displayEvent(e) {

    $("#show-event").empty();
    // set value of artists name for the search
    artistName = $("#input_name").val() || artistName;
    artist = artistName.replace(/\s/g, ''); //ignore all spacing from user input

    // fetch data from ticket master api then weather api
    var eventURL = `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=GB&keyword=${artist}&apikey=${eventAPI}`;
    fetch(eventURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (eventData) {

            //get event location
            var eventCity = eventData._embedded.events[2]._embedded.venues[0].city.name;

            // get event venue
            var eventVenue = eventData._embedded.events[2]._embedded.venues[0].name;

            // get event date
            var eventDate = eventData._embedded.events[2].dates.start.localDate;
            var formatDay = dayjs(eventDate).format("DD/MM/YYYY"); // format the event date

            // get image of artist
            var artistImg = eventData._embedded.events[2].images[4].url;

            // fetch data for today's forecast using location from event location
            var weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${eventCity}&appid=${weatherKey}`;
            fetch(weatherURL)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {

                    // get temp
                    var weatherTemp = Math.floor(data.main.temp - 273.15);

                    // get weather code
                    var weatherCode = data.weather[0].icon;

                    // get weather description
                    var weatherDescription = data.weather[0].description;

                    // get weather icon from code
                    var weatherIcon = `https://openweathermap.org/img/wn/${weatherCode}@2x.png`;

                    $("#show-event").append(`
                    <div class="card mb-6 col-lg-12">
                        <div class="row g-0">
                            <div class="col-md-6">
                                <img class="img-fluid rounded-md-start rounded-sm-top w-100" src="${artistImg}" alt="artist-image">
                            </div>
                            <div class="col-md-6">
                                <div class="card-body d-flex flex-column text-center">
                                    <h5 class="card-title pb-3" id="bandName">${artistName}</h5>
                                    <p class="card-text" id="location">Playing in ${eventCity} at the ${eventVenue}.</p>
                                    <p class="card-text" id="location">Concert Date: ${formatDay}.</p>
                                    <p class="card-text" id="cardWeather">And the weather looks...</p>
                                    <img class="weather-icon mx-auto" src="${weatherIcon}">
                                    <p class="card-text" id="cardWeatherInfo"><b>Overall, it will be ${weatherTemp}˚C, ${weatherDescription}. Enjoy the show!</p>
                                    
                                </div>
                            </div>
                        </div>
                    </div>`)
                });
        });
}


/********************
Display History Function
********************/
function displayHistory() {
    $("#show-history").empty() //clear history to avoid duplicate cards
    var history = localStorage.getItem("artists");
    if (history == null || history == "") {
        return;
    }

    var historyBtn = JSON.parse(history); //parse local storage info

    // create card for each item of the array
    for (let i = 0; i < historyBtn.length; i++) {
        $("#show-history").append(`
        <div class="col-lg-4 col-md-6 col-sm-12 d-flex align-items-stretch">
            <div class="card w-100 history-card">
                <div class="card-body d-flex flex-column" id="historyCardTitle">
                <h5 class="card-title mb-3">${historyBtn[i]}</h5>
                    <button id="reload" class="btn btn-primary mt-auto">Reload Event</button>
            </div>
        </div>
    </div>`)
    }
}


/********************
Clear History Function
********************/
function clearHistory() {
    localStorage.clear(); // clear localStorage
    $("#show-history").empty(); // clear history cards
    $("#show-event").empty(); // clear event card

}


/********************
Click Events
********************/

// Event listener for clear history button
$("#clearHistoryBtn").on("click", clearHistory);

// Event to display current search
$("#submit").on("click", function (event) {
    event.preventDefault();
    displayEvent();
});

// click event to add information entered in the search input field to localStorage.
$("#submit").on("click", function (event) {
    event.preventDefault();
    var artist = $("#input_name").val().trim(); //set value based on user input
    history.push(artist) //push that name to the history array
    var stringifiedHistory = JSON.stringify(history); //stringify array for localStorage
    $("#input_name").val(""); //reset input value to blank.
    localStorage.setItem("artists", stringifiedHistory); //set localStorage key:value pairing.
    displayHistory();

});

// click event for each history card to display stored data.
$("#show-history").on("click", "#reload", function (e) {
    e.stopPropagation();
    artistName = $(this).siblings(".card-title").text();
    displayEvent();
})

displayHistory();

// bottom of document.ready function.
});


