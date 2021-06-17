// Elementos de buscar repositorio
let searchButton = document.querySelector(".search-button");
let userName = document.querySelector(".search-repos input");

let language = document.querySelectorAll(".repos-info .language")

// Buscar o usuario principal da aplicacao
async function searchUser(username) {
  try {
    fetch(`http://api.github.com/users/${username}/repos`).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          let containerRepos = document.querySelector(".container-repos");
          
          // Inserindo os repositorios no container
          for (i of data) {
            containerRepos.innerHTML += createElement(
              i.name, i.description, i.language, i.created_at, i.url
            );
          }
          insertingDataIntoLocalStorage(username, true);
        });        

      } else {
        alert("Ops! Usuario não encontrado...")
        return false;
      }
    });
  } catch(error) {
    console.log(error)    
    alert("Ops! Alguma coisa deu errado!")
  }
}

// Função que insere nome do usuario e se é a primeira visita no site do usuario no local storage
function insertingDataIntoLocalStorage(username, firsaccess) {
  var data = {
    firstAccess: firsaccess,
    userName: username
  }
  
  localStorage.setItem("first-access", JSON.stringify(data));  
}

// Função que retorna os cards com informaçoes do repositorio
function createElement(name, description, language, created_at, url) {  
  return `
    <div class="user-repos">  
      <div class="repos-info">
        <h2 class="title">${name}</h2>
        <h5 class="description">Descrição: ${description}</h5>
        <h5 class="language">Linguagem: ${language}</h5>
        <h5 class="created">Criado em: ${created_at}</h5>
        <button class="see-repos btn hover-white" 
          onclick="location.href='${url}'"
        >
          Ver repositorio
          <i class="fab fa-github"></i>
        </button>
      </div>
    </div>
  `;
}

// Função que retorna o modal para pesquisar
function modalSearchProfile() {
  return `
    <div class="bg-modal">
      <div class="modal-ghprofile">
        <i class="fab fa-github"></i>
        <h2>GitHub</h2>
        <input type="text" class="profile-text" placeholder="Digite o nome do seu perfil">
        <button class="search-profile btn hover-white">Buscar</button>
      </div>
    </div>
  `;
}

window.addEventListener("DOMContentLoaded", () => {
  var localData = localStorage.getItem("first-access");
  
  // Verificando se o localStorage esta vazio, se sim retorna o modal e chama a funcao de procurar o usuario no github.
  if(!localData) {
    let container = document.querySelector("#container");
    container.innerHTML += modalSearchProfile();

    // Mostrando o modal
    let modal = document.querySelector(".bg-modal");
    modal.style.display = "grid";

    // Botão e input do Modal
    let searchUserButton = document.querySelector(".search-profile");
    let searchUserInput = document.querySelector(".profile-text");

    searchUserButton.addEventListener("click", async () => {
      await searchUser(searchUserInput.value);
    });

  } else {
    let user = localData ? JSON.parse(localData) : [];
    searchUser(user.userName)
  }
});