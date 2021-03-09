var slideIndex = 1
showSlides(slideIndex)

// next/prev controls
function nextAndPrev(e) {
    showSlides(slideIndex += e)
}

// thumbnail image controls
function currentSlide(e) {
    showSlides(slideIndex = e)
}

// funcao mostrar slides
function showSlides(e) {
    let slides = document.getElementsByClassName('slide-image')
    let namePlaces = document.getElementsByTagName("p")
    let largeImg = document.getElementById('large-image')

    if (e > slides.length)
        slideIndex = 1
    if (e < 1)
        slideIndex = slides.length

    // esconder o ultimo slide
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none"
        largeImg.innerHTML = ''
    }

    // mostra o slide respectivo
    slides[slideIndex - 1].style.display = "block"

    // adicionando a imagem ao large-image (container)
    slides[slideIndex - 1].addEventListener("click", () => {
        let place = namePlaces[slideIndex - 1].innerText
        let images = slides[slideIndex - 1].innerHTML

        let link = document.createElement("h1")
        link.innerHTML =
            `<a href="https://www.google.com/search?source=hp&ei=Y0IbYPKYKqHZ5OUPsIKmmAs&q=${place}" target="_blank">
                Saiba mais sobre esse lugar
            </a>`

        largeImg.innerHTML = images
        largeImg.appendChild(link)
    })
}