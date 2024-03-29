/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- OR, if a player rolls a 6 twice in a row, their GLOBAL score is set back to 0. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, gamePlaying;

initialization();

var previousRoll;

/*Setter
document.querySelector('#current-' + activePlayer).textContent = dice;
*/

/*Getter
var x = document.querySelector('#score-0').textContent;
console.log(x);
*/

/*******************************************************************
Call Back Function**************************************************

function btn() {
    //do something
}
btn();

document.querySelector('.btn-roll').addEventListener('click', btn);
*******************************************************************/

//Anonymous Function: alternate method to Call Back Function
document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        // 1. random numer
        var dice = Math.floor(Math.random() * 6) + 1;

        // 2. display result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';


        // 3. Update round score IF rolled number wasnt 1
        // 4. if two 6's rolled, Player's entire score lost, switch turns
        if(dice === 6 && previousRoll === 6){
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = '0';
            nextPlayer();
        }else if (dice !== 1) {
            //add score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }else {
            //next player
        nextPlayer();
        } 
        previousRoll = dice;  
    }
});

document.querySelector('.btn-hold').addEventListener ('click', function() {
    if(gamePlaying){    
        // 1. Add current score to global score
        scores[activePlayer] += roundScore;
    
        // 2. Update UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Added Player choice for winning score
        var userInput = document.querySelector('.winning-score').value;
        
        if(userInput) {
            var winningScore = userInput;
        } else {
            winningScore = 100;
        }
        // 3. Check if player won
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
            
        } else {
        // 4. Next Player
        nextPlayer();
        }
    }
});

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

 //    document.querySelector('.player-0-panel').classList.remove('active');
 //    document.querySelector('.player-1-panel').classList.add('active');

    document.querySelector('.dice').style.display = 'none';
 //    document.querySelector('.player-1-panel').classList.add('active');
}

document.querySelector('.btn-new').addEventListener('click', initialization);

function initialization() {
    gamePlaying = true;
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;

    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

}













