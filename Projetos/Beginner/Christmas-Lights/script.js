const circle = document.getElementsByClassName('circle')
const play = document.getElementById('play')
const stop = document.getElementById('stop')

const title = document.getElementById('christmas')
var len = circle.length;

// Função ligar as luzes, passando o status da animação para "running" (rodando/funcionando)
const on = function () {
    title.classList.add("lightsOn")
    title.classList.remove("lightsOff")

    // Alterando o estado das luzes.
    for (i = 0; i < len; i++) {
        circle[i].removeAttribute("style")
        circle[i].style.animationPlayState = "running"
    }
}

// Função desligar as luzes, retirando a animação das luzes
const off = function () {
    title.classList.remove("lightsOn")
    title.classList.add("lightsOff")

    // Altera o estado das luzes.
    for (i = 0; i < len; i++) {
        circle[i].style.animation = "none"
        circle[i].style.background = "#563260"
    }
}

// Alterando a velocidade das luzes
const changeSpeed = function() {
    var speed = document.getElementById('speed').value

    // Altera a velocidade da animação das luzes.
    for (i = 0; i < len; i++) {
        circle[i].style.animationDuration = speed + "s"
    }
}

// Função Adicionar luzes
const changeQuantity = function() {
    let quantity = document.getElementById('quantity').value
    let lights = document.querySelector('#lights')

    let color = ['yellow', 'blue', 'green', 'red']
    //let random = color[Math.floor(Math.random() * color.length)];
    let next = makeCircular(color)

    let lightsLength = (Number(circle.length) + Number(quantity))

    if (circle.length > 8 || quantity > 7 || lightsLength > 8) {
        alert('Valor digitado fora do limite!')

    } else if (quantity == 0) {
        alert('Digite um número para adicionar um "Pisca Pisca"')

    } else {
        // Adicionando um elemento.
        for (i = 0; i < quantity; i++) {            
            let div = document.createElement("div")
            div.setAttribute('class', `circle ${next()}`)
            console.log(div)
            lights.appendChild(div)
        }
    }

    // Função retorna do inicion o array de cores assim que é chegado ao fim.
    function makeCircular(elementoId) {
        var current = 0
        return function () {
            return elementoId[current++ % elementoId.length]
        }
    }

    len = circle.length
}

// Função Remover Luzes
const removeLight = function() {
    let quantity = document.getElementById('quantity').value

    if (circle.lenght > 7 || quantity > 7) {
        alert('Valor fora do limite!')

    } else if (quantity == 0) {
        alert('Digite um número para remover um "Pisca Pisca"')

    } else {
        // Removendo um elemento
        for (i = 0; i < quantity; i++) {
            let lights = document.querySelector('#lights')
            let div = document.querySelector('#lights .circle')

            lights.removeChild(div)
        }
    }

    len = circle.length
}

// Adicionando o evento de ligar e desligar para os botões (play/stop)
play.addEventListener('click', on)
stop.addEventListener('click', off)