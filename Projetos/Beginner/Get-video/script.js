const video = document.getElementById("video")

function startVideo() {
    navigator.getUserMedia(
        { video: {} },
        stream => video.srcObject = stream,
        err => console.log(err)
    )
}

startVideo()

document.querySelector(".seeAllPicture").addEventListener("click", (event) => {
    document.querySelector(".galery").classList.toggle("fullsize");
});