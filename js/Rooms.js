//Room format -> [rows, cols, grid, up room index, down room index, left room index, right room index]
const COLS = 0;
const ROWS = 1;
const GRID = 2;

var startingRoom = [16,12,[3,3,3,3,3,3,3,3,5,3,3,3,3,3,3,3,3,8,8,8,8,8,8,8,8,8,8,8,8,8,8,3,3,8,8,8,8,8,8,8,8,8,8,8,8,9,8,3,3,8,9,8,0,0,0,0,0,0,0,0,0,8,8,3,3,8,0,0,0,0,0,0,0,0,0,0,8,8,8,3,3,8,4,8,4,0,4,0,6,0,0,8,8,0,8,3,5,8,0,8,0,0,0,0,0,0,0,8,0,0,8,5,3,8,0,8,0,0,0,0,0,0,0,0,8,0,8,3,3,8,9,8,0,0,0,0,0,0,0,0,0,9,8,3,3,0,8,8,8,8,8,8,8,8,8,8,8,8,8,3,3,8,8,8,8,8,8,8,8,8,8,8,8,8,8,3,3,3,3,3,3,3,3,3,5,3,3,3,3,3,3,3],1,0,0,2];
var topRoom = [16,12,[1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,0,0,0,0,0,1,0,3,0,0,0,0,0,0,1,1,0,0,0,0,0,2,0,0,0,0,0,0,0,0,1,1,0,0,1,0,0,1,1,1,1,1,1,1,0,0,1,1,0,0,1,0,0,1,0,0,0,0,0,2,0,0,1,1,0,0,2,0,0,5,0,0,0,0,0,1,0,0,1,2,0,0,2,0,0,1,0,0,0,4,0,1,0,0,2,1,0,0,1,0,0,2,0,0,0,0,0,1,0,0,1,1,0,0,1,1,1,1,1,1,1,1,1,1,5,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1],1,0,1,1];
var rightRoom = [12,8,[1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,1,0,0,0,0,1,5,0,0,0,0,0,4,0,0,6,0,1,2,0,0,0,0,0,1,0,0,0,0,2,1,0,0,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,1,7,0,0,0,2,2,1,2,1,1,1,1,1,2,1,1,1,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,5,1,1,1,1,1,1,1],2,2,0,2];
var rooms = [startingRoom, topRoom, rightRoom];