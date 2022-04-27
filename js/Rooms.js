//Room format -> [rows, cols, grid, up room index, down room index, left room index, right room index]
const COLS = 0;
const ROWS = 1;
const GRID = 2;

// var startingRoom = [16,12,[3,3,3,3,3,3,3,3,5,3,3,3,3,3,3,3,3,8,8,8,8,8,8,8,8,8,8,8,8,8,8,3,3,8,8,8,8,8,8,8,8,8,8,8,8,9,8,3,3,8,9,8,0,0,0,0,0,0,0,0,0,8,8,3,3,8,0,0,0,0,0,0,0,0,0,0,8,8,8,3,3,8,4,8,4,0,4,0,6,0,0,8,8,0,8,3,5,8,0,8,0,0,0,0,0,0,0,8,0,0,0,5,3,8,0,8,0,0,0,0,0,0,0,0,0,0,8,3,3,8,9,8,0,0,0,0,0,0,0,0,0,9,8,3,3,0,8,8,8,8,8,8,8,8,8,8,8,8,8,3,3,8,8,8,8,8,8,8,8,8,8,8,8,8,8,3,3,3,3,3,3,3,3,3,5,3,3,3,3,3,3,3],1,0,0,2];
var startingRoom = [16,12,[7,7,7,7,7,7,7,7,15,7,7,7,7,7,7,7,7,1,1,1,1,1,1,1,1,1,1,1,1,1,1,7,7,1,1,1,1,1,1,1,1,1,1,1,1,1,1,7,7,1,1,1,1,1,1,1,1,1,1,1,1,1,1,7,7,1,1,1,1,1,1,1,1,1,1,1,1,1,1,7,7,1,1,1,1,1,1,1,18,1,1,1,1,1,1,7,15,1,1,1,1,1,1,1,1,1,1,1,1,1,1,15,7,1,1,1,1,1,1,1,1,1,1,1,1,1,1,7,7,1,1,1,1,1,1,1,1,1,1,1,1,1,1,7,7,1,1,1,1,1,1,1,1,1,1,1,1,1,1,7,7,1,1,1,1,1,1,1,1,1,1,1,1,1,1,7,7,7,7,7,7,7,7,7,15,7,7,7,7,7,7,7],1,3,4,2];

var topRoom = [16,12,[1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,0,0,0,0,0,1,0,3,0,0,0,0,0,0,1,1,0,0,0,0,0,2,0,0,0,0,0,0,0,0,1,1,0,0,1,0,0,1,1,1,1,1,1,1,0,0,1,1,0,0,1,0,0,1,0,0,0,0,0,2,0,0,1,1,0,0,2,0,0,5,0,0,0,0,0,1,0,0,1,2,0,0,2,0,0,1,0,0,0,4,0,1,0,0,2,1,0,0,1,0,0,2,0,0,0,0,0,1,0,0,1,1,0,0,1,1,1,1,1,1,1,1,1,1,5,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1],0,0,0,0];

var rightRoom = [18,11,[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,2,3,3,3,3,3,3,7,3,3,3,3,3,3,3,3,3,3,0,0,0,7,7,7,7,7,3,3,3,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11,9,0,0,0,7,7,7,7,7,0,0,0,0,0,0,0,0,9,9,2,3,3,3,3,3,3,7,3,3,3,3,3,3,3,3,3,3,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0],0,0,0,0];

var belowRoom = [16,12,[3,3,3,3,3,3,3,3,5,3,3,3,3,3,3,3,3,12,12,12,12,12,12,12,12,12,12,12,12,9,9,3,3,12,12,12,12,12,12,12,12,12,12,12,12,9,9,3,3,12,12,12,4,12,12,12,12,12,12,12,12,12,12,3,3,12,12,12,12,12,12,12,12,12,12,12,12,12,12,3,3,12,4,12,12,12,4,12,6,12,12,12,12,12,12,3,5,12,12,12,12,12,12,12,12,12,12,12,12,12,12,5,3,12,12,12,12,12,12,12,12,12,12,12,12,12,12,3,3,12,12,12,12,12,12,12,12,12,12,12,12,12,12,3,3,12,12,12,12,12,12,12,12,12,12,12,12,12,12,3,3,12,12,12,12,12,12,12,12,12,12,12,12,12,12,3,3,3,3,3,3,3,3,3,5,3,3,3,3,3,3,3],0,0,0,0];

var leftRoom = [16,12,[3,3,3,3,3,3,3,3,5,3,3,3,3,3,3,3,3,13,13,13,13,13,13,13,13,13,13,13,13,9,9,3,3,13,13,13,13,13,13,13,13,13,13,13,13,9,9,3,3,13,13,13,4,13,13,13,13,13,13,13,13,13,13,3,3,13,13,13,13,13,13,13,13,13,13,13,13,13,13,3,3,13,4,13,13,13,4,13,6,13,13,13,13,13,13,3,5,13,13,13,13,13,13,13,13,13,13,13,13,13,13,5,3,13,13,13,13,13,13,13,13,13,13,13,13,13,13,3,3,13,13,13,13,13,13,13,13,13,13,13,13,13,13,3,3,13,13,13,13,13,13,13,13,13,13,13,13,13,13,3,3,13,13,13,13,13,13,13,13,13,13,13,13,13,13,3,3,3,3,3,3,3,3,3,5,3,3,3,3,3,3,3],0,0,0,0];

const ROOM_STARTING = 0;
const ROOM_TOP = 1;
const ROOM_RIGHT = 2;
const ROOM_BELOW = 3;
const ROOM_LEFT = 4;

var rooms = [startingRoom, topRoom, rightRoom, belowRoom, leftRoom];
var roomsSongs = [Sound.ShrillNights, Sound.Happy, Sound.LurkingSadness, Sound.ShrillNights, Sound.Angry];
var roomSongVol =[1.0, 0.3, 1.0, 1.0, 0.075]