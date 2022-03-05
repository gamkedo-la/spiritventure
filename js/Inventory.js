const INVENTORY_ANIM_FRAME_WAIT = 15;
const INVENTORY_ITEM_W = 50;
const INVENTORY_ITEM_H = 50;
const INVENTORY_FRAMES_TEARDROP = 3; 
const INVENTORY_FRAMES_BOXING_GLOVE = 1; 

var showingInventory = false;
var inventoryAnimFrame = 0; //use for all inventory animations
var inventoryAnimFrameDelay = INVENTORY_ANIM_FRAME_WAIT;

var inventoryMargin = 50;

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
    colorRect(inventoryMargin, inventoryMargin, canvas.width-inventoryMargin*2, canvas.height-inventoryMargin*2, "blue");
    canvasContext.globalAlpha = 1.0;
    var teardropX = 40;
    var teardropY = 65;
    var boxingGloveX = 180;
    var boxingGloveY = 65;

    drawInventoryItemIcon(teardropAnim, INVENTORY_FRAMES_TEARDROP, teardropX, teardropY);
    drawInventoryItemIcon(boxingGlove, INVENTORY_FRAMES_BOXING_GLOVE, boxingGloveX, boxingGloveY);

    drawInventoryItemLabel("teardrop", teardropX, teardropY, "yellow");
    drawInventoryItemLabel("boxing glove", boxingGloveX, boxingGloveY, "yellow");
}

function drawInventoryItemIcon(animation, frames, destX, destY){
    canvasContext.drawImage(animation,
        (inventoryAnimFrame % frames) * INVENTORY_ITEM_W, 0, // source corner x, y
        INVENTORY_ITEM_W, INVENTORY_ITEM_H, //source width and height
        destX + inventoryMargin, destY + inventoryMargin, //dest corner x, y
        INVENTORY_ITEM_W, INVENTORY_ITEM_H); //dest width and height
}

function drawInventoryItemLabel(text, x, y, fillStyle, oldFillStyle){
    canvasContext.fillStyle = fillStyle;
    canvasContext.fillText(text, x+inventoryMargin, y+25+inventoryMargin+INVENTORY_ITEM_H);
    canvasContext.fillStyle = oldFillStyle;
}
    
