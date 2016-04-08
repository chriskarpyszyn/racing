const KEY_UP_ARROW = 38;
const KEY_DOWN_ARROW = 40;
const KEY_LEFT_ARROW = 37;
const KEY_RIGHT_ARROW = 39;

var keyHeld_Gas = false;
var keyHeld_Reverse = false;
var keyHeld_TurnLeft = false;
var keyHeld_TurnRight = false;

function keyPressed(evt) {
    //document.getElementById("debugText").innerHTML = "keyCode Pushed: " + evt.keyCode;
    setKeyHoldState(evt.keyCode, true);
    evt.preventDefault(); //stops the default behavior of arrow keys
}

function keyReleased(evt) {
    //document.getElementById("debugText").innerHTML = "keyCode Released: " + evt.keyCode;
    setKeyHoldState(evt.keyCode, false);
}

function setKeyHoldState(keyCode, setTo) {
    if (keyCode == KEY_UP_ARROW) {
        keyHeld_Gas = setTo;
    }
    if (keyCode === KEY_DOWN_ARROW) {
        keyHeld_Reverse = setTo;
    }
    if (keyCode === KEY_RIGHT_ARROW) {
        keyHeld_TurnRight = setTo;
    }
    if (keyCode === KEY_LEFT_ARROW) {
        keyHeld_TurnLeft = setTo;
    }
}

function initInput() {
    document.addEventListener("keydown", keyPressed);
    document.addEventListener("keyup", keyReleased);
}
