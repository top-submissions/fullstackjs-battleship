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
    switchTurn() {
      currentPlayer = currentPlayer === player1 ? player2 : player1;
    },
    isGameOver() {
      return (
        player1.gameboard.allShipsSunk() || player2.gameboard.allShipsSunk()
      );
    },
    getWinner() {
      if (player1.gameboard.allShipsSunk()) {
        return player2;
      } else if (player2.gameboard.allShipsSunk()) {
        return player1;
      }
      return null;
    },
  };
}

export { createGame };
