function createShip(length) {
  return {
    length: length,
    hits: 0,
    hit() {
      this.hits += 1;
    },
  };
}

export { createShip };
