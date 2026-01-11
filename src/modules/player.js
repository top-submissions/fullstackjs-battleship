import { createGameboard } from './gameboard.js';

function createPlayer(name) {
  const gameboard = createGameboard();

  return {
    name: name,
    gameboard: gameboard,
    attack(enemyGameboard, coordinates) {
      enemyGameboard.receiveAttack(coordinates);
    },
  };
}

export { createPlayer };
