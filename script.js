const userName = localStorage.getItem("name").charAt(0).toUpperCase().concat(localStorage.getItem("name").slice(1));

const questions = [
    { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: "4" },
    { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], answer: "Paris" },
    { question: "What is 5 * 6?", options: ["11", "30", "25", "35"], answer: "30" },
    { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Venus"], answer: "Mars" },
    { question: "What is the largest ocean on Earth?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], answer: "Pacific" }
];

// Allow for Addition of more questions
const setQuestion = (question, options, answer) => questions.push({question, options, answer})
setQuestion("What is the capital of Canada?",["Ottawa","Seatle","WashingtonDC","Chicago"],"Ottawa")
setQuestion("What is the longest River in Africa?",["Nile","Niger","Orange","Senegal"],"Nile")
addEntry("What is the capital of Ethiopia?",["Addis Ababa","Abidjan","Lome","Tokyo"],"Addis Ababa")
addEntry("Who is the prime minister of Canada?",["David Cameroon","Giorgia Meloni","Justin Tradeau", "Donald Tusk"],"Justin Tradeau")
addEntry("Who was Aristotle's teacher",['Aristole','Seneca','Plato','Martin Buber'],"Aristotle")
addEntry("Who is the Prime Minister of India?",["Narenda Modi","Benjamin Netanyahu","Xi Jinping","Kim Jong Un"], "Narenda Modi")


let currentQuestionIndex = 0;
let selectedAnswers = new Array(questions.length).fill(null);

console.log(selectedAnswers)

const questionEl = document.getElementById("question");
const player = document.getElementById("player");
const questionNumberEl = document.getElementById("question-number");
const optionsEl = document.getElementById("options");
const progressEl = document.getElementById("progress");
const nextButton = document.getElementById("next");
const prevButton = document.getElementById("prev");
const submitButton = document.getElementById("submit");
const resultEl = document.getElementById("result");

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;
    questionNumberEl.textContent = `Question ${currentQuestionIndex + 1}`;
    player.textContent = `Player: ${userName}`
    optionsEl.innerHTML = "";
    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.onclick = () => selectAnswer(button, option);
        if (selectedAnswers[currentQuestionIndex] === option) {
            button.classList.add("selected");
        }
        optionsEl.appendChild(button);
    });
    progressEl.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    prevButton.classList.toggle("hidden", currentQuestionIndex === 0);
    nextButton.classList.toggle("hidden", currentQuestionIndex === questions.length - 1);
    submitButton.classList.toggle("hidden", currentQuestionIndex !== questions.length - 1);
}

function selectAnswer(button, selectedAnswer) {
    selectedAnswers[currentQuestionIndex] = selectedAnswer;
    Array.from(optionsEl.children).forEach(btn => btn.classList.remove("selected"));
    button.classList.add("selected");
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    }
});

prevButton.addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
});

submitButton.addEventListener("click", () => {
    let score = 0;
    document.querySelector(".quiz-container").innerHTML = `<h3 class="con">Results:</h3>`;
    questions.forEach((q, index) => {
        let isCorrect = selectedAnswers[index] === q.answer;
        document.querySelector(".quiz-container").innerHTML += `<p>${index + 1}. ${q.question} <br> Your Answer: <span class="${isCorrect ? 'correct' : 'incorrect'}">${selectedAnswers[index] || "No Answer"}</span> <br> Correct Answer: <span class="correct">${q.answer}</span></p>`;
        if (isCorrect) score++;
    });
    document.querySelector(".quiz-container").innerHTML += `<h3 class="score">${userName}, You scored ${score} out of ${questions.length}!`;
   
    document.querySelector(".quiz-container").className = "neww"
});


loadQuestion();
