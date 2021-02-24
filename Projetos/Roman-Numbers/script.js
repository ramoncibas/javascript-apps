let numbersAndNumerals = [
    { number: 1000, roman: 'M'},
    { number: 900, roman: 'CM'},
    { number: 500, roman: 'D'},
    { number: 400, roman: 'CD'},
    { number: 100, roman: 'C'},
    { number: 90, roman: 'XC'},
    { number: 50, roman: 'L'},
    { number: 40, roman: 'XL'},
    { number: 10, roman: 'X'},
    { number: 9, roman: 'IX'},
    { number: 5, roman: 'V'},
    { number: 4, roman: 'IV'},
    { number: 1, roman: 'I'},

]

// convertendo valores numericos para algarismo romanos
function convert() {
    let romanLetter = ''

    let inputValue = document.getElementById("txtnumber")
    let inputRes = document.getElementById("txtres")
    let number = inputValue.value

    for (i=0; i < numbersAndNumerals.length; i++) {
        if (numbersAndNumerals[i].number <= number) {
            number -= numbersAndNumerals[i].number
            romanLetter += numbersAndNumerals[i].roman
            
            i--;
        }
    }
    inputRes.value = romanLetter
}