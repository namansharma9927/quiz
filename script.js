const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');

let shuffledQuestions, currentQuestionIndex, score, wrongAnswersCount;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startButton.classList.add('hide');
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  score = 0;
  wrongAnswersCount = 0;
  questionContainerElement.classList.remove('hide');
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add('hide');
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });

  if (correct) {
    score += 4;
  } else {
    score -= 1;
    wrongAnswersCount++;
  }

  if (wrongAnswersCount >= 5) {
    alert(`You lost. Your score is ${score}. Let's restart the quiz!`);
    startGame();
    return;
  }

  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide');
  } else {
    startButton.innerText = 'Restart';
    startButton.classList.remove('hide');
    alert(`Quiz complete. Your final score is ${score}`);
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}

const questions = [
    // Java
    {
      question: 'Which package provides the core classes of Java?',
      answers: [
        { text: 'java.lang', correct: true },
        { text: 'java.util', correct: false },
        { text: 'java.io', correct: false },
        { text: 'java.net', correct: false }
      ]
    },
    {
      question: 'What is the keyword used to explicitly reference the superclass in Java?',
      answers: [
        { text: 'superclass', correct: false },
        { text: 'parent', correct: false },
        { text: 'this', correct: false },
        { text: 'super', correct: true }
      ]
    },
    // JavaScript
    {
      question: 'What is the output of the following JavaScript code? console.log(2 + "2");',
      answers: [
        { text: '22', correct: true },
        { text: '4', correct: false },
        { text: 'NaN', correct: false },
        { text: 'undefined', correct: false }
      ]
    },
    {
      question: 'Which method is used to add elements to the end of an array in JavaScript?',
      answers: [
        { text: 'push()', correct: true },
        { text: 'pop()', correct: false },
        { text: 'shift()', correct: false },
        { text: 'unshift()', correct: false }
      ]
    },
    // C
    {
      question: 'What is the size of the "int" data type in C?',
      answers: [
        { text: '4 bytes', correct: true },
        { text: '2 bytes', correct: false },
        { text: '8 bytes', correct: false },
        { text: 'Depends on the system', correct: false }
      ]
    },
    {
      question: 'What is the correct syntax to declare a function in C?',
      answers: [
        { text: 'function myFunction()', correct: false },
        { text: 'void myFunction()', correct: true },
        { text: 'int myFunction()', correct: false },
        { text: 'myFunction()', correct: false }
      ]
    },
    // C++
    {
      question: 'What is the extension of C++ source files?',
      answers: [
        { text: '.cpp', correct: true },
        { text: '.c', correct: false },
        { text: '.hpp', correct: false },
        { text: '.h', correct: false }
      ]
    },
    {
      question: 'What is the correct way to allocate dynamic memory in C++?',
      answers: [
        { text: 'malloc()', correct: false },
        { text: 'calloc()', correct: false },
        { text: 'new operator', correct: true },
        { text: 'alloc()', correct: false }
      ]
    },
    // Data Structures and Algorithms (DSA)
    {
      question: 'What is the time complexity of inserting an element at the end of an array?',
      answers: [
        { text: 'O(1)', correct: true },
        { text: 'O(n)', correct: false },
        { text: 'O(log n)', correct: false },
        { text: 'O(n^2)', correct: false }
      ]
    },
    {
      question: 'What is the space complexity of a recursive function?',
      answers: [
        { text: 'O(1)', correct: false },
        { text: 'O(n)', correct: true },
        { text: 'O(log n)', correct: false },
        { text: 'O(n^2)', correct: false }
      ]
    },
    // HTML
    {
      question: 'Which tag is used to define an unordered list in HTML?',
      answers: [
        { text: '<ul>', correct: true },
        { text: '<ol>', correct: false },
        { text: '<li>', correct: false },
        { text: '<dl>', correct: false }
      ]
    },
    {
      question: 'Which attribute is used to specify the URL of an external script file in HTML?',
      answers: [
        { text: 'href', correct: false },
        { text: 'src', correct: true },
        { text: 'alt', correct: false },
        { text: 'link', correct: false }
      ]
    },
    // CSS
    {
      question: 'Which CSS property is used to change the background color of an element?',
      answers: [
        { text: 'background-color', correct: true },
        { text: 'color', correct: false },
        { text: 'text-align', correct: false },
        { text: 'font-size', correct: false }
      ]
    },
    {
      question: 'What does CSS stand for?',
      answers: [
        { text: 'Cascading Style Sheets', correct: true },
        { text: 'Cascading System Styles', correct: false },
        { text: 'Creative Style Sheets', correct: false },
        { text: 'Creative System Styles', correct: false }
      ]
    },
    // OOP Concepts
    {
      question: 'What is encapsulation in object-oriented programming?',
      answers: [
        { text: 'The process of combining data and functions into a single unit called an object.', correct: true },
        { text: 'The ability of an object to take on many forms.', correct: false },
        { text: 'The process of hiding the internal implementation details of an object.', correct: false },
        { text: 'The process of creating a new object from an existing object.', correct: false }
      ]
    },
    {
      question: 'What is inheritance in object-oriented programming?',
      answers: [
        { text: 'The process of combining data and functions into a single unit called an object.', correct: false },
        { text: 'The ability of an object to take on many forms.', correct: false },
        { text: 'The process of hiding the internal implementation details of an object.', correct: false },
        { text: 'The process of creating new classes based on existing classes.', correct: true }
      ]
    },
    // Add more questions related to Java, JavaScript, C, C++, DSA, HTML, CSS, OOP, etc.
  ];
  
