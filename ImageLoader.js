var carPic = document.createElement("img");
var trackRoadPic = document.createElement("img");
var trackWallPic = document.createElement("img");
var picsToLoad = 3;

function loadImages() {
    carPic.onload=countLoadedImagesAndLaunch;
    carPic.src="player1.png";
    trackRoadPic.onload=countLoadedImagesAndLaunch;
    trackRoadPic.src="track_road.png";
    trackWallPic.onload=countLoadedImagesAndLaunch;
    trackWallPic.src="track_wall.png";
}

function countLoadedImagesAndLaunch() {
    picsToLoad--;
    if (picsToLoad === 0) {
        startGame();
    }
}
