const square = document.querySelectorAll(".square");
const mole = document.querySelectorAll(".mole");
const bomb = document.querySelectorAll(".bomb");
const x = document.querySelectorAll(".x");
const restart = document.querySelector(".restart");
const timeLeft = document.querySelector("#time-left");
const popUp = document.querySelector(".popUp");

let score1 = document.querySelector(".score1");
let score2 = document.querySelector(".score2");
let firstMode = document.querySelector("#easy-mode");
let secondMode = document.querySelector("#medium-mode");

let thirdMode = document.querySelector("#hard-mode");

let result = 0;
let currentTime = timeLeft.textContent;
let hitBombPosition;
let hitPosition;
let i;
let timerId = null;
let timerId2 = null;
let timerId3 = null;
var hitMole = new Audio("./audio/hitmole.flac");
var hitEmpty = new Audio("./audio/hitEmpty.flac");
var gameOver = new Audio("./audio/mixkit-retro-arcade-game-over-470.wav");

// let result = 0;

let isGameRunning = false;
let easyMode = true;
let mediumMode = false;
let hardMode = false;

function randomSquare() {
  square.forEach((className) => {
    className.classList.remove("mole");
  });
  let randomPosition = square[Math.floor(Math.random() * 24)];
  randomPosition.classList.add("mole");
  hitPosition = randomPosition.id;
  setTimeout(() => {
    square.forEach((className) => {
      className.classList.remove("mole");
    });
  }, 500);
}
function randomSquareBomb() {
  square.forEach((className) => {
    className.classList.remove("bomb");
    className.classList.remove("x");
  });
  let randomBombPosition = square[Math.floor(Math.random() * 24)];
  randomBombPosition.classList.add("bomb");
  hitBombPosition = randomBombPosition.id;
  setTimeout(() => {
    square.forEach((className) => {
      className.classList.remove("bomb");
    });
  }, 500);
}

square.forEach((id) => {
  id.addEventListener("mouseup", () => {
    if (id.id === hitPosition) {
      hitMole.play();
      result += 1;
      score1.textContent = result;
      console.log(result);
    }
    // if player hit the bomb
    else if (id.id === hitBombPosition) {
      isGameRunning = false;

      gameOver.play();
      // i = 1;
      console.log(timerId);
      let test;
      test = Number(hitBombPosition) - 1;
      square[test].classList.add("x");
      clearInterval(timerId);
      clearInterval(timerId2);
      clearInterval(timerId3);

      score1.textContent = result;
      score2.textContent = result;

      popUp.style.display = "flex";
      // square.forEach((className) => {
      //   className.classList.remove("mole");
      //   className.classList.remove("x");
      // });
    } else {
      if (hardMode) {
        hitEmpty.play();
        result -= 1;
        score1.textContent = result;
        // console.log(result);
      }
    }
  });
});
function moveMole() {
  timerId = setInterval(randomSquare, 700);
}
function moveBomb() {
  if (i === 1) {
    clearInterval(timerId2);

    return; //stop the execution of function
  }
  timerId2 = setInterval(randomSquareBomb, 4000);
}

function countDown() {
  currentTime--;
  timeLeft.textContent = currentTime;
  if (currentTime === 0) {
    clearInterval(timerId3);
    clearInterval(timerId2);
    clearInterval(timerId);
    score1.textContent = result;
    score2.textContent = result;
    isGameRunning = false;
    popUp.style.display = "flex";
  }
}

function init() {
  i = 0;
  result = 0;
  score1.textContent = result;
  timeLeft.textContent = currentTime;
  if (hardMode) {
    moveBomb();
  }
  moveMole();
  timerId3 = setInterval(countDown, 1000);
}
function restartTheGame() {
  square.forEach((className) => {
    className.classList.remove("mole");
    className.classList.remove("x");
  });
  if (!isGameRunning) {
    currentTime = 60;
    isGameRunning = true;
    popUp.style.display = "none";
    init();
  }
}
restart.addEventListener("click", () => {
  restartTheGame();
  // location.reload();
  // return false;
});

firstMode.addEventListener("click", () => {
  firstMode.classList.add("selected");
  secondMode.classList.remove("selected");
  thirdMode.classList.remove("selected");
  easyMode = true;
  mediumMode = false;
  hardMode = false;
  isGameRunning = false;
  popUp.style.display = "flex";
  clearInterval(timerId);
  clearInterval(timerId2);
  clearInterval(timerId3);
  // restartTheGame();
});
secondMode.addEventListener("click", () => {
  secondMode.classList.add("selected");
  firstMode.classList.remove("selected");
  thirdMode.classList.remove("selected");
  mediumMode = true;
  hardMode = false;
  easyMode = false;
  isGameRunning = false;
  popUp.style.display = "flex";
  clearInterval(timerId);
  clearInterval(timerId2);
  clearInterval(timerId3);
  // restartTheGame();
});
thirdMode.addEventListener("click", () => {
  thirdMode.classList.add("selected");
  firstMode.classList.remove("selected");
  secondMode.classList.remove("selected");
  easyMode = false;
  mediumMode = false;
  hardMode = true;
  isGameRunning = false;
  popUp.style.display = "flex";
  clearInterval(timerId);
  clearInterval(timerId2);
  clearInterval(timerId3);
  // restartTheGame();
});
