//Main for Dialog Editor
window.onload = function() {
    window.addEventListener("focus", windowOnFocus);
    window.addEventListener("blur", windowOnBlur);

    canvas = document.createElement("canvas");
    canvasContext = canvas.getContext("2d");
    document.body.appendChild(canvas);
    canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	initializeInput();

	loadImages();
};

function windowOnBlur() {
	if(!loadingComplete) return;
}

function windowOnFocus() {
	if(!loadingComplete) return;
}

function loadingDoneSoStartGame() {
	loadingComplete = true;
  
	editorUpdate = setInterval(update, 1000 / FRAMES_PER_SECOND);

	window.focus();
  
	dialogEditor = new DialogEditor();
	dialogEditor.initialize();
}

function update() {
	if(!loadingComplete) return;
	
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	
	dialogEditor.update();
	
	dialogEditor.draw();
}

//Graphics Common
function colorText(context, showWords, textX, textY, fillColor, fontface, textAlign = 'left', opacity = 1) {
    context.save();
    context.textAlign = textAlign;
    context.font = fontface;
    context.globalAlpha = opacity;
    context.fillStyle = fillColor;
    context.fillText(showWords, textX, textY);
    context.restore();
}

function sizeOfString(context, font, str) {
	let result = 0;
	
	context.save();
	context.font = font;
	result = context.measureText(str).width;
	context.restore();
	
	const heightEnd = font.search('p');
	const heightString = font.substring(0, heightEnd);
	
	return {width:result, height:parseInt(heightString)};
}

function positionToCenterStringInFrame(context, font, string, frame) {
	const position = {x:0, y:0};
	const stringSize = sizeOfString(context, font, string);
	
	position.x = frame.x + (frame.width - stringSize.width) / 2;
	position.y = frame.getMidY() + ((stringSize.height) / 2) - (0.15 * stringSize.height);//last term is fudge factor to make it look better
	
	return position;
}

function strokeLine(context, originX, originY, destX, destY, strokeColor, lineWidth = 1) {
	context.save();
	context.strokeStyle = strokeColor;
	context.lineWidth = lineWidth;
	context.beginPath();
	context.moveTo(originX, originY);
	context.lineTo(destX, destY);
	context.stroke();
	context.restore();
}

function outlineCircle(context, centerX, centerY, radius, strokeColor, lineWidth = 1) {
	context.save();
    context.strokeStyle = strokeColor;
    context.beginPath();
    context.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    context.lineWidth = lineWidth;
    context.stroke();
    context.restore();
}

function doubleOutlineCircle(context,centerX, centerY, radius, strokeColor, lineWidth = 1, spacing, inward) {
	outlineCircle(context,centerX, centerY, radius, strokeColor, lineWidth);
	if(inward) {
		outlineCircle(context,centerX, centerY, radius - spacing, strokeColor, lineWidth);
	} else {
		outlineCircle(context,centerX, centerY, radius + spacing, strokeColor, lineWidth);
	}
}

function fillRectangle(context, topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
	context.save();
    context.fillStyle = fillColor;
    setRectanglePath(context, topLeftX, topLeftY, boxWidth, boxHeight);
    context.fill();
    context.restore();
}

function setRectanglePath(context, topLeftX, topLeftY, boxWidth, boxHeight) {
	context.beginPath();
	context.moveTo(topLeftX, topLeftY);
	context.lineTo(topLeftX + boxWidth, topLeftY);
	context.lineTo(topLeftX + boxWidth, topLeftY + boxHeight);
	context.lineTo(topLeftX, topLeftY + boxHeight);
	context.closePath();
}

function strokeRectangle(context, topLeftX, topLeftY, boxWidth, boxHeight, strokeColor, strokeThickness) {
	context.save();
    context.strokeStyle = strokeColor;
    context.lineWidth = strokeThickness;
    context.strokeRect(topLeftX, topLeftY, boxWidth, boxHeight);
    context.restore();
}

