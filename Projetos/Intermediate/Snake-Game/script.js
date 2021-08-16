const canvas = document.getElementById("snake");
const context = canvas.getContext("2d");
const box = 32;
const snake = [];
snake[0] = { x: 8 * box, y: 8 * box }
var direction = "right";

// Criando background no Canvas
function createBackground() {
    // Passando a cor para o canvas
    context.fillStyle = "lightgreen";
    // Desenhando retangulo, aonde acontecera o jogo
    // 16 x 16
    context.fillRect(0, 0, 16 * box, 16 * box);
}

// Passando a cor e o tamanho da cobrinha
function crearSnake() {
    for (i = 0; i < snake.length; i++) {
        context.fillStyle = "green"
        context.fillRect(snake[i].x, snake[i].y, box, box)
    }
}

// Passando o evento de atualizar direção quando a tecla for precionada
document.addEventListener("keydown", updateDirection);

/**
 * KeyCode: 
 * 37 - ArrowLeft
 * 38 - ArrowTop
 * 39 - ArrowRigh
 * 40 - ArrowDown
 */
function updateDirection(event) {
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}

// Função que da inicio ao game, adicionando o canvas na pagina, criando a cobrinha e tratando as margens do canvas.
function startGame() {
    // tratando margens da tela, se ela encostar em alguma margin aparecera na outra
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box & direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

    createBackground();
    crearSnake();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Setando as direções da cobrinha
    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;
    
    // Removendo o primeiro quadradinho da "cobrinha"
    snake.pop();

    // Novo quadradinho da cobrinha 
    let newHead = { x: snakeX, y: snakeY }    
    //Adicionando um "cobrina" no comeco
    snake.unshift(newHead);
}

// Atualizando o jogo a cada 100mls
const jogo = setInterval(startGame, 100);