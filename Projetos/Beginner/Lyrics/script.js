// Buscando a letra na api
function findLyrics(artist, song) {
    return fetch(`https://api.lyrics.ovh/v1/${artist}/${song}`);
}

// Passando um novo evento para o formulario
const form = document.querySelector("#frm_lyrics")
form.addEventListener("submit", el => {
    el.preventDefault()
    newSubmit()
});

// Passando os parametros que o usuario digitar para a busca na "api"
async function newSubmit() {
    const lyrics = document.querySelector("#lyrics")
    const artist = document.querySelector("#artist")
    const song = document.querySelector("#song")

    // "Buscando..." enquanto não retorna nada da "api"
    lyrics.innerHTML = '<span class="loading">Buscando...</span>';

    try {
        // Pegando a letra da api
        const lyricsRes = await findLyrics(artist.value, song.value)
        console.log(lyricsRes)

        // Retornando um objeto json
        const data = await lyricsRes.json()
        console.log(data)
        lyrics.innerHTML = data.lyrics;

    } catch (err) {
        console.log(err)
    }
}