var dialogConvoStep = 0;

var dialogActiveConvo = null;
var dialogX = 0;
var dialogY = 0;
var dialogW = 300;
var dialogHOffset = 10;
var dialogHPerLine = 25;
var dialogPanelColor1 = "rgba(0,0,0,0.8)";
var dialogPanelColor2 = "rgba(0,0,0,0.6)";
var dialogOutlineColor = "#000000";
var dialogTextColor = "#fcfcfc";
var dialogFontSize = 24;
var dialogTextOffset = 4;
var dialogTextCharDelay = 16;
var dialogLerpSpeed = 0.2;
var dialogChoiceOffsetX = 240 - 90;
var dialogChoiceOffsetY = 120;
var dialogChoiceWidth = 160;
var dialogChoiceHeight = dialogFontSize + (dialogTextOffset * 2);
var dialogChoiceButtons = [];

var dialogCurrentX = 0;
var dialogCurrentY = 0;
var dialogCurrentW = 0;
var dialogCurrentH = 0;
var dialogCurrentText = ["", "", "", ""];
var dialogCurrentTextIndex = 0;
var dialogTextCharTimer = 0;

function advanceDialog() {
    if (dialogActiveConvo != null) {
        //var doneTyping = true;//dialogCurrentText.length < dialogActiveConvo[dialogConvoStep].text.length
        //to do: now that text wraps we need a better way to tell that it's done typing
        //hint: previously it checked if the line was done was being typed but we also need to know that we've done all lines

        var doneTyping = getDialogCurrentTextLength() >= dialogActiveConvo[dialogConvoStep].text.length;

        if (!doneTyping) {
            for (var i = 0; i < wrapText.length; i++) {
                dialogCurrentText[i] = wrapText[i];
            }
        } else if (dialogActiveConvo[dialogConvoStep].choices == null) {
            dialogConvoStep = dialogActiveConvo[dialogConvoStep].nextPage;
            resetDialogText();
            if (dialogConvoStep == null) {
                dialogConvoStep = 0;
                dialogActiveConvo = null;
                handleDialogBasedOnRoom();
            } else {
                wrapNextText(dialogActiveConvo[dialogConvoStep].text);
            }
        }

        return true; // meaning we actually did advance the dialog
    }

    return false; // no dialog to advance, so we didn't
}

function setSpeakerNameColor(speakerName) {
    let nameColor = dialogTextColor;
    switch (speakerName){
        case "Despond":
            nameColor = dialogTextColor;
            break
        case "Gemini":
            nameColor = '#000000'; // warm yellow
            break
        default:
            nameColor = dialogTextColor;
            break  
    }
    return nameColor
}

function setSpeakerBg(speakerName) {
    let style = "#000000";
    switch (speakerName){
        case "Despond":
            style = '#EF476F'; // redpink
            break
        case "Char2":
            style = '#26547C'; // blue
            break
        case "Gemini":
            style = '#FFD166'; // warm yellow
            break
        case "Char3":
            style = '#06D6A0'; // cool green
            break
        default:
           style = '#000000';
            break  
    }
    return style
}

function selectDialogChoice(key) {
    if (dialogActiveConvo == null || dialogActiveConvo[dialogConvoStep].choices == null) return;

    sfx('dialog_select.wav');

    var option = keyToNumber(key);
    if (option != -1 && option <= dialogActiveConvo[dialogConvoStep].choices.length) {
        dialogConvoStep = dialogActiveConvo[dialogConvoStep].choices[option - 1][1];
        resetDialogText();
        wrapNextText(dialogActiveConvo[dialogConvoStep].text);
    }
}

function wrapNextText(textToWrap) {
    wrapText = [textToWrap];
    lineWrap();
    //dialogCurrentText = wrapText;
    dialogCurrentText = [];
    for (var i = 0; i < wrapText.length; i++) {
        dialogCurrentText.push("");
    }
}

function getDialogCurrentTextLength() {
    var textLength = 0;
    for (let i = 0; i < dialogCurrentText.length; i++) {
        textLength += dialogCurrentText[i].length;
    }
    return textLength;
}

function resetDialogText() {
    dialogCurrentText = [""];
    dialogCurrentTextIndex = 0;
    dialogTextCharTimer = 0;
    currentPrintLine = 0;
    dialogChoiceButtons.length = 0;
}

