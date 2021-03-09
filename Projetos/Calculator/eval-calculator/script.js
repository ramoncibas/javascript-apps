// Adicionando o numero clicado ao input contendo seu respectivo valor
function addValue(elementId) {     
    // Tratando possiveis erros
    if (getNumber.value == "0" || getNumber.value == "Syntax error") { 
        getNumber.value = elementId
    } else {
        getNumber.value += elementId
        console.log(elementId)       
}

// Adicionando o operador clicado ao input contendo seu respectivo valor
function addOperator(elementId) {    
    // Tratando possiveis erros
    if (getNumber.value == "0" || getNumber.value == "Syntax error") { 
        getNumber.value = "0"
    } else {
        getNumber.value += elementId        
        console.log(elementId)
    }
}

// Incluindo valores decimais
function setDecimal(elementId, status) {     
    getNumber.value += elementId.textContent
    //document.getElementById("dot").disable = status
    console.log(elementId.textContent)
}

// Removendo o ultimo valor digitado dentro do input
function removeLastNumber() {     
    if (getNumber.value.length == 1 || getNumber.value == "0") {
        getNumber.value = "0"
        document.getElementById("dot").disable = false
    }else {
        getNumber.value = getNumber.value.substring(0, getNumber.value.length - 1)
        console.log("Last number deleted")
    }
}

// Limpando todos os valores do input
function clearAll() { 
    document.getElementById("putValues").value= "0"    
    console.log("Clear input cliked.")    
}

// Calculando o resultado com os respectivos valores dentro do input
function calculateResult() { 
    try {
        if (getNumber.value != "") {
            let calculateResult = eval(getNumber.value);
            getNumber.value = calculateResult;
            console.log(getNumber.value)                        
        }
    } catch (err) {    
        getNumber.value = "Syntax error";
    }    
}

function showHistoric() {
    let calc_buttons = document.querySelector("#calculator-buttons")
    let show_historic = document.querySelector("#showHistoric")
    let input_historic = document.querySelector("#inputHistoric")
    let elementsHistoric = document.querySelectorAll(".inputRes")

    calc_buttons.classList.add("sectionUnder")
    show_historic.classList.add("historic")

    for (e of elementsHistoric) {
        e.remove()
    }



}

// Função que fecha todo o historico e volta a calculadora
function closeHistoric() {
    let calc_buttons = document.querySelector("#calculator-buttons")
    let historic = document.querySelector("#showHistoric")
    
    calc_buttons.classList.remove("sectionUnder")
    historic.classList.remove("historic")
}