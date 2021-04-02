const minutesDiv = document.querySelector(".minutes");
const secondDiv = document.querySelector(".seconds");

const btnStartAndStop = document.querySelector(".buttons-pomodoro #play");
const btnStop = document.querySelector(".buttons-pomodoro #stop");
const btnReset = document.querySelector(".buttons-pomodoro #reset");

localStorage.setItem("btn", "focus");

let initial, totalseconds, paused, mins, seconds, cycle = 0;

var focusTime = 25;
var breakTime = 5;

// Botão que inicia e pausa o pomodoro
btnStartAndStop.addEventListener("click", () => {
    let btnText = document.querySelector(".buttons-pomodoro #play p");
    let icon = document.querySelector(".buttons-pomodoro #play i");

    if (btnText.textContent == "Play") {
        // Mudando o texto e a classe do botão para "Stop"
        icon.classList.replace("fa-play-circle", "fa-pause-circle");
        btnText.textContent = "Stop";

        startPomodoro();

    } else if (btnText.textContent == "Stop") {
        // Mudando o texto e a classe do botão para "Play"
        icon.classList.replace("fa-pause-circle", "fa-play-circle");
        btnText.textContent = "Resume";

        stopPomodoro();

    } else if(btnText.textContent == "Resume") {
        icon.classList.replace("fa-play-circle", "fa-pause-circle");
        btnText.textContent = "Stop";

        stopPomodoro();
    }
});

// Botão de resetar o tempo do pomodoro
btnReset.addEventListener("click", resetPomodoro);

// Funções que inicia o pomodoro
function startPomodoro() {
    let btn = localStorage.getItem("btn");

    if (btn === "focus")
        mins = +localStorage.getItem("focusTime") || 1;
    else
        mins = +localStorage.getItem("breakTime") || 1;

    seconds = mins * 60;
    totalseconds = mins * 60;

    setTimeout(decremenT(), 60);
    paused = false;
}

// Função que inicia o tempo de descaço a cada sessão
function startBreakTime(param) {
    let breakMinutes = document.querySelector(".break-minutes");
    let breakSeconds = document.querySelector(".break-seconds");

    var timer = param * 60;
    let timeout = setInterval(function irineu() {
        bminutes = parseInt(timer / 60, 10);
        bseconds = parseInt(timer % 60, 10);

        bminutes = bminutes < 10 ? "0" + bminutes : bminutes;
        bseconds = bseconds < 10 ? "0" + bseconds : bseconds;

        breakMinutes.textContent = bminutes;
        breakSeconds.textContent = bseconds;

        if (--timer < 0) {
            timer = param * 60;

        } else if (timer <= 0){
            clearTimeout(timeout);
            timer, breakMinutes.textContent = param;
            startPomodoro();
        }

    }, 1000);
}

// Função que para o pomodoro
function stopPomodoro() {
    if (paused === undefined) return;

    if (paused) {
        paused = false;
        initial = setTimeout("decremenT()", 60);

    } else {
        clearInterval(initial);
        paused = true;
    }
}

// Função que reseta o pomodoro
function resetPomodoro() {
    clearTimeout(initial);

    minutesDiv.textContent = localStorage.getItem("focusTime");
    secondDiv.textContent = "00";

    document.querySelector(".buttons-pomodoro #play i").classList.replace("fa-pause-circle","fa-play-circle");
    document.querySelector(".buttons-pomodoro #play p").textContent = "Play";
}

