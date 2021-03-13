var timeInput = document.getElementById("time-date").value,
    now = new Date(),    
    date,
    newYear = new Date("1.1.2020").getTime(),
    startTimer = ''

function calculateTime(dates) {
    
    clearInterval(startTimer)
       
    if (typeof (dates) == 'undefined') {
        date = new Date(newYear).getTime()
    } else {
        date = new Date(dates).getTime()
    }

    function updateTimer(date) {
        let now = new Date().getTime()
        let distance = date - now

        // tempo calculado por dias, horas, minutos e segundos
        let days = Math.floor(distance / (1000 * 60 * 60 * 24))
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        let seconds = Math.floor((distance % (1000 * 60)) / 1000)

        // selecionando elementos
        document.querySelector(".timer-day").innerHTML = days
        document.querySelector(".timer-hours").innerHTML = hours
        document.querySelector(".timer-minutes").innerHTML = minutes
        document.querySelector(".timer-seconds").innerHTML = seconds

        // texto inicial
        if (now >= date) {
            clearInterval(startTimer)
            document.querySelector(".timer-day").innerHTML = "T"
            document.querySelector(".timer-hours").innerHTML = "I"
            document.querySelector(".timer-minutes").innerHTML = "M"
            document.querySelector(".timer-seconds").innerHTML = "E"
        }
    }

    // atualizando os segundos
    startTimer = setInterval(() => {
        updateTimer(date)
    }, 1000)
}

// passando a funcao ao carregar o conteudo do "DOM"
window.addEventListener("DOMContentLoaded", () => {
    calculateTime()
})

    
