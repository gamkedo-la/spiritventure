//DialogButton
function DialogButton(frame, title, action, style) {
	this.type = ChildType.DialogButton;
	this.frame = frame;
	this.title = title;
	this.action = action;
	this.inFocus = false;
	let children = [];
	let childWithFocus = null;
	const CORNER_RADIUS = this.frame.height / 4;
	let state = ChildState.Normal;
	let font = ButtonFont.Large;
	let titleSize = sizeOfString(canvasContext, font, this.title);
	
	if(titleSize.height > this.frame.height) {
		font = ButtonFont.Medium;
		titleSize = sizeOfString(canvasContext, font, this.title);
		if(titleSize.height > this.frame.height) {
			font - ButtonFont.Small;
			titleSize = sizeOfString(canvasContext, font, this.title);
		} 
	}
	
	this.color = {
		normal:'white',
		hover:'gray',
		active:'purple'
	};
	
	this.titleColor = {
		normal:'black',
		hover:'black',
		active:'white'
	};

	let bkgdColor = this.color.normal;
	let textColor = this.titleColor.normal;
	
	let titlePos = positionToCenterStringInFrame(canvasContext, font, this.title, this.frame);

	this.setState = function(newState) {
		//some child objects will maintain State.Active as long as they have focus

		state = newState;
		
		switch(newState) {
			case ChildState.Normal:
				bkgdColor = this.color.normal;
				textColor = this.titleColor.normal;
			break;
			case ChildState.Hover:
				bkgdColor = this.color.hover;
				textColor = this.titleColor.hover;
			break;
			case ChildState.Active:
				bkgdColor = this.color.active;
				textColor = this.titleColor.active;
			break;
		}
	};
	
	this.getState = function() {
		return state;
	};
		
	this.update = function(deltaX, deltaY) {
		this.frame.x += deltaX;
		this.frame.y += deltaY;
		for(let i = 0; i < children.length; i++) {
			children[i].update(deltaX, deltaY);
		}
	};
	
	this.draw = function() {
		if(style === ButtonStyle.Normal) {
			fillRectangle(canvasContext, this.frame.x, this.frame.y, this.frame.width, this.frame.height, bkgdColor);
			strokeRectangle(canvasContext, this.frame.x, this.frame.y, this.frame.width, this.frame.height, textColor, 2);
		} else if(style === ButtonStyle.Rounded) {
			fillRoundedRectangle(canvasContext, this.frame.x, this.frame.y, this.frame.width, this.frame.height, bkgdColor, CORNER_RADIUS);
			strokeRoundedRectangle(canvasContext, this.frame.x, this.frame.y, this.frame.width, this.frame.height, textColor, 2, CORNER_RADIUS);
		}
		
		titlePos = positionToCenterStringInFrame(canvasContext, font, this.title, this.frame);
		colorText(canvasContext, this.title, titlePos.x, titlePos.y, textColor, font, 'left');
		
		let child;
		for(let i = 0; i < children.length; i++) {
			child = children[i];
			child.draw();
		}
	};
	
	this.setFocus = function(x, y, parentFocus) {
		if(childWithFocus != null) {
			childWithFocus.lostFocus();
			childWithFocus = null;
		}
		
		this.inFocus = true;
		if(children.length > 0) {
			for(let i = 0; i < children.length; i++) {
				child = children[i];
				if(mouseInside(child.frame)) {
					childWithFocus = child;
					child.setFocus(x, y);
				}
			}
		} else {
			if(mouseInside(this.frame)) {
				this.setState(ChildState.Active);
				this.action(parentFocus);
			}
		}
	};
	
	this.lostFocus = function() {
		if(childWithFocus != null) {
			childWithFocus.lostFocus();
			childWithFocus = null;
		}
		
		this.inFocus = false;
		this.setState(ChildState.Normal);
	};
	
	this.setColors = function(bkgd, line) {
		this.color.normal = bkgd;
		this.color.hover = line;
		
		this.titleColor.normal = line;
		this.titleColor.hover = bkgd;
		
		
		bkgdColor = this.color.normal;
		textColor = this.titleColor.normal;
	};
	
	this.updateHover = function(x, y) {
		if(mouseInside(this.frame)) {
			this.setState(ChildState.Hover);
		} else {
			this.setState(ChildState.Normal);
		}
		
		for(let i = 0; i < children.length; i++) {
			children[i].updateHover(x, y);
		}
	};
	
	this.keyboardEvent = function(newKey, oldKeys) {
		if(childWithFocus != null) {
			childWithFocus.keyboardEvent(newKey, oldKeys);
		}
	};
	
	this.textBoxGrew = function(deltaY) {
		this.frame.y += deltaY;
		for(let i = 0; i < children.length; i++) {
			children[i].textBoxGrew(deltaY);
		}
	};
}