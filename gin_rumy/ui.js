/*
 * GIN RUMY - UI
 */

function updateScreen() { //TO DO: CLEAN UP - can combine if else into a single d3 selection
							//and keys is probably unnecessary
	console.log('Updating screen...');
	for(k in keys) {
		d3.select('#' + keys[k]).selectAll('img')
			.remove()
		d3.select('#' + keys[k]).selectAll('img')
			.data(hands[keys[k]])
			.enter()
			.append('img')
				.attr('src', function(d) { return d.imgPath; })
				.style('position', function() {
					if(this.parentNode.id == 'stock') return 'absolute';
					else return 'relative';
				})
				.style('margin-left', 10)
				.on('click', cardClicked);
	}
}

//BUTTONS 

d3.select('#playHand')
	.on('click', playHand);

d3.select('#sortValues')
	.on('click', function() {
		sortP1('values');
		updateScreen();
	});

d3.select('#discard')
	.on('click', discard);

function cardClicked() {
	//assumes that .hand/.community div id tag defined in content.html == hand key defined in card_game.js
	var card = this.__data__;
	var owner = this.parentNode.id;
	if(turn == P1_TURN) {
		if(owner == 'p1' & drawComplete == true) { 
			(contains(play, card)) ? deselectCard(this) : selectCard(this);
		} else if(owner == 'community') {
			drawFromCommunity(card);
		} else if(owner == 'stock') {
			drawFromStock(card);
		}
	} else console.log("Sorry, it's not your turn.");
}

function drawFromCommunity(card) {
	if(drawComplete == false) {
		var community = hands.community;
		var index = community.indexOf(card);
		var cards = [];
		var communityLength = community.length;
		for(i = index; i < communityLength; i++) {
			card = community[index];
			moveCard(card, 'community', 'p1');
		} 
		drawComplete = true;
		updateScreen();
	} else console.log('Sorry, you already drew a card this turn.');
}

function drawFromStock(card) {
	if(drawComplete == false) {
		moveCard(card,'stock', 'p1');
		drawComplete = true;
		updateScreen(); //TO DO: CONSOLIDATE SCREEN UPDATES
	} else console.log('Sorry, you already drew a card this turn.');
}

function selectCard(cardImg) {
	d3.select(cardImg)
		.transition()
		.style('top', -40)
		.duration(500);
	var card = cardImg.__data__;
	play.push(card);
}

function deselectCard(cardImg) {
	d3.select(cardImg)		
		.transition()
		.style('top', 0)
		.duration(500);
	var card = cardImg.__data__;
	var i = play.indexOf(card);
	play.splice(i, 1);
}

function discard() { //TO DO: RENAME PLAY SELECTED BECAUSE PLAY DOESN'T MAKE SENSE FOR DISCARD
	if(drawComplete == true) {
		if(play.length == 1) {
			moveCards(play, 'p1', 'community');
			updateScreen(); //TO DO: CONSOLIDATE 
			turn = CPU_TURN; //TO DO: THIS SHOULD LIVE ELSEWHERE
			nextMove();
		} else console.log('Sorry, you can only discard one card.');
	} else {
		console.log('Sorry, you have to draw a card before you can discard.');
	}
}

function playHand() {
	if (isRumyHand(play)) {
		moveCards(play, 'p1', 'p1Played');
		console.log("Nice move!");
		updateScreen(); //TO DO: CONSOLIDATE SCREEN UPDATES
	} else console.log('Oh dear, that is not a valid hand.');
}

