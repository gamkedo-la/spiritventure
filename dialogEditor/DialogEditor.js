//DialogEditor
function DialogEditor() {
	const children = [];
	let childWithFocus = null;
	
	let newCardButton;
	let saveButton;
	let openDialogButton;
	let openTextButton;
	let conversationNameLabel;
	let conversationNameTextBox;
	const PADDING = 10;
	const newCardButtonSize = {width: 150, height: 30};
	const combinedButtonWidth = 4 * newCardButtonSize.width + 3 * PADDING;
	const newCardPadding = 50;
	let transitionInProgress = null;
	let clipboard = null;
	let baseChildCount = 0;
	
	this.initialize = function() {
		addNewCardButton();
		addSaveButton();
		addOpenDialogButton();
		addOpenTextButton();
		addConversationNameLabel();
		addConversationNameTextBox();
		
		baseChildCount = children.length;
	};
	
	this.update = function() {
		//recenter the UI
		const oldXPos = newCardButton.frame.x;
		
		newCardButton.frame.x = (canvas.width - combinedButtonWidth)/2;
		
		const deltaX = newCardButton.frame.x - oldXPos;
		
		saveButton.frame.x += deltaX;
		openDialogButton.frame.x += deltaX;
		openTextButton.frame.x += deltaX;

		const chooseFileButton = document.getElementById("input");
		chooseFileButton.style.left = openTextButton.frame.x + "px";
		chooseFileButton.style.top = (openTextButton.frame.y - 30) + "px";

		conversationNameLabel.frame.x += deltaX;
		conversationNameTextBox.frame.x += deltaX;
	};
	
	this.draw = function() {
		//Wipe the whole editor clean using CLEAR_COLOR
		fillRectangle(canvasContext, 0, 0, canvas.width, canvas.height, CLEAR_COLOR);
		
		let child;
		for(let i = 0; i < children.length; i++) {
			if(children[i] === newCardButton) {continue;}
			if(children[i] === saveButton) {continue;}
			if(children[i] === openDialogButton) {continue;}
			if(children[i] === openTextButton) {continue;}
			if(children[i] === conversationNameLabel) {continue;}
			if(children[i] === conversationNameTextBox) {continue;}

			child = children[i];
			
			if((childWithFocus != null) && (child === childWithFocus)) {
				continue;
			}
			
			if((child.frame.x > 0) && 
			   (child.frame.x + child.frame.width < canvas.width) &&
			   (child.frame.y > 0) &&
			   (child.frame.y + child.frame.height < canvas.height)) {
				   child.draw();
			} else if((child.frame.x + child.frame.width > 0) &&
			          (child.frame.x < canvas.width) &&
			          (child.frame.y + child.frame.height > 0) &&
			          (child.frame.y < canvas.height)) {
				         canvasContext.save();
						 canvasContext.globalAlpha = 0.4;
						 child.draw();
						 canvasContext.restore();
			} else {
				child.drawTransitions();
			}
		}
		
		if(childWithFocus != null) {
			if((childWithFocus.frame.x > 0) && 
				   (childWithFocus.frame.x + childWithFocus.frame.width < canvas.width) &&
				   (childWithFocus.frame.y > 0) &&
				   (childWithFocus.frame.y + childWithFocus.frame.height < canvas.height)) {
					   childWithFocus.draw();
			} else if((childWithFocus.frame.x + childWithFocus.frame.width > 0) &&
			          (childWithFocus.frame.x < canvas.width) &&
			          (childWithFocus.frame.y + childWithFocus.frame.height > 0) &&
			          (childWithFocus.frame.y < canvas.height)) {
				         canvasContext.save();
						 canvasContext.globalAlpha = 0.4;
						 childWithFocus.draw();
						 canvasContext.restore();
			} else {
				childWithFocus.drawTransitions();
			}
		}
				
		newCardButton.draw();
		saveButton.draw();
		openDialogButton.draw();
		openTextButton.draw();
		conversationNameLabel.draw();
		conversationNameTextBox.draw();
	};
	
	this.setFocus = function(x, y) {
		let foundNewFocus = false;
		
		for(let i = 0; i < children.length; i++) {
			child = children[i];
			if(mouseInside(child.frame)) {
				let oldChildWithFocus = null;
				if((childWithFocus != null) && (childWithFocus != child)) {
					oldChildWithFocus = childWithFocus;
					childWithFocus.lostFocus();
				}

				childWithFocus = child;
				child.setFocus(x, y, oldChildWithFocus);
				foundNewFocus = true;
				break;
			}
		}
		
		if(!foundNewFocus) {
			if(childWithFocus != null) {
				childWithFocus.lostFocus();
				childWithFocus = null;
			}
		}
	};
	
	this.updateDrag = function(deltaX, deltaY) {
		if(childWithFocus != null) {
			if(childWithFocus === newCardButton) {return;}
			if(childWithFocus === saveButton) {return;}
			if(childWithFocus === openDialogButton) {return;}
			if(childWithFocus === openTextButton) {return;}
			if(childWithFocus === conversationNameLabel) {return;}
			if(childWithFocus === conversationNameTextBox) {return;}
			childWithFocus.update(deltaX, deltaY);
		} else {
			for(let i = 0; i < children.length; i++) {
				if(children[i] === newCardButton) {continue;}
				if(children[i] === saveButton) {continue;}
				if(children[i] === openDialogButton) {continue;}
				if(children[i] === openTextButton) {continue;}
				if(children[i] === conversationNameLabel) {continue;}
				if(children[i] === conversationNameTextBox) {continue;}
				children[i].update(deltaX, deltaY);
			}
		}
	};
	
	this.updateHover = function(x, y) {
		for(let i = 0; i < children.length; i++) {
			children[i].updateHover(x, y);
		}
	};
	
	const addNewCardButton = function() {
		const newLineFrame = new DialogFrame((canvas.width - combinedButtonWidth)/2, 50, newCardButtonSize.width, newCardButtonSize.height);
	
		//Temp for testing
		const newLineAction = function(parentFocus = null) {
			let newLineX = newLineFrame.x;
			let newLineY = newLineFrame.y + 3 * newLineFrame.height;
			
			if((parentFocus != null) && (parentFocus.type === ChildType.DialogLine)) {
				newLineX = parentFocus.frame.x;
				newLineY = parentFocus.frame.y + parentFocus.frame.height + newCardPadding;
			} else {
				for(let i = children.length - 1; i >= 0; i--) {
					if(children[i].type != ChildType.DialogLine) {continue;}
					
					newLineX = children[i].frame.x;
					newLineY = children[i].frame.y + children[i].frame.height + newCardPadding;
					break;
				}
			}			
			
			const newDialogLine = new DialogLine({x:newLineX, y:newLineY});
			newDialogLine.initialize(children.length - baseChildCount); 
			children.push(newDialogLine);
		}
		
		newCardButton = new DialogButton(newLineFrame, 'New Card', newLineAction, ButtonStyle.Rounded);
		children.push(newCardButton);
	};
	
	const addSaveButton = function() {
		const saveButtonFrame = new DialogFrame(newCardButton.frame.x + newCardButton.frame.width + PADDING, newCardButton.frame.y, newCardButtonSize.width, newCardButtonSize.height);
		
		const saveAction = function() {
			let variableText;
			if(conversationNameTextBox.getText()[0] === "") {
				console.error("Need to name this conversation before saving!");
				return;
			} 
			
			variableText = variablizeText(conversationNameTextBox.getText()[0]);
			let saveString = "let " + variableText + " = [\n    ";
			
			for(let i = 0; i < children.length; i++) {
				if(children[i] === newCardButton) {continue;}
				if(children[i] === saveButton) {continue;}
				if(children[i] === openDialogButton) {continue;}
				if(children[i] === openTextButton) {continue;}
				if(children[i] === conversationNameLabel) {continue;}
				if(children[i] === conversationNameTextBox) {continue;}
				saveString += children[i].getSaveData();
			}
			
			saveString = (saveString.substring(0, saveString.length - 4) + "];");
			
			//this is the magic line, need to log this to the console (don't delete!)			
			console.log(saveString);
		}
		
		saveButton = new DialogButton(saveButtonFrame, "Save", saveAction, ButtonStyle.Rounded);
		children.push(saveButton);
	};
	
	const addOpenDialogButton = function() {
		const openDialogButtonFrame = new DialogFrame(saveButton.frame.x + saveButton.frame.width + PADDING, saveButton.frame.y, newCardButtonSize.width, newCardButtonSize.height);
		
		const openDialogAction = function(context) {
			const thisConvo = CONVERSATION;
			let transitions = {origins:[], destinations:[]};
			for(let i = 0; i < thisConvo.length; i++) {
				let newLineX = newCardButton.frame.x;
				let newLineY = openDialogButtonFrame.y + 3 * openDialogButtonFrame.height;
				
				if((childWithFocus != null) && (childWithFocus.type === ChildType.DialogLine)) {
					newLineX = childWithFocus.frame.x;
					newLineY = childWithFocus.frame.y + childWithFocus.frame.height + newCardPadding;
				} else {
					for(let i = children.length - 1; i >= 0; i--) {
						if(children[i].type != ChildType.DialogLine) {continue;}
						
						newLineX = children[i].frame.x;
						newLineY = children[i].frame.y + children[i].frame.height + newCardPadding;
						break;
					}
				}
				
				const newDialogLine = new DialogLine({x:newLineX, y:newLineY});
				
				const theseTransitions = newDialogLine.initializeWithData(thisConvo[i], children.length - baseChildCount);
				if(theseTransitions != null) {
					transitions.origins = transitions.origins.concat(theseTransitions.origins);
					transitions.destinations = transitions.destinations.concat(theseTransitions.destinations);
				}

				children.push(newDialogLine);
			}
			
			for(let i = 0; i < transitions.origins.length; i++) {
				transitionInProgress = transitions.origins[i];
				for(let j = 0; j < children.length; j++) {
					const thisCard = children[j];
					if(thisCard.type === ChildType.DialogLine) {
						
						if(((thisCard.sceneName != null) && (thisCard.sceneName.getText()[0] === transitions.destinations[i])) || 
						    (thisCard.index === transitions.destinations[i])) {
							const destPosition = findDestPosWithPos(thisCard.frame, {x:thisCard.frame.getMidX(), y:thisCard.frame.getMidY()});
							let newDestination = new DialogTransitionDestination(destPosition, thisCard, transitionInProgress);
							thisCard.addDestinationChild(newDestination);
							
							transitionInProgress = null;
							
							break;
						}
					}
				}
			}
			
			if(transitionInProgress != null) {
				transitionInProgress.remove();
				transitionInProgress = null;
			}
		}
		
		openDialogButton = new DialogButton(openDialogButtonFrame, "Open Dialog", openDialogAction, ButtonStyle.Rounded);
		children.push(openDialogButton);
	};
	
	const addOpenTextButton = function() {
		const openTextButtonFrame = new DialogFrame(openDialogButton.frame.x + openDialogButton.frame.width + PADDING, 
													openDialogButton.frame.y, 
													newCardButtonSize.width, 
													newCardButtonSize.height);
													
		const chooseFileButton = document.getElementById("input");
		chooseFileButton.style.left = openTextButtonFrame.x + "px";
		chooseFileButton.style.top = (openTextButtonFrame.y - 30) + "px";		
		
		const newLineFrame = new DialogFrame((canvas.width - combinedButtonWidth)/2, 50, newCardButtonSize.width, newCardButtonSize.height);
		
		const openTextButtonAction = function(parentFocus = null) {
			let newLineX = newLineFrame.x;
			let newLineY = newLineFrame.y + 3 * newLineFrame.height;
			
			const editableDialogArray = editableDialogString.split("\n");
			editableDialogArray.pop();//There is an EOF \n which we just remove
			
			for(let j = 0; j < editableDialogArray.length; j++) {
				const colonIndex = editableDialogArray[j].indexOf(":");
				const speakerString = editableDialogArray[j].substring(0, colonIndex);
				let statementString = editableDialogArray[j].substring(colonIndex + 1, editableDialogArray[j].length);
				if(statementString.substring(0, 1) === " ") {
					statementString = statementString.substring(1, statementString.length);
				}
				
				const workingData = {
					scene: "",
					who: speakerString,
					nameCol: null,
					voice: null,
					text: statementString,
					nextPage: null,
					leftPic: null,
					rightPic: null,
					
					leftPicLeave: null,
					rightPicLeave: null,
					
					choices: null
				};
				
				while(statementString.indexOf("{") >= 0) {
					const startIndex = statementString.indexOf("{") + 1;
					const endIndex = statementString.indexOf("}");
					
					if(endIndex < 0) {
						console.error("Uneven number of brackets in: " + statementString);
						break;
					}
					
					if(workingData.choices === null) {
						workingData.text = "";
						workingData.choices = [];
					}
					
					const thisChoiceString = statementString.substring(startIndex, endIndex);
					
					workingData.choices.push([thisChoiceString, null]);
					statementString = statementString.substring(endIndex + 1, statementString.length);
				}
			
				if((parentFocus != null) && (parentFocus.type === ChildType.DialogLine)) {
					newLineX = parentFocus.frame.x;
					newLineY = parentFocus.frame.y + parentFocus.frame.height + newCardPadding;
				} else {
					for(let i = children.length - 1; i >= 0; i--) {
						if(children[i].type != ChildType.DialogLine) {continue;}
						
						newLineX = children[i].frame.x;
						newLineY = children[i].frame.y + children[i].frame.height + newCardPadding;
						break;
					}
				}			
				
				const newDialogLine = new DialogLine({x:newLineX, y:newLineY});
				newDialogLine.initializeWithData(workingData, children.length - baseChildCount);
				children.push(newDialogLine);
			
				newLineY += newDialogLine.height + PADDING;
			}
		}
		
		openTextButton = new DialogButton(openTextButtonFrame, "Open Text", openTextButtonAction, ButtonStyle.Rounded);
		children.push(openTextButton);
	};
	
	const variablizeText = function(text) {
		let outputString = "";
		if(isLetter(text.charAt(0))) {
			outputString += text.charAt(0);
		} else {
			if(text.charAt(0) != "_") {
				outputString += "_";
			}
		}
		
		for(let i = 1; i < text.length; i++) {
			if((isLetter(text.charAt(i))) || (isNumberString(text.charAt(i)))) {
				outputString += text.charAt(i);
			} else {
				outputString += "_";
			}
		}
		
		return outputString;
	};
	
	const addConversationNameLabel = function() {
		const labelString = "Conversation Name:"
		const labelSize = sizeOfString(canvasContext, LabelFont.XLarge, labelString);
		conversationNameLabel = new DialogLabel({x:newCardButton.frame.x, 
											     y:newCardButton.frame.y + newCardButton.frame.height + PADDING/2}, 
											     LabelFont.XLarge, 
												 labelString);
		children.push(conversationNameLabel);
	};
	
	const addConversationNameTextBox = function() {
		conversationNameTextBox = new DialogTextBox(new DialogFrame(openDialogButton.frame.x - 0.45 * newCardButton.frame.width, //0.45 to align with other elements
										   				  conversationNameLabel.frame.y + 2, //+2 fudge to align it with label 
										   				  combinedButtonWidth * 0.60, //0.60 to align with other elements
										   				  conversationNameLabel.frame.height), LabelFont.XLarge);
		children.push(conversationNameTextBox);
	};
	
	this.keyboardEvent = function(newKey, oldKeys) {
		if(((oldKeys.has(KEY_CTRL)) || (oldKeys.has(KEY_CMD))) && (newKey === KEY_V)) {
			if(clipboard != null) {
				this.buildCardWithString(clipboard);
				return;
			}
		}
		
		if(childWithFocus != null) {
			if(newKey === KEY_ESCAPE) {
				childWithFocus.lostFocus();
				childWithFocus = null;
			} else {
				if(newKey === KEY_BACKSPACE) {
					if(childWithFocus.type === ChildType.DialogLine) {
						const didRemoveChild = childWithFocus.remove();
						if(!didRemoveChild) {
							const childRef = childWithFocus;
							childWithFocus.lostFocus();
							childWithFocus = null;
							children.splice(children.indexOf(childRef), 1);
							
							if((transitionInProgress != null) && (transitionInProgress.shouldBeRemoved)) {
								transitionInProgress = null;
							}
							
							return;
						}					
					}
				}
				
				childWithFocus.keyboardEvent(newKey, oldKeys);
			}		
		}
	};
	
	this.buildCardWithString = function(string) {
			let newLineX = 110;
			let newLineY = 110;
			
			for(let i = children.length - 1; i >= 0; i--) {
				if(children[i].type != ChildType.DialogLine) {continue;}
				
				newLineX = children[i].frame.x;
				newLineY = children[i].frame.y + children[i].frame.height + newCardPadding;
				break;
			}
			
			const newDialogLine = new DialogLine({x:newLineX, y:newLineY});
			newDialogLine.initializeWithString(string, children.length - baseChildCount);
			children.push(newDialogLine);
	};
	
	this.hasNoChildWithFocus = function(child, newKey, oldKeys) {
		if((oldKeys.has(KEY_CTRL)) || (oldKeys.has(KEY_CMD))) {
			if(newKey === KEY_C) {//Copy the dialog line
				clipboard = child.getSaveData();
				clipboard = "{\n        " + clipboard;
			}
		}
	};
	
	this.textBoxGrew = function(deltaY, child) {
		if(child != undefined) {
			child.textBoxGrew(deltaY);
		} else {
			if(childWithFocus != null) {
				if((childWithFocus.type === ChildType.DialogLine) || 
				   (childWithFocus.type === ChildType.DialogDropDown)) {
					childWithFocus.textBoxGrew(deltaY);
				}
			}
		}
	};
	
	this.removingTextBox = function(textBox) {
		if(textBox.dialogOrigin === transitionInProgress) {
			transitionInProgress = null;
		}
	};
	
	this.createTransition = function(child, position) {
		if((transitionInProgress != null) && (child.type === ChildType.DialogLine)) {
			const destPosition = findDestPosWithPos(child.frame, position);
			let newDestination = new DialogTransitionDestination(destPosition, child, transitionInProgress);
			
			childWithFocus.addDestinationChild(newDestination);
			
			transitionInProgress = null;
		} else if((transitionInProgress === null) && (child.type === ChildType.DialogTextBox)) {
			transitionInProgress = childWithFocus.addOriginChild(child, position);
		}
	};
	
	this.transitionWasRemoved = function(removedTransition) {
		if(removedTransition === transitionInProgress) {
			transitionInProgress = null;
		}
	};
}

