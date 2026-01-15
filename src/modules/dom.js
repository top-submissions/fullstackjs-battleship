import { createGame } from './game.js';

function createDOMController() {
  const game = createGame();
  let currentOrientation = 'horizontal';
  let selectedShipIndex = 0;
  const ships = [
    { name: 'Carrier', length: 5, placed: false },
    { name: 'Battleship', length: 4, placed: false },
    { name: 'Cruiser', length: 3, placed: false },
    { name: 'Submarine', length: 3, placed: false },
    { name: 'Destroyer', length: 2, placed: false },
  ];
}
