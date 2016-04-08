const TRACK_WIDTH = 40;
const TRACK_HEIGHT = 40;
const TRACK_COLS = 20;
const TRACK_ROWS = 15;

const TRACK_ROAD = 0;
const TRACK_WALL = 1;
const TRACK_PLAYER = 2;
const TRACK_GOAL = 3;
const TRACK_TREE = 4;
const TRACK_FLAG = 5;

var trackGrid =
[
    4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4,
    4, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
    1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 0, 0, 0, 1,
    1, 0, 0, 0, 1, 1, 1, 1, 4, 4, 4, 4, 1, 1, 1, 1, 1, 0, 0, 1,
    1, 0, 0, 1, 1, 0, 0, 1, 1, 4, 4, 1, 0, 0, 0, 1, 1, 0, 0, 1,
    1, 0, 0, 1, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
    1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
    1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 5, 0, 0, 1, 0, 0, 1,
    1, 0, 0, 1, 0, 0, 5, 0, 0, 0, 5, 0, 0, 1, 0, 0, 1, 0, 0, 1,
    1, 0, 2, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 5, 0, 0, 1,
    1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
    0, 3, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
    0, 3, 0, 0, 0, 0, 1, 4, 4, 1, 1, 1, 1, 4, 1, 0, 0, 0, 1, 1,
    1, 1, 1, 1, 1, 1, 4, 4, 1, 1, 1, 1, 4, 4, 4, 1, 1, 1, 1, 4
];

function trackTileToIndex(tileCol, tileRow) {
    return tileCol + tileRow * TRACK_COLS;
}

function isWallAtTileCoord(trackTileCol, trackTileRow) {
    var trackIndex = trackTileToIndex(trackTileCol, trackTileRow);
    return (trackGrid[trackIndex] === TRACK_WALL);
}

function checkForTrackAtPixelCoord(pixelX, pixelY) {
    var tileCol = Math.floor(pixelX / TRACK_WIDTH);
    var tileRow = Math.floor(pixelY / TRACK_HEIGHT);

    if (tileCol < 0 || tileCol >= TRACK_COLS || tileRow < 0 || tileRow >= TRACK_ROWS) {
        return false;
    }

    var trackIndex = trackTileToIndex(tileCol, tileRow);

    return (trackGrid[trackIndex] === TRACK_ROAD);
}

function drawTiles() {
    for (var col = 0; col < TRACK_COLS; col++) {
        for (var row = 0; row < TRACK_ROWS; row++) {

            var trackX = col * TRACK_WIDTH;
            var trackY = row * TRACK_HEIGHT;

            var trackIndex = trackTileToIndex(col, row);
            var trackType = trackGrid[trackIndex];
            var useImg;

            switch (trackType) {
                case TRACK_ROAD:
                    useImg = trackRoadPic;
                    break;
                case TRACK_WALL:
                    useImg = trackWallPic;
                    break;
                case TRACK_GOAL:
                    useImg = trackGoalPic;
                    break;
                case TRACK_TREE:
                    useImg = trackTreePic;
                    break;
                case TRACK_FLAG:
                    useImg = trackFlagPic;
                    break;
            }

            canvasContext.drawImage(useImg, trackX, trackY);
        }
    }
}
