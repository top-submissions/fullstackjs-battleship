import { createGame } from '../modules/game.js';

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
  });
});
