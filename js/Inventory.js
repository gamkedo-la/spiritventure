const INVENTORY_ANIM_FRAME_WAIT = 15;
const INVENTORY_ITEM_W = 50;
const INVENTORY_ITEM_H = 50;

var showingInventory = false;
var inventoryAnimFrame = 0; //use for all inventory animations
var inventoryAnimFrameDelay = INVENTORY_ANIM_FRAME_WAIT;

function drawAnimatedInventory(){
    if(showingInventory == false){
        return;
    }
    inventoryAnimFrameDelay--;
    if(inventoryAnimFrameDelay<0){
        inventoryAnimFrameDelay = INVENTORY_ANIM_FRAME_WAIT;
        inventoryAnimFrame++;
    }
    canvasContext.globalAlpha = 0.6; //how solid is the background
    var margin = 50;
    colorRect(margin, margin, canvas.width-margin*2, canvas.height-margin*2, "blue");
    canvasContext.globalAlpha = 1.0;
    canvasContext.drawImage(teardropAnim,
        (inventoryAnimFrame%3)*INVENTORY_ITEM_W, 0, // source corner x, y
        INVENTORY_ITEM_W, INVENTORY_ITEM_H, //source width and height
        25+margin, 25+margin, //dest corner x, y
        INVENTORY_ITEM_W, INVENTORY_ITEM_H); //dest width and height
    canvasContext.fillStyle = "yellow";
    canvasContext.fillText("teardrop", 25+margin, 50+margin+INVENTORY_ITEM_H);
}

