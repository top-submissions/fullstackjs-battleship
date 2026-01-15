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

  function placeComputerShips() {
    const computerShips = [5, 4, 3, 3, 2]; // Ship lengths

    computerShips.forEach(length => {
      let placed = false;

      while (!placed) {
        const orientation = Math.random() < 0.5 ? 'horizontal' : 'vertical';
        const row = Math.floor(Math.random() * 10);
        const col = Math.floor(Math.random() * 10);

        // Check if ship can be placed
        if (canPlaceComputerShip(row, col, length, orientation)) {
          const ship = createShip(length);
          game.player2.gameboard.placeShip(ship, [row, col], orientation);
          placed = true;
        }
      }
    });
  }

  function canPlaceComputerShip(row, col, length, orientation) {
    // Check bounds
    if (orientation === 'horizontal') {
      if (col + length > 10) return false;
    } else {
      if (row + length > 10) return false;
    }

    // Check for collisions
    for (let i = 0; i < length; i++) {
      const targetRow = orientation === 'horizontal' ? row : row + i;
      const targetCol = orientation === 'horizontal' ? col + i : col;

      const existingShip = game.player2.gameboard.getShipAt([
        targetRow,
        targetCol,
      ]);
      if (existingShip) {
        return false;
      }
    }

    return true;
  }

  function canPlaceShip(row, col, length, orientation) {
    // Check bounds
    if (orientation === 'horizontal') {
      if (col + length > 10) return false;
    } else {
      if (row + length > 10) return false;
    }

    // Check for collisions with existing ships
    for (let i = 0; i < length; i++) {
      const targetRow = orientation === 'horizontal' ? row : row + i;
      const targetCol = orientation === 'horizontal' ? col + i : col;

      const existingShip = game.player1.gameboard.getShipAt([
        targetRow,
        targetCol,
      ]);
      if (existingShip) {
        return false; // Collision detected
      }
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

  function updateGameBoards() {
    // Update player board
    const playerBoard = document.getElementById('player-board');
    const playerCells = playerBoard.querySelectorAll('.cell');

    playerCells.forEach(cell => {
      const row = parseInt(cell.dataset.row);
      const col = parseInt(cell.dataset.col);
      const ship = game.player1.gameboard.getShipAt([row, col]);
      const missedAttacks = game.player1.gameboard.getMissedAttacks();
      const isMiss = missedAttacks.some(
        attack => attack[0] === row && attack[1] === col
      );

      cell.classList.remove('ship', 'hit', 'miss');

      if (ship) {
        cell.classList.add('ship');
        // Check if this cell was hit
        if (ship.hits > 0) {
          // This is a simplified check - we should track individual cell hits
          // For now, we'll add a more sophisticated approach
          cell.classList.add('hit');
        }
      } else if (isMiss) {
        cell.classList.add('miss');
      }
    });

    // Update enemy board
    const enemyBoard = document.getElementById('enemy-board');
    const enemyCells = enemyBoard.querySelectorAll('.cell');

    enemyCells.forEach(cell => {
      const row = parseInt(cell.dataset.row);
      const col = parseInt(cell.dataset.col);
      const ship = game.player2.gameboard.getShipAt([row, col]);
      const missedAttacks = game.player2.gameboard.getMissedAttacks();
      const isMiss = missedAttacks.some(
        attack => attack[0] === row && attack[1] === col
      );

      cell.classList.remove('hit', 'miss');

      // Don't show enemy ships, only hits and misses
      if (ship && ship.hits > 0) {
        cell.classList.add('hit');
      } else if (isMiss) {
        cell.classList.add('miss');
      }
    });
  }

  function handlePlayerAttack(row, col) {
    // Check if cell already attacked
    const enemyBoard = document.getElementById('enemy-board');
    const cell = enemyBoard.querySelector(
      `[data-row="${row}"][data-col="${col}"]`
    );

    if (cell.classList.contains('hit') || cell.classList.contains('miss')) {
      document.getElementById('game-status').textContent =
        'Already attacked this cell!';
      return;
    }

    // Perform attack
    game.player1.attack(game.player2.gameboard, [row, col]);

    // Check if hit or miss
    const ship = game.player2.gameboard.getShipAt([row, col]);
    if (ship) {
      document.getElementById('game-status').textContent = 'Hit!';
      cell.classList.add('hit');
    } else {
      document.getElementById('game-status').textContent = 'Miss!';
      cell.classList.add('miss');
    }

    // Update boards
    updateGameBoards();

    // Check for game over
    if (game.isGameOver()) {
      endGame();
    }
  }

  function endGame() {
    const winner = game.getWinner();
    document.getElementById('game-phase').classList.remove('active');
    document.getElementById('game-phase').classList.add('hidden');
    document.getElementById('game-over-phase').classList.remove('hidden');
    document.getElementById('game-over-phase').classList.add('active');
    document.getElementById('winner-message').textContent =
      `${winner.name} wins!`;
  }

  function setupGamePhaseListeners() {
    const enemyBoard = document.getElementById('enemy-board');

    enemyBoard.addEventListener('click', e => {
      if (e.target.classList.contains('cell')) {
        const row = parseInt(e.target.dataset.row);
        const col = parseInt(e.target.dataset.col);
        handlePlayerAttack(row, col);
      }
    });
  }

  function setupEventListeners() {
    const board = document.getElementById('player-board-setup');

    // Board hover and click
    board.addEventListener('mouseover', e => {
      if (e.target.classList.contains('cell')) {
        const row = parseInt(e.target.dataset.row);
        const col = parseInt(e.target.dataset.col);
        const currentShip = ships[selectedShipIndex];

        if (!currentShip.placed) {
          showShipPreview(
            row,
            col,
            currentShip.length,
            currentOrientation,
            true
          );
        }
      }
    });

    board.addEventListener('mouseout', () => {
      updateBoardDisplay();
    });

    board.addEventListener('click', e => {
      if (e.target.classList.contains('cell')) {
        const row = parseInt(e.target.dataset.row);
        const col = parseInt(e.target.dataset.col);
        placeShip(row, col);
      }
    });

    // Orientation toggle
    document
      .getElementById('toggle-orientation')
      .addEventListener('click', () => {
        currentOrientation =
          currentOrientation === 'horizontal' ? 'vertical' : 'horizontal';
        document.getElementById('orientation-text').textContent =
          currentOrientation.charAt(0).toUpperCase() +
          currentOrientation.slice(1);
      });

    // Ship selection
    const shipBtns = document.querySelectorAll('.ship-btn');
    shipBtns.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        if (!ships[index].placed) {
          shipBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          selectedShipIndex = index;
        }
      });
    });

    // Start game button
    document.getElementById('start-game-btn').addEventListener('click', () => {
      // Place computer ships
      placeComputerShips();

      // Update player board to show ships
      const playerBoard = document.getElementById('player-board');
      const playerCells = playerBoard.querySelectorAll('.cell');
      playerCells.forEach(cell => {
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        const ship = game.player1.gameboard.getShipAt([row, col]);
        if (ship) {
          cell.classList.add('ship');
        }
      });

      // Switch to game phase
      document.getElementById('setup-phase').classList.remove('active');
      document.getElementById('setup-phase').classList.add('hidden');
      document.getElementById('game-phase').classList.remove('hidden');
      document.getElementById('game-phase').classList.add('active');
      document.getElementById('game-status').textContent =
        'Your turn - attack enemy board!';

      // Setup game phase listeners
      setupGamePhaseListeners();
    });
  }

  function initialize() {
    const playerBoardSetup = document.getElementById('player-board-setup');
    const playerBoard = document.getElementById('player-board');
    const enemyBoard = document.getElementById('enemy-board');

    renderGameboard(game.player1.gameboard, playerBoardSetup, false);
    renderGameboard(game.player1.gameboard, playerBoard, false);
    renderGameboard(game.player2.gameboard, enemyBoard, true);

    setupEventListeners();

    console.log('Game initialized');
  }

  return {
    initialize,
  };
}

export { createDOMController };
