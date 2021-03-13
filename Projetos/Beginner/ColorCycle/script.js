// função que recebe valores aleatorios de cores RGB e aplica nos respectivos elementos
function colorCycle() {
    let body = document.getElementsByTagName("body")[0]
    let btn = document.querySelector("#btncolor input")    
    let rgb = document.querySelector("#res input")
    let section = document.querySelector("main")
    let h1 = document.querySelector("main h1")

    let randomRGBColor = randomRGB()

    // mudando cores de fundo
    btn.style.background = randomRGBColor
    body.style.background = randomRGBColor

    h1.style.color = randomRGB()
    section.style.border = `thick outset ${randomRGB()}`

    // copiar cor rgb
    btn.addEventListener('click', (e) => {
        e.preventDefault();
  
        navigator.clipboard.writeText(randomRGBColor);
    })

    rgb.value = randomRGBColor

    console.log(randomRGB())
}

// cores rgb randomicamente
const randomRGB = () => {
    const random = () => Math.floor(Math.random() * 255)
    return `rgb(${random()}, ${random()}, ${random()})`
}

function run() {
    setInterval(() => {
        colorCycle()
    },2000)
}

// passando a funcao ao carregar a janela
window.addEventListener("DOMContentLoaded", run)