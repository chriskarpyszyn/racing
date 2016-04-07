var canvas;
var canvasContext;

// var debug = false;

window.onload = function () {
    const fps = 30;
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    initCar();
    initInput();

    setInterval(function() {
        move();
        draw();
    }, 1000 / fps);
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

// function drawDebug() {
//     if (debug) {
//         var circleSize = 2.5;
//         colorCircle(carX, carY - carRadius, carSize, 'red');
//         colorCircle(carX, carY + carRadius, carSize, 'green');
//         colorCircle(carX - carRadius, carY, carSize, 'blue');
//         colorCircle(carX + carRadius, carY, carSize, 'cyan');
//     }
// }
