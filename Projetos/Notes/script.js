var typeOfNote;
// abrindo o pop-up para adicionar a anotação
const showPopUp = function () {
    let title_popup = document.getElementById("txtinput")
    let txt_popup = document.getElementById("txtarea")

    const btn_typeNote = document.querySelectorAll("#notes button")
    const btn_saveNote = document.querySelector(".content .btn-save")

    document.getElementById("pop-up-bg").style.display = "flex"

    // limpando o campo ao adicionar outra anotacao
    if (title_popup.value != "" || txt_popup.value != "") {
        title_popup.value = ""
        txt_popup.value = ""
    }

    // passando a funcao onde pega o tipo de anotacao para todos os botoes do popup
    for (e of btn_typeNote) {
        e.addEventListener("click", function (event) {
            const button = event.currentTarget

            const buttons = document.querySelectorAll("#notes button")
            buttons.forEach(removeActiveClass)

            function removeActiveClass(button) {
                button.classList.remove("active")
            }

            button.classList.add("active")

            typeOfNote = button.className
        })
    }

    btn_saveNote.addEventListener("click", saveNote)
}

// salvando anotação
const saveNote = function () {
    let title = document.getElementById("txtinput").value
    let text = document.getElementById("txtarea").value
    let status = false

    const noteSave = {
        noteTitle: title,
        noteText: text,
        noteType: typeOfNote,
        noteId: null
    }
    if (noteSave.noteType == undefined) {
        alert("Selecione o tipo da Nota!")

    } else {
        createNote(noteSave, status)
        closePopUp("popup")
    }
}

// criando elemento dentro do campo notas
const createNote = function ({ noteTitle, noteText, noteType, noteId }, noteStatus) {
    // criando elementos
    let content = document.getElementById("container")
    let div = document.createElement("div")
    let h4 = document.createElement("h4")
    let p = document.createElement("p")
    let randomId = Math.floor(Math.random() * 9999)

    // atribuindo valores aos elementos
    div.id = "div" + randomId
    div.setAttribute("class", `note ${noteType}`)
    div.addEventListener("click", function () {
        // passando o id correspondente da anotação                          
        if (noteId == "" || noteId == undefined) {
            let divId = this.id
            // passando o random id
            showPopOver(h4.textContent, p.textContent, noteType, divId)

        } else {
            // passando os valores vindo do localStorage
            showPopOver(noteTitle, noteText, noteType, noteId)
        }
    })
    content.appendChild(div)

    h4.textContent = noteTitle
    div.appendChild(h4)

    p.setAttribute("class", "content-note")
    p.innerText = noteText
    div.appendChild(p)

    //passando anotaçoes para o localstorage somente quando criar a nota pela primeira vez
    if (noteStatus == false) {
        var notes = localStorage["notes"] ? JSON.parse(localStorage["notes"]) : []
        notes.push({
            noteTitle: h4.textContent,
            noteText: p.textContent,
            noteType: noteType,
            noteId: div.id
        })
        localStorage.setItem("notes", JSON.stringify(notes))
    } else {
        console.log("Window Load")
    }
}

// mostrar o popover
function showPopOver(title, text, type, divId) {
    document.getElementById("popover-note").style.display = "flex"
    let popoverTitle = document.querySelector(".title")
    let popoverText = document.querySelector(".text")
    let txtarea = document.querySelectorAll("#content-notes textarea")
    const btn_delete = document.getElementById("btndelete")

    // atribuindo valores ao popup correspondete ao click do usuario
    popoverTitle.value = title
    popoverText.value = text

    btn_delete.addEventListener("click", deleteNote)

    for (e of txtarea) {
        e.addEventListener("change", e => {
            const btn_save = document.getElementById("btnsave")

            // passando funcionalidades aos botoes do popover
            if (e != popoverTitle.value || e != popoverText.value) {
                btn_delete.classList.remove("fullsize")
                btn_save.style.display = "inline-block"

                btn_save.addEventListener("click", saveEditedNote)

            } else {
                btn_save.style.display = "none"
            }

            // salvando a anotação editada
            function saveEditedNote() {
                // code...
            }
        })
    }

    // funcao deletar anotação
    function deleteNote() {
        // remove o item de acordo com o id
        const data = JSON.parse(localStorage.getItem("notes")).filter(item => item.noteId !== divId)
        localStorage.setItem("notes", JSON.stringify(data))

        // refresh page
        location.reload(false)

        closePopUp()
    }
}


// fehando popup/popover
const closePopUp = function () {
    document.getElementById("pop-up-bg").style.display = "none"
    document.getElementById("popover-note").style.display = "none"
}

window.addEventListener("DOMContentLoaded", () => {
    // verificando se tem alguma coisa no localStorage para ser renderizado
    if (localStorage.length >= 1) {
        var noteStatus = true

        // pegando os itens do localstorage
        const getItems = function () {
            let notas = localStorage.getItem("notes") ? JSON.parse(localStorage.getItem("notes")) : [];
            const notes = {
                noteTitle: "",
                noteText: "",
                noteType: "",
                noteId: ""
            }

            // passando os respectivos valores do localStorage para o objeto notes
            for (i in notas) {
                notes.noteTitle = notas[i]["noteTitle"]
                notes.noteText = notas[i]["noteText"]
                notes.noteType = notas[i]["noteType"]
                notes.noteId = notas[i]["noteId"]
                // criando a nota com os respectivos valores do localStorage
                createNote(notes, noteStatus)
            }
        }
        getItems()
    } else {
        console.log("Empty localStorage")
    }
})