var slideIndex = 1
showSlides(slideIndex)

function nextAndPrev(e) {
    showSlides(slideIndex += e)
}

function showSlides(e) {    
    let slides = document.getElementsByClassName('slide-image')    

    if (e > slides.length) {
        slideIndex = 1
    }

    if (e < slides.length) {
        slideIndex = slides.length
    }

    for (i=0; i < slides.length; i++) {
        slides[i].style.display = "none"
    }

    slides[slideIndex-1].style.display = "block"    
}