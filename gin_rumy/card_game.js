/*
 * CARD COMPONENTS
 */

//deck
var top = 0;
var deck = [];
var suits = ['c', 'h', 's', 'd'];
for(s in suits) {
	for(v = 1; v <= 13; v++) {
		deck.push({
			'suit': suits[s], 
			'value': v, 
			'imgPath': 'img/' + suits[s] + v + '.png'
		});
	}
}
function logDeck() {
	console.log(deck);
}

//players and hands
var players = ['p1', 'cpu'];
var keys = ['p1', 'cpu', 'community', 'stock', 'p1Played', 'cpuPlayed'];
var hands = {'p1': [], 'cpu': [], 'community': [], 'stock': [], 'p1Played': [], 'cpuPlayed': []}; //must match .hand/.community div ids defined in content.html
var play = [];
function logHands() {
	for(h in hands) {
		console.log(hands[h]);
	}
}

/*
 * TRANSFORMATION
 */

function shuffle() {
	var shuffledDeck = [];
	for(card in deck) {
		var randomIndex = Math.floor(Math.random() * deck.length);
		var randomCard = deck[randomIndex];
		shuffledDeck.push(randomCard);
		deck.splice(randomIndex, 1);
	}
	deck = shuffledDeck;	
}

function sort (cards, sortBy, orderBy) {
	if(equals(sortBy, 'values')) {
		cards.sort(function(a, b) { 
			if(orderBy=='asc') return a.value - b.value;
			else if(orderBy=='desc') return (-1 * a.value) - (-1 * b.value);
		});
	}
	return cards;
}

function sortP1(sortBy) {
	hands.p1 = sort(hands.p1, sortBy, 'asc');
}

//TO DO: LOOK INTO HOW TO OVERRIDE A SINGLE METHOD TO TAKE A CARD OR AN ARRAY OF CARDS
function removeCard(card, owner) {
	var index = hands[owner].indexOf(card);
	hands[owner].splice(index, 1);
}

function removeCards(cards, owner) {
	for (c in cards) {
		removeCard(cards[c], owner);
	}
}

//TO DO: LOOK INTO HOW TO OVERRIDE A SINGLE METHOD TO TAKE A CARD OR AN ARRAY OF CARDS
function moveCard(card, prevOwner, newOwner) {
	removeCard(card, prevOwner)
	hands[newOwner].push(card);
	if(prevOwner=='p1') {
		play = [];
	}
}

function moveCards(cards, prevOwner, newOwner) {
	//console.log('Moving cards below from ' + prevOwner + ' to ' + newOwner);
	//console.log(cards);
	for(c in cards) {
		moveCard(cards[c], prevOwner, newOwner);
	}
}

function removeTop(cards) {
	cards.splice(0, 1);
}

function removeTopAndCopy(cards) {
	var copy = [];
	for(i = 1; i < cards.length; i++) {
		copy.push(cards[i]);
	}
	return copy;
}

/*
 * VALIDATION
 */


//Gin Rumy

function isSet(cards, minSize) {
	//console.log("Determining if hand is a set");
	if (cards.length < minSize) return false;
	else return isSetRecursive(cards);
}

function isSetRecursive(cards) {
	if(cards.length == 1) return true; 
	else {
		if(cards[1].value == cards[0].value)
			return isSetRecursive(removeTopAndCopy(cards));
		else return false;
	}
}

function isRun(cards, minSize) {
	//console.log('Determining if hand is a run');
	if (cards.length < minSize) return false;
	else {
		cards = sort(cards, 'values', 'asc');
		return isRunRecursive(cards);
	}
}

function isRunRecursive(cards) {
	if(cards.length == 1) return true;
	else {
		if((cards[1].value == cards[0].value + 1) &
				(cards[1].suit == cards[0].suit))
			return isRunRecursive(removeTopAndCopy(cards));
		else return false;
	}
}

function isRumyHand(cards) {
	if (isRun(cards, 2)) return true; //TO DO: CHANGE TO 3
	else if (isSet(cards, 2)) return true; //TO DO: CHANGE TO 3
	else return false; 
}

/*
 * DEALS
 */

//deal
function deal(owner) {
	var topCard = deck[0];
	hands[owner].push(topCard);
	deck.splice(0, 1);
}

//rumy deal
//deal seven cards to each player, one to the community, and the rest to the stock
function rumyDeal() {
	for(i = 0; i < 7; i++) { 
		for(p in players) {
			deal(players[p])
		}
	}
	deal('community');
	for(card in deck) {
		deal('stock');
	}
}


//Misc

function contains(cards, card) {
	var contains = cards.indexOf(card) != -1;
	return contains;
}

/*
 * HELPER FUNCTIONS
 */           

function equals(a, b) {
	var equal = (a.localeCompare(b) == 0) ? true : false;
	return equal;
} 



