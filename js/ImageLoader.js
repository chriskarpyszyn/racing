var carPic = document.createElement("img");
var trackRoadPic = document.createElement("img");
var trackWallPic = document.createElement("img");
var trackGoalPic = document.createElement("img");
var trackTreePic = document.createElement("img");
var trackFlagPic = document.createElement("img");
var picsToLoad = 0;

function loadImages() {
    var imageList = [
        { varName: carPic, fileName: "player1.png" },
        { varName: trackRoadPic, fileName: "track_road.png" },
        { varName: trackWallPic, fileName: "track_wall.png" },
        { varName: trackGoalPic, fileName: "track_goal.png" },
        { varName: trackTreePic, fileName: "track_tree.png" },
        { varName: trackFlagPic, fileName: "track_flag.png" }
    ];

    picsToLoad = imageList.length;

    for (var i = 0; i < imageList.length; i++) {
        beginLoadingImage(imageList[i].varName, imageList[i].fileName);
    }
}

function beginLoadingImage(imgVar, fileName) {
    imgVar.onload = countLoadedImagesAndLaunch;
    imgVar.src = `images/${fileName}`;
}

function countLoadedImagesAndLaunch() {
    picsToLoad--;
    if (picsToLoad === 0) {
        startGame();
    }
}
