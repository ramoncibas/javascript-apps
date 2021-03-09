function digitalClock(params) {
    var hora = new Date().toLocaleTimeString('pt-br')
    document.getElementById("container").innerHTML = hora
    
    // atualizando o relogio a cada 1seg
    setInterval (() => {
        digitalClock()
    }, 1000)
}    

window.addEventListener("DOMContentLoaded", digitalClock)