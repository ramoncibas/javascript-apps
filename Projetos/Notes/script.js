var noteOfType;

// abrindo o pop-up para adicionar a anotação
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

// selecionando o tipo de anotação
function selectNote(event) {
    const button = event.currentTarget

    const buttons = document.querySelectorAll("#notes button")
    buttons.forEach(removeActiveClass)

    function removeActiveClass(button) {
        button.classList.remove("active")
    }

    button.classList.add("active")

    noteOfType = button.className    
}

// salvando anotação
function saveNote() {
    if (noteOfType == undefined) {
        alert('Selecione o tipo da Nota!')

    } else {        
        // criando elemento dentro do campo notas
        function createNote() {
            let title_popup = document.getElementById("txtpopup").value
            let txt_popup = document.getElementById("txtnote").value

            let content = document.getElementById("container")
            let div = document.createElement("div")
            let h4 = document.createElement("h4")
            let p = document.createElement("p")

            div.setAttribute("class", `note ${noteOfType}`)

            div.addEventListener("click",() => {                
                document.getElementById("popover-note").style.display = "flex"

                let input = document.getElementById("txtpopover")
                let txtarea = document.getElementById("txtarea-popover")
                
                input.value = title_popup
                txtarea.value = txt_popup
            })

            content.appendChild(div)

            h4.textContent = title_popup
            div.appendChild(h4)

            p.setAttribute("class", "content-note")
            p.innerText = txt_popup
            div.appendChild(p)
        }

        createNote()
        closePopUp()
    }
}

// fehando popup
function closePopUp() {
    document.getElementById("pop-up-bg").style.display = "none"
    document.getElementById("popover-note").style.display = "none"
}