//Dialog Transition Origin
function DialogTransitionOrigin(position, owner) {
	this.type = ChildType.DialogTransitionOrigin;
	this.frame = new DialogFrame(position.x - 8, position.y - 8, 16, 16);
	this.position = position;
	this.owner = owner;
	owner.dialogOrigin = this;
	this.mate = null;
	this.destinationOwner = null;
	this.destinationName = null;
	this.THICKNESS = 2;
	this.isOnRight = true;
	this.shouldBeRemoved = false;
	
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
	
	this.snapToPosition = function() {
		this.frame.y = owner.frame.getMidY() - this.frame.height / 2;
		
		if(this.frame.x < owner.frame.getMidX()) {//should be on the left
			if(this.isOnRight) {//on the right, so we need to move
				owner.frame.x += 16;
			}
			this.isOnRight = false;
			this.frame.x = owner.frame.x - this.frame.width - 2;
		} else {//should be on the right
			if(!this.isOnRight) {
				owner.frame.x -= 16;
			}
			this.isOnRight = true;
			this.frame.x = owner.frame.x + owner.frame.width + 2;
		}
	};
	
	this.addDestination = function(mate, destinationOwner) {
		this.mate = mate;
		this.destinationOwner = destinationOwner;
		this.destinationName = destinationOwner.sceneName.getText()[0];
		
		const dFrame = this.destinationOwner.frame;
		const oFrame = this.owner.frame;
				
		//Set this origin to the right or left side depending on where the destination card is
		if(dFrame.x > oFrame.x + oFrame.width / 2) {
			this.frame.x = oFrame.x + oFrame.width;
			this.snapToPosition();
		} else {
			this.frame.x = oFrame.x;
			this.snapToPosition();
		}
		
		//Set this origin's destination position based on shortest distance		
		//Set the X-Pos at left, middle or right depending on whether this origin is on the left or right
		let destinationXOffset = 0;
		if(this.isOnRight) {
			if(dFrame.x > oFrame.x + oFrame.width) {
				this.mate.frame.x = dFrame.x;
			} else if(dFrame.x < oFrame.x + oFrame.width / 2) {
				this.mate.frame.x = dFrame.x + dFrame.width;
			} else {
				this.mate.frame.x = dFrame.x + dFrame.width / 2;
			}
		} else {
			if(dFrame.x > oFrame.x - oFrame.width/4) {
				this.mate.frame.x = dFrame.x;
			} else if(dFrame.x < oFrame.x - dFrame.width) {
				this.mate.frame.x = dFrame.x + dFrame.width;
			} else {
				this.mate.frame.x = dFrame.x + dFrame.width / 2;
			}
		}
		
		if(dFrame.y < oFrame.y - dFrame.height / 2) {
			this.mate.frame.y = dFrame.y + dFrame.height;
		} else if(dFrame.y > oFrame.y) {
			this.mate.frame.y = dFrame.y;
		} else {
			this.mate.frame.y = dFrame.y + dFrame.height / 2;
		}
	};
	
	this.remove = function() {
		this.shouldBeRemoved = true;
		if(this.mate != null) {
			this.mate.shouldBeRemoved = true;
			this.mate = null;
		}
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
	
	this.draw = function() {
		if(this.shouldBeRemoved) {return;}
		
		if(!mouseButtonHeld) {
			this.snapToPosition();
		}
		
		fillRectangle(canvasContext, this.frame.x, this.frame.y, this.frame.width, this.frame.height, SoulColor.Fill);
		strokeRectangle(canvasContext, this.frame.x, this.frame.y, this.frame.width, this.frame.height, SoulColor.Line, this.THICKNESS);
		if(this.mate != null) {
			strokeLine(canvasContext, this.frame.getMidX(), this.frame.getMidY(), this.mate.frame.getMidX(), this.mate.frame.getMidY(), SoulColor.Fill, this.THICKNESS);
		}
	};
	
	this.updateHover = function(x, y) {
		if(mouseInside(this.frame)) {
			this.setState(ChildState.Hover);
		} else {
			this.setState(ChildState.Normal);
		}
	};
	
	this.textBoxGrew = function(deltaY) {
		this.frame.y += deltaY;
	};
	
	this.keyboardEvent = function(newKey, oldKeys) {
		if(this.inFocus) {
			if(newKey === KEY_BACKSPACE || KEY_DELETE) {
				this.remove();
			}
		}
	};
}

//Dialog Transition Destination
function DialogTransitionDestination(position, owner, origin) {
	this.type = ChildType.DialogTransitionDestination;
	this.position = position;
	this.frame = new DialogFrame(position.x - 8, position.y - 8, 16, 16);
	this.shouldBeRemoved = false;
	this.owner = owner;

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
	
	origin.addDestination(this, this.owner);
	
	this.remove = function() {
		this.shouldBeRemoved = true;
		origin.shouldBeRemoved = true;
		origin = null;
	};
	
	this.draw = function() {
		if(this.shouldBeRemoved) {return;}
		
		if(!mouseButtonHeld) {
			this.snapToPosition();
		}
		
		canvasContext.save();
		
		canvasContext.strokeStyle = SoulColor.Line;
		canvasContext.fillStyle = SoulColor.Fill;
		canvasContext.lineWidth = origin.THICKNESS;
		
		canvasContext.translate(this.frame.getMidX(),this.frame.getMidY());
		canvasContext.rotate(Math.atan2(this.frame.getMidY() - origin.frame.getMidY(), this.frame.getMidX() - origin.frame.getMidX()));
		
		canvasContext.beginPath();
		canvasContext.moveTo(-this.frame.width/2, -this.frame.height/2);
		canvasContext.lineTo(this.frame.width/2, 0);
		canvasContext.lineTo(-this.frame.width/2, this.frame.height/2);
		canvasContext.closePath();
		canvasContext.fill();
		canvasContext.stroke();
		
		canvasContext.restore();
		
		canvasContext.save();
		
		strokeLine(canvasContext, origin.frame.getMidX(), origin.frame.getMidY(), this.frame.getMidX(), this.frame.getMidY(), SoulColor.Fill, origin.THICKNESS);
		
		canvasContext.restore();
		
	};
	
	this.snapToPosition = function() {
		let result = {x:0, y:0};
		const frame = this.owner.frame;
		
		const deltaX1 = Math.abs(this.frame.x - frame.x);
		const deltaX2 = Math.abs(this.frame.x - (frame.x + (frame.width / 2)));
		const deltaX3 = Math.abs(this.frame.x - (frame.x + frame.width));

		const minX = Math.min(deltaX1, deltaX2, deltaX3);

		const deltaY1 = Math.abs(this.frame.y - frame.y);
		const deltaY2 = Math.abs(this.frame.y - (frame.y + (frame.height/2)));
		const deltaY3 = Math.abs(this.frame.y - (frame.y + frame.height));
		
		const minY = Math.min(deltaY1, deltaY2, deltaY3);
		
		if((minX === deltaX2) && (minY === deltaY2)) {
			result.x = frame.x + frame.width/2;
			result.y = frame.y;
		} else {
			if(minX === deltaX1) {
				result.x = frame.x;
			} else if(minX === deltaX2) {
				result.x = frame.x + frame.width/2 - this.frame.width/2;
			} else {
				result.x = frame.x + frame.width - this.frame.width;
			}
			
			if(minY === deltaY1) {
				result.y = frame.y;
			} else if(minY === deltaY2) {
				result.y = frame.y + frame.height/2 - this.frame.height/2;
			} else {
				result.y = frame.y + frame.height - this.frame.height;
			}
		}
		
		this.frame.x = result.x;
		this.frame.y = result.y;
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
		if(this.inFocus) {
			if(newKey === KEY_BACKSPACE || KEY_DELETE) {
				this.remove();
			}
		}
	};
	
	this.textBoxGrew = function(deltaY) {
//		this.frame.y += deltaY;
		//do nothing?
	};
}