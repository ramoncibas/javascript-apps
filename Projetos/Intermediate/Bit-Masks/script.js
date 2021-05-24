// Mudar a procura para bitwise
function searchCities() {
    let searchvalue = document.querySelector("input[type=text]");
    let checkbox = document.querySelectorAll("input[type=checkbox]");

    for (i = 0; i < checkbox.length; i++) {
        if (checkbox[i].value == searchvalue.value) {
            console.log(checkbox[i]);
        }
    }
}