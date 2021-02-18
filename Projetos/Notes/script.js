// abrindo o pop-up para adicionar a nota
function addNote() {
    let popup = document.getElementById("pop-up-bg")
    let title_popup = document.getElementById("txtpopup")
    let txt_popup = document.getElementById("txtnote")

    popup.style.display = 'flex'   
    
    if (title_popup != "" || txt_popup != "") {
        title_popup.value = ''
        txt_popup.value = ''        
    }
}

// salvando a nota
function saveNote() {
    let title_popup = document.getElementById("txtpopup").value
    let txt_popup = document.getElementById("txtnote").value
        
    createNote(title_popup, txt_popup)        
    closePopUp()
}

function selectNote(event) {
    const button = event.currentTarget

    const buttons = document.querySelectorAll("#notes button")
    buttons.forEach(removeActiveClass)

    function removeActiveClass(button) {
        button.classList.remove("active")        
    }

    button.classList.add("active")    
}

// criando elemento dentro do campo notas
function createNote(title, text) {
    let content = document.getElementById("container")
    let div = document.createElement("div")
    let label = document.createElement("label")
    let input = document.createElement("input")

    div.setAttribute("class", "note")
    //div.classList.add(type)
    content.appendChild(div)

    label.textContent = title
    div.appendChild(label)

    input.value = text
    input.readOnly = true
    div.appendChild(input)
}

// fehando popup
function closePopUp() {
    let popup = document.getElementById("pop-up-bg")
    popup.style.display = 'none'
}