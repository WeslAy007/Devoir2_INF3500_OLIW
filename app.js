const button = document.getElementById("searchBtn");

button.addEventListener(
    "click",
    getWeather
);



async function getWeather(){


    const city =
    document.getElementById("cityInput").value;



    if(city===""){

        alert("Entrer une ville");

        return;
    }



    try{


        // Recherche coordonnées ville

        const geoResponse = await fetch(

        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`

        );



        const geoData = await geoResponse.json();



        const place = geoData.results[0];



        const latitude = place.latitude;

        const longitude = place.longitude;



        // Recherche météo


        const weatherResponse = await fetch(

        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`

        );



        const weatherData =
        await weatherResponse.json();



        const weather =
        weatherData.current_weather;



        afficherMeteo(place, weather);



    }

    catch(error){

        alert("Ville introuvable");

        console.log(error);

    }


}





function afficherMeteo(place, weather){



document.getElementById("location").innerHTML =

`
📍 ${place.name}, ${place.country}
`;



document.getElementById("temp").innerHTML =

weather.temperature + "°C";



document.getElementById("wind").innerHTML =

weather.windspeed + " km/h";



document.getElementById("status").innerHTML =

getWeatherText(weather.weathercode);



}




function getWeatherText(code){


    if(code===0)
        return "☀ Ensoleillé";


    if(code<50)
        return "🌤 Nuageux";


    if(code<70)
        return "🌧 Pluvieux";


    return "⛈ Orage";


}