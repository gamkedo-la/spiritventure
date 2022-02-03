//Input
const KEY_BACKSPACE = 8;
const KEY_TAB = 9;

const KEY_ENTER = 13;

const KEY_SHIFT = 16;
const KEY_CTRL = 17;
const KEY_ALT = 18;

const KEY_CAPS_LOCK = 20;

const KEY_ESCAPE = 27;

const KEY_SPACE = 32;
const KEY_PGUP = 33;
const KEY_PGDOWN = 34;

const KEY_LEFT = 37;
const KEY_UP = 38;
const KEY_RIGHT = 39;
const KEY_DOWN = 40;

const DIGIT_0 = 48;
const DIGIT_1 = 49;
const DIGIT_2 = 50;
const DIGIT_3 = 51;
const DIGIT_4 = 52;
const DIGIT_5 = 53;
const DIGIT_6 = 54;
const DIGIT_7 = 55;
const DIGIT_8 = 56;
const DIGIT_9 = 57;

const KEY_A = 65;
const KEY_B = 66;
const KEY_C = 67;
const KEY_D = 68;
const KEY_E = 69;
const KEY_F = 70;
const KEY_G = 71;
const KEY_H = 72;
const KEY_I = 73;
const KEY_J = 74;
const KEY_K = 75;
const KEY_L = 76;
const KEY_M = 77;
const KEY_N = 78;
const KEY_O = 79;
const KEY_P = 80;
const KEY_Q = 81;  
const KEY_R = 82;
const KEY_S = 83;
const KEY_T = 84;
const KEY_U = 85;
const KEY_V = 86;
const KEY_W = 87;
const KEY_X = 88;
const KEY_Y = 89;
const KEY_Z = 90;
const KEY_CMD = 91;

const KEY_NUMPAD_ADD = 107;

const KEY_NUMPAD_SUBTRACT = 109;

const KEY_SEMI_COLON = 186;
const KEY_EQUAL = 187;
const KEY_COMMA = 188;
const KEY_MINUS = 189;
const KEY_PERIOD = 190;
const KEY_BACK_SLASH = 191;
const KEY_TILDE = 192;

const KEY_OPEN_BRACKET = 219;
const KEY_FWD_SLASH = 220;
const KEY_CLOSE_BRACKET = 221;
const KEY_APOSTROPHE = 222;

const HELD_KEYS = new Set();

let mouseY = 0;
let mouseX = 0;
let mouseButtonHeld = false;
const MOUSE_SELECT_BUTTON = 0;

function initializeInput() {
	document.addEventListener("keydown",keyPress);
	document.addEventListener("keyup",keyRelease);
	canvas.addEventListener('mousemove', calculateMousePos);
	canvas.addEventListener('mousedown', onMouseDown);
	canvas.addEventListener('mouseup', onMouseUp);
	canvas.addEventListener('mouseenter', onMouseDown);
	canvas.addEventListener ("mouseout", onMouseUp);
}

function keyPress(evt) {
	evt.preventDefault();
	
	dialogEditor.keyboardEvent(evt.keyCode, HELD_KEYS);
	
	HELD_KEYS.add(evt.keyCode);
}

function keyRelease(evt) {
	evt.preventDefault();
	
	HELD_KEYS.delete(evt.keyCode);
}

function calculateMousePos(evt) {
    const rect = canvas.getBoundingClientRect();
    const root = document.documentElement;
    const oldX = mouseX;
    const oldY = mouseY;
    mouseX = evt.clientX - rect.left;
    mouseY = evt.clientY - rect.top;
    if(mouseButtonHeld) {
	    dialogEditor.updateDrag(mouseX - oldX, mouseY - oldY);
    } else {
		dialogEditor.updateHover(mouseX, mouseY);
    }
}

function onMouseDown(evt) {
	window.focus();
	evt.preventDefault();
	if (evt.type == "mouseenter" && !mouseButtonHeld) {
		return;
	}
	
	mouseButtonHeld = true;
	
	dialogEditor.setFocus(mouseX, mouseY);
}

function onMouseUp(evt) {
	mouseButtonHeld = false;
}

function mouseInside(frame) {
	return ((mouseX > frame.x) && (mouseX < frame.x + frame.width) && (mouseY > frame.y)	&& (mouseY < frame.y + frame.height));
}

