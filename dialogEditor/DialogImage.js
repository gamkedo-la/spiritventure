//Dialog Image
function DialogImage(frame, image, speaker) {
	this.type = ChildType.DialogImage;
	this.frame = frame;
	this.image = image;
	this.inFocus = false;
	let state = ChildState.Normal;
	const BORDER_THICKNESS = {
		Normal:2,
		Hover:3,
		Active:4
	};
	let borderThickness = BORDER_THICKNESS.Normal;
	
	const COLORS = colorsForSpeaker(speaker);	

	this.setState = function(newState) {
		state = newState;
		
		switch(newState) {
			case ChildState.Normal:
				borderThickness = BORDER_THICKNESS.Normal;
			break;
			case ChildState.Hover:
				borderThickness = BORDER_THICKNESS.Hover;
			break;
			case ChildState.Active:
				borderThickness = BORDER_THICKNESS.Active;
			break;
		}
	};
	
	this.getState = function() {
		return state;
	};
		
	this.update = function(deltaX, deltaY) {
		this.frame.x += deltaX;
		this.frame.y += deltaY;
	};
	
	this.draw = function() {
		//Draw the image
		canvasContext.drawImage(this.image, this.frame.x, this.frame.y, this.frame.width, this.frame.height);

		strokeRectangle(canvasContext, this.frame.x, this.frame.y, this.frame.width, this.frame.height, COLORS.line, borderThickness);		
	};
	
	this.drawAt = function(x, y) {
		//Draw the image
		canvasContext.drawImage(this.image, x, y, this.frame.width, this.frame.height);

		strokeRectangle(canvasContext, x, y, this.frame.width, this.frame.height, COLORS.line, borderThickness);	
	};
	
	this.setFocus = function(x, y) {
		this.inFocus = true;
	};
	
	this.lostFocus = function() {
		this.inFocus = false;
	};
	
	this.setColors = function(bkgd, line) {
		//Do nothing
	};
	
	this.updateHover = function(x, y) {
		if(mouseInside(this.frame)) {
			this.setState(ChildState.Hover);
		} else {
			this.setState(ChildState.Normal);
		}
	};

	this.keyboardEvent = function(newKey, oldKeys) {
		return;//Images do nothing with keyboard events
	};
		
	this.textBoxGrew = function(deltaY) {
		this.frame.y += deltaY;
	};
}
