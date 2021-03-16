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

async function newSubmit() {
    const lyrics = document.querySelector("#lyrics")
    const artist = document.querySelector("#artist")
    const song = document.querySelector("#song")    

    try {
        // Pegando a letra da api
        const lyricsRes = await findLyrics(artist.value, song.value)

        // Retornando um objeto json
        const data = await lyricsRes.json()        
        
        lyrics.innerHTML = data.lyrics;

    } catch (err) {
        console.log(err)
    }
}