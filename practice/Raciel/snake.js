// Create a snake game using the canvas element
// The snake is controlled by the arrow keys
// The snake can eat apples
// The snake can die
// The snake can grow
// The snake can move

function Snake() {
  this.x = 0;
  this.y = 0;
  this.xSpeed = 0;
  this.ySpeed = 0;
  this.total = 0;
  this.tail = [];
}

Snake.prototype.draw = function() {
  ctx.fillStyle = "green";
  for (let i = 0; i < this.tail.length; i++) {
    ctx.fillRect(this.tail[i].x, this.tail[i].y, box, box);
  }
  ctx.fillRect(this.x, this.y, box, box);
};

Snake.prototype.update = function() {
  for (let i = 0; i < this.tail.length - 1; i++) {
    this.tail[i] = this.tail[i + 1];
  }
  this.tail[this.total - 1] = { x: this.x, y: this.y };

  this.x += this.xSpeed * box;
  this.y += this.ySpeed * box;

  if (this.x > canvas.width) {
    this.x = 0;
  }
  if (this.x < 0) {
    this.x = canvas.width;
  }
  if (this.y > canvas.height) {
    this.y = 0;
  }
  if (this.y < 0) {
    this.y = canvas.height;
  }
};

Snake.prototype.changeDirection = function(direction) {
  switch (direction) {
    case "Up":
      this.xSpeed = 0;
      this.ySpeed = -1;
      break;
    case "Down":
      this.xSpeed = 0;
      this.ySpeed = 1;
      break;
    case "Left":
      this.xSpeed = -1;
      this.ySpeed = 0;
      break;
    case "Right":
      this.xSpeed = 1;
      this.ySpeed = 0;
      break;
  }
};

Snake.prototype.eat = function(food) {
  if (this.x === food.x && this.y === food.y) {
    this.total++;
    return true;
  }
  return false;
};

Snake();