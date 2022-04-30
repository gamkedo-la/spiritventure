var playerPic=document.createElement("img");
var keyAnim=document.createElement("img")
var teardropAnim=document.createElement("img");
var groundPartAnim=document.createElement("img");
var boxingGlove=document.createElement("img");
var dialogBack=document.createElement("img");
var titlescreenBG=document.createElement("img");
var tilePics = [];

var picsToLoad = 0;

function countLoadedImageAndLaunchIfReady() {
  picsToLoad--;
  if(picsToLoad == 0) { // last image loaded?
    dialogBack = canvasContext.createPattern(dialogBack,"repeat");
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
    {varName:groundPartAnim, theFile:"particle.png"},
    {varName:boxingGlove, theFile:"boxing_glove.png"},
    {varName:keyAnim, theFile:"world_key.png"},
    {varName:dialogBack, theFile:"dialog_back.png"},
    {varName:titlescreenBG, theFile:"titlescreen.png"},
    //tileTypes below
    {tileType:TILE_GROUND, theFile:"world_ground.png"},
    {tileType:TILE_WALL, theFile:"Tile_ar_2.png"},
    {tileType:TILE_WALL2, theFile:"Tile_ar_3.png"},
    {tileType:TILE_GOAL, theFile:"wall_moredark.png"},
    {tileType:TILE_KEY, theFile:"world_key.png"},
    {tileType:TILE_DOOR, theFile:"world_door.png"},
    {tileType:TILE_MIND, theFile:"heart.png"},
    {tileType:TILE_DESPOND, theFile:"Despond_Lotus.png"},
    {tileType:TILE_VASE, theFile:"sad_vase.png"},
    {tileType:TILE_GROUND2, theFile:"tile_marble1.png"},
    {tileType:TILE_GROUND3, theFile:"tile_marble2.png"},
    {tileType:TILE_MARBLE_BLUE, theFile:"tile_marble3.png"},
    {tileType:TILE_MARBLE_PINK, theFile:"tile_marble4.png"},
    {tileType:TILE_ROSE, theFile:"tile_rose.png"},
    {tileType:TILE_ANGER_1, theFile:"anger_wall_art.png"},
    {tileType:TILE_ANGER_2, theFile:"wall_art_fear_2.png"},
    {tileType:TILE_VINES_1, theFile:"Vines_1.png"},
    {tileType:TILE_VINES_2, theFile:"Vines_2.png"},
    {tileType:TILE_TRIPA, theFile:"Tripa.png"},
    {tileType:TILE_SATAH, theFile:"Satah.png"},
    {tileType:TILE_CLOCKS_1, theFile:"clocks_1.png"},
    {tileType:TILE_HAPPY_1, theFile:"happy_wall_art_1.png"},
    {tileType:TILE_GEMINI_END, theFile:"gemini_endgame.png"},
    
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
