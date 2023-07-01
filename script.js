const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");


const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    dx: 2, // velocity in the x direction
    dy: -2 // velocity in the y direction
};

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
  
function updateBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;
  
    // Check for wall collisions
    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
      ball.dx = -ball.dx; // reverse the velocity in x direction
    }
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
      ball.dy = -ball.dy; // reverse the velocity in y direction
    }
  }
  
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    updateBall();
    requestAnimationFrame(draw);
}

draw();

  