function setupDialog(convoObj, posX, posY) {
    dialogActiveConvo = convoObj;
    dialogConvoStep = 0;
    dialogX = posX;
    dialogY = posY;

    dialogCurrentX = posX + dialogW / 2;
    dialogCurrentY = posY + (dialogHOffset + (dialogHPerLine * dialogCurrentText.length)) / 2;
    dialogCurrentW = dialogCurrentH = 0;
    resetDialogText();
    wrapNextText(dialogActiveConvo[dialogConvoStep].text);
}

var currentPrintLine = 0;
function processDialog() {
    if (dialogActiveConvo == null) return;

    dialogCurrentX = lerp(dialogCurrentX, dialogX, dialogLerpSpeed);
    dialogCurrentY = lerp(dialogCurrentY, dialogY, dialogLerpSpeed);
    dialogCurrentW = lerp(dialogCurrentW, dialogW, dialogLerpSpeed);
    dialogCurrentH = lerp(dialogCurrentH, dialogHOffset + (dialogHPerLine * dialogCurrentText.length), dialogLerpSpeed);

    var lineToPrint = wrapText[currentPrintLine];// dialogActiveConvo[dialogConvoStep].text;

    if (dialogTextCharTimer <= 0 && dialogCurrentW > dialogW / 1.25) {
        if (dialogCurrentText[currentPrintLine].length < lineToPrint.length) {
            dialogCurrentText[currentPrintLine] += lineToPrint[dialogCurrentTextIndex];
            dialogCurrentTextIndex++;
            dialogTextCharTimer = dialogTextCharDelay;
            sfx('dialog_advance.wav',false,0.25); // fixme: might happen too often
        }
        else if (currentPrintLine < wrapText.length - 1) {
            currentPrintLine++;
            dialogCurrentTextIndex = 0;
        }
    }
    else {
        dialogTextCharTimer -= deltaTime;
    }
}

function drawSpeakerName(speakerName, x, y, textColor) {
    canvasContext.fillStyle = textColor;
    canvasContext.fillText(speakerName, x, y)
}

var bgSlideAng = 0;
var bgSlideOffset = 65;
var bgSpinRate = 0.02;

