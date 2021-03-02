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
const createNote = function ({
    noteTitle,
    noteText,
    noteType,
    noteId
}, noteStatus) {
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
            showPopOver(divId)
        } else {
            showPopOver(noteId)
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
function showPopOver(divId) {
    var both_element = document.querySelectorAll("#content-notes textarea")    

    var title_popover = document.querySelector(".title")
    var text_popover = document.querySelector(".text")

    document.getElementById("popover-note").style.display = "flex"    

    let noteTitle = document.querySelector(`#${divId} h4`)
    let noteText = document.querySelector(`#${divId} p`)

    title_popover.value = noteTitle
    text_popover.value = noteText

    for (e of both_element) {
        e.addEventListener("change", function () {
            title = this.value
            text = this.value
            editNote(title, text)
        })
    }
    

    // editando a anotacao
    const editNote = function (title, text) {
        const btn_save = document.getElementById("btnsave")
        const btn_delete = document.getElementById("btndelete")

        // passando funcionalidades aos botoes do popover
        if (title != title_note.textContent || text != txt_note.textContent) {            
            btn_delete.classList.remove("fullsize")
            btn_save.style.display = "inline-block"
            
            btn_save.addEventListener("click", saveEditedNote)
        }

        // salvando a anotação editada
        saveEditedNote = function() {
            title_note.textContent = title
            txt_note.textContent = text

            closePopUp("popover")
        }        
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
            for (var i in notas) {
                notes.noteTitle = notas[i]["noteTitle"]
                notes.noteText = notas[i]["noteText"]
                notes.noteType = notas[i]["noteType"]
                notes.noteId = notas[i]["noteId"]
                console.log(notes)
                // criando a nota com os respectivos valores do localStorage
                createNote(notes, noteStatus)
            }
        }
        getItems()
    } else {
        console.log("Empty localStorage")
    }
})