

class Ball {
    constructor(x, y, radius, dx, dy) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dx = dx;
        this.dy = dy;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }
    update() {
        this.x += this.dx;
        this.y += this.dy;
    
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
          this.dx = -this.dx;
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
          this.dy = -this.dy;
        }
    }
}

class Brick {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = getRandomHexColor();
    }
    
    draw() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}



const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const balls = [];
const bricks = [];


canvas.addEventListener("click", (event) => {
    addBall(event);
    console.log("new ball")
});
canvas.addEventListener("mousedown", event => {
    if (event.button === 1) {
      addBrick(event);
      console.log("new brick")
    }
});
  


const addBall = (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const dx = getRandomNumber(-2, 2); // Random number between -2 and 2
    const dy = getRandomNumber(-2, 2); // Random number between -2 and 2

    const newBall = new Ball(x, y, 10, dx, dy);
    balls.push(newBall);
}

function addBrick(event) {
    const rect = canvas.getBoundingClientRect();

    const width = 80;
    const height = 20;

    const x = event.clientX - rect.left - width / 2;
    const y = event.clientY - rect.top - height / 2;    
  
    const newBrick = new Brick(x, y, width, height);
    bricks.push(newBrick);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    balls.forEach(ball => {
      ball.draw();
      ball.update();
    });

   bricks.forEach(brick => {
    brick.draw();
  });
    requestAnimationFrame(draw);
}

function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

  function getRandomHexColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

draw();