function doubleStrokeRectangle(context, topLeftX, topLeftY, boxWidth, boxHeight, strokeColor, strokeThickness, spacing, inward) {
	strokeRectangle(context, topLeftX, topLeftY, boxWidth, boxHeight, strokeColor, strokeThickness);
	if(inward) {
		strokeRectangle(context, topLeftX + spacing, topLeftY + spacing, boxWidth - (2 * spacing), boxHeight - (2 * spacing), strokeColor, strokeThickness);
	} else {
		strokeRectangle(context, topLeftX - spacing, topLeftY - spacing, boxWidth + (2 * spacing), boxHeight + (2 * spacing), strokeColor, strokeThickness);
	}
}

function fillRoundedRectangle(context, topLeftX, topLeftY, boxWidth, boxHeight, fillColor, cornerRadius) {
	let radius = cornerRadius;
	
	if(boxWidth < boxHeight) {
		if(radius > boxWidth/2) {
			radius = boxWidth/2;
		}
	} else {
		if(radius > boxHeight/2) {
			radius = boxHeight/2;
		}
	}
	
	context.save();
	setRoundedRectPath(context, topLeftX, topLeftY, boxWidth, boxHeight, cornerRadius)
	context.fillStyle = fillColor;
	context.fill();
	context.restore();
}

function strokeRoundedRectangle(context, topLeftX, topLeftY, boxWidth, boxHeight, strokeColor, strokeThickness, cornerRadius) {
	let radius = cornerRadius;
	
	if(boxWidth < boxHeight) {
		if(radius > boxWidth/2) {
			radius = boxWidth/2;
		}
	} else {
		if(radius > boxHeight/2) {
			radius = boxHeight/2;
		}
	}
	
	if(radius < 0) {radius = 0;}
	
	context.save();
	setRoundedRectPath(context, topLeftX, topLeftY, boxWidth, boxHeight, radius)
	context.strokeStyle = strokeColor;
	context.lineWidth = strokeThickness;
	context.stroke();
	context.restore();
}

function doubleStrokeRoundedRectangle(context, topLeftX, topLeftY, boxWidth, boxHeight, strokeColor, strokeThickness, cornerRadius, spacing, inward) {
	strokeRoundedRectangle(context, topLeftX, topLeftY, boxWidth, boxHeight, strokeColor, strokeThickness, cornerRadius);
	if(inward) {
		strokeRoundedRectangle(context, topLeftX + spacing, topLeftY + spacing, boxWidth - (2 * spacing), boxHeight - (2 * spacing), strokeColor, strokeThickness, cornerRadius - spacing);
	} else {
		strokeRoundedRectangle(context, topLeftX - spacing, topLeftY - spacing, boxWidth + (2 * spacing), boxHeight + (2 * spacing), strokeColor, strokeThickness, cornerRadius + spacing);
	}
}

function setRoundedRectPath(context, topLeftX, topLeftY, boxWidth, boxHeight, cornerRadius) {
	context.beginPath();
	context.moveTo(topLeftX + cornerRadius, topLeftY);
	context.lineTo(topLeftX + boxWidth - cornerRadius, topLeftY);
	context.arcTo(topLeftX + boxWidth, topLeftY, topLeftX + boxWidth, topLeftY + cornerRadius, cornerRadius);
	context.lineTo(topLeftX + boxWidth, topLeftY + boxHeight - cornerRadius);
	context.arcTo(topLeftX + boxWidth, topLeftY + boxHeight, topLeftX + boxWidth - cornerRadius, topLeftY + boxHeight, cornerRadius);
	context.lineTo(topLeftX + cornerRadius, topLeftY + boxHeight);
	context.arcTo(topLeftX, topLeftY + boxHeight, topLeftX, topLeftY + boxHeight - cornerRadius, cornerRadius);
	context.lineTo(topLeftX, topLeftY + cornerRadius);
	context.arcTo(topLeftX, topLeftY, topLeftX + cornerRadius, topLeftY, cornerRadius);
}

function drawBitmapCenteredWithRotation(context, useBitmap, atX, atY, withAng) {
    context.save();
    context.translate(atX, atY);
    context.rotate(withAng);
    context.drawImage(useBitmap, -useBitmap.width / 2, -useBitmap.height / 2);
    context.restore();
}