function drawDialog() {
    bgSlideAng += bgSpinRate;
    if (dialogActiveConvo == null) return;

    var bgScrollX = Math.cos(bgSlideAng)*bgSlideOffset;
    var bgScrollY = Math.sin(bgSlideAng)*bgSlideOffset;

    dialogChoiceButtons.length = 0;
    /*var dialogPanelGrad = canvasContext.createLinearGradient(dialogCurrentX + camX, dialogCurrentY + camY, dialogCurrentX + camX + dialogW / 2, dialogCurrentY + camY + (dialogHOffset + (dialogHPerLine * dialogCurrentText.length)) * 2);
    dialogPanelGrad.addColorStop(0, dialogPanelColor1);
    dialogPanelGrad.addColorStop(1, dialogPanelColor2);
    canvasContext.fillStyle = dialogPanelGrad;*/
    canvasContext.fillStyle = dialogBack;

    canvasContext.save();
    canvasContext.translate(bgScrollX,bgScrollY);

    canvasContext.fillRect(dialogCurrentX + camX -bgScrollX, dialogCurrentY + camY -bgScrollY, dialogCurrentW, dialogCurrentH);
    if (dialogActiveConvo[dialogConvoStep].choices != null) {
        for (let i = 0; i < dialogActiveConvo[dialogConvoStep].choices.length; i++) {
            var button = {
                x: dialogCurrentX + camX + dialogChoiceOffsetX,
                y: dialogCurrentY + camY + dialogChoiceOffsetY + (dialogChoiceHeight * i),
                width: dialogChoiceWidth,
                height: dialogChoiceHeight,
                key: i + 49
            };
            dialogChoiceButtons.push(button);

            canvasContext.fillRect(button.x - bgScrollX, button.y -bgScrollY, button.width, button.height);
        }
    }
    canvasContext.restore();

    canvasContext.strokeStyle = dialogOutlineColor;
    canvasContext.strokeRect(dialogCurrentX + camX, dialogCurrentY + camY, dialogCurrentW, dialogCurrentH);
    canvasContext.strokeRect(dialogCurrentX + camX + 32 - dialogFontSize - dialogTextOffset * 2, dialogCurrentY + camY - dialogFontSize - dialogTextOffset * 2, dialogCurrentW / 3, dialogHOffset + dialogHPerLine);
    if (dialogActiveConvo[dialogConvoStep].choices != null) {
        for (let i = 0; i < dialogActiveConvo[dialogConvoStep].choices.length; i++) {
            canvasContext.strokeRect(dialogCurrentX + camX + dialogChoiceOffsetX, dialogCurrentY + camY + dialogChoiceOffsetY + (dialogChoiceHeight * i), dialogChoiceWidth, dialogChoiceHeight);
        }
    }

    // handle speaker details
    let speakerName = dialogActiveConvo[dialogConvoStep].who;

    canvasContext.fillStyle = setSpeakerBg(speakerName)

    canvasContext.fillRect(dialogCurrentX + camX + 32 - dialogFontSize - dialogTextOffset * 2, 
        dialogCurrentY + camY - dialogFontSize - dialogTextOffset * 2, 
        dialogCurrentW / 3, 
        dialogHOffset + dialogHPerLine);

    let speakerX = dialogCurrentX + camX + 30 - dialogFontSize - dialogTextOffset;
    let speakerY = dialogCurrentY + camY + dialogFontSize - dialogFontSize - dialogTextOffset
    drawSpeakerName(speakerName, speakerX, speakerY, setSpeakerNameColor(speakerName))

    // typewriter for main dialog
    canvasContext.fillStyle = dialogTextColor;
    for (var i = 0; i < dialogCurrentText.length; i++) {
        canvasContext.fillText(dialogCurrentText[i], dialogCurrentX + camX + dialogTextOffset, dialogCurrentY + camY + dialogFontSize * (i + 1) + dialogTextOffset);
    }

    // draw choice options
    if (dialogActiveConvo[dialogConvoStep].choices != null) {
        //console.log(dialogActiveConvo[dialogConvoStep].choices.length+" AVAILABLE CHOICES AT DIALOG STEP "+dialogConvoStep);
        for (let i = 0; i < dialogActiveConvo[dialogConvoStep].choices.length; i++) {
            let choiceString = (i + 1).toString() + ". " + dialogActiveConvo[dialogConvoStep].choices[i][0];
            // console.log("CHOICE: "+choiceString);
            canvasContext.fillText(choiceString, dialogCurrentX + camX + dialogChoiceOffsetX + dialogTextOffset, dialogCurrentY + camY + dialogChoiceOffsetY + dialogFontSize + dialogTextOffset + (dialogChoiceHeight * i), dialogChoiceWidth, dialogChoiceHeight);
        }
    } else {
        //console.log("NO CHOICES AT DIALOG STEP "+dialogConvoStep);
    }

}

var wrapText = [
    "Replace text with text you want to wrap"
];

function lineWrap() { // note: gets calling immediately after definition!
    const newCut = [];
    var maxLineChar = 27; // Currently based on letter count
    var findEnd;

    for (let i = 0; i < wrapText.length; i++) {// dealing with multiple lines
        const currentLine = wrapText[i];
        for (let j = 0; j < currentLine.length; j++) {
            if (j === currentLine.length - 1) {
                if ((i === 0) || (i >= wrapText.length - 2)) {
                    newCut.push(currentLine);
                } else {
                    newCut.push(currentLine.substring(0, currentLine.length));
                }
            }
        }
    }

    const newerCut = [];
    for (var i = 0; i < newCut.length; i++) {// combines words up to the length of each line
        while (newCut[i].length > 0) {
            findEnd = maxLineChar;
            if (newCut[i].length > maxLineChar) {
                for (var ii = findEnd; ii > 0; ii--) {
                    if (newCut[i].charAt(ii) == " ") {
                        findEnd = ii;
                        break;
                    }
                }
            }
            newerCut.push(newCut[i].substring(0, findEnd));
            newCut[i] = newCut[i].substring(findEnd, newCut[i].length);
        }
    }

    wrapText = newerCut; // overwrite previous list with newly chopped up list
}