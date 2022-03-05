const INVENTORY_ANIM_FRAME_WAIT = 15;
const INVENTORY_ITEM_W = 50;
const INVENTORY_ITEM_H = 50;

var showingInventory = false;
var inventoryAnimFrame = 0; //use for all inventory animations
var inventoryAnimFrameDelay = INVENTORY_ANIM_FRAME_WAIT;

var inventoryMargin = 50;

function drawAnimatedInventory(){
    var inventoryItems = [
        {
            "name": "Teardrop",
            "frames": 3,
            "visible": true,
            "animation": teardropAnim,
            "x": 40,
            "y": 65,
            "flavor": "Some flavor text can go here later"
        },
        {
            "name": "Boxing Glove",
            "frames": 1,
            "visible": true,
            "animation": boxingGlove,
            "x": 180,
            "y": 65,
            "flavor": "Some flavor text can go here later"
        }
    ]

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

    for(let i = 0; i < inventoryItems.length; i++){
        drawInventoryItemIcon(inventoryItems[i].animation, inventoryItems[i].frames, inventoryItems[i].x, inventoryItems[i].y);
        drawInventoryItemLabel(inventoryItems[i].name, inventoryItems[i].x, inventoryItems[i].y, "yellow");
    }
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
    
