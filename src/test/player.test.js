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

    test('computer player makes random attacks on valid coordinates', () => {
      const computer = createPlayer('Computer', true);
      const enemy = createPlayer('Player 1');

      const attack1 = computer.randomAttack(enemy.gameboard);
      const attack2 = computer.randomAttack(enemy.gameboard);

      expect(attack1).toBeDefined();
      expect(Array.isArray(attack1)).toBe(true);
      expect(attack1.length).toBe(2);
      expect(attack2).toBeDefined();
      expect(attack1).not.toEqual(attack2);
    });
  });
});
