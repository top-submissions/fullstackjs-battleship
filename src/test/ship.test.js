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
  });
});
