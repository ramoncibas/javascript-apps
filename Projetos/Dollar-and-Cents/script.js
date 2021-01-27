function convert() {
    let inputValues = document.querySelector('input#txtvalue').value    
    let res = document.querySelector('div#res')    

    if (inputValues == '') {
        alert('Digite um valor a ser convertido em ¢!')              
        
    } else if (inputValues > 1) {
        alert('Valor maior que o esperado!')
    
    } else {        
        function coins(number) {
            // Quarters 25 ¢, Dimes 10 ¢, Nickels 5 ¢, Pennies 1 ¢
            let penny, nickel, dime, quarter, res;
            quarter = Math.floor(number / 25)
            res = number % 25

            dime = Math.floor(res / 10)
            res = res % 10

            nickel = Math.floor(res / 5)
            res = res % 5

            penny = Math.floor(res / 1)
            
            return `
                <p class="p_output"> Cents:
                    <br>Quarter <strong>(¢25)</strong> = ${quarter}
                    <br>Dimes <strong>(¢10)</strong> = ${dime}
                    <br>Nickel <strong>(¢5)</strong>= ${nickel}
                    <br>Pennies <strong>(¢1)</strong> = ${penny}
                </p>
            `
        }
        
        let cents;
        // Convertendo dolars para centavos. Math.round() é usado para arredondar numeros 0.55 - 0.58
        cents = Math.round(inputValues * 100)
        res.innerHTML = `<p class="p_output">Total de cents: ${cents}</p>` + coins(cents)        
    }    
}