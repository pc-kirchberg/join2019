var SPEED = 0.002;
var SIZE = 0.5;

var DEPTH_SCALE = 2;

var NUM_STARS = 500;

var STAR_STYLE = "#fafafa";

function Star() {
  this.x = Math.random();
  this.y = Math.random();
  this.depth = Math.random();
}

Star.prototype.tick = function() {
  this.y += SPEED * this.depth;
};

Star.prototype.render = function(
  /** @type {HTMLElement} */ container,
  /** @type {CanvasRenderingContext2D} */ ctx
) {
  var posX = this.x * container.clientWidth - SIZE / 2;
  var posY = this.y * container.clientHeight - SIZE / 2;

  var size = SIZE + (this.depth * DEPTH_SCALE);

  ctx.fillRect(posX, posY, size, size);
};

function CoolBackgroundEffect(
  /** @type {HTMLElement} */ container,
  /** @type {CanvasRenderingContext2D} */ ctx
) {
  this.container = container;
  this.ctx = ctx;
  this.stars = [];
  for (var i = 0; i < NUM_STARS; i++) {
    this.stars.push(new Star());
  }
}

CoolBackgroundEffect.prototype.render = function() {
  var that = this;
  var garbage = [];
  this.stars.forEach(function(star) {
    star.tick();
    if (star.y > 1) {
      garbage.push(star);
    }
  });
  this.ctx.clearRect(
    0,
    0,
    this.container.clientWidth,
    this.container.clientHeight
  );
  this.ctx.imageSmoothingEnabled =
  this.ctx.fillStyle = STAR_STYLE;
  this.stars.forEach(function(star) {
    star.render(that.container, that.ctx);
  });
  garbage.forEach(function(x) {
    that.stars.splice(that.stars.indexOf(x), 1);
    var star = new Star();
    star.y = 0;
    that.stars.push(star);
  });
};

var canvas = document.getElementById("bg-canvas");


function resize() {
    canvas.setAttribute("width", window.innerWidth);
    canvas.setAttribute("height", window.innerHeight);
}
resize();
window.addEventListener("resize", resize);

var effect = new CoolBackgroundEffect(canvas, canvas.getContext("2d"));

function render() {
  effect.render();
  requestAnimationFrame(render);
}

requestAnimationFrame(render);
