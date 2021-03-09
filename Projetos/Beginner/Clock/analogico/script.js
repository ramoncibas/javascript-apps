const seconds = document.querySelector(".seconds")
const minutes = document.querySelector(".minutes")
const hours = document.querySelector(".hour")

setInterval(() => {
    let time = new Date()
    let hour = time.getHours() * 30
    let minute = time.getMinutes() * 6
    let secns = time.getSeconds() * 6

    seconds.style.transform = `rotateZ(${secns}deg)`
    minutes.style.transform = `rotateZ(${minute}deg)`
    hours.style.transform = `rotateZ(${hour+(minute/12)}deg)`
})

digitalClock = setInterval(() => {
    let p_hour = new Date().toLocaleTimeString('pt-br')
    document.querySelector(".digital-hour").innerHTML = p_hour
}, 1000)

window.addEventListener("DOMContentLoaded", digitalClock)