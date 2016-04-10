const FPS = 30;
var canvas;
var canvasContext;

var imagesToLoad = 3;

var car1 = new CarClass();
var car2 = new CarClass();

// var debug = false;

window.onload = function () {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    loadImages();
};

function move() {
    car1.moveCar();
    car2.moveCar();
}

function draw() {
    colorRect(0, 0, canvas.width, canvas.height, "#000000");
    drawTiles();
    car1.drawCar();
    car2.drawCar();
}

function startGame() {
    setInterval(function() {
        move();
        draw();
    }, 1000 / FPS);

    car2.initCar(carPic2, "Light blue car");
    car1.initCar(carPic, "Blue car");
    initInput();
}
