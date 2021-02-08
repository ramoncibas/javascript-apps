function bin2dec() {
    let txtbin = document.querySelector('input#txtbin')
    let txtdec = document.querySelector('input#txtdec')

    if (txtbin.value.length > 8) {
        alert('Máximo de 8 digitos!')

    } else if (isNaN(txtbin.value)) {
        alert('Valor digitado invalido!')

    } else {
        let binario = txtbin.value.split('').reverse()
        let decimal = 0

        for (let c = 0; c < binario.length; c++) {
            if (binario[c] === '1') {
                decimal += Math.pow(2, c)
            }
        }
        txtdec.value = decimal
    }
}