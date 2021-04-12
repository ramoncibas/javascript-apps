const captureVideoButton = document.querySelector("#screenshot .capture-video");
const disableVideoButton = document.querySelector("#screenshot .disable-video");
const screenshotButton = document.querySelector("#screenshot .take-picture");

const video = document.querySelector("#screenshot video");

captureVideoButton.addEventListener("click", function () {
    navigator.mediaDevices.getUserMedia({video: true})
    .then(stream => {
        screenshotButton.disabled = false;
        video.srcObject = stream;
    }).catch(error => {
        console.error("Error: ", error);
        
    });
});

disableVideoButton.addEventListener("click", function () {
    // O objeto MediaStream de um video está disponivel por meio de um atributo srcObject
    const mediaStream = video.srcObject;
    
    // Pegando MediaStreamTracks com getTracks()    
    const tracks = mediaStream.getTracks();
    console.log(tracks);
    
    // Parando todos os processos de tracks
    tracks.forEach(track => track.stop());
    
    // Tracks retorna um array, então se quiser para somente um, faça isso
    //tracks[0].stop();
    
    // Só é possivel chamar um getUserMedia no projeto, nessa caso usamos para ativar a camera
    // Então não sera possivel chama-lo novamente para pausa-la
});

screenshotButton.addEventListener("click", function () {
    const canvas = document.createElement("canvas");        
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);
    
    // Em outros browsers ira falhar a volta do img/pgn
    createElement(canvas.toDataURL("image/webp"))
    
    // Função que adiciona as fotos tiradas no html
    function createElement(source) {
        const div =  document.createElement("div");
        const button =  document.createElement("button");
        const img = document.createElement("img");
        
        const pictures = document.querySelector(".galery .pictures");        
        
        div.setAttribute("class", "picture");
        button.setAttribute("class", "close btn");
        button.innerHTML = '<i class="far fa-times-circle"></i>';
        img.src = source;
        
        div.appendChild(img)
        div.appendChild(button)
        pictures.appendChild(div)
    }

    // Adicionando evento para as imagens
    const pictures = document.querySelectorAll(".picture");
    for (i of pictures) {
        i.addEventListener("click", (e) => {
            let picture = e.target;
            
            pictures.forEach(removeLargeClass);
            
            function removeLargeClass(picture) {
                picture.classList.remove("large")
            }
            
            picture.classList.add("large")
            document.querySelector(".galery").classList.add("width");
            document.querySelector(".scroll-pictures").classList.add("width");
            console.log(e.target)
        });
    }
});

document.querySelector(".seeAllPicture").addEventListener("click", () => {
    let icon = document.querySelector(".seeAllPicture i");
    let buttonText = document.querySelector(".seeAllPicture p");
    
    document.querySelector(".galery").classList.toggle("fullsize");
    if (buttonText.textContent == "Galery") {
        icon.classList.replace("fa-arrow-circle-right", "fa-arrow-circle-left");
        buttonText.textContent = "Back";
        
    } else if (buttonText.textContent == "Back") {
        icon.classList.replace("fa-arrow-circle-left", "fa-arrow-circle-right");
        buttonText.textContent = "Galery";
    }
});

document.querySelector(".favorite").addEventListener("click", () => {
    let favoriteIcon = document.querySelector(".favorite i");
    
    favoriteIcon.classList.replace("far", "fas") || favoriteIcon.classList.replace("fas", "far");
});