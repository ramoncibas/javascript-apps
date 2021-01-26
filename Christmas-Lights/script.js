const circle = document.getElementsByClassName('circle')
const play = document.getElementById('play')
const stop = document.getElementById('stop')

const title = document.getElementById('christmas')
var len = circle.length;

console.log(len)

// Função ligar as luzes, passando o status da animação para "running" (rodando/funcionando)
const on = function () {
    title.classList.add("lightsOn")
    title.classList.remove("lightsOff")    

    for (var i = 0; i < len; i++) {
        circle[i].removeAttribute("style")
        circle[i].style.animationPlayState = "running"
    }
}

// Função desligar as luzes, retirando a animação das luzes
const off = function () {
    title.classList.remove("lightsOn")
    title.classList.add("lightsOff")    

    for (var i = 0; i < len; i++) {
        circle[i].style.animation = "none"
        circle[i].style.background = "#563260"
    }
}

// Alterando a velocidade das luzes
function changeSpeed() {
    var speed = document.getElementById('speed').value
    for (var i = 0; i < len; i++) {
        circle[i].style.animationDuration = speed + "s"
    }
}

// Função Adicionar luzes
function changeQuantity() {
    var quantity = document.getElementById('quantity').value
    let lights = document.getElementsByClassName('lights')[0]
    
    let color = ['yellow', 'blue', 'green', 'red']
    let next = makeCircular(color)

    //let compri = circle.light + quantity
    console.log(len)

    if (circle.length > 7 || quantity > 7) {
        alert('Valor digitado fora do limite!')
    } else {
        for (i=0; i < quantity; i++ ) {
            let div = document.createElement("div")
            div.setAttribute('class', `circle ${next()}`) 
    
            lights.appendChild(div)
        }
    }

    function makeCircular(arr) {
        var current = 0
        return function () {
            return arr[current++ % arr.length]
        }
    }
}

// Adicionando um evento de ligar e desligar para os botões (play/stop)
play.addEventListener('click', on)
stop.addEventListener('click', off)
