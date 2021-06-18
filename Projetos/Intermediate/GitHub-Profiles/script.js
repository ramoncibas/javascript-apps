// Buscar o usuario principal da aplicacao
async function searchUser(username) {
  return(
    fetch(`http://api.github.com/users/${username}/repos`).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          let containerRepos = document.querySelector(".container-repos.my");
          let userProfileName = document.querySelector(".user-info h4");
          let userProfileImg = document.querySelector(".avatar-user img");
          
          // Atribuindo nome e a o avatar do usuario
          userProfileName.textContent = data[0].owner.login;
          userProfileImg.src = data[0].owner.avatar_url;
          
          // Inserindo os repositorios no container        
          for (i of data) {
            containerRepos.innerHTML += createElementsOfMyRepos(
              i.name, i.description, i.language, i.created_at, i.url
            );
          }
          insertingDataIntoLocalStorage(username, true);
        });

      } else {
        alert("Ops! Usuario não encontrado...")
        return false;
      }
    })
  );
}

// Funcao que busca por novos repositorios
async function searchReposGh(username) {
  try {
    fetch(`https://api.github.com/users/${username}/repos`).then(response => {
      if (response.ok) {
        response.json().then(data => {
          let containerRepos = document.querySelector(".container-repos.other");
          
          if (!containerRepos.lengh) containerRepos.innerHTML = "";
          
          for (i of data) {              
            containerRepos.innerHTML += createElementsOfOtherRepos(
              i.owner.avatar_url, i.owner.login, i.name, i.description, i.language, i.created_at, i.url
            );
          }
        })
      } else {
        alert("Ops! Usuario não encontrado...")
        return false;
      }
    })
  } catch(error) {
    console.log(error);
    alert("Ops! Alguma coisa deu errado!")
  }
}

// Chamando a função que busca por novos repositorios
async function searchRepositories() {
  let inputUserName = document.querySelector(".search-repos input");
  await searchReposGh(inputUserName.value)
}

// Função que retorna os cards com informaçoes de outros repositorios
function createElementsOfOtherRepos(avatar, username, name, description, language, created_at, url){
  return `
    <div class="user-repos">
      <div class="repos-content">

        <div class="user-profile">
          <img src="${avatar}" class="avatar-gh">
          <h2>${username}</h2>
        </div>

        <div class="repos-info">
          <h5 class="repos">Repositório: ${name}</h5>
          <h5 class="description">Descrição: ${description}</h5>
          <h5 class="language">Language: ${language}</h5>
          <h5 class="created">Criado em: ${created_at}</h5>
        </div>

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

// Função que retorna os cards com informaçoes do repositorio do "usuario"
function createElementsOfMyRepos(name, description, language, created_at, url) {
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

// Função que insere nome do usuario e se é a primeira visita no site do usuario no local storage
function insertingDataIntoLocalStorage(username, firsaccess) {
  var data = {
    firstAccess: firsaccess,
    userName: username
  }
  
  localStorage.setItem("first-access", JSON.stringify(data));  
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