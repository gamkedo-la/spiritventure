const INVENTORY_ANIM_FRAME_WAIT = 15;
const INVENTORY_ITEM_W = 50;
const INVENTORY_ITEM_H = 50;

var showingInventory = false;
var inventoryAnimFrame = 0; //use for all inventory animations
var inventoryAnimFrameDelay = INVENTORY_ANIM_FRAME_WAIT;

var inventoryMargin = 50;
var inventorySelectedIndex = -1;

// currently all items are defines in p1 class initalization. See SoulPC.js for details

function dist(x1, y1, x2, y2){
	var dx= x2-x1;
	var dy= y2-y1;
	return Math.sqrt(dx*dx+dy*dy);
}

function drawAnimatedInventory() {
    if (showingInventory == false) {
        return;
    }
    inventoryAnimFrameDelay--;
    if (inventoryAnimFrameDelay < 0) {
        inventoryAnimFrameDelay = INVENTORY_ANIM_FRAME_WAIT;
        inventoryAnimFrame++;
    }

    //background
    canvasContext.globalAlpha = 0.8; //how solid is the background
    fillRoundedRectangle(
        canvasContext,
        inventoryMargin,
        inventoryMargin,
        canvas.width - inventoryMargin * 2,
        canvas.height - inventoryMargin * 2,
        "#dbc8af",
        10
    )
    canvasContext.globalAlpha = 1.0;

    //menu heading
    let headerHeight = 50;
    let headerWidth = 160;
    let headerXOffset = -262; 
    fillRoundedRectangle(
        canvasContext,
        (canvas.width - inventoryMargin * 2) / 2 - headerWidth + 300 / 2 + headerXOffset, //x, TODO: Center properly over the menu
        inventoryMargin - headerHeight / 2, //y
        headerWidth,
        headerHeight,
        "#424554",
        5
    )
    canvasContext.fillStyle = '#ffffff';
    canvasContext.font = 26 + 'px Arial';
    canvasContext.fillText(
        "Remnants",
        (canvas.width - inventoryMargin * 2) / 2 - headerWidth / 2 + 80 + headerXOffset +5 , //x 
        inventoryMargin + 10 // y
    )

    //grid
    let rows = 3;
    let columns = 4;
    let inventoryStartX = 120;
    let inventoryStartY = 135;

    drawGrid(inventoryStartX, inventoryStartY,
        40,//radius 
        6, //strokeWidth 
        20,//padding 
        rows, columns, p1.inventory);
    //if (inventorySelectedIndex>=0){
        drawInfoPanel(500, 60, p1.inventory[inventorySelectedIndex]);
    //}
}

function drawInventoryItemIcon(animation, frames, destX, destY) {
    canvasContext.drawImage(animation,
        (inventoryAnimFrame % frames) * INVENTORY_ITEM_W, 0, // source corner x, y
        INVENTORY_ITEM_W, INVENTORY_ITEM_H, //source width and height
        destX + inventoryMargin, destY + inventoryMargin, //dest corner x, y
        INVENTORY_ITEM_W, INVENTORY_ITEM_H); //dest width and height
}

function drawInventoryItemLabel(text, x, y, fillStyle, oldFillStyle) {
    canvasContext.fillStyle = fillStyle;
    canvasContext.fillText(text, x + inventoryMargin, y + 25 + inventoryMargin + INVENTORY_ITEM_H);
    canvasContext.fillStyle = oldFillStyle;
}

function drawGrid(startX, startY, radius, strokeWidth, padding, rows, cols, inventoryItems) {
    let index = 0;
    for (var i = 0; i<inventoryItems.length; i++) {
        inventoryItems[i].selected = false;
    };
    var iconRadius = 75;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            index = j + (i * cols);
            x = startX + j * (padding + 2 * radius);
            y = startY + i * (padding + 2 * radius);
            colorCircle(x, y, radius, 'rgba(0,0,0,0.1)');
            if (inventoryItems.length > index) {
                //colorCircle(x, y, radius, 'rgba(0,0,0,0.2)');
                if (inventoryItems[index].quantity == 0) {
                    //inventoryItems.splice(index, 1)
                } else {
                    inventoryItems[index].selected = dist(x,y,mouseX,mouseY)<radius;
                    if (inventoryItems[index].selected) {
                        inventorySelectedIndex = index;
                        outlineCircle(canvasContext, x, y, radius, '#ffffff', strokeWidth);
                    }
                    
                    drawInventoryItemIcon(inventoryItems[index].animation, inventoryItems[index].frames, x - iconRadius, y - iconRadius);

                    // quantity counter
                    if (inventoryItems[index].quantity > 1) {
                        let inventoryCoord = ((radius ** 2) / 2) ** 0.5;
                        colorCircle(x + inventoryCoord, y + inventoryCoord, radius / 3, 'rgba(225,225,225,1)');
                        canvasContext.fillStyle = 'black';
                        canvasContext.fillText(inventoryItems[index].quantity, x + inventoryCoord, y + inventoryCoord);
                    }
                }

            } 
            
            
        }
    }
}

function drawInfoPanel(startX, startY, invItem) {
    let width = 240;
    let padding = 10;
    let verticalExtra = 30;
    fillRoundedRectangle(canvasContext,startX, startY - verticalExtra, 240, 330 + verticalExtra*2, 'rgba(45,41,37,0.8)',4);
    if (invItem){
        canvasContext.fillStyle = '#f7f6f2';
        canvasContext.fillText(invItem.name, startX + 10, startY + 30, width - 2 * padding);

        // handle wrapping text into the info panel box later
        canvasContext.fillText(invItem.flavor, startX + 10, startY + 60, width - 2 * padding);
    }
}