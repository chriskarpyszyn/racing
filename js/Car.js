const SPEED_DECAY_MULT = 0.94;
const DRIVE_POWER = 0.5;
const REVERSE_POWER = 0.2;
const TURN_RATE = 0.03;
const MIN_TURN_SPEED = 0.5;

const INITIAL_CAR_SPEED = 0;
const INITIAL_CAR_ANGLE = -0.5 * Math.PI;

function CarClass() {
    //control
    this.keyHeld_Gas = false;
    this.keyHeld_Reverse = false;
    this.keyHeld_TurnLeft = false;
    this.keyHeld_TurnRight = false;

    this.carSpeed = 0;
    this.carAngle = 0;

    this.initCar = function (whichGraphic, whichName) {
        this.myBitmap = whichGraphic;
        this.myName = whichName;
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
        const nextCarX = this.carX + Math.cos(this.carAngle) * this.carSpeed;
        const nextCarY = this.carY + Math.sin(this.carAngle) * this.carSpeed;
        const nextTileType = getTrackAtPixelCoord(nextCarX, nextCarY);
        if (nextTileType === TRACK_ROAD) {
            this.carX = nextCarX;
            this.carY = nextCarY;
        }
        else if (nextTileType === TRACK_GOAL) {
            document.getElementById("debugText").innerHTML = `${this.myName} won the race.`;
            car1.resetCar();
            car2.resetCar();

        } else {
            this.carSpeed = -0.3 * this.carSpeed;
        }

        this.carSpeed *= SPEED_DECAY_MULT;
    }

    this.resetCar = function() {
        this.carSpeed = INITIAL_CAR_SPEED;
        this.carAngle = INITIAL_CAR_ANGLE;

        if (this.homeX == undefined) {
            for (let i = 0; i < trackGrid.length; i++) {
                if (trackGrid[i] === TRACK_PLAYER) {
                    const tileRow = Math.floor(i / TRACK_COLS);
                    const tileCol = i % TRACK_COLS;
                    this.homeX = tileCol * TRACK_WIDTH + 0.5 * TRACK_WIDTH;
                    this.homeY = tileRow * TRACK_HEIGHT + 0.5 * TRACK_HEIGHT;
                    trackGrid[i] = TRACK_ROAD;
                    break;
                }
            }
        }
        this.carX = this.homeX;
        this.carY = this.homeY;
    }

    this.drawCar = function() {
        drawBitmapCenteredAtLocationWithRotation(this.myBitmap, this.carX, this.carY, this.carAngle);
    }
}
