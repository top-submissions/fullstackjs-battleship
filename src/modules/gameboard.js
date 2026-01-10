function createGameboard() {
  const board = {};

  return {
    placeShip(ship, coordinates, orientation) {
      const [row, col] = coordinates;

      if (orientation === 'horizontal') {
        for (let i = 0; i < ship.length; i++) {
          const key = `${row},${col + i}`;
          board[key] = ship;
        }
      }
    },

    getShipAt(coordinates) {
      const [row, col] = coordinates;
      const key = `${row},${col}`;
      return board[key] || null;
    },
  };
}

export { createGameboard };
