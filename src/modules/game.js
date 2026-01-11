import { createPlayer } from './player.js';

function createGame() {
  const player1 = createPlayer('Player 1', false);
  const player2 = createPlayer('Computer', true);
  let currentPlayer = player1;

  return {
    player1: player1,
    player2: player2,
    getCurrentPlayer() {
      return currentPlayer;
    },
  };
}

export { createGame };
