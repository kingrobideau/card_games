/*
 * GIN RUMY - AI
 */

 function cpuTurn() {	
 	cpuDraw();
 	cpuPlay();
 	cpuDiscard();
 	updateScreen(); //TO DO: CONSOLIDATE UPDATE SCREEN
 	turn = P1_TURN;
 	nextMove();
 }

 function cpuDraw() {
 	var stock = hands['stock'];
 	moveCard(stock[stock.length - 1], 'stock', 'cpu');
 }

 function cpuPlay() {
 	//console.log('CPU looking for a play');
 	//TO DO: CPU should be able to make multiple moves per turn
 	//Should store all possible moves, then determine best move so that
 	//CPU can evaluate whether playing a set or run using overlapping
 	//cards is the better play
 	hand = sort(hands['cpu'], 'values', 'desc');
 	//really only needs to look through unique values and compare those to
 	//ever card to compile sets
 	for(c in hand) { 
 		var set = searchForSet(hand, hand[c].value);
 		if(set) {
 			 moveCards(set, 'cpu', 'cpuPlayed');
 			 return;
 		}
 	}
 	return;
 }

 function searchForSet(cards, value) {
 	var set = [];
 	for(c in cards) {
 		if(cards[c].value==value) set.push(cards[c]);
 	} 
 	if (set.length >= 2) return set; //CHANGE TO 2
 	else return null;
 }

 function cpuDiscard() {
 	//simple discard - random
 	//TO DO: Look back @ old Java version of Gin Rumy that assigns priorities to cards
 	console.log('CPU discarding');
 	var randomIndex = Math.floor(Math.random() * hands.cpu.length); //TO DO: Make sure this is working as expected
 	var card = hands.cpu[randomIndex];
 	moveCard(card, 'cpu', 'community');
 }