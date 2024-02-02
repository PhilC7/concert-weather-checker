
console.log("Hello");
// weatherKey = '991cf6bd9810f1ee84be3949f37be642'
// var currentCity = 'nottingham'
// var weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${weatherKey}`;
    
$(document).ready(function() {
    $("#my-form").submit(function(event) {
        event.preventDefault();
        var currentCity = $("#input_name").val();
        console.log("Input Value:", currentCity);
        
        
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=991cf6bd9810f1ee84be3949f37be642`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            $('#weatherEl').append('<h1>').text(data.name).attr('id', 'cityName');
            
            $('#tempEl').append('<h5>').text(Math.round(data.main.temp - 274.15) + ' °C').attr('id', 'info');
            
            $('#skysEl').append('<h5>').text(data.weather[0].main).attr('id', 'info');
        });
    });
});
        

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

