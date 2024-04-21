const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const timerCounter = document.getElementById('timerCounter');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let questionTime = 5;
let timer = null;
const correctBonus = 20;
const maxQuestions = 5;
let correct = new Audio();
let incorrect = new Audio();

function startGame() {
    fetch('quiz_data.json')
        .then(response => response.json())
        .then(data => {
            questions = data;
            startGameAfterQuestionsLoaded();
        })
        .catch(error => console.error('Error fetching questions:', error));
}

function startGameAfterQuestionsLoaded() {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    counterRender();
    timer = setInterval(counterRender, 1000);
    getNewQuestion();
}

function getNewQuestion() {
    if (availableQuestions.length === 0 || questionCounter >= maxQuestions) {
        clearInterval(timer);
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign('end.html');
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${maxQuestions}`;
    progressBarFull.style.width = `${(questionCounter / maxQuestions) * 100}%`;
    questionTime = 5;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice, index) => {
        choice.innerText = currentQuestion['choice' + (index + 1)];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
}

choices.forEach(choice => {
  choice.addEventListener('click', e => {
      if (!acceptingAnswers) return;
      acceptingAnswers = false;

      const selectedChoice = e.target;
      const selectedAnswer = selectedChoice.dataset['number'];
      const classToApply = selectedAnswer === currentQuestion.answer.toString() ? 'correct' : 'incorrect';

      if (classToApply === 'correct') {
          incrementScore(correctBonus);
          correct.play();
      } else {
          incorrect.play();
      }

      selectedChoice.parentElement.classList.add(classToApply);

      setTimeout(() => {
          selectedChoice.parentElement.classList.remove(classToApply);
          getNewQuestion();
      }, 1000);
  });
});


function incrementScore(num) {
    score += num;
    scoreText.innerText = score;
}

function counterRender() {
    if (questionTime >= 0) {
        timerCounter.innerHTML = `${questionTime}s`;
        questionTime--;
    } else {
        questionTime = 5;
        getNewQuestion();
    }
}

// Start the quiz app
startGame();
