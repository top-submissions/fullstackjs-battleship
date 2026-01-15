import { createGameboard } from './gameboard.js';

function createPlayer(name, isComputer = false) {
  const gameboard = createGameboard();
  const attackedCoordinates = [];

  return {
    name: name,
    isComputer: isComputer,
    gameboard: gameboard,
    attack(enemyGameboard, coordinates) {
      return enemyGameboard.receiveAttack(coordinates);
    },
    randomAttack(enemyGameboard) {
      let coordinates;

      do {
        const row = Math.floor(Math.random() * 10);
        const col = Math.floor(Math.random() * 10);
        coordinates = [row, col];
      } while (
        attackedCoordinates.some(
          coord => coord[0] === coordinates[0] && coord[1] === coordinates[1]
        )
      );

      attackedCoordinates.push(coordinates);
      enemyGameboard.receiveAttack(coordinates);

      return coordinates;
    },
  };
}

export { createPlayer };
