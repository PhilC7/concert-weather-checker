$(document).ready(function () {

    /********************
     APIS
    ********************/
    var weatherKey = "7a91cf58326cd6da40050bda09317cd6";
    var eventAPI = 'a1xNaECtJW1ZqG3CbA6rC75l1QJMc15f'


    /********************
     GLOBAL VARIABLES
    ********************/
    var artistName = 'stacked' //change to take input value.
    var history = [];

    //get current day and format it
    var date = dayjs().format("DD/MM/YYYY");



    /********************
    Display Event Function
    ********************/
    function displayEvent(e) {

        // set value of artists name for the search
        artistName = $("#input_name").val() || artistName;

        // fetch data from ticket master api then weather api
        var eventURL = `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=GB&keyword=${artistName}&apikey=${eventAPI}`;
        fetch(eventURL)
            .then(function (response) {
                return response.json();
            })
            .then(function (eventData) {
                console.log(eventURL);
                console.log(artistName);
                //get event location
                var eventCity = eventData._embedded.events[0]._embedded.venues[0].city.name;
                console.log(eventCity);

                // get event venue
                var eventVenue = eventData._embedded.events[0]._embedded.venues[0].name;
                console.log(eventVenue);

                // get event time
                var eventTime = eventData._embedded.events[0].dates.start.localTime;
                var formatTime = dayjs(eventTime).format("hh A"); //format event time
                console.log(eventTime);

                // get event date
                var eventDate = eventData._embedded.events[0].dates.start.localDate;
                var formatDay = dayjs(eventDate).format("DD/MM/YYYY"); // format the event date
                console.log(formatDay);

                // get image of artist
                var artistImg = eventData._embedded.events[0].images[4].url;
                console.log(artistImg);


                // fetch data for today's forecast using location from event location
                var weatherURL = `https://api.openweathermap.org/data/2.5/forecast?q=${eventCity}&appid=${weatherKey}`;
                fetch(weatherURL)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data) {
                        console.log(weatherURL);

                        // get weather code
                        var weatherCode = data.list[0].weather[0].icon;
                        console.log(weatherCode);

                        // get weather icon from code
                        var weatherIcon = `https://openweathermap.org/img/wn/${weatherCode}@2x.png`;
                        console.log(weatherIcon);
                    });
            });
    }

    console.log(displayEvent());





    // $("#submit").on("click", function (event) {
    //     event.preventDefault();
    //     var currentCity = $("#input_name").val();
    //     console.log(currentCity);
    // });



    // click event to add information entered in the search input field to localStorage.
    $("#submit").on("click", function (event) {
        event.preventDefault();
        var artist = $("#input_name").val().trim(); //set value based on user input
        history.push(artist) //push that name to the history array
        var stringifiedHistory = JSON.stringify(history); //stringify array for localStorage
        $("#input_name").val(""); //reset input value to blank.
        localStorage.setItem("artists", stringifiedHistory); //set localStorage key:value pairing.

        // call function here to create buttons for each name in history array.

        console.log(stringifiedHistory);
    });




    // bottom of document.ready function.
});


