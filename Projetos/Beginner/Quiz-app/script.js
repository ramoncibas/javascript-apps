const questionContainer = document.querySelector(".question-container");
const questionElement = document.querySelector(".question");
const answerButtons = document.querySelector(".answers-buttons");
const startButton = document.querySelector(".start");
const nextButton = document.querySelector(".next");

let currentQuestionIndex, shuffledQuestions;

// Passando eventos para os botões start e next
startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    setNextQuestion();
});

// Array (contendo objetos) de perguntas
const questions = [
    {
        question: "Quantos anos tem o Brasil desde a sua independência?",
        answers: [
            { text: "196", correct: true },
            { text: "2021", correct: false },
            { text: "1600", correct: false },
            { text: "1500", correct: false },
        ],
    },
    {
        question: "De quem é a famosa frase “Penso, logo existo”?",
        answers: [
            { text: "Platão", correct: false },
            { text: "Galileu Galilei", correct: false },
            { text: "Descartes", correct: true },
            { text: "Sócrates", correct: false },
        ],
    },
    {
        question: "De onde é a invenção do chuveiro elétrico?",
        answers: [
            { text: "França", correct: false },
            { text: "Inglaterra", correct: false },
            { text: "Austrália", correct: false },
            { text: "Brasil", correct: true },
        ],
    },
    {
        question: "Qual o menor e o maior país do mundo?",
        answers: [
            { text: "Nauru e China", correct: false },
            { text: "Vaticano e Rússia", correct: true },
            { text: "Mônaco e Canadá", correct: false },
            { text: "Malta e Estados Unidos", correct: false },
        ],
    },
];

// Função que inicia o Quiz
function startGame() {

    // Mostrando os bottões de perguntas ao clicar em iniciar
    startButton.classList.add("hide");
    questionContainer.classList.remove("hide");

    // Passando uma pergunta de forma aleatorioa do array
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;

    setNextQuestion();
}

// Indo para proxima tela de perguntas
function setNextQuestion() {
    resetState();

    // Retornando as pergunsta de forma "sortida"
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

// Mostrando as perguntas
function showQuestion(question) {
    questionElement.textContent = question.question;

    question.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("answer-button");

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
}

// Resetando as Perguntas
function resetState() {
    nextButton.classList.add("hide");
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

// Recuperando a Resposta escolhida
function selectAnswer() {

    // Atribuindo a estilizaçao dos botões a suas respectiva resposta
    Array.from(answerButtons.children).forEach((button) => {
        console.log(button)
        setStatusClass(button, button.dataset.correct);
    });

    // Verificando se ainda ha perguntas
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove("hide");
    } else {
        startButton.textContent = "Reiniciar";
        startButton.classList.remove("hide");
        questionContainer.classList.add("hide");
    }

    nextButton.classList.remove("hide");
}

// Estilizando os Botoes de acordo com a Resposta
function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add("correct");
    } else {
        element.classList.add("wrong");
    }
}

// Limpando as Classes adicionada a cada rodada
function clearStatusClass(element) {
    element.classList.remove("correct");
    element.classList.remove("wrong");
}