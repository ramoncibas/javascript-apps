const add_btn = document.querySelector("button .btn-add")
const close_btn = document.querySelector("button .btn-close")
var content = document.getElementById("container")

function addNote() {
    let popup = document.getElementById("pop-up-bg")
    popup.style.display = 'flex'


    let div = document.createElement("div")
    let label = document.createElement("label")
    let input = document.createElement("input")

    div.setAttribute("class", "note")
    content.appendChild(div)

    label.textContent = "Acordadar cedo"
    div.appendChild(label)

    input.value = "Levantar 6hr da manhã"
    div.appendChild(input)
}

function saveNote() {
    closePopUp()
}

function closePopUp() {
    let popup = document.getElementById("pop-up-bg")
    popup.style.display = 'none'
}
