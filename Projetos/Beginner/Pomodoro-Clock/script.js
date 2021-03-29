const minutesDiv = document.querySelector(".minutes");
const secondDiv = document.querySelector(".seconds");

const btnStart = document.querySelector(".buttons-pomodoro #play");
const btnReset = document.querySelector(".buttons-pomodoro #reset");

localStorage.setItem("btn", "focus");

let initial, totalseconds, perc, paused, mins, seconds;

var focusTime = 25;
var breakTime = 5;

const stopPomodoro = () => {
    clearInterval(updatePomodoro);
}

// function resetPomodoro() {}

btnStart.addEventListener("click", (event) => {
    let btn = localStorage.getItem("btn");

    if (btn == "focus") {
        mins = +localStorage.getItem("focusTime");
    } else {
        mins = +localStorage.getItem("breakTime");
    }

    seconds = mins * 60;
    totalseconds = mins * 60;

    setTimeout(decremenT(), 60);
    paused = false;
});

btnReset.addEventListener("click", () => {
    clearTimeout(initial);
    setProgress(0);

    minutesDiv.textContent = focusTime;
    secondDiv.textContent = 00;
})

function decremenT() {
    minutesDiv.textContent = Math.floor(seconds / 60);

    // Se for somente 1 digito (9, 3, 1 retorne 09, 03, 01)
    secondDiv.textContent = seconds % 60 > 9 ? seconds % 60 : `0${seconds % 60}`;

    if (seconds > 0) {
        seconds --;
        // Decrementando 1 segundo, fazendo de forma circular: 0 -> 59
        initial = window.setTimeout("decremenT()", 1000);
    } else {
        mins = 0;
        seconds = 0;
        new Audio("session-ended.mp3").autoplay = true

        let btn = localStorage.getItem("btn")
        let icon = document.querySelector(".buttons-pomodoro #play i");
        let btnText = document.querySelector(".buttons-pomodoro #play p");

        if (btn == "focus") {
            btnText.textContent = "Stop"
            icon.classList.replace("fa-play-circle", "fa-pause-circle");

            localStorage.setItem("btn", "break")
            paused = false;
        } else {
            btnText.textContent = "Play"
            icon.classList.replace("fa-pause-circle", "fa-play-circle");

            localStorage.setItem("btn", "focus")

            paused = true;                        
        }
    }
}

// Tempo da sessão
document.querySelector(".session-length button.up").addEventListener("click", () => {
    focusTime += 1
    document.querySelector(".session-length #inputSession").value = focusTime + " min"
    document.querySelector(".minutes").innerText = focusTime
})

document.querySelector(".session-length button.down").addEventListener("click", () => {
    focusTime -= 1
    if (focusTime < 5) {
        alert("Ops... Tempo minimo da sessão invalido!")
        focusTime = 5
    } else {
        document.querySelector(".session-length #inputSession").value = focusTime + " min"
        document.querySelector(".minutes").innerText = focusTime
    }
})

// Tempo de descanço
document.querySelector(".session-break_length button.up").addEventListener("click", () => {
    breakTime += 1
    document.querySelector(".session-break_length input").value = breakTime + " min"
})

document.querySelector(".session-break_length button.down").addEventListener("click", () => {
    breakTime -= 1
    if (breakTime < 2) {
        alert("Ops... Tempo minimo de descanço atingido!")
        breakTime = 2
    } else {
        document.querySelector(".session-break_length input").value = breakTime + " min"
    }
})

//startPomodoro = setInterval(() => {
//    updatePomodoro(focusTime)
//    console.log(updatePomodoro)
//},1000)

// Mostrar um modal quando o usuario acessar a pagina pela primeira vez.
const showModal = function () {
    return `
    <div class="modal">
        <div class="welcome">
            <h1>Bem vindo!</h1>
            <img src="pomodoro-timer.png">
        </div>
        <div class="about">
            <h3>Como funciona a Técnica Pomodoro?</h3>
            <p>
                A Técnica Pomodoro é um método de gerenciamento de tempo desenvolvido por Francesco Cirillo no
                final dos anos 1980. A técnica consiste na utilização de um cronômetro para dividir o trabalho
                em períodos de 25 minutos, separados por breves intervalos
            </p>
        </div>

        <button class="btn-close-modal">Fechar</button>
    </div>
    `
}

window.addEventListener("DOMContentLoaded", () => {
    var localData = localStorage.getItem("data-access")
    var data = {
        firstAccess: null
    }

    // Verificando se o localStorage está vazio
    if (!localData) {
        let bgModal = document.querySelector(".bg-modal")
        bgModal.style.display = "grid"
        bgModal.innerHTML = showModal()

        document.querySelector(".btn-close-modal").addEventListener("click", () => {
            bgModal.style.display = "none"

            // Usuario já acessou essa pagina antes, acesso recebe "true"
            data.firstAccess = true
            localStorage.setItem("data-access", JSON.stringify(data))
        })
    }
})