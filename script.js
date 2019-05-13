
const DATA = [
    {
      question: "What is a baby dolphin called?",
      answers: ["Calf", "Kid", "Pup", "Foal"],
      correctAnswer: "Calf"
    },
    {
      question: "What is the fin on the back of a dolphin known as?",
      answers: ["Fluke", "Ventral", "Dorsal", "Caudal"],
      correctAnswer: "Dorsal"
    },
    {
      question: "Dolphins communicate using primarily what body part?",
      answers: ["Blowhole", "Fins/Flippers", "Mouth", "Tail"],
      correctAnswer: "Blowhole"
    },
    {
      question: "How do dolphins sleep?",
      answers: [
        "Like humans, they go completely unconscious for 8 hours.",
        "They are like sharks, they have to stay awake and keep swimming.",
        "They rest one half of their brain at a time, taking little naps throughout the day.",
        "They have endless energy- they do not need rest."
      ],
      correctAnswer:
        "They rest one half of their brain at a time, taking little naps throughout the day."
    },
    {
      question: "What is the camouflage called on a dolphin?",
      answers: ["Dappling", "Grey-fading", "Countershading", "Lateral Lining"],
      correctAnswer: "Countershading"
    },
    {
      question: "How many species of dolphins are there?",
      answers: ["22", "38", "14", "5"],
      correctAnswer: "38"
    },
    {
      question: "How many calves can a dolphin have at once?",
      answers: ["Two", "Three", "One", "Four"],
      correctAnswer: "One"
    },
    {
      question: "What shape are the teeth of a dolphin?",
      answers: ["Rectangular", "Triangular", "Cone-shaped", "Rounded"],
      correctAnswer: "Cone-shaped"
    },
    {
      question: "How long is a dolphin pregnant for?",
      answers: ["9 months", "12 months", "6 months", "18 months"],
      correctAnswer: "12 months"
    },
    {
      question: "Who is dominant is the dolphin social structure?",
      answers: ["Males", "Females", "Adolescents", "Both males and females"],
      correctAnswer: "Females"
    }
];
  //question number
  let questionNumber = 0;
  //track total points
  let score = 0;

  //generate question
  function generateQuestion() {
    if (questionNumber < DATA.length) {
      return `<div class="question-${questionNumber}">
      <form>
      <fieldset>
      <legend>
        <h2>${DATA[questionNumber].question}</h2></legend>
        <label class="answerOption">
        <input type="radio" value="${DATA[questionNumber].answers[0]}" name="answer" required>
        <span>${DATA[questionNumber].answers[0]}</span>
        </label>
        <label class="answerOption">
        <input type="radio" value="${DATA[questionNumber].answers[1]}" name="answer" required>
        <span>${DATA[questionNumber].answers[1]}</span>
        </label>
        <label class="answerOption">
        <input type="radio" value="${DATA[questionNumber].answers[2]}" name="answer" required>
        <span>${DATA[questionNumber].answers[2]}</span>
        </label>
        <label class="answerOption">
        <input type="radio" value="${DATA[questionNumber].answers[3]}" name="answer" required>
        <span>${DATA[questionNumber].answers[3]}</span>
        </label>
        <button type="submit" class="submitButton">Submit</button>
        </fieldset>
        </form>
        </div>`;
    } else {
      quizResults();
      restartQuiz();
      $('.questionNumber').text(10);
    }
  }
  
  
  //question number increment
  function updateQuestionNumber() {
    questionNumber ++;
  $('.questionNumber').text(questionNumber+1);
}
  
  //increment score
  function scoreUpdate() {
    score++;
    $('.scoreCount').text(score);
  }

  //start the quiz
  function startQuiz() {
    $('.startButton').on("click", function(e) {
      $('.startScreen').css('display', 'none')
      $('.questionScreen').css('display', 'block')
      $('.questionNumber').text(1);
    });
  }


//render question in DOM
  function renderQuiz() {
    $('#questionForm').html(generateQuestion());
  }

    //answer feedback
  function checkAnswer() {
    $('#questionForm').on("submit", function(event) {
      event.preventDefault();
      $('.questionScreen').css('display', 'none')
      $('.feedbackScreen').css('display', 'block')
    });
  }


  //select answer
  function selectAnswer() {
    $("form").on("submit", function(event) {
      event.preventDefault();
      let selected = $("input:checked");
      let answer = selected.val();
      let correctAnswer = `${DATA[questionNumber].correctAnswer}`;
      if (answer === correctAnswer) {
        selected.parent().addClass('correct');
        whenAnswerCorrect();
      } else {
        selected.parent().addClass('incorrect');
        whenAnswerIncorrect();
      }
    });
  }


function whenAnswerCorrect() {
  correctAnswerFeedback();
  $('#questionForm').unbind('submit');
  scoreUpdate();
}

function whenAnswerIncorrect() {
  incorrectAnswerFeedback();
}

  //correct answer feedback
  function correctAnswerFeedback() {
    let correctAnswer = `${DATA[questionNumber].correctAnswer}`;
    $("#questionForm").html(`<div class="correct"><h1>Nailed it!</h1><h2>'${correctAnswer}' is the right answer!</h2><button type=button class="nextButton">Next</div>`);
  }
  
  //incorrect answer feedback
  function incorrectAnswerFeedback() {
    let correctAnswer = `${DATA[questionNumber].correctAnswer}`;
    $("#questionForm").html(`<div class="incorrect"><h2>Not quite!</h2><h3>'${correctAnswer}' is the correct answer!</h3><button type=button class="nextButton">Next</button></div>`);
  }

function trackScore() {
  scoreUpdate();
  $('scoreUpdate').text(score);
}

  //results
  function quizResults() {
    $(".main").empty().html(`
        <div class="resultsPage">
          <h2>Well done!</h2>
          <h3>You're an aquatic aficionado!</h3>
          <main role="main">
            <div class="completionForm">
              <button class="button">Restart</button>
            </div>
          </main>
        </div>
      `);
  }

//next question****************
function nextQuestion() {
    $('main').on('click', '.nextButton',
    function (event) {
    updateQuestionNumber();
    renderQuiz();
    selectAnswer();
    });
}

//take quiz again/restart button
function restartQuiz() {
  $('main').on('click', '.button', function (event) {
    location.reload();
  });
}

  function initQuiz() {
    startQuiz();
    renderQuiz();
    selectAnswer();
    nextQuestion();
  }

  $(initQuiz);