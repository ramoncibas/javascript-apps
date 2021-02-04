function colorCycle() {
    let body = document.getElementsByTagName("body")[0]
    let btn = document.querySelector("#btncolor input")    
    let section = document.querySelector("section")

    let backGround = randomRGB()

    // mudando cores de fundo
    btn.style.background = backGround
    body.style.background = backGround
    section.style.border = `thick outset ${randomRGB()}`

    // copiar cor rgb
    btn.addEventListener('click', (e)=> {
        e.preventDefault();
  
        navigator.clipboard.writeText(backGround);
    })        

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

window.addEventListener("load", run)