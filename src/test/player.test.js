import { createPlayer } from '../modules/player.js';
import { createGameboard } from '../modules/gameboard.js';

describe('player module', () => {
  describe('player factory', () => {
    test('player has their own gameboard', () => {
      const player = createPlayer('Player 1');

      expect(player.gameboard).toBeDefined();
      expect(typeof player.gameboard.placeShip).toBe('function');
      expect(typeof player.gameboard.receiveAttack).toBe('function');
    });
  });
});
