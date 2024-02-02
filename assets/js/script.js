/********************
 APIS
********************/


var eventLocation = "";
var weatherKey = "7a91cf58326cd6da40050bda09317cd6";

// fetch data for today's forecast
var weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${weatherKey}`;
fetch(weatherURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    });


var eventAPI = 'a1xNaECtJW1ZqG3CbA6rC75l1QJMc15f'
var artistName = 'stacked'
var eventURL = `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=GB&keyword=${artistName}&apikey=${eventAPI}`;
fetch(eventURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (eventData) {
        // Printing the entire object to console
        // console.log(eventData);
        eventLocation = eventData._embedded.events[0]._embedded.venues[0].postalCode;
        eventDate = eventData._embedded.events[0].dates.start.localDate;
        console.log(eventLocation);
    });
var currentCity = eventLocation;
