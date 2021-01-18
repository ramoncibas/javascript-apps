// Adicionando o numero clicado ao input contendo seu respectivo valor
function addValue(elementId) { 
    let getNumber = document.getElementById('putValues')
    
    // Tratando possiveis erros
    if (getNumber.value == '0' || getNumber.value == 'Syntax error') { 
        getNumber.value = elementId
    } else {
        getNumber.value += elementId
    }
}

// Adicionando o operador clicado ao input contendo seu respectivo valor
function addOperator(elementId) {
    let getNumber = document.getElementById('putValues')
    
    // Tratando possiveis erros
    if (getNumber.value == '0' || getNumber.value == 'Syntax error') { 
        getNumber.value = '0'
    } else {
        getNumber.value += elementId
        document.getElementById('dot').disable = false
    }
}

// Incluindo valores decimais
function setDecimal(elementId, status) { 
    let getNumber = document.getElementById('putValues')
    
    getNumber.value += elementId.textContent
    document.getElementById('dot').disable = status
}

// Removendo o ultimo valor digitado dentro do input
function removeLastNumber() { 
    let getNumber = document.getElementById('putValues')
    
    if (getNumber.value.length == 1 || getNumber.value == '0') {
        getNumber.value = '0'
        document.getElementById('dot').disable = false
    }else {
        getNumber.value = getNumber.value.substring(0, getNumber.value.length - 1)
        console.log('Last number deleted')
    }
}

// Limpando todos os valores do input
function clearAll() {  
    document.getElementById('putValues').value= '0'
    document.getElementById('dot').disable = false
    console.log('Clear input cliked.')    
}

// Calculando o resultado com os respectivos valores dentro do input
function calculateResult() { 
    try {
        let getNumber = document.getElementById('putValues');
        if (getNumber.value != '') {
            let calculateResult = eval(getNumber.value);
            getNumber.value = calculateResult;
        }
    } catch (err) {    
        getNumber.value = 'Syntax error';    
    }
}
