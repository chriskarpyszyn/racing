const FPS = 30;
var canvas;
var canvasContext;

var imagesToLoad = 3;

// var debug = false;

window.onload = function () {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    loadImages();
};

function move() {
    moveCar();
}

function draw() {
    colorRect(0, 0, canvas.width, canvas.height, '#000000');
    drawWalls();
    drawCar();
    // drawDebug();
}

function startGame() {
        setInterval(function() {
            move();
            draw();
        }, 1000 / FPS);

        initCar();
        initInput();
}

// function drawDebug() {
//     if (debug) {
//         var circleSize = 2.5;
//         colorCircle(carX, carY - carRadius, carSize, 'red');
//         colorCircle(carX, carY + carRadius, carSize, 'green');
//         colorCircle(carX - carRadius, carY, carSize, 'blue');
//         colorCircle(carX + carRadius, carY, carSize, 'cyan');
//     }
// }
