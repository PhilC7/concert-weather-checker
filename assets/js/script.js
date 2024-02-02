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
        

