// 设定画布
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const para = document.querySelector('p');
// 设定画布长宽
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;
var ballNum = 0;

// 生成随机数的函数
function random(min,max) {
  return Math.floor(Math.random()*(max-min)) + min;
}

// 生成随机颜色的函数
function randomColor() {
  return 'rgb(' +
         random(0, 255) + ', ' +
         random(0, 255) + ', ' +
         random(0, 255) + ')';
}

function Shape(x,y,velX,velY,exists){
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.exists = exists;
}
function Ball(x,y,velX,velY,color,size,exists){
  Shape.call(this,x,y,velX,velY,exists);
  this.color = color;
  this.size = size;
}

function EvilCircle(x,y,velX,velY,exists,color,size){
  Shape.call(this,x,y,velX,velY,exists);
  this.color = color;
  this.size = size;
}

Ball.prototype.draw = function(){
  ctx.beginPath();
  ctx.fillStyle = this.color
  ctx.arc(this.x,this.y,this.size,0,2*Math.PI);
  ctx.fill();
}
EvilCircle.prototype.draw = function(){
  ctx.beginPath();
  ctx.lineWidth = 3;
  ctx.strokeStyle = this.color
  ctx.arc(this.x,this.y,this.size,0,2*Math.PI);
  ctx.stroke();
};
EvilCircle.prototype.checkBound = function() {
  if ((this.x + this.size) >= width) {
    this.x = this.x-2;
  }

  if ((this.x - this.size) <= 0) {
    this.x= this.x+2;
  }

  if ((this.y + this.size) >= height) {
    this.y = this.y-2;
  }

  if ((this.y - this.size) <= 0) {
    this.y = this.y+2;
  }
};
EvilCircle.prototype.setControls = function(){
  window.onkeydown = e => {
    if (e.key === 'a') {
      this.x -= this.velX;
    } else if (e.key === 'd') {
      this.x += this.velX;
    } else if (e.key === 'w') {
      this.y -= this.velY;
    } else if (e.key === 's') {
      this.y += this.velY;
    }
  };
};
EvilCircle.prototype.collisionDetect = function() {
  for (var j = 0; j < balls.length; j++) {
    if (balls[j].exists) {
      var dx = this.x - balls[j].x;
      var dy = this.y - balls[j].y;
      var distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].exists = false;
        evilcircle.size += 2;
        ballNum--;
        para.textContent = '小球数量还剩'+ballNum+'个';
      }
    }
  }
}
Ball.prototype.update = function() {
  if ((this.x + this.size) >= width) {
    this.velX = -(this.velX);
  }

  if ((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }

  if ((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }

  if ((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }

  this.x += this.velX;
  this.y += this.velY;
}
Ball.prototype.collisionDetect = function() {
  for (var j = 0; j < balls.length; j++) {
    if (!(this === balls[j])) {
      var dx = this.x - balls[j].x;
      var dy = this.y - balls[j].y;
      var distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].color = this.color = randomColor();
      }
    }
  }
}
var balls = [];
var evilcircle = new EvilCircle(
  random(0,width),
  random(0,height),
  velX = 20,
  velY = 20,
  true,
  color = 'white',
  size = 10
  )

function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);
  while (balls.length < 25) {
    var ball = new Ball(
      random(0,width),
      random(0,height),
      random(-7,7),
      random(-7,7),
      randomColor(),
      random(10,20),
      true
    );
    balls.push(ball);
    ballNum++;
    para.textContent = '小球数量还剩'+ballNum+'个';
  }
  for (var i = 0; i < balls.length; i++) {
    if(balls[i].exists){
    balls[i].draw();
    balls[i].update();
    balls[i].collisionDetect();
    }
  }
  evilcircle.setControls();
  evilcircle.draw();
  evilcircle.checkBound();
  evilcircle.collisionDetect();

  requestAnimationFrame(loop);
}
loop();
