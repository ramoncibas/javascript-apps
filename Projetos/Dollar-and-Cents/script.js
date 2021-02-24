// trasfroma o valor digitado em centavos de dolar
function toCents() {
    let inputValues = document.querySelector('input#txtvalue').value
    let res = document.querySelector('div#res')

    if (inputValues == '') {
        alert('Digite um valor a ser convertido em ¢!')

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

// divide o valor que o usuario informar e retorna o respectivo valor jutamente com sua cedula
function toDolar() {
    let inputValues = document.querySelector('input#txtvalue').value
    let res = document.querySelector('div#res')

    if (inputValues == '') {
        alert('Digite um valor a ser convertido em U$!')
    } else {
        function dolls(number) {
            let washington, tJefferson, lincoln, hamilton, jackson, grant, bFranklin;

            bFranklin = Math.floor(number / 100)
            res = number % 100

            grant = Math.floor(res / 50)
            res = res % 50

            jackson = Math.floor(res / 20)
            res = res % 20

            hamilton = Math.floor(res / 10)
            res = res % 10

            lincoln = Math.floor(res / 5)
            res = res % 5

            tJefferson = Math.floor(res / 2)
            res = res % 2

            washington = Math.floor(res / 1)


            // retornando valores para o html
            return `
                <p class="p_output"> President Dolls:
                <br>P. Benjami F. Dolls <strong>(U$100)</strong> = ${bFranklin}
                <br>P. Grant Dolls <strong>(U$50)</strong> = ${grant}
                <br>P. Jackson Dolls <strong>(U$20)</strong>= ${jackson}
                <br>P. Hamilton Dolls <strong>(U$10)</strong> = ${hamilton}
                <br>P. A. Lincoln Dolls <strong>(U$5)</strong> = ${lincoln}
                <br>P. Thomas J. Dolls <strong>(U$2)</strong> = ${tJefferson}
                <br>P. Washington Dolls <strong>(U$1)</strong> = ${washington}
                </p>
            `
        }

        res.innerHTML = `<p class="p_output">Total de cents: ${inputValues}</p>` + dolls(inputValues)
    }
}