import { container } from 'webpack';
import { createGame } from './game.js';

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
}
