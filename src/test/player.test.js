import { createPlayer } from '../modules/player.js';
import { createGameboard } from '../modules/gameboard.js';
import { createShip } from '../modules/ship.js';

describe('player module', () => {
  describe('player factory', () => {
    test('player has their own gameboard', () => {
      const player = createPlayer('Player 1');

      expect(player.gameboard).toBeDefined();
      expect(typeof player.gameboard.placeShip).toBe('function');
      expect(typeof player.gameboard.receiveAttack).toBe('function');
    });

    test('player can attack enemy gameboard', () => {
      const player = createPlayer('Player 1');
      const enemy = createPlayer('Player 2');
      const ship = createShip(3);

      enemy.gameboard.placeShip(ship, [0, 0], 'horizontal');
      player.attack(enemy.gameboard, [0, 0]);

      expect(ship.hits).toBe(1);
    });
  });
});
