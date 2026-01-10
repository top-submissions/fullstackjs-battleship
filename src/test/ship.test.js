import { createShip } from '../modules/ship.js';

describe('ship module', () => {
  describe('ship factory', () => {
    test('creates a ship with specified length', () => {
      const ship = createShip(3);
      expect(ship.length).toBe(3);
    });

    test('initializes with zero hits', () => {
      const ship = createShip(4);
      expect(ship.hits).toBe(0);
    });

    test('hit() method increases hit count by 1', () => {
      const ship = createShip(3);
      ship.hit();
      expect(ship.hits).toBe(1);
    });

    test('isSunk() returns false when hits are less than length', () => {
      const ship = createShip(3);
      ship.hit();
      expect(ship.isSunk()).toBe(false);
    });
  });
});
