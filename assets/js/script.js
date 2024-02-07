$(document).ready(function () {

    /********************
     APIS
    ********************/
    var weatherKey = "7a91cf58326cd6da40050bda09317cd6";
    var eventAPI = 'a1xNaECtJW1ZqG3CbA6rC75l1QJMc15f'


    /********************
     GLOBAL VARIABLES
    ********************/
    var artistName = '' //change to take input value.
    var history = [];

    //get current day and format it
    var date = dayjs().format("DD/MM/YYYY");

    /********************
    Display Event Function
    ********************/
    function displayEvent(e) {

        $("#show-event").empty();
        // set value of artists name for the search
        artistName = $("#input_name").val() || artistName;
        artist = artistName.replace(/\s/g, '');

        // fetch data from ticket master api then weather api
        var eventURL = `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=GB&keyword=${artist}&apikey=${eventAPI}`;
        fetch(eventURL)
            .then(function (response) {
                return response.json();
            })
            .then(function (eventData) {
                // console.log(eventURL);
                // console.log(artistName);

                //get event location
                var eventCity = eventData._embedded.events[2]._embedded.venues[0].city.name;
                // console.log(eventCity);

                // get event venue
                var eventVenue = eventData._embedded.events[2]._embedded.venues[0].name;
                // console.log(eventVenue);

                // get event time
                var eventTime = eventData._embedded.events[2].dates.start.localTime;
                var formatTime = dayjs(eventTime).format("hh A"); //format event time
                // console.log(eventTime);

                // get event date
                var eventDate = eventData._embedded.events[2].dates.start.localDate;
                var formatDay = dayjs(eventDate).format("DD/MM/YYYY"); // format the event date
                // console.log(formatDay);

                // get image of artist
                var artistImg = eventData._embedded.events[2].images[4].url;
                // console.log(artistImg);


                // fetch data for today's forecast using location from event location
                var weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${eventCity}&appid=${weatherKey}`;
                fetch(weatherURL)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data) {
                        console.log(weatherURL);

                        // get temp
                        var weatherTemp = Math.floor(data.main.temp - 273.15);
                        // console.log(weatherTemp);

                        // get weather code
                        var weatherCode = data.weather[0].icon;
                        // console.log(weatherCode);

                        // get weather description
                        var weatherDescription = data.weather[0].description;
                        // console.log(weatherDescription);

                        // get weather icon from code
                        var weatherIcon = `https://openweathermap.org/img/wn/${weatherCode}@2x.png`;
                        // console.log(weatherIcon);

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

        var historyBtn = JSON.parse(history);

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
            console.log(historyBtn);
        }
    }
    /********************
    Clear History Function
    ********************/
    function clearHistory() {
        localStorage.clear();
        $("#show-history").empty(); // clear history cards
        $("#show-event").empty(); // clear event card

    }

    // Event listener for clear history button
    $("#clearHistoryBtn").on("click", clearHistory);


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

    $("#show-history").on("click", "#reload", function (e) {
        e.stopPropagation();
        artistName = $(this).siblings(".card-title").text();
        // console.log($(this).text());
        displayEvent();
    })

    displayHistory();



    // bottom of document.ready function.
});


