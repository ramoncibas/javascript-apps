// funcao que passa os valores de segundos, minutos e horas para o html
function digitalClock(params) {
    var hora = new Date().toLocaleTimeString('pt-br')
    document.getElementById("container").innerHTML = hora
    
    // atualizando o relogio a cada 1seg
    setInterval (() => {
        digitalClock()
    }, 1000)
}    

// passando a funcao ao carregar o conteudo do DOM
window.addEventListener("DOMContentLoaded", digitalClock)