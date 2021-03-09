let time = 2000,
    currentImageIndex = 0,
    images = document.querySelectorAll("#slider img"),
    max = images.length;

function nextImage() {
    // removendo a classe
    images[currentImageIndex].classList.remove("selected")
    // alterando a posição da imagem
    currentImageIndex++
    // verifica se estiver no maximo, volta para o inicio
    if (currentImageIndex >= max)
        currentImageIndex = 0
    // adiciona a classe para a proxima imagem
    images[currentImageIndex].classList.add("selected")
}

// passando o intervalo de "refresh" de cada bannar/slide
function start () {
    setInterval(() => {
        nextImage()
    },time)    
}

// inicia a funcao assim que a janela for carregada
window.addEventListener("load", start)