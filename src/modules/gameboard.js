function createGameboard() {
  const board = {};
  const missedAttacks = [];
  const ships = [];
  const hitCells = []; // Track which cells have been hit

  return {
    placeShip(ship, coordinates, orientation) {
      const [row, col] = coordinates;

      ships.push(ship);

      if (orientation === 'horizontal') {
        for (let i = 0; i < ship.length; i++) {
          const key = `${row},${col + i}`;
          board[key] = ship;
        }
      } else if (orientation === 'vertical') {
        for (let i = 0; i < ship.length; i++) {
          const key = `${row + i},${col}`;
          board[key] = ship;
        }
      }
    },

    getShipAt(coordinates) {
      const [row, col] = coordinates;
      const key = `${row},${col}`;
      return board[key] || null;
    },

    receiveAttack(coordinates) {
      const [row, col] = coordinates;
      const key = `${row},${col}`;
      const ship = board[key];

      if (ship) {
        // Mark this specific cell as hit
        hitCells.push(coordinates);
        ship.hit();
        return 'hit';
      } else {
        missedAttacks.push(coordinates);
        return 'miss';
      }
    },

    isCellHit(coordinates) {
      const [row, col] = coordinates;
      return hitCells.some(hitCell => hitCell[0] === row && hitCell[1] === col);
    },

    getMissedAttacks() {
      return missedAttacks;
    },

    getHitCells() {
      return hitCells;
    },

    allShipsSunk() {
      return ships.every(ship => ship.isSunk());
    },
  };
}

export { createGameboard };
