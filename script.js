
//connecting our DOM element 

const weatherForm=document.querySelector(".weatherForm");
const cityInput=document.querySelector(".cityInput");
const card= document.querySelector(".card");

const apiKey="b5eea87bf3f58faeaaaca0fa442a5abd";

// event function is async so that we can await for the data :)
weatherForm.addEventListener("submit",async event=>{
// prevent default load after btn clicked 
event.preventDefault();

//checking our input value 
const city=cityInput.value;

if(city){
    //error handling 
    try{
        // wait for the getWeather function to return data from api 
        const weatherData=await getWeatherData(city);
        // once data reciev we call display function with the data parameter 
        displayWeatherInfo(weatherData);

    }
    catch(error){
        console.error(error);
        displayError(error);    // this will pass the error as message parametre for the display error function 
    }
}
else{
    displayError("Please enter the city ");
}

});

async function  getWeatherData(city){
 //create api URL  we use our input and api key ;)

const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
const response=await fetch(apiUrl);
// check if data is fetched succesfully 

if(!response.ok){
    throw new Error("Couldn't fetch Weather data ");
}
// converting data to Json file
return await response.json();

}

//To display data we fetch this will take the JSON data as parameter 
function displayWeatherInfo(data){
const {name:city, 
       main:{temp,humidity},
       weather:[{id,description}]} = data;

const cityDisplay=document.createElement("h1");
const tempDisplay=document.createElement('p');
const humidityDisplay=document.createElement('p');
const descDisplay=document.createElement('p');
const weatherEmoji=document.createElement('p');

//connecting to DOM
cityDisplay.textContent=city;
tempDisplay.textContent=`${(temp-273.15).toFixed(1)}°C`;
humidityDisplay.textContent=`Humidity:${humidity}% `;
descDisplay.textContent=description;
weatherEmoji.textContent=getWeatherEmoji(id);
//Accessing CSS class list
tempDisplay.classList.add("tempDisplay");
cityDisplay.classList.add("cityDisplay");
humidityDisplay.classList.add("tempDisplay");
descDisplay.classList.add("descDisplay");
weatherEmoji.classList.add("weatherEmoji");
//appending to Card element 
 card.textContent="";
 card.style.display="flex";
 card.appendChild(cityDisplay);
 card.appendChild(tempDisplay);
 card.appendChild(humidityDisplay);
 card.appendChild(descDisplay);
 card.appendChild(weatherEmoji);

}

//Display Emoji after comparing the id from Weather Data 
function getWeatherEmoji(weatherId){

    // we use boolean computation
switch(true){
     case(weatherId >=200 && weatherId <300 ):
         return "⛈️";
    case(weatherId >=300 && weatherId <400 ):
         return " 🌦️";
    case(weatherId >=500 && weatherId <600 ):
         return "🌧️";
    case(weatherId >=600 && weatherId <700 ):
         return "❄️";
    case(weatherId >=700 && weatherId <800 ):
         return weatherId === 741 ? "🌫️":"🌁";
    case(weatherId === 800):
    return "🌞";
    case(weatherId >=800 && weatherId <900 ):
         return "☁️";


     
    default:
        return "?";
}
}


// this will check for error and display 
function displayError(message){
 const errorDisplay=document.createElement('p');
 errorDisplay.textContent=message;
 errorDisplay.classList.add("errorDisplay");

 //invoke our Card Class  and append errorDisplay 
 card.textContent="";
 card.style.display="flex";
card.appendChild(errorDisplay);

}