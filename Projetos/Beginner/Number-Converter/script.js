var optValue;
const btn_convert = document.querySelector(".btn-convert")
const select1 = document.querySelector("#select1")

// validação de valor maximo de caracteres
function maxNumber(e) {
    let txtbin = document.querySelector("input#txtbin")
    if (e.length > 8) {
        alert("Máximo de 8 digitos!")
        txtbin.value = ""
        txtbin.focus()

    } else if (isNaN(e)) {
        alert("Valor digitado invalido!")
        txtbin.value = ""
        txtbin.focus()
    }
}

// passando evento ao select, retornando o valor selecionado
select1.addEventListener("change", (e) => {
    let txtbin = document.querySelector("input#txtbin")
    let res = document.querySelector("#res h2")
    let inputValue = document.querySelector("#res input")

    inputValue.value = ""
    inputValue.style.display = "none"

    if (e.target.value == "dec") {
        btn_convert.addEventListener("click", bin2Dec)

        optValue = "Decimal"
        console.log("decimal")
        txtbin.value = ""
        res.textContent = ""

    } else if (e.target.value == "bin") {
        btn_convert.addEventListener("click", convertBin)

        optValue = "Binario"
        console.log("binario")
        txtbin.value = ""
        res.textContent = ""

    } else if (e.target.value == "hex") {
        btn_convert.addEventListener("click", convertHex)

        optValue = "Hexadecimal"
        txtbin.value = ""
        res.textContent = ""

        console.log("Hexadecimal convert")
    }
})

// convertendo valores de binario para decimal
function bin2Dec() {
    let txtbin = document.querySelector("#txtbin")

    let res = document.querySelector("#res h2")
    let inputValue = document.querySelector("#res input")
    inputValue.style.display = "flex"

    let binario = txtbin.value.split("").reverse()
    let decimal = 0

    for (let c = 0; c < binario.length; c++) {
        if (binario[c] === "1") {
            decimal += Math.pow(2, c)
        }
    }

    res.textContent = optValue + ":"
    inputValue.value = decimal
    inputValue.addEventListener("click", () => {
        clickToCopy(decimal)
    })
}

// convertendo valores de decimal para binario
function convertBin() {
    let txtbin = document.querySelector("input#txtbin")
    let res = document.querySelector("#res h2")
    let inputValue = document.querySelector("#res input")
    inputValue.style.display = "flex"

    let dec = Number(txtbin.value)
    let binary = dec.toString(2)

    res.textContent = optValue + ":"
    inputValue.value = binary
    inputValue.addEventListener("click", () => {
        clickToCopy(binary)
    })
}

// convertendo valores de decimal para hexadecimal
function convertHex() {
    let txtbin = document.querySelector("input#txtbin")
    let res = document.querySelector("#res h2")
    let inputValue = document.querySelector("#res input")
    inputValue.style.display = "flex"

    let dec = Number(txtbin.value)
    let hexadecimal = dec.toString(16)

    res.textContent = optValue + ":"
    inputValue.value = hexadecimal
    inputValue.addEventListener("click", () => {
        clickToCopy(hexadecimal)
    })
}

// função que possibilita o usuario copiar o valor do input somente clicando nele
function clickToCopy(e) {
    navigator.clipboard.writeText(e);
}