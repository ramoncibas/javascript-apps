// Passando valores para o Input
function addValue(elementId) {
    let inputValues = document.getElementById('putValues');
    if (inputValues.value.length <= 8) {        
        inputValues.value += elementId
    } else {
        alert('Quantidade de digitos ultrapassada')
    }    
}

// Passando o operar matemático para o Input
function addOperator(elementId) {
    let inputOperator = document.getElementById('putValues')
    inputOperator.value += elementId
}

var resultadoFinal;

// Calculando o resultado presente no Input
function calculateResult() {
    let inputValues = document.getElementById('putValues').value
    
    // Transformando o valor do Input em String, tornando assim mais facil a "captação" dos sinais matemáticos
    let expression = new String(inputValues)
    console.log(inputValues)
    
    // Verificando qual expressão esta sendo utilizada, e fazendo o calculo respectivamente.
    for (i=0; i < expression.length; i++) {        
        if(expression.charAt(i) == "+"){               
            let numbers = new String(expression.split('+'))
            console.log(numbers)
            n1 = numbers.substring(0, numbers.indexOf(','));
            n2 = numbers.substring(numbers.indexOf(',') + 1, numbers.length)
            symbol = "+"
            console.log(n1) 
            console.log(n2)
            resultadoFinal = parseInt(n1) + parseInt(n2);
            console.log(resultadoFinal)
            // historic(resultadoFinal,expression)
            document.getElementById('putValues').value = resultadoFinal;
            
        }else if (expression.charAt(i) == "-") {                    
            let numbers = new String(expression.split('-'))           
            n1 = numbers.substring(0, numbers.indexOf(','));
            n2 = numbers.substring(numbers.indexOf(',') + 1, numbers.length)   
            symbol = "-"         
            resultadoFinal = parseInt(n1) - parseInt(n2);       
            // historic(resultadoFinal,expression)
            document.getElementById('putValues').value = resultadoFinal;       
            
        } else if (expression.charAt(i) == "*") {                    
            let numbers = new String(expression.split('*'))           
            n1 = numbers.substring(0, numbers.indexOf(','));
            n2 = numbers.substring(numbers.indexOf(',') + 1, numbers.length)  
            symbol = "X"          
            resultadoFinal = parseInt(n1) * parseInt(n2);  
            // historic(resultadoFinal,expression)
            document.getElementById('putValues').value = resultadoFinal;       
            
        } else if (expression.charAt(i) == "/")  {
            let numbers = new String(expression.split('/'))           
            n1 = numbers.substring(0, numbers.indexOf(','));
            n2 = numbers.substring(numbers.indexOf(',') + 1, numbers.length)      
            symbol = "/"      
            resultadoFinal = parseInt(n1) / parseInt(n2);  
            // historic(resultadoFinal,expression)
            document.getElementById('putValues').value = resultadoFinal;       
            
        } else if (expression.charAt(i) == "%") {
            let numbers = new String(expression.split('%'))
            n1 = numbers.substring(0, numbers.indexOf(','))
            n2 = numbers.substring(numbers.indexOf(',') + 1, numbers.length)
            symbol = "%"
            resultadoFinal = (parseInt(n1) * parseInt(n2))/100
            // historic(resultadoFinal,expression)
            document.getElementById('putValues').value = resultadoFinal
        }        
    }         
}

// Deletando/Removendo o ultimo valor inserido dentro do Input
function removeLastNumber() {
    let inputValues = document.getElementById('putValues')
    
    inputValues.value = inputValues.value.substring(0, inputValues.value.length - 1)
    console.log('Last number deleted')
}

// Limpando todo o campo Input
function clearAll() {
    document.getElementById('putValues').value = ''
}

// Mostrar o historico da calculadora
function historic() {   
    if (resultadoFinal == null) {
        alert('Histórioco vazio, faça um calculo!')
    } else {
        let section = document.getElementsByTagName('section')[0]
        let historic = document.querySelector('div#closeHistoric')  
        
        section.classList.add("sectionUnder")
        historic.classList.add("historic") 
        
        // Criando elemento input
        let input = document.createElement('input')
        input.setAttribute(`class`, `name`)                
                
        // Passando valores para o historico
        input.setAttribute(`class`, `inputRes`)
        input.value = `${n1} ${symbol} ${n2} = ${resultadoFinal}`    
        
        // Passando valore para calculadora ao clicar no resultado
        input.addEventListener("click", () => {            
            let valor = `${n1}${symbol}${n2}`
            clearAll()
            addValue(valor)
            closeHistoric()
        })

        historic.appendChild(input)     
           
    }    
}

// Função que fecha todo o historico e volta a calculadora
function closeHistoric() {
    let section = document.getElementsByTagName('section')[0]
    let historic = document.querySelector('div#closeHistoric')
    
    section.classList.remove("sectionUnder")
    historic.classList.remove("historic")
}