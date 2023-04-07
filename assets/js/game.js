import Not from "./not.js";
import Song from "./song.js";
import map from "./data/map.js";

class Game {
  constructor({ canvas, handleTimer, handleScore, handleEnd, handlePause }) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");

    this.canvas.width = 400;
    this.canvas.height = 600;

    this.FPS = 40;

    this.paused = false;
    this.pausedTime = 0;
    this.handlePause = handlePause;

    this.isCounting = false;

    this.notData = {
      canvas,
      ctx: this.ctx,
      width: 100,
      height: 120,
      color: "#eb5569",
      hover: "#f58a97",
    };

    this.nots = [
      new Not({ ...this.notData, position: 1, keycode: "D" }),
      new Not({ ...this.notData, position: 2, keycode: "F" }),
      new Not({ ...this.notData, position: 3, keycode: "J" }),
      new Not({ ...this.notData, position: 4, keycode: "K" }),
    ];

    const audio = new Audio();

    this.lofi = "assets/js/data/audio.mp3";

    audio.src = this.lofi;
    audio.preload = "auto";

    this.song = new Song({
      canvas,
      audio,
      map,
      ctx: this.ctx,
      nots: this.nots,
      handleTimer,
      handleEnd,
      handleScore,
    });

    document.addEventListener("keydown", this.clickPause.bind(this));
  }

  get lastTime() {
    return;
  }

  area() {
    this.ctx.beginPath();
    this.ctx.fillStyle = "rgba(240, 114, 129, 0.2)";
    this.ctx.rect(
      0,
      this.canvas.height - this.notData.height - 100,
      this.canvas.width,
      100
    );
    this.ctx.fill();
    this.ctx.closePath();
  }

  border() {
    this.ctx.beginPath();
    this.ctx.fillStyle = "#111827";
    this.ctx.rect(
      0,
      this.canvas.height - this.notData.height - 20,
      this.canvas.width,
      20
    );
    this.ctx.fill();
    this.ctx.closePath();
  }

  start() {
    this.clear();
    this.isCounting = true;

    const x = this.canvas.width / 2 - 20;
    const y = this.canvas.height / 2;

    this.ctx.beginPath();
    this.ctx.fillStyle = "white";
    this.ctx.font = "64px sans-serif";

    this.ctx.fillText("3", x, y);

    setTimeout(() => {
      this.clear();
      this.ctx.fillText("2", x, y);

      setTimeout(() => {
        this.clear();
        this.ctx.fillText("1", x, y);
        this.ctx.closePath();

        setTimeout(() => {
          this.isCounting = false;

          if (this.pausedTime) {
            this.song.audio.src = this.lofi;
            this.song.audio.currentTime = this.pausedTime;
          }

          this.play();
        }, 1000);
      }, 1000);
    }, 1000);
  }

  play() {
    this.clear();

    this.song.audio.play();
    this.song.audio.volume = 0;
    this.song.draw();

    this.area();
    this.border();

    this.nots.forEach((key) => key.draw());

    if (!this.song.end && !this.paused)
      setTimeout(this.play.bind(this), 1000 / this.FPS);
  }

  clickPause(ev) {
    if (
      ev.code !== "Escape" ||
      this.isCounting ||
      this.song.audio.currentTime === 0
    )
      return;

    this.pause();
  }

  pause() {
    if (this.paused) {
      this.paused = false;
      this.start();
    } else {
      this.paused = true;
      this.pausedTime = this.song.audio.currentTime;
      this.song.audio.pause();
      this.song.audio.src = "";
    }

    this.handlePause();
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

export default Game;
