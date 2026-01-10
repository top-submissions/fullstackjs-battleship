function createGameboard() {
  const board = {};
  const missedAttacks = [];
  const ships = [];

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
        ship.hit();
      } else {
        missedAttacks.push(coordinates);
      }
    },

    getMissedAttacks() {
      return missedAttacks;
    },

    allShipsSunk() {
      return ships.every(ship => ship.isSunk());
    },
  };
}

export { createGameboard };
