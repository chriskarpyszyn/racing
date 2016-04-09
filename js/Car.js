const SPEED_DECAY_MULT = 0.94;
const DRIVE_POWER = 0.5;
const REVERSE_POWER = 0.2;
const TURN_RATE = 0.03;
const MIN_TURN_SPEED = 0.5;

const INITIAL_CAR_SPEED = 0;
const INITIAL_CAR_ANGLE = -0.5 * Math.PI;

//control
this.keyHeld_Gas = false;
this.keyHeld_Reverse = false;
this.keyHeld_TurnLeft = false;
this.keyHeld_TurnRight = false;

function carClass() {

    this.carX
    this.carY;
    this.carSpeed = 0;
    this.carAngle = 0;

    this.initCar = function (whichGraphic) {
        this.myBitmap = whichGraphic;
        this.resetCar();
    }

    this.setUpControls = function (forwardKey, backKey, leftKey, rightKey) {
        this.controlKeyForGas = forwardKey;
        this.controlKeyForBreak = backKey;
        this.controlKeyForTurnLeft = leftKey;
        this.controlKeyForTurnRight = rightKey;
    }

    this.moveCar = function() {
        if (this.keyHeld_Gas) {
            this.carSpeed += DRIVE_POWER;
        }

        if (this.keyHeld_Reverse) {
            this.carSpeed += -REVERSE_POWER;
        }

        if (this.keyHeld_TurnRight) {
            if (Math.abs(this.carSpeed) > MIN_TURN_SPEED) {
                this.carAngle += TURN_RATE * Math.PI;
            }
        }

        if (this.keyHeld_TurnLeft) {
            if (Math.abs(this.carSpeed) > MIN_TURN_SPEED) {
                this.carAngle += -TURN_RATE * Math.PI;
            }
        }

        var nextCarX = this.carX + Math.cos(this.carAngle) * this.carSpeed;
        var nextCarY = this.carY + Math.sin(this.carAngle) * this.carSpeed;
        if (checkForTrackAtPixelCoord(nextCarX, nextCarY)) {
            this.carX = nextCarX;
            this.carY = nextCarY;
        } else {
            this.carSpeed = -0.3 * this.carSpeed;
        }

        this.carSpeed *= SPEED_DECAY_MULT;
    }

    this.resetCar = function() {
        this.carSpeed = INITIAL_CAR_SPEED;
        this.carAngle = INITIAL_CAR_ANGLE;

        for (var i = 0; i < trackGrid.length; i++) {
            if (trackGrid[i] === TRACK_PLAYER) {
                var tileRow = Math.floor(i / TRACK_COLS);
                var tileCol = i % TRACK_COLS;

                this.carX = tileCol * TRACK_WIDTH + 0.5 * TRACK_WIDTH;
                this.carY = tileRow * TRACK_HEIGHT + 0.5 * TRACK_HEIGHT;
                trackGrid[i] = TRACK_ROAD;
                break;
            }
        }
    }

    this.drawCar = function() {
        drawBitmapCenteredAtLocationWithRotation(this.myBitmap, this.carX, this.carY, this.carAngle);
    }
}
