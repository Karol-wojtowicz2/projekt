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
const primeInput = document.getElementById("prime-input");
const primeBtn = document.getElementById("prime-btn");
const primeResult = document.getElementById("prime-result");
const gcdA = document.getElementById("gcd-a");
const gcdB = document.getElementById("gcd-b");
const gcdBtn = document.getElementById("gcd-btn");
const gcdResult = document.getElementById("gcd-result");
const lcmA = document.getElementById("lcm-a");
const lcmB = document.getElementById("lcm-b");
const lcmBtn = document.getElementById("lcm-btn");
const lcmResult = document.getElementById("lcm-result");
const factorialInput = document.getElementById("factorial-input");
const factorialBtn = document.getElementById("factorial-btn");
const factorialResult = document.getElementById("factorial-result");
const statsInput = document.getElementById("stats-input");
const statsBtn = document.getElementById("stats-btn");
const statsResult = document.getElementById("stats-result");

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

function isPrimeNumber(value) {
  if (value < 2) {
    return false;
  }

  if (value === 2) {
    return true;
  }

  if (value % 2 === 0) {
    return false;
  }

  const limit = Math.floor(Math.sqrt(value));
  for (let i = 3; i <= limit; i += 2) {
    if (value % i === 0) {
      return false;
    }
  }

  return true;
}

function calculateGcd(first, second) {
  let a = Math.abs(first);
  let b = Math.abs(second);

  while (b !== 0) {
    const rest = a % b;
    a = b;
    b = rest;
  }

  return a;
}

function calculateLcm(first, second) {
  if (first === 0 || second === 0) {
    return 0;
  }

  return Math.abs((first * second) / calculateGcd(first, second));
}

function calculateFactorial(value) {
  let result = 1;
  for (let i = 2; i <= value; i += 1) {
    result *= i;
  }

  return result;
}

function parseNumberList(rawInput) {
  return rawInput
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item.length > 0)
    .map((item) => Number(item));
}

function calculateMedian(sortedValues) {
  const middle = Math.floor(sortedValues.length / 2);

  if (sortedValues.length % 2 === 0) {
    return (sortedValues[middle - 1] + sortedValues[middle]) / 2;
  }

  return sortedValues[middle];
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

primeBtn.addEventListener("click", () => {
  const value = Number.parseInt(primeInput.value, 10);

  if (!Number.isInteger(value) || value < 0) {
    primeResult.textContent = "Podaj poprawną liczbę całkowitą dodatnią lub 0.";
    primeResult.className = "feedback-bad";
    return;
  }

  const isPrime = isPrimeNumber(value);
  const message = isPrime
    ? `Tak, ${value} jest liczbą pierwszą.`
    : `Nie, ${value} nie jest liczbą pierwszą.`;

  primeResult.textContent = message;
  primeResult.className = isPrime ? "feedback-ok" : "feedback-bad";
});

gcdBtn.addEventListener("click", () => {
  const first = Number.parseInt(gcdA.value, 10);
  const second = Number.parseInt(gcdB.value, 10);

  if (!Number.isInteger(first) || !Number.isInteger(second)) {
    gcdResult.textContent = "Podaj dwie poprawne liczby całkowite.";
    gcdResult.className = "feedback-bad";
    return;
  }

  if (first === 0 && second === 0) {
    gcdResult.textContent = "Dla pary 0 i 0 NWD nie jest określony.";
    gcdResult.className = "feedback-bad";
    return;
  }

  const gcd = calculateGcd(first, second);
  gcdResult.textContent = `NWD(${first}, ${second}) = ${gcd}`;
  gcdResult.className = "feedback-ok";
});

lcmBtn.addEventListener("click", () => {
  const first = Number.parseInt(lcmA.value, 10);
  const second = Number.parseInt(lcmB.value, 10);

  if (!Number.isInteger(first) || !Number.isInteger(second)) {
    lcmResult.textContent = "Podaj dwie poprawne liczby całkowite.";
    lcmResult.className = "feedback-bad";
    return;
  }

  if (first === 0 && second === 0) {
    lcmResult.textContent = "Dla pary 0 i 0 NWW nie jest określony.";
    lcmResult.className = "feedback-bad";
    return;
  }

  const lcm = calculateLcm(first, second);
  lcmResult.textContent = `NWW(${first}, ${second}) = ${lcm}`;
  lcmResult.className = "feedback-ok";
});

factorialBtn.addEventListener("click", () => {
  const value = Number.parseInt(factorialInput.value, 10);

  if (!Number.isInteger(value) || value < 0 || value > 170) {
    factorialResult.textContent = "Podaj poprawną liczbę całkowitą z zakresu 0-170.";
    factorialResult.className = "feedback-bad";
    return;
  }

  factorialResult.textContent = `${value}! = ${calculateFactorial(value)}`;
  factorialResult.className = "feedback-ok";
});

statsBtn.addEventListener("click", () => {
  const values = parseNumberList(statsInput.value);

  if (values.length === 0 || values.some((value) => !Number.isFinite(value))) {
    statsResult.textContent = "Wpisz co najmniej jedną poprawną liczbę oddzieloną przecinkami.";
    statsResult.className = "feedback-bad";
    return;
  }

  const sorted = [...values].sort((a, b) => a - b);
  const average = values.reduce((sum, value) => sum + value, 0) / values.length;
  const median = calculateMedian(sorted);

  statsResult.textContent = `Średnia: ${average.toFixed(2)} | Mediana: ${median}`;
  statsResult.className = "feedback-ok";
});

factBtn.addEventListener("click", pickRandomFact);
renderQuestion();
updateScore();
