import { createGameboard } from './gameboard.js';

function createPlayer(name) {
  const gameboard = createGameboard();

  return {
    name: name,
    gameboard: gameboard,
  };
}

export { createPlayer };
