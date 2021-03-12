// Passando valores para o Input
function addValue(elementId) {
    let inputValues = document.getElementById("putValues");
    if (inputValues.value.length <= 8) {
        inputValues.value += elementId
    } else {
        alert("Quantidade de digitos máxima atingida")
    }
}

// Passando o operar matemático para o Input
function addOperator(elementId) {
    let inputOperator = document.getElementById("putValues")
    inputOperator.value += elementId
}

var resultadoFinal;
var historicValues = [];

// Calculando o resultado presente no Input
function calculateResult() {
    let inputValues = document.getElementById("putValues").value

    // Transformando o valor do Input em String, tornando assim mais facil a "captação" dos sinais matemáticos
    let expression = new String(inputValues)
    console.log(inputValues)

    if (inputValues == "" || inputValues == null) {
        alert("Impossivel de calcular")
    } else {
        // Verificando qual expressão esta sendo utilizada, e fazendo o calculo respectivamente.
        for (i = 0; i < expression.length; i++) {
            if (expression.charAt(i) == "+") {
                let numbers = new String(expression.split("+"))
                console.log(numbers)
                n1 = numbers.substring(0, numbers.indexOf(","))
                n2 = numbers.substring(numbers.indexOf(",") + 1, numbers.length)
                symbol = "+"
                console.log(n1)
                console.log(n2)
                resultadoFinal = parseInt(n1) + parseInt(n2)
                console.log(resultadoFinal)

                document.getElementById("putValues").value = resultadoFinal

            } else if (expression.charAt(i) == "-") {
                let numbers = new String(expression.split("-"))
                n1 = numbers.substring(0, numbers.indexOf(","))
                n2 = numbers.substring(numbers.indexOf(",") + 1, numbers.length)
                symbol = "-"
                resultadoFinal = parseInt(n1) - parseInt(n2)

                document.getElementById("putValues").value = resultadoFinal

            } else if (expression.charAt(i) == "*") {
                let numbers = new String(expression.split("*"))
                n1 = numbers.substring(0, numbers.indexOf(","))
                n2 = numbers.substring(numbers.indexOf(",") + 1, numbers.length)
                symbol = "*"
                resultadoFinal = parseInt(n1) * parseInt(n2)

                document.getElementById("putValues").value = resultadoFinal

            } else if (expression.charAt(i) == "/") {
                let numbers = new String(expression.split("/"))
                n1 = numbers.substring(0, numbers.indexOf(","))
                n2 = numbers.substring(numbers.indexOf(",") + 1, numbers.length)
                symbol = "/"
                resultadoFinal = parseInt(n1) / parseInt(n2)

                document.getElementById("putValues").value = resultadoFinal

            } else if (expression.charAt(i) == "%") {
                let numbers = new String(expression.split("%"))
                n1 = numbers.substring(0, numbers.indexOf(","))
                n2 = numbers.substring(numbers.indexOf(",") + 1, numbers.length)
                symbol = "%"
                resultadoFinal = (parseInt(n1) * parseInt(n2)) / 100

                document.getElementById("putValues").value = resultadoFinal
            }
        }

        // Verificando sé o valor retornardo é valido
        if (!isNaN(resultadoFinal)) {
            historicValues.push({
                firstValue: n1,
                secondValue: n2,
                operator: symbol,
                res: resultadoFinal
            }) 
        } else {
            alert("Valor invalido!") 
        }               
        console.log(historicValues)
    }
}

// Deletando/Removendo o ultimo valor inserido dentro do Input
function removeLastNumber() {
    let inputValues = document.getElementById("putValues")

    inputValues.value = inputValues.value.substring(0, inputValues.value.length - 1)
    console.log("Last number deleted")
}

// Limpando todo o campo Input
function clearAll() {
    document.getElementById("putValues").value = ""
}

// Mostrar o historico da calculadora
function showHistoric() {
    if (resultadoFinal == null) {
        alert("Histórioco vazio, faça um calculo!")
    } else {
        let calc_buttons = document.querySelector("#calculator-buttons")
        let show_historic = document.querySelector("#showHistoric")
        let input_historic = document.querySelector("#inputHistoric")
        let elementsHistoric = document.querySelectorAll(".inputRes")

        calc_buttons.classList.add("sectionUnder")
        show_historic.classList.add("historic")

        // Limpando todos os calculos presente até o momento, para que o proximo "for" não ocorra uma duplicação de calculos.
        for (e of elementsHistoric) {
            e.remove()
        }

        // Mostrando todos os calculos feitos que estao dento do objeto.
        for(e of historicValues) {
            let valor = `${e.firstValue} ${e.operator} ${e.secondValue}`
            // Criando elemento input
            let input = document.createElement("input")
            input.setAttribute(`class`, `inputRes`)


            // Atribuindo seu respectivo "value"
            input.value = `${valor} = ${e.res}`
            
            // Passando valore para calculadora ao clicar no resultado            
            input.addEventListener("click", function()  {                
                clearAll()
                addValue(valor)
                closeHistoric()
            })
            input_historic.appendChild(input)
        }
    }
}

// Limpara o historico - remove todos os calculos
function clearHistoric() {
    if (window.confirm("Deseja deletar tudo?")) {

        // Removendo os campos do historico
        let elementsHistoric = document.querySelectorAll(".inputRes")
        for (e of elementsHistoric) {
            e.remove()
        }

        // Limpando todos os valores armazenados
        historicValues = [];
        resultadoFinal = "";

        clearAll()
        closeHistoric()
    }
}

// Função que fecha todo o historico e volta a calculadora
function closeHistoric() {
    let calc_buttons = document.querySelector("#calculator-buttons")
    let historic = document.querySelector("#showHistoric")

    calc_buttons.classList.remove("sectionUnder")
    historic.classList.remove("historic")
}