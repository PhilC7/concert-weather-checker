/********************
 APIS
********************/
var weatherKey = "7a91cf58326cd6da40050bda09317cd6";
var eventAPI = 'a1xNaECtJW1ZqG3CbA6rC75l1QJMc15f'


/********************
 GLOBAL VARIABLES
********************/
var currentCity = "";
var artistName = 'stacked' //change to take input value.
var history = [];


var eventURL = `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=GB&keyword=${artistName}&apikey=${eventAPI}`;
fetch(eventURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (eventData) {

        //get location by city name
        var eventLocation = eventData._embedded.events[0]._embedded.venues[0].city.name;
        var eventDate = eventData._embedded.events[0].dates.start.localDate;
        console.log(eventLocation);
        console.log(eventData);


        // fetch data for today's forecast using location from event location
        var weatherURL = `https://api.openweathermap.org/data/2.5/forecast?q=${eventLocation}&appid=${weatherKey}`;
        fetch(weatherURL)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);

                var forecast = data.list[0].weather[0].main; //path to find weather (list index depends on event date)
                console.log(forecast);
            });
    });

