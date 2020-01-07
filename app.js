/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;

init();

// Clicking the roll dice button
document.querySelector('.btn-roll').addEventListener('click', function() {

    if(gamePlaying) {
        // Getting a random number
    var dice = Math.floor(Math.random() * 6) + 1;

    // Displaying the result on the dice
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png'

    // Adding the number to the round score
    if(dice !== 1){
        // Add the score
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else{
        
        nextPlayer();
    }

    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {

    if(gamePlaying){
        // Updating the individual score
    scores[activePlayer] += roundScore;

    // Updating the score in the UI
    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

    // Win condition
    if(scores[activePlayer] >= 10){
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        gamePlaying = false;
    } else{
        nextPlayer();
    }
    }
    
});

document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer() {

    // Changing the activePlayer and the roundScore variables
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    
    // Displaying the round scores as 0
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    // Changing the activePlayer in the UI
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';

    
}

function init() {
    gamePlaying = true;
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;

    // Getting Name Inputs
    var name0 = prompt("Enter name of Player1");
    var name1 = prompt("Enter name of Player2");

    //Setting Name Values
    document.getElementById('name-0').textContent = name0;
    document.getElementById('name-1').textContent = name1;

    // Hiding the dice initially
    document.querySelector('.dice').style.display = 'none';

    // Setting all the scores to zero intially
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // Initializing the classes in both the Panels
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.add('active');



}