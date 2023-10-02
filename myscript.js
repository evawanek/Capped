const startBtn = document.querySelector('.mystartbutton');
const guessBtn = document.querySelector('.myguessbutton');
const firstGuess = document.getElementById("inputone");
const secondGuess = document.getElementById("inputtwo");
const clueText = document.querySelector('.clue-text');
const interiorOne = document.querySelector('#interior-one');
const interiorTwo = document.querySelector('#interior-two');
const interiorThree = document.querySelector('#interior-three');
const timerElement = document.getElementById("timer");
var myWrapper = document.getElementById("wrapper");
const missedWord = document.querySelector('.your-word');
const guesses = document.querySelector('.guesses-text');
const timer = document.getElementById("timer");


const wordsWithHints = [{
        word: "Drank",
        hint: "Consumed a beverage"
    },
    {
        word: "Crane",
        hint: "A type of bird"
    },
    {
        word: "Grand",
        hint: "Large or impressive"
    },
    {
        word: "Prank",
        hint: "A humorous act of deception"
    },
    {
        word: "Brand",
        hint: "Company symbol or logo"
    }
];

guessBtn.disabled = true;

let currentWordIndex = 0;
let timeRemaining = 120;
let timerInterval;
let roundNumber = 0;



const modalHtp = document.querySelector('#modal-htp');
const openModalHtp = document.querySelector('#question');
const closeModalHtp = document.querySelector('.close-button');
const closeCongratsModal = document.querySelector('.close-button-four');
const closeLoseModal = document.querySelector('.close-button-three');

const modalShare = document.querySelector('#modal-share');
const openModalShare = document.querySelector('#share');
const closeModalShare = document.querySelector('.close-button-two');

const congratsModal = document.querySelector('#congrats');
const loseModal = document.querySelector('#lose');


closeModalHtp.addEventListener('click', () => {
  modalHtp.close();
});

openModalHtp.addEventListener('click', () => {
  modalHtp.showModal();
});


closeModalShare.addEventListener('click', () => {
  modalShare.close();
});

openModalShare.addEventListener('click', () => {
    modalShare.showModal();
});


closeCongratsModal.addEventListener('click', () => {
  congratsModal.close();
});

closeLoseModal.addEventListener('click', () => {
  loseModal.close();
});

function copyFunction() {
    var copyText = document.getElementById("myInput");

    copyText.select();
    copyText.setSelectionRange(0, 11);

    navigator.clipboard.writeText(copyText.value);
}

function redHighlight(){
  myWrapper.style.backgroundColor = "rgba(255,148,148)";
  setTimeout(function () { myWrapper.style.backgroundColor = "white" }, 1000);
}


function greenHighlight(){
  myWrapper.style.backgroundColor = "rgba(102, 204, 153,1)";
  setTimeout(function () { myWrapper.style.backgroundColor = "white" }, 1000);
}

function newHint(){
  setTimeout(function () {clueText.innerHTML = wordsWithHints[currentWordIndex].hint; }, 1000);
}

function delayClearOne(){
  setTimeout(function () {firstGuess.value = ""; }, 1000);
}

function delayClearTwo(){
  setTimeout(function () {secondGuess.value = ""; }, 1000);
}


startBtn.addEventListener("click", () => {
    interiorOne.value = "R";
    interiorTwo.value = "A";
    interiorThree.value = "N";
    currentWordIndex = 0;
    startTimer();
    changeOfButton();
    guessBtn.disabled = false;
    clueText.innerHTML = wordsWithHints[currentWordIndex].hint;
  });
  
guessBtn.addEventListener("click", () => {
    const userInputOne = firstGuess.value.toUpperCase();
    const userInputTwo = secondGuess.value.toLowerCase();
    if (userInputOne === wordsWithHints[currentWordIndex].word[0] && userInputTwo === wordsWithHints[currentWordIndex].word.slice(-1)) {
      currentWordIndex++; 
      delayClearOne();
      delayClearTwo(); 
    
      if (currentWordIndex === wordsWithHints.length) {
          congratsModal.showModal();
        clearInterval(timerInterval);
      } else {
        greenHighlight();
        newHint();
        ++roundNumber;
      guesses.innerHTML = roundNumber + "/5";
      }
    } else {
      redHighlight();
    }
  });


  function startTimer() {
    timerInterval = setInterval(updateTimer, 1000);
  }

  function updateTimer() {
    if (timeRemaining > 0) {
      timeRemaining--;
      const minutes = Math.floor(timeRemaining / 60);
      const seconds = timeRemaining % 60;
      timerElement.textContent = `Time left: ${minutes}:${seconds.toString().padStart(2, '0')}`;
    } else {
      clearInterval(timerInterval);
      guessBtn.disabled = true;
      loseModal.showModal();
      missedWord.innerHTML = wordsWithHints[currentWordIndex].word; 
    }
  }

   
function changeOfButton(){
  startBtn.innerHTML = "End";
  startBtn.addEventListener('click', () => {
  loseModal.showModal();
  clearInterval(timerInterval);
  guessBtn.disabled = true;
  missedWord.innerHTML = wordsWithHints[currentWordIndex].word; 
})
};


