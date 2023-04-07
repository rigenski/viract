import Game from "./game.js";

// CANVAS

const canvas = document.getElementById("game");

// TIMER

const timeEl = document.getElementById("running-time");

const handleTimer = function () {
  timeEl.innerText = (this.currentTime / 1000).toFixed(2);
};

// SCORE

const scoreEl = document.getElementById("running-score");

const handleScore = function () {
  scoreEl.innerText = this.percentage.toFixed(2);
};

// END

const endEl = document.getElementById("end");
const endScoreEl = endEl.querySelector(".score");
const endTimerEl = endEl.querySelector(".timer");
const endPlayerEl = endEl.querySelector(".player");

const handleEnd = function () {
  endEl.classList.remove("hide");
  const timer = localStorage.getItem("timer");

  endTimerEl.innerText = timer.split("")[0];
  endScoreEl.innerText = this.percentage.toFixed(2);
  endPlayerEl.innerText = localStorage.getItem("player");
};

// PAUSE

const pauseEl = document.getElementById("pause");

const handlePause = function () {
  if (this.paused) return pauseEl.classList.remove("hide");

  pauseEl.classList.add("hide");
};

// RESUME

const resumeEl = pauseEl.querySelector(".continue");
resumeEl.onclick = () => game.pause();

// PLAY

const instructionEL = document.getElementById("instruction");
const playFormEl = document.getElementById("play-form");
const playInput = document.getElementById("play-input");

playFormEl.onsubmit = (e) => {
  e.preventDefault();

  localStorage.setItem("score", 0);
  localStorage.setItem("timer", 0);
  localStorage.setItem("player", 0);

  if (playInput.value) {
    localStorage.setItem("player", playInput.value);

    instructionEL.classList.add("hide");
    game.start();
  }
};

let lastTime = 2000;

const game = new Game({
  canvas,
  lastTime,
  handleTimer,
  handleScore,
  handleEnd,
  handlePause,
});
