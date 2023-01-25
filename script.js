'use strict';

const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');
const score0EL = document.querySelector('#score--0'); 
//or (two ways to select IDs in JS)
const score1EL = document.getElementById('score--1');
const current0EL = document.getElementById('current--0');
const current1EL = document.getElementById('current--1');

const diceEL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

//starting conditions


const init = function() {

diceEL.classList.add('hidden');

   scores = [0, 0];

   currentScore = 0;
   activePlayer = 0;
   playing = true;

    score0EL.textContent = 0;
    score1EL.textContent = 0;

    current0EL.textContent = 0;
    current1EL.textContent = 0;

    player0EL.classList.remove('player--winner');
    player1EL.classList.remove('player--winner');

    player0EL.classList.add('player--active');
    player1EL.classList.remove('player--active');

};    

init();

const switchPlayer = function() {
    // switch to next player ( ternary operator)
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;

    // toggle- will add the class if its not there but it will remove the class if it is there
    player0EL.classList.toggle('player--active');
    player1EL.classList.toggle('player--active');
    
};

btnRoll.addEventListener('click', function () {
    if (playing) {
    // 1. generate random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2. display dice
    diceEL.classList.remove('hidden');
    diceEL.src = `dice-${dice}.png`;

    // 3. check for rolled 1: if true, switch to next player;
    if(dice !== 1) {
        // add dice to current score
        /*currentScore = currentScore + dice; or */
        currentScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
    switchPlayer();

    }
    }
});

btnHold.addEventListener('click', function() {
    if(playing) {
    // 1. add current score to active players score
    scores[activePlayer] += currentScore;
    // i.e scores [1] = scores[1] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer]; 

    // 2. check if players score is >= 100
    if (scores[activePlayer] >= 100) {
        // finish the game
        playing = false;
        diceEL.classList.add('hidden');

        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');

    document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    } else {
    // switch to next player
    switchPlayer();
    }
}
});

btnNew.addEventListener('click', init);


