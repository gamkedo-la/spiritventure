//Globals
let canvas;
let canvasContext;
let dialogEditor;
const CLEAR_COLOR = '#350034';
const FRAMES_PER_SECOND = 30;
const CONVERSATION = Gemini1;
const ChildState = {
	Normal:'normal',
	Hover:'hover',
	Active:'active'
};
const ButtonFont = {
	XSmall:'12px Tahoma',
	Small:'16px Tahoma',
	Medium:'20px Tahoma',
	Large:'24px Tahoma',
	XLarge:'28px Tahoma'
};
const LabelFont = {
	XSmall:'12px Tahoma',
	Small:'16px Tahoma',
	Medium:'20px Tahoma',
	Large:'24px Tahoma',
	XLarge:'28px Tahoma'
};
const ButtonStyle = {
	Normal:'normal',
	Rounded:'rounded',
};
const ChildType = {
	DialogButton:"dialog button",
	DialogLine:"dialog line",
	DialogLabel:"dialog label",
	DialogDropDown:"dialog drop down",
	DialogTextBox:"dialog text box",
	DialogImage:"dialog image",
	DialogTransitionOrigin:"dialog transition origin",
	DialogTransitionDestination:"dialog transition destination"
};
const LineWidth = {
	Normal:4,
	Hover:6,
	Active: 10	
};
//List all characters who participate in dialog here
const Speaker = {
	Soul:'Soul',
	Despond:'Despond',
	Incense:'Incense',
	Tripath:'Tripath',
	Gemini:'Gemini',
	
};
//SoulColor is special, don't need to call out other colors separately
const SoulColor = {
	Fill:'lightBlue',
	Line:'darkBlue'
};
//Provide a background (fill) and outline (line) color for each character
function colorsForSpeaker(speaker) {
	let colors = {bkgd:'darkGray', line:'white'};
	switch(speaker) {
		case Speaker.Soul:
			colors.bkgd = SoulColor.Fill;
			colors.line = SoulColor.Line;
		break;
		case Speaker.Despond:
			colors.bkgd = 'pink';
			colors.line = 'red';
		break;
		case Speaker.Incense:
			colors.bkgd = 'pink';
			colors.line = 'red';
		break;
		case Speaker.Tripath:
			colors.bkgd = 'white';
			colors.line = '#b12f0c';
		break;
		case Speaker.Gemini:
			colors.bkgd = '#ee00aa';
			colors.line = '#223344';
		break;
		case Speaker.Soul:
			colors.bkgd = 'yellow';
			colors.line = 'darkBlue';
		break;
		
	}
	
	return colors;
};