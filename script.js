const facts = [
  "Liczba 0 została upowszechniona w Indiach i całkowicie zmieniła matematykę.",
  "Liczba π jest niewymierna i jej rozwinięcie dziesiętne nigdy się nie kończy.",
  "Suma kątów wewnętrznych trójkąta w geometrii euklidesowej wynosi 180°.",
  "Liczby pierwsze są podstawowym budulcem wszystkich liczb naturalnych większych od 1.",
  "Istnieją nieskończenie wiele liczb pierwszych – udowodnił to Euklides.",
  "Liczba e (około 2,71828) pojawia się naturalnie przy opisie wzrostu wykładniczego.",
  "Każdą dodatnią liczbę całkowitą można zapisać jako sumę co najwyżej czterech kwadratów.",
  "W sudoku nie używa się działań matematycznych – to łamigłówka logiczna oparta na ograniczeniach.",
  "Twierdzenie Pitagorasa było znane w różnych kulturach jeszcze przed Pitagorasem.",
  "Fraktale, takie jak zbiór Mandelbrota, pokazują nieskończoną złożoność przy dowolnym powiększeniu.",
  "Liczba 1729 to najmniejsza liczba, którą można zapisać jako sumę dwóch sześcianów na dwa różne sposoby.",
  "W geometrii nieeuklidesowej suma kątów trójkąta może być różna od 180°.",
  "Istnieją liczby przestępne, których nie da się otrzymać jako rozwiązania żadnego wielomianu o współczynnikach całkowitych.",
  "Paradoks hotelu Hilberta pokazuje, jak zaskakująco działa pojęcie nieskończoności.",
  "Liczby pierwsze Mersenne’a mają postać 2^n − 1 i są związane z największymi znanymi liczbami pierwszymi."
];

const quizQuestions = [
  {
    text: "Czy liczba 1 jest liczbą pierwszą?",
    correct: false,
    explanation: "Nie. Liczby pierwsze mają dokładnie dwa dzielniki: 1 i samą siebie."
  },
  {
    text: "Czy 144 jest kwadratem liczby całkowitej?",
    correct: true,
    explanation: "Tak, ponieważ 12 × 12 = 144."
  },
  {
    text: "Czy istnieje największa liczba pierwsza?",
    correct: false,
    explanation: "Nie, liczb pierwszych jest nieskończenie wiele."
  },
  {
    text: "Czy liczba π jest liczbą wymierną?",
    correct: false,
    explanation: "Nie, π jest liczbą niewymierną."
  }
];

const factText = document.getElementById("fact-text");
const factBtn = document.getElementById("fact-btn");
const quizContainer = document.getElementById("quiz-container");
const nextQuestionBtn = document.getElementById("next-question-btn");
const quizFeedback = document.getElementById("quiz-feedback");
const quizScore = document.getElementById("quiz-score");
const fibCount = document.getElementById("fib-count");
const fibBtn = document.getElementById("fib-btn");
const fibResult = document.getElementById("fib-result");

let questionIndex = 0;
let answeredQuestions = 0;
let score = 0;
let isAnswered = false;

function pickRandomFact() {
  const randomIndex = Math.floor(Math.random() * facts.length);
  factText.textContent = facts[randomIndex];
}

function renderQuestion() {
  const question = quizQuestions[questionIndex];
  isAnswered = false;
  quizFeedback.textContent = "";
  quizFeedback.className = "";
  quizContainer.innerHTML = `
    <p>${question.text}</p>
    <div class="answer-buttons">
      <button data-answer="true">Prawda</button>
      <button data-answer="false">Fałsz</button>
    </div>
  `;
}

function updateScore() {
  quizScore.textContent = `Wynik: ${score} / ${answeredQuestions}`;
}

quizContainer.addEventListener("click", (event) => {
  const clicked = event.target;
  if (!(clicked instanceof HTMLButtonElement) || isAnswered) {
    return;
  }

  const userAnswer = clicked.dataset.answer === "true";
  const question = quizQuestions[questionIndex];
  answeredQuestions += 1;
  isAnswered = true;

  if (userAnswer === question.correct) {
    score += 1;
    quizFeedback.textContent = `Dobrze! ${question.explanation}`;
    quizFeedback.className = "feedback-ok";
  } else {
    quizFeedback.textContent = `Niestety nie. ${question.explanation}`;
    quizFeedback.className = "feedback-bad";
  }

  updateScore();
});

nextQuestionBtn.addEventListener("click", () => {
  questionIndex = (questionIndex + 1) % quizQuestions.length;
  renderQuestion();
});

function generateFibonacci(length) {
  if (length === 1) {
    return [0];
  }

  const sequence = [0, 1];
  while (sequence.length < length) {
    const last = sequence[sequence.length - 1];
    const previous = sequence[sequence.length - 2];
    sequence.push(last + previous);
  }

  return sequence;
}

fibBtn.addEventListener("click", () => {
  const amount = Number.parseInt(fibCount.value, 10);

  if (!Number.isInteger(amount) || amount < 1 || amount > 50) {
    fibResult.textContent = "Podaj poprawną wartość od 1 do 50.";
    fibResult.className = "feedback-bad";
    return;
  }

  fibResult.className = "";
  fibResult.textContent = `Ciąg: ${generateFibonacci(amount).join(", ")}`;
});

factBtn.addEventListener("click", pickRandomFact);
renderQuestion();
updateScore();
