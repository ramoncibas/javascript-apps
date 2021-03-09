let appId = "fce363757e0685094f2578124caa1960"; //apikey
let units = "imperial";
let searchMethod = "zip";

function getSearchMethod(searchTerm) {
    // Validações
    if(searchTerm.length === 5) {
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
        console.log(result)
    })    
}

// Passando a funão para o botão
document.getElementById("searchBtn").addEventListener("click", () => {
    let searchTerm = document.getElementById("searchInput").value
    
    // Verificando se há valor
    if(searchTerm) {
        searchWeather(searchTerm)
    }
})