// Função que decrementa o tempo da sessão
function decremenT() {
    minutesDiv.textContent = Math.floor(seconds / 60);

    // Se for somente 1 digito (9, 3, 1 retorne 09, 03, 01)
    secondDiv.textContent = seconds % 60 > 9 ? seconds % 60 : `0${seconds % 60}`;

    if (seconds > 0) {
        seconds--;

        // Decrementando 1 segundo, fazendo de forma circular: 0 -> 59
        initial = window.setTimeout("decremenT()", 1000);
        
        // Tocando audio quando estiver restando somente 3 seg
        if (seconds == 3) new Audio("session-ended.mp3").play();
        if (seconds == 0) {             
            cycle += 1;
            let inputCycle = document.querySelector(".count-cycle input");
            inputCycle.value = cycle + "/4";
            
            // Verificando se ja foram completo 4 ciclos, e sugerir ao usuario um tempo de descanco de 30 minutos
            if (cycle > 4) {
                if(window.confirm("Você acaba de completar 4 ciclos, faça uma pausa de 30 minutos!")) {
                    cycle = 0;
                    inputCycle.value = 0 + "/4";
                    startBreakTime(30);

                } else {
                    cycle = 0;
                    inputCycle.value = 0 + "/4";
                }
                // Se não, continue rodando a aplicação normalmente com o "breakTime" normalmente
            } else {
                resetPomodoro();
                startBreakTime(breakTime);
            }
            
        }

    } else {
        mins = 0;
        seconds = 0;

        let btn = localStorage.getItem("btn")

        if (btn === "focus") {
            localStorage.setItem("btn", "break");
            paused = false;
        } else {
            localStorage.setItem("btn", "focus");

            paused = true;
        }        
    }
}

// Tempo da sessão
document.querySelector(".session-length button.up").addEventListener("click", () => {
    focusTime += 1;
    document.querySelector(".session-length #inputSession").value = focusTime + " min";
    document.querySelector(".minutes").innerText = focusTime;

    localStorage.setItem("focusTime", focusTime);
});

document.querySelector(".session-length button.down").addEventListener("click", () => {
    focusTime -= 1;

    if (focusTime < 5) {
        alert("Ops... Tempo minimo da sessão invalido!");
        focusTime = 5;
    } else {
        document.querySelector(".session-length #inputSession").value = focusTime + " min";
        document.querySelector(".minutes").innerText = focusTime;
        localStorage.setItem("focusTime", focusTime);
    }
});

// Tempo de descanço
document.querySelector(".session-break_length button.up").addEventListener("click", () => {
    breakTime += 1;
    document.querySelector(".session-break_length input").value = breakTime + " min";
    document.querySelector(".break-minutes").textContent = breakTime;

    localStorage.setItem("breakTime", breakTime);
});

document.querySelector(".session-break_length button.down").addEventListener("click", () => {
    breakTime -= 1;

    if (breakTime < 2) {
        alert("Ops... Tempo minimo de descanço atingido!");
        breakTime = 2;
    } else {
        document.querySelector(".session-break_length input").value = breakTime + " min";
        document.querySelector(".break-minutes").textContent = breakTime;

        localStorage.setItem("breakTime", breakTime);
    }
});

// Sobre os ciclos no pomodoro
document.querySelector("#btn-about-cycle").addEventListener("mouseenter", () => {
    document.querySelector(".about-cycle").style.display = "flex";      
});

document.querySelector("#btn-about-cycle").addEventListener("mouseout", () => {
    document.querySelector(".about-cycle").style.display = "none";
});

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
    `;
}

// Iniciando com um modal, se o usuario ainda não tiver visitado a pagina
window.addEventListener("DOMContentLoaded", () => {
    localStorage.setItem("focusTime", focusTime);
    localStorage.setItem("breakTime", breakTime);

    var localData = localStorage.getItem("data-access");
    var data = {
        firstAccess: null
    }

    // Verificando se o localStorage está vazio
    if (!localData) {
        let bgModal = document.querySelector(".bg-modal");
        bgModal.style.display = "grid";
        bgModal.innerHTML = showModal();

        document.querySelector(".btn-close-modal").addEventListener("click", () => {
            bgModal.style.display = "none";

            // Usuario já acessou essa pagina antes, acesso recebe "true"
            data.firstAccess = true;
            localStorage.setItem("data-access", JSON.stringify(data));
        });
    }
});
