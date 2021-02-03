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

function showSlides(e) {
    let slides = document.getElementsByClassName('slide-image')
    //let largeImg = document.getElementById('large-image')
    
    if (e > slides.length)
        slideIndex = 1    
    if (e < 1)
        slideIndex = slides.length

    // esconder o ultimo slide
    for (i=0; i < slides.length; i++) { 
        slides[i].style.display = "none"
    }

    // mostra o slide respectivo
    slides[slideIndex-1].style.display = "block"   
}