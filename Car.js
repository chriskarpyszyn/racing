const SPEED_DECAY_MULT = 0.94;
const DRIVE_POWER = 0.5;
const REVERSE_POWER = 0.2;
const TURN_RATE = 0.03;
const MIN_TURN_SPEED = 0.5;

const INITIAL_CAR_SPEED = 0;
const INITIAL_CAR_ANGLE = -0.5 * Math.PI;


var carX, carY;
var carSpeed = 0;
var carSpeedXMultipler = 0.35;
var carRadius = 10;
var carAngle = 0;

var carPic = document.createElement("img");
var carPicLoaded = false;

function moveCar() {
    if (keyHeld_Gas) {
        carSpeed += DRIVE_POWER;
    }

    if (keyHeld_Reverse) {
        carSpeed += -REVERSE_POWER;
    }

    if (keyHeld_TurnRight) {
        if (Math.abs(carSpeed) > MIN_TURN_SPEED) {
            carAngle += TURN_RATE * Math.PI;
        }
    }

    if (keyHeld_TurnLeft) {
        if (Math.abs(carSpeed) > MIN_TURN_SPEED) {
            carAngle += -TURN_RATE * Math.PI;
        }
    }

    var nextCarX = carX + Math.cos(carAngle) * carSpeed;
    var nextCarY = carY + Math.sin(carAngle) * carSpeed;
    if (checkForTrackAtPixelCoord(nextCarX, nextCarY)) {
        carX = nextCarX;
        carY = nextCarY;
    } else {
        carSpeed = -0.3*carSpeed;
    }

    carSpeed *= SPEED_DECAY_MULT;
}

function resetCar() {
    carSpeed = INITIAL_CAR_SPEED;
    carAngle = INITIAL_CAR_ANGLE;

    for (var i = 0; i < trackGrid.length; i++) {
        if (trackGrid[i] === TRACK_PLAYER) {
            var tileRow = Math.floor(i / TRACK_COLS);
            var tileCol = i % TRACK_COLS;

            carX = tileCol * TRACK_WIDTH + 0.5 * TRACK_WIDTH;
            carY = tileRow * TRACK_HEIGHT + 0.5 * TRACK_HEIGHT;
            trackGrid[i] = TRACK_ROAD;
            break;
        }
    }
}

function initCar() {
    carPic.onload = function () {
        carPicLoaded = true;
    };
    carPic.src = "player1.png";
    resetCar();
}

function drawCar() {
    //carAngle += 0.2;
    if (carPicLoaded) {
        drawBitmapCenteredAtLocationWithRotation(carPic, carX, carY, carAngle);
    }
}
