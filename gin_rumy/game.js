/*
 * GIN RUMY - GAME
 */

var P1_TURN = 0;
var CPU_TURN = 1;
var turn;
var drawComplete = false;

function ginRumy() {
	shuffle();
	rumyDeal();
	turn = randomTurn();
	nextMove();
}

function nextMove() {
	updateScreen();
	if(turn == P1_TURN) {
		console.log("Player 1's turn");
		p1Turn(); 
	} else if (turn == CPU_TURN) {
		console.log("CPU's turn");
		cpuTurn();
	}
}

function p1Turn() {
	drawComplete = false;
	//wait for user input handled by ui.js
}

function randomTurn() {
	var turn = Math.floor(Math.random() * 2);
	return turn;
}

