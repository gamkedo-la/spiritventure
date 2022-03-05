function lerp(v0, v1, t) {
  return (1 - t) * v0 + t * v1;
}

function remap (value, from1, to1, from2, to2) {
  return (value - from1) / (to1 - from1) * (to2 - from2) + from2;
}

function keyToNumber(key) {
  if(key >= 48 && key <= 57) return key - 48;
  return -1;
}

var gameStartTimer = 0;
function getDelta() {
    let timeNow = (new Date()).getTime();
    let elapsed = timeNow - gameStartTimer;
    gameStartTimer = timeNow;
    return elapsed;
}

function save(data) {
  var a = document.body.appendChild(document.createElement("a"));
  a.download = "tilemap.txt";
  a.href = "data:text/plain;base64," + btoa(JSON.stringify(data));
  a.click();
}

function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}

function colorCircle(centerX, centerY, radius, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
  canvasContext.fill();
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

function drawBitmapCenteredAtLocationWithRotation(graphic, atX, atY,withAngle) {
  canvasContext.save(); // allows us to undo translate movement and rotate spin
  canvasContext.translate(atX,atY); // sets the point where our graphic will go
  canvasContext.rotate(withAngle); // sets the rotation
  canvasContext.drawImage(graphic,-graphic.width/2,-graphic.height/2); // center, draw
  canvasContext.restore(); // undo the translation movement and rotation since save()
}