import { createGame } from './game.js';

function createDOMController() {
  const game = createGame();

  function renderGameboard(gameboard, containerElement, isEnemyBoard = false) {
    containerElement.innerHTML = '';

    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.row = row;
        cell.dataset.col = col;

        containerElement.appendChild(cell);
      }
    }
  }

  function initialize() {
    const playerBoard = document.getElementById('player-board');
    const enemyBoard = document.getElementById('enemy-board');

    renderGameboard(game.player1.gameboard, playerBoard, false);
    renderGameboard(game.player2.gameboard, enemyBoard, true);

    console.log('Game initialized');
  }

  return {
    initialize,
  };
}

export { createDOMController };
