"use strict";

const cellAll = document.querySelectorAll('.cell');
const restartButton = document.querySelector('.game--restart');
const gameStatus = document.querySelector('.game--status');
let currentUser = 'X';
let activeGame = true;
let gameState = ["", "", "", "", "", "", "", "", ""];
const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

for (let cell of cellAll) {
    cell.addEventListener('click', function (event) {
        const valueCell = event.target.dataset.cellIndex;

        if (!activeGame || (gameState[valueCell] != '')) {
            return;
        }
        gameState[valueCell] = currentUser;
        cellAll[valueCell].textContent = currentUser;

        resultGame();
    });
};

function handlePlayerChange() {
    currentUser = currentUser === 'X' ? '0' : 'X';
    gameStatus.textContent = `It's ${currentUser}'s turn`;
};

function resultGame() {
    for (let i = 0; i <= winningLines.length - 1; i++) {
        const winCondition = winningLines[i];
        const a = gameState[winCondition[0]];
        const b = gameState[winCondition[1]];
        const c = gameState[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }

        if (a === b && b === c) {
            activeGame = false;
            gameStatus.textContent = `Player ${currentUser} has won!`;
            return;
        }
    }

    handlePlayerChange();

    if (!gameState.includes('')) {
        gameStatus.textContent = 'Game ended in a draw!';
        activeGame = false;
    }
};

restartButton.addEventListener('click', function () {
    for (let cell of cellAll) {
        cell.textContent = '';
    }
    gameStatus.textContent = `It's X's turn`;
    activeGame = true;
    currentUser = 'X';
    gameState = ["", "", "", "", "", "", "", "", ""];
});
