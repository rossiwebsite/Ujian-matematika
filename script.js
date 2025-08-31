let questions = [];
let currentQuestion = 0;
let score = 0;
let mode = "easy"; // default

function startQuiz(selectedMode) {
  mode = selectedMode;
  questions = generateQuestions(mode);
  currentQuestion = 0;
  score = 0;

  document.getElementById("home").classList.add("hidden");
  document.getElementById("quiz").classList.remove("hidden");

  showQuestion();
}

function generateQuestions(mode) {
  let arr = [];
  let total = 20;

  for (let i = 0; i < total; i++) {
    let num1, num2;
    if (mode === "easy") {
      num1 = Math.floor(Math.random() * 20) + 1;
      num2 = Math.floor(Math.random() * 20) + 1;
    } else {
      num1 = Math.floor(Math.random() * 90) + 10;
      num2 = Math.floor(Math.random() * 90) + 10;
    }

    let ops = ["+", "-", "×", "÷"];
    let op = ops[Math.floor(Math.random() * ops.length)];
    let answer;

    switch (op) {
      case "+": answer = num1 + num2; break;
      case "-": answer = num1 - num2; break;
      case "×": answer = num1 * num2; break;
      case "÷": 
        answer = (num1 * num2) / num2; 
        num1 = num1 * num2; 
        break;
    }

    let options = [answer];
    while (options.length < 4) {
      let wrong = answer + Math.floor(Math.random() * 10) - 5;
      if (!options.includes(wrong)) options.push(wrong);
    }

    options.sort(() => Math.random() - 0.5);

    arr.push({ q: `${num1} ${op} ${num2} = ?`, answer, options });
  }

  return arr;
}

function showQuestion() {
  let q = questions[currentQuestion];
  document.getElementById("progress").innerText = `${currentQuestion+1}/20`;
  document.getElementById("question").innerText = q.q;

  q.options.forEach((opt, i) => {
    let btn = document.getElementById("ans"+i);
    btn.innerText = opt;
    btn.className = "";
    btn.disabled = false;
  });
}

function checkAnswer(i) {
  let q = questions[currentQuestion];
  let chosenBtn = document.getElementById("ans"+i);

  if (q.options[i] === q.answer) {
    chosenBtn.classList.add("correct");
    score++;
  } else {
    chosenBtn.classList.add("wrong");
    let correctIndex = q.options.indexOf(q.answer);
    document.getElementById("ans"+correctIndex).classList.add("correct");
  }

  for (let j=0; j<4; j++) {
    document.getElementById("ans"+j).disabled = true;
  }
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  document.getElementById("quiz").classList.add("hidden");
  document.getElementById("result").classList.remove("hidden");

  let nilai = Math.round((score / questions.length) * 100);
  let pesan = "";

  if (mode === "easy") {
    pesan = `Mantap! Kamu sudah berhasil menyelesaikan level easy 🎉\nNilai Kamu: ${nilai}`;
  } else if (mode === "hard") {
    pesan = `Luar biasa! Kamu berhasil menaklukkan soal sulit 🔥\nNilai Kamu: ${nilai}`;
  }

  document.getElementById("score").innerText = pesan;
}

function retryQuiz() {
  document.getElementById("result").classList.add("hidden");
  document.getElementById("quiz").classList.remove("hidden");
  startQuiz(mode);
}

function goHome() {
  document.getElementById("result").classList.add("hidden");
  document.getElementById("home").classList.remove("hidden");
}