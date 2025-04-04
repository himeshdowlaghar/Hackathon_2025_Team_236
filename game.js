const questions = [
  {
    question: "What's a better method for irrigation?",
    choices: ["Flood Irrigation", "Drip Irrigation"],
    answer: 1
  },
  {
    question: "How can you recharge groundwater?",
    choices: ["Pave all surfaces", "Build recharge pits"],
    answer: 1
  },
  {
    question: "What to do during drought?",
    choices: ["Use water carefully", "Ignore and overuse water"],
    answer: 0
  },
  {
    question: "Best crop in low water areas?",
    choices: ["Sugarcane", "Millets"],
    answer: 1
  },
  {
    question: "What reduces water wastage?",
    choices: ["Micro-irrigation", "Overhead sprinklers"],
    answer: 0
  }
];

let score = 0;
let level = 1;
let timer;
let timeLeft = 10;
let currentQuestionIndex = 0;

function startGame() {
  score = 0;
  level = 1;
  currentQuestionIndex = 0;
  document.getElementById("score").innerText = "Score: 0";
  document.getElementById("level").innerText = level;
  document.getElementById("feedback").innerText = "";
  nextQuestion();
}

function nextQuestion() {
  if (currentQuestionIndex >= questions.length) {
    document.getElementById("question").innerText = "🎉 Game Over! Final Score: " + score;
    document.getElementById("choices").style.display = "none";
    document.getElementById("timer").style.display = "none";
    return;
  }

  const q = questions[currentQuestionIndex];
  document.getElementById("question").innerText = q.question;
  document.querySelectorAll("#choices button").forEach((btn, i) => {
    btn.innerText = q.choices[i];
  });

  document.getElementById("choices").style.display = "block";
  document.getElementById("timer").style.display = "block";
  timeLeft = 10;
  document.getElementById("time").innerText = timeLeft;

  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("time").innerText = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      handleChoice(-1); // timeout
    }
  }, 1000);
}

function handleChoice(index) {
  clearInterval(timer);

  const correct = questions[currentQuestionIndex].answer;
  let feedback = "";

  if (index === correct) {
    score += 10;
    feedback = "✅ Great choice!";
  } else if (index === -1) {
    feedback = "⏱️ Time's up!";
  } else {
    score -= 5;
    feedback = "❌ Wrong choice!";
  }

  document.getElementById("score").innerText = "Score: " + score;
  document.getElementById("feedback").innerText = feedback;

  currentQuestionIndex++;
  level = Math.floor(currentQuestionIndex / 2) + 1;
  document.getElementById("level").innerText = level;

  setTimeout(() => {
    document.getElementById("feedback").innerText = "";
    nextQuestion();
  }, 1500);
}
