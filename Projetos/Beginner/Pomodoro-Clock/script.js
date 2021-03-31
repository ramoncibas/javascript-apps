const minutesDiv = document.querySelector(".minutes");
const secondDiv = document.querySelector(".seconds");

const btnStartAndStop = document.querySelector(".buttons-pomodoro #play");
const btnStop = document.querySelector(".buttons-pomodoro #stop");
const btnReset = document.querySelector(".buttons-pomodoro #reset");

localStorage.setItem("btn", "focus");

let initial, totalseconds, paused, mins, seconds;

var focusTime = 25;
var breakTime = 5;

const stopPomodoro = () => {
    clearInterval(updatePomodoro);
}

btnStartAndStop.addEventListener("click", () => {
    let btnText = document.querySelector(".buttons-pomodoro #play p");
    let icon = document.querySelector(".buttons-pomodoro #play i");

    if (btnText.textContent == "Play") {
        // Mudando o texto e a classe do botão para "Stop"
        icon.classList.replace("fa-play-circle", "fa-pause-circle");
        btnText.textContent = "Stop";

        startPomodoro();
        console.log("Start pomodoro")

    } else {
        // Mudando o texto e a classe do botão para "Play"
        icon.classList.replace("fa-pause-circle", "fa-play-circle");
        btnText.textContent = "Play";

        stopPomodoro();
        console.log("Stop pomodoro")
    }

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

    // Função que para o pomodoro
    function stopPomodoro() {
        if (paused === undefined) return;

        if (paused) {
            paused = false;
            initial = setTimeout("decremenT()", 60);

        } else {
            clearTimeout(initial);
            paused = true;
        }
    }

});

btnReset.addEventListener("click", () => {
    clearTimeout(initial);    

    minutesDiv.textContent = focusTime;
    secondDiv.textContent = "00";

    document.querySelector(".buttons-pomodoro #play i").classList.replace("fa-pause-circle","fa-play-circle");
    document.querySelector(".buttons-pomodoro #play p").textContent = "Play";
});

function decremenT() {
    minutesDiv.textContent = Math.floor(seconds / 60);

    // Se for somente 1 digito (9, 3, 1 retorne 09, 03, 01)
    secondDiv.textContent = seconds % 60 > 9 ? seconds % 60 : `0${seconds % 60}`;

    if (seconds > 0) {
        seconds--;

        // Decrementando 1 segundo, fazendo de forma circular: 0 -> 59
        initial = window.setTimeout("decremenT()", 1000);

        if (seconds < 4) {
            let audio =  new Audio("session-ended.mp3");
            audio.play();
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
    localStorage.setItem("breakTime", breakTime);
});

document.querySelector(".session-break_length button.down").addEventListener("click", () => {
    breakTime -= 1;

    if (breakTime < 2) {
        alert("Ops... Tempo minimo de descanço atingido!");
        breakTime = 2;
    } else {
        document.querySelector(".session-break_length input").value = breakTime + " min";
        localStorage.setItem("breakTime", breakTime);
    }
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
        })
    }
})