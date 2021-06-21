// Buscar o usuario principal da aplicacao
async function searchUser(username) {
  let resApi = await fetch(`http://api.github.com/users/${username}/repos`);
  let resApiJson = await resApi.json();
  return resApiJson;
}

// Chamando a função que busca por novos repositorios
async function searchAndCreateRepositories() {
  let inputUserName = document.querySelector(".search-repos input");
  let dataApi = await searchUser(inputUserName.value);
  createElementsOfOtherRepos(dataApi);
}

// Função do Modal que busca o usuario
async function searchAndCreateUser() {
  let modal = document.querySelector(".bg-modal");
  let searchUserInput = document.querySelector(".profile-text");
  let dataApi = await searchUser(searchUserInput.value);

  // Criando elementos no html com os dados recebidos
  createElementsOfMyRepos(dataApi);

  // Inserindo usuario no localStorage
  insertingDataIntoLocalStorage(searchUserInput.value, false);

  modal.style.display = "none";
}

// Função que só mostra o modal
function showModal() {
  let modal = document.querySelector(".bg-modal");
  modal.style.display = "grid";
}

// Função que retorna os cards com informaçoes do repositorio do "usuario"
function createElementsOfMyRepos(dataApi) {
  let container = document.querySelector(".container-repos.my");
  let userProfileName = document.querySelector(".user-info h4");
  let userProfileImg = document.querySelector(".avatar-user img");

  // Atribuindo nome e a o avatar do usuario
  userProfileName.textContent = dataApi[0].owner.login;
  userProfileImg.src = dataApi[0].owner.avatar_url;

  // Limpando o container caso haja uma mudança do "perfil" do usuario
  container.innerHTML = "";

  for (i of dataApi) {
    container.innerHTML += `
      <div class="user-repos">
        <div class="repos-info">
          <h2 class="title">${i.name}</h2>
          <h5 class="description">Descrição: ${i.description}</h5>
          <h5 class="language">Linguagem: ${i.language}</h5>
          <h5 class="created">Criado em: ${i.created_at}</h5>
          <button class="see-repos btn hover-white"
          onclick="window.open('${i.html_url}', '_blank')"
          >
            Ver repositorio
            <i class="fab fa-github"></i>
          </button>
        </div>
      </div>
    `;
  }
}

// Função que retorna os cards com informaçoes de outros repositorios
function createElementsOfOtherRepos(dataApi) {
  let container = document.querySelector(".container-repos.other");
  container.innerHTML = "";

  for (i of dataApi) {
    container.innerHTML += `
      <div class="user-repos">
        <div class="repos-content">
          <div class="user-profile">
            <img src="${i.owner.avatar_url}" class="avatar-gh">
            <h2>${i.owner.login}</h2>
          </div>
          <div class="repos-info">
            <h5 class="repos">Repositório: ${i.name}</h5>
            <h5 class="description">Descrição: ${i.description}</h5>
            <h5 class="language">Language: ${i.language}</h5>
            <h5 class="created">Criado em: ${i.created_at}</h5>
          </div>
          <button class="see-repos btn hover-white"
          onclick="window.open('${i.html_url}', '_blank')"
          >
            Ver repositorio
            <i class="fab fa-github"></i>
          </button>
        </div>
      </div>
    `;
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

window.addEventListener("DOMContentLoaded", () => {
  var localData = localStorage.getItem("first-access");
  
  // Verificando se o localStorage esta vazio, se sim retorna o modal para procurar o usuario no github.
  if (!localData) {
    showModal();

  } else {
    // Criando elementos html ao iniciar a pagina com o usuario salvo no localStorage
    let user = localData ? JSON.parse(localData) : [];
    (async function () {
      let dataApi = await searchUser(user.userName);
      createElementsOfMyRepos(dataApi);
    })();
  }
});