const captureVideoButton = document.querySelector("#screenshot .capture-video");
const disableVideoButton = document.querySelector("#screenshot .disable-video");
const screenshotButton = document.querySelector("#screenshot .take-picture");
const galeryButton = document.querySelector(".galery .see-all-picture");

const video = document.querySelector("#screenshot video");
const deleteButton = document.querySelector("#deleteIMG");

captureVideoButton.addEventListener("click", function () {
    navigator.mediaDevices.getUserMedia({
        video: true
    })
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

    // Canvas com o mesmo tamanho da imagem
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // "Desenhando" a imagem
    canvas.getContext("2d").drawImage(video, 0, 0);

    // Em outros browsers ira falhar a volta do img/pgn
    let imgDataUrl = canvas.toDataURL("image/webp");

    // Criando a imagem no html
    createElement(imgDataUrl);

    // Adicionando a a imagem no localStorage
    try {
        var images = localStorage["image"] ? JSON.parse(localStorage["image"]) : [];
        let randomId = Math.floor(Math.random() * 9999);
        images.push({
            imgUrl: imgDataUrl,
            imgId: randomId
        });
        localStorage.setItem("image", JSON.stringify(images));

    } catch (e) {
        console.log("Storage failed: " + e);
    }
});

// Deletando a imagem correspondente
deleteButton.addEventListener("click", deletePhoto)

// Função que adiciona as fotos tiradas no html
function createElement(source, imgUrl) {
    const galery = document.querySelector(".galery");

    const div = document.createElement("div");
    const button = document.createElement("button");
    const img = document.createElement("img");

    const pictures = document.querySelector(".galery .pictures .slide");

    div.setAttribute("class", "picture");
    button.setAttribute("class", "close btn");
    button.innerHTML = '<i class="far fa-times-circle"></i>';
    button.addEventListener("click", () => {
        button.classList.remove("largeAside");
    });

    if (imgUrl == "" || imgUrl == undefined) {
        img.src = source;
    } else {
        img.src = imgUrl
    }

    div.appendChild(img);
    div.appendChild(button);
    pictures.appendChild(div);

    div.addEventListener("click", function (e) {
        let picture = e.target;
        const container = document.querySelector(".aside-content .container");
        const pictures = document.querySelectorAll(".picture");
        const downloadButton = document.querySelector("#downloadIMG");
        const scrollButtons = document.querySelectorAll(".scroll-pictures");

        // Colocando o elemento no container assim que eu o usuario seleciona-lo
        const img = document.createElement("img");
        img.src = picture.src;
        container.appendChild(img);

        // Removendo a classe "large" e a imagem do "container" assim que clicada
        pictures.forEach(removeLargeClassAndImg);

        // Passando a url de download da imagem
        downloadButton.href = picture.src;

        // Adicionando classes dinamicamente
        picture.parentNode.classList.add("largeAside");
        button.classList.remove("largeAside");
        galery.classList.toggle("width");
        scrollButtons.forEach(button => button.classList.add("width"));
    });

    function removeLargeClassAndImg(picture) {
        picture.classList.remove("largeAside");

        const photo = document.querySelectorAll(".aside-content .container img");
        for (e of photo) {
            if (photo.length > 1) e.remove();
        }
    }
}

function deletePhoto() {
    const containerPhoto = document.querySelector(".fullsize.aside-content .container img");
    if (window.confirm("Tem certeza que deseja excluir essa imagem??")) {
        containerPhoto.remove();

        // Remove o item de acordo com a url
        const data = JSON.parse(localStorage.getItem("image")).filter(item => item.imgUrl !== containerPhoto.src);
        localStorage.setItem("image", JSON.stringify(data));

        // Atualizando a pagina
        location.reload(false);
    }
}

function scrollPictures(y) {
    let slide = document.querySelector(".pictures");
    let scrollTopButton = document.querySelector(".scroll-pictures.up");

    if (y.value >= 1) {
        slide.scrollTop -= y;

    } else {
        slide.scrollTop += y;
        scrollTopButton.style.display = "inline-block";
    }
}

// Botão que disponibiliza acesso a galeria
galeryButton.addEventListener("click", () => {
    let icon = document.querySelector(".see-all-picture i");
    let buttonText = document.querySelector(".see-all-picture p");

    // Arrumando a estilização da tela ao usuario abrir a galeria
    document.querySelector(".galery").classList.toggle("fullsize");
    document.querySelector(".pictures").classList.toggle("large-fullsize");
    //document.querySelector(".picture").classList.toggle("large-fullsize");
    document.querySelector(".scroll-pictures.up").classList.toggle("elementHidden");
    document.querySelector(".scroll-pictures.down").classList.toggle("elementHidden");
    document.querySelector(".container").classList.toggle("elementHidden");
    document.querySelector(".buttons-pictures").classList.toggle("elementHidden");

    // Alterando icones do botão "Galeria"
    if (buttonText.textContent == "Galery") {
        icon.classList.replace("fa-arrow-circle-right", "fa-arrow-circle-left");
        buttonText.textContent = "Back";

    } else if (buttonText.textContent == "Back") {
        icon.classList.replace("fa-arrow-circle-left", "fa-arrow-circle-right");
        buttonText.textContent = "Galery";
    }
});

window.addEventListener("DOMContentLoaded", () => {
    if (localStorage.length >= 1) {
        (() => {
            let images = localStorage.getItem("image") ? JSON.parse(localStorage.getItem("image")) : [];

            const image = {
                imgrl: "",
                imgId: "",
                imgFavorite: ""
            };

            for (i in images) {
                image.imgUrl = images[i]["imgUrl"];
                image.imgId = images[i]["imgId"];

                createElement(image.imgUrl);
            }
        })();
    } else {
        console.log("Empty localStorage!");
    }

    // Galeria de Slides
    var slideImages = document.querySelector(".slide");
    var items = document.querySelectorAll(".slide .picture");
    var prevButton = document.querySelector(".buttons-pictures .prev");
    var nextButton = document.querySelector(".buttons-pictures .next");

    // Button que volta para a imagem anterior do slide
    prevButton.addEventListener("click", () => {
        try {
            slideImages.insertBefore(items[items.length - 1], items[0]);
        } catch (err) {
            console.log(err)
        }
        items = document.querySelectorAll(".slide .picture");
    });

    // Button que passa para a proxima imagem no slide
    nextButton.addEventListener("click", () => {
        try {
            slideImages.appendChild(items[0]);
        } catch (err) {
            console.log(err)
        }
        items = document.querySelectorAll(".slide .picture");
    });
});