//DialogFrame
function DialogFrame(x, y, width, height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.getMidX = function() {
		return (this.x + (width / 2));
	}
	this.getMidY = function() {
		return (this.y + (height / 2));
	}
}

//Dialog Transition Destination Calculation
function findDestPosWithPos(frame, position) {
	let result = {x:0, y:0};
	
	const deltaX1 = Math.abs(position.x - frame.x);
	const deltaX2 = Math.abs(position.x - (frame.x + (frame.width / 2)));
	const deltaX3 = Math.abs(position.x - (frame.x + frame.width));

	const minX = Math.min(deltaX1, deltaX2, deltaX3);

	const deltaY1 = Math.abs(position.y - frame.y);
	const deltaY2 = Math.abs(position.y - (frame.y + (frame.height/2)));
	const deltaY3 = Math.abs(position.y - (frame.y + frame.height));
	
	const minY = Math.min(deltaY1, deltaY2, deltaY3);
	
	if((minX === deltaX2) && (minY === deltaY2)) {// +/- 8 = half frame height or width adjustment
		result.x = frame.x + frame.width/2;
		result.y = frame.y + 8;
	} else {
		if(minX === deltaX1) {
			result.x = frame.x + 8;
		} else if(minX === deltaX2) {
			result.x = frame.x + frame.width/2;
		} else {
			result.x = frame.x + frame.width - 8;
		}
		
		if(minY === deltaY1) {
			result.y = frame.y + 8;
		} else if(minY === deltaY2) {
			result.y = frame.y + frame.height/2;
		} else {
			result.y = frame.y + frame.height - 8;
		}
	}
	
	return result;
};