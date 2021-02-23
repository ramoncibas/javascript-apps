var optValue;    
const btn_convert = document.querySelector(".btn-convert")


select1.addEventListener("change", (e) => {    
    let txtbin = document.querySelector("input#txtbin")

    if (e.target.value == "dec") {
        btn_convert.addEventListener("click", bin2Dec)

        console.log('decimal')
        txtbin.value = ""

    } else if (e.target.value == "bin") {
        btn_convert.addEventListener("click", convertBin)

        console.log('binario')
        txtbin.value = ""

    } else {
        btn_convert.addEventListener("click", convertHex)

        console.log('hexadecimal')
        txtbin.value = ""

    }
})

function bin2Dec() {
    let txtbin = document.querySelector("input#txtbin")
    let res = document.querySelector("#res h2")
    
    if (txtbin.value.length > 8) {
        alert("Máximo de 8 digitos!")

    } else if (isNaN(txtbin.value)) {
        alert("Valor digitado invalido!")

    } else {
        let binario = txtbin.value.split("").reverse()
        let decimal = 0

        for (let c = 0; c < binario.length; c++) {
            if (binario[c] === "1") {
                decimal += Math.pow(2, c)
            }
        }
        res.textContent = `${optValue}: ${decimal}`
    }

}

function convertBin() {
    let txtbin = document.querySelector("input#txtbin")
    let res = document.querySelector("#res h2")
    
    if (txtbin.value.length > 8) {
        alert("Máximo de 8 digitos!")

    } else if (isNaN(txtbin.value)) {
        alert("Valor digitado invalido!")

    } else {
        let dec = Number(txtbin.value)
        let binary = dec.toString(2)

        res.textContent = `${optValue}: ${binary}`
    }
}

function convertHex() {
    let txtbin = document.querySelector("input#txtbin")
    let res = document.querySelector("#res h2")
    
    if (txtbin.value.length > 8) {
        alert("Máximo de 8 digitos!")

    } else if (isNaN(txtbin.value)) {
        alert("Valor digitado invalido!")

    } else {
        let dec = Number(txtbin.value)
        let hexadecimal = dec.toString(16)

        res.textContent = `${optValue}: ${hexadecimal}`
    }
}
