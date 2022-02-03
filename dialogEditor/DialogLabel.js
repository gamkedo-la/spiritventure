//Dialog Label
function DialogLabel(position, font, title) {
	this.type = ChildType.DialogLabel;
	this.frame = new DialogFrame(position.x, position.y, 100, 100);//width & height are placeholders
	this.title = title;
	this.inFocus = false;
	let state = ChildState.Normal;
	let titleSize = sizeOfString(canvasContext, font, this.title);
	const PADDING = 2;
	this.frame.width = titleSize.width + PADDING;
	this.frame.height = titleSize.height + (PADDING / 2);
	
	this.color = 'white';	

	this.setState = function(newState) {
		state = newState;
	};
	
	this.getState = function() {
		return state;
	};
		
	this.update = function(deltaX, deltaY) {
		this.frame.x += deltaX;
		this.frame.y += deltaY;
	};
	
	this.draw = function() {
		//add titleSize.height to the 'y' draw position because text is drawn at lower left corner vice upper left
		colorText(canvasContext, this.title, this.frame.x + PADDING, this.frame.y + titleSize.height - PADDING, this.color, font, 'left');
	};
	
	this.drawAt = function(x, y) {
		colorText(canvasContext, this.title, x + PADDING, y - PADDING, this.color, font, 'left');
	};
	
	this.setFocus = function(x, y) {
		this.inFocus = true;
	};
	
	this.lostFocus = function() {
		this.inFocus = false;
	};
	
	this.setColors = function(bkgd, line) {
		this.color = line;
	};
	
	this.updateHover = function(x, y) {
		if(mouseInside(this.frame)) {
			this.setState(ChildState.Hover);
		} else {
			this.setState(ChildState.Normal);
		}
	};
	
	this.keyboardEvent = function(newKey, oldKeys) {
		return;//Labels do nothing with keyboard events
	};

	this.textBoxGrew = function(deltaY) {
		this.frame.y += deltaY;
	};
}