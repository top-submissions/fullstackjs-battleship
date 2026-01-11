import { createGame } from '../modules/game.js';
import { createShip } from '../modules/ship.js';

describe('game module', () => {
  describe('game factory', () => {
    test('game initializes with two players', () => {
      const game = createGame();

      expect(game.player1).toBeDefined();
      expect(game.player2).toBeDefined();
      expect(game.player1.gameboard).toBeDefined();
      expect(game.player2.gameboard).toBeDefined();
      expect(game.player2.isComputer).toBe(true);
    });

    test('game tracks current turn and starts with player1', () => {
      const game = createGame();

      expect(game.getCurrentPlayer()).toBe(game.player1);
    });

    test('game switches turns between players', () => {
      const game = createGame();

      expect(game.getCurrentPlayer()).toBe(game.player1);

      game.switchTurn();
      expect(game.getCurrentPlayer()).toBe(game.player2);

      game.switchTurn();
      expect(game.getCurrentPlayer()).toBe(game.player1);
    });

    test('game detects when game is over', () => {
      const game = createGame();
      const ship1 = createShip(2);
      const ship2 = createShip(1);

      game.player1.gameboard.placeShip(ship1, [0, 0], 'horizontal');
      game.player2.gameboard.placeShip(ship2, [1, 0], 'horizontal');

      expect(game.isGameOver()).toBe(false);
      expect(game.getWinner()).toBe(null);

      // Sink all player2's ships
      game.player2.gameboard.receiveAttack([0, 0]);
      game.player2.gameboard.receiveAttack([0, 1]);
      game.player2.gameboard.receiveAttack([1, 0]);

      expect(game.isGameOver()).toBe(true);
      expect(game.getWinner()).toBe(game.player1);
    });
  });
});
