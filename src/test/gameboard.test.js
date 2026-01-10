import { createGameboard } from '../modules/gameboard.js';
import { createShip } from '../modules/ship.js';

describe('gameboard module', () => {
  describe('gameboard factory', () => {
    test('can place a ship at specific coordinates horizontally', () => {
      const gameboard = createGameboard();
      const ship = createShip(3);

      gameboard.placeShip(ship, [0, 0], 'horizontal');

      expect(gameboard.getShipAt([0, 0])).toBe(ship);
      expect(gameboard.getShipAt([0, 1])).toBe(ship);
      expect(gameboard.getShipAt([0, 2])).toBe(ship);
    });
  });
});
