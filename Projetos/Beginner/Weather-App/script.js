let appId; //apikey
let units = "imperial";
let searchMethod = "zip";

function getSearchMethod(searchTerm) {
    // Validando se é um numero, ou uma "string numerica"
    if(searchTerm.length === 5 && Number.parseInt(searchTerm) + "" === searchTerm) {
        // Zip - Codigo postal
        searchMethod = "zip"
    } else {
        // Querry - Nome da cidade
        searchMethod = "q"
    }
}

function searchWeather(searchTerm) {
    getSearchMethod(searchTerm)
    // Pegando a informação vinda do servidor
    fetch(`https://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`).then(result =>{
        // Convertendo json
        return result.json()
    }).then(result => {
        init(result)
    })    
}

function init(resultFromServer) {
    let weatherDescriptionHeader = document.querySelector("#weatherDescriptionHeader"),
        temperatureElement = document.querySelector("#temperature"),
        humidityElement = document.querySelector("#humidaty"),
        windSpeedElement = document.querySelector("#windSpeed"),
        cityHeader = document.querySelector("#cityHeader"),
        weatherIcon = document.querySelector("#documentIconImg");
    
    let resultDescription = resultFromServer.weather[0].description;
    
    switch (resultFromServer.weather[0].main) {
        case "Clear":
            document.body.style.backgroundImage = 'url("clear.jpg")'
            break;

        case "Clouds":
            document.body.style.backgroundImage = 'url("cloudy.jpg")'
            break;

        case "Rain":
        case "Drizzle":
        case "Mist":
            document.body.style.backgroundImage = 'url("rain.jpg")'
            break;

        case "Thunderstorm":
            document.body.style.backgroundImage = 'url("storm.jpg")'
            break;

        case "Snow":
            document.body.style.backgroundImage = 'url("snow.jpg")'
            break;            
    
        default:
            break;
    }
    
    // Passando o icone vindo da api
    weatherIcon.src = "http://openweathermap.org/img/wn/" + resultFromServer.weather[0].icon + ".png";

    // Passando a descrição
    weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);

    // Passando a temperatura em Celcius    
    temperatureElement.innerHTML = Math.floor((resultFromServer.main.temp - 32)/1.8) + "&#176 C";

    // Passando a velocidade do vento/nuvem
    windSpeedElement.innerHTML = `Ventos em ${Math.floor(resultFromServer.wind.speed)}m/s`;

    // Passando o nome da cidade
    cityHeader.innerHTML = resultFromServer.name;

    // Passando a humidade
    humidityElement.innerHTML = `Himudade em ${resultFromServer.main.humidity}%`;
}

// Passando a funão para o botão
document.getElementById("searchBtn").addEventListener("click", () => {
    let searchTerm = document.getElementById("searchInput").value
    
    // Verificando se há valor
    if(searchTerm) {
        searchWeather(searchTerm)
    }
})