function isPrintableKey(keyCode) {
	if(isLetterKey(keyCode)) {
		return true;
	} else if(isNumberKey(keyCode)) {
		return true;
	} else if(isPunctuation(keyCode)) {
		return true;
	} else if(isWhiteSpace(keyCode)) {
		return true;
	} else {
		return false;
	}
}

function isLetterKey(keyCode) {
	switch(keyCode) {
		case KEY_A:
		case KEY_B:
		case KEY_C:
		case KEY_D:
		case KEY_E:
		case KEY_F:
		case KEY_G:
		case KEY_H:
		case KEY_I:
		case KEY_J:
		case KEY_K:
		case KEY_L:
		case KEY_M:
		case KEY_N:
		case KEY_O:
		case KEY_P:
		case KEY_Q:
		case KEY_R:
		case KEY_S:
		case KEY_T:
		case KEY_U:
		case KEY_V:
		case KEY_W:
		case KEY_X:
		case KEY_Y:
		case KEY_Z:
			return true;
	}
	
	return false;
}

function isLetter(character) {
	switch(character) {
		case "a":
		case "b":
		case "c":
		case "d":
		case "e":
		case "f":
		case "g":
		case "h":
		case "i":
		case "j":
		case "k":
		case "l":
		case "m":
		case "n":
		case "o":
		case "p":
		case "q":
		case "r":
		case "s":
		case "t":
		case "u":
		case "v":
		case "w":
		case "x":
		case "y":
		case "z":
		case "A":
		case "B":
		case "C":
		case "D":
		case "E":
		case "F":
		case "G":
		case "H":
		case "I":
		case "J":
		case "K":
		case "L":
		case "M":
		case "N":
		case "O":
		case "P":
		case "Q":
		case "R":
		case "S":
		case "T":
		case "U":
		case "V":
		case "W":
		case "X":
		case "Y":
		case "Z":
			return true;
	}
	
	return false;
}

function isNumberString(character) {
	switch(character) {
		case "0":
		case "1":
		case "2":
		case "3":
		case "4":
		case "5":
		case "6":
		case "7":
		case "8":
		case "9":
			return true;
	}
	
	return false;
}

function isNumberKey(keyCode) {
	switch(keyCode) {
		case DIGIT_0:
		case DIGIT_1:
		case DIGIT_2:
		case DIGIT_3:
		case DIGIT_4:
		case DIGIT_5:
		case DIGIT_6:
		case DIGIT_7:
		case DIGIT_8:
		case DIGIT_9:
			return true;
	}
	
	return false;
}

function isPunctuation(keyCode) {
	switch(keyCode) {
		case KEY_OPEN_BRACKET:
		case KEY_CLOSE_BRACKET:
		case KEY_FWD_SLASH:
		case KEY_MINUS:
		case KEY_EQUAL:
		case KEY_TILDE:
		case KEY_SEMI_COLON:
		case KEY_APOSTROPHE:
		case KEY_COMMA:
		case KEY_PERIOD:
		case KEY_BACK_SLASH:
			return true;
	}
	
	return false;
}

function isWhiteSpace(keyCode) {
	switch(keyCode) {
//		case KEY_TAB:
		case KEY_ENTER:
		case KEY_SPACE:
			return true;
	}
	
	return false;
}

function isSpecialKey(keyCode) {
	switch(keyCode) {
		case KEY_CAPS_LOCK:
		case KEY_BACKSPACE:
		case KEY_SHIFT:
		case KEY_CTRL:
		case KEY_ALT:
		case KEY_TAB:
		case KEY_ESCAPE:
			return true;
	}
	
	return false;
}

function upperStringForKeyCode(keyCode) {
	switch(keyCode) {
		case KEY_A:
			return "A";
		case KEY_B:
			return "B";
		case KEY_C:
			return "C";
		case KEY_D:
			return "D";
		case KEY_E:
			return "E";
		case KEY_F:
			return "F";
		case KEY_G:
			return "G";
		case KEY_H:
			return "H";
		case KEY_I:
			return "I";
		case KEY_J:
			return "J";
		case KEY_K:
			return "K";
		case KEY_L:
			return "L";
		case KEY_M:
			return "M";
		case KEY_N:
			return "N";
		case KEY_O:
			return "O";
		case KEY_P:
			return "P";
		case KEY_Q:
			return "Q";
		case KEY_R:
			return "R";
		case KEY_S:
			return "S";
		case KEY_T:
			return "T";
		case KEY_U:
			return "U";
		case KEY_V:
			return "V";
		case KEY_W:
			return "W";
		case KEY_X:
			return "X";
		case KEY_Y:
			return "Y";
		case KEY_Z:
			return "Z";
		case DIGIT_1:
			return "!";
		case DIGIT_2:
			return "@";
		case DIGIT_3:
			return "#";
		case DIGIT_4:
			return "$";
		case DIGIT_5:
			return "%";
		case DIGIT_6:
			return "^";
		case DIGIT_7:
			return "&";
		case DIGIT_8:
			return "*";
		case DIGIT_9:
			return "(";
		case DIGIT_0:
			return ")";
		case KEY_OPEN_BRACKET:
			return "{";
		case KEY_CLOSE_BRACKET:
			return "}";
		case KEY_FWD_SLASH:
			return "|";
		case KEY_MINUS:
			return "_";
		case KEY_EQUAL:
			return "+";
		case KEY_TILDE:
			return "~";
		case KEY_SEMI_COLON:
			return ":";
		case KEY_APOSTROPHE:
			return '"';
		case KEY_COMMA:
			return "<";
		case KEY_PERIOD:
			return ">";
		case KEY_BACK_SLASH:
			return "?";
//		case KEY_TAB:
//			return "     ";
		case KEY_ENTER:
			return "\n";
		case KEY_SPACE:
			return " ";
	}
}

function lowerStringForKeyCode(keyCode) {
	switch(keyCode) {
		case KEY_A:
			return "a";
		case KEY_B:
			return "b";
		case KEY_C:
			return "c";
		case KEY_D:
			return "d";
		case KEY_E:
			return "e";
		case KEY_F:
			return "f";
		case KEY_G:
			return "g";
		case KEY_H:
			return "h";
		case KEY_I:
			return "i";
		case KEY_J:
			return "j";
		case KEY_K:
			return "k";
		case KEY_L:
			return "l";
		case KEY_M:
			return "m";
		case KEY_N:
			return "n";
		case KEY_O:
			return "o";
		case KEY_P:
			return "p";
		case KEY_Q:
			return "q";
		case KEY_R:
			return "r";
		case KEY_S:
			return "s";
		case KEY_T:
			return "t";
		case KEY_U:
			return "u";
		case KEY_V:
			return "v";
		case KEY_W:
			return "w";
		case KEY_X:
			return "x";
		case KEY_Y:
			return "y";
		case KEY_Z:
			return "z";
		case DIGIT_1:
			return "1";
		case DIGIT_2:
			return "2";
		case DIGIT_3:
			return "3";
		case DIGIT_4:
			return "4";
		case DIGIT_5:
			return "5";
		case DIGIT_6:
			return "6";
		case DIGIT_7:
			return "7";
		case DIGIT_8:
			return "8";
		case DIGIT_9:
			return "9";
		case DIGIT_0:
			return "0";
		case KEY_OPEN_BRACKET:
			return "[";
		case KEY_CLOSE_BRACKET:
			return "]";
		case KEY_FWD_SLASH:
			return "\\";
		case KEY_MINUS:
			return "-";
		case KEY_EQUAL:
			return "=";
		case KEY_TILDE:
			return "`";
		case KEY_SEMI_COLON:
			return ";";
		case KEY_APOSTROPHE:
			return "'";
		case KEY_COMMA:
			return ",";
		case KEY_PERIOD:
			return ".";
		case KEY_BACK_SLASH:
			return "/";
//		case KEY_TAB:
//			return "     ";
		case KEY_ENTER:
			return "\n";
		case KEY_SPACE:
			return " ";
	}
}

const input = document.querySelector("#input");

input.addEventListener("change", () => {
  const file = input.files.item(0);
  fileToText(file, (text) => {
	  editableDialogString = text;
//	  console.log(text);
  });
});

function fileToText(file, callback) {
  const reader = new FileReader();
  reader.readAsText(file);
  reader.onload = () => {
    callback(reader.result);
  };
}