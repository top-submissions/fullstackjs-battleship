import { createGame } from './game.js';
import { createShip } from './ship.js';

function createDOMController() {
  const game = createGame();
  let currentOrientation = 'horizontal';
  let selectedShipIndex = 0;
  const ships = [
    { name: 'Carrier', length: 5, placed: false },
    { name: 'Battleship', length: 4, placed: false },
    { name: 'Cruiser', length: 3, placed: false },
    { name: 'Submarine', length: 3, placed: false },
    { name: 'Destroyer', length: 2, placed: false },
  ];

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

  function canPlaceShip(row, col, length, orientation) {
    if (orientation === 'horizontal') {
      if (col + length > 10) return false;
    } else {
      if (row + length > 10) return false;
    }
    return true;
  }

  function showShipPreview(row, col, length, orientation, valid) {
    const board = document.getElementById('player-board-setup');
    const cells = board.querySelectorAll('.cell');

    // Clear previous preview
    cells.forEach(cell => {
      cell.classList.remove('preview', 'preview-invalid');
    });

    if (!canPlaceShip(row, col, length, orientation)) {
      valid = false;
    }

    // Show new preview
    for (let i = 0; i < length; i++) {
      const targetRow = orientation === 'horizontal' ? row : row + i;
      const targetCol = orientation === 'horizontal' ? col + i : col;

      if (targetRow < 10 && targetCol < 10) {
        const cell = board.querySelector(
          `[data-row="${targetRow}"][data-col="${targetCol}"]`
        );
        if (cell) {
          cell.classList.add(valid ? 'preview' : 'preview-invalid');
        }
      }
    }
  }

  function placeShip(row, col) {
    const currentShip = ships[selectedShipIndex];
    if (currentShip.placed) return;

    if (!canPlaceShip(row, col, currentShip.length, currentOrientation)) {
      return;
    }

    const ship = createShip(currentShip.length);
    game.player1.gameboard.placeShip(ship, [row, col], currentOrientation);

    // Mark ship as placed
    ships[selectedShipIndex].placed = true;

    // Update ship button
    const shipBtns = document.querySelectorAll('.ship-btn');
    shipBtns[selectedShipIndex].classList.remove('active');
    shipBtns[selectedShipIndex].classList.add('placed');

    // Select next unplaced ship
    for (let i = 0; i < ships.length; i++) {
      if (!ships[i].placed) {
        selectedShipIndex = i;
        shipBtns[i].classList.add('active');
        break;
      }
    }

    // Update board display
    updateBoardDisplay();

    // Check if all ships are placed
    if (ships.every(s => s.placed)) {
      document.getElementById('start-game-btn').disabled = false;
      document.getElementById('game-status').textContent =
        'All ships placed! Click Start Game to begin.';
    }
  }

  function updateBoardDisplay() {
    const board = document.getElementById('player-board-setup');
    const cells = board.querySelectorAll('.cell');

    cells.forEach(cell => {
      const row = parseInt(cell.dataset.row);
      const col = parseInt(cell.dataset.col);
      const ship = game.player1.gameboard.getShipAt([row, col]);

      cell.classList.remove('ship', 'preview', 'preview-invalid');
      if (ship) {
        cell.classList.add('ship');
      }
    });
  }
}
