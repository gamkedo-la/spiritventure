var playerPic=document.createElement("img");
var teardropAnim=document.createElement("img");
var tilePics = [];

var picsToLoad = 0;

function countLoadedImageAndLaunchIfReady() {
  picsToLoad--;
  if(picsToLoad == 0) { // last image loaded?
    loadingDoneSoStartGame();
  }
}

function beginLoadingImage(imgVar, fileName) {
  imgVar.onload=countLoadedImageAndLaunchIfReady;
  imgVar.src="images/"+fileName;
}

function loadImageForTileCode(tileCode, fileName) {
  tilePics[tileCode] = document.createElement("img");
  beginLoadingImage(tilePics[tileCode],fileName);
}

function loadImages() {

  var imageList = [
    {varName:playerPic, theFile:"soul.png"},
    {varName:teardropAnim, theFile:"teardrop-sprite.png"},
    //tileTypes below
    {tileType:TILE_GROUND, theFile:"world_ground.png"},
    {tileType:TILE_WALL, theFile:"spotwall.png"},
    {tileType:TILE_WALL2, theFile:"wall_dark.png"},
    {tileType:TILE_GOAL, theFile:"wall_moredark.png"},
    {tileType:TILE_KEY, theFile:"world_key.png"},
    {tileType:TILE_DOOR, theFile:"world_door.png"},
    {tileType:TILE_MIND, theFile:"heart.png"},
    {tileType:TILE_DESPOND, theFile:"Despond_Lotus_(Brahma).png"},
    {tileType:TILE_VASE, theFile:"sad_vase.png"},
    {tileType:TILE_GROUND2, theFile:"tile_reflect.png"},
    {tileType:TILE_GROUND3, theFile:"tile_checkered.png"},
    {tileType:TILE_ROSE, theFile:"tile_rose.png"},
    ];

  picsToLoad = imageList.length;

  for(var i=0;i<imageList.length;i++) {
    if(imageList[i].tileType != undefined) {
      loadImageForTileCode(imageList[i].tileType, imageList[i].theFile);
    } else {
      beginLoadingImage(imageList[i].varName, imageList[i].theFile);
    } // end of else
  } // end of for imageList

} // end of function loadImages
