// variables to keep track of quiz state
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

// variables to reference DOM elements
var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");

function startQuiz() {
  // 1. hide start screen
  //    grab start-screen element and set attribute to hide it (check style.css)

  // un-hide questions section
  questionsEl.removeAttribute("class");

  // start interval timer
  timerId = setInterval(clockTick, 1000);

  // show starting time in the timerEL element
  timerEl.textContent = time;

  // make a function call to getQuestion
  getQuestion();
}

function getQuestion() {
  // get current question object from array
  var currentQuestion = questions[currentQuestionIndex];

  // 1. update title with current question
  //    a. grab "question-title" element and assign it to a variable
  //    b. assign the current question title to the variable text content

  // clear out any old question choices
  choicesEl.innerHTML = "";

  // loop over choices
  currentQuestion.choices.forEach(function (choice, i) {
    // create new button for each choice
    var choiceNode = document.createElement("button");

    // 1. add an attribute "class" to choiceNode and set the value to string "choice"

    // 2. add an attribute "value" to choiceNode and set its value with the input argument, choice

    // 3. set choiceNode text content to the input argument choice with the index prefix

    // attach click event listener to each choice
    choiceNode.onclick = questionClick;

    // 4. display on the page by appending it to choicesEl (using appendChild)
  });
}

function questionClick() {
  // check if user guessed wrong
  //    use the "value" property of "this" object when the click event occurs
  //    compare it with the answer to the current question
  if (this.value !== questions[currentQuestionIndex].answer) {
    // penalize time
    time -= 15;

    // 1. check if time is less than 0, then set it to 0

    // 2. display new time on page

    // 3. play "wrong" sound effect (optional)

    // 4. set the feedback element content to "Wrong!"
  } else {
    // 5. play "right" sound effect (optional)
    // 6. set the feedback element content to "Correct!"
  }

  // flash right/wrong feedback on page for a second
  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function () {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 1000);

  // move to next question
  currentQuestionIndex++;

  // 7. check if we've run out of questions
  //  if we've run out of questions, then make a function call to quizEnd
  //  else call function to get the next question
}

function quizEnd() {
  // stop timer
  clearInterval(timerId);

  // show end screen
  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");

  // show final score
  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;

  // hide questions section
  questionsEl.setAttribute("class", "hide");
}

function clockTick() {
  // update time
  time--;
  timerEl.textContent = time;

  // check if user ran out of time
  if (time <= 0) {
    quizEnd();
  }
}

function saveHighscore() {
  // 1. get value of input box for initials
  //    assign it to var initials

  // make sure value wasn't empty
  if (initials !== "") {
    // 2. get saved scores from localstorage, or if not any, set to empty array
    //    assign it to var highscores

    // format new score object for current user
    var newScore = {
      score: time,
      initials: initials,
    };

    // add newScofre to array highscores
    highscores.push(newScore);
    // 3. save to array highscores to localStorage using "highscores" as key
    //  and convert array highscores to string using JSON.stringify
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    // redirect to next page
    window.location.href = "highscores.html";
  }
}

function checkForEnter(event) {
  // "13" represents the enter key
  if (event.key === "Enter") {
    saveHighscore();
  }
}

// user clicks button to submit initials
submitBtn.onclick = saveHighscore;

// user clicks button to start quiz
startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;
