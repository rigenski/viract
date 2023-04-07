class Song {
  constructor({
    canvas,
    ctx,
    audio,
    map,
    nots,
    handleTimer,
    handleEnd,
    handleScore,
  }) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.audio = audio;
    this.map = map;
    this.nots = nots;
    this.handleTimer = handleTimer;
    this.handleEnd = handleEnd;
    this.handleScore = handleScore;

    this.hit = [];
    this.passed = [];
    this.scores = [];

    this.end = false;

    audio.addEventListener("ended", this.ended.bind(this));
  }

  ended() {
    this.end = true;
    this.audio.src = "";
    this.handleEnd();
  }

  get currentTime() {
    const timer = Math.floor(this.audio.currentTime * 1000);
    if (timer !== 0) {
      localStorage.setItem("timer", timer);
    }

    return Math.floor(this.audio.currentTime * 1000);
  }

  get percentage() {
    if (this.passed.length === 0) {
      return 0;
    } else {
      return (this.hit.length / this.passed.length) * 100;
    }
  }

  draw() {
    this.map.hitObjects.forEach((map, index) => {
      const key = this.nots[map.position - 1];
      const y = this.currentTime + this.canvas.height - map.hitAt;

      if (this.currentTime >= map.hitAt && !this.passed.includes(index))
        this.passed.push(index);

      if (
        key.pressed &&
        this.currentTime > map.hitAt - 150 &&
        this.currentTime < map.hitAt + 150 &&
        !this.hit.includes(index)
      )
        this.hit.push(index);

      const img = new Image();
      img.src = "./assets/images/icon.png";

      this.ctx.drawImage(img, key.x, y, key.width, key.width);
    });

    this.handleTimer();
    this.handleScore();
  }
}

export default Song;
