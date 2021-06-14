let searchButton = document.querySelector(".search-button");
let userName = document.querySelector(".search-repos input");

// Buscando repositorios no github
searchButton.addEventListener("click", () => {
  fetch(`https://api.github.com/users/${userName.value}/repos`)
  .then(response => {
      response.json().then(data => {
        console.log(data);
      });
    }
  );
});