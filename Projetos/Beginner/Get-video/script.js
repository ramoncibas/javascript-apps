const video = document.getElementById("video")

function startVideo() {
    navigator.getUserMedia(
        { video: {} },
        stream => video.srcObject = stream,
        err => console.log(err)
    )
}

startVideo()

document.querySelector(".seeAllPicture").addEventListener("click", () => {
    let icon = document.querySelector(".seeAllPicture i")
    let buttonText = document.querySelector(".seeAllPicture p")

    document.querySelector(".galery").classList.toggle("fullsize");
    if (buttonText.textContent == "Galery") {
        icon.classList.replace("fa-arrow-circle-right", "fa-arrow-circle-left");        
        buttonText.textContent = "Back";        

    } else if(buttonText.textContent == "Back") {
        icon.classList.replace("fa-arrow-circle-left", "fa-arrow-circle-right");        
        buttonText.textContent = "Galery";        
    }
});

document.querySelector(".favorite").addEventListener("click", () => {
    let favoriteIcon = document.querySelector(".favorite i")
    
    favoriteIcon.classList.replace("far", "fas") || favoriteIcon.classList.replace("fas", "far")
});

let pictures = document.querySelectorAll(".picture")
for(i of pictures) {
    i.addEventListener("click", (e) => {
        let picture = e.target;          

        pictures.forEach(removeLargeClass)
        
        function removeLargeClass(picture) {
            picture.classList.remove("large")            
        }

        picture.classList.add("large")
        document.querySelector(".galery").classList.add("width");
        document.querySelector(".scroll-pictures").classList.add("width");
    });
}