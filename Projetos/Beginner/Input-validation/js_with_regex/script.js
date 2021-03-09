function formValidate() {
    // valores vindo dos campos do formulario
    let name = document.getElementsByTagName("input")[0],
        email = document.getElementsByTagName("input")[1],
        telefone = document.getElementsByTagName("input")[2],
        bornDate = document.getElementsByTagName("input")[3],
        url = document.getElementsByTagName("input")[4],
        cep = document.getElementsByTagName("input")[5];

    // regex respectivo de cada campo
    let regexName = /^(([A-Za-z]+[\-\']?)*([A-Za-z]+)?\s)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?$/,
        regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        regexTell = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g,
        regexBorn = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/,
        regexUrl = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/g,
        regexCep = /^([\d]{2})\.*([\d]{3})-*([\d]{3})$/;


    // validando campos digitados
    if (regexName.test(name.value) == false) {
        name.focus()
        console.log("Name == falso")

    } else if (regexEmail.test(email.value) == false) {
        email.focus()
        console.log("Email == falso")

    } else if (regexTell.test(telefone.value) == false) {
        telefone.focus()
        console.log("Tell == falso")

    } else if (regexBorn.test(bornDate.value) == false) {
        bornDate.focus()        
        console.log("bornDate == falso")

    } else if (regexUrl.test(url.value) == false) {
        url.focus()
        console.log(url.value)
        console.log("Url == falso")

    } else if (regexCep.test(cep.value) == false) {
        cep.focus()

        console.log("Cep == falso")

    }
}

// passando a mascara para o input
function mask(val, f) {
    setTimeout(() => {
        let res = maskPhone(val.value)
        if (res != val.value) {
            val.value = res
        }
    }, 1)
}

// criando a mascara para o input
function maskPhone(e) {
    let res = e.replace(/\D/g, "")
    res = res.replace(/^0/, "")

    if (res.length > 10) {
        res = res.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3")

    } else if (res.length > 5) {
        res = res.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");

    } else if (res.length > 2) {
        res = res.replace(/^(\d\d)(\d{0,5})/, "($1) $2")

    } else {
        res = res.replace(/^(\d*)/, "($1)")
    }
    return res
}