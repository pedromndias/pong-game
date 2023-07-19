// console.log("Testing");

// Get the elements:
const ballNode = document.querySelector("#ball")
const gameBoxNode = document.querySelector("#game-box")
const paddleNode = document.querySelector("#paddle")

// Global variables:
let ballX = 10;
let ballY = 10;
let ballSpeed = 3;

let isBallMovingRight = true;
let isBallMovingDown = true;

let wallWidth = gameBoxNode.offsetWidth;
let wallHeight = gameBoxNode.offsetHeight;

let ballWidth = ballNode.offsetWidth;
let ballHeight = ballNode.offsetHeight;

let paddleX = 150;
let paddleY = 530;

let paddleWidth = paddleNode.offsetWidth;
let paddleHeight = paddleNode.offsetHeight;

let isGameOn = true;

// Function for the ball movement:
function ballMovement() {
    
    if (isBallMovingRight) {
        ballX += ballSpeed;
    } else {
        ballX -= ballSpeed;
    }
    if (isBallMovingDown) {
        ballY += ballSpeed;
    } else {
        ballY -= ballSpeed;
    }
}

// Function to check if the ball colides with the wall:
function ballWallCollision() {
    if (ballX + ballWidth >= wallWidth) {
        isBallMovingRight = false;
    } else if (ballY + ballHeight >= wallHeight) {
        // isBallMovingDown = false;
        // End of game if ball collides with lower wall:
        isGameOn = false;
    } else if (ballX < 0) {
        isBallMovingRight = true;
    } else if (ballY < 0) {
        isBallMovingDown = true;
    }
}

// Function to update ball position:
function ballPositionUpdates() {
    ballNode.style.left = `${ballX}px`;
    ballNode.style.top = `${ballY}px`;
}

// Function to update the paddle position:
function paddlePositionUpdates() {
    paddleNode.style.left = `${paddleX}px`;
}

// Function to check if the ball colides with the paddle:
function ballPaddleCollision() {
    if (ballY + ballHeight > paddleY && ballX + ballWidth > paddleX && ballX + ballWidth < paddleX + paddleWidth) {
        isBallMovingDown = false;
    }
}

// Function that will control our game:
function gameLoop() {
    // console.log("Executing recursion");
    // 1. Change in elements:
    ballMovement()
    ballWallCollision()
    ballPaddleCollision()

    // 2. Position and other updates:
    ballPositionUpdates()
    paddlePositionUpdates()

    // 3. Recursion effects:
    if (isGameOn) {
        requestAnimationFrame(gameLoop)
    }
}

// AddEventListener:
window.addEventListener("keydown", (event) => {
    // console.log(event.key);
    // Move paddle according to key pressed:
    if (event.key === "ArrowRight") {
        paddleX += 20;
    } else if (event.key === "ArrowLeft") {
        paddleX -= 20;
    }
    
})

// Call gameLoop to initiate gameLoop:
gameLoop()