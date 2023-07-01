

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

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const balls = [];

canvas.addEventListener("click", (event) => {
    addBall(event);
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

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    balls.forEach(ball => {
      ball.draw();
      ball.update();
    });
  
    requestAnimationFrame(draw);
}

function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }

draw();
