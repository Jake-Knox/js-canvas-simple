

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

        // check collisions with bricks
        bricks.forEach((brick, index) => {
          if (
            this.x + this.radius > brick.x &&
            this.x - this.radius < brick.x + brick.width &&
            this.y + this.radius > brick.y &&
            this.y - this.radius < brick.y + brick.height
          ) {
            // Collision detected, adjust ball direction based on hit side
            const ballRight = this.x + this.radius;
            const ballLeft = this.x - this.radius;
            const ballBottom = this.y + this.radius;
            const ballTop = this.y - this.radius;

            const brickRight = brick.x + brick.width;
            const brickLeft = brick.x;
            const brickBottom = brick.y + brick.height;
            const brickTop = brick.y;

            const hitRight = ballLeft < brickRight && ballRight >= brickRight;
            const hitLeft = ballRight > brickLeft && ballLeft <= brickLeft;
            const hitBottom = ballTop < brickBottom && ballBottom >= brickBottom;
            const hitTop = ballBottom > brickTop && ballTop <= brickTop;

            if (hitRight || hitLeft) {
              this.dx = -this.dx;
            }
            if (hitBottom || hitTop) {
              this.dy = -this.dy;
            }

            // Remove brick
            bricks.splice(index, 1);
          
          }
        }); 
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

const paddleLeft = document.getElementById("paddle-left");
const paddleRight = document.getElementById("paddle-right");
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const balls = [];
const bricks = [];

const paddle = {
  x: canvas.width / 2 - 60, // Initial x-coordinate of the paddle
  y: canvas.height - 20, // Initial y-coordinate of the paddle
  width: 120, // Width of the paddle
  height: 20, // Height of the paddle
  speed: 20, // Speed of the paddle (adjust as needed)
};
// Draw the paddle on the canvas
const drawPaddle = () => {
  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
  ctx.fillStyle = 'blue'; // Set the color of the paddle
  ctx.fill();
  ctx.closePath();
}
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

paddleLeft.addEventListener("click", () => {
  movePaddleLeft();  
})
paddleRight.addEventListener("click", () => {
  movePaddleRight();
})
// Update the paddle's position based on keyboard input
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft' && paddle.x > 0) {
    movePaddleLeft();  
  } else if (event.key === 'ArrowRight' && paddle.x + paddle.width < canvas.width) {
    movePaddleRight();
  }
});

const addBall = (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // const dx = getRandomNumber(-2, 2); 
    // const dy = getRandomNumber(-2, 2); 
    const angle = Math.random() * Math.PI * 2 // random angle in radians
    const speed = 4;

    const dx = Math.cos(angle) * speed;
    const dy = Math.sin(angle) * speed;

    const newBall = new Ball(x, y, 10, dx, dy);
    balls.push(newBall);
}

const addBrick = (event) =>{
    const rect = canvas.getBoundingClientRect();

    const width = 80;
    const height = 20;

    const x = event.clientX - rect.left - width / 2;
    const y = event.clientY - rect.top - height / 2;    
  
    const newBrick = new Brick(x, y, width, height);
    bricks.push(newBrick);
}

const movePaddleLeft = () => {
  paddle.x -= paddle.speed;
}
const movePaddleRight = () => {
  paddle.x += paddle.speed;
}

const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    drawPaddle();

    balls.forEach(ball => {
      ball.draw();
      ball.update();
    });

   bricks.forEach(brick => {
    brick.draw();
  });
    requestAnimationFrame(draw);
}

const getRandomNumber = (min, max) => {
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
