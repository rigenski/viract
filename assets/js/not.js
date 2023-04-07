class Not {
  constructor({ canvas, ctx, width, height, color, hover, position, keycode }) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.color = color;
    this.hover = hover;
    this.position = position;
    this.keycode = keycode;

    this.x = this.width * (this.position - 1);
    this.y = this.canvas.height - this.height;

    this.pressed = false;

    document.addEventListener('keydown', this.keydown.bind(this));
    document.addEventListener('keyup', this.keyup.bind(this));
  }

  keydown(ev) {
    if (ev.code !== `Key${this.keycode}`) return;
    this.pressed = true;
  }

  keyup(ev) {
    if (ev.code !== `Key${this.keycode}`) return;

    this.pressed = false;
  }

  drawLines() {
    this.ctx.beginPath();
    this.ctx.fillStyle = '#ddd';

    for (let p = 0; p <= this.canvas.width / this.width; p++) {
      this.ctx.rect(this.width * p - 1, 0, 2, this.canvas.height);
    }

    this.ctx.fill();
    this.ctx.closePath();
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.pressed ? this.hover : this.color;
    this.ctx.rect(this.x, this.y, this.width, this.height);
    this.ctx.fill();
    this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.fillStyle = 'white';
    this.ctx.font = '20px sans-serif';
    this.ctx.fillText(
      this.keycode,
      this.x + this.width / 2 - 8,
      this.y + this.height / 2 + 8
    );
    this.ctx.closePath();

    if (this.pressed) {
      this.ctx.beginPath();
      const highlight = this.ctx.createLinearGradient(
        0,
        this.y - this.height - 20,
        0,
        this.y
      );
      highlight.addColorStop(0, 'transparent');
      highlight.addColorStop(1, 'rgba(255, 255, 255, .25)');
      this.ctx.fillStyle = highlight;
      this.ctx.rect(this.x, this.y - this.height - 20, this.width, this.height);
      this.ctx.fill();
      this.ctx.closePath();
    }

    this.drawLines();
  }
}

export default Not;
