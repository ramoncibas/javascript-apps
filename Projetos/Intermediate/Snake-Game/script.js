const canvas = document.getElementById("snake");
const context = canvas.getContext("2d");
const box = 32;
var snake = [];
snake[0] = { x: 8 * box, y: 8 * box };
var direction = "right";
const food = {
  x: Math.floor(Math.random() * 15 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box,
};

const gameOverBackground = document.querySelector(".game-over-img");
const btnStart = document.querySelector(".start");
const btnRestart = document.querySelector(".restart");

// Atualizando o jogo a cada 100mls
let interval = null;
const initGame = () => {
  interval = setInterval(() => {
    startGame();
  }, 100);
};

const stopGame = () => {
  clearInterval(interval);
};

// Adicionando o evento Iniciar Jogo
btnStart.addEventListener("click", initGame);
btnRestart.addEventListener("click", restartGame);

// Passando o evento de atualizar direção quando a tecla for precionada
document.addEventListener("keydown", updateDirection);

// Criando background no Canvas
function createBackground() {
  // Passando a cor para o canvas
  context.fillStyle = "#111130";
  // Desenhando retangulo, aonde acontecera o jogo
  // 16 x 16
  context.fillRect(0, 0, 16 * box, 16 * box);
}

// Passando a cor e o tamanho da cobrinha
function creatSnake() {
  for (i = 0; i < snake.length; i++) {
    context.fillStyle = "#F7A84A";
    context.fillRect(snake[i].x, snake[i].y, box, box);
  }
}

// Desenhando a comida no canvas
function drawFood() {
  context.fillStyle = "#85013E";
  context.fillRect(food.x, food.y, box, box);
}

/**
 * KeyCode:
 * 37 - ArrowLeft
 * 38 - ArrowTop
 * 39 - ArrowRigh
 * 40 - ArrowDown
 */
function updateDirection(event) {
  if (event.keyCode == 37 && direction != "right") direction = "left";
  if (event.keyCode == 38 && direction != "down") direction = "up";
  if (event.keyCode == 39 && direction != "left") direction = "right";
  if (event.keyCode == 40 && direction != "up") direction = "down";
}

// Função que da inicio ao game, adicionando o canvas na pagina, criando a cobrinha e tratando as margens do canvas.
function startGame() {
  let snakeLogo = document.querySelector(".snake-logo");
  snakeLogo.style.display = "none";
  btnStart.style.display = "none";

  // Tratando margens da tela, se ela encostar em alguma margin aparecera na outra
  if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
  if (snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
  if ((snake[0].y > 15 * box) & (direction == "down")) snake[0].y = 0;
  if (snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

  for (i = 1; i < snake.length; i++) {
    if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      gameOver();
    }
  }

  createBackground();
  creatSnake();
  drawFood();

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  // Setando as direções da cobrinha
  if (direction == "right") snakeX += box;
  if (direction == "left") snakeX -= box;
  if (direction == "up") snakeY -= box;
  if (direction == "down") snakeY += box;

  if (snakeX != food.x || snakeY != food.y) {
    // Removendo o primeiro quadradinho da "cobrinha"
    snake.pop();
  } else {
    // Passando novamente posicoes aleatoria para a comida
    food.x = Math.floor(Math.random() * 15 + 1) * box;
    food.y = Math.floor(Math.random() * 15 + 1) * box;
  }

  // Novo quadradinho da cobrinha
  let newHead = { x: snakeX, y: snakeY };
  //Adicionando um "cobrina" no comeco
  snake.unshift(newHead);
}

// Reiniciando o jogo.
function restartGame() {
  stopGame();
  snake = [];
  snake[0] = { x: 8 * box, y: 8 * box };

  gameOverBackground.style.display = "none";
  btnRestart.style.display = "none";
  initGame();
}

// Função que mostra a tela de "Game Over" para o usuario
function gameOver() {
  let gameOverSound = new Audio("./assets/game-over.mp3");
  gameOverSound.play();
  stopGame();

  gameOverBackground.style.display = "flex";
  btnRestart.style.display = "